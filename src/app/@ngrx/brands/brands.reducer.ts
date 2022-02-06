import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { BrandItem } from 'src/app/interfaces/brand-item.interface';
import * as BrandsActions from './brands.actions';

export interface BrandsState {
    brandsLoading: boolean;
    brands: BrandItem[];
}

const initialState = {
    brandsLoading: false,
    brands: null,
};

const reducer = createReducer(
    initialState,
    on(BrandsActions.loadBrands, state => ({...state, brandsLoading: true})),
    on(BrandsActions.loadBrandsSuccess, (state, { brands }) => ({...state, brandsLoading: false, brands})),
    on(BrandsActions.loadBrandsFailure, state => ({...state, brandsLoading: false, brands: null}))
);

export function brandsReducer(state: BrandsState | undefined, action: Action) {
    return reducer(state, action);
}

const selectBrandsFeature = createFeatureSelector<BrandsState>('brands');
export const selectBrands = createSelector(selectBrandsFeature,
    state => state.brands);