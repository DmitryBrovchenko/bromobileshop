import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { DataService } from "src/app/services/data.service";
import {catchError, map, switchMap} from 'rxjs/operators';
import { ImagesActions, loadImages, loadImagesFailure, loadImagesSuccess } from "./images.actions";

@Injectable()
export class ImagesEffects {
    load$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadImages),
            switchMap(() => this.dataService.getImages().pipe(
                map(images => loadImagesSuccess({ images })),
                catchError(() => of(loadImagesFailure()))
            ))
        )
    );

    constructor(private actions$: Actions<ImagesActions>, private dataService: DataService) {}
}