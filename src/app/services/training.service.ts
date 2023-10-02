import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { TrainingElementModel } from '../models/training-element.model';
import { TrainingModel } from '../models/training.model';

import { QuantityExerciseModel } from '../models/quantity-exercise.model';
import { EditTrainingElementModel } from '../models/edit-training-element.model';
import { TrainingContextModel } from '../models/training-context.model';

@Injectable({ providedIn: 'root' })
export class TrainingService {
  private _traningSubject: BehaviorSubject<TrainingContextModel> =
    new BehaviorSubject<TrainingContextModel>({
      isEdit: false,
      trainingElements: [],
      trainingWeek: 0,
    });
  public traning$: Observable<TrainingContextModel> =
    this._traningSubject.asObservable();

  private _isEdit: BehaviorSubject<EditTrainingElementModel> =
    new BehaviorSubject<EditTrainingElementModel>({
      isEdit: false,
      index: null,
    });
  public isEdit$: Observable<EditTrainingElementModel> =
    this._isEdit.asObservable();

  constructor(private _client: AngularFirestore) {}

  addTraining(authId: string): Observable<void> {
    return from(
      this._client.collection('plans').add({
        ...this._traningSubject.value,
        authId: authId,

        createAt: new Date().getTime(),
        raitingCommentTraining: '',
        raitingValueTraining: 0,
      })
    ).pipe(
      map(() => {
        this._traningSubject.next({
          ...this._traningSubject.value,
          trainingElements: [],
        });
        return void 0;
      })
    );
  }

  getOneTraining(trainingId: string): Observable<TrainingModel> {
    return this._client
      .collection<TrainingModel>('plans')
      .valueChanges({ idField: 'id' })
      .pipe(
        map(
          (trainings) =>
            trainings
              .filter((training) => training.id === trainingId)
              .shift() as TrainingModel
        )
      );
  }

  setTraining(trainingId: string): Observable<void> {
    return from(
      this._client.doc('plans/' + trainingId).update(this._traningSubject.value)
    ).pipe(map(() => void 0));
  }

  addTrainingElementToContext(
    trainingElement: Omit<TrainingElementModel, 'index'>
  ): Observable<void> {
    this._traningSubject.next({
      ...this._traningSubject.value,

      trainingElements: [
        ...this._traningSubject.value.trainingElements,
        {
          ...trainingElement,
          index: this._traningSubject.value.trainingElements.length + 1,
        },
      ],
    });
    return of(void 0);
  }
  addTrainingElementsToContext(training: TrainingModel): Observable<void> {
    this._traningSubject.next({
      isEdit: true,
      trainingElements: training.trainingElements,
      trainingWeek: training.trainingWeek,
    });
    return of(void 0);
  }
  getAllPlans(): Observable<TrainingModel[]> {
    return this._client
      .collection<TrainingModel>('plans', (ref) =>
        ref.orderBy('createAt', 'desc')
      )
      .valueChanges({ idField: 'id' });
  }

  editForm(isEdit: boolean, index: number): Observable<void> {
    this._isEdit.next({ isEdit: isEdit, index: index });
    return of(void 0);
  }

  editSubmit(
    index: number,
    training: TrainingElementModel,
    quantity: QuantityExerciseModel[]
  ): Observable<void> {
    const currentValue = this._traningSubject.value.trainingElements;

    const editedTraining = { ...currentValue[index] };

    editedTraining.comment = training.comment;
    editedTraining.exercise = training.exercise;
    editedTraining.quantity = quantity;

    this._isEdit.next({ isEdit: false, index: 0 });

    currentValue[index] = editedTraining;
    this._traningSubject.next({
      trainingWeek: this._traningSubject.value.trainingWeek,
      isEdit: this._traningSubject.value.isEdit,
      trainingElements: currentValue,
    });
    return of(void 0);
  }

  setRaiting(
    trainingId: string,
    indexToUpdate: number,
    raitingComment: string,
    raitingValue: number,
    raitingType: string
  ): Observable<void> {
    if (raitingType === 'training') {
      return from(
        this._client.doc('plans/' + trainingId).update({
          raitingCommentTraining: raitingComment,
          raitingValueTraining: raitingValue,
        })
      );
    } else if (raitingType === 'exercise') {
      const docRef = this._client.collection('plans').doc(trainingId);

      return docRef.get().pipe(
        switchMap((doc) => {
          if (doc.exists) {
            const data = doc.data() as {
              trainingElement: TrainingElementModel[];
            };

            if (
              data.trainingElement &&
              data.trainingElement.length > indexToUpdate
            ) {
              data.trainingElement[indexToUpdate].raitingCommentExercise =
                raitingComment;
              data.trainingElement[indexToUpdate].raitingValueExercise =
                raitingValue;

              return from(
                docRef.update({ trainingElement: data.trainingElement })
              );
            } else {
              throw new Error(
                `Element o indeksie ${indexToUpdate} nie istnieje.`
              );
            }
          } else {
            throw new Error(`Dokument o ID ${trainingId} nie istnieje.`);
          }
        })
      );
    }
    return of(void 0);
  }

  destroyTrainingContext(): Observable<void> {
    this._traningSubject.next({
      isEdit: false,
      trainingElements: [],
      trainingWeek: 0,
    });
    return of(void 0);
  }
  setTrainingWeekOnSubject(trainingWeek: number): Observable<void> {
    this._traningSubject.next({
      ...this._traningSubject.value,
      trainingWeek: trainingWeek,
    });
    return of(void 0);
  }
  deleteExercise(index: number): Observable<void> {
    this._traningSubject.value.trainingElements.splice(index, 1);

    const trainingElements = this._traningSubject.value.trainingElements.map(
      (trainingElement, i) => ({
        ...trainingElement,
        index: i++ + 1,
      })
    );
    this._traningSubject.next({
      ...this._traningSubject.value,
      trainingElements: trainingElements,
    });
    return of(void 0);
  }
  removeTraining(trainingId: string): Observable<void> {
    return from(this._client.doc('plans/' + trainingId).delete()).pipe(
      map(() => void 0)
    );
  }
}
