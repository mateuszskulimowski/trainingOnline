import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { CommentExerciseModalComponent } from './comment-exercise-modal.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [MatDialogModule, ReactiveFormsModule, MatButtonModule],
  declarations: [CommentExerciseModalComponent],
  providers: [],
  exports: [CommentExerciseModalComponent],
})
export class CommentExerciseModalComponentModule {}
