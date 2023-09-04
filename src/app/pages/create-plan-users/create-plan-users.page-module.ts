import { NgModule } from '@angular/core';
import { CreatePlanUsersPage } from './create-plan-users.page';
import { UserListComponentModule } from 'src/app/components/user-list/user-list.component-module';
import { CreatePlanModalComponentModule } from 'src/app/components/create-plan-modal/create-plan-modal.component-module';
import { ChoiseDateComponentModule } from 'src/app/components/choise-date/choise-date.component-module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    UserListComponentModule,
    CreatePlanModalComponentModule,
    ChoiseDateComponentModule,
  ],
  declarations: [CreatePlanUsersPage],
  providers: [],
  exports: [CreatePlanUsersPage],
})
export class CreatePlanUsersPageModule {}
