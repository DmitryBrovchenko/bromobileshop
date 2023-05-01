import {NgModule} from '@angular/core';
import {LayoutComponent} from './layout.component';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './widgets/header/header.component';
import {SiderComponent} from './widgets/sider/sider.component';
import {TransliterateArrayPipeModule} from '../pipes/transliterate-array';
import { FormsModule } from '@angular/forms';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterModule } from '@angular/router';
import { ExecuteWithPipeModule } from '../pipes/execute-with';

const ANT_DESIGN_MODULES = [NzLayoutModule, NzMenuModule, NzDropDownModule, NzIconModule, NzInputModule, NzButtonModule, NzToolTipModule]
@NgModule({
  declarations: [LayoutComponent, HeaderComponent, SiderComponent],
  exports: [LayoutComponent],
  imports: [
    CommonModule,
    ExecuteWithPipeModule,
    ANT_DESIGN_MODULES,
    FormsModule,
    RouterModule.forChild([]),
    TransliterateArrayPipeModule,
  ]
})
export class LayoutModule {}
