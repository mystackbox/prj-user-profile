import { ILoginAttempt } from './../../../shared/models/login-attempt-interface/login-attempt';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/shared/models/user-interface/iuser';
import { StorageService } from 'src/app/shared/services/storage-service/storage.service';
import { UserService } from 'src/app/shared/services/user-service/user.service';

import Chart from 'chart.js/auto';
import { MetricsService } from 'src/app/shared/services/charts-and-graphs/metrics.service';
import { catchError, map } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  //local variables declaration
  _loggedInUser!: IUser;
  _barGraph: any = [];
  _pieChart: any = [];
  _userAttemptsData!: ILoginAttempt;
  _userId: any;
  _loginData!: ILoginAttempt;
  _errorMessage: string = '';

  constructor(
    private _router: Router,
    private _authStorage: StorageService,
    private _metricsService: MetricsService) { 
  }

  //
  ngOnInit(): void { 

     //Chech if  the user is already loggedIn
     if (Object.keys(this._authStorage.getUser()).length !== 0) {
       this._loggedInUser = this._authStorage.getUser(); 

       console.log(" -- What dashboard [Inint] user are we getting --- ");
       console.log(this._loggedInUser);
       
       this._userId = this._loggedInUser.id;

       //get login attempts for the userId
       this.getUserLoginStats(this._userId);
     }
  }

  //retrieve login attempts data for the loggedIn user with userId = id
  public getUserLoginStats(id: number): ILoginAttempt {

    let userAttemptsData: any;  
    this._metricsService.userLoginStats(id).pipe(map((_response: ILoginAttempt) => {
      
      if (!_response) {

        throw "Something went wrong in the server";

      } else if (Object.keys(_response).length === 0) {

        throw "Sorry, you do not have login attempts data available."; 
        
      } else {

        this._userAttemptsData = _response;
      } 
        return this._userAttemptsData;
    }),
      
    catchError(error => {
        throw error;
    })
    
    ).subscribe({
      next: (_response: any) => {

        this.displayBarGraph(_response);
        this.displayPieChart(_response);

      },
      error: (_error: any) => {
        if (_error) {
           if (_error) {
          this._errorMessage = _error;
        }
        }
      }
    });
    
    return this._userAttemptsData;
      
  }
  
  //parameterize and display Bar Grahp
   displayBarGraph(_response: any): void {
    
    if (Object.keys(this._userAttemptsData).length !== 0) {

        let _data = _response[0];
      
        this._barGraph = new Chart('barGraph', {
        type: 'bar',
        data: {
       
          datasets: [{
                        label: 'Passed Attempts',
                        data: [
                          _data.passedAttemps.sunday,
                          _data.passedAttemps.monday,
                          _data.passedAttemps.tuesday,
                          _data.passedAttemps.wednesday,
                          _data.passedAttemps.thursday,
                          _data.passedAttemps.friday,
                          _data.passedAttemps.saturday
                                  
                        ],
                        // this dataset is drawn below
                        order: 1
                    }, {
                        label: 'Failed Attempts',
                        data:  [
                         _data.failedAttemps.sunday,
                         _data.failedAttemps.monday,
                         _data.failedAttemps.tuesday,
                         _data.failedAttemps.wednesday,
                         _data.failedAttemps.thursday,
                         _data.failedAttemps.friday,
                         _data.failedAttemps.saturday             
                        ],                     
                        // this dataset is drawn on top
                        order: 2
                      
            }],
          labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday"]
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
    
   }
  
  //parameterize and display Pie Chart
  displayPieChart(_response: any): void {

    if (Object.keys(this._userAttemptsData).length !== 0) {
      let _data = _response[0];

        this._pieChart = new Chart('pieChart', {
        type: 'pie',
        data: {
        datasets: [{
                      label: 'Passed Attempts',
                      data: [
                        _data.passedAttemps.sunday,
                        _data.passedAttemps.monday,
                        _data.passedAttemps.tuesday,
                        _data.passedAttemps.wednesday,
                        _data.passedAttemps.thursday,
                        _data.passedAttemps.friday,
                        _data.passedAttemps.saturday
                                
                      ],
                      // this dataset is drawn below
                      order: 1
                  }, {
                      label: 'Failed Attempts',
                      data:  [
                        _data.failedAttemps.sunday,
                        _data.failedAttemps.monday,
                        _data.failedAttemps.tuesday,
                        _data.failedAttemps.wednesday,
                        _data.failedAttemps.thursday,
                        _data.failedAttemps.friday,
                        _data.failedAttemps.saturday             
                      ],                     
                      // this dataset is drawn on top
                      order: 2
                    
          }],
          labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday"]
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
  }

}
