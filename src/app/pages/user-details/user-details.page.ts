import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { UserDetailsComponentModule } from 'src/app/components/user-details/user-details.component-module';

@Component({
  selector: 'app-user-details-page',
  templateUrl: './user-details.page.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [UserDetailsComponentModule],
})
export class UserDetailsPage {}
