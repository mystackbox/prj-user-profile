import { Component } from '@angular/core';
import { IUser } from 'src/app/shared/models/user-interface/iuser';
import { StorageService } from 'src/app/shared/services/storage-service/storage.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent {

  _loggedInUser!: IUser;
  _loggedInUserStatus: boolean = false;
  _errorMessage: string = '';

  constructor(
  private _authStorage: StorageService) { 
  }


  ngOnInit(): void { 

     //Chech if  the user is already loggedIn
    if (Object.keys(this._authStorage.getUser()).length !== 0) {

      //display the page without loggedIn user details
      this._loggedInUserStatus = true;

      //get loggedIn user information
      this._loggedInUser = this._authStorage.getUser(); 
      
    } else {
      //display the page without loggedIn user details
      this._loggedInUserStatus = false;
    }
    
  }

}
