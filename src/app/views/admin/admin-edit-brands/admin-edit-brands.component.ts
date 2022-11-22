import { Component } from "@angular/core";
import { Observable, of } from "rxjs";
import { switchMap, tap } from 'rxjs/operators';
import { BrandAdminItem, BrandEditItem } from "src/app/interfaces/brand-item.interface";
import { Nullable } from "src/app/interfaces/nullable";
import { BrandsAdminService } from "src/app/services/admin/brands-admin.service";
import { ImageAdminService } from "src/app/services/admin/image-admin.service";
import omit from 'lodash-es/omit';

@Component({
  selector: 'app-admin-edit-brands',
  templateUrl: './admin-edit-brands.component.html',
  styleUrls: ['./admin-edit-brands.component.scss'],
})
export class AdminEditBrandsComponent {
  brandItems$: Observable<BrandAdminItem[]> = this.adminService.items$;

  selectedItem: Nullable<BrandAdminItem>;

  constructor(
    private adminService: BrandsAdminService,
    private imageService: ImageAdminService
  ) {}

  saveCallback = (value: BrandEditItem) => {
    const id = value.id ?? new Date().getTime();

    const imageAction$ = value.image
      ? this.imageService.uploadImage(value.image, `${id}`, 'Brands')
      : of(null);

    return imageAction$.pipe(
      switchMap(imageItem => this.adminService.updateBrandItem({
        ...omit(value, 'image'),
        id,
        ...(imageItem ? {
          logoPath: imageItem.path,
          logoUrl: imageItem.downloadUrl,
        } : {}),
      }))
    )
  }

  deleteCallback = (key: string) => this.adminService.deleteBrandItem(key).pipe(
    tap(() => this.selectedItem = null)
  )
  
}