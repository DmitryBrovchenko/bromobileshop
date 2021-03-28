import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { DataService } from "src/app/services/data.service";
import {catchError, map, switchMap} from 'rxjs/operators';
import { CatalogueActions, loadCatalogue, loadCatalogueFailure, loadCatalogueSuccess } from "./catalogue.actions";

@Injectable()
export class CatalogueEffects {
    load$ = createEffect(() => 
        this.actions$.pipe(
            ofType(loadCatalogue),
            switchMap(() => this.dataService.getCatalogue().pipe(
                map(catalogue => loadCatalogueSuccess({catalogue})),
                catchError(() => of(loadCatalogueFailure()))
            ))
        )
    );

    constructor(private actions$: Actions<CatalogueActions>, private dataService: DataService) {}
}