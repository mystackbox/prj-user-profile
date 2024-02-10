import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor( private _router: Router) {
    
  }

  redirectToUserProfile() {
     this._router.navigate(['/account/user-profile']);
  }

  redirectToSignin() {
    this._router.navigate(['/account/login']);
  }

  redirectToRegistration() {
    this._router.navigate(['/account/registration']);
  }

}
