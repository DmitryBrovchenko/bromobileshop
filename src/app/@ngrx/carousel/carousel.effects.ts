import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { DataService } from "src/app/services/data.service";
import { CarouselActions, loadCarousel, loadCarouselFailure, loadCarouselSuccess } from "./carousel.actions";

@Injectable()
export class CarouselEffects {
    load$ = createEffect(() => 
        this.actions$.pipe(
            ofType(loadCarousel),
            switchMap(() => this.service.getCarousel().pipe(
                map(carousel => loadCarouselSuccess({ carousel })),
                catchError(() => of(loadCarouselFailure()))
            ))
        ));

    constructor(private actions$: Actions<CarouselActions>, private service: DataService) {}
}