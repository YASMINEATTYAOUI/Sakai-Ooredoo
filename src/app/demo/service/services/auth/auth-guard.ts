import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

export const authGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthenticationService);
  let routerService = inject(Router);
  if (!authService.isLoggedIn()) {
    routerService.navigate(['auth/login']);
    return false;
  }
  return true;
};