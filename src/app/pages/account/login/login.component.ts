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
  public login() {

    //declaration - local variables
    let _user!: IUser;
    const _loginFormData = this._loginForm.value;

    //Prevent posting empty invalid or empty registration form 
    if (this._loginForm.invalid) {
      this._errorMessage = "* Please enter all the required login details"
      return;
    }

     this._userServie.getUsers().pipe(map((_response: any) => {
      
      if (!_response) {
        throw "Something went wrong in the server";
      } else {
        _user = _response.find((_data: any) => _data.emailAddress === _loginFormData.emailAddress &&
                                               _data.password === _loginFormData.password);
        
        //verify filtered response data
        if (_user == undefined) {
          this._loginForm.reset();
          throw "Login failed, incorrect login details";          
        } else {
          this._loggedInUser = _user;
        }
      }
      return this._loggedInUser;
    }),
       catchError(error => {
        throw error;
    })
    ).subscribe({
      next: (_loggedInUser: any) => {

        this._authStorage.storeUser(_loggedInUser);
        this._router.navigate(['dashboard']);

      },
      error: (_error: any) => {
        if (_error) {
          this._errorMessage = _error;
        }
      }
   });
  }

  //Clear the login form
  resetForm() {
    this._loginForm.reset();
    this._errorMessage = '';
  }
}
