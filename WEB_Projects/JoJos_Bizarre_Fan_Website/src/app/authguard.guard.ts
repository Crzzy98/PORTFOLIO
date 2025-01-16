import { CanActivateFn } from '@angular/router';
import { LoginService } from './services/login.service';
import { inject } from '@angular/core';

export const authguardGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService)

  if(loginService.userAuthorized)
    return true;
  else {
    console.log("User not authorized")
  }
  return false
};
