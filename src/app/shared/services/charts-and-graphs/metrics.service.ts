import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginAttempt } from '../../models/login-attempt-interface/login-attempt';
import { environment } from '../../base-url/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class MetricsService {

  constructor(private http: HttpClient) { }

  private getUserLoginStats(userId: number) {
      return this.http.get<ILoginAttempt>(environment.apiUrl + "/loginAttemps/userId="+ userId); 
  }

  public userLoginStats(userId: number) {
    return this.getUserLoginStats(userId); 
  }
}
