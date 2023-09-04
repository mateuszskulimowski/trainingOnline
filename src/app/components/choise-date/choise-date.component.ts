import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, combineLatest, map, shareReplay, tap } from 'rxjs';
import { ChoiseDateModel } from '../../models/choise-data.model';
import { TrainingService } from '../../services/training.service';
import { DisplayDateQueryModel } from 'src/app/query-models/display-date.query-model';

@Component({
  selector: 'app-choise-date',
  templateUrl: './choise-date.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChoiseDateComponent implements OnInit {
  @Output() date = new EventEmitter<ChoiseDateModel>();

  readonly date$: Observable<DisplayDateQueryModel> = combineLatest([
    this._trainingService.getYears(),
    this._trainingService.getMonths(),
    this._trainingService.getWeeks(),
  ]).pipe(
    map(([years, months, weeks]) => ({
      years: years,
      months: months,
      weeks: weeks,
    }))
  );

  readonly choiseForm: FormGroup = new FormGroup({
    year: new FormControl(''),
    month: new FormControl(''),
    week: new FormControl(''),
  });

  constructor(private _trainingService: TrainingService) {}

  ngOnInit(): void {
    this.choiseForm.valueChanges.subscribe((dateForm) => {
      this.date.emit(dateForm);
    });
  }
}
