import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {selectHierarchy} from '../../@ngrx/hierarchy/hierarchy.reducer';
import {finalize, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit, OnDestroy {
  data;
  isLoading = true;
  destroyed$ = new Subject<void>();
  constructor(private store: Store) {}

  ngOnInit() {
    this.store.select(selectHierarchy).pipe(
      finalize(() => this.isLoading = false),
      takeUntil(this.destroyed$)
    )
      .subscribe(res => this.data = res);
  }
  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
