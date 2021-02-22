import {NgModule} from '@angular/core';
import {CategoryThreeComponent} from './category-three.component';
import {CommonModule} from '@angular/common';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzPageHeaderModule} from 'ng-zorro-antd/page-header';
import {NzPaginationModule} from 'ng-zorro-antd/pagination';
import {NzRadioModule} from 'ng-zorro-antd/radio';
import {RouterModule} from '@angular/router';
import {CardModule} from '../../widgets/card';
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
  NzRadioModule
];

@NgModule({
  declarations: [CategoryThreeComponent],
    imports: [
      CommonModule,
      RouterModule,
      CardModule,
      ReactiveFormsModule,
      SortedDataPipeModule,
      ANT_DESIGN_MODULES
    ]
})
export class CategoryThreeModule {}
