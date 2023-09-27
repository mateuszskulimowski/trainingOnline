import { NgModule } from '@angular/core';
import { CreatePlanUsersPage } from './create-plan-users.page';
import { UserListComponentModule } from 'src/app/components/user-list/user-list.component-module';
import { CreatePlanComponentModule } from 'src/app/components/create-plan/create-plan.component-module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, UserListComponentModule, CreatePlanComponentModule],
  declarations: [CreatePlanUsersPage],
  providers: [],
  exports: [CreatePlanUsersPage],
})
export class CreatePlanUsersPageModule {}
