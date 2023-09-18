import { TrainingModel } from '../models/training.model';

export class TrainingListWithUsersWeekQueryModel {
  constructor(
    public readonly week: number,
    public readonly training: TrainingModel[],
    public readonly userRole: string
  ) {}
}
