import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { Observable } from 'rxjs';
import { TrainingModel } from '../../models/training.model';
import { TrainingService } from '../../services/training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingComponent {
  readonly trainings$: Observable<TrainingModel[]> =
    this._trainingService.getAllPlans();

  constructor(private _trainingService: TrainingService) {}
}
