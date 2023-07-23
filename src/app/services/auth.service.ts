import { Injectable } from '@angular/core';
import { Observable, Subject, from } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ResponseModel } from '../models/response.model';
import { CredentialModel } from '../models/credential.model';
import firebase from 'firebase/compat';
import User = firebase.User;

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _responseSubject: Subject<ResponseModel> =
    new Subject<ResponseModel>();
  public response$: Observable<ResponseModel> =
    this._responseSubject.asObservable();
  private _userContextSubject: Subject<string> = new Subject<string>();
  public userContext$: Observable<string> =
    this._userContextSubject.asObservable();

  constructor(private _client: AngularFireAuth) {}

  login(credential: CredentialModel): Observable<any> {
    return from(
      this._client.signInWithEmailAndPassword(
        credential.email,
        credential.password
      )
    ).pipe(
      map((response) => {
        console.log(response.user?.multiFactor);
        return response.user?.multiFactor;
      })
    );
  }

  register(credential: CredentialModel): Observable<any> {
    return from(
      this._client.createUserWithEmailAndPassword(
        credential.email,
        credential.password
      )
    ).pipe(
      take(1),
      map((response) => {
        console.log('registerResponse', response);
        return response;
      })
    );
  }
  getOne(): Observable<User | null> {
    return this._client.authState;
  }
  load(): Observable<any> {
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
        console.log(context);
        return void 0;
      })
    );
  }

  logOut(): Observable<void> {
    return from(this._client.signOut()).pipe(map(() => void 0));
  }
}
