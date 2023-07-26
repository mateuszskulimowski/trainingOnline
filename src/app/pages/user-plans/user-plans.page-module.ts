import { NgModule } from '@angular/core';
import { UserPlansPage } from './user-plans.page';
import { UserPlansComponentModule } from 'src/app/components/user-plans/user-plans.component-module';

@NgModule({
  imports: [UserPlansComponentModule],
  declarations: [UserPlansPage],
  providers: [],
  exports: [UserPlansPage],
})
export class UserPlansPageModule {}
