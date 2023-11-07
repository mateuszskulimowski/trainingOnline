import { NgModule } from '@angular/core';
import { ReportsComponent } from './reports.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [
    MatExpansionModule,
    CommonModule,
    MatDividerModule,
    MatDialogModule,
  ],
  declarations: [ReportsComponent],
  providers: [],
  exports: [ReportsComponent],
})
export class ReportsComponentModule {}
