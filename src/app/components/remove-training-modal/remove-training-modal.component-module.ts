import { NgModule } from '@angular/core';
import { RemoveTrainingModalComponent } from './remove-training-modal.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [MatDialogModule],
  declarations: [RemoveTrainingModalComponent],
  providers: [],
  exports: [RemoveTrainingModalComponent],
})
export class RemoveTrainingModalComponentModule {}
