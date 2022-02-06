import { createAction, props, union } from "@ngrx/store";
import { CarouselItem } from "src/app/interfaces/carousel-item";

export const loadCarousel = createAction('[carousel] Load Carousel');
export const loadCarouselSuccess = createAction('[carousel] Load Carousel - Success', props<{ carousel: CarouselItem[] }>());
export const loadCarouselFailure = createAction('[carousel] Load Carousel - Failure');

const all = union({
    loadCarousel,
    loadCarouselSuccess,
    loadCarouselFailure
});
export type CarouselActions = typeof all;