import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {DictionaryActions, loadDictionary, loadDictionaryFailure, loadDictionarySuccess} from './dictionary.actions';
import {DataService} from '../../services/data.service';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable()
export class DictionaryEffects {
  load$ = createEffect(() =>
  this.actions$.pipe(
    ofType(loadDictionary),
    switchMap(() => this.service.getDictionary().pipe(
      map(dictionary => loadDictionarySuccess({dictionary})),
      catchError(() => of(loadDictionaryFailure()))
    ))
  ));

  constructor(private actions$: Actions<DictionaryActions>,
              private service: DataService) {}
}
