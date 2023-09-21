import { NgModule } from '@angular/core';
import { TrainingPlansForTrainierPage } from './training-plans-for-trainier.page';
import { TrainingPlansForTrainerComponentModule } from 'src/app/components/training-plans-for-trainer/training-plans-for-trainer.component-module';

@NgModule({
  imports: [TrainingPlansForTrainerComponentModule],
  declarations: [TrainingPlansForTrainierPage],
  providers: [],
  exports: [TrainingPlansForTrainierPage],
})
export class TrainingPlansForTrainierPageModule {}
