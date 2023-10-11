import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Observable,
  combineLatest,
  map,
  shareReplay,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { TrainingElementModel } from '../../models/training-element.model';
import { TrainingService } from '../../services/training.service';
import { QuantityExerciseModel } from '../../models/quantity-exercise.model';
import { UserService } from 'src/app/services/user.service';
import { UserModel } from 'src/app/models/user.model';
import { EditTrainingElementModel } from 'src/app/models/edit-training-element.model';
import { TrainingContextModel } from 'src/app/models/training-context.model';
import { UserWithTrainingQueryModel } from 'src/app/query-models/user-with-training.query-model';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { TrainingListWithUserRoleQueryModel } from 'src/app/query-models/training-list-with-user-role.query-model';

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

  readonly trainingExercises$: Observable<TrainingContextModel> = this
    ._trainingService.traning$ as Observable<TrainingContextModel>;

  readonly isEditForm$: Observable<EditTrainingElementModel> =
    this._trainingService.isEdit$;

  // readonly user$: Observable<UserModel> = this._activatedRoute.params.pipe(
  //   switchMap((params) => this._userService.getOneUserByAuth(params['authId'])),
  //   map((user) => {
  //     this.planForm.get('trainingWeek')?.patchValue(user.trainingWeeks.length);
  //     return { ...user, training: user.trainingWeeks.reverse() };
  //   })
  // );

  readonly user$: Observable<UserWithTrainingQueryModel> = combineLatest([
    this._activatedRoute.params,
    this.trainingExercises$,
  ]).pipe(
    tap(() => {}),
    switchMap(([params, trainingSubject]) => {
      console.log(trainingSubject.isEdit);
      return this._userService.getOneUserByAuth(params['authId']).pipe(
        map((user) => {
          // console.log('trainngWeek', trainingSubject.trainingWeek);
          if (trainingSubject.isEdit) {
            console.log('isEdit', trainingSubject.trainingWeek);

            this.planForm
              .get('trainingWeek')
              ?.patchValue(trainingSubject.trainingWeek);

            this._trainingService.setTrainingWeekOnSubject(
              trainingSubject.trainingWeek
            );

            this.planForm
              .get('trainingWeek')
              ?.patchValue(trainingSubject.trainingWeek);

            this._trainingService.setTrainingWeekOnSubject(
              trainingSubject.trainingWeek
            );
          } else {
            console.log('isNotEdit');

            this.planForm
              .get('trainingWeek')
              ?.patchValue(user.trainingWeeks.length);
            this._trainingService
              .setTrainingWeekOnSubject(user.trainingWeeks.length)
              .pipe();
          }
          return {
            userId: user.id,
            trainingWeeks: user.trainingWeeks.reverse(),
            isEdit: trainingSubject.isEdit,
            trainingWeek: trainingSubject.trainingWeek,
            trainingElements: trainingSubject.trainingElements,
            isDone: trainingSubject.isDone,
          };
        })
      );
    })
  );
  // readonly user$: Observable<UserWithTrainingQueryModel> = combineLatest([
  //   this._activatedRoute.params,
  //   this.trainingExercises$,
  // ]).pipe(
  //   switchMap(([params, trainingSubject]) =>
  //     this._userService.getOneUserByAuth(params['authId']).pipe(
  //       map((user) => {
  //         console.log('property:', trainingSubject.isEdit);
  //         if (trainingSubject.isEdit) {
  //           this.planForm
  //             .get('trainingWeek')
  //             ?.patchValue(trainingSubject.trainingWeek);
  //           this._trainingService.setTrainingWeekOnSubject(
  //             trainingSubject.trainingWeek
  //           );
  //         } else {
  //           this.planForm
  //             .get('trainingWeek')
  //             ?.patchValue(user.trainingWeeks.length);
  //           this._trainingService.setTrainingWeekOnSubject(
  //             user.trainingWeeks.length
  //           );
  //         }
  //         return {
  //           userId: user.id,
  //           trainingWeeks: user.trainingWeeks.reverse(),
  //           isEdit: trainingSubject.isEdit,
  //         };
  //       })
  //     )
  //   )
  // );
  constructor(
    private _fb: FormBuilder,
    private _trainingService: TrainingService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {}

  ngOnDestroy(): void {
    this._trainingService.destroyTrainingContext().subscribe();
    console.log('kkk');
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

  addWeeksToConception(
    user: UserWithTrainingQueryModel,
    trainingOrder: number
  ) {
    if (!!!user.trainingWeeks.length) {
      const newElements = Array.from(
        { length: trainingOrder },
        (_, index) => index + 1
      );
      this.planForm.get('trainingWeek')?.patchValue(newElements);
      this._userService.setTraining(user.userId, newElements);
    } else {
      const trainingWeeks = user.trainingWeeks.reverse();
      const lastElement = trainingWeeks[trainingWeeks.length - 1];
      const newElements = Array.from(
        { length: trainingOrder },
        (_, index) => lastElement + index + 1
      );
      const newTrainingNumbers = [...trainingWeeks, ...newElements];
      this.planForm.get('trainingWeek')?.patchValue(newElements);
      this._userService.setTraining(user.userId, newTrainingNumbers);
    }

    this._trainingService.isNotEdit().subscribe();
  }

  setTrainingWeek(event: any): void {
    this._trainingService.isEdit();
    const trainingWeek = parseInt(event.target.value);
    console.log(trainingWeek);
    this.planForm.get('trainingWeek')?.patchValue(trainingWeek);

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
}