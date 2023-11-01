import { Injectable } from '@angular/core';
import { Observable, Subject, from, of } from 'rxjs';
import { map, shareReplay, take } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CredentialModel } from '../models/credential.model';
import firebase from 'firebase/compat';
import User = firebase.User;
import { ContextModel } from '../models/context.model';
import { UserContextModel } from '../models/user-context.model';
import { LoadUserContextService } from '../resolvers/load-user-context.service';
import { UserContext } from '../contexts/user.context';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _userContextSubject: Subject<UserContextModel> =
    new Subject<UserContextModel>();
  public userContext$: Observable<UserContextModel> =
    this._userContextSubject.asObservable();

  constructor(
    private _client: AngularFireAuth // private _loadUserContextService: LoadUserContextService
  ) {}

  login(credential: CredentialModel): Observable<UserContext> {
    return from(
      this._client.signInWithEmailAndPassword(
        credential.email,
        credential.password
      )
    ).pipe(
      map((user) => {
        console.log(user);
        // if(user===undefined&&user===null){
        //   return
        // }
        return {
          authId: user.user?.uid,
          email: user.user?.email,
          role: '',
        } as UserContext;
      })
    );
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
  // load(): Observable<ContextModel> {
  //   return this.getOne().pipe(
  //     map((user) => {
  //       if (user === null && user == undefined) {
  //         return void 0;
  //       }
  //       const context: ContextModel = {
  //         id: user.uid,
  //         email: user.email,
  //         isVerified: user.emailVerified,
  //       } as ContextModel;
  //       // console.log(context);
  //       this._userContextSubject.next(context);
  //       return context;
  //     })
  //   ) as Observable<ContextModel>;
  // }

  logOut(): Observable<void> {
    return from(this._client.signOut());
  }
}
