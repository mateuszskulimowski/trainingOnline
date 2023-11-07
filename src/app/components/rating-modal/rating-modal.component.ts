import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { BehaviorSubject, Observable } from 'rxjs';
import { TrainingService } from '../../services/training.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QuantityExerciseModel } from 'src/app/models/quantity-exercise.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-rating-modal',
  templateUrl: './rating-modal.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingModalComponent implements OnInit {
  private _dificultValueSubject: BehaviorSubject<number[]> =
    new BehaviorSubject<number[]>([1, 2, 3, 4, 5]);
  public dificultValue$: Observable<number[]> =
    this._dificultValueSubject.asObservable();
  readonly raitingForm: FormGroup = new FormGroup({
    comment: new FormControl(),
    raitingValue: new FormControl(),
    exerciseValue: new FormArray([]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    private _trainingService: TrainingService,
    private _fb: FormBuilder,
    private _userService: UserService
  ) {}
  ngOnInit(): void {
    if (this.data.raitingType === 'exercise') {
      this.data.exerciseValue.forEach((exercise: QuantityExerciseModel) => {
        const exerciseValue = this._fb.group(exercise);

        this.exerciseValue.push(exerciseValue);
      });
    }

    // this.raitingForm.get('exerciseValue')?.patchValue(this.data.exerciseValue);
    this.raitingForm.get('comment')?.patchValue(this.data.raitingComment);
    this.raitingForm.get('raitingValue')?.patchValue(this.data.raitingValue);
  }
  get exerciseValue(): FormArray {
    return this.raitingForm.controls['exerciseValue'] as FormArray;
  }

  // addExerciseValue(exerciseValue: QuantityExerciseModel): void {
  //   const exerciseValueForm = this._fb.group(exerciseValue);
  //   this.exerciseValue.push(exerciseValue);
  // }

  addRaiting(
    trainingId: string,
    raitingForm: FormGroup,
    raitingType: string,
    exerciseOrder: number
  ): void {
    this.dialogRef.close();
    if (raitingType === 'weekComment') {
      this._userService
        .setCommentForWeek(
          this.data.userId,
          this.data.index,
          raitingForm.get('comment')?.value
        )
        .subscribe();
    } else {
      if (!this.data.hasFill) {
        this._trainingService
          .setHasFillTraining(true, this.data.trainingId)
          .subscribe();
      }
      this._trainingService
        .setRaiting(
          trainingId,
          exerciseOrder,
          raitingForm.get('comment')?.value,
          raitingForm.get('raitingValue')?.value,
          raitingType,
          raitingForm.get('exerciseValue')?.value
        )

        .subscribe();
    }
  }

  deleteQuantity(i: number): void {
    this.exerciseValue.removeAt(i);
  }

  addQuantity(typeForm: string): void {
    const quantityForm = this._fb.group({ set: [], rep: [], value: [] });

    this.exerciseValue.push(quantityForm);
  }
  asTrainingQuantityValue(quantity: QuantityExerciseModel[]) {
    quantity.forEach((val) => {
      const quantityForm = this._fb.group(val);

      this.exerciseValue.push(quantityForm);
    });
  }
}
