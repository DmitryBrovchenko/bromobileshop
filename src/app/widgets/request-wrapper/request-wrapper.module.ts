import { FlexLayoutModule } from '@angular/flex-layout';
import { RequestWrapperComponent } from './request-wrapper.component';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { NzSpinModule } from 'ng-zorro-antd/spin';

@NgModule({
  imports: [CommonModule, FlexLayoutModule, NzSpinModule],
  declarations: [RequestWrapperComponent],
  exports: [RequestWrapperComponent]
})
export class RequestWrapperModule {}