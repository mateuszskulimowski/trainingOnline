import { NgModule } from '@angular/core';
import { TrainingPlansComponentModule } from 'src/app/components/training-plans/training-plans.component-module';
import { TrainingPlansPage } from './training-plans.page';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, TrainingPlansComponentModule],
  declarations: [TrainingPlansPage],
  providers: [],
  exports: [TrainingPlansPage],
})
export class TrainingPlansPageModule {}
