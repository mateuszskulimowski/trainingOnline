import { NgModule } from '@angular/core';
import { RatingModalComponent } from './rating-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AsyncPipe, CommonModule } from '@angular/common';

@NgModule({
  imports: [MatDialogModule, CommonModule],
  declarations: [RatingModalComponent],
  providers: [],
  exports: [RatingModalComponent],
})
export class RatingModalComponentModule {}
