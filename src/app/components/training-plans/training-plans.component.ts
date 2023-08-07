import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, combineLatest, map, startWith } from 'rxjs';
import { YearModel } from '../../models/year.model';
import { MonthModel } from '../../models/month.model';
import { WeekModel } from '../../models/week.model';
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
  readonly user$: Observable<{
    id: string;
    email: string;
    isVerified: boolean;
  }> = this._authService.userContext$;
  readonly years$: Observable<YearModel[]> = this._trainingService.getYears();
  readonly months$: Observable<MonthModel[]> =
    this._trainingService.getMonths();
  readonly weeks$: Observable<WeekModel[]> = this._trainingService.getWeeks();
  readonly filterForm: FormGroup = new FormGroup({
    year: new FormControl(''),
    month: new FormControl(''),
    week: new FormControl(''),
  });

  readonly filterFormValue = this.filterForm.valueChanges.pipe(
    startWith({ year: '', month: '', week: '' })
  );
  readonly trainingPlans$: Observable<TrainingModel[]> = combineLatest([
    this._trainingService.getAllPlans(),
    this.filterFormValue,
    this.user$,
  ]).pipe(
    map(([trainingPlans, filterForm, user]) => {
      // console.log(filterForm);
      const training = trainingPlans
        .filter((training) => training.userId.includes(user.id))
        .filter((training) => training.yearId.includes(filterForm['year']))
        .filter((training) => training.monthId.includes(filterForm['month']))
        .filter((training) => training.weekId.includes(filterForm['week']));

      console.log(training);
      return training;
    })
  );

  constructor(
    private _authService: AuthService,
    private _trainingService: TrainingService
  ) {
    _authService.load().subscribe();
  }
}
