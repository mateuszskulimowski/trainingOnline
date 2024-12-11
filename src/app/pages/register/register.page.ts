import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { RegistrationComponentModule } from 'src/app/components/registration/registration.component-module';

@Component({
  selector: 'app-register-page',
  templateUrl: './register.page.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RegistrationComponentModule],
})
export class RegisterPage {}
