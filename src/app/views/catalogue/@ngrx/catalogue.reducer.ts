import {CatalogueItem} from '../../../interfaces/catalogue-item.interface';
import {Action, createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import * as CatalogueActions from './catalogue.actions';

export interface CatalogueState {
  catalogueLoading: boolean;
  catalogue: CatalogueItem[];

}

const initialState: CatalogueState = {
  catalogueLoading: false,
  catalogue: null,
};

const reducer = createReducer(initialState,
  on(CatalogueActions.loadCatalogue, (state) => ({...state, catalogueLoading: true})),
  on(CatalogueActions.loadCatalogueSuccess, (state, { catalogue }) => ({...state, catalogueLoading: false, catalogue})),
  on(CatalogueActions.loadCatalogueFailure, state => ({ ...state, catalogueLoading: false, catalogue: null})),
);

export function catalogueReducer(state: CatalogueState | undefined, action: Action) {
  return reducer(state, action);
}

export const selectCatalogueFeature = createFeatureSelector<CatalogueState>('catalogue');
export const selectCatalogue = createSelector(selectCatalogueFeature, (state) => state.catalogue);
