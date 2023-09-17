import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, combineLatest, of } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { ChoiseDateModel } from '../../models/choise-data.model';
import { TrainingModel } from '../../models/training.model';
import { AuthService } from '../../services/auth.service';
import { TrainingService } from '../../services/training.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-training-plans',
  templateUrl: './training-plans.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingPlansComponent implements AfterContentInit {
  private _choiseDateSubject: BehaviorSubject<ChoiseDateModel> =
    new BehaviorSubject<ChoiseDateModel>({ year: '', month: '', week: '' });
  public choiseDate$: Observable<ChoiseDateModel> =
    this._choiseDateSubject.asObservable();

  @Input() set date(value: ChoiseDateModel) {
    this._choiseDateSubject.next(value);
  }
  readonly user$: Observable<any> = this._authService.userContext$.pipe(
    map((context) => {
      return {
        id: context.id,
        email: context.email,
        isVerified: context.isVerified,
      };
    })
  );

  readonly trainingPlans$: Observable<TrainingModel[]> = combineLatest([
    this._trainingService.getAllPlans(),
    this.choiseDate$,
    this.user$,
    this._activatedRoute.params,
  ]).pipe(
    map(([trainingPlans, date, user, params]) => {
      if (params['userId']) {
        const training = trainingPlans.filter(
          (training) =>
            training.userId && training.userId.includes(params['userId'])
        );
        return training;
      } else {
        const training = trainingPlans.filter(
          (training) => training.userId && training.userId.includes(user.id)
        );
        return trainingPlans;
      }
    })
  );

  constructor(
    private _authService: AuthService,
    private _trainingService: TrainingService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _userService: UserService
  ) {}
  ngAfterContentInit(): void {
    this._authService.load().subscribe();
  }
  editTraining(training: TrainingModel): void {
    this._trainingService
      .addTrainingElementsToContext(training.trainingElement)
      .pipe(
        switchMap(() =>
          this._activatedRoute.params.pipe(
            tap((params) => {
              // console.log(params);
              // console.log(`create-plan/${params['userId']}`);

              this._router.navigate([
                `edit-plan/${params['userId']}/${training.id}`,
              ]);
            })
          )
        )
      )
      .subscribe(() => {});
  }
}
