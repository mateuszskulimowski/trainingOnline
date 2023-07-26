import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { Observable } from 'rxjs';
import { TrainingModel } from '../../models/training.model';
import { TrainingService } from '../../services/training.service';

@Component({
  selector: 'app-user-plans',
  templateUrl: './user-plans.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPlansComponent {
  readonly trainings$: Observable<TrainingModel[]> =
    this._trainingService.getAllPlans();

  constructor(private _trainingService: TrainingService) {}
}
