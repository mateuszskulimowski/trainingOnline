import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ReportsForUserComponentModule } from 'src/app/components/reports-for-user/reports-for-user.component-module';

@Component({
  selector: 'app-reports-for-user-page',
  templateUrl: './reports-for-user.page.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReportsForUserComponentModule],
})
export class ReportsForUserPage {}
