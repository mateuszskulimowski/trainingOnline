import { QuantityExerciseModel } from './quantity-exercise.model';

export interface TrainingElementModel {
  readonly exercise: string;
  readonly comment: string;
  readonly quantity: QuantityExerciseModel[];
  readonly index: number;
}
