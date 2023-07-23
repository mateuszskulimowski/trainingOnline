import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, Subject, from } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
  private _userContextSubject: Subject<string> = new Subject<string>();
  public userContext$: Observable<string> =
    this._userContextSubject.asObservable();

  constructor(private _angularFirestore: AngularFirestore) {}

  addUser(authId: string): Observable<void> {
    return from(
      this._angularFirestore.collection('users').add({ authId: authId })
    ).pipe(map(() => void 0));
  }

  //   getOneUser(authId: string): Observable<any> {
  //     // console.log(authId);
  //     return this._angularFirestore
  //       .collection<{ authId: string }>('users', (ref) =>
  //         ref.where('authId', '==', authId)
  //       )
  //       .valueChanges({ idFields: 'id' });
  //   }
}
