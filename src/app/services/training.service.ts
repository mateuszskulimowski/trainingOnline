import { Injectable } from '@angular/core';
import { Observable, from, map } from 'rxjs';
import { QuantityExerciseModel } from '../models/quantity-exercise.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({ providedIn: 'root' })
export class TrainingService {
  constructor(private _client: AngularFirestore) {}
  addPlan(plan: {
    exercise: string;
    comment: string;
    quantityExercise: QuantityExerciseModel[];
  }): Observable<void> {
    return from(this._client.collection('plans').add(plan)).pipe(
      map(() => void 0)
    );
  }
}
