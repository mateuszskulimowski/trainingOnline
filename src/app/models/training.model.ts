import { TrainingElementModel } from './training-element.model';

export interface TrainingModel {
  readonly id: string;
  readonly trainingElement: TrainingElementModel[];
  readonly userId: string;
  readonly week: string;
  readonly createAt: string;
  readonly trainerId: string;
}
