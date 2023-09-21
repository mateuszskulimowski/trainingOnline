import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  ViewEncapsulation,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-rating-modal',
  templateUrl: './rating-modal.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingModalComponent {
  private _dificultValueSubject: BehaviorSubject<number[]> =
    new BehaviorSubject<number[]>([1, 2, 3, 4, 5]);
  public dificultValue$: Observable<number[]> =
    this._dificultValueSubject.asObservable();
  // public dificultValue: number[] = [1, 2, 3, 4, 5];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>
  ) {}
}
