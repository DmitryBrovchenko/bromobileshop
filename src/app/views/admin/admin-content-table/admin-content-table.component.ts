import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {  NzTableFilterFn, NzTableFilterList, NzTableSortFn } from 'ng-zorro-antd/table';
import { combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';
import { selectCatalogue } from 'src/app/@ngrx/catalogue/catalogue.reducer';
import { selectImages } from 'src/app/@ngrx/images/images.reducer';
import { CatalogueItem } from 'src/app/interfaces/catalogue-item.interface';
import { ImageItem } from 'src/app/interfaces/image-item.interface';
import { getBase64 } from 'src/app/utils';
import { parseNumber } from 'src/app/utils/parse-number';
import { FirebaseAdminService } from '../../../services/firebase-admin.service';

@Component({
  selector: 'app-admin-content-table',
  templateUrl: './admin-content-table.component.html',
  styleUrls: ['./admin-content-table.component.scss']
})
export class AdminContentTableComponent implements OnInit {
  dataOrigin: CatalogueItem[]; // Original array
  dataDisplayed: CatalogueItem[]; // Array to display in the table
  dataFiltered: CatalogueItem[]; // Filtered array of displayed items

  imageOrigin: ImageItem[];
  imageDisplayed: { [key: string] : ImageItem } = {};
  imageCache: { [key: string]: File } = {};

  nameFilterVisible = false;
  nameFilterValue = '';

  distinctCategories: { [key: number]: string[]};
  autocompleteCategories: { [key: number]: string[]} = {
    1: [],
    2: [],
    3: [],
    4: [],
  };
  categoryList1: NzTableFilterList = []; 
  categoryList2: NzTableFilterList = [];
  categoryList3: NzTableFilterList = [];
  categoryList4: NzTableFilterList = [];

  editCache: { [key: string]: CatalogueItem } = {};
  filterValuesCache: { [key: number]: string[] } = {
    1: [],
    2: [],
    3: [],
  }

  sortFns: { [key: string]: NzTableSortFn} = {
    Name: (a: CatalogueItem, b: CatalogueItem) => this.sortString(a, b, 'Name'),
    'Category 1': (a: CatalogueItem, b: CatalogueItem) => this.sortString(a, b, 'Category 1'),
    'Category 2': (a: CatalogueItem, b: CatalogueItem) => this.sortString(a, b, 'Category 2'),
    'Category 3': (a: CatalogueItem, b: CatalogueItem) => this.sortString(a, b, 'Category 3'),
    'Category 4': (a: CatalogueItem, b: CatalogueItem) => this.sortString(a, b, 'Category 4'),
    Price: (a: CatalogueItem, b: CatalogueItem) => this.sortNumber(a, b, 'Price'),
    Quantity: (a: CatalogueItem, b: CatalogueItem) => this.sortNumber(a, b, 'Quantity'),
  }
  filterFns: {[key: string]: NzTableFilterFn} = {
    'Category 1': (list: string[], item: CatalogueItem) => this.filterList(list, item, 1),
    'Category 2': (list: string[], item: CatalogueItem) => this.filterList(list, item, 2),
    'Category 3': (list: string[], item: CatalogueItem) => this.filterList(list, item, 3),
    'Category 4': (list: string[], item: CatalogueItem) => this.filterList(list, item, 4),
  }

  saving = false;

  allCheckedOnPage = false;
  indeterminate = false;
  checkedRows = new Set<string>();
  pageData: CatalogueItem[] = [];

  constructor(private adminService: FirebaseAdminService, private store: Store) { }

  ngOnInit(): void {
    combineLatest([this.store.select(selectCatalogue), this.store.select(selectImages)])
    .pipe(take(1))
    .subscribe(([catalogue, images]) => {
      this.dataOrigin = catalogue;
      this.imageOrigin = images;
      // Copy the original arrays to allow modifications
      this.dataDisplayed = catalogue.map(item => ({...item}));
      this.dataFiltered = this.dataDisplayed.map(item => ({...item}));
      images.forEach((image) => this.imageDisplayed[image.id] = image);
      // Set the list of avaliable categories for filers
      this.setCategoryFilters();
    });
  }

  // Set the lists of available categories for filters based on data values
  setCategoryFilters() {
    this.distinctCategories = {
      1: [],
      2: [],
      3: [],
      4: [],
    };
    this.dataDisplayed.forEach(item => {
      for (let i = 1; i <= 4; ++i) {
        if (!this.distinctCategories[i].includes(item[`Category ${i}`])) {
          this.distinctCategories[i].push(item[`Category ${i}`])
        }
      }
    });
    for (let i = 1; i <= 4; ++i) {
      this[`categoryList${i}`] = this.distinctCategories[i]
        .sort((a: string, b: string) => this.sortStringNull(a, b))
        .map((category: string) => ({text: category, value: category}));
    }
  }

  resetFilters() {
    for (let i = 1; i <= 3; ++i) {
      this.filterValuesCache[i] = [];
    }
    this.dataFiltered = this.dataDisplayed.map(item => ({...item}));
    this.setCategoryFilters();
  }

  load(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const fileReader = new FileReader();
      fileReader.onload = (ev) => {
        this.dataDisplayed = JSON.parse(ev.target.result as string).data.map((item) => ({
          ...item,
          Price: parseNumber(item.Price),
          Quantity: parseNumber(item.Quantity),
        }));
        this.resetFilters();
        // Clear input so change is triggered on the same file
        input.value = '';
      }
      fileReader.readAsText(input.files[0]);
    }
  }

  async save() {
    this.saving = true;
    // Save the list of images
    await this.adminService.updateImagesList(Object.values(this.imageDisplayed));
    // Save images from cache and refresh references
    Object.entries(this.imageCache).forEach(async ([id, image]) => {
      await this.adminService.uploadImage(image, id);
    })
    // Save the list of products
    await this.adminService.updateProductList(this.dataDisplayed);
    this.saving = false;
  }

  cancel() {
    // Return catalogue and image arrays to their original state
    this.dataDisplayed = this.dataOrigin.map(item => ({...item}));
    this.imageDisplayed = {};
    this.imageOrigin.forEach(image => this.imageDisplayed[image.id] = image); 
    // Reset table filter lists and autocomplete
    this.setCategoryFilters();
    this.resetFilters();
  }

  startEdit(id: string) {
    this.editCache[id] = {...this.dataFiltered.find(item => item.id === id)};
  }

  saveEdit(id: string) {
    this.dataDisplayed = this.dataDisplayed.map((item) => item.id === id ? this.editCache[id] : item);
    this.dataFiltered = this.dataFiltered.map((item) => item.id === id ? this.editCache[id] : item);
    this.editCache[id] = null;
  }

  cancelEdit(id: string) {
    this.editCache[id] = null;
  }

  createProduct() {
    const newProduct: CatalogueItem = {
      id: new Date().toISOString(),
      'Category 1': null,
      'Category 2': null,
      'Category 3': null,
      'Category 4': null,
      Name: null,
      Price: null,
      Quantity: null,
      article: null,
    }
    this.dataDisplayed = [newProduct, ...this.dataDisplayed];
    if (!this.nameFilterValue) {
      this.dataFiltered = [newProduct, ...this.dataFiltered];
    }
  }
  
  deleteProduct(id: string) {
    // Remove product from the data displayed
    this.dataDisplayed = this.dataDisplayed.filter(item => item.id !== id);
    this.dataFiltered = this.dataFiltered.filter(item => item.id !== id);
  }

  bulkDeleteProduct() {
    // Remove product from the data displayed
    this.dataDisplayed = this.dataDisplayed.filter(item => !this.checkedRows.has(item.id));
    this.dataFiltered = this.dataFiltered.filter(item => !this.checkedRows.has(item.id));
    // Clear the checked row set and refresh flags
    this.checkedRows.clear();
    this.refreshCheckedAllStatus();
  }

  loadImage(id: string, event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files.length) {
      const image: File = input.files[0];
      if (this.imageOrigin.find((item) => item.id === id)) {
        // Product has an image, caching file for later upload
        this.imageCache[id] = image;
        // Get the relevant local reference
        getBase64(image, (img) => {
          this.imageDisplayed[id] = {
            id,
            path: id,
            downloadUrl: img
          };
        });
      } else {
        // Original product has no image, upload it to the database
        this.adminService.uploadImageFile(image, id).then(
          (link) => this.imageDisplayed[id] = {
            id,
            path: id,
            downloadUrl: link
          } 
        )
      }
      input.value = '';
    }
  }

  deleteImage(id: string) {
    if (this.imageDisplayed.hasOwnProperty(id)) {
      delete this.imageDisplayed[id];
    }
    if (this.imageCache.hasOwnProperty(id)) {
      delete this.imageCache[id];
    }
  }

  bulkDeleteImage() {
    // Should not clear checked row set
    this.checkedRows.forEach(id => this.deleteImage(id));
  }

  resetNameFilter() {
    this.nameFilterValue = '';
    this.filterName();
  }

  filterName() {
    this.nameFilterVisible = false;
    this.dataFiltered = this.dataDisplayed.filter(item => item.Name?.toLowerCase().includes(this.nameFilterValue.toLowerCase()));
  }

  filterList(list: string[], item: CatalogueItem, categoryNum: number): boolean {
    return list.includes(item[`Category ${categoryNum}`]);
  }

  // Update the category lists in cache according to the selection and the lists of available options
  updateCacheAndLists(list: string[], categoryNum: number) {
    // Save current selection
    this.filterValuesCache[categoryNum] = list;
    // Get the new filtered data
    const filteredData = this.dataDisplayed
    .filter(item => {
      let predicate = true;
      for (let j = 1; j<= categoryNum; j++) {
        predicate &&= !this.filterValuesCache[j].length || this.filterValuesCache[j].includes(item[`Category ${j}`]);
      }
      return predicate;
    });
    // Update filter cache and emit new lists for lower category levels
    for (let i = categoryNum + 1; i <= 4; i++ ) {
      const distinctCategoryList = [];
      filteredData
      .map(item => item[`Category ${i}`])
      .forEach(category => {
        if (!distinctCategoryList.includes(category)) {
          distinctCategoryList.push(category);
        }
      });
      this[`categoryList${i}`] = distinctCategoryList
      .sort((a: string, b: string) => this.sortStringNull(a, b))
      .map(category => ({text: category, value: category}));
      if (i < 4) {
        this.filterValuesCache[i] = this.filterValuesCache[i].filter(item => distinctCategoryList.includes(item));
      }
    }
  }

  // Update lists for autocomplete
  updateAutocomplete(value: string, category: number) {
    this.autocompleteCategories[category] = this.distinctCategories[category].filter((item) => item?.toLowerCase().includes(value?.toLowerCase()));
  }

  sortNumber(a: CatalogueItem, b: CatalogueItem, field: string): number {
    return a[field] < b[field] ? -1 : a[field] > b[field] ? 1 : 0;
  }

  sortString(a: CatalogueItem, b: CatalogueItem, field: string): number {
    return this.sortStringNull(a[field], b[field]);
  }
  
  // Sort string values that could be nulls
  sortStringNull(a: string, b: string): number {
    if (a === null && b === null) {
      return 0;
    } else if (a === null) {
      return -1;
    } else if (b === null) {
      return 1;
    } else {
      return a.toLowerCase().localeCompare(b.toLowerCase());
    }
  }

  onAllChecked(checked: boolean) {
    this.pageData.forEach(product => this.updateCheckedSet(product.id, checked));
    this.refreshCheckedAllStatus();
  }

  onItemChecked(id: string, checked: boolean) {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedAllStatus();
  }

  onCurrentPageDataChange(data: CatalogueItem[]) {
    this.pageData = data;
    this.refreshCheckedAllStatus();
  }

  refreshCheckedAllStatus() {
    this.allCheckedOnPage = this.pageData.every(product => this.checkedRows.has(product.id));
    this.indeterminate = !this.allCheckedOnPage && this.pageData.some(product => this.checkedRows.has(product.id));
  }

  updateCheckedSet(id: string, checked: boolean) {
    if (checked) {
      this.checkedRows.add(id);
    } else {
      this.checkedRows.delete(id);
    }
  }

}
