import {NgModule} from '@angular/core';
import {SiderMainComponent} from './sider-main.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [SiderMainComponent],
  imports: [NgZorroAntdModule, CommonModule, RouterModule],
  exports: [SiderMainComponent]
})
export class SiderMainModule {}
