import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TrainingModel } from '../../models/training.model';
import { TrainingService } from '../../services/training.service';

@Component({
  selector: 'app-training-details',
  templateUrl: './training-details.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingDetailsComponent {
  readonly trainingDetails$: Observable<TrainingModel> =
    this._activatedRoute.params.pipe(
      switchMap((params) =>
        this._trainingService.getOneTraining(params['trainingId'])
      )
    );

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _trainingService: TrainingService
  ) {}
}
