import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sort' })
export class SortPipe implements PipeTransform {
  transform(value: number[] | null): unknown {
    return null;
  }
}
