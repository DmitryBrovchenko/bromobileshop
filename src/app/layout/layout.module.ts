import {NgModule} from '@angular/core';
import {LayoutComponent} from './layout.component';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import { LayoutMobileComponent } from './layout-mobile/layout-mobile.component';
import {LayoutPcModule} from './layout-pc/layout-pc.module';

@NgModule({
  declarations: [LayoutComponent, LayoutMobileComponent],
  exports: [
    LayoutComponent
  ],
  imports: [CommonModule, RouterModule, NgZorroAntdModule, LayoutPcModule]
})
export class LayoutModule {}
