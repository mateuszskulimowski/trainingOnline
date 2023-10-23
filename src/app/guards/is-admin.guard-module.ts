import { NgModule } from '@angular/core';
import { IsAdminGuard } from './is-admin.guard';

@NgModule({
  imports: [],
  declarations: [],
  providers: [IsAdminGuard],
  exports: []
})
export class IsAdminGuardModule {
}
