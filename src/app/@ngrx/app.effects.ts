import {Injectable} from '@angular/core';
import {AppActions, loadHierarchy, loadHierarchySuccess} from './app.actions';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {DataService} from '../services/data.service';
import {map, switchMap} from 'rxjs/operators';

@Injectable()
export class AppEffects {
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadHierarchy),
      switchMap(() => this.service.getHierarchy().pipe(
        map(hierarchy => loadHierarchySuccess({ hierarchy }))
      ))
    )
  );

  constructor(private actions$: Actions<AppActions>, private service: DataService) {}
}
