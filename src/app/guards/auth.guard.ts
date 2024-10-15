import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '@services/index.ts';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject( Router );

  console.log(userService.isLogged() ? 'User is logged' : 'User is not logged');	
  if (userService.isLogged()) {
    return true;
  }
  router.navigate(['login']);
  return false;

};
