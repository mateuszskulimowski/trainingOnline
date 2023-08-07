import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { TrainingPlansComponent } from './training-plans.component';
import { MatExpansionModule } from '@angular/material/expansion';
@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatListModule,
    MatExpansionModule,
  ],
  declarations: [TrainingPlansComponent],
  providers: [],
  exports: [TrainingPlansComponent],
})
export class TrainingPlansComponentModule {}
