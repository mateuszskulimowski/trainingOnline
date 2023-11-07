import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { InMemoryUserContextStorage } from 'src/app/storages/in-memory-user-context.storage';
import { EMPTY, catchError, switchMap } from 'rxjs';
import { LoadUserContextService } from 'src/app/resolvers/load-user-context.service';
import { FirebaseError } from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  readonly loginForm: FormGroup = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _inMemoryUserContextStorage: InMemoryUserContextStorage,
    private _loadUserContext: LoadUserContextService,
    private _cdr: ChangeDetectorRef
  ) {}

  onLoginFormSubmitted(loginForm: FormGroup): void {
    this._authService
      .login({
        email: loginForm.get('email')?.value,
        password: loginForm.get('password')?.value,
      })
      .pipe(
        catchError((error: FirebaseError) => {
          let errormsg = 'Something went wrong. Try again';
          switch (error.code) {
            case 'auth/user-not-found': {
              errormsg = 'Provided email does not exist.';
              break;
            }
            case 'auth/too-many-requests': {
              errormsg =
                'Too many failed login attempts. Wait and try again later.';

              break;
            }
            case 'auth/wrong-password': {
              errormsg = 'Incorrect password.';
              break;
            }
          }
          this.loginForm.setErrors({ backend: errormsg });
          this._cdr.detectChanges();
          return EMPTY;
        })
      )
      .subscribe({
        next: (userContext) => {
          this._inMemoryUserContextStorage.setState(userContext);
          this._loadUserContext.load();

          this._router.navigate(['/training-plans']);
        },
        complete: () => {
          this._cdr.detectChanges();
        },
      });
  }
}
