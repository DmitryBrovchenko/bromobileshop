import { DataService } from 'src/app/services/data.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CarouselAdminItem, CarouselEditItem } from 'src/app/interfaces/carousel-item';
import { getBase64 } from 'src/app/utils';
import { Observable } from 'rxjs';
import { Nullable } from 'src/app/interfaces/nullable';

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
      this.imageUrl = item.downloadUrl;
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
  saveCallback$: (item: CarouselEditItem) => Observable<unknown>;

  imageUrl = this.dataService.defaultRef;

  uploadedImage: Nullable<File>;

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
