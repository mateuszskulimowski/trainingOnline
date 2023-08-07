import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { UserDetailsComponent } from './user-details.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule],
  declarations: [UserDetailsComponent],
  providers: [],
  exports: [UserDetailsComponent],
})
export class UserDetailsComponentModule {}
