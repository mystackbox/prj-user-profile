import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './account/registration/registration.component';
import { UserProfileComponent } from './account/user-profile/user-profile.component';
import { HomeComponent } from './home/home/home.component';
import { NotFoundComponent } from './not-found/not-found/not-found.component';
import { LoginComponent } from './account/login/login.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';

const routes: Routes = [
{ path: '', component: HomeComponent, title: "Home"  },
{ path: 'home', component: HomeComponent, title: "Home" },
  {
    path: 'account', children: [
      { path: 'registration', component: RegistrationComponent, title: "User - Registration" },
      { path: 'login', component: LoginComponent,  title: "User - Login" },
      { path: 'user-profile', component: UserProfileComponent, title: "User - Profile" }
    ]
  },
  { path: 'dashboard', component: DashboardComponent, title: "User - Dasboard"  },
  // redirectTo - Error page
  { path: '**', component: NotFoundComponent, title: "Not found" },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
