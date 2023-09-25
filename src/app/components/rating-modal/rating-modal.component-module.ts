import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RatingModalComponent } from './rating-modal.component';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  imports: [MatDialogModule, CommonModule, ReactiveFormsModule, MatRadioModule],
  declarations: [RatingModalComponent],
  providers: [],
  exports: [RatingModalComponent],
})
export class RatingModalComponentModule {}
