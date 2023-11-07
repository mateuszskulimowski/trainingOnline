import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { InMemoryUserContextStorage } from '../storages/in-memory-user-context.storage';
import { LoadUserContextService } from '../resolvers/load-user-context.service';

@Injectable()
export class IsNotLoggedInGuard implements CanActivate {
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _inMemoryUserContextStorage: InMemoryUserContextStorage,
    private _loadUserContextService: LoadUserContextService
  ) {}
  canActivate(
    activatedRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    this._loadUserContextService;
    // .load()
    // .subscribe(() => );
    // this._loadUserContextService
    //   .load()
    //   .subscribe(() => );

    return this._inMemoryUserContextStorage
      .select()
      .pipe(
        map((userContext) =>
          userContext.authId ? true : this._router.parseUrl('/login')
        )
      );
    // return this._authService
    //   .load()
    //   .pipe(
    //     map((userContext) =>
    //       userContext ? true : this._router.parseUrl('/login')
    //     )
    //   );
    // return of(true);
  }
}
