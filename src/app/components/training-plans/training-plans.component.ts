import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { ChoiseDateModel } from '../../models/choise-data.model';
import { TrainingModel } from '../../models/training.model';
import { AuthService } from '../../services/auth.service';
import { TrainingService } from '../../services/training.service';

@Component({
  selector: 'app-training-plans',
  templateUrl: './training-plans.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingPlansComponent {
  private _choiseDateSubject: BehaviorSubject<ChoiseDateModel> =
    new BehaviorSubject<ChoiseDateModel>({ year: '', month: '', week: '' });
  public choiseDate$: Observable<ChoiseDateModel> =
    this._choiseDateSubject.asObservable();

  @Input() set date(value: ChoiseDateModel) {
    this._choiseDateSubject.next(value);
  }
  readonly user$: Observable<{
    id: string;
    email: string;
    isVerified: boolean;
  }> = this._authService.userContext$;

  readonly trainingPlans$: Observable<TrainingModel[]> = combineLatest([
    this._trainingService.getAllPlans(),
    this.choiseDate$,
    this.user$,
  ]).pipe(
    map(([trainingPlans, date, user]) => {
      const training = trainingPlans
        .filter(
          (training) => training.yearId && training.yearId.includes(date.year)
        )
        .filter(
          (training) =>
            training.monthId && training.monthId.includes(date.month)
        )
        .filter(
          (training) => training.weekId && training.weekId.includes(date.week)
        )
        .filter(
          (training) => training.userId && training.userId.includes(user.id)
        );

      return training;
    })
  );

  editTraining(training: TrainingModel): void {
    this._trainingService
      .addTrainingElementsToContext(training.trainingElement)
      .pipe(
        switchMap(() =>
          this._activatedRoute.params.pipe(
            tap((params) => {
              // console.log(params);
              // console.log(`create-plan/${params['userId']}`);
              console.log(params);
              this._router.navigate([`create-plan/${params['userId']}`]);
            })
          )
        )
      )
      .subscribe(() => {});
  }

  constructor(
    private _authService: AuthService,
    private _trainingService: TrainingService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    _authService.load().subscribe();
  }
}
