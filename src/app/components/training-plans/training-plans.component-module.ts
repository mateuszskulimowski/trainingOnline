import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { TrainingPlansComponent } from './training-plans.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { RatingModalComponentModule } from '../rating-modal/rating-modal.component-module';
import { MatIconModule } from '@angular/material/icon';
import { HasAdminDirective } from 'src/app/directives/has-admin/has-admin.directive';
import { HasAdminDirectiveModule } from 'src/app/directives/has-admin/has-admin.directive-module';
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
    MatDialogModule,
    RatingModalComponentModule,
    MatIconModule,
    HasAdminDirectiveModule,
  ],
  declarations: [TrainingPlansComponent],
  providers: [],
  exports: [TrainingPlansComponent],
})
export class TrainingPlansComponentModule {}
