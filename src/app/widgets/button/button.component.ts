import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
import { Params } from '@angular/router';
import { finalize, isObservable, Observable } from 'rxjs';
import { Nullable } from 'src/app/interfaces/nullable';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  @Input() label: Nullable<string>;

  @Input() icon: Nullable<string>;

  @Input() size: 'large'|'small'|'default' = 'default';

  @Input() shape: 'circle'|'round'|null = null;

  @Input() appearance: 'primary'|'dashed'|'link'|'text'|null = null;

  @Input() isDisabled: boolean = false;

  @Input() btnRouterLink: (number | string)[] | string | null = null;

  @Input() btnRouterQueryParams: Nullable<Params>;

  @Input() actionCallback$: () => Observable<unknown> | null | void; 

  isLoading = false;

  action$: Observable<unknown> | null;

  constructor(private cdr: ChangeDetectorRef) { }

  onClick() {
    const actionResult$ = this.actionCallback$?.();
    if (!isObservable(actionResult$)) return;
    this.isLoading = true;
    this.action$ = actionResult$.pipe(
      finalize(() => {
        this.action$ = null;
        this.isLoading = false;
        this.cdr.markForCheck();
      })
    )
  }

}
