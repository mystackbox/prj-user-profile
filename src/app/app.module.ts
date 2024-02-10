import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//for reactive forms
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home/home.component';
import { NotFoundComponent } from './not-found/not-found/not-found.component';
import { RegistrationComponent } from './account/registration/registration.component';
import { UserProfileComponent } from './account/user-profile/user-profile.component';
import { LoginComponent } from './account/login/login.component';
import { HeaderComponent } from './layout/header/header/header.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    RegistrationComponent,
    UserProfileComponent,
    LoginComponent,
    HeaderComponent,
    DashboardComponent
  ],
  imports: [
     ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
