import { Action, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { ImageItem } from "src/app/interfaces/image-item.interface";
import * as ImagesActions from './images.actions';

export interface ImagesState {
    imagesLoading: boolean;
    images: ImageItem[];
}

const initialState = {
    imagesLoading: false,
    images: null,
};

const reducer = createReducer(initialState,
    on(ImagesActions.loadImages, (state) => ({...state, imagesLoading: true})),
    on(ImagesActions.loadImagesSuccess, (state, { images }) => ({...state, imagesLoading: false, images})),
    on(ImagesActions.loadImagesFailure, (state) => ({...state, images: null, imagesLoading: false})),
);

export function imagesReducer(state: ImagesState | undefined, action: Action) {
    return reducer(state, action);
}

export const selectImagesFeature = createFeatureSelector<ImagesState>('images');
export const selectImages = createSelector(selectImagesFeature, (state) => state.images);
export const selectProductImageUrl = (id: string) => createSelector(
    selectImages,
    (images) => images?.find(image => image.id === id)?.downloadUrl
);