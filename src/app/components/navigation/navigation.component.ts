import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserContext } from '../../contexts/user.context';
import { AuthService } from '../../services/auth.service';
import { InMemoryUserContextStorage } from '../../storages/in-memory-user-context.storage';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  readonly userAuthContext$: Observable<UserContext> =
    this._inMemoryUserContextStorage.select();
  private _isToggleSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  readonly isToggle$: Observable<boolean> =
    this._isToggleSubject.asObservable();
  // readonly menu$:Observable<{label:string,route:string}[]>=of([])
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

  onToggleClicked(): void {
    this._isToggleSubject.next(!this._isToggleSubject.value);
  }
}
