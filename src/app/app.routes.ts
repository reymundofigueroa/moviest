import { Routes } from '@angular/router';
import { LoginComponent } from './features/user-access/login/login.component'
import { HomeComponent } from './features/home/home.component'
import { CreateAccountComponent } from './features/user-access/create-account/create-account.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'create-account', component: CreateAccountComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
