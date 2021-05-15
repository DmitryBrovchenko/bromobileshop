import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectSearchResult } from 'src/app/@ngrx/catalogue/catalogue.reducer';
import { CatalogueNavigator } from 'src/app/widgets/catalogue-navigator/catalogue-navigator';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent extends CatalogueNavigator implements OnInit {
  searchResult$;
  search = '';
  criteria = '';
  root = '/search';

  constructor(
    private store: Store,
     public router: Router,
     private activeRoute: ActivatedRoute
     ) {
       super(router);
  }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(
      (params) => {
        this.pageParams = params;
        this.search = params.criteria;
        this.criteria = params.criteria;
        this.searchResult$ = this.store.select(selectSearchResult, {criteria: params.criteria});
      }
    );
  }

  newSearch(criteria: string) {
    if (criteria) {
      this.router.navigate(['/search'], {queryParams: {criteria}});
    }
  }
}
