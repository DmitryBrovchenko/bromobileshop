import {Component, OnInit} from '@angular/core';
import {combineLatest, Observable} from 'rxjs';
import {DataService} from '../../services/data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFireDatabase} from '@angular/fire/database';
import {map, switchMap} from 'rxjs/operators';
import {PageParamsInterface} from '../../interfaces/page-params.interface';
import {UtilService} from '../../services/util.service';
import {CatalogueNavigator} from '../../widgets/catalogue-navigator/catalogue-navigator';

interface SourceData {
  data: {
    goods: any,
    hierarchy: any,
    categoryOne: string,
    categoryOneSource: string,
    categoryTwo: string,
    categoryTwoSource: string,
    categoryThree: string,
    categoryThreeSource: string,
    categoryFour: string,
    categoryFourSource: string
  };
  queryParams: PageParamsInterface;
}

@Component({
  selector: 'app-category-four',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './category-four.component.html',
  styleUrls: ['./category-four.component.scss']
})
export class CategoryFourComponent extends CatalogueNavigator implements OnInit {

  data$;
  sourceData$: Observable<SourceData>;

  constructor(
    private dataService: DataService,
    public route: ActivatedRoute,
    public router: Router,
    private db: AngularFireDatabase,
    public utilService: UtilService) {
    super(router);
  }

  ngOnInit(): void {
    this.data$ = this.route.params.pipe(
      /* Get category names for data and hierarchy */
      switchMap(params => {
        this.categoryParams = params;
        return combineLatest(
          [this.dataService.getDictionary(params.categoryOne),
            this.dataService.getDictionary(params.categoryTwo),
            this.dataService.getDictionary(params.categoryThree),
            this.dataService.getDictionary(params.categoryFour)])
          .pipe(map(([catOne, catTwo, catThree, catFour]) =>
            ({catOne: catOne[0], catTwo: catTwo[0], catThree: catThree[0], catFour: catFour[0]})));
      }),
      /* Get data and hierarchy */
      switchMap(paramsDict => {
        return combineLatest([
          this.db.list(this.dataService.catalogue, ref => ref.orderByChild('/Category 1').equalTo(paramsDict.catOne.origin)).valueChanges()
            .pipe(map(goods => goods.filter(d => (d['Category 2'] === paramsDict.catTwo.origin)
              && (d['Category 3'] === paramsDict.catThree.origin) && (d['Category 4'] === paramsDict.catFour.origin)))),
          this.dataService.getHierarchy(paramsDict.catOne.structure).pipe(
            map(hierarchy => hierarchy[0].children.filter(child => child.name === paramsDict.catTwo.structure)[0]
              .children.filter(child => child.name === paramsDict.catThree.structure)[0]
              .children.filter(child => child.name === paramsDict.catFour.structure).map(d => ({...d, children: [{name: ''}]}))[0]))
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
