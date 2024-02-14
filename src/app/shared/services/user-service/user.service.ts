import { Injectable } from '@angular/core';
import { environment } from '../../base-url/baseUrl';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../../models/user-interface/iuser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  //http requests - observables
  public registerUser(_userDetails: IUser) {
    return this.register(_userDetails);
  }
  public getUsers() {
    return this.users;
  }

  //private - http requests
  private get users() {
  return this.http.get<IUser[]>(environment.apiUrl + "/users");
  }
  
  private register(_userDetails: IUser) {
    return this.http.post<any>(environment.apiUrl + "/users", JSON.stringify(_userDetails));
  }

}
