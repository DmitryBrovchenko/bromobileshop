import { Pipe, PipeTransform } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectProductImageUrl } from 'src/app/@ngrx/images/images.reducer';
import { DataService } from 'src/app/services/data.service';

@Pipe({
  name: 'GetImage'
})
export class GetImagePipe implements PipeTransform  {
  constructor(private store: Store, private dataService: DataService) {}

  transform(id: string): Observable<string> {
    return this.store.select(selectProductImageUrl(id)).pipe(
      map(ref => ref ?? this.dataService.defaultRef)
    );
  }
}

