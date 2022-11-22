import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnChanges, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Nullable } from 'src/app/interfaces/nullable';
import { getHttpErrorMessage } from 'src/app/utils/error-message.utils';

interface Error {
  status: number;
  message: string;
}

@Component({
  selector: 'app-request-wrapper',
  templateUrl: './request-wrapper.component.html',
  styleUrls: ['./request-wrapper.component.scss']
})
export class RequestWrapperComponent<T=unknown> implements OnChanges {
  @Input()
  request$: Nullable<Observable<T>>;

  @Input()
  hasBackBtn = true;

  @Output()
  response = new EventEmitter<T>();

  data: Nullable<T>;

  hasFirstRs: Nullable<boolean>;

  isLoading: Nullable<boolean>;

  error: Nullable<Error>;


  constructor(private cdr: ChangeDetectorRef) { }

  ngOnChanges(): void {
    this.request$ = this.getUpdatedRequest$(this.request$);
  }

  getUpdatedRequest$(rq$: Nullable<Observable<T>>): Nullable<Observable<T>> {
    this.error = null;
    if (rq$) {
      this.isLoading = true;
      return rq$.pipe(
        tap(data => this.onDataTap(data)),
        catchError(error => this.onCatchError(error)),
        );
    }
  }

  onDataTap(data: T) {
    this.data = data;
    this.response.emit(data);
    this.hasFirstRs = true;
    this.isLoading = false;
    this.cdr.detectChanges();
  }

  onCatchError(error: HttpErrorResponse) {
    this.isLoading = false;
    this.error = { status: error.status, message: getHttpErrorMessage(error) }
    this.cdr.markForCheck();
    return throwError(() => error);
  }

}
