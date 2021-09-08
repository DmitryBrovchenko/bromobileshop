import {Component, OnInit} from '@angular/core';
import {combineLatest, Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {filter, map, switchMap} from 'rxjs/operators';
import {UtilService} from '../../services/util.service';
import {CatalogueNavigator} from '../../widgets/catalogue-navigator/catalogue-navigator';
import { SourceData } from 'src/app/interfaces/source-data.interface';
import { Store } from '@ngrx/store';
import { selectDictionaryItem } from 'src/app/@ngrx/dictionary/dictionary.reducer';
import { selectCatalogueFourthLevel } from 'src/app/@ngrx/catalogue/catalogue.reducer';
import { selectHierarchyItemL4 } from 'src/app/@ngrx/hierarchy/hierarchy.reducer';

@Component({
  selector: 'app-category-four',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './category-four.component.html',
  styleUrls: ['./category-four.component.scss']
})
export class CategoryFourComponent extends CatalogueNavigator implements OnInit {

  data$: Observable<any>;
  sourceData$: Observable<SourceData>;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private store: Store,
    public utilService: UtilService) {
    super(router);
  }

  ngOnInit(): void {
    this.data$ = this.route.params.pipe(
      /* Get category names for data and hierarchy */
      switchMap(params => {
        this.categoryParams = params;
        return combineLatest(
          [
            this.store.select(selectDictionaryItem(params.categoryOne)),
            this.store.select(selectDictionaryItem(params.categoryTwo)),
            this.store.select(selectDictionaryItem(params.categoryThree)),
            this.store.select(selectDictionaryItem(params.categoryFour)),
          ])
          .pipe(
            filter(([catOne, catTwo, catThree, catFour]) => !!(catOne && catTwo && catThree && catFour)),
            map(([catOne, catTwo, catThree, catFour]) => ({catOne, catTwo, catThree, catFour})));
      }),
      /* Get data and hierarchy */
      switchMap(paramsDict => {
        return combineLatest([
          this.store.select(selectCatalogueFourthLevel(paramsDict.catOne.origin, paramsDict.catTwo.origin, paramsDict.catThree.origin, paramsDict.catFour.origin)),
          this.store.select(selectHierarchyItemL4(paramsDict.catOne.structure, paramsDict.catTwo.structure, paramsDict.catThree.structure, paramsDict.catFour.structure)),
        ]).pipe(map(([goods, hierarchy]) =>
          ({
            goods, hierarchy,
            categoryOne: paramsDict.catOne.structure, categoryOneSource: paramsDict.catOne.name,
            categoryTwo: paramsDict.catTwo.structure, categoryTwoSource: paramsDict.catTwo.name,
            categoryThree: paramsDict.catThree.structure, categoryThreeSource: paramsDict.catThree.name,
            categoryFour: paramsDict.catFour.structure, categoryFourSource: paramsDict.catFour.name
          })));
      }));
    /* Combine with query parameters to generate the page information */
    this.sourceData$ = combineLatest([this.data$, this.route.queryParams]).pipe(
      map(([data, queryParams]) => {
        this.pageParams = queryParams;
        return ({data, queryParams}) as SourceData;
      })
    );
  }
}
