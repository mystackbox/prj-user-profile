import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent  implements OnInit{

  loginForm!: FormGroup;
  constructor(private _router: Router) {
    
  }

  ngOnInit(): void { 
    this.loginForm = new FormGroup({
      emailAddress: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

    //getter for form-control[emailAddress]
  get emailAddress() {
    return this.loginForm.get('emailAddress');}
  
  //getter for form-control [password]
  get password() {
    return this.loginForm.get('password');}

}
