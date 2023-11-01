import { NgModule } from '@angular/core';
import { HasAdminDirective } from './has-admin.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [HasAdminDirective],
  providers: [],
  exports: [HasAdminDirective],
})
export class HasAdminDirectiveModule {}
