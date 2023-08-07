import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { TrainingElementModel } from '../../models/training-element.model';
import { YearModel } from '../../models/year.model';
import { MonthModel } from '../../models/month.model';
import { WeekModel } from '../../models/week.model';
import { TrainingService } from '../../services/training.service';

@Component({
  selector: 'app-create-plan-modal',
  templateUrl: './create-plan-modal.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePlanModalComponent {
  readonly planForm: FormGroup = new FormGroup({
    exercise: new FormControl(
      'Rwanie z pomostu bez rozrzutu stop+na proste od kolan'
    ),
    comment: new FormControl('Pamietaj by prowadzic bliskoo siebie'),
    quantityExercise: new FormArray([]),
    year: new FormControl(),
    month: new FormControl(),
    week: new FormControl(),
  });
  readonly trainingExercises$: Observable<TrainingElementModel[]> =
    this._trainingService.traning$;
  readonly years$: Observable<YearModel[]> = this._trainingService.getYears();

  readonly months$: Observable<MonthModel[]> =
    this._trainingService.getMonths();

  readonly weeks$: Observable<WeekModel[]> = this._trainingService.getWeeks();

  constructor(
    private _fb: FormBuilder,
    private _trainingService: TrainingService,
    private _activatedRoute: ActivatedRoute
  ) {}
  onPlanFormSubmitted(planForm: FormGroup): void {
    this._activatedRoute.params
      .pipe(
        switchMap((params) =>
          this._trainingService.addTraining(
            planForm.get('month')?.value,
            planForm.get('year')?.value,
            planForm.get('week')?.value,
            params['userId']
          )
        )
      )
      .subscribe();

    // console.log(planForm.value);
    // this._trainingService.addTraining({month}).subscribe();
  }

  get quantityExercise(): FormArray {
    return this.planForm.controls['quantityExercise'] as FormArray;
  }

  addQuantity(): void {
    const quantityForm = this._fb.group({ set: [], rep: [], value: [] });
    this.quantityExercise.push(quantityForm);
  }

  addTrainingExercise(planForm: FormGroup): void {
    this._trainingService
      .addTrainingToContext({
        exercise: planForm.get('exercise')?.value,
        comment: planForm.get('comment')?.value,
        quantity: planForm.get('quantityExercise')?.value,
      })
      .subscribe(() => {
        planForm.get('exercise')?.reset();
        planForm.get('comment')?.reset();

        this.quantityExercise.clear();
      });
  }
  // sortData(values: any, order: string) {
  //   return values.sort((a: number, b: number) => {
  //     return order === 'asc' ? a;
  //   });
  // }
}
