import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { TrainingDetailsComponent } from './training-details.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [MatDividerModule, CommonModule, MatCardModule, MatDialogModule],
  declarations: [TrainingDetailsComponent],
  providers: [],
  exports: [TrainingDetailsComponent],
})
export class TrainingDetailsComponentModule {}
