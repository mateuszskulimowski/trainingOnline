import { NgModule } from '@angular/core';
import { EditPlanPage } from './edit-plan.page';
import { EditPlanComponentModule } from 'src/app/components/edit-plan/edit-plan.component-module';
import { UserListComponentModule } from 'src/app/components/user-list/user-list.component-module';

@NgModule({
  imports: [UserListComponentModule, EditPlanComponentModule],
  declarations: [EditPlanPage],
  providers: [],
  exports: [EditPlanPage],
})
export class EditPlanPageModule {}
