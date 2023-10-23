import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from, of, throwError } from 'rxjs';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { UserModel } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private _angularFirestore: AngularFirestore) {}

  addUser(user: Partial<UserModel>): Observable<void> {
    return from(
      this._angularFirestore
        .collection('users')
        .add({ ...user, paidTraining: 0, trainingWeeks: [] })
    ).pipe(map(() => void 0));
  }
  getAllUsers(): Observable<UserModel[]> {
    return this._angularFirestore
      .collection<UserModel>('users')
      .valueChanges({ idField: 'id' })
      .pipe(shareReplay(1));
  }
  getOneUser(id: string): Observable<UserModel> {
    return this._angularFirestore
      .collection<UserModel>('users')
      .valueChanges({ idField: 'id' })
      .pipe(
        map((users) => {
          return users.filter((user) => user.id === id).shift() as UserModel;
        }),
        shareReplay(1)
      );
  }
  getOneUserByAuth(authId: string): Observable<UserModel> {
    return this._angularFirestore
      .collection<UserModel>('users', (ref) =>
        ref.where('authId', '==', authId)
      )
      .valueChanges({ idField: 'id' })
      .pipe(
        switchMap((item) =>
          item
            ? of(item[0])
            : throwError(new Error('Item does not exist in firebase'))
        ),
        shareReplay(1)
      );
  }
  setTraining(userId: string, trainingActive: number[]): Observable<void> {
    console.log('serwis ', trainingActive);
    return from(
      this._angularFirestore
        .doc('users/' + userId)
        .update({ trainingWeeks: trainingActive })
    ).pipe(map(() => void 0));
  }

  setPaidTraining(
    userDetail: UserModel,
    paidTraining: number
  ): Observable<void> {
    return from(
      this._angularFirestore
        .doc('users/' + userDetail.id)
        .update({ paidTraining: paidTraining })
    ).pipe(map(() => void 0));
  }
  hasAdmin(role: string): Observable<boolean> {
    return of(role === 'admin');
  }
}
