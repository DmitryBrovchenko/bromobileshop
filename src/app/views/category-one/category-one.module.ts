import {NgModule} from '@angular/core';
import {CategoryOneComponent} from './category-one.component';
import {CommonModule} from '@angular/common';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzPageHeaderModule} from 'ng-zorro-antd/page-header';
import {NzPaginationModule} from 'ng-zorro-antd/pagination';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzRadioModule} from 'ng-zorro-antd/radio';
import {RouterModule} from '@angular/router';
import {CardModule} from '../../widgets/card';
import {ReactiveFormsModule} from '@angular/forms';
import {SiderModule} from '../../widgets/sider';
import {SortedDataPipeModule} from '../../pipes/sorted-data';
import {CardTableModule} from '../../widgets/card-table';

const ANT_DESIGN_MODULES = [
  NzIconModule,
  NzBreadCrumbModule,
  NzDropDownModule,
  NzGridModule,
  NzPaginationModule,
  NzDividerModule,
  NzPageHeaderModule,
  NzRadioModule,
  NzLayoutModule
];

@NgModule({
  declarations: [CategoryOneComponent],
    imports: [
      CommonModule,
      RouterModule,
      CardModule,
      CardTableModule,
      SiderModule,
      ReactiveFormsModule,
      SortedDataPipeModule,
      ANT_DESIGN_MODULES
    ]
})
export class CategoryOneModule {}
