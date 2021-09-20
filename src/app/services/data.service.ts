import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/compat/database';
import {Observable} from 'rxjs';
import {PageParamsInterface} from '../interfaces/page-params.interface';
import {DictionaryItem} from '../interfaces/dictionary-item.interface';
import {HierarchyItem} from '../interfaces/hierarchy-item.interface';
import {CatalogueItem} from '../interfaces/catalogue-item.interface';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { map, take } from 'rxjs/operators';
import { ImageItem } from '../interfaces/image-item.interface';
import { parseNumber } from '../utils/parse-number';

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
  defaultRef: string;

  constructor(public db: AngularFireDatabase, private storage: AngularFireStorage) {
    storage.ref('noimage.png').getDownloadURL().pipe(take(1)).subscribe(ref => {
      console.log(ref);
      this.defaultRef = ref;
    });
  }
  
  getCatalogue(): Observable<CatalogueItem[]> {
    return this.db.list<CatalogueItem>(this.catalogue).valueChanges()
      .pipe(map(items => items.map(item => ({
        ...item, 
        Price: parseNumber(item.Price), 
        Quantity: parseNumber(item.Quantity),
      }))));
  }

  getDictionary(name?: string): Observable<DictionaryItem[]> {
    return (name) ? this.db.list<DictionaryItem>(this.dictionary, ref => ref.orderByChild('/name').equalTo(name)).valueChanges()
      : this.db.list<DictionaryItem>(this.dictionary).valueChanges();
  }

  getHierarchy(name?: string): Observable<HierarchyItem[]> {
    return (name) ? this.db.list<HierarchyItem>(this.structure, ref => ref.orderByChild('/name').equalTo(name)).valueChanges()
      : this.db.list<HierarchyItem>(this.structure).valueChanges();
  }

  getImages(): Observable<ImageItem[]> {
    return this.db.list<ImageItem>('Images').valueChanges();
  }

  getImageUrl(path: string): Observable<string> {
    return this.storage.ref(path).getDownloadURL().pipe(take(1));
  }
}

