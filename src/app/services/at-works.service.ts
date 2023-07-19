import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from, map } from 'rxjs';
import { YearModel } from '../models/year.model';

@Injectable({ providedIn: 'root' })
export class AtWorksService {
  constructor(private _client: AngularFirestore) {}

  add(value: Partial<YearModel>): Observable<void> {
    return from(this._client.collection('weeks').add(value)).pipe(
      map(() => void 0)
    );
  }
}
