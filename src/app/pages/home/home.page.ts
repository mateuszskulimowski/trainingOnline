import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { HomeComponentModule } from 'src/app/components/home/home.component-module';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.page.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [HomeComponentModule],
})
export class HomePage {}
