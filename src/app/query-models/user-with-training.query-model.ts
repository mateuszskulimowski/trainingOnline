export interface UserWithTrainingQueryModel {
  readonly userId: string;
  readonly authId: string;
  readonly trainingWeeks: number[];
  readonly isEdit: boolean;
}
