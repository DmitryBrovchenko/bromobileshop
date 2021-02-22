import {DictionaryItem} from '../../interfaces/dictionary-item.interface';
import {Action, createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import * as DictionaryActions from './dictionary.actions';

export interface DictionaryState {
  dictionaryLoading: boolean;
  dictionary: DictionaryItem[];
}

const initialState: DictionaryState = {
  dictionaryLoading: false,
  dictionary: null,
};

const reducer = createReducer(
  initialState,
  on(DictionaryActions.loadDictionary, state => ({...state, dictionaryLoading: true })),
  on(DictionaryActions.loadDictionarySuccess, (state, {dictionary}) => ({...state, dictionaryLoading: false, dictionary})),
  on(DictionaryActions.loadDictionaryFailure, state => ({...state, dictionaryLoading: false, dictionary: null}))
);

export function dictionaryReducer(state: DictionaryState | undefined, action: Action) {
  return reducer(state, action);
}

export const selectDictionaryFeature = createFeatureSelector<DictionaryState>('dictionary');
export const selectDictionary = createSelector(selectDictionaryFeature, (state) => state.dictionary);
export const selectDictionaryItem = createSelector(
  selectDictionaryFeature,
  (state: DictionaryState, props) => state.dictionary.find(item => item.name === props.name)
);
