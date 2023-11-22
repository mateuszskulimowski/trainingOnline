import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { ReportsForUserComponent } from './reports-for-user.component';

@NgModule({
  imports: [MatExpansionModule, MatCardModule, ReactiveFormsModule],
  declarations: [ReportsForUserComponent],
  providers: [],
  exports: [ReportsForUserComponent],
})
export class ReportsForUserComponentModule { }
