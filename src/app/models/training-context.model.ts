import { TrainingElementModel } from './training-element.model';

export interface TrainingContextModel {
  readonly isEdit: boolean;
  readonly trainingElements: TrainingElementModel[];
  readonly trainingWeek: number;
  readonly isDone: boolean;
}
