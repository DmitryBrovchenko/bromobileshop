import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { Injectable } from "@angular/core";
import { CatalogueItem } from 'src/app/interfaces/catalogue-item.interface';
import { environment } from 'src/environments/environment';
import { DictionaryItem } from 'src/app/interfaces/dictionary-item.interface';
import { from, Observable, of } from 'rxjs';
import { debounceTime, map, switchMap, tap } from 'rxjs/operators';
import uniq from 'lodash-es/uniq';
import { transliterate } from 'src/app/utils';
import isNil from 'lodash-es/isNil';

@Injectable({
  providedIn: 'root'
})
export class CatalogueAdminService {

  dictionaryObj: AngularFireObject<DictionaryItem[]> = this.db.object(environment.dbConfig.dictionaryPath);
  structureObj: AngularFireObject<any> = this.db.object(environment.dbConfig.structurePath);

  data: (CatalogueItem & {dbKey: string})[];
  dataServer: AngularFireList<CatalogueItem> = this.db.list(environment.dbConfig.cataloguePath);
  dataObj: AngularFireObject<CatalogueItem[]> = this.db.object(environment.dbConfig.cataloguePath);
  
  constructor(
    private db: AngularFireDatabase,
  ) {
    this.dataServer.snapshotChanges().pipe(
      debounceTime(200),
      map(snapshots => snapshots
        .filter(snapshot => !isNil(snapshot.key))
        .map(snapshot => ({
          dbKey: snapshot.payload.key,
          ...snapshot.payload.val()
        }))
      )
    ).subscribe(res => this.data = res);
  }
  
  createDictionary(): Observable<unknown> {
    return from(this.dictionaryObj.remove()).pipe(
      tap(() => console.log('Old dictionary has been removed!')),
      map(() => this.buildDictionaryFromData(this.data)),
      switchMap(dict => from(this.dictionaryObj.set(dict))),
      tap(() => console.log('Dictionary has been created!'))
    )
  }

  createHierarchy(): Observable<unknown> {
    return from(this.structureObj.remove()).pipe(
      tap(() => console.log('Old hierarchy has been removed!')),
      map(() => this.buildHierarchyFromData(this.data)),
      switchMap(hierarchy => from(this.structureObj.set(hierarchy))),
      tap(() => console.log('Hierarchy has been created!'))
    )
  }

  updateProduct(product: CatalogueItem): Observable<unknown> {
    // Extract the object database key and properties
    const key = this.data.find(item => item.id === product.id)?.dbKey;
    // Update existing product or create new
    return from(key ? this.dataServer.update(key, product) : this.dataServer.push(product));
  }

  deleteProduct(id: string) {
    const key = this.data.find(item => item.id === id)?.dbKey;
    return key ? from(this.dataServer.remove(key)) : of(null);
  }

  updateProductList(products: CatalogueItem[]): Observable<unknown> {
    return from(this.dataObj.remove()).pipe(
      tap(() => console.log('Old data removed')),
      switchMap(() => from(this.dataObj.set(products))),
      tap(() => console.log('New data set')),
      debounceTime(1000), // give some time to refresh service's data
      switchMap(() => this.createHierarchy()),
      switchMap(() => this.createDictionary())
    )
  }

  private buildDictionaryFromData(data: CatalogueItem[], level = 1): DictionaryItem[] {
    const result: DictionaryItem[] = [];
    const categories = uniq(data.map(data => data[`Category ${level}`]).filter(Boolean));
    categories.forEach((c) => {
      result.push(
        {
          name: transliterate(level === 1 ? c.substring(4) : c),
          origin: c,
          structure: level === 1 ? c.substring(4) : c
        },
        ...this.buildDictionaryFromData(data.filter(item => item[`Category ${level}`] === c), level + 1)
      )
    });
    return result;
  }

  private buildHierarchyFromData(data: CatalogueItem[], level = 1): any[] {
    return uniq(data.map(data => data[`Category ${level}`]).filter(Boolean))
      .map(c => ({
        name: level === 1 ? c.substring(4) : c,
        children: this.buildHierarchyFromData(data.filter(data => data[`Category ${level}`] === c), level + 1)
      }));
  }

}