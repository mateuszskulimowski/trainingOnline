import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { UserListComponent } from 'src/app/components/user-list/user-list.component';

@Component({
  selector: 'app-user-list-page',
  templateUrl: './user-list.page.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [UserListComponent],
})
export class UserListPage {}
