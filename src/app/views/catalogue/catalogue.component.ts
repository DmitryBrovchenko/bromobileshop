import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {selectHierarchy} from '../../@ngrx/app.reducer';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit {
  data;
  isLoading = true;
  constructor(private store: Store) {  }

  ngOnInit() {
    this.store.select(selectHierarchy).subscribe(res => {
      this.isLoading = false;
      this.data = res;
    });
  }

}
