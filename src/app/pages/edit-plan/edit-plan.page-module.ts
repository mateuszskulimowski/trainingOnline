import { NgModule } from '@angular/core';
import { EditPlanPage } from './edit-plan.page';
import { CreatePlanComponentModule } from 'src/app/components/create-plan/create-plan.component-module';

@NgModule({
  imports: [CreatePlanComponentModule],
  declarations: [EditPlanPage],
  providers: [],
  exports: [EditPlanPage],
})
export class EditPlanPageModule {}
