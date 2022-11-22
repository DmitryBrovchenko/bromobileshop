import { CarouselItem } from 'src/app/interfaces/carousel-item';
import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { firstValueFrom, from, Observable, of } from 'rxjs';
import { debounceTime, map, take, tap } from 'rxjs/operators';
import { CatalogueItem } from '../interfaces/catalogue-item.interface';
import { DictionaryItem } from '../interfaces/dictionary-item.interface';
import { ImageItem } from '../interfaces/image-item.interface';
import {UtilService} from './util.service';

@Injectable({
  providedIn: 'root'
})
// Service for Admin operations with Firebase
export class FirebaseAdminService {
  
  dictionaryObj: AngularFireObject<DictionaryItem[]>;
  structure: AngularFireList<any>;

  data: (CatalogueItem & {dbKey: string})[];
  dataServer: AngularFireList<CatalogueItem>;
  
  images: (ImageItem & {key: string})[];
  imageObj:AngularFireObject<ImageItem[]>;
  imageServer: AngularFireList<ImageItem>;

  constructor(
    private db: AngularFireDatabase, 
    private storage: AngularFireStorage,
    private util: UtilService
    ) {
    this.dictionaryObj = db.object('Dictionary');
    this.structure = db.list('Structure');
    this.dataServer = db.list('Catalogue');
    this.dataServer.snapshotChanges().pipe(
      debounceTime(200),
      map(snapshots => snapshots
        .filter(snapshot => snapshot.key !== null && snapshot.key !== undefined)
        .map(snapshot => ({
          dbKey: snapshot.payload.key,
          ...snapshot.payload.val()
        })
      ))
    )
    .subscribe(res => this.data = res);

    this.imageObj = db.object('Images');
    this.imageServer = db.list('Images');
    this.imageServer.snapshotChanges().pipe(
      map(snapshot => snapshot.map(item => ({key: item.payload.key, ...item.payload.val()})))
    ).subscribe(res => this.images = res);
  }

  async createDictionary() {
    const distinct = (value, index, self) => (self.indexOf(value) === index);
    const category1 = this.data.map(d => d['Category 1']).filter(distinct);
    await this.dictionaryObj.remove();
    console.log('Old dictionary has been removed!');
    const dictionaryNew: DictionaryItem[] = [];
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
                dictionaryNew.push({
                  name: this.util.transliterate(d),
                  origin: d,
                  structure: d
                });
              }
            });
          if (c3 !== '') {
            dictionaryNew.push({
              name: this.util.transliterate(c3),
              origin: c3,
              structure: c3
            });
          }
        });
        if (c2 !== '') {
          dictionaryNew.push({
            name: this.util.transliterate(c2),
            origin: c2,
            structure: c2
          });
        }
      });
      dictionaryNew.push({
        name: this.util.transliterate(c1.substring(4)),
        origin: c1,
        structure: c1.substring(4)
      });
    });
    await this.dictionaryObj.set(dictionaryNew);
    console.log('Dictionary has been created!');
    return;
  }

  async createHierarchy() {
    const distinct = (value, index, self) => (self.indexOf(value) === index);
    const category1 = this.data.map(d => d['Category 1']).sort((a, b) => a.localeCompare(b)).filter(distinct);
    await this.structure.remove();
    console.log('Old hierarchy has been removed!');
    category1.forEach(async c1 => {
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
      await this.structure.push(object1);
    });
    console.log('Hierarchy has been created!');
  }

  async uploadImage(file: File, id: string, path: string): Promise<ImageItem> {
    const filePath = `${path}/${id}`;
    const imageItem: ImageItem = {
      id,
      path: filePath,
      downloadUrl: await this.uploadImageFile(file, filePath),
    };
    const existingKey = this.images.find(item => item.id === id)?.key;
    // Update or create new dictionary reference, return image item
    const action = existingKey 
      ? this.imageServer.update(existingKey, imageItem)
      : this.imageServer.push(imageItem);

    return action.then(() => imageItem);
  }

  async uploadImageFile(file: File, path: string): Promise<string> {
    // Upload image (overrides exisitng file)
    const ref = this.storage.ref(path);
    await ref.put(file);
    // Get the reference
    return firstValueFrom(ref.getDownloadURL());
  }

  async updateProduct(product: CatalogueItem): Promise<void> {
    // Extract the object database key and properties
    const key = this.data.find(item => item.id === product.id)?.dbKey;
    // Update existing product or create new
    if (key) {
      this.dataServer.update(key, product);
    } else {
      this.dataServer.push(product);
    }
  }

  deleteProduct(product: CatalogueItem) {
    const key = this.data.find(item => item.id === product.id)?.dbKey;
    if (key) {
      this.dataServer.remove(key);
    }
  }

  async updateImagesList(images: ImageItem[]) {
    await this.imageObj.remove();
    await this.imageObj.set(images);
  }

  async updateProductList(products: CatalogueItem[]) {
    await this.dataServer.remove();
    console.log('Old data removed');
    products.forEach(async (product) => {
      await this.dataServer.push(product);
    });
    console.log('New data set');
    // Give some time to finish the processing
    return new Promise((resolve) => this.dataServer.valueChanges().pipe(
      debounceTime(1000),
      take(1),
    ).subscribe(async () => {
      await this.createHierarchy();
      await this.createDictionary();
      resolve(true);
    }));
  }
}
