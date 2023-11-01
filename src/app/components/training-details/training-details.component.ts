import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { TrainingModel } from '../../models/training.model';
import { TrainingService } from '../../services/training.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { RatingModalComponent } from '../rating-modal/rating-modal.component';
import { InMemoryUserContextStorage } from 'src/app/storages/in-memory-user-context.storage';
import { UserContext } from 'src/app/contexts/user.context';

@Component({
  selector: 'app-training-details',
  templateUrl: './training-details.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingDetailsComponent implements OnInit {
  readonly trainingDetails$: Observable<TrainingModel> =
    this._activatedRoute.params.pipe(
      switchMap((params) =>
        this._trainingService.getOneTraining(params['trainingId'])
      )
    );
  // private _roleSubject: BehaviorSubject<string> = new BehaviorSubject<string>(
  //   ''
  // );
  // public role$: Observable<string> = this._roleSubject.asObservable();
  // readonly userContext$: Observable<UserContext> =
  //   this._inMemoryUserContextStorage.select();
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _trainingService: TrainingService,
    private _userService: UserService,
    private _authService: AuthService,
    public dialog: MatDialog,
    private _inMemoryUserContextStorage: InMemoryUserContextStorage
  ) {}
  ngOnInit(): void {
    // this._authService
    //   .load()
    //   .pipe(
    //     switchMap((userContext) =>
    //       this._userService
    //         .getOneUserByAuth(userContext.id)
    //         .pipe(tap((user) => this._roleSubject.next(user.role)))
    //     )
    //   )
    //   .subscribe();
    // this._inMemoryUserContextStorage
    //   .select()
    //   .pipe(
    //     switchMap((userContext) =>
    //       this._userService
    //         .getOneUserByAuth(userContext.authId)
    //         .pipe(tap((user) => _))
    //     )
    //   );
  }
  openRaitingModal(
    raitingType: string,
    exerciseOrder: number,
    trainingId: string,
    raitingComment: string,
    raitingValue: number
  ) {
    let dialogRef = this.dialog.open(RatingModalComponent, {
      height: '200px',
      width: '360px',
      data: {
        raitingType: raitingType,
        exerciseOrder: exerciseOrder - 1,
        trainingId: trainingId,
        raitingComment: raitingComment,
        raitingValue: raitingValue,
      },
    });
  }
}
