import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { BehaviorSubject, Observable } from 'rxjs';
import { TrainingService } from '../../services/training.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-rating-modal',
  templateUrl: './rating-modal.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingModalComponent implements OnInit {
  private _dificultValueSubject: BehaviorSubject<number[]> =
    new BehaviorSubject<number[]>([1, 2, 3, 4, 5]);
  public dificultValue$: Observable<number[]> =
    this._dificultValueSubject.asObservable();
  readonly raitingForm: FormGroup = new FormGroup({
    comment: new FormControl(),
    raitingValue: new FormControl(),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    private _trainingService: TrainingService
  ) {}
  ngOnInit(): void {
    this.raitingForm.get('comment')?.patchValue(this.data.raitingComment);
    this.raitingForm.get('raitingValue')?.patchValue(this.data.raitingValue);
  }

  addRaiting(
    trainingId: string,
    raitingForm: FormGroup,
    raitingType: string,
    exerciseOrder: number
  ): void {
    this.dialogRef.close();

    this._trainingService
      .setRaiting(
        trainingId,
        exerciseOrder,
        raitingForm.get('comment')?.value,
        raitingForm.get('raitingValue')?.value,
        raitingType
      )

      .subscribe();
  }
}
