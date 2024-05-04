import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { map, shareReplay, switchMap, take, tap } from 'rxjs/operators';
import { TrainingElementModel } from '../models/training-element.model';
import { TrainingModel } from '../models/training.model';

import { QuantityExerciseModel } from '../models/quantity-exercise.model';
import { EditTrainingElementModel } from '../models/edit-training-element.model';
import { TrainingContextModel } from '../models/training-context.model';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({ providedIn: 'root' })
export class TrainingService {
  private _traningSubject: BehaviorSubject<TrainingContextModel | null> =
    new BehaviorSubject<TrainingContextModel | null>(
      (JSON.parse(
        localStorage.getItem('trainingContext') as string
      ) as TrainingContextModel) || {
        isEdit: false,
        trainingElements: [],
        trainingWeek: 0,
        trainingDate: Date(),
        isDone: false,
        hasFill: false,
      }
    );
  public traning$: Observable<TrainingContextModel | null> =
    this._traningSubject.asObservable();

  private _isEdit: BehaviorSubject<EditTrainingElementModel> =
    new BehaviorSubject<EditTrainingElementModel>({
      isEdit: false,
      index: null,
    });
  public isEdit$: Observable<EditTrainingElementModel> =
    this._isEdit.asObservable();

  constructor(
    private _client: AngularFirestore,
    private _fireDatabase: AngularFireDatabase
  ) {}

