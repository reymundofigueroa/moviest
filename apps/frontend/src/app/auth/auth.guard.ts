import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const router = inject(Router);

  if (token) {
    console.log('ya tienes un token🎯🎯🎯',token)
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
