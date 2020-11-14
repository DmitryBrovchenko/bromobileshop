import {NgModule} from '@angular/core';
import {LayoutComponent} from './layout.component';
import {CommonModule} from '@angular/common';
import {NgZorroAntdModule} from 'ng-zorro-antd';
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

@NgModule({
  declarations: [LayoutComponent, HeaderComponent, SiderComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    LayoutRoutingModule,
    TransliterateArrayPipeModule,
    CatalogueModule,
    CategoryOneModule,
    CategoryTwoModule,
    CategoryThreeModule,
    CategoryFourModule,
    SearchModule,
    ErrorPageModule,
    AdminModule
  ]
})
export class LayoutModule {}
