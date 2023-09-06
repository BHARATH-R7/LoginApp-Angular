import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { map, take } from 'rxjs';
import { AuthService } from './auth.service';

export const AuthGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  //In AuthGuard we return true or false, whether to navigate or not to the route having canActivate property
  return authService.authResData.pipe(
    take(1),
    map((status) => {
      if (status.token !== '') {
        console.log('Auth Guard: True');
        return true;
      }
      console.log('Auth Guard: False');
      return router.createUrlTree(['']);

      
    })
  );
};