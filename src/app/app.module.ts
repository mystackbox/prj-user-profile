import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//for reactive forms
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { UserService } from './shared/services/user-service/user.service';
import { StorageService } from './shared/services/storage-service/storage.service';
import { LoginComponent } from './pages/account/login/login.component';
import { RegistrationComponent } from './pages/account/registration/registration.component';
import { UserProfileComponent } from './pages/account/user-profile/user-profile.component';
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    RegistrationComponent,
    UserProfileComponent,
    LoginComponent,
    HeaderComponent,
    DashboardComponent,
    FooterComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    UserService,
    StorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
