import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, map, throwError } from 'rxjs';
import { IUser } from 'src/app/shared/models/user-interface/iuser';
import { StorageService } from 'src/app/shared/services/storage-service/storage.service';
import { UserService } from 'src/app/shared/services/user-service/user.service';
import { emailAsyncValidator, passwordCMatchValidator, strValidator, whitespaceStr } from 'src/app/shared/validators/form-validators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent  implements OnInit {

  //local variables declaration
  _registrationForm!: FormGroup;
  _userDetails!: IUser;
  _registeredUser!: IUser; 
  _errorMessage: string = '';
  _registrationStatus: boolean = false;

  constructor(
    private _router: Router,
    private _authStorage: StorageService,
    private _userServie: UserService) {  
  }

  ngOnInit(): void { 
    
     //Clear the current logggedIn user session if any
    if (this._authStorage.getUser() != null) {
      sessionStorage.clear();
    }

    //Initialize the form
    this._registrationForm = new FormGroup({
        firstName: new FormControl('', [Validators.required, strValidator(), whitespaceStr()]),
        emailAddress: new FormControl('', [Validators.required, Validators.email], [ emailAsyncValidator(this._userServie)]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        rePassword: new FormControl('', [Validators.required])
    },
      {
        //custom validation - password mismatch
        validators: passwordCMatchValidator('password', 'rePassword')
    });
    
  }

  //getter for form-control[firstName]
  get firstName() {
    return this._registrationForm.get('firstName');}

  //getter for form-control[emailAddress]
  get emailAddress() {
    return this._registrationForm.get('emailAddress');}
  
  //getter for form-control [password]
  get password() {
    return this._registrationForm.get('password');}
  
  //getter for form-control [rePassword]
  get rePassword() {
    return this._registrationForm.get('rePassword');
  }
  
  register(): any {

    let formData: any;

     //Prevent posting empty invalid or empty registration form  
    if (this._registrationForm.invalid) {

      this._errorMessage = "* Please enter all the required user details"
      return;

    } else {

      formData = this._registrationForm.value;
    }
  
    //Map form values as per required http post parameter(IUser)
    this._userDetails = this.setUserDetails(formData);

    this._userServie.registerUser(this._userDetails).pipe(map((_response: any) => {
      
      if (!_response) {

        throw "Something went wrong in the server";
        // throwError;
      } else if (Object.keys(_response).length === 0) {

        this._registrationForm.reset();
        throw "Registration unssuccessfull!";
         // throwError;

      } else {

        //returns an object  
        this._registeredUser = _response;

      }
      return this._registeredUser;
    }), 
      
    catchError(_error => {
      //http server errors 
      throw _error;
      
    })).subscribe({
      next: (_registeredUser: IUser) => {

        //store user object before navigating to dashboard
        this._authStorage.storeUser(_registeredUser);
        this._router.navigate(['/dashboard']);
        
      },
      error: (_error: any) => {

        //Unsuccessful server registration error message
         if (_error.status == 404) {
          this._errorMessage = "Registration unsuccessful!";

        } else {
          //Unsuccessful local error message
          this._errorMessage = _error;
        }
      }
    });  
  }

  //Map http post parameters[IUser]
  setUserDetails(formData: any): any{

    let userDetails: any;
      userDetails = {
     //id - will be auto-generated in the server
      name: formData.firstName,
      emailAddress: formData.emailAddress,
      password: formData.password,
      };
    
    return userDetails;

  }

  //Clear the regitration form and error message
  resetForm(): void {
    this._registrationForm.reset();
    this._errorMessage = '';
  }  
}
