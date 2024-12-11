import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TrainingDetailsComponentModule } from 'src/app/components/training-details/training-details.component-module';
import { TrainingPlansComponent } from 'src/app/components/training-plans/training-plans.component';
import { ChoiseDateModel } from 'src/app/models/choise-data.model';

@Component({
  selector: 'app-training-plans-page',
  templateUrl: './training-plans.page.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    TrainingPlansComponent,
    TrainingDetailsComponentModule,
  ],
})
export class TrainingPlansPage {}
