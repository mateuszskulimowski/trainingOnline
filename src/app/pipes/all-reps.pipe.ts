import { Pipe, PipeTransform } from '@angular/core';
import { QuantityExerciseModel } from '../models/quantity-exercise.model';

@Pipe({ name: 'allReps' })
export class AllRepsPipe implements PipeTransform {
  transform(value: QuantityExerciseModel[]): unknown {
    // console.log(value.slice());
    // console.log(value);
    console.log(
      ['2(1+1+1)', '2(2+2+1)'].reduce((a: number, c: string) => {
        console.log(typeof Number(c));
        console.log(c.split(''));

        return a + Number(c);
      }, 0 as number)
    );

    return null;
  }
}
