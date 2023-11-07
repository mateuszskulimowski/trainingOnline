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
import { UserContext } from 'src/app/contexts/user.context';
import { InMemoryUserContextStorage } from 'src/app/storages/in-memory-user-context.storage';

@Component({
  selector: 'app-training-plans',
  templateUrl: './training-plans.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingPlansComponent implements AfterContentInit {
  trainingReport: boolean = false;

  readonly userContext$: Observable<UserContext> =
    this._inMemoryUserContextStorage.select();

  readonly trainingPlansQuery$: Observable<
    TrainingListWithUsersWeekQueryModel[]
  > = combineLatest([
    this._trainingService.getAllPlans(),
    this.userContext$,
    this._activatedRoute.params,
  ]).pipe(
    map(([trainingPlans, userContext, params]) => {
      if (this._router.url.includes('reports')) {
        this.trainingReport = true;
      }
      return params['authId']
        ? this._getTrainingWithUser(trainingPlans, params['authId'])
        : this._getTrainingWithUser(trainingPlans, userContext.authId);
    }),

    switchMap((trainingData) => {
      return this._userService.getOneUserByAuth(trainingData.authId).pipe(
        map((user) =>
          user.trainingWeeks
            .map((week) => {
              const weekTraining: TrainingModel[] =
                trainingData.training.filter(
                  (training) => week.number == training.trainingWeek
                );

              return new TrainingListWithUsersWeekQueryModel(
                user.id,
                week,
                weekTraining.reverse(),
                false //to jest tu zbedne
              );
            })
            .sort((a, b) => {
              return b.week.number - a.week.number;
            })
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
    private _userService: UserService,
    private _inMemoryUserContextStorage: InMemoryUserContextStorage
  ) {}
  ngAfterContentInit(): void {
    // this._authService.load().subscribe();
  }

  identify(index: number, item: any) {
    return index;
  }

  onClickTraining(training: TrainingModel): void {
    this._activatedRoute.params
      .pipe(
        tap((params) => {
          if (params['authId']) {
            if (this.trainingReport) {
              this._router.navigate([`report-trainer/${training.id}`]);
            } else {
              this._editTraining(training);
            }
          } else {
            this._openTrainingDetails(training);
          }
        })
      )
      .subscribe();
  }
  removeTraining(trainingId: string): void {
    this._trainingService.removeTraining(trainingId).subscribe();
  }

  private _getTrainingWithUser(
    trainings: TrainingModel[],
    authId: string
  ): TrainingWithUserQueryModel {
    return {
      training: trainings.filter(
        (training) => training.authId && training.authId.includes(authId)
      ),
      authId: authId,
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
