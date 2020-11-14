import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {PageParamsInterface} from '../interfaces/page-params.interface';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  structure = '/Structure';
  dictionary = '/Dictionary';
  catalogue = '/Catalogue';

  defaultParams: PageParamsInterface = {
    sort: 'Name',
    page: 1,
    show: 10,
    type: 'Tile'
  };
  siderCollapsed = true;

  constructor(public db: AngularFireDatabase) {
  }

  getHierarchy(name?: string): Observable<any> {
    return (name) ? this.db.list(this.structure, ref => ref.orderByChild('/name').equalTo(name)).valueChanges()
      : this.db.list(this.structure).valueChanges();
  }

  getDictionary(name: string): Observable<any> {
    return this.db.list(this.dictionary, ref => ref.orderByChild('/name').equalTo(name)).valueChanges();
  }
}

