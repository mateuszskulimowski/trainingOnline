import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { map, startWith, switchMap, take, tap } from 'rxjs/operators';
import { TrainingModel } from '../../models/training.model';
import { AuthService } from '../../services/auth.service';
import { TrainingService } from '../../services/training.service';
import { UserService } from '../../services/user.service';
import { TrainingListWithUsersWeekQueryModel } from 'src/app/query-models/training-list-with-users-week.query-model';
import { MatDialog } from '@angular/material/dialog';
import { RatingModalComponent } from '../rating-modal/rating-modal.component';
import { UserContextModel } from 'src/app/models/user-context.model';
import { TrainingWithUserQueryModel } from 'src/app/query-models/training-with-user.query-model';

@Component({
  selector: 'app-training-plans',
  templateUrl: './training-plans.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingPlansComponent implements AfterContentInit {
  readonly userContext$: Observable<UserContextModel> =
    this._authService.userContext$.pipe(
      map((context) => {
        return {
          id: context.id,
          email: context.email,
          isVerified: context.isVerified,
        };
      })
    );
  readonly userRole$: Observable<string> = this.userContext$.pipe(
    switchMap((userContext) => {
      return this._userService.getOneUserByAuth(userContext.id).pipe(
        map((user) => {
          console.log('user');
          return user.role;
        }),
        take(1)
      );
    })
  );

  readonly trainingPlansQuery$: Observable<
    TrainingListWithUsersWeekQueryModel[]
  > = combineLatest([
    this._trainingService.getAllPlans(),
    this.userContext$,
    this._activatedRoute.params,
    this.userRole$,
  ]).pipe(
    map(([trainingPlans, userContext, params, userRole]) =>
      params['authId']
        ? this._getTrainingWithUser(trainingPlans, params['authId'], userRole)
        : this._getTrainingWithUser(trainingPlans, userContext.id, userRole)
    ),

    switchMap((trainingData) => {
      return this._userService.getOneUserByAuth(trainingData.authId).pipe(
        map((user) =>
          user.trainingWeeks
            .map((week) => {
              console.log('elo', trainingData.userRole);
              const weekTraining: TrainingModel[] =
                trainingData.training.filter(
                  (training) => week == training.trainingWeek
                );
              console.log('dupa');
              return new TrainingListWithUsersWeekQueryModel(
                week,
                weekTraining,
                trainingData.userRole
              );
            })
            .reverse()
        )
      );
    })
  );

  constructor(
    private _authService: AuthService,
    private _trainingService: TrainingService,
    private _router: Router,
    public dialog: MatDialog,
    private _activatedRoute: ActivatedRoute,
    private _userService: UserService
  ) {}
  ngAfterContentInit(): void {
    this._authService.load().subscribe();
  }

  identify(index: number, item: any) {
    return index;
  }

  onClickTraining(training: TrainingModel): void {
    this._activatedRoute.params
      .pipe(
        tap((params) =>
          params['authId']
            ? this._editTraining(training)
            : this._openTrainingDetails(training)
        )
      )
      .subscribe();
  }
  removeTraining(trainingId: string): void {
    this._trainingService.removeTraining(trainingId).subscribe();
  }

  private _getTrainingWithUser(
    trainings: TrainingModel[],
    authId: string,
    userRole: string
  ): TrainingWithUserQueryModel {
    console.log(userRole);
    return {
      training: trainings.filter(
        (training) => training.authId && training.authId.includes(authId)
      ),
      authId: authId,
      userRole: userRole,
    };
  }

  private _editTraining(training: TrainingModel): void {
    this._trainingService
      .addTrainingElementsToContext(training)
      .pipe(
        switchMap(() =>
          this._activatedRoute.params.pipe(
            tap((params) => {
              this._router.navigate([
                `edit-plan/${params['authId']}/${training.id}`,
              ]);
            })
          )
        )
      )
      .subscribe();
  }
  private _openTrainingDetails(training: TrainingModel): void {
    this._router.navigate([`training/${training.id}`]);
  }
}
