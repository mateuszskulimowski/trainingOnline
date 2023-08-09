import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { TrainingElementModel } from '../models/training-element.model';
import { TrainingModel } from '../models/training.model';
import { MonthModel } from '../models/month.model';
import { WeekModel } from '../models/week.model';
import { YearModel } from '../models/year.model';
import { user } from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class TrainingService {
  private _traningSubject: BehaviorSubject<TrainingElementModel[]> =
    new BehaviorSubject<TrainingElementModel[]>([]);
  public traning$: Observable<TrainingElementModel[]> =
    this._traningSubject.asObservable();

  constructor(private _client: AngularFirestore) {}
  addTraining(
    monthId: string,
    yearId: string,
    weekId: string,
    userId: string
  ): Observable<void> {
    return from(
      this._client.collection('plans').add({
        trainingElement: this._traningSubject.value,
        userId: userId,
        weekId: weekId,
        monthId: monthId,
        yearId: yearId,
        createAt: new Date().getTime(),
      })
    ).pipe(
      map(() => {
        this._traningSubject.next([]);
        return void 0;
      })
    );
  }

  addTrainingToContext(
    trainingElement: Omit<TrainingElementModel, 'index'>
  ): Observable<void> {
    this._traningSubject.next([
      ...this._traningSubject.value,
      { ...trainingElement, index: this._traningSubject.value.length + 1 },
    ]);
    return of(void 0);
  }
  getAllPlans(): Observable<TrainingModel[]> {
    return this._client
      .collection<TrainingModel>('plans', (ref) =>
        ref.orderBy('createAt', 'desc')
      )
      .valueChanges({ idField: 'id' });
  }

  getMonths(): Observable<MonthModel[]> {
    return this._client
      .collection<MonthModel>('months')
      .valueChanges({ idField: 'id' })
      .pipe(map((months) => months.sort((a, b) => a.index - b.index)));
  }

  getWeeks(): Observable<WeekModel[]> {
    return this._client
      .collection<WeekModel>('weeks')
      .valueChanges({ idField: 'id' })
      .pipe(map((weeks) => weeks.sort((a, b) => a.index - b.index)));
  }

  getYears(): Observable<YearModel[]> {
    return this._client
      .collection<YearModel>('years')
      .valueChanges({ idField: 'id' });
  }
}
