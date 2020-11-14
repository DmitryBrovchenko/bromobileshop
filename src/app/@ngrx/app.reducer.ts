import {HierarchyItem} from '../interfaces/hierarchy-item.interface';
import {Action, createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import * as AppActions from './app.actions';

export interface AppState {
    hierarchyLoading: boolean;
    hierarchy: HierarchyItem[];
}

const initialState: AppState = {
  hierarchyLoading: false,
  hierarchy: null,
};

const reducer = createReducer(
  initialState,
  on(AppActions.loadHierarchy, state => ({...state, hierarchyLoading: true})),
  on(AppActions.loadHierarchySuccess, (state, { hierarchy }) => ({...state, hierarchyLoading: false, hierarchy})),
  on(AppActions.loadHierarchyFailure, (state) => ({...state, hierarchyLoading: false, hierarchy: null}))
);

export function appReducer(state: AppState | undefined, action: Action) {
  return reducer(state, action);
}

export const selectHierarchyFeature = createFeatureSelector<AppState>('hierarchy');
export const selectHierarchy = createSelector(selectHierarchyFeature, (state) => state.hierarchy);
