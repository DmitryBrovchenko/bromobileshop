import { Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {combineLatest, Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {AngularFireDatabase} from '@angular/fire/database';
import {PageParamsInterface} from '../../interfaces/page-params.interface';
import {UtilService} from '../../services/util.service';

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
export class CategoryOneComponent implements OnInit {
  data$;
  categoryOneSource: string;
  sourceData$: Observable<SourceData>;

  constructor(
    private dataService: DataService,
    public route: ActivatedRoute,
    public router: Router,
    private db: AngularFireDatabase,
    public utilService: UtilService
  ) {}
  ngOnInit(): void {
    this.data$ = this.route.params.pipe(
      switchMap(params => this.dataService.getDictionary(params.categoryOne)
        .pipe(map(dict => ({dict, categoryOneSource: params.categoryOne})))),
      switchMap(paramsDict => {
        return combineLatest([
          this.db.list(this.dataService.catalogue, ref => ref.orderByChild('/Category 1')
            .equalTo(paramsDict.dict[0].origin)).valueChanges(),
          this.dataService.getHierarchy(paramsDict.dict[0].structure)])
          .pipe(map(([goods, hierarchy]) =>
            ({goods, hierarchy: hierarchy[0], categoryOne: paramsDict.dict[0].structure,
              categoryOneSource: paramsDict.categoryOneSource})));
      }));
    this.sourceData$ = combineLatest([this.data$, this.route.queryParams]).pipe(
      map(([data, queryParams]) => ({data, queryParams} as SourceData))
    );
  }

  applyParams(categoryOne: string, sort: string, page: number, show: number, type: string) {
    this.router.navigate(['/catalogue', categoryOne],
      { queryParams: {page, sort, show, type} });
  }
}
