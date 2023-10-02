import { TrainingModel } from '../models/training.model';

export interface TrainingListWithUserRoleQueryModel {
  readonly training: TrainingModel[];
  readonly role: string;
}
