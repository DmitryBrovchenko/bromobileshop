import { CarouselAdminService } from 'src/app/services/admin/carousel-admin.service';
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Observable, of } from "rxjs";
import { switchMap } from 'rxjs/operators';
import { CarouselAdminItem, CarouselEditItem, CarouselItem } from "src/app/interfaces/carousel-item";
import { ImageAdminService } from 'src/app/services/admin/image-admin.service';
import { omit } from 'lodash-es';

@Component({
    selector: 'app-admin-edit-carousel',
    templateUrl: './admin-edit-carousel.component.html',
    styleUrls: ['./admin-edit-carousel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminEditCarouselComponent {
    carouselItems$: Observable<CarouselAdminItem[]> = this.adminService.items$;

    selectedItem: CarouselItem = null;

    constructor(
      private adminService: CarouselAdminService,
      private imageService: ImageAdminService,
    ) {}

    saveItem(value: CarouselEditItem) {
      const imageAction$ = value.image 
        ? this.imageService.uploadImage(value.image, `${value.id}`, 'Carousel')
        : of(null);
        
      imageAction$.pipe(
        switchMap(imageItem => this.adminService.updateCarouselItem({
          ...omit(value, 'image'),
          ...(imageItem ? {
            path: imageItem.path,
            downloadUrl: imageItem.downloadUrl,
          } : {}),
        }))
      ).subscribe();
    }

    deleteItem(key: string) {
      this.adminService.deleteCarouselItem(key).subscribe(
        () => this.selectedItem = null
      );
    }
}