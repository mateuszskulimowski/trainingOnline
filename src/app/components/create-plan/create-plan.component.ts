import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { TrainingElementModel } from '../../models/training-element.model';
import { TrainingService } from '../../services/training.service';

@Component({
  selector: 'app-create-plan',
  templateUrl: './create-plan.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePlanComponent {
  readonly planForm: FormGroup = new FormGroup({
    exercise: new FormControl(),
    comment: new FormControl(),
    quantityExercise: new FormArray([]),
  });
  readonly trainingExercises$: Observable<TrainingElementModel[]> =
    this._trainingService.traning$;

  constructor(
    private _fb: FormBuilder,
    private _trainingService: TrainingService
  ) {}
  onPlanFormSubmitted(planForm: FormGroup): void {
    console.log(planForm.value);
  }
  get quantityExercise(): FormArray {
    return this.planForm.controls['quantityExercise'] as FormArray;
  }
  addQuantity(): void {
    const quantityForm = this._fb.group({
      set: [],
      rep: [],
      value: [],
    });
    this.quantityExercise.push(quantityForm);
  }

  addTrainingToContext(planForm: FormGroup) {
    this._trainingService
      .addTrainingToContext({
        exercise: planForm.get('exercise')?.value,
        comment: planForm.get('comment')?.value,
        quantity: planForm.get('quantityExercise')?.value,
      })
      .subscribe();
  }

  // private _getQuantityExercise(quantity: QuantityExerciseModel): void {
  //   this.quantityExercise.clear();
  // }
}
