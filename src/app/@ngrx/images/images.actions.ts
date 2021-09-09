import { createAction, props, union } from "@ngrx/store";
import { ImageItem } from "src/app/interfaces/image-item.interface";

export const loadImages = createAction('[images] Load Images');
export const loadImagesSuccess = createAction('[images] Load Images - Success', props<{ images: ImageItem[] }>());
export const loadImagesFailure = createAction('[images] Load Images - Failure');

const all = union({loadImages, loadImagesSuccess, loadImagesFailure});
export type ImagesActions = typeof all;