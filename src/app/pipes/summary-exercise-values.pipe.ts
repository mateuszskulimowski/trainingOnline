import { Pipe, PipeTransform } from '@angular/core';
import { QuantityExerciseModel } from '../models/quantity-exercise.model';

@Pipe({ name: 'summaryExerciseValues' })
export class SummaryExerciseValuesPipe implements PipeTransform {
  transform(value: QuantityExerciseModel[]): number {
    const result: number = value
      .map((data) => {
        const tokens = data.rep
          .replace(/\s/g, '')
          .replace(/(\d+)(?=\()/g, '$1*')
          .replace(/\)2/g, '*2')
          .split(/([\+\-\*\/\(\)])/)
          .filter((token) => !!token);
        let isSummary: boolean = false;
        let isMultiplication: boolean = true;

        if (tokens.length > 1) {
          const summary = tokens
            .filter((token) => {
              if (token === '(') {
                isSummary = true;
              } else if (token === ')') {
                isSummary = false;
              } else if (isSummary) {
                return token;
              }

              return null;
            })
            .map((data) => {
              if (data !== '+') {
                return Number(data);
              }
              return data;
            })
            .reduce((a: number, c) => {
              if (typeof c === 'number') {
                return a + c;
              }
              return a;
            }, 0 as number);

          const multiplicand: number = Number(
            tokens
              .filter((data) => {
                if (data === '(') {
                  isMultiplication = false;
                } else if (isMultiplication) {
                  return data;
                }
                return null;
              })
              .map((data) => {
                if (data !== '*') {
                  return Number(data);
                }
                return data;
              })
              .filter((data) => typeof data === 'number')
              .shift()
          );
   
          return Number(data.set) * summary * multiplicand * Number(data.value);
        } else {
          const summary: number = Number(tokens.shift());

          return summary * Number(data.set) * Number(data.value);
        }
      })
      .reduce((a, c) => {
        return a + c;
      }, 0) as number;
    return result;
  }
}
