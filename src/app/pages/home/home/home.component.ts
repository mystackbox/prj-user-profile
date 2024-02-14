import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/shared/services/storage-service/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor( private _router: Router, private _authStorage: StorageService) {
    
  }

  ngOnInit(): void {
    
    //Clear the current logggedIn user session
    if (this._authStorage.getUser() != null) {
      sessionStorage.clear();
    }
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
