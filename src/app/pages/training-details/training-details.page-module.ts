import { NgModule } from '@angular/core';
import { TrainingDetailsPage } from './training-details.page';
import { TrainingDetailsComponentModule } from 'src/app/components/training-details/training-details.component-module';

@NgModule({
  imports: [TrainingDetailsComponentModule],
  declarations: [TrainingDetailsPage],
  providers: [],
  exports: [TrainingDetailsPage],
})
export class TrainingDetailsPageModule {}
