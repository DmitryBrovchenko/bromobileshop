import {NgModule} from '@angular/core';
import {SiderComponent} from './sider.component';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NzMenuModule} from 'ng-zorro-antd/menu';

@NgModule({
  declarations: [SiderComponent],
  imports: [NzLayoutModule, NzMenuModule, CommonModule, RouterModule],
  exports: [SiderComponent]
})
export class SiderModule {}
