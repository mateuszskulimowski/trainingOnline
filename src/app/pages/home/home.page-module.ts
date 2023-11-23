import { NgModule } from '@angular/core';
import { HomePage } from './home.page';
import { HomeComponentModule } from 'src/app/components/home/home.component-module';

@NgModule({
  imports: [HomeComponentModule],
  declarations: [HomePage],
  providers: [],
  exports: [HomePage],
})
export class HomePageModule {}
