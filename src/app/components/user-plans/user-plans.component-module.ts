import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { UserPlansComponent } from './user-plans.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  imports: [MatListModule, CommonModule, MatTabsModule],
  declarations: [UserPlansComponent],
  providers: [],
  exports: [UserPlansComponent],
})
export class UserPlansComponentModule {}
