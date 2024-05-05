import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { UserService } from '../../services/user.service';
import { TrainingService } from '../../services/training.service';
import { Observable, map, switchMap } from 'rxjs';
import { TrainingListWithUsersWeekQueryModel } from 'src/app/query-models/training-list-with-users-week.query-model';
import { TrainingModel } from 'src/app/models/training.model';
import { InMemoryUserContextStorage } from 'src/app/storages/in-memory-user-context.storage';

@Component({
  selector: 'app-reports-for-user',
  templateUrl: './reports-for-user.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportsForUserComponent {
  readonly trainings$: Observable<TrainingListWithUsersWeekQueryModel[]> =
    this._inMemoryUserContexStoraget.select().pipe(
      switchMap((userContext) =>
        this._trainingService.getAllPlans().pipe(
          switchMap((trainingPlans) => {
            return this._userService.getOneUserByAuth(userContext.authId).pipe(
              map((user) =>
                user.trainingWeeks
                  .map((week) => {
                    const weekTraining: TrainingModel[] = trainingPlans
                      .filter(
                        (training) => week.number === training.trainingWeek
                      )
                      .filter(
                        (training) => training.authId === userContext.authId
                      );
                    const isToCheck = weekTraining.some((training) => {
                      return training.hasFill;
                    });
                    console.log(weekTraining);

                    return new TrainingListWithUsersWeekQueryModel(
                      user.id,
                      week,
                      weekTraining.reverse(),
                      false
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
    private _userService: UserService,
    private _trainingService: TrainingService,
    private _inMemoryUserContexStoraget: InMemoryUserContextStorage
  ) {}
  identify(index: number, item: any) {
    return index;
  }
}
