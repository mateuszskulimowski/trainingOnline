import { NgModule } from '@angular/core';

import { UserListComponentModule } from '../../components/user-list/user-list.component-module';
import { UserListPage } from './user-list.page';

@NgModule({
  imports: [UserListComponentModule],
  declarations: [UserListPage],
  providers: [],
  exports: [UserListPage],
})
export class UserListPageModule {}
