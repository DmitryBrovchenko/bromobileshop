import {createAction, props, union} from '@ngrx/store';
import {DictionaryItem} from '../../interfaces/dictionary-item.interface';

export const loadDictionary = createAction('[dictionary] Load Dictionary');
export const loadDictionarySuccess = createAction('[dictionary] Load Dictionary - Success', props<{ dictionary: DictionaryItem[] }>());
export const loadDictionaryFailure = createAction('[dictionary] Load Dictionary - Failure');

const all = union({
  loadDictionary,
  loadDictionarySuccess,
  loadDictionaryFailure,
});
export type DictionaryActions = typeof all;
