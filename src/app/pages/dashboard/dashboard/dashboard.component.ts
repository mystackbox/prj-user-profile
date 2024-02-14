import { ILoginAttempt } from './../../../shared/models/login-attempt-interface/login-attempt';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/shared/models/user-interface/iuser';
import { StorageService } from 'src/app/shared/services/storage-service/storage.service';
import { UserService } from 'src/app/shared/services/user-service/user.service';

import Chart from 'chart.js/auto';
import { MetricsService } from 'src/app/shared/services/charts-and-graphs/metrics.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  _loggedInUser!: IUser;
  _chart: any = [];
  _userAttemptsData!: ILoginAttempt;
  _userId: any;

  constructor(
    private _router: Router,
    private _authStorage: StorageService,
    private _metricsService: MetricsService) { 
  }

  ngOnInit(): void { 

     //Chech if  the user is already loggedIn
     if (Object.keys(this._authStorage.getUser()).length !== 0) {
       this._loggedInUser = this._authStorage.getUser(); 
       this._userId = this._loggedInUser.id;

       this.getUserLoginAttempts(this._userId );
     }
       
    this._chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  public getUserLoginAttempts(id: number) {
    let userAttemptsData: any;  
    this._metricsService.userLoginStats(id).pipe(map((_response: ILoginAttempt) => {
      if (!_response) {
        throw "Something went wrong in the server";

      } else {

        // userAttemptsData = _response.find((_data: any) => _data.userId === id);
        if (_response == undefined) {
          throw "Sorry, login attempts data for this user was found"; 
        } else {
          this._userAttemptsData = _response;
        }
        return this._userAttemptsData;
    }
    })).subscribe({
      next: (_userAttemptsData: any) => {

        console.log(' --- Login data [ found ] --- ');
        console.log(_userAttemptsData);

      },
      error: (_error: any) => {
        if (_error) {
          console.log(' --- Login data [ error ] --- ');
          console.log(_error);
        }
      }
  });
      
    }

}
