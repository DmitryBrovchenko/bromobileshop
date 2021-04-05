import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {PageParamsInterface} from '../interfaces/page-params.interface';
import {DictionaryItem} from '../interfaces/dictionary-item.interface';
import {HierarchyItem} from '../interfaces/hierarchy-item.interface';
import {CatalogueItem} from '../interfaces/catalogue-item.interface';
import { AngularFireStorage } from '@angular/fire/storage';
import { shareReplay } from 'rxjs/operators';

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
  defaultRef;

  constructor(public db: AngularFireDatabase, private storage: AngularFireStorage) {
    this.defaultRef = storage.ref('noimage.png').getDownloadURL().pipe(shareReplay(1));
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

