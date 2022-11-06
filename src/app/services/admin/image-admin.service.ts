import { Injectable } from "@angular/core";
import { AngularFireObject, AngularFireList, AngularFireDatabase } from "@angular/fire/compat/database";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { from, Observable } from "rxjs";
import { map, switchMap } from 'rxjs/operators';
import { ImageAdminItem, ImageItem } from "src/app/interfaces/image-item.interface";

@Injectable({
  providedIn: 'root'
})
export class ImageAdminService {

  images: ImageAdminItem[];
  imageObj:AngularFireObject<ImageItem[]> = this.db.object('Images');
  imageServer: AngularFireList<ImageItem> = this.db.list('Images');

  constructor(
    private db: AngularFireDatabase, 
    private storage: AngularFireStorage,
  ) {
    this.imageServer.snapshotChanges().pipe(
      map(snapshot => snapshot.map(item => ({dbKey: item.payload.key, ...item.payload.val()})))
    ).subscribe(res => this.images = res);
  }

  uploadImage(file: File, id: string, path: string): Observable<ImageItem> {
    const fullPath = `${path}/${id}`;
    return this.uploadImageToStorage(file, fullPath).pipe(
      map(downloadUrl => ({
        id,
        path: fullPath,
        downloadUrl
      })),
      switchMap(imageItem => this.updateImageList(imageItem))
    )
  }

  private updateImageList(imageItem: ImageItem): Observable<ImageItem> {
    const existingKey = this.images.find(item => item.id === imageItem.id)?.dbKey;
    // Update or create new dictionary reference, return image item
    const action = existingKey 
      ? this.imageServer.update(existingKey, imageItem)
      : this.imageServer.push(imageItem);

    return from(action).pipe(
      map(() => imageItem)
    );
  }

  private uploadImageToStorage(file: File, path: string): Observable<string> {
    // Upload image (overrides exisitng file)
    const ref = this.storage.ref(path);
    return from(ref.put(file)).pipe(
      switchMap(() => ref.getDownloadURL())
    );
  }
}