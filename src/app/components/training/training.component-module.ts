import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { TrainingComponent } from './training.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  imports: [MatListModule, CommonModule, MatTabsModule],
  declarations: [TrainingComponent],
  providers: [],
  exports: [TrainingComponent],
})
export class TrainingComponentModule {}
