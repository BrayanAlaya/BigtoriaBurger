import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const userAdminGuard = () => {

  const router = inject(Router)
  const userService = inject(UserService)

  if (userService.getLocalToken() && userService.getLocalUSer()) {

    if (userService.getLocalUSer()?.role == "admin") {
      
      return true
    } 
    router.navigate(['/']);
    return false

  } else {
    router.navigate(['/login']);
    return false;
  }

};
