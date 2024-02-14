import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from './shared/route-guard/authGuard';
import { LoginComponent } from './pages/account/login/login.component';
import { RegistrationComponent } from './pages/account/registration/registration.component';
import { UserProfileComponent } from './pages/account/user-profile/user-profile.component';
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
{ path: '', component: HomeComponent, title: "Home"  },
{ path: 'home', component: HomeComponent, title: "Home" },
  {
    path: 'account', children: [
      { path: 'registration', component: RegistrationComponent, title: "User - Registration" },
      { path: 'login', component: LoginComponent,  title: "User - Login" },
      { path: 'user-profile', component: UserProfileComponent, canActivate: [authGuard], title: "User - Profile" }
    ]
  },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard], title: "User - Dasboard"  },
  // redirectTo - Error page
  { path: '**', component: NotFoundComponent, title: "Not found" },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
