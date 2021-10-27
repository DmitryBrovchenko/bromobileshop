import { Component, OnInit, ViewChild } from '@angular/core';
import {DataService} from '../services/data.service';
import {Store} from '@ngrx/store';
import {loadHierarchy} from '../@ngrx/hierarchy/hierarchy.actions';
import {selectHierarchy} from '../@ngrx/hierarchy/hierarchy.reducer';
import { loadDictionary } from '../@ngrx/dictionary/dictionary.actions';
import { loadCatalogue } from '../@ngrx/catalogue/catalogue.actions';
import { loadImages } from '../@ngrx/images/images.actions';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  @ViewChild('sider', {static: true})
  siderComponent;
  hierarchy$;
  isCollapsed = false;
  constructor(private store: Store) {
    store.dispatch(loadHierarchy());
    store.dispatch(loadDictionary());
    store.dispatch(loadCatalogue());
    store.dispatch(loadImages());
    console.log('Dispatched');
  }
  ngOnInit(): void {
    this.hierarchy$ = this.store.select(selectHierarchy);
  }
  collapseSider() {
    if (this.siderComponent.matchBreakPoint) {
      this.isCollapsed = true;
    }
  }

}
