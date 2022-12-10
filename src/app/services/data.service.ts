import { environment } from './../../environments/environment';
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
import { BrandItem } from '../interfaces/brand-item.interface';
import { CarouselItem } from '../interfaces/carousel-item';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  structure = environment.dbConfig.structurePath;
  dictionary = environment.dbConfig.dictionaryPath;
  catalogue = environment.dbConfig.cataloguePath;
  brands = environment.dbConfig.brandPath;
  carousel = environment.dbConfig.carouselPath;
  images = environment.dbConfig.imagesPath;

  defaultParams: PageParamsInterface = {
    sort: 'Name',
    page: 1,
    show: 10,
    type: 'Tile'
  };

  defaultRef: string;

  constructor(public db: AngularFireDatabase, private storage: AngularFireStorage) {
    storage.ref('noimage.png').getDownloadURL().pipe(take(1)).subscribe(ref => {
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
    return this.db.list<ImageItem>(this.images).valueChanges();
  }

  getBrands(): Observable<BrandItem[]> {
    return this.db.list<BrandItem>(this.brands).valueChanges();
  }

  getCarousel(): Observable<CarouselItem[]> {
    return this.db.list<CarouselItem>(this.carousel).valueChanges();
  }

  getImageUrl(path: string): Observable<string> {
    return this.storage.ref(path).getDownloadURL().pipe(take(1));
  }
}

