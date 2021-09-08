import {Pipe, PipeTransform} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/compat/storage';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {AngularFireDatabase} from '@angular/fire/compat/database';
import { DataService } from 'src/app/services/data.service';
import { ImageItem } from 'src/app/interfaces/image-item.interface';

@Pipe({
  name: 'GetImage'
})
export class GetImagePipe implements PipeTransform  {
  constructor(
    private storage: AngularFireStorage,
    private db: AngularFireDatabase,
    private dataService: DataService,
    ) {
  }
  transform(id: string): Observable<any> {
    return this.db.list('/Images', ref => ref.orderByChild('id').equalTo(id)).valueChanges().pipe(
      switchMap((res: ImageItem[]) => (res.length > 0) ? this.storage.ref(res[0].path).getDownloadURL()
      : this.dataService.defaultRef)
    );
  }
}

