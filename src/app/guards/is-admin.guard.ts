import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map, of, switchMap } from 'rxjs';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class IsAdminGuard implements CanActivate {
  constructor(
    private _userService: UserService,
    private _authService: AuthService,
    private _router: Router
  ) {}
  canActivate(
    activatedRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this._authService
      .load()
      .pipe(
        switchMap((userContext) =>
          this._userService
            .getOneUserByAuth(userContext.id)
            .pipe(map((user) => (user.role === 'admin' ? true : false)))
        )
      );
    return of(true);
  }
}
