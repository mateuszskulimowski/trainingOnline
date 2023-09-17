export interface UserModel {
  readonly id: string;
  readonly name: string;
  readonly lastName: string;
  readonly email: string;
  readonly role: string;
  readonly authId: string;
  readonly trainerId: string;
  readonly paidTraining: number;
  readonly trainingWeeks: number[];
}
