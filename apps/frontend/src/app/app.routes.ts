import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/user-access/login/login.component')
        .then(m => m.LoginComponent)
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home.component')
        .then(m => m.HomeComponent)
  },
  {
    path: 'create-account',
    loadComponent: () =>
      import('./features/user-access/create-account/create-account.component')
        .then(m => m.CreateAccountComponent)
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./features/user-access/send-email-to-reset-password/send-email-to-reset-password.component')
        .then(m => m.SendEmailToResetPasswordComponent)
  },
  {
    path: 'change-password',
    loadComponent: () =>
      import('./features/user-access/reset-password/reset-password.component')
        .then(m => m.ResetPasswordComponent)
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];
