import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ContextModel } from '../../models/context.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  readonly userAuthContext$: Observable<ContextModel> =
    this._authService.load();

  constructor(private _authService: AuthService, private _router: Router) {}

  logOut(): void {
    this._authService.logOut().subscribe({
      next: () => {
        this._router.navigate(['/']);
      },
    });
  }
}
