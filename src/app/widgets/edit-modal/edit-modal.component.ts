import { Nullable } from 'src/app/interfaces/nullable';
import { environment } from 'src/environments/environment';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { forkJoin, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { selectHierarchyNamesL2, selectHierarchyNamesL3, selectHierarchyNamesL4 } from 'src/app/@ngrx/hierarchy/hierarchy.reducer';
import { CatalogueItem } from 'src/app/interfaces/catalogue-item.interface';
import { DictionaryItem } from 'src/app/interfaces/dictionary-item.interface';
import { CatalogueAdminService } from 'src/app/services/admin/catalogue-admin.service';
import { ImageAdminService } from 'src/app/services/admin/image-admin.service';
import { getBase64 } from 'src/app/utils';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent {
  @Input()
  product: Nullable<CatalogueItem>;

  // Need to have this list in component, because we need structure -> origin conversion
  @Input()
  categoryList: DictionaryItem[];

  productForm = new FormGroup({
    name: new FormControl(null),
    category1: new FormControl(null),
    category2: new FormControl(null),
    category3: new FormControl(null),
    category4: new FormControl(null),
    price: new FormControl(null),
    quantity: new FormControl(null),
    picture: new FormControl(null),
  });

  uploadUrl: string;9

  constructor(
    private store: Store,
    private modal: NzModalRef,
    private catalogueService: CatalogueAdminService,
    private imageService: ImageAdminService,
  ) { }

  getStructureName = (categotyOne: string, categoryOneList: Nullable<DictionaryItem[]>) =>
    categoryOneList?.find(c => c.origin === categotyOne)?.structure

  setFormValue = (product: Nullable<CatalogueItem>) => {
    if (!product) return;
    this.productForm.patchValue({
      name: product.Name,
      category1: product['Category 1'],
      category2: product['Category 2'],
      category3: product['Category 3'],
      category4: product['Category 4'],
      price: product.Price,
      quantity: product.Quantity,
    });
  }

  getCategoryTwoList$ = (categoryOne: string) => {
    if (!categoryOne) return of([]);
    return this.store.select(selectHierarchyNamesL2(categoryOne));
  }

  getCategoryThreeList$ = (categoryOne: string, categoryTwo: string) => {
    if (!(categoryOne && categoryTwo)) return of([]);
    return this.store.select(selectHierarchyNamesL3(categoryOne, categoryTwo));
  }

  getCategoryFourList$ = (categoryOne: string, categoryTwo: string, categoryThree: string) => {
    if (!(categoryOne && categoryTwo && categoryThree)) return of([]);
    return this.store.select(selectHierarchyNamesL4(categoryOne, categoryTwo, categoryThree));
  }

  saveItem$ = () => {
    const actions$: Observable<unknown>[] = [];
    const picture = this.productForm.controls.picture.value;
    const updatedProduct = this.getUpdatedProduct();
    if (picture) {
      actions$.push(this.imageService.uploadCatalogueImage(picture, updatedProduct.id, environment.storageConfig.cataloguePath));
    }
    actions$.push(this.catalogueService.updateProduct(updatedProduct));
    return forkJoin(actions$).pipe(
      tap(() => this.modal.close())
    );
  }

  cancelEdit = () => this.modal.close();

  private getUpdatedProduct(): CatalogueItem {
      const formValue = this.productForm.getRawValue();
      const updatedProduct = {
        ...this.product,
      }
      updatedProduct.Name = formValue.name;
      updatedProduct.Price = formValue.price;
      updatedProduct.Quantity = formValue.quantity;
      updatedProduct['Category 1'] = formValue.category1;
      updatedProduct['Category 2'] = formValue.category2;
      updatedProduct['Category 3'] = formValue.category3;
      updatedProduct['Category 4'] = formValue.category4;
      return updatedProduct;
  }

  uploadImage(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.productForm.controls.picture.setValue(file);
    getBase64(file, (img) => {
      this.uploadUrl = img;
    });
  }
}
