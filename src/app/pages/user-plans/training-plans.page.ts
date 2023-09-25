import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChoiseDateModel } from 'src/app/models/choise-data.model';

@Component({
  selector: 'app-training-plans-page',
  templateUrl: './training-plans.page.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingPlansPage {}
