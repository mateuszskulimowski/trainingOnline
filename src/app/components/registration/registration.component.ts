import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent {
  readonly registerForm: FormGroup = new FormGroup({
    name: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
  });

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _userService: UserService
  ) {}

  onRegisterFormSubmitted(registerForm: FormGroup): void {
    if (registerForm.invalid) {
      return;
    }
    this._authService
      .register({
        email: registerForm.get('email')?.value,
        password: registerForm.get('email')?.value,
      })
      .subscribe((response) => {
        this._userService.addUser({
          name: registerForm.get('name')?.value,
          lastName: registerForm.get('lastName')?.value,
          email: registerForm.get('email')?.value,
          role: 'user',
          authId: response.user.multiFactor.user.uid,
        });
      });
  }
  load() {
    this._authService.load().subscribe();
  }
  logout() {
    this._authService.logOut().subscribe();
  }
}
