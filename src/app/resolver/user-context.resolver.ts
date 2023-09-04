import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { InMemoryRecruitmentProjectStorage } from '../in-memory-user-context/in-memory-user-context.storage';

@Injectable()
export class UserContextResolver implements Resolve<void> {
  constructor(
    private _inMemoryUserContextStorage: InMemoryRecruitmentProjectStorage
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<void> {
    // this._inMemoryUserContextStorage.setState();
    console.log('resolve');
    return of(void 0);
  }
}
