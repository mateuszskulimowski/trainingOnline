import { TrainingModel } from '../models/training.model';

export class TrainingListWithUsersWeekQueryModel {
  constructor(
    public readonly userId: string,
    public readonly week: { number: number; comment: string },
    public readonly training: TrainingModel[],
    public readonly isToCheck: boolean
  ) {}
}
