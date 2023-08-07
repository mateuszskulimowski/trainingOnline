import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, Subject, from, of, throwError } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { UserModel } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private _userContextSubject: Subject<string> = new Subject<string>();
  public userContext$: Observable<string> =
    this._userContextSubject.asObservable();

  constructor(private _angularFirestore: AngularFirestore) {}

  addUser(user: Partial<UserModel>): Observable<void> {
    return from(this._angularFirestore.collection('users').add(user)).pipe(
      map(() => void 0)
    );
  }
  getAllUsers(): Observable<UserModel[]> {
    return this._angularFirestore
      .collection<UserModel>('users')
      .valueChanges({ idField: 'id' });
  }
  getOneUser(authId: string): Observable<UserModel> {
    // return this._angularFirestore
    //   .collection<UserModel>('users', (ref) => ref.where('id', '==', id))
    //   .valueChanges({ idFields: 'id' })
    //   .pipe(
    //     switchMap((item) => {
    //       console.log(item);
    //       return item
    //         ? of(item[0])
    //         : throwError(new Error('Item does not exist in firebase'));
    //     })
    //   );
    return this._angularFirestore
      .collection<UserModel>('users', (ref) =>
        ref.where('authId', '==', authId)
      )
      .valueChanges({ idFields: 'id' })
      .pipe(
        switchMap((item) =>
          item
            ? of(item[0])
            : throwError(new Error('Item does not exist in firebase'))
        )
      );
  }
}
