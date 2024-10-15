import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '@services/index.ts';

export const publicGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject( Router );

  console.log(userService.isLogged() ? 'User is logged' : 'User is not logged');
  if (!userService.isLogged()) {
    return true;
  }
  return router.navigate(['projects/list']);
};
