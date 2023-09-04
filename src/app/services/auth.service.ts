import { Injectable } from '@angular/core';
import { Observable, Subject, from } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CredentialModel } from '../models/credential.model';
import firebase from 'firebase/compat';
import User = firebase.User;
import { ContextModel } from '../models/context.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _userContextSubject: Subject<{
    id: string;
    email: string;
    isVerified: boolean;
  }> = new Subject<{ id: string; email: string; isVerified: boolean }>();
  public userContext$: Observable<{
    id: string;
    email: string;
    isVerified: boolean;
  }> = this._userContextSubject.asObservable();

  constructor(private _client: AngularFireAuth) {}

  login(credential: CredentialModel): Observable<void> {
    return from(
      this._client.signInWithEmailAndPassword(
        credential.email,
        credential.password
      )
    ).pipe(map(() => void 0));
  }

  register(credential: CredentialModel): Observable<string | undefined> {
    return from(
      this._client.createUserWithEmailAndPassword(
        credential.email,
        credential.password
      )
    ).pipe(
      take(1),
      map((response) => {
        return response.user?.uid;
      })
    );
  }
  getOne(): Observable<User | null> {
    return this._client.authState;
  }
  load(): Observable<ContextModel | undefined> {
    return this.getOne().pipe(
      take(1),
      map((user) => {
        if (user === null) {
          return void 0;
        }
        console.log(user);
        const context = {
          id: user.uid,
          email: user.email,
          isVerified: user.emailVerified,
        };

        this._userContextSubject.next(context as ContextModel);
        return context as ContextModel;
      })
    );
  }

  logOut(): Observable<void> {
    return from(this._client.signOut()).pipe(map(() => void 0));
  }
}
