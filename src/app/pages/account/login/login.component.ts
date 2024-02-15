import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs';
import { IUser } from 'src/app/shared/models/user-interface/iuser';
import { StorageService } from 'src/app/shared/services/storage-service/storage.service';
import { UserService } from 'src/app/shared/services/user-service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent  implements OnInit{

  //variables declaration
  _loginForm!: FormGroup;
  _loggedInUser!: IUser; 
  _errorMessage: string = '';

  constructor(
    private _router: Router,
    private _userServie: UserService,
    private _authStorage: StorageService) {  
  }

  ngOnInit(): void { 
    
    //Clear the current logggedIn user session if any
    if (this._authStorage.getUser() != null) {
      sessionStorage.clear();
    }

    //initialize the form controls
    this._loginForm = new FormGroup({
      emailAddress: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  //getter for form-control[emailAddress]
  get emailAddress() {
    return this._loginForm.get('emailAddress');}
  
  //getter for form-control [password]
  get password() {
    return this._loginForm.get('password');
  }
  
  //login - based on username and password
  public login(): any{

    //declaration - local variables
    const _loginFormData = this._loginForm.value;

    //Prevent posting empty invalid or empty registration form 
    if (this._loginForm.invalid) {

      this._errorMessage = "* Please enter all the required login details"
      return;

    }

     this._userServie.loginUser(_loginFormData.emailAddress, _loginFormData.password).pipe(map((_response: any) => {
      
       if (!_response) {
        
         throw "Something went wrong in the server";
        // throwError;

      } else if (Object.keys(_response).length === 0) {

         this._loginForm.reset();
         throw "Login failed, incorrect login details"; 
            // throwError;
          
       } else {
         
          //returns an array of object
          this._loggedInUser = _response[0];
       }
       
      return this._loggedInUser;
     }),
       
       catchError(error => {
      //http server errors 
        throw error;
    })
    ).subscribe({
      next: (_loggedInUser: IUser) => {

        //store user object before navigating to dashboard
        this._authStorage.storeUser(_loggedInUser);
        this._router.navigate(['dashboard']);

      },
      error: (_error: any) => {

        if (_error.status == 404) {
          //Unsuccessful server login error message
          this._errorMessage = "Login failed, incorrect incorrect login details";

        } else {
          //Unsuccessful local error message
          this._errorMessage = _error;
        }
      }
    });

  }

  //Clear the login form and error message
  resetForm() {
    this._loginForm.reset();
    this._errorMessage = '';
  }
}
