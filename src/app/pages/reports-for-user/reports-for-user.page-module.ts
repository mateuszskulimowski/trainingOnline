import { NgModule } from '@angular/core';
import { ReportsForUserPage } from './reports-for-user.page';
import { ReportsForUserComponentModule } from 'src/app/components/reports-for-user/reports-for-user.component-module';

@NgModule({
  imports: [ReportsForUserComponentModule],
  declarations: [ReportsForUserPage],
  providers: [],
  exports: [ReportsForUserPage],
})
export class ReportsForUserPageModule {}
