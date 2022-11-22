import { NzFormModule } from 'ng-zorro-antd/form';
import { BrandEditComponent } from './brand-edit.component';
import { NgModule } from "@angular/core";
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'src/app/widgets/button';
import { CommonModule } from '@angular/common';
import { NzImageModule } from 'ng-zorro-antd/image';

@NgModule({
  imports: [ButtonModule, CommonModule, NzFormModule, NzImageModule, NzInputModule, ReactiveFormsModule],
  declarations: [BrandEditComponent],
  exports: [BrandEditComponent]
})
export class BrandEditModule {}