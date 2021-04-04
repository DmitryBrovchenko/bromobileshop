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
export const selectCatalogueFirstLevel = createSelector(
  selectCatalogue,
  (catalogue: CatalogueItem[], props) => catalogue?.filter(item => item['Category 1'] === props.level1));
export const selectCatalogueSecondLevel = createSelector(
  selectCatalogueFirstLevel,
  (levelOne: CatalogueItem[], props) => levelOne?.filter(item => item['Category 2'] === props.level2)
);
export const selectCatalogueThirdLevel = createSelector(
  selectCatalogueSecondLevel,
  (levelTwo: CatalogueItem[], props) => levelTwo?.filter(item => item['Category 3'] === props.level3)
);
export const selectCatalogueFourthLevel = createSelector(
  selectCatalogueThirdLevel,
  (levelThree: CatalogueItem[], props) => levelThree?.filter(item => item['Category 4'] === props.level4)
);