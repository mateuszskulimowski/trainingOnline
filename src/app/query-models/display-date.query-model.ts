import { DateModel } from '../models/date.model';

export interface DisplayDateQueryModel {
  readonly years: DateModel[];
  readonly months: DateModel[];
  readonly weeks: DateModel[];
}
