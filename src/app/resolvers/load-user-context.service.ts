import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {
  Observable,
  Subject,
  map,
  of,
  shareReplay,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { UserContext } from '../contexts/user.context';
import { InMemoryUserContextStorage } from '../storages/in-memory-user-context.storage';
import { UserService } from '../services/user.service';

@Injectable()
export class LoadUserContextService {
  private _isRoleSubject: Subject<string> = new Subject<string>();
  public isRole$: Observable<string> = this._isRoleSubject.asObservable();
  constructor(
    private _authService: AuthService,
    private _inMemoryUserContextStorage: InMemoryUserContextStorage,
    private _userService: UserService
  ) {}

  load(): Observable<void> {
    this._authService
      .getOne()
      .pipe(
        shareReplay(1),
        switchMap((userContext) => {
          if (userContext === null && userContext === undefined) {
            return of({ authId: '', email: '', role: '' });
          }
          return this._userService
            .getOneUserByAuth(userContext?.uid as string)
            .pipe(
              // take(1),
              map((user) => {
                const context: UserContext = {
                  authId: userContext?.uid,
                  email: userContext?.email,
                  role: user.role,
                } as UserContext;

                return context;
              })
            );
        }),
        switchMap((context) => {
          this._isRoleSubject.next(context.role);
          return this._inMemoryUserContextStorage.setState(context);
        })
      )
      .subscribe();

    return of(void 0);
  }
}
