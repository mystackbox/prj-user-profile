import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

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
