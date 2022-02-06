import { Action, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { CarouselItem } from "src/app/interfaces/carousel-item";
import * as CarouselActions from './carousel.actions';

export interface CarouselState {
    carouselLoading: boolean;
    carousel: CarouselItem[];
}

const initialState = {
    carouselLoading: false,
    carousel: null,
};

const reducer = createReducer(
    initialState,
    on(CarouselActions.loadCarousel, state => ({...state, carouselLoading: true})),
    on(CarouselActions.loadCarouselSuccess, (state, { carousel }) => ({...state, carouselLoading: false, carousel})),
    on(CarouselActions.loadCarouselFailure, state => ({...state, carouselLoading: false, carousel: null}))
);

export function carouselReducer(state: CarouselState | undefined, action: Action) {
    return reducer(state, action);
}

const selectCarouselFeature = createFeatureSelector<CarouselState>('carousel');
export const selectCarousel = createSelector(selectCarouselFeature,
    state => state.carousel);