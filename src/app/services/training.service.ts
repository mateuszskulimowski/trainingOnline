import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable, Subject, from, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TrainingModel } from '../models/training.model';
import { QuantityExerciseModel } from '../models/quantity-exercise.model';
import { TrainingElementModel } from '../models/training-element.model';

@Injectable({ providedIn: 'root' })
export class TrainingService {
  private _traningSubject: BehaviorSubject<TrainingElementModel[]> =
    new BehaviorSubject<TrainingElementModel[]>([]);
  public traning$: Observable<TrainingElementModel[]> =
    this._traningSubject.asObservable();

  constructor(private _client: AngularFirestore) {}
  addTraining(plan: {
    exercise: string;
    comment: string;
    quantityExercise: QuantityExerciseModel[];
  }): Observable<void> {
    return from(this._client.collection('plans').add(plan)).pipe(
      map(() => void 0)
    );
  }

  addTrainingToContext(
    trainingElement: TrainingElementModel
  ): Observable<void> {
    this._traningSubject.next([...this._traningSubject.value, trainingElement]);
    return of(void 0);
  }
}
