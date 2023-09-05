import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ChoiseDateModel } from '../../models/choise-data.model';
import { TrainingElementModel } from '../../models/training-element.model';
import { TrainingService } from '../../services/training.service';
import { QuantityExerciseModel } from 'src/app/models/quantity-exercise.model';

@Component({
  selector: 'app-create-plan-modal',
  templateUrl: './create-plan-modal.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePlanModalComponent implements OnDestroy {
  @Input() date!: ChoiseDateModel;

  readonly planForm: FormGroup = new FormGroup({
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
  readonly isEditForm$: Observable<{ isEdit: boolean; index: number }> =
    this._trainingService.isEdit$;

  private _editFieldSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('comment');
  public editField$: Observable<string> = this._editFieldSubject.asObservable();

  quantityPlanFormLength: number = 1;
  quantityEditFormLength: number = 0;

  constructor(
    private _fb: FormBuilder,
    private _trainingService: TrainingService,
    private _activatedRoute: ActivatedRoute
  ) {}
  ngOnDestroy(): void {
    sessionStorage.removeItem('test');
  }
  onPlanFormSubmitted(): void {
    this._activatedRoute.params
      .pipe(
        switchMap((params) =>
          this._trainingService.addTraining(this.date, params['userId'])
        )
      )
      .subscribe();
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
      this.quantityPlanFormLength++;
      this.quantityExercise.push(quantityForm);
    } else if (typeForm === 'edit') {
      this.quantityEditFormLength++;
      this.quantityExerciseEdit.push(quantityForm);
    }
  }

  deleteQuantity(i: number): void {
    this.quantityPlanFormLength--;
    this.quantityExercise.removeAt(i);
  }
  deleteQuantityEdit(i: number): void {
    this.quantityEditFormLength--;
    this.quantityExerciseEdit.removeAt(i);
  }

  addTrainingExercise(planForm: FormGroup): void {
    this._trainingService
      .addTrainingElementToContext({
        exercise: planForm.get('exercise')?.value,
        comment: planForm.get('comment')?.value,
        quantity: planForm.get('quantityExercise')?.value,
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
    this.editForm.reset();
    (this.editForm.controls['quantityExercise'] as FormArray).clear();
    this.quantityEditFormLength === exercise.quantity.length;
    const quantityFormArray = this._fb.array(exercise.quantity);
    this.editForm.patchValue(exercise);
    exercise.quantity.forEach((quantity) => this.addQuantityEdit(quantity));

    console.log(this.editForm.get('quantityExercise')?.value);

    this._trainingService.editForm(true, index).subscribe();
  }

  editSubmit(planForm: FormGroup, index: number) {
    // console.log(this.editForm.get('quantityExercise')?.value);

    this._trainingService
      .editSubmit(
        index,
        planForm.value,
        this.editForm.get('quantityExercise')?.value
      )
      .subscribe();
    (this.editForm.controls['quantityExercise'] as FormArray).clear();
    this.editForm.reset();
    // this.editForm
    //   .get('quantityExercise')
    //   ?.patchValue({ set: [], rep: [], value: [] });
  }
}
