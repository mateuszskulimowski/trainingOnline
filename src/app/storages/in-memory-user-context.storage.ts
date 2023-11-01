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
export class InMemoryUserContextStorage {
  private _subject = new BehaviorSubject<UserContext>({
    authId: '',
    email: '',
    role: '',
  });

  select(): Observable<UserContext> {
    return this._subject.asObservable();
  }
  setState(context: UserContext): Observable<void> {
    // console.log('setuje', context);
    return of(this._subject.next(context)).pipe(map(() => void 0));
  }
}
