import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { ReportsForUserComponent } from './reports-for-user.component';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  imports: [
    MatExpansionModule,
    MatCardModule,
    ReactiveFormsModule,
    CommonModule,
    MatDividerModule,
  ],
  declarations: [ReportsForUserComponent],
  providers: [],
  exports: [ReportsForUserComponent],
})
export class ReportsForUserComponentModule {}
