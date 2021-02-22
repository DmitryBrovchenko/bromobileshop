import {Injectable} from '@angular/core';
import {HierarchyActions, loadHierarchy, loadHierarchyFailure, loadHierarchySuccess} from './hierarchy.actions';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {DataService} from '../../services/data.service';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable()
export class HierarchyEffects {
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadHierarchy),
      switchMap(() => this.service.getHierarchy().pipe(
        map(hierarchy => loadHierarchySuccess({ hierarchy })),
        catchError(() => of(loadHierarchyFailure()))
      ))
    )
  );

  constructor(private actions$: Actions<HierarchyActions>, private service: DataService) {}
}
