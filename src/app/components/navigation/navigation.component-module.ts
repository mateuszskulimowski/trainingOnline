import { NgModule } from '@angular/core';
import { NavigationComponent } from './navigation.component';
import { MatToolbarModule } from '@angular/material/toolbar';
@NgModule({
  imports: [MatToolbarModule],
  declarations: [NavigationComponent],
  providers: [],
  exports: [NavigationComponent],
})
export class NavigationComponentModule {}
