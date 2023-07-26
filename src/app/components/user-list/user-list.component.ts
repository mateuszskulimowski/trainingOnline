import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { Observable, map } from 'rxjs';
import { UserModel } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
  @Input() function!: string;
  readonly users$: Observable<UserModel[]> = this._userService
    .getAllUsers()
    .pipe(map((users) => users.map((user, i) => ({ ...user, index: i + 1 }))));

  constructor(private _userService: UserService) {}
}
