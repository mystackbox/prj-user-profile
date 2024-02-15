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

  //http requests - get all users
  public getUsers() {
    return this.users();
  }
  
  //http requests - post user object [_userDetails]
  public registerUser(_userDetails: IUser) {
    return this.register(_userDetails);
  }

   //http requests - get user matching [emailAddress, password]
  public loginUser(_emailAddress: string, _password: string) {
    return this.login(_emailAddress, _password);
  }

  //private - http requests
  private users() {
    return this.http.get<IUser[]>(environment.apiUrl + "/users");
  }

  private login(_emailAddress: string, _password: string) {
  return this.http.get<IUser>(environment.apiUrl + "/users?emailAddress="+ _emailAddress + "&" + _password );
  }
  
  private register(_userDetails: IUser) {
    return this.http.post<IUser>(environment.apiUrl + "/users", JSON.stringify(_userDetails));
  }

}
