import { TrainingElementModel } from './training-element.model';

export interface TrainingModel {
  readonly id: string;
  readonly trainingElement: TrainingElementModel[];
  readonly userId: string;
  readonly weekId: string;
  readonly monthId: string;
  readonly yearId: string;
  readonly trainerId: string;
}
