import {ActivatedRoute, Router} from '@angular/router';
import {PageParamsInterface} from '../../interfaces/page-params.interface';
import {CategoryParamsInterface} from '../../interfaces/category-params.interface';

export class CatalogueNavigator {
  root: string = '/catalogue';
  categoryParams: CategoryParamsInterface = {};
  pageParams: PageParamsInterface;

  constructor(
    public router: Router
  ) {}

  onPageChanged(page: number) {
    this.router.navigate([this.root, ...Object.values(this.categoryParams)], 
    {
      queryParams: {...(this.pageParams ?? {}), page}
    });
  }

  onSizeChanged(show: number) {
    this.router.navigate([this.root, ...Object.values(this.categoryParams)],
      {queryParams: {...(this.pageParams ?? {}), show}}
    );
  }

  onSortChanged(sort: string) {
    this.router.navigate([this.root, ...Object.values(this.categoryParams)],
      {queryParams: {...(this.pageParams ?? {}), sort}}
    );
  }

  onTypeChanged(type: string) {
    this.router.navigate([this.root, ...Object.values(this.categoryParams)],
      {queryParams: {...(this.pageParams ?? {}), type}}
    );
  }
}
