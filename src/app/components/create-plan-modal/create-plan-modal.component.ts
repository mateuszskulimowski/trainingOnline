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

  readonly trainingExercises$: Observable<TrainingElementModel[]> =
    this._trainingService.traning$;
  readonly isEditForm$: Observable<{ isEdit: boolean; index: number }> =
    this._trainingService.isEdit$;

  private _editFieldSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('comment');
  public editField$: Observable<string> = this._editFieldSubject.asObservable();

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

  addQuantity(): void {
    const quantityForm = this._fb.group({ set: [], rep: [], value: [] });
    this.quantityExercise.push(quantityForm);
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
    // this._editFieldSubject.next(editField);
    this.planForm.patchValue(exercise);
    this._trainingService.editForm(true, index).subscribe();
  }

  editSubject(planForm: FormGroup, index: number) {
    this._trainingService.editSubject(index, planForm.value).subscribe();
  }
}
