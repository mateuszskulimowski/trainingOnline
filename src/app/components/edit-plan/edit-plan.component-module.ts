import { NgModule } from '@angular/core';
import { EditPlanComponent } from './edit-plan.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

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
    MatIconModule,
  ],
  declarations: [EditPlanComponent],
  providers: [],
  exports: [EditPlanComponent],
})
export class EditPlanComponentModule {}
