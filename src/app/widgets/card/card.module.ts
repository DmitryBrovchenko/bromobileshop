import {NgModule} from '@angular/core';
import {CardComponent} from './card.component';
import {NzCardModule} from 'ng-zorro-antd/card';
import {CommonModule} from '@angular/common';
import {GetImagePipeModule} from '../../pipes/get-image/get-image.pipe.module';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { EditModalModule } from '../edit-modal/edit-modal.module';

@NgModule({
  declarations: [CardComponent],
  imports: [NzCardModule, NzIconModule, CommonModule, GetImagePipeModule, EditModalModule],
  exports: [CardComponent]
})
export class CardModule {}
