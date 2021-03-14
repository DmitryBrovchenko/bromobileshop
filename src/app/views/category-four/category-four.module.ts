import {NgModule} from '@angular/core';
import {CategoryFourComponent} from './category-four.component';
import {CommonModule} from '@angular/common';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzPageHeaderModule} from 'ng-zorro-antd/page-header';
import {NzRadioModule} from 'ng-zorro-antd/radio';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {SortedDataPipeModule} from '../../pipes/sorted-data';
import {CatalogueTableModule} from '../../widgets/catalogue-table/catalogue-table.module';

const ANT_DESIGN_MODULES = [
  NzIconModule,
  NzBreadCrumbModule,
  NzDropDownModule,
  NzGridModule,
  NzDividerModule,
  NzPageHeaderModule,
  NzRadioModule
];

@NgModule({
  declarations: [CategoryFourComponent],
    imports: [
      CommonModule,
      RouterModule,
      CatalogueTableModule,
      ReactiveFormsModule,
      ANT_DESIGN_MODULES
    ]
})
export class CategoryFourModule {}
