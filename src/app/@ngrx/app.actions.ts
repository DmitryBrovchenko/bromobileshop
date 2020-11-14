import {createAction, props, union} from '@ngrx/store';
import {HierarchyItem} from '../interfaces/hierarchy-item.interface';

export const loadHierarchy = createAction('[catalogue] Load Hierarchy');
export const loadHierarchySuccess = createAction('[catalogue] Load Hierarchy - Success', props<{ hierarchy: HierarchyItem[] }>());
export const loadHierarchyFailure = createAction('[catalogue] Load Hierarchy - Failure');


const all = union({loadHierarchy, loadHierarchySuccess, loadHierarchyFailure });
export type AppActions = typeof all;
