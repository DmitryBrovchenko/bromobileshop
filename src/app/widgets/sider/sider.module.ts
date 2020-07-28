import {NgModule} from '@angular/core';
import {SiderComponent} from './sider.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [SiderComponent],
  imports: [NgZorroAntdModule, CommonModule, RouterModule],
  exports: [SiderComponent]
})
export class SiderModule {}
