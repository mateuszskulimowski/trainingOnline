import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, map, startWith, switchMap, take, tap } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailsComponent implements OnInit {
  readonly user$: Observable<UserModel> = this._activatedRoute.params.pipe(
    switchMap((params) => {
      return this._userService.getOneUser(params['userId']).pipe(
        filter((user) => !!user),
        switchMap((user) => {
          return this.trainers$.pipe(
            map((trainers) => {
              const trainersMap = trainers.reduce((a, c) => {
                return { ...a, [c.trainerId]: c.name };
              }, {} as Record<string, string>);
        
              this.userDetailsForm.get('driveLink')?.patchValue(user.driveLink);

              this.userDetailsForm
                .get('addTrainer')
                ?.patchValue(trainersMap[user.trainerId]);
              return user;
            })
          );
        })
      );
    })
  );

  readonly userDetailsForm: FormGroup = new FormGroup({
    paidTraining: new FormControl(),
    addTrainer: new FormControl(),
    driveLink: new FormControl(),
  });

  readonly trainers$: Observable<{ name: string; trainerId: string }[]> = of([
    { name: 'Mateusz', trainerId: 'CaSXm8HpX2RHgkEPAaBL0HEDaOc2' },
    { name: 'Arkadiusz', trainerId: '2PZgBbsJQlT5eUdA1d7uB3IcVop2' },
  ]);

  private _filteredTrainersSubject: BehaviorSubject<
    { name: string; trainerId: string }[]
  > = new BehaviorSubject<{ name: string; trainerId: string }[]>([
    { name: '', trainerId: '' },
  ]);
  public filteredTrainers$: Observable<{ name: string; trainerId: string }[]> =
    this._filteredTrainersSubject.asObservable();
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _userService: UserService
  ) {}
  ngOnInit(): void {
    this.userDetailsForm.valueChanges
      .pipe(
        startWith({ name: '', trainerId: '' }),
        switchMap((user) => this._filterTrainers(user['addTrainer'] || '')),
        tap((data) => this._filteredTrainersSubject.next(data))
      )
      .subscribe();
  }

  addPaidTraining(userDetail: UserModel, paidTrainingForm: FormGroup): void {
    const paid =
      userDetail.paidTraining + paidTrainingForm.get('paidTraining')?.value;
    this._userService.setPaidTraining(userDetail, paid);
    paidTrainingForm.get('paidTraining')?.reset();
  }
  choseTrainer(userId: string, trainerId: string): void {

    this._userService.setTrainerIdForUser(userId, trainerId).subscribe();
  }

  setDriveLink(userId: string, userForm: FormGroup): void {
    this._userService
      .setDriveLink(userId, userForm.get('driveLink')?.value)
      .subscribe();
  }

  openDriveGoogle(driveLink: string): void {
    window.open(driveLink);
  }

  private _filterTrainers(
    name: string
  ): Observable<{ name: string; trainerId: string }[]> {
    const filterName = name.toLowerCase();

    return this.trainers$.pipe(
      map((trainers) =>
        trainers.filter((trainer) =>
          trainer.name.toLowerCase().includes(filterName)
        )
      )
    );
  }
}
