import { Nullable } from 'src/app/interfaces/nullable';
import { BrandAdminItem, BrandEditItem } from 'src/app/interfaces/brand-item.interface';
import { Component, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { getBase64 } from 'src/app/utils';

@Component({
  selector: 'app-brand-edit',
  templateUrl: './brand-edit.component.html',
  styleUrls: ['./brand-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrandEditComponent {
  @Input()
  set brandItem(item: BrandAdminItem) {
    if (item) {
      this.form.patchValue(item);
      this.form.controls.image.setValidators(Validators.required);
      this.imageUrl = item.logoUrl;
    } else {
      this.form.reset();
      this.form.controls.image.removeValidators(Validators.required);
      this.imageUrl = this.dataService.defaultRef;
      this.uploadedImage = null;
    }
  }

  @Input()
  deleteCallback$: (key: string) => Observable<unknown>;

  @Input()
  saveCallback$: (item: BrandEditItem) => Observable<unknown>;

  imageUrl = this.dataService.defaultRef;

  uploadedImage: Nullable<File>;

  form = new FormGroup({
    dbKey: new FormControl(),
    id: new FormControl(),
    name: new FormControl(),
    searchCriteria: new FormControl(),
    image: new FormControl(),
  });

  constructor(
    private cdr: ChangeDetectorRef,
    private dataService: DataService
    ) { }

  uploadImage(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    if (!file) return;
    this.uploadedImage = file;
    getBase64(file, (img) => {
        this.imageUrl = img;
        this.cdr.detectChanges();
    })
  }

  saveItem = () => {
    this.form.updateValueAndValidity();
    if (this.form.valid) {
      return this.saveCallback$({
        ...this.form.value,
        image: this.uploadedImage
      });
    } else {
      Object.values(this.form.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity();
        }
      })
    }
  }

  deleteItem = () => this.deleteCallback$(this.form.value.dbKey);

}
