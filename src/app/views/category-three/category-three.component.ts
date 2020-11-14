import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {combineLatest, Observable} from 'rxjs';
import {DataService} from '../../services/data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFireDatabase} from '@angular/fire/database';
import {map, switchMap} from 'rxjs/operators';
import {PageParamsInterface} from '../../interfaces/page-params.interface';
import {UtilService} from '../../services/util.service';

interface SourceData {
  data: {
    goods: any,
    hierarchy: any,
    categoryOne: string,
    categoryOneSource: string,
    categoryTwo: string,
    categoryTwoSource: string,
    categoryThree: string,
    categoryThreeSource: string
  };
  queryParams: PageParamsInterface;
}

@Component({
  selector: 'app-category-three',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './category-three.component.html',
  styleUrls: ['./category-three.component.scss']
})
export class CategoryThreeComponent implements OnInit {
  data$;
  sourceData$: Observable<SourceData>;
  categoryOneSource: string;
  constructor(
    private dataService: DataService,
    public route: ActivatedRoute,
    public router: Router,
    private db: AngularFireDatabase,
    public utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.data$ = this.route.params.pipe(
      /* Get category names for data and hierarchy */
      switchMap(params => combineLatest(
        [this.dataService.getDictionary(params.categoryOne),
          this.dataService.getDictionary(params.categoryTwo),
          this.dataService.getDictionary(params.categoryThree)])
        .pipe(map(([catOne, catTwo, catThree]) => ({catOne: catOne[0], catTwo: catTwo[0], catThree: catThree[0]})))),
      /* Get data and hierarchy */
      switchMap(paramsDict => combineLatest([
          this.db.list(this.dataService.catalogue, ref => ref.orderByChild('/Category 1').equalTo(paramsDict.catOne.origin)).valueChanges()
            .pipe(map(goods =>
              goods.filter(d => (d['Category 2'] === paramsDict.catTwo.origin) && (d['Category 3'] === paramsDict.catThree.origin)))),
          this.dataService.getHierarchy(paramsDict.catOne.structure).pipe(
            map(hierarchy => hierarchy[0].children.filter(child => child.name === paramsDict.catTwo.structure)[0]
              .children.filter(child => child.name === paramsDict.catThree.structure)[0]))
        ]).pipe(map(([goods, hierarchy]) =>
            ({goods, hierarchy,
              categoryOne: paramsDict.catOne.structure, categoryOneSource: paramsDict.catOne.name,
              categoryTwo: paramsDict.catTwo.structure, categoryTwoSource: paramsDict.catTwo.name,
              categoryThree: paramsDict.catThree.structure, categoryThreeSource: paramsDict.catThree.name
            })))
      ));
    /* Combine with query parameters to generate the page information */
    this.sourceData$ = combineLatest([this.data$, this.route.queryParams]).pipe(
      map(([data, queryParams]) => ({data, queryParams}) as SourceData)
    );
  }
  applyParams(categoryOne: string, categoryTwo: string, categoryThree: string,
              sort: string, page: number, show: number, type: string) {
    this.router.navigate(['/catalogue', categoryOne, categoryTwo, categoryThree],
      {queryParams: {sort, page, show, type}});
  }
}
