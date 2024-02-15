import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginAttempt } from '../../models/login-attempt-interface/login-attempt';
import { environment } from '../../base-url/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class MetricsService {

  constructor(private http: HttpClient) { }
  
//http requests - get user login stats matching [userId]
  public userLoginStats(userId: number) {
    return this.getUserLoginStats(userId); 
  }

  //private - http requests
  private getUserLoginStats(userId: number) {
      return this.http.get<ILoginAttempt>(environment.apiUrl + "/loginAttemps?userId="+ userId); 
  }
}
