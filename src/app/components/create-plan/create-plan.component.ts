import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { TrainingElementModel } from '../../models/training-element.model';
import { TrainingService } from '../../services/training.service';
import { QuantityExerciseModel } from '../../models/quantity-exercise.model';
import { UserService } from 'src/app/services/user.service';
import { UserModel } from 'src/app/models/user.model';
import { EditTrainingElementModel } from 'src/app/models/edit-training-element.model';

@Component({
  selector: 'app-create-plan',
  templateUrl: './create-plan.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePlanComponent implements OnDestroy {
  readonly planForm: FormGroup = new FormGroup({
    trainingWeek: new FormControl(),
    exercise: new FormControl(''),
    comment: new FormControl(''),
    quantityExercise: new FormArray([
      new FormGroup({
        set: new FormControl(''),
        rep: new FormControl(''),
        value: new FormControl(''),
      }),
    ]),
  });

  readonly editForm: FormGroup = new FormGroup({
    exercise: new FormControl(''),
    comment: new FormControl(''),
    quantityExercise: new FormArray([]),
  });

  readonly trainingExercises$: Observable<TrainingElementModel[]> =
    this._trainingService.traning$;

  readonly isEditForm$: Observable<EditTrainingElementModel> =
    this._trainingService.isEdit$;

  readonly user$: Observable<UserModel> = this._activatedRoute.params.pipe(
    switchMap((params) => this._userService.getOneUserByAuth(params['userId'])),
    map((user) => {
      this.planForm.get('trainingWeek')?.patchValue(user.trainingWeeks.length);
      return { ...user, training: user.trainingWeeks.reverse() };
    })
  );

  constructor(
    private _fb: FormBuilder,
    private _trainingService: TrainingService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {}

  ngOnDestroy(): void {
    this._trainingService.destroyTrainingContext().subscribe();
  }

  onPlanFormSubmitted(): void {
    this._activatedRoute.params
      .pipe(
        switchMap((params) => {
          return this._trainingService.addTraining(
            parseInt(this.planForm.get('trainingWeek')?.value),
            params['userId']
          );
        })
      )
      .subscribe({
        next: () => {},
      });
  }

  get quantityExercise(): FormArray {
    return this.planForm.controls['quantityExercise'] as FormArray;
  }

  get quantityExerciseEdit(): FormArray {
    return this.editForm.controls['quantityExercise'] as FormArray;
  }

  addQuantityEdit(quantity: QuantityExerciseModel): void {
    const quantityForm = this._fb.group(quantity);
    this.quantityExerciseEdit.push(quantityForm);
  }

  addQuantity(typeForm: string): void {
    const quantityForm = this._fb.group({ set: [], rep: [], value: [] });
    if (typeForm === 'add') {
      this.quantityExercise.push(quantityForm);
    } else if (typeForm === 'edit') {
      this.quantityExerciseEdit.push(quantityForm);
    }
  }

  deleteQuantity(i: number): void {
    this.quantityExercise.removeAt(i);
  }

  deleteQuantityEdit(i: number): void {
    this.quantityExerciseEdit.removeAt(i);
  }

  addTrainingExercise(planForm: FormGroup): void {
    this._trainingService
      .addTrainingElementToContext({
        exercise: planForm.get('exercise')?.value,
        comment: planForm.get('comment')?.value,
        quantity: planForm.get('quantityExercise')?.value,
        raitingCommentExercise: '',
        raitingValueExercise: 0,
      })
      .subscribe(() => {
        planForm.get('exercise')?.reset();
        planForm.get('comment')?.reset();
        this.quantityExercise.clear();
        const quantityForm = this._fb.group({ set: [], rep: [], value: [] });
        this.quantityExercise.push(quantityForm);
      });
  }

  onEditForms(index: number, exercise: TrainingElementModel): void {
    this.editForm.patchValue(exercise);
    exercise.quantity.forEach((quantity) => this.addQuantityEdit(quantity));
    this._trainingService.editForm(true, index).subscribe();
  }

  editSubmit(planForm: FormGroup, index: number) {
    this._trainingService
      .editSubmit(
        index,
        planForm.value,
        this.editForm.get('quantityExercise')?.value
      )
      .subscribe();
    (this.editForm.controls['quantityExercise'] as FormArray).clear();
    this.editForm.reset();
  }

  back(userId: string): void {
    this._router.navigate([`/user/${userId}`]);
  }

  addWeeksToConception(userDetails: UserModel, trainingOrder: number) {
    if (!!!userDetails.trainingWeeks.length) {
      const newElements = Array.from(
        { length: trainingOrder },
        (_, index) => index + 1
      );
      this._userService.setTraining(userDetails, newElements);
    } else {
      const trainingWeeks = userDetails.trainingWeeks.reverse();
      const lastElement = trainingWeeks[trainingWeeks.length - 1];
      const newElements = Array.from(
        { length: trainingOrder },
        (_, index) => lastElement + index + 1
      );
      const newTrainingNumbers = [...trainingWeeks, ...newElements];
      this._userService.setTraining(userDetails, newTrainingNumbers);
    }
  }
}
