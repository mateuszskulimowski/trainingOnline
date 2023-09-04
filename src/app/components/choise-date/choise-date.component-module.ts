import { NgModule } from '@angular/core';
import { ChoiseDateComponent } from './choise-date.component';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatSelectModule,
  ],
  declarations: [ChoiseDateComponent],
  providers: [],
  exports: [ChoiseDateComponent],
})
export class ChoiseDateComponentModule {}
