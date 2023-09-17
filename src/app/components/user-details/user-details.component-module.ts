import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { UserDetailsComponent } from './user-details.component';

@NgModule({
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule, ReactiveFormsModule],
  declarations: [UserDetailsComponent],
  providers: [],
  exports: [UserDetailsComponent],
})
export class UserDetailsComponentModule { }
