import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AccountService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.currentUser$.pipe(
      map((auth) => {
        if (auth) return true;

        this.router.navigate(['account/login'], {
          queryParams: { retunrUrl: state.url },
        });
        return false;
      })
    );
  }
}

// export const authGuard: CanActivateFn = (route, state) => {
//   const router = inject(Router);
//   const accountService = inject(AccountService);
//   return accountService.currentUser$.pipe(
//     map((auth) => {
//       if (auth) return true;

//       router.navigate(['/account/login'], {
//         queryParams: { returnUrl: state.url },
//       });
//       return false;
//     })
//   );
// };
