import { TrainingElementModel } from './training-element.model';

export interface TrainingModel {
  readonly id: string;
  readonly trainingElements: TrainingElementModel[];
  readonly authId: string;
  readonly trainingWeek: number;
  readonly createAt: string;
  readonly trainerId: string;
  raitingCommentTraining: string;
  raitingValueTraining: number;
  readonly isDone: boolean;
}
