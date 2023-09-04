import { NgModule } from '@angular/core';
import { TrainingPlansComponentModule } from 'src/app/components/training-plans/training-plans.component-module';
import { TrainingPlansPage } from './training-plans.page';
import { ChoiseDateComponentModule } from 'src/app/components/choise-date/choise-date.component-module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    TrainingPlansComponentModule,
    ChoiseDateComponentModule,
  ],
  declarations: [TrainingPlansPage],
  providers: [],
  exports: [TrainingPlansPage],
})
export class TrainingPlansPageModule {}
