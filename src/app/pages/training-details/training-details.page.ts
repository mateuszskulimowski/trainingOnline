import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { TrainingDetailsComponentModule } from 'src/app/components/training-details/training-details.component-module';

@Component({
  selector: 'app-training-details-page',
  templateUrl: './training-details.page.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [TrainingDetailsComponentModule],
})
export class TrainingDetailsPage {}
