import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContextModel } from '../models/context.model';
import { TrainingElementModel } from '../models/training-element.model';

@Injectable()
export class InMemoryRecruitmentProjectStorage {
  private _subject: Subject<Partial<TrainingElementModel>> =
    new BehaviorSubject<Partial<TrainingElementModel>>({});

  setState(state: TrainingElementModel): Observable<void> {
    return of(this._subject.next(state)).pipe(map(() => void 0));
  }

  select(): Observable<Partial<TrainingElementModel>> {
    return this._subject.asObservable();
  }
}
