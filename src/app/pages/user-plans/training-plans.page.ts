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
export class TrainingPlansPage {
  private _dateSubject: BehaviorSubject<ChoiseDateModel> =
    new BehaviorSubject<ChoiseDateModel>({ year: '', month: '', week: '' });
  public date$: Observable<ChoiseDateModel> = this._dateSubject.asObservable();

  changeChoiseDate($event: ChoiseDateModel) {
    this._dateSubject.next($event);
  }
}
