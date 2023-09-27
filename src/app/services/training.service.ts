import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { TrainingElementModel } from '../models/training-element.model';
import { TrainingModel } from '../models/training.model';

import { QuantityExerciseModel } from '../models/quantity-exercise.model';
import { EditTrainingElementModel } from '../models/edit-training-element.model';

@Injectable({ providedIn: 'root' })
export class TrainingService {
  private _traningSubject: BehaviorSubject<TrainingElementModel[]> =
    new BehaviorSubject<TrainingElementModel[]>([]);
  public traning$: Observable<TrainingElementModel[]> =
    this._traningSubject.asObservable();

  private _isEdit: BehaviorSubject<EditTrainingElementModel> =
    new BehaviorSubject<EditTrainingElementModel>({
      isEdit: false,
      index: null,
    });
  public isEdit$: Observable<EditTrainingElementModel> =
    this._isEdit.asObservable();

  constructor(private _client: AngularFirestore) {}

  addTraining(trainingWeek: number, userId: string): Observable<void> {
    return from(
      this._client.collection('plans').add({
        trainingWeek: trainingWeek,
        userId: userId,
        trainingElement: this._traningSubject.value,
        createAt: new Date().getTime(),
        raitingCommentTraining: '',
        raitingValueTraining: 0,
      })
    ).pipe(
      map(() => {
        this._traningSubject.next([]);
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
      this._client
        .doc('plans/' + trainingId)
        .update({ trainingElement: this._traningSubject.value })
    ).pipe(map(() => void 0));
  }

  addTrainingElementToContext(
    trainingElement: Omit<TrainingElementModel, 'index'>
  ): Observable<void> {
    this._traningSubject.next([
      ...this._traningSubject.value,
      {
        ...trainingElement,
        index: this._traningSubject.value.length + 1,
      },
    ]);
    return of(void 0);
  }
  addTrainingElementsToContext(
    training: TrainingElementModel[]
  ): Observable<void> {
    this._traningSubject.next(training);
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
    const currentValue = this._traningSubject.value;

    const editedTraining = { ...currentValue[index] };

    editedTraining.comment = training.comment;
    editedTraining.exercise = training.exercise;
    editedTraining.quantity = quantity;

    this._isEdit.next({ isEdit: false, index: 0 });

    currentValue[index] = editedTraining;
    this._traningSubject.next(currentValue);
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
    this._traningSubject.next([]);
    return of(void 0);
  }
}
