import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'routerForUsersList' })
export class RouterForUsersListPipe implements PipeTransform {
  transform(value: string, userId: string): string {
    if (value === 'usersList') return '/user/' + userId;
    if (value === 'createPlan') return '';
    return 'null';
  }
}
