import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';

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
    private _userService: UserService
  ) {}

  onRegisterFormSubmitted(registerForm: FormGroup): void {
    if (registerForm.invalid) {
      return;
    }
    console.log(registerForm.get('email')?.value);
    this._authService
      .register({
        email: registerForm.get('email')?.value,
        password: registerForm.get('password')?.value,
      })
      .subscribe((userId) => {
        this.addUserData(registerForm, userId);
      });
  }
  load() {
    this._authService.load().subscribe();
  }
  logout() {
    this._authService.logOut().subscribe();
  }
  private addUserData(
    registerForm: FormGroup,
    userId: string | undefined
  ): Observable<void> {
    return this._userService.addUser({
      name: registerForm.get('name')?.value,
      lastName: registerForm.get('lastName')?.value,
      email: registerForm.get('email')?.value,
      role: 'user',
      authId: userId,
      trainerId: '',
    });
  }
}
