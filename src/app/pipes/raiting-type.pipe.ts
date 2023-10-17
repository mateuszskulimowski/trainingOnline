import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'raitingType' })
export class RaitingTypePipe implements PipeTransform {
  transform(value: string): string {
    if (value === 'exercise') {
      return 'ćwiczenia';
    } else if ('training') {
      return 'treningu';
    }
    return '';
  }
}
