import { NgModule } from '@angular/core';
import { NavigationComponent } from './navigation.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
@NgModule({
  imports: [
    MatToolbarModule,
    RouterModule,
    MatButtonModule,
    MatDividerModule,
    MatSidenavModule,
  ],
  declarations: [NavigationComponent],
  providers: [],
  exports: [NavigationComponent],
})
export class NavigationComponentModule {}
