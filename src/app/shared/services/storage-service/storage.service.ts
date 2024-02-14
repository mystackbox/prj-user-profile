import { Injectable } from '@angular/core';
import { IUser } from '../../models/user-interface/iuser';

const USER_KEY = 'currentUser';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public storeUser(user: IUser): void {
   sessionStorage.removeItem(USER_KEY);
   sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    let userObject: any;
    const user = sessionStorage.getItem(USER_KEY);
    if (user) {
      userObject = JSON.parse(user);
      return userObject;  
    }
    return {};
  }
}
