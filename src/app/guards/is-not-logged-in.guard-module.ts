import { NgModule } from '@angular/core';
import { IsNotLoggedInGuard } from './is-not-logged-in.guard';

@NgModule({
  imports: [],
  declarations: [],
  providers: [IsNotLoggedInGuard],
  exports: [],
})
export class IsNotLoggedInGuardModule {}
