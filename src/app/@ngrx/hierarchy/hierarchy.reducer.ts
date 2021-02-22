import {HierarchyItem} from '../../interfaces/hierarchy-item.interface';
import {Action, createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import * as HierarchyActions from './hierarchy.actions';

export interface HierarchyState {
    hierarchyLoading: boolean;
    hierarchy: HierarchyItem[];
}

const initialState: HierarchyState = {
  hierarchyLoading: false,
  hierarchy: null,
};

const reducer = createReducer(
  initialState,
  on(HierarchyActions.loadHierarchy, state => ({...state, hierarchyLoading: true})),
  on(HierarchyActions.loadHierarchySuccess, (state, { hierarchy }) => ({...state, hierarchyLoading: false, hierarchy})),
  on(HierarchyActions.loadHierarchyFailure, (state) => ({...state, hierarchyLoading: false, hierarchy: null}))
);

export function hierarchyReducer(state: HierarchyState | undefined, action: Action) {
  return reducer(state, action);
}

export const selectHierarchyFeature = createFeatureSelector<HierarchyState>('hierarchy');
export const selectHierarchy = createSelector(selectHierarchyFeature, (state) => state.hierarchy);
export const selectHierarchyItem = createSelector(
  selectHierarchyFeature,
  (state: HierarchyState, props) => state.hierarchy.find(item => item.name === props.name)
);
