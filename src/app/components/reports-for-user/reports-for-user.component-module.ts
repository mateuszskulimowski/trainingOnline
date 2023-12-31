import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { ReportsForUserComponent } from './reports-for-user.component';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { AllRepsPipeModule } from 'src/app/pipes/all-reps.pipe-module';
import { SummaryExerciseValuesPipeModule } from 'src/app/pipes/summary-exercise-values.pipe-module';
import { AverageValuePipeModule } from 'src/app/pipes/average-value.pipe-module';

@NgModule({
  imports: [
    MatExpansionModule,
    MatCardModule,
    ReactiveFormsModule,
    CommonModule,
    MatDividerModule,
    AllRepsPipeModule,
    SummaryExerciseValuesPipeModule,
    AverageValuePipeModule,
  ],
  declarations: [ReportsForUserComponent],
  providers: [],
  exports: [ReportsForUserComponent],
})
export class ReportsForUserComponentModule {}
