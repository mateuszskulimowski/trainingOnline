import { TrainingElementModel } from '../models/training-element.model';

export interface UserWithTrainingQueryModel {
  readonly userId: string;
  readonly trainingWeeks: number[];
  readonly isEdit: boolean;
  readonly trainingWeek: number;
  readonly trainingElements: TrainingElementModel[];
  readonly isDone: boolean;
}
