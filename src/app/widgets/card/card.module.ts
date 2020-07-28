import {NgModule} from '@angular/core';
import {CardComponent} from './card.component';
import {NzCardModule} from 'ng-zorro-antd/card';
import {CommonModule} from '@angular/common';
import {GetImagePipeModule} from '../../pipes/get-image/get-image.pipe.module';

@NgModule({
  declarations: [CardComponent],
  imports: [NzCardModule, CommonModule, GetImagePipeModule],
  exports: [CardComponent]
})
export class CardModule {}
