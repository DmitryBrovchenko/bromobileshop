import { Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {combineLatest, Observable} from 'rxjs';
import {filter, map, switchMap} from 'rxjs/operators';
import {CatalogueNavigator} from '../../widgets/catalogue-navigator/catalogue-navigator';
import { Store } from '@ngrx/store';
import { selectDictionaryItem } from 'src/app/@ngrx/dictionary/dictionary.reducer';
import { selectCatalogueFirstLevel } from 'src/app/@ngrx/catalogue/catalogue.reducer';
import { selectHierarchyItem } from 'src/app/@ngrx/hierarchy/hierarchy.reducer';
import { SourceData } from 'src/app/interfaces/source-data.interface';

@Component({
  selector: 'app-category-one',
  templateUrl: './category-one.component.html',
  styleUrls: ['./category-one.component.scss']
})
export class CategoryOneComponent extends CatalogueNavigator implements OnInit {
  data$: Observable<any>;
  categoryOneSource: string;
  sourceData$: Observable<SourceData>;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private store: Store
  ) {
    super(router);
  }
  ngOnInit(): void {
    this.data$ = this.route.params.pipe(
      switchMap(params => {
        this.categoryParams = params;
        return this.store.select(selectDictionaryItem(params.categoryOne));
      }),
      filter(item => !!item),
      switchMap(paramsDict => combineLatest([
          this.store.select(selectCatalogueFirstLevel(paramsDict.origin)),
          this.store.select(selectHierarchyItem(paramsDict.structure))
        ]).pipe(map(([goods, hierarchy]) => ({goods, hierarchy: hierarchy, categoryOne: paramsDict.structure,
            categoryOneSource: paramsDict.name})
            ))
    ));
    this.sourceData$ = combineLatest([this.data$, this.route.queryParams]).pipe(
      map(([data, queryParams]) => {
        // Save options applied to the page
        this.pageParams = queryParams;
        return {data, queryParams} as SourceData;
      })
    );
  }
}
