import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CreatePlanModalComponent } from './create-plan-modal.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { SortPipeModule } from 'src/app/pipes/sort.pipe-module';

@NgModule({
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatButtonModule,
    MatExpansionModule,
    MatDividerModule,
    MatSelectModule,
    SortPipeModule,
  ],
  declarations: [CreatePlanModalComponent],
  providers: [],
  exports: [CreatePlanModalComponent],
})
export class CreatePlanModalComponentModule {}
