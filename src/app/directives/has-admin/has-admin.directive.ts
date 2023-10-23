import {
  ChangeDetectorRef,
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Directive({ selector: '[appHasAdmin]' })
export class HasAdminDirective implements OnInit, OnDestroy {
  @Input() hasAdminRole!: string;
  @Input() set hasAdminRoleElse(templateRef: TemplateRef<any> | null) {}
  private _elseTpl: TemplateRef<any> | null = null;
  private _onDestroy$ = new Subject<void>();

  constructor(
    private tepmlateRef: TemplateRef<any>,
    private _userService: UserService,
    private viewContainer: ViewContainerRef,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._userService
      .hasAdmin(this.hasAdminRole)
      .pipe(takeUntil(this._onDestroy$))
      .subscribe((hasRole) => {
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
