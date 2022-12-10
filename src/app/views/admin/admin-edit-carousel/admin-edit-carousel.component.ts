import { CarouselAdminService } from 'src/app/services/admin/carousel-admin.service';
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Observable, of } from "rxjs";
import { switchMap, tap } from 'rxjs/operators';
import { CarouselAdminItem, CarouselEditItem } from "src/app/interfaces/carousel-item";
import { ImageAdminService } from 'src/app/services/admin/image-admin.service';
import omit from 'lodash-es/omit';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-admin-edit-carousel',
    templateUrl: './admin-edit-carousel.component.html',
    styleUrls: ['./admin-edit-carousel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminEditCarouselComponent {
    carouselItems$: Observable<CarouselAdminItem[]> = this.adminService.items$;

    selectedItem: CarouselAdminItem = null;

    constructor(
      private adminService: CarouselAdminService,
      private imageService: ImageAdminService,
    ) {}

    saveCallback = (value: CarouselEditItem) => {
      const id = value.id ?? new Date().getTime();

      const imageAction$ = value.image 
        ? this.imageService.uploadImage(value.image, `${id}`, environment.storageConfig.carouselPath)
        : of(null);

      return imageAction$.pipe(
        switchMap(imageItem => this.adminService.updateCarouselItem({
          ...omit(value, 'image'),
          id,
          ...(imageItem ? {
            path: imageItem.path,
            downloadUrl: imageItem.downloadUrl,
          } : {}),
        }))
      )
    }

    deleteCallback = (key: string) => this.adminService.deleteCarouselItem(key).pipe(
      tap(() => this.selectedItem = null)
    )
}