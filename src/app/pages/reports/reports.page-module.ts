import { NgModule } from '@angular/core';
import { ReportsPage } from './reports.page';
import { TrainingPlansComponentModule } from 'src/app/components/training-plans/training-plans.component-module';
import { MatExpansionModule } from '@angular/material/expansion';
import { ReportsComponentModule } from 'src/app/components/reports/reports.component-module';

@NgModule({
  imports: [ReportsComponentModule],
  declarations: [ReportsPage],
  providers: [],
  exports: [ReportsPage],
})
export class ReportsPageModule {}
