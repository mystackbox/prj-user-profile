import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordCMatchValidator, strValidator } from 'src/app/shared/validators/form-validators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent  implements OnInit {

  registrationForm!: FormGroup;
  constructor(private _router: Router) {
    
  }

  ngOnInit(): void { 
    this.registrationForm = new FormGroup({
    firstName: new FormControl('', strValidator()),
    emailAddress: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    rePassword: new FormControl('', [Validators.required])
    },
      {
       validators: passwordCMatchValidator('password', 'rePassword')
    });
  }
  
  //getter for form-control[firstName]
  get firstName() {
    return this.registrationForm.get('firstName');}

  //getter for form-control[emailAddress]
  get emailAddress() {
    return this.registrationForm.get('emailAddress');}
  
  //getter for form-control [password]
  get password() {
    return this.registrationForm.get('password');}
  
  //getter for form-control [rePassword]
  get rePassword() {
    return this.registrationForm.get('rePassword');}
}
