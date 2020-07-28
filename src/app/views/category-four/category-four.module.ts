import {NgModule} from '@angular/core';
import {CategoryFourComponent} from './category-four.component';
import {CommonModule} from '@angular/common';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzPageHeaderModule} from 'ng-zorro-antd/page-header';
import {NzPaginationModule} from 'ng-zorro-antd/pagination';
import {NzRadioModule} from 'ng-zorro-antd/radio';
import {RouterModule} from '@angular/router';
import {CardModule} from '../../widgets/card';
import {SiderModule} from '../../widgets/sider';
import {ReactiveFormsModule} from '@angular/forms';
import {SortedDataPipeModule} from '../../pipes/sorted-data';

const ANT_DESIGN_MODULES = [
  NzIconModule,
  NzBreadCrumbModule,
  NzDropDownModule,
  NzGridModule,
  NzPaginationModule,
  NzDividerModule,
  NzPageHeaderModule,
  NzLayoutModule,
  NzRadioModule
];

@NgModule({
  declarations: [CategoryFourComponent],
    imports: [
      CommonModule,
      RouterModule,
      CardModule,
      SiderModule,
      ReactiveFormsModule,
      SortedDataPipeModule,
      ANT_DESIGN_MODULES
    ]
})
export class CategoryFourModule {}
