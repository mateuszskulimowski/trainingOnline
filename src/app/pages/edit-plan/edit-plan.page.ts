import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { CreatePlanComponentModule } from 'src/app/components/create-plan/create-plan.component-module';

@Component({
  selector: 'app-edit-plan-page',
  templateUrl: './edit-plan.page.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CreatePlanComponentModule],
})
export class EditPlanPage {}
