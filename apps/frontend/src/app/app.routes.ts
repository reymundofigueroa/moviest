import { Routes } from '@angular/router';
import { LoginComponent } from './features/user-access/login/login.component'
import { HomeComponent } from './features/home/home.component'
import { CreateAccountComponent } from './features/user-access/create-account/create-account.component';
import { SendEmailToResetPasswordComponent } from './features/user-access/send-email-to-reset-password/send-email-to-reset-password.component';
import { ResetPasswordComponent } from './features/user-access/reset-password/reset-password.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'create-account', component: CreateAccountComponent},
  { path: 'forgot-password', component: SendEmailToResetPasswordComponent},
  { path: 'change-password', component: ResetPasswordComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
