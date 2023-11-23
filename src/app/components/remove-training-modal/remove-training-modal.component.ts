import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  ViewEncapsulation,
} from '@angular/core';
import { TrainingService } from '../../services/training.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-remove-training-modal',
  templateUrl: './remove-training-modal.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemoveTrainingModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    private _trainingService: TrainingService
  ) {}
  removeTraining(trainingId: string): void {
    this._trainingService.removeTraining(trainingId).subscribe();
    this.dialogRef.close();
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}
