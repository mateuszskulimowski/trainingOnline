import { TrainingElementModel } from './training-element.model';

export interface TrainingModel {
  readonly id: string;
  readonly trainingElement: TrainingElementModel[];
  readonly userId: string;
  readonly trainingWeek: number;
  readonly createAt: string;
  readonly trainerId: string;
}
