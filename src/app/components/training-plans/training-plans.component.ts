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
import { TrainingListWithUsersWeekQueryModel } from 'src/app/query-models/training-list-with-users-week.query-model';
import { MatDialog } from '@angular/material/dialog';
import { RatingModalComponent } from '../rating-modal/rating-modal.component';

@Component({
  selector: 'app-training-plans',
  templateUrl: './training-plans.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingPlansComponent implements AfterContentInit {
  @Input() set date(value: ChoiseDateModel) {}
  readonly userContext$: Observable<any> = this._authService.userContext$.pipe(
    map((context) => {
      return {
        id: context.id,
        email: context.email,
        isVerified: context.isVerified,
      };
    })
  );

  readonly trainingPlansQuery$: Observable<
    TrainingListWithUsersWeekQueryModel[]
  > = combineLatest([
    this._trainingService.getAllPlans(),

    this.userContext$,
  ]).pipe(
    map(([trainingPlans, userContext]) => {
      const training = trainingPlans.filter(
        (training) =>
          training.userId && training.userId.includes(userContext.id)
      );
      // return training;
      return { training: training, authId: userContext.id };
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
    private _authService: AuthService,
    private _trainingService: TrainingService,
    private _router: Router,
    public dialog: MatDialog,
    private _userService: UserService
  ) {}
  ngAfterContentInit(): void {
    this._authService.load().subscribe();
  }

  openTrainingDetails(trainingId: string): void {
    this._router.navigate([`training/${trainingId}`]);
  }
  openRaitingWeekModal() {
    let dialogRef = this.dialog.open(RatingModalComponent, {
      height: '180px',
      width: '340px',
      data: 'dupa',
    });
  }
}
