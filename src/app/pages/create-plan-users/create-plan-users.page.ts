import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { CreatePlanComponentModule } from 'src/app/components/create-plan/create-plan.component-module';
import { UserListComponent } from 'src/app/components/user-list/user-list.component';

@Component({
  selector: 'app-create-plan-users-page',
  templateUrl: './create-plan-users.page.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, UserListComponent, CreatePlanComponentModule],
})
export class CreatePlanUsersPage {}
