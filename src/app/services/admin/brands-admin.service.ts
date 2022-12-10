import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/compat/database";
import omit from "lodash-es/omit";
import { from, Observable, of } from "rxjs";
import { map } from 'rxjs/operators';
import { BrandAdminItem, BrandItem } from "src/app/interfaces/brand-item.interface";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BrandsAdminService {

  private itemsServer: AngularFireList<BrandItem> = this.db.list(environment.dbConfig.brandPath);

  items$: Observable<BrandAdminItem[]> = this.itemsServer.snapshotChanges().pipe(
    map((snapshot) => snapshot.map(item => ({ dbKey: item.payload.key, ...item.payload.val() })))
  );

  constructor(
    private db: AngularFireDatabase
  ) {}

  updateBrandItem(brand: Partial<BrandAdminItem>): Observable<unknown> {
    const action = brand.dbKey
      ? this.itemsServer.update(brand.dbKey, omit(brand, 'dbKey'))
      : this.itemsServer.push(brand as BrandItem);
    return from(action);
  }

  deleteBrandItem(dbKey: string): Observable<unknown> {
    return dbKey ? from(this.itemsServer.remove(dbKey)) : of(null);
  }

}