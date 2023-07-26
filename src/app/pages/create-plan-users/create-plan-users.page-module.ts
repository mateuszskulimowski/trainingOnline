import { NgModule } from '@angular/core';
import { CreatePlanUsersPage } from './create-plan-users.page';
import { UserListComponentModule } from 'src/app/components/user-list/user-list.component-module';

@NgModule({
  imports: [UserListComponentModule],
  declarations: [CreatePlanUsersPage],
  providers: [],
  exports: [CreatePlanUsersPage],
})
export class CreatePlanUsersPageModule {}
