import { DataService } from 'src/app/services/data.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CarouselAdminItem, CarouselEditItem } from 'src/app/interfaces/carousel-item';
import { getBase64 } from 'src/app/utils';

@Component({
  selector: 'app-carousel-edit',
  templateUrl: './carousel-edit.component.html',
  styleUrls: ['./carousel-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselEditComponent {
  @Input()
  set carouselItem(item: CarouselAdminItem) {
    if (item) {
      this.form.patchValue(item);
      this.form.controls.image.setValidators(Validators.required);
      this.uploadUrl = item.downloadUrl;
    } else {
      this.form.reset();
      this.form.controls.image.removeValidators(Validators.required);
      this.uploadUrl = this.dataService.defaultRef;
    }
  }

  @Output()
  delete = new EventEmitter<string>();

  @Output()
  save = new EventEmitter<CarouselEditItem>();

  uploadUrl = this.dataService.defaultRef;

  form = new FormGroup({
    dbKey: new FormControl(),
    id: new FormControl(),
    description: new FormControl(),
    image: new FormControl(),
  });
  
  constructor(
    private cdr: ChangeDetectorRef,
    private dataService: DataService
  ) { }

  uploadImage(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.controls.image.setValue(file);
    getBase64(file, (img) => {
        this.uploadUrl = img;
        this.cdr.detectChanges();
    })
  }

  saveItem() {
    this.form.updateValueAndValidity();
    if (this.form.valid) {
      this.save.emit(this.form.value);
    } else {
      Object.values(this.form.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity();
        }
      })
    }
  }

  deleteItem() {
    this.delete.emit(this.form.value.dbKey);
  }
}
