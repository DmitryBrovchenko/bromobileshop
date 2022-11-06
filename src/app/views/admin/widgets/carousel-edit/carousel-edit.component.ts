import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
      this.uploadUrl = item.downloadUrl;
    } else {
      this.form.reset();
      this.uploadUrl = null;
    }
  }

  @Output()
  delete = new EventEmitter<string>();

  @Output()
  save = new EventEmitter<CarouselEditItem>();

  uploadUrl: string;

  form = new FormGroup({
    dbKey: new FormControl(),
    id: new FormControl(),
    description: new FormControl(),
    image: new FormControl(),
  });
  
  constructor(
    private cdr: ChangeDetectorRef
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
    this.save.emit(this.form.value);
  }

  deleteItem() {
    this.delete.emit(this.form.value.dbKey);
  }
}
