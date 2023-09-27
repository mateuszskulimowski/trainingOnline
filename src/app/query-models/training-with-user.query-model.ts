import { TrainingModel } from '../models/training.model';

export interface TrainingWithUserQueryModel {
  readonly training: TrainingModel[];
  readonly authId: string;
}
