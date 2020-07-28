import {NgModule} from '@angular/core';
import {LayoutComponent} from './layout.component';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NgZorroAntdModule} from 'ng-zorro-antd';

@NgModule({
  declarations: [LayoutComponent],
  exports: [
    LayoutComponent
  ],
  imports: [CommonModule, RouterModule, NgZorroAntdModule]
})
export class LayoutModule {}
