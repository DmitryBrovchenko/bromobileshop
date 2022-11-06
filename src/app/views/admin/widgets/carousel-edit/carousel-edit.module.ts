import { NzInputModule } from 'ng-zorro-antd/input';
import { NzImageModule } from 'ng-zorro-antd/image';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NgModule } from '@angular/core';
import { CarouselEditComponent } from './carousel-edit.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, NzButtonModule, NzFormModule, NzImageModule, NzInputModule, ReactiveFormsModule],
  declarations: [CarouselEditComponent],
  exports: [CarouselEditComponent],
})
export class CarouselEditModule {}