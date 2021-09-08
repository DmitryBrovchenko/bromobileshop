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
export const selectHierarchyItem = (name: string) => createSelector(
  selectHierarchy,
  (hierarchy: HierarchyItem[]) => hierarchy.find(item => item.name === name)
);
export const selectHierarchyItemL2 = (name: string, name2: string) => createSelector(
  selectHierarchyItem(name),
  (hierarchyItem: HierarchyItem) => hierarchyItem?.children.find(child => child.name === name2) 
);
export const selectHierarchyItemL3 = (name: string, name2: string, name3: string) => createSelector(
  selectHierarchyItemL2(name, name2),
  (hierarchyItemL2: HierarchyItem) => hierarchyItemL2?.children.find((child) => child.name === name3)
);
export const selectHierarchyItemL4 = (name: string, name2: string, name3: string, name4: string) => createSelector(
  selectHierarchyItemL3(name, name2, name3),
  (hierarchyItemL3: HierarchyItem) => hierarchyItemL3?.children.find((child) => child.name === name4) 
);

export const getDistinctNames = (hierarchyItem: HierarchyItem) => {
  const items = [];
  hierarchyItem?.children.forEach((item) => {
  if (!items.includes(item.name)) {
    items.push(item.name)
  }
});
return items;
}

export const selectHierarchyNamesL1 = createSelector(
  selectHierarchy,
  (hierarchyItems: HierarchyItem[]) => {
    const items = [];
    hierarchyItems?.forEach((item) => {
    if (!items.includes(item.name)) {
      items.push(item.name)
    }
  });
  return items;
});

export const selectHierarchyNamesL2 = (name: string) => createSelector(
  selectHierarchyItem(name),
  getDistinctNames
)

export const selectHierarchyNamesL3 = (name: string, name2: string) => createSelector(
  selectHierarchyItemL2(name, name2),
  getDistinctNames
)

export const selectHierarchyNamesL4 = (name: string, name2: string, name3: string) => createSelector(
  selectHierarchyItemL3(name, name2, name3),
  getDistinctNames
)