import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserModel } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailsComponent implements OnInit {
  readonly user$: Observable<UserModel | undefined> =
    this._activatedRoute.params.pipe(
      switchMap((params) => this._userService.getOneUser(params['userId']))
    );
  private _userIdSubject: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  public userId$: Observable<string> = this._userIdSubject.asObservable();

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _userService: UserService
  ) {}
  ngOnInit(): void {
    this._activatedRoute.params.subscribe((params) =>
      this._userIdSubject.next(params['userId'])
    );
    // console.log()
  }
}
