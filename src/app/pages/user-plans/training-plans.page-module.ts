import { NgModule } from '@angular/core';
import { TrainingPlansComponentModule } from 'src/app/components/training-plans/training-plans.component-module';
import { TrainingPlansPage } from './training-plans.page';
import { CommonModule } from '@angular/common';
import { TrainingDetailsComponentModule } from 'src/app/components/training-details/training-details.component-module';

@NgModule({
  imports: [
    CommonModule,
    TrainingPlansComponentModule,
    TrainingDetailsComponentModule,
  ],
  declarations: [TrainingPlansPage],
  providers: [],
  exports: [TrainingPlansPage],
})
export class TrainingPlansPageModule {}
