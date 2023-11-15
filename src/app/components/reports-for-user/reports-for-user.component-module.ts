import { NgModule } from '@angular/core';
import { ReportsForUserComponent } from './reports-for-user.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule],
  declarations: [ReportsForUserComponent],
  providers: [],
  exports: [ReportsForUserComponent],
})
export class ReportsForUserComponentModule {}
