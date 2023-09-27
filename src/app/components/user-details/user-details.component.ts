import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailsComponent implements OnInit {
  readonly user$: Observable<any> = this._activatedRoute.params.pipe(
    switchMap((params) => {
      return this._userService.getOneUser(params['userId']);
    })
  );

  readonly userDetailsForm: FormGroup = new FormGroup({
    paidTraining: new FormControl(),
  });

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _userService: UserService
  ) {}
  ngOnInit(): void {}

  addPaidTraining(userDetail: UserModel, paidTrainingForm: FormGroup): void {
    const paid =
      userDetail.paidTraining + paidTrainingForm.get('paidTraining')?.value;
    this._userService.setPaidTraining(userDetail, paid);
    paidTrainingForm.reset();
  }
}
