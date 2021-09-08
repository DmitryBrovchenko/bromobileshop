import {NgModule} from '@angular/core';
import {LayoutComponent} from './layout.component';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './widgets/header/header.component';
import {SiderComponent} from './widgets/sider/sider.component';
import {TransliterateArrayPipeModule} from '../pipes/transliterate-array';
import {LayoutRoutingModule} from './layout-routing.module';
import {CatalogueModule} from '../views/catalogue';
import {CategoryOneModule} from '../views/category-one';
import {CategoryTwoModule} from '../views/category-two';
import {CategoryThreeModule} from '../views/category-three';
import {CategoryFourModule} from '../views/category-four';
import {SearchModule} from '../views/search/search.module';
import {ErrorPageModule} from '../views/error-page';
import {AdminModule} from '../views/admin';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzIconModule } from 'ng-zorro-antd/icon';

const ANT_DESIGN_MODULES = [NzLayoutModule, NzMenuModule, NzDropDownModule, NzIconModule, NzInputModule, NzButtonModule, NzToolTipModule]
@NgModule({
  declarations: [LayoutComponent, HeaderComponent, SiderComponent],
  imports: [
    CommonModule,
    ANT_DESIGN_MODULES,
    LayoutRoutingModule,
    TransliterateArrayPipeModule,
    CatalogueModule,
    CategoryOneModule,
    CategoryTwoModule,
    CategoryThreeModule,
    CategoryFourModule,
    SearchModule,
    ErrorPageModule,
    AdminModule,
    FlexLayoutModule,
    FormsModule
  ]
})
export class LayoutModule {}
