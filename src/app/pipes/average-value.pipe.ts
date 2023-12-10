import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'averageValue' })
export class AverageValuePipe implements PipeTransform {
  transform(value: unknown): unknown {
    return null;
  }
}
