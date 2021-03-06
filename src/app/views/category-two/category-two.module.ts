import {NgModule} from '@angular/core';
import {CategoryTwoComponent} from './category-two.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {SortedDataPipeModule} from '../../pipes/sorted-data';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzPageHeaderModule} from 'ng-zorro-antd/page-header';
import {NzRadioModule} from 'ng-zorro-antd/radio';
import {CatalogueTableModule} from '../../widgets/catalogue-table/catalogue-table.module';

const ANT_DESIGN_MODULES = [
  NzBreadCrumbModule,
  NzDividerModule,
  NzDropDownModule,
  NzGridModule,
  NzIconModule,
  NzPageHeaderModule,
  NzRadioModule
];

@NgModule({
  declarations: [CategoryTwoComponent],
  imports: [
    CommonModule,
    RouterModule,
    CatalogueTableModule,
    ReactiveFormsModule,
    SortedDataPipeModule,
    ANT_DESIGN_MODULES
  ]
})
export class CategoryTwoModule {
}
