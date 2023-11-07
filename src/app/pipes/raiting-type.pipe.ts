import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'raitingType' })
export class RaitingTypePipe implements PipeTransform {
  transform(value: string): string {
    console.log(value);
    if (value === 'exercise') {
      return 'ćwiczenia';
    } else if (value === 'training') {
      return 'treningu';
    } else if (value === 'weekComment') {
      return 'tygodnia';
    }
    return '';
  }
}
