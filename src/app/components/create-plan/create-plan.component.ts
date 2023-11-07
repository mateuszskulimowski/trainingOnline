import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  map,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { TrainingContextModel } from '../../models/training-context.model';
import { EditTrainingElementModel } from '../../models/edit-training-element.model';
import { UserWithTrainingQueryModel } from '../../query-models/user-with-training.query-model';
import { TrainingService } from '../../services/training.service';
import { UserService } from '../../services/user.service';
import { QuantityExerciseModel } from '../../models/quantity-exercise.model';
import { TrainingElementModel } from '../../models/training-element.model';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { UserModel } from 'src/app/models/user.model';
import { TrainingListWithUsersWeekQueryModel } from 'src/app/query-models/training-list-with-users-week.query-model';

@Component({
  selector: 'app-create-plan',
  templateUrl: './create-plan.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePlanComponent implements OnDestroy, OnInit {
  readonly planForm: FormGroup = new FormGroup({
    trainingWeek: new FormControl(),
    exercise: new FormControl(''),
    comment: new FormControl(''),
    autocompleteControl: new FormControl(''),
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

  readonly isEditForm$: Observable<EditTrainingElementModel> =
    this._trainingService.isEdit$;
  readonly exerciseTemplates$: Observable<string[]> =
    this._trainingService.getExerciseTemplates();

  private _isAutocompleteSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public isAutocomplete$: Observable<boolean> =
    this._isAutocompleteSubject.asObservable();

  private _filteredOptionsSubject: BehaviorSubject<string[]> =
    new BehaviorSubject<string[]>(['']);
  public filteredOptions$: Observable<string[]> =
    this._filteredOptionsSubject.asObservable();

  readonly trainingExercises$: Observable<TrainingContextModel> = this
    ._trainingService.traning$ as Observable<TrainingContextModel>;

  readonly user$: Observable<UserWithTrainingQueryModel> =
    this._activatedRoute.params
      // ,
      .pipe(
        switchMap((params) => {
          // console.log(trainingSubject);
          return this._userService.getOneUserByAuth(params['authId']).pipe(
            switchMap((user) => {
              return this.trainingExercises$.pipe(
                map((training) => {
                  if (training.isEdit) {
                    this.planForm
                      .get('trainingWeek')
                      ?.patchValue(training.trainingWeek);
                    this._trainingService.setTrainingWeekOnSubject(
                      training.trainingWeek
                    );
                    this._trainingService.setTrainingWeekOnSubject(
                      training.trainingWeek
                    );
                  } else {
                    this.planForm
                      .get('trainingWeek')
                      ?.patchValue(user.trainingWeeks.length);
                    this._trainingService
                      .setTrainingWeekOnSubject(user.trainingWeeks.length)
                      .pipe();
                  }
                  return {
                    userId: user.id,
                    trainingWeeks: user.trainingWeeks.sort((a, b) => {
                      return b.number - a.number;
                    }),
                    isEdit: training.isEdit,
                    trainingWeek: training.trainingWeek,
                    trainingElements: training.trainingElements,
                    isDone: training.isDone,
                  };
                })
              );
            })
          );
        })
      );

  constructor(
    private _fb: FormBuilder,
    private _trainingService: TrainingService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnDestroy(): void {
    this._trainingService.destroyTrainingContext().subscribe();
  }

  ngOnInit() {
    this.planForm.valueChanges
      .pipe(
        startWith(''),
        switchMap((planForm) =>
          this._filter(planForm.autocompleteControl || '')
        ),
        tap((data) => this._filteredOptionsSubject.next(data))
      )
      .subscribe();
  }

  get quantityExercise(): FormArray {
    return this.planForm.controls['quantityExercise'] as FormArray;
  }

  get quantityExerciseEdit(): FormArray {
    return this.editForm.controls['quantityExercise'] as FormArray;
  }

  onPlanFormSubmitted(userId: string, isEdit: boolean, isDone: boolean): void {
    this._activatedRoute.params
      .pipe(
        switchMap((params) => {
          if (isEdit && isDone) {
            return this._trainingService
              .setTraining(params['trainingId'])
              .pipe(tap(() => this._router.navigate([`user/` + userId])));
          }
          return this._trainingService.addTraining(params['authId']);
        })
      )
      .subscribe({
        next: () => {},
      });
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
        exerciseValue: [],
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

  // addWeeksToConception(
  //   user: UserWithTrainingQueryModel,
  //   trainingOrder: number
  // ) {
  //   if (!!!user.trainingWeeks.length) {
  //     const newElements = Array.from(
  //       { length: trainingOrder },
  //       (_, index) => index + 1
  //     );
  //     this.planForm.get('trainingWeek')?.patchValue(newElements);
  //     this._userService.setTraining(user.userId, newElements);
  //   } else {
  //     const trainingWeeks = user.trainingWeeks.reverse();
  //     const lastElement = trainingWeeks[trainingWeeks.length - 1];
  //     const newElements = Array.from(
  //       { length: trainingOrder },
  //       (_, index) => lastElement + index + 1
  //     );
  //     const newTrainingNumbers = [...trainingWeeks, ...newElements];
  //     this.planForm.get('trainingWeek')?.patchValue(newElements);
  //     this._userService.setTraining(user.userId, newTrainingNumbers);
  //   }

  //   this._trainingService.isNotEdit().subscribe();
  // }
  addWeeksToConception(
    user: {
      userId: string;
      trainingWeeks: { number: number; comment: string }[];
    },
    trainingOrder: number
  ) {
    console.log(user.trainingWeeks.length <= 0);
    if (user.trainingWeeks.length <= 0) {
      const newArray = Array.from({ length: 1 }, (_, index) => ({
        number: index + 1,
        comment: '',
      }));
      this.planForm.get('trainingWeek')?.patchValue(1);
      this._userService.setTraining(user.userId, newArray);
    } else {
      const newArray = new Array(...user.trainingWeeks, {
        number: user.trainingWeeks.length + 1,
        comment: '',
      });
      this.planForm
        .get('trainingWeek')
        ?.patchValue(user.trainingWeeks.length + 1);
      this._userService.setTraining(user.userId, newArray);
    }

    this._trainingService.isNotEdit().subscribe();
  }

  setTrainingWeek(event: any): void {
    const trainingWeek = parseInt(event.target.value);
    // console.log(trainingWeek);
    this.planForm.get('trainingWeek')?.patchValue(trainingWeek);
    this._trainingService.isEdit();
    this._trainingService.setTrainingWeekOnSubject(trainingWeek).subscribe();
  }
  deleteExercise(index: number) {
    this._trainingService.deleteExercise(index).subscribe();
  }

  onDrop(
    event: CdkDragDrop<TrainingElementModel[]>,
    trainingElements: TrainingElementModel[]
  ): void {
    const elementsArray = trainingElements;
    const movedElement = elementsArray[event.previousIndex];
    elementsArray.splice(event.previousIndex, 1);
    elementsArray.splice(event.currentIndex, 0, movedElement);
    this._trainingService.onDragTrainingElement(elementsArray);
  }

  activeTemplate(): void {
    this._isAutocompleteSubject.next(!this._isAutocompleteSubject.value);
  }
  deactivationTemplate(value: string): void {
    this._isAutocompleteSubject.next(false);
    this.planForm.get('exercise')?.patchValue(value);
  }

  private _filter(value: string): Observable<string[]> {
    const filterValue = value.toLowerCase();

    return this._trainingService.getExerciseTemplates().pipe(
      map((exerciseTemplates) => {
        return exerciseTemplates.filter((exerciseTemplate) =>
          exerciseTemplate.toLowerCase().includes(filterValue)
        );
      })
    );
  }
}
