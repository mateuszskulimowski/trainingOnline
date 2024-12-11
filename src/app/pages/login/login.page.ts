import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { LoginComponentModule } from 'src/app/components/login/login.component-module';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.page.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [LoginComponentModule],
})
export class LoginPage {}
