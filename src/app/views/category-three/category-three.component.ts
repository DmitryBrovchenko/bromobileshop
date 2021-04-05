import { Component, OnInit} from '@angular/core';
import {combineLatest, Observable} from 'rxjs';
import {DataService} from '../../services/data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFireDatabase} from '@angular/fire/database';
import {filter, map, switchMap} from 'rxjs/operators';
import {UtilService} from '../../services/util.service';
import {CatalogueNavigator} from '../../widgets/catalogue-navigator/catalogue-navigator';
import { SourceData } from 'src/app/interfaces/source-data.interface';
import { Store } from '@ngrx/store';
import { selectDictionaryItem } from 'src/app/@ngrx/dictionary/dictionary.reducer';
import { selectCatalogueThirdLevel } from 'src/app/@ngrx/catalogue/catalogue.reducer';
import { selectHierarchyItemL3 } from 'src/app/@ngrx/hierarchy/hierarchy.reducer';

@Component({
  selector: 'app-category-three',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './category-three.component.html',
  styleUrls: ['./category-three.component.scss']
})
export class CategoryThreeComponent extends CatalogueNavigator implements OnInit {
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
          this.store.select(selectDictionaryItem, { name: params.categoryThree }),
        ]).pipe(
          filter(([catOne, catTwo, catThree]) => !!(catOne && catTwo && catThree)),
          map(([catOne, catTwo, catThree]) => ({catOne, catTwo, catThree})));
      }),
      /* Get data and hierarchy */
      switchMap(paramsDict => combineLatest([
          this.store.select(selectCatalogueThirdLevel, {level1: paramsDict.catOne.origin, level2: paramsDict.catTwo.origin, level3: paramsDict.catThree.origin}),
          this.store.select(selectHierarchyItemL3, {name: paramsDict.catOne.structure, name2: paramsDict.catTwo.structure, name3: paramsDict.catThree.structure}),
        ]).pipe(map(([goods, hierarchy]) =>
            ({goods, hierarchy,
              categoryOne: paramsDict.catOne.structure, categoryOneSource: paramsDict.catOne.name,
              categoryTwo: paramsDict.catTwo.structure, categoryTwoSource: paramsDict.catTwo.name,
              categoryThree: paramsDict.catThree.structure, categoryThreeSource: paramsDict.catThree.name
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
