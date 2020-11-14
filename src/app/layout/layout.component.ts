import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/data.service';
import {Store} from '@ngrx/store';
import {loadHierarchy} from '../@ngrx/app.actions';
import {selectHierarchy} from '../@ngrx/app.reducer';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  hierarchy$;
  constructor(private dataService: DataService, private store: Store) {
    store.dispatch(loadHierarchy());
  }
  ngOnInit(): void {
    this.hierarchy$ = this.store.select(selectHierarchy);
  }

}
