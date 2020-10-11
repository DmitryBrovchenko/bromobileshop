import {NgModule} from '@angular/core';
import {LayoutPcComponent} from './layout-pc.component';
import { HeaderComponent } from './widgets/header/header.component';
import { SiderComponent } from './widgets/sider/sider.component';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {RouterModule} from '@angular/router';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzInputModule} from 'ng-zorro-antd/input';
import {CommonModule} from '@angular/common';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';

const ANT_DESIGN_MODULES = [
  NzLayoutModule,
  NzIconModule,
  NzMenuModule,
  NzButtonModule,
  NzInputModule,
  NzDropDownModule
];

@NgModule({
  declarations: [LayoutPcComponent, HeaderComponent, SiderComponent],
  exports: [
    LayoutPcComponent
  ],
  imports: [ CommonModule, ANT_DESIGN_MODULES, RouterModule.forChild([]) ]
})
export class LayoutPcModule {}
