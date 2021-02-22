import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {PageParamsInterface} from '../interfaces/page-params.interface';
import {DictionaryItem} from '../interfaces/dictionary-item.interface';
import {HierarchyItem} from '../interfaces/hierarchy-item.interface';
import {CatalogueItem} from '../interfaces/catalogue-item.interface';

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
  getCatalogue(): Observable<CatalogueItem[]> {
    return this.db.list<CatalogueItem>(this.catalogue).valueChanges();
  }

  getDictionary(name?: string): Observable<DictionaryItem[]> {
    return (name) ? this.db.list<DictionaryItem>(this.dictionary, ref => ref.orderByChild('/name').equalTo(name)).valueChanges()
      : this.db.list<DictionaryItem>(this.dictionary).valueChanges();
  }

  getHierarchy(name?: string): Observable<HierarchyItem[]> {
    return (name) ? this.db.list<HierarchyItem>(this.structure, ref => ref.orderByChild('/name').equalTo(name)).valueChanges()
      : this.db.list<HierarchyItem>(this.structure).valueChanges();
  }
}

