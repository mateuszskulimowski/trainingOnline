export interface UserWithTrainingQueryModel {
  readonly userId: string;
  readonly trainingWeeks: number[];
  readonly isEdit: boolean;
}
