import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { selectHierarchyNamesL2, selectHierarchyNamesL3, selectHierarchyNamesL4 } from 'src/app/@ngrx/hierarchy/hierarchy.reducer';
import { CatalogueItem } from 'src/app/interfaces/catalogue-item.interface';
import { DictionaryItem } from 'src/app/interfaces/dictionary-item.interface';
import { getBase64 } from 'src/app/utils';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit, OnDestroy {
  @Input()
  product: CatalogueItem;

  // Need to have this list in component, because we need structure -> origin conversion
  @Input()
  categoryList: DictionaryItem[];

  productForm: FormGroup;
  uploadUrl: string;

  // Other lists could be observables
  categoryTwoList$: Observable<string[]>;
  categoryThreeList$: Observable<string[]>;
  categoryFourList$: Observable<string[]>;

  selectedCategoryOne: BehaviorSubject<string>;
  selectedCategoryTwo: BehaviorSubject<string>;
  selectedCategoryThree: BehaviorSubject<string>;

  destroyed$ = new Subject<void>();

  constructor(private store: Store, private modal: NzModalRef) { }

  ngOnInit(): void {
    // Initialize subjects to hold currently selected category 
    this.selectedCategoryOne = new BehaviorSubject<string>(this.categoryList.find(item => item.origin === this.product['Category 1'])?.structure);
    this.selectedCategoryTwo = new BehaviorSubject<string>(this.product['Category 2']);
    this.selectedCategoryThree = new BehaviorSubject<string>(this.product['Category 3']);
    // Initialize form group
    this.productForm = new FormGroup({
      name: new FormControl(this.product.Name),
      category1: new FormControl(this.product['Category 1']),
      category2: new FormControl(this.product['Category 2']),
      category3: new FormControl(this.product['Category 3']),
      category4: new FormControl(this.product['Category 4']),
      price: new FormControl(this.product.Price),
      quantity: new FormControl(this.product.Quantity),
      picture: new FormControl(null),
    });
    // Lists of categories observables
    this.categoryTwoList$ = this.selectedCategoryOne.pipe(
      switchMap((category) => this.store.select(selectHierarchyNamesL2(category))),
      takeUntil(this.destroyed$)
    );
    this.categoryThreeList$ = combineLatest([this.selectedCategoryOne, this.selectedCategoryTwo])
      .pipe(
        switchMap(([categoryOne, categoryTwo]) => this.store.select(selectHierarchyNamesL3(categoryOne, categoryTwo))),
        takeUntil(this.destroyed$)
    );
    this.categoryFourList$ = combineLatest([this.selectedCategoryOne, this.selectedCategoryTwo, this.selectedCategoryThree])
        .pipe(
          switchMap(([categoryOne, categoryTwo, categoryThree]) => this.store.select(selectHierarchyNamesL4(categoryOne, categoryTwo, categoryThree))),
          takeUntil(this.destroyed$)
        );
    // Track category changes
    this.productForm.controls.category1.valueChanges.pipe(
      takeUntil(this.destroyed$)
    ).subscribe((categoryOne) => {
      const categoryOneStrcuture = this.categoryList.find(item => item.origin === categoryOne).structure;
      this.selectedCategoryOne.next(categoryOneStrcuture);
    });
    this.productForm.controls.category2.valueChanges.pipe(
      takeUntil(this.destroyed$)
    ).subscribe((categoryTwo) => this.selectedCategoryTwo.next(categoryTwo));
    this.productForm.controls.category3.valueChanges.pipe(
      takeUntil(this.destroyed$)
    ).subscribe((categoryThree) => this.selectedCategoryThree.next(categoryThree));
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  getUpdatedProduct(): CatalogueItem {
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

  getUploadedFile(): File {
    return this.productForm.controls.picture.value;
  }

  uploadImage(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.productForm.controls.picture.setValue(file);
    getBase64(file, (img) => {
      this.uploadUrl = img;
    });
  }
}
