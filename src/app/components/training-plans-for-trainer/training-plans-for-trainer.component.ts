import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, combineLatest, map, switchMap, tap } from 'rxjs';
import { TrainingModel } from 'src/app/models/training.model';
import { TrainingListWithUsersWeekQueryModel } from 'src/app/query-models/training-list-with-users-week.query-model';
import { TrainingService } from 'src/app/services/training.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-training-plans-for-trainer',
  templateUrl: './training-plans-for-trainer.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingPlansForTrainerComponent {
  readonly trainingPlansQuery$: Observable<
    TrainingListWithUsersWeekQueryModel[]
  > = combineLatest([
    this._trainingService.getAllPlans(),

    this._activatedRoute.params,
  ]).pipe(
    map(([trainingPlans, params]) => {
      const training = trainingPlans.filter(
        (training) =>
          training.userId && training.userId.includes(params['userId'])
      );
      // return training;
      return { training: training, authId: params['userId'] };
    }),
    switchMap((trainingData) =>
      this._userService.getOneUserByAuth(trainingData.authId).pipe(
        map((user) =>
          user.trainingWeeks.map((week) => {
            const weekTraining: TrainingModel[] = trainingData.training.filter(
              (training) => week == training.trainingWeek
            );
            console.log(weekTraining);
            return new TrainingListWithUsersWeekQueryModel(
              week,
              weekTraining,
              user.role
            );
          })
        )
      )
    )
  );

  constructor(
    private _trainingService: TrainingService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _userService: UserService
  ) {}
  ngAfterContentInit(): void {}
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
