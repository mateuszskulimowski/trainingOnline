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
import { QuantityExerciseModel } from 'src/app/models/quantity-exercise.model';

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
  constructor(private _fb: FormBuilder) {}
  onPlanFormSubmitted(planForm: FormGroup): void {
    console.log(planForm.value);
  }
  get quantityExercise(): FormArray {
    return this.planForm.controls['quantityExercise'] as FormArray;
  }
  addQuantity(): void {
    const quantityForm = this._fb.group({
      set: ['', Validators.required],
      rep: ['', Validators.required],
      value: ['', Validators.required],
    });
    this.quantityExercise.push(quantityForm);
  }

  // private _getQuantityExercise(quantity: QuantityExerciseModel): void {
  //   this.quantityExercise.clear();
  // }
}
