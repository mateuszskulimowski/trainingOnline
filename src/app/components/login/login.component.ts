import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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

  constructor(private _authService: AuthService, private _router: Router) {}

  onLoginFormSubmitted(loginForm: FormGroup): void {
    this._authService
      .login({
        email: loginForm.get('email')?.value,
        password: loginForm.get('password')?.value,
      })
      .subscribe({ next: () => this._router.navigate(['/training-plans']) });
  }
}
