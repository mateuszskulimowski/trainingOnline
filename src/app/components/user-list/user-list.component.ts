import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserModel } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatListModule,
    CommonModule,
    MatTabsModule,
    MatTableModule,
    RouterModule,
    MatCardModule,
  ],
})
export class UserListComponent {
  readonly users$: Observable<UserModel[]> = this._userService
    .getAllUsers()
    .pipe(map((users) => users.map((user, i) => ({ ...user, index: i + 1 }))));

  constructor(private _userService: UserService) {}
}
