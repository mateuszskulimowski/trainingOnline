import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TrainingService } from '../../services/training.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-comment-exercise-modal',
  templateUrl: './comment-exercise-modal.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentExerciseModalComponent implements OnInit {
  readonly exerciseCommentForm: FormGroup = new FormGroup({
    comment: new FormControl(),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    private _trainingService: TrainingService
  ) {}
  ngOnInit(): void {
    this.exerciseCommentForm
      .get('comment')
      ?.patchValue(this.data.currentComment);
  }
  addExerciseComment(form: FormGroup, trainignId: string, index: number): void {
    this._trainingService
      .updateExerciseAdminComment(
        trainignId,
        form.get('comment')?.value,
        index - 1
      )
      .subscribe(() => this.closeDialog());
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}
