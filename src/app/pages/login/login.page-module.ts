import { NgModule } from '@angular/core';
import { LoginPage } from './login.page';
import { LoginComponentModule } from 'src/app/components/login/login.component-module';

@NgModule({
  imports: [LoginComponentModule],
  declarations: [LoginPage],
  providers: [],
  exports: [LoginPage],
})
export class LoginPageModule {}
