import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, filter, from, map, of, switchMap } from 'rxjs';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { InMemoryUserContextStorage } from '../storages/in-memory-user-context.storage';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LoadUserContextService } from '../resolvers/load-user-context.service';
import { contextLoaded$ } from '../app.component';
// import { contextLoaded$ } from '../app.module';

@Injectable()
export class IsAdminGuard {
  constructor(
    private _userService: UserService,
    private _authService: AuthService,
    private _router: Router,
    private _inMemoryUserContextStorage: InMemoryUserContextStorage,
    private _authClient: AngularFireAuth,
    private _loadUserContextService: LoadUserContextService,
  ) {}
  canActivate(
    activatedRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> {
    return contextLoaded$.pipe(
      filter((loaded) => {
        return loaded === true;
      }),
      switchMap(() =>
        this._inMemoryUserContextStorage.select().pipe(
          filter((user) => !!user.authId === true),
          map((user) => {
            return user.role === 'admin' ? true : false;
          }),
        ),
      ),
    );

    // return this._loadUserContextService.load().pipe(
    //   switchMap(() => {
    //     return this._inMemoryUserContextStorage.select().pipe(
    //       map((user) => {
    //         return user.role === 'admin' ? true : false;
    //       })
    //     );
    //   })
    // );
    // return this._authService
    //   .load()
    //   .pipe(
    //     switchMap((userContext) =>
    //       this._userService
    //         .getOneUserByAuth(userContext.id)
    //         .pipe(map((user) => (user.role === 'admin' ? true : false)))
    //     )
    //   );
    // return of(true);
  }
}
