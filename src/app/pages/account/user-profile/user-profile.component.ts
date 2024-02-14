import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/shared/models/user-interface/iuser';
import { StorageService } from 'src/app/shared/services/storage-service/storage.service';
import { UserService } from 'src/app/shared/services/user-service/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
  
export class UserProfileComponent {

  loggedInUser!: IUser;

  constructor(private _router: Router, private _users: UserService, private _authStorage: StorageService) {  
  }

  ngOnInit(): void { 

    //Chech if  the user is already loggedIn
     if ( Object.keys(this._authStorage.getUser()).length !== 0) {
       this.loggedInUser = this._authStorage.getUser();
       
     }

  }
}
