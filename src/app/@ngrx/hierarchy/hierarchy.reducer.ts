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
export const selectHierarchyLoading = createSelector(selectHierarchyFeature, (state) => state.hierarchyLoading);
export const selectHierarchy = createSelector(selectHierarchyFeature, (state) => state.hierarchy);
export const selectHierarchyItem = createSelector(
  selectHierarchy,
  (hierarchy: HierarchyItem[], props) => hierarchy.find(item => item.name === props.name)
);
export const selectHierarchyItemL2 = createSelector(
  selectHierarchyItem,
  (hierarchyItem: HierarchyItem, props) => hierarchyItem?.children.find(child => child.name === props.name2) 
);
export const selectHierarchyItemL3 = createSelector(
  selectHierarchyItemL2,
  (hierarchyItemL2: HierarchyItem, props) => hierarchyItemL2?.children.find((child) => child.name === props.name3)
);
export const selectHierarchyItemL4 = createSelector(
  selectHierarchyItemL3,
  (hierarchyItemL3: HierarchyItem, props) => hierarchyItemL3?.children.find((child) => child.name === props.name4) 
);