import {CatalogueItem} from '../../interfaces/catalogue-item.interface';
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
export const selectCatalogueFirstLevel = (level1: string) => createSelector(
  selectCatalogue,
  (catalogue: CatalogueItem[]) => catalogue?.filter(item => item['Category 1'] === level1));
export const selectCatalogueSecondLevel = (level1: string, level2: string) => createSelector(
  selectCatalogueFirstLevel(level1),
  (levelOne: CatalogueItem[]) => levelOne?.filter(item => item['Category 2'] === level2)
);
export const selectCatalogueThirdLevel = (level1: string, level2: string, level3: string) => createSelector(
  selectCatalogueSecondLevel(level1, level2),
  (levelTwo: CatalogueItem[]) => levelTwo?.filter(item => item['Category 3'] === level3)
);
export const selectCatalogueFourthLevel = (level1: string, level2: string, level3: string, level4: string) => createSelector(
  selectCatalogueThirdLevel(level1, level2, level3),
  (levelThree: CatalogueItem[]) => levelThree?.filter(item => item['Category 4'] === level4)
);
export const selectSearchResult = (criteria: string) => createSelector(
  selectCatalogue,
  (catalogue: CatalogueItem[]) => catalogue?.filter(item => item.Name?.toLowerCase().includes(criteria?.toLowerCase()))
);