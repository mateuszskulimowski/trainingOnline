import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { TrainingListWithUsersWeekQueryModel } from '../../query-models/training-list-with-users-week.query-model';
import { TrainingModel } from '../../models/training.model';
import { TrainingService } from '../../services/training.service';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { RatingModalComponent } from '../rating-modal/rating-modal.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportsComponent {
  // private _isToCheckSubject: BehaviorSubject<boolean> =
  //   new BehaviorSubject<boolean>(false);
  // public isToCheck$: Observable<boolean> =
  //   this._isToCheckSubject.asObservable();

  readonly trainings$: Observable<TrainingListWithUsersWeekQueryModel[]> =
    this._activatedRoute.params.pipe(
      switchMap((params) =>
        this._trainingService.getAllPlans().pipe(
          switchMap((trainingPlans) => {
            return this._userService.getOneUserByAuth(params['authId']).pipe(
              map((user) =>
                user.trainingWeeks
                  .map((week) => {
                    const weekTraining: TrainingModel[] = trainingPlans
                      .filter(
                        (training) => week.number === training.trainingWeek
                      )
                      .filter(
                        (training) => training.authId === params['authId']
                      );
                    const isToCheck = weekTraining.some((training) => {
                      // console.log(training);
                      return training.hasFill;
                    });
                    console.log(isToCheck);
                    // console.log(weekTraining);
                    return new TrainingListWithUsersWeekQueryModel(
                      user.id,
                      week,
                      weekTraining,
                      isToCheck
                    );
                  })
                  .sort((a, b) => {
                    return b.week.number - a.week.number;
                  })
              )
            );
          })
        )
      )
    );

  constructor(
    private _trainingService: TrainingService,
    private _activatedRoute: ActivatedRoute,
    private _userService: UserService,
    public dialog: MatDialog
  ) {}
  hasChecked(trainingId: string): void {
    this._trainingService.setHasFillTraining(false, trainingId);
  }
  identify(index: number, item: any) {
    return index;
  }
  setCommentForWeekModal(
    userId: string,
    index: number,
    week: { number: number; comment: string }
  ): void {
    console.log(week);
    let dialogRef = this.dialog.open(RatingModalComponent, {
      width: '360px',
      data: {
        userId: userId,
        index: index,
        raitingType: 'weekComment',
        raitingComment: week.comment,
      },
    });
    // this._userService.setCommentForWeek(userId, index, 'undefined').subscribe();
  }
}
