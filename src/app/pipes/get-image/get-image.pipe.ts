import {Pipe, PipeTransform} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {AngularFireDatabase} from '@angular/fire/database';

interface ImageDict {
  id: string;
  path: string;
}

@Pipe({
  name: 'GetImage'
})
export class GetImagePipe implements PipeTransform  {
  defaultRef;
  constructor(private storage: AngularFireStorage, private db: AngularFireDatabase) {
    this.defaultRef = storage.ref('noimage.png').getDownloadURL();
  }
  transform(id: string): Observable<any> {
    return this.db.list('/Images', ref => ref.orderByChild('id').equalTo(id)).valueChanges().pipe(
      switchMap((res: ImageDict[]) => (res.length > 0) ? this.storage.ref(res[0].path).getDownloadURL()
      : this.defaultRef)
    );
  }
}

