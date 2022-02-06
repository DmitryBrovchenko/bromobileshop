import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, map, catchError } from "rxjs/operators";
import { DataService } from "src/app/services/data.service";
import { BrandsActions, loadBrands, loadBrandsFailure, loadBrandsSuccess } from "./brands.actions";

@Injectable()
export class BrandsEffects {
    load$ = createEffect(() => 
        this.actions$.pipe(
            ofType(loadBrands),
            switchMap(() => this.service.getBrands().pipe(
                map(brands => loadBrandsSuccess({ brands })),
                catchError(() => of(loadBrandsFailure()))
            ))
        )
    );

    constructor(private actions$: Actions<BrandsActions>, private service: DataService) {}
}