import { createAction, props, union } from '@ngrx/store';
import { BrandItem } from 'src/app/interfaces/brand-item.interface';

export const loadBrands = createAction('[brands] Load Brands');
export const loadBrandsSuccess = createAction('[brands] Load Brands - Success', props<{ brands: BrandItem[] }>());
export const loadBrandsFailure = createAction('[brands] Load Brands - Failure');

const all = union({
    loadBrands,
    loadBrandsSuccess,
    loadBrandsFailure
});
export type BrandsActions = typeof all;