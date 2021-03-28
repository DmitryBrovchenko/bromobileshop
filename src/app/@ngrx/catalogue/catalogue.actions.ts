import {createAction, props, union} from '@ngrx/store';
import {CatalogueItem} from '../../interfaces/catalogue-item.interface';

export const loadCatalogue = createAction('[catalogue] Load Catalogue');
export const loadCatalogueSuccess = createAction('[catalogue] Load Catalogue - Success', props<{ catalogue: CatalogueItem[] }>());
export const loadCatalogueFailure = createAction('[catalogue] Load Catalogue - Failure');

const all = union({loadCatalogue, loadCatalogueSuccess, loadCatalogueFailure });
export type CatalogueActions = typeof all;
