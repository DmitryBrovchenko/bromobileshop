import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {filter, map, switchMap} from 'rxjs/operators';
import {combineLatest, Observable} from 'rxjs';
import {UtilService} from '../../services/util.service';
import {CatalogueNavigator} from '../../widgets/catalogue-navigator/catalogue-navigator';
import { SourceData } from 'src/app/interfaces/source-data.interface';
import { Store } from '@ngrx/store';
import { selectDictionaryItem } from 'src/app/@ngrx/dictionary/dictionary.reducer';
import { selectCatalogueSecondLevel } from 'src/app/@ngrx/catalogue/catalogue.reducer';
import { selectHierarchyItemL2 } from 'src/app/@ngrx/hierarchy/hierarchy.reducer';

@Component({
  selector: 'app-category-two',
  templateUrl: './category-two.component.html',
  styleUrls: ['./category-two.component.scss']
})
export class CategoryTwoComponent extends CatalogueNavigator implements OnInit {

  data$;
  sourceData$: Observable<SourceData>;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private store: Store,
    public utilService: UtilService
  ) {
    super(router);
  }
  ngOnInit(): void {
    this.data$ = this.route.params.pipe(
      /* Get category names for data and hierarchy */
      switchMap(params => {
        this.categoryParams = params;
        return combineLatest([
          this.store.select(selectDictionaryItem, { name: params.categoryOne }),
          this.store.select(selectDictionaryItem, { name: params.categoryTwo }),
        ]).pipe(
          filter(([catOne, catTwo]) => !!(catOne && catTwo)),
          map(([catOne, catTwo]) => ({catOne, catTwo})));
      }),
      /* Get data and hierarchy */
      switchMap(paramsDict => combineLatest([
          this.store.select(selectCatalogueSecondLevel, {level1: paramsDict.catOne.origin, level2: paramsDict.catTwo.origin}),
          this.store.select(selectHierarchyItemL2, {name: paramsDict.catOne.structure, name2: paramsDict.catTwo.structure}),
         ])
          .pipe(map(([goods, hierarchy]) =>
            ({goods, hierarchy,
              categoryOne: paramsDict.catOne.structure, categoryOneSource: paramsDict.catOne.name,
              categoryTwo: paramsDict.catTwo.structure, categoryTwoSource: paramsDict.catTwo.name
            })))
      ));
    /* Combine with query parameters to generate the page information */
    this.sourceData$ = combineLatest([this.data$, this.route.queryParams]).pipe(
      map(([data, queryParams]) => {
        this.pageParams = queryParams;
        return ({data, queryParams}) as SourceData;
      })
    );
  }
}
