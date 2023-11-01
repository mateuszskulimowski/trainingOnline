import {
  ChangeDetectorRef,
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import {
  Observable,
  Subject,
  filter,
  shareReplay,
  switchMap,
  take,
  takeUntil,
} from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { InMemoryUserContextStorage } from 'src/app/storages/in-memory-user-context.storage';

@Directive({ selector: '[hasAdminRole]' })
export class HasAdminDirective implements OnInit, OnDestroy {
  @Input() hasAdminRole: string | null = null;
  @Input() set hasAdminRoleElse(templateRef: TemplateRef<any> | null) {}
  private _elseTpl: TemplateRef<any> | null = null;
  private _onDestroy$ = new Subject<void>();

  constructor(
    private tepmlateRef: TemplateRef<any>,
    private _userService: UserService,
    private viewContainer: ViewContainerRef,
    private _cdr: ChangeDetectorRef,
    private _inMemoryUserContextStorage: InMemoryUserContextStorage
  ) {}

  ngOnInit(): void {
    this._inMemoryUserContextStorage
      .select()
      .pipe(
        filter((userContext) => !!userContext.role),
        switchMap((user) => {
          return this._userService
            .hasAdmin(user.role)
            .pipe(takeUntil(this._onDestroy$));
        })
      )
      .subscribe((hasRole) => {
        console.log(hasRole);
        this.viewContainer.clear();
        if (hasRole) {
          this.viewContainer.createEmbeddedView(this.tepmlateRef);
        } else {
          if (this._elseTpl) {
            this.viewContainer.createEmbeddedView(this._elseTpl);
          }
        }
        this._cdr.detectChanges();
      });
  }
  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }
}
