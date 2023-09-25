import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChoiseDateModel } from 'src/app/models/choise-data.model';

@Component({
  selector: 'app-create-plan-users-page',
  templateUrl: './create-plan-users.page.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePlanUsersPage {}
