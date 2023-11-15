import { NgModule } from '@angular/core';
import { UserListComponent } from './user-list.component';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
@NgModule({
  imports: [
    MatListModule,
    CommonModule,
    MatTabsModule,
    MatTableModule,
    RouterModule,
    MatCardModule,
  ],
  declarations: [UserListComponent],
  providers: [],
  exports: [UserListComponent],
})
export class UserListComponentModule {}
