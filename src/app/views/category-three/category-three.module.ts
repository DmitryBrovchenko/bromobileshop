import {NgModule} from '@angular/core';
import {CategoryThreeComponent} from './category-three.component';
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
  declarations: [CategoryThreeComponent],
    imports: [
      CatalogueTableModule,
      CommonModule,
      RouterModule,
      ReactiveFormsModule,
      ANT_DESIGN_MODULES
    ]
})
export class CategoryThreeModule {}
