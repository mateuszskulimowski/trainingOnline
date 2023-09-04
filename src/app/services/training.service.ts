import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TrainingElementModel } from '../models/training-element.model';
import { TrainingModel } from '../models/training.model';
import { ChoiseDateModel } from '../models/choise-data.model';
import { DateModel } from '../models/date.model';

@Injectable({ providedIn: 'root' })
export class TrainingService {
  private _traningSubject: BehaviorSubject<TrainingElementModel[]> =
    new BehaviorSubject<TrainingElementModel[]>([]);
  public traning$: Observable<TrainingElementModel[]> =
    this._traningSubject.asObservable();

  private _isEdit: BehaviorSubject<{
    isEdit: boolean;

    index: number;
  }> = new BehaviorSubject<{ isEdit: boolean; index: number }>({
    isEdit: false,

    index: 0,
  });
  public isEdit$: Observable<{ isEdit: boolean; index: number }> =
    this._isEdit.asObservable();

  constructor(private _client: AngularFirestore) {}
  addTraining(choiseDate: ChoiseDateModel, userId: string): Observable<void> {
    return from(
      this._client.collection('plans').add({
        ...choiseDate,
        userId: userId,
        trainingElement: this._traningSubject.value,
        createAt: new Date().getTime(),
      })
    ).pipe(
      map(() => {
        this._traningSubject.next([]);
        return void 0;
      })
    );
  }

  addTrainingElementToContext(
    trainingElement: Omit<TrainingElementModel, 'index'>
  ): Observable<void> {
    this._traningSubject.next([
      ...this._traningSubject.value,
      { ...trainingElement, index: this._traningSubject.value.length + 1 },
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

  getMonths(): Observable<DateModel[]> {
    return this._client
      .collection<DateModel>('months', (ref) => ref.orderBy('index', 'asc'))
      .valueChanges({ idField: 'id' });
  }

  getWeeks(): Observable<DateModel[]> {
    return this._client
      .collection<DateModel>('weeks', (ref) => ref.orderBy('index', 'asc'))
      .valueChanges({ idField: 'id' });
  }

  getYears(): Observable<DateModel[]> {
    return this._client
      .collection<DateModel>('years', (ref) => ref.orderBy('index', 'asc'))
      .valueChanges({ idField: 'id' });
  }

  editForm(isEdit: boolean, index: number): Observable<void> {
    this._isEdit.next({ isEdit: isEdit, index: index });
    return of(void 0);
  }

  editSubject(index: number, training: TrainingElementModel): Observable<void> {
    const currentValue = this._traningSubject.value;
    currentValue[index] = training;
    // this._traningSubject.next[...currentValue]
    this._traningSubject.next([...currentValue]);
    // this._traningSubject.next([
    //   (this._traningSubject.value[index] = training),
    //   ...this._traningSubject.value,
    // ]);
    console.log(currentValue[index]);
    console.log(index);
    this._isEdit.next({ isEdit: false, index: 0 });
    // console.log(currentValue[0]['quantity'][0]);
    // this._traningSubject.next([
    //   ...this._traningSubject.value,
    //   (this._traningSubject.value[2] = {
    //     exercise: 'dupa',
    //     comment: 'jasia',
    //     quantity: [{ rep: '1', set: '2', value: '100' }],
    //     index: 2,
    //   }),
    // ]);
    return of(void 0);
  }
}
