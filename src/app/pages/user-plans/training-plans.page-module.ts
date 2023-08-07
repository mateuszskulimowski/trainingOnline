import { NgModule } from '@angular/core';
import { TrainingPlansComponentModule } from 'src/app/components/training-plans/training-plans.component-module';
import { TrainingPlansPage } from './training-plans.page';

@NgModule({
  imports: [TrainingPlansComponentModule],
  declarations: [TrainingPlansPage],
  providers: [],
  exports: [TrainingPlansPage],
})
export class TrainingPlansPageModule {}
