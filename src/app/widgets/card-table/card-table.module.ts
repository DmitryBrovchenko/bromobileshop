import {NgModule} from '@angular/core';
import {CardTableComponent} from './card-table.component';
import {NzCardModule} from 'ng-zorro-antd/card';
import {CommonModule} from '@angular/common';
import {GetImagePipeModule} from '../../pipes/get-image/get-image.pipe.module';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';

@NgModule({
  declarations: [CardTableComponent],
  imports: [NzCardModule, NzAvatarModule, CommonModule, GetImagePipeModule],
  exports: [CardTableComponent]
})
export class CardTableModule {}
