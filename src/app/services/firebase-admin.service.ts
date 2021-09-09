import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { firstValueFrom } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CatalogueItem } from '../interfaces/catalogue-item.interface';
import { DictionaryItem } from '../interfaces/dictionary-item.interface';
import { ImageItem } from '../interfaces/image-item.interface';
import {UtilService} from './util.service';

@Injectable({
  providedIn: 'root'
})
// Service for Admin operations with Firebase
export class FirebaseAdminService {
  dictionary: AngularFireList<DictionaryItem>;
  structure: AngularFireList<any>;
  data: CatalogueItem[];
  dataServer: AngularFireList<CatalogueItem>;
  images: (ImageItem & {key: string})[];
  imageServer: AngularFireList<ImageItem>;

  constructor(
    private db: AngularFireDatabase, 
    private storage: AngularFireStorage,
    private util: UtilService
    ) {
    this.dictionary = db.list('Dictionary');
    this.structure = db.list('Structure');
    this.dataServer = db.list('Catalogue');
    this.dataServer.valueChanges().subscribe(res => this.data = res);
    this.imageServer = db.list('Images');
    this.imageServer.snapshotChanges().pipe(
      map(snapshot => snapshot.map(item => ({key: item.payload.key, ...item.payload.val()})))
    ).subscribe(res => this.images = res);
  }

  createDictionary() {
    const distinct = (value, index, self) => (self.indexOf(value) === index);
    const category1 = this.data.map(d => d['Category 1']).filter(distinct);
    this.dictionary.remove();
    category1.forEach(c1 => {
      const category2 = this.data
        .filter(d => d['Category 1'] === c1)
        .map(d => d['Category 2'])
        .filter(distinct);
      category2.forEach(c2 => {
        const category3 = this.data
          .filter(d => (d['Category 1'] === c1) && (d['Category 2'] === c2))
          .map(d => d['Category 3'])
          .filter(distinct);
        category3.forEach(c3 => {
          this.data
            .filter(d => (d['Category 1'] === c1) && (d['Category 2'] === c2) && (d['Category 3'] === c3))
            .map(d => d['Category 4'])
            .filter(distinct)
            .forEach(d => {
              if (d !== '') {
                this.dictionary.push({
                  name: this.util.transliterate(d),
                  origin: d,
                  structure: d
                });
              }
            });
          if (c3 !== '') {
            this.dictionary.push({
              name: this.util.transliterate(c3),
              origin: c3,
              structure: c3
            });
          }
        });
        if (c2 !== '') {
          this.dictionary.push({
            name: this.util.transliterate(c2),
            origin: c2,
            structure: c2
          });
        }
      });
      this.dictionary.push({
        name: this.util.transliterate(c1.substring(4)),
        origin: c1,
        structure: c1.substring(4)
      });
    });
    console.log('Dictionary has been created!');
    return;
  }

  createHierarchy() {
    const distinct = (value, index, self) => (self.indexOf(value) === index);
    const category1 = this.data.map(d => d['Category 1']).filter(distinct);
    this.structure.remove();
    category1.forEach(c1 => {
      const object1 = {name: c1.substring(4), children: []};
      const category2 = this.data
        .filter(d => d['Category 1'] === c1)
        .map(d => d['Category 2'])
        .filter(distinct);
      category2.forEach(c2 => {
        const object2 = {name: c2, children: []};
        const category3 = this.data
          .filter(d => (d['Category 1'] === c1) && (d['Category 2'] === c2))
          .map(d => d['Category 3'])
          .filter(distinct);
        category3.forEach(c3 => {
          const object3 = {name: c3, children: []};
          object3.children = this.data
            .filter(d => (d['Category 1'] === c1) && (d['Category 2'] === c2) && (d['Category 3'] === c3))
            .map(d => d['Category 4'])
            .filter(distinct)
            .map(d => ({name: d}));
          object2.children.push(object3);
        });
        object1.children.push(object2);
      });
      this.structure.push(object1);
    });
    console.log('Hierarchy has been created!');
  }

  async uploadImage(file: File, id: string): Promise<any> {
    const imageItem: ImageItem = {
      id,
      path: id,
    };
    const existingKey = this.images.find(item => item.id === id)?.key;
    // Upload image
    await this.storage.upload(imageItem.path, file);
    // Save the reference
    imageItem.downloadUrl = await firstValueFrom(this.storage.ref(imageItem.path).getDownloadURL());
    // Update or create new dictionary reference
    if (existingKey) {
      this.imageServer.update(existingKey, imageItem);
    } else {
      this.imageServer.push(imageItem);
    }
  }

  createProduct(product: CatalogueItem) {

  }

  updateProduct(product: CatalogueItem): Promise<void> {
    // Extract the object database key and properties
    const key = product.dbKey;
    const productUpdate = {...product};
    delete productUpdate.dbKey;
    // Update existing product
    return this.dataServer.update(key, productUpdate);
  }

  deleteProduct(product: CatalogueItem) {

  }
}
