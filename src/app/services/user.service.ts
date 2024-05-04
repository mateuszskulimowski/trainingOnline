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
  setTraining(
    userId: string,
    trainingActive: { number: number; comment: string }[]
  ): Observable<void> {
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
  setCommentForWeek(
    userId: string,
    index: number,
    comment: string
  ): Observable<void> {

    const docRef = this._angularFirestore.collection('users').doc(userId);

    return docRef.get().pipe(
      switchMap((doc) => {
        if (doc.exists) {
          const data = doc.data() as UserModel;
   
          data.trainingWeeks[index].comment = comment;
          return from(docRef.update({ trainingWeeks: data.trainingWeeks }));
        } else {
          throw new Error(`Dokument o ID ${userId} nie istnieje`);
        }
      })
    );
  }

  setTrainerIdForUser(userId: string, trainerId: string): Observable<void> {
    return from(
      this._angularFirestore
        .doc('users/' + userId)
        .update({ trainerId: trainerId })
    ).pipe(map(() => void 0));
  }

  setDriveLink(userId: string, driveLink: string): Observable<void> {
    return from(
      this._angularFirestore
        .doc('users/' + userId)
        .update({ driveLink: driveLink })
    ).pipe(map(() => void 0));
  }
}
