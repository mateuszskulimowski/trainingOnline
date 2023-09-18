import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { TrainingDetailsComponent } from './training-details.component';

@NgModule({
  imports: [MatDividerModule, CommonModule, MatCardModule],
  declarations: [TrainingDetailsComponent],
  providers: [],
  exports: [TrainingDetailsComponent],
})
export class TrainingDetailsComponentModule { }
