import { Injectable } from '@angular/core';
import { Observable, Subject, from } from 'rxjs';
import { map, shareReplay, take } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CredentialModel } from '../models/credential.model';
import firebase from 'firebase/compat';
import User = firebase.User;
import { ContextModel } from '../models/context.model';
import { UserContextModel } from '../models/user-context.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _userContextSubject: Subject<UserContextModel> =
    new Subject<UserContextModel>();
  public userContext$: Observable<UserContextModel> =
    this._userContextSubject.asObservable();

  constructor(private _client: AngularFireAuth) {}

  login(credential: CredentialModel): Observable<void> {
    return from(
      this._client.signInWithEmailAndPassword(
        credential.email,
        credential.password
      )
    ).pipe(map(() => void 0));
  }

  register(credential: CredentialModel): Observable<string> {
    return from(
      this._client.createUserWithEmailAndPassword(
        credential.email,
        credential.password
      )
    ).pipe(
      take(1),
      map((response) => {
        return (response.user as User).uid;
      })
    );
  }
  getOne(): Observable<User | null> {
    return this._client.authState;
  }
  load(): Observable<ContextModel> {
    return this.getOne().pipe(
      map((user) => {
        if (user === null && user == undefined) {
          return void 0;
        }
        const context: ContextModel = {
          id: user.uid,
          email: user.email,
          isVerified: user.emailVerified,
        } as ContextModel;
        console.log(context);
        this._userContextSubject.next(context);
        return context;
      })
    ) as Observable<ContextModel>;
  }

  logOut(): Observable<void> {
    console.log('logout');
    return from(this._client.signOut()).pipe(map(() => void 0));
  }
}
