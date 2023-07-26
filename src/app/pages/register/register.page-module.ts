import { NgModule } from '@angular/core';
import { RegisterPage } from './register.page';
import { RegistrationComponentModule } from 'src/app/components/registration/registration.component-module';

@NgModule({
  imports: [RegistrationComponentModule],
  declarations: [RegisterPage],
  providers: [],
  exports: [RegisterPage],
})
export class RegisterPageModule {}
