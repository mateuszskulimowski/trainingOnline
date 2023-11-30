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
import { QuantityExerciseModel } from 'src/app/models/quantity-exercise.model';

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
  readonly user$: Observable<UserContext> =
    this._inMemoryUserContextStorage.select();
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _trainingService: TrainingService,
    private _userService: UserService,
    private _authService: AuthService,
    public dialog: MatDialog,
    private _inMemoryUserContextStorage: InMemoryUserContextStorage
  ) {}
  ngOnInit(): void {}
  openRaitingModal(
    raitingType: string,
    exerciseOrder: number,
    trainingId: string,
    raitingComment: string,
    raitingValue: number,
    hasFill: boolean,
    quantityExercise?: QuantityExerciseModel[],
    exerciseValue?: QuantityExerciseModel[]
  ) {
    let dialogRef = this.dialog.open(RatingModalComponent, {
      width: '480px',

      data: {
        raitingType: raitingType,
        exerciseOrder: exerciseOrder - 1,
        trainingId: trainingId,
        raitingComment: raitingComment,
        raitingValue: raitingValue,
        quantityExercise: quantityExercise,
        exerciseValue: exerciseValue,
        hasFill: hasFill,
      },
    });
  }

  openDriveGoogle(driveLink: string): void {
    window.open(driveLink);
  }
}
