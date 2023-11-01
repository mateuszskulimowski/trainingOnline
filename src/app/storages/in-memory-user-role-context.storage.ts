import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  map,
  Observable,
  of,
  ReplaySubject,
  Subject,
} from 'rxjs';
import { UserContext } from '../contexts/user.context';

@Injectable()
export class InMemoryUserRoleContextStorage {
  private _subject = new BehaviorSubject<string>('');

  select(): Observable<string> {
    return this._subject.asObservable();
  }
  setState(context: string): Observable<void> {
    return of(this._subject.next(context)).pipe(map(() => void 0));
  }
}
