import { CarouselAdminItem } from 'src/app/interfaces/carousel-item';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Injectable } from "@angular/core";
import { Observable, from, of, map } from 'rxjs';
import { CarouselItem } from 'src/app/interfaces/carousel-item';
import { omit } from 'lodash-es';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CarouselAdminService {

  private itemsServer: AngularFireList<CarouselItem> = this.db.list(environment.dbConfig.carouselPath);

  items$: Observable<CarouselAdminItem[]> = this.itemsServer.snapshotChanges()
    .pipe(
      map(snapshot => snapshot.map(item => ({ dbKey: item.payload.key, ...item.payload.val()})))
    );

  constructor(
    private db: AngularFireDatabase,
  ) {}
 
  updateCarouselItem(carousel: Partial<CarouselAdminItem>): Observable<unknown> {
    // Update or create
    const action = carousel.dbKey 
      ? this.itemsServer.update(carousel.dbKey, omit(carousel, 'dbKey'))
      : this.itemsServer.push(carousel as CarouselItem);
    return from(action);
  }

  deleteCarouselItem(dbKey: string): Observable<unknown> {
    if (dbKey) {
      return from(this.itemsServer.remove(dbKey));
    }
    return of(null);
  }
}