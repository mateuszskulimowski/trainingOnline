import { NgModule } from '@angular/core';
import { UserDetailsPage } from './user-details.page';
import { UserDetailsComponentModule } from 'src/app/components/user-details/user-details.component-module';

@NgModule({
  imports: [UserDetailsComponentModule],
  declarations: [UserDetailsPage],
  providers: [],
  exports: [UserDetailsPage],
})
export class UserDetailsPageModule {}
