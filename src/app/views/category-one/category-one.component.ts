import { Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {combineLatest, Observable} from 'rxjs';
import {filter, map, switchMap} from 'rxjs/operators';
import {PageParamsInterface} from '../../interfaces/page-params.interface';
import {UtilService} from '../../services/util.service';
import {CatalogueNavigator} from '../../widgets/catalogue-navigator/catalogue-navigator';
import { Store } from '@ngrx/store';
import { selectDictionaryItem } from 'src/app/@ngrx/dictionary/dictionary.reducer';
import { selectCatalogueFirstLevel } from 'src/app/@ngrx/catalogue/catalogue.reducer';
import { selectHierarchyItem } from 'src/app/@ngrx/hierarchy/hierarchy.reducer';

interface SourceData {
  data: {
    goods: any,
    hierarchy: any,
    categoryOne: string,
    categoryOneSource: string
  };
  queryParams: PageParamsInterface;
}

@Component({
  selector: 'app-category-one',
  templateUrl: './category-one.component.html',
  styleUrls: ['./category-one.component.scss']
})
export class CategoryOneComponent extends CatalogueNavigator implements OnInit {
  data$;
  categoryOneSource: string;
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
      switchMap(params => {
        this.categoryParams = params;
        return this.store.select(selectDictionaryItem, {name: params.categoryOne});
      }),
      filter((item) => !!item),
      switchMap(paramsDict => combineLatest([
          this.store.select(selectCatalogueFirstLevel, {level1: paramsDict.origin}),
          this.store.select(selectHierarchyItem, {name: paramsDict.structure})
        ]).pipe(map(([goods, hierarchy]) => ({goods, hierarchy: hierarchy, categoryOne: paramsDict.structure,
            categoryOneSource: paramsDict.name})
            ))
    ));
    this.sourceData$ = combineLatest([this.data$, this.route.queryParams]).pipe(
      map(([data, queryParams]) => {
        // Save options applied to the page
        this.pageParams = queryParams;
        console.log(data, queryParams);
        return {data, queryParams} as SourceData;
      })
    );
  }
}
