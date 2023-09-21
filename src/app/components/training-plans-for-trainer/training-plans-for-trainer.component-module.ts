import { NgModule } from '@angular/core';
import { TrainingPlansForTrainerComponent } from './training-plans-for-trainer.component';
import { RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatOptionModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatListModule,
    MatExpansionModule,
    RouterModule,
  ],
  declarations: [TrainingPlansForTrainerComponent],
  providers: [],
  exports: [TrainingPlansForTrainerComponent],
})
export class TrainingPlansForTrainerComponentModule {}
