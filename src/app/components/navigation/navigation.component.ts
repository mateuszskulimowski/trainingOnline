import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ContextModel } from '../../models/context.model';
import { AuthService } from '../../services/auth.service';
import { InMemoryUserContextStorage } from 'src/app/storages/in-memory-user-context.storage';
import { UserContext } from 'src/app/contexts/user.context';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  readonly userAuthContext$: Observable<UserContext> =
    this._inMemoryUserContextStorage.select();

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _inMemoryUserContextStorage: InMemoryUserContextStorage,
    private _cdr: ChangeDetectorRef
  ) {}

  logOut(): void {
    this._authService
      .logOut()
      .pipe(
        switchMap(() =>
          this._inMemoryUserContextStorage.setState({
            authId: '',
            email: '',
            role: '',
          })
        )
      )
      .subscribe({
        next: () => {
          // location.reload();
          this._router.navigate(['/']);
        },
      });

    // .subscribe({
    //   next: () => {
    //     this._inMemoryUserContextStorage
    //       .setState({
    //         authId: '',
    //         email: '',
    //         role: '',
    //       })
    //       .subscribe({ next: () => this._router.navigate(['/']) });
    //   this._inMemoryUserContextStorage
    //     .select()
    //     .pipe(tap((context) =>))
    //     .subscribe();
    // },
    // });
  }
}