  addTraining(authId: string): Observable<void> {
    const trainingSubject: TrainingContextModel = {
      ...this._traningSubject.value,
      isDone: true,
    } as TrainingContextModel;
    return from(
      this._client.collection('plans').add({
        ...trainingSubject,
        authId: authId,

        createAt: new Date().getTime(),
        raitingCommentTraining: '',
        raitingValueTraining: 0,
      })
    ).pipe(
      tap(() => localStorage.removeItem('trainingContext')),
      map(() => {
        if (this._traningSubject.value) {
          this._traningSubject.next({
            ...this._traningSubject.value,
            trainingElements: [],
          });
        }

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
        .update(this._traningSubject.value as TrainingContextModel)
    ).pipe(
      tap(() => localStorage.removeItem('trainingContext')),
      map(() => void 0)
    );
  }

  addTrainingElementToContext(
    trainingElement: Omit<TrainingElementModel, 'index'>
  ): Observable<void> {
    if (this._traningSubject.value) {
      const trainingContext = {
        ...this._traningSubject.value,

        trainingElements: [
          ...this._traningSubject.value.trainingElements,
          {
            ...trainingElement,
            index: this._traningSubject.value.trainingElements.length + 1,
          },
        ],
      };

      this._traningSubject.next(trainingContext);
      localStorage.setItem('trainingContext', JSON.stringify(trainingContext));
    }

    return of(void 0);
  }
  addTrainingElementsToContext(training: TrainingModel): Observable<void> {
    const trainingContext = {
      isEdit: true,
      trainingElements: training.trainingElements,
      trainingWeek: training.trainingWeek,
      trainingDate: training.trainingDate,
      isDone: training.isDone,
    };
    this._traningSubject.next(trainingContext);
    localStorage.setItem('trainingContext', JSON.stringify(trainingContext));
    return of(void 0);
  }
  getAllPlans(): Observable<TrainingModel[]> {
    return this._client
      .collection<TrainingModel>('plans', (ref) =>
        ref.orderBy('createAt', 'desc')
      )
      .valueChanges({ idField: 'id' })
      .pipe(shareReplay(1));
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
    if (this._traningSubject.value) {
      const currentValue = this._traningSubject.value.trainingElements;

      const editedTraining = { ...currentValue[index] };

      editedTraining.comment = training.comment;
      editedTraining.exercise = training.exercise;
      editedTraining.quantity = quantity;

      this._isEdit.next({ isEdit: false, index: 0 });

      currentValue[index] = editedTraining;

      const trainingContext = {
        trainingWeek: this._traningSubject.value.trainingWeek,
        isEdit: this._traningSubject.value.isEdit,
        trainingElements: currentValue,
        trainingDate: this._traningSubject.value.trainingDate,
        isDone: this._traningSubject.value.isDone,
      };
      this._traningSubject.next(trainingContext);
      localStorage.setItem('trainingContext', JSON.stringify(trainingContext));
    }

    return of(void 0);
  }

  setRaiting(
    trainingId: string,
    indexToUpdate: number,
    raitingComment: string,
    raitingValue: number,
    raitingType: string,
    exerciseValues: any
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
            const data = doc.data() as TrainingModel;

            if (
              data.trainingElements &&
              data.trainingElements.length > indexToUpdate
            ) {
              data.trainingElements[indexToUpdate].raitingCommentExercise =
                raitingComment;
              data.trainingElements[indexToUpdate].raitingValueExercise =
                raitingValue;
              data.trainingElements[indexToUpdate].exerciseValue =
                exerciseValues;

              return from(
                docRef.update({ trainingElements: data.trainingElements })
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

  private _todaySubject: BehaviorSubject<string> = new BehaviorSubject<string>(
    `${new Date().getFullYear()}-${
      new Date().getMonth() + 1
    }-${new Date().getDate()}`
  );

  destroyTrainingContext(): Observable<void> {
    localStorage.removeItem('trainingContext');
    this._traningSubject.next({
      isEdit: false,
      trainingElements: [],
      trainingWeek: 0,
      trainingDate: this._todaySubject.value,
      isDone: false,
    });
    return of(void 0);
  }
  setTrainingWeekOnSubject(trainingWeek: number): Observable<void> {
    if (this._traningSubject.value?.trainingWeek === trainingWeek) {
      return of(void 0);
    }
    if (this._traningSubject.value) {
      const trainingContext = {
        ...this._traningSubject.value,
        trainingWeek: trainingWeek,
      };

      this._traningSubject.next(trainingContext);

      localStorage.setItem('trainingContext', JSON.stringify(trainingContext));

    }

    return of(void 0);
  }
  setTrainingDateOnSubject(trainingDate: string): Observable<void> {
    if (this._traningSubject.value?.trainingDate === trainingDate) {
      return of(void 0);
    }
    if (this._traningSubject.value) {
      const trainingContext = {
        ...this._traningSubject.value,
        trainingDate: trainingDate,
      };
      this._traningSubject.next(trainingContext);
      localStorage.setItem('trainingContext', JSON.stringify(trainingContext));
    }
    return of(void 0);
  }

  deleteExercise(index: number): Observable<void> {
    if (this._traningSubject.value) {
      this._traningSubject.value.trainingElements.splice(index, 1);

      const trainingElements = this._traningSubject.value.trainingElements.map(
        (trainingElement, i) => ({
          ...trainingElement,
          index: i++ + 1,
        })
      );
      const trainingContext = {
        ...this._traningSubject.value,
        trainingElements: trainingElements,
      };
      this._traningSubject.next(trainingContext);
      localStorage.setItem('trainingContext', JSON.stringify(trainingContext));
    }

    return of(void 0);
  }
  removeTraining(trainingId: string): Observable<void> {
    return from(this._client.doc('plans/' + trainingId).delete()).pipe(
      map(() => void 0)
    );
  }
  onDragTrainingElement(
    trainingElements: TrainingElementModel[]
  ): Observable<void> {
    if (this._traningSubject.value) {
      const trainingContext = {
        ...this._traningSubject.value,
        trainingElements: trainingElements.map((trainingElement, i) => ({
          ...trainingElement,
          index: i + 1,
        })),
      };
      this._traningSubject.next(trainingContext);
      localStorage.setItem('trainingContext', JSON.stringify(trainingContext));
    }

    return of(void 0);
  }

  isNotEdit(): Observable<void> {
    if (this._traningSubject.value?.isEdit) {
      const trainingContext = { ...this._traningSubject.value, isEdit: false };
      this._traningSubject.next(trainingContext);
      localStorage.setItem('trainingContext', JSON.stringify(trainingContext));
    }

    return of(void 0);
  }
  isEdit(): Observable<void> {
    if (!this._traningSubject.value?.isEdit) {
      const trainingContext = { ...this._traningSubject.value, isEdit: true };
      this._traningSubject.next(trainingContext as TrainingContextModel);
      localStorage.setItem('trainingContext', JSON.stringify(trainingContext));
    }

    return of(void 0);
  }
  getExerciseTemplates(): Observable<string[]> {
    return this._fireDatabase
      .list('ExercisesTemplate')
      .valueChanges()
      .pipe(map((data) => data.flat() as string[]));
  }

  setHasFillTraining(hasFill: boolean, trainingId: string): Observable<void> {
    return from(
      this._client.doc('plans/' + trainingId).update({
        hasFill: hasFill,
      })
    );
  }
}
