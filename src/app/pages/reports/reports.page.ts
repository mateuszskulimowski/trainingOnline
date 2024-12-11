import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ReportsComponentModule } from 'src/app/components/reports/reports.component-module';

@Component({
  selector: 'app-reports-page',
  templateUrl: './reports.page.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReportsComponentModule],
})
export class ReportsPage {}
