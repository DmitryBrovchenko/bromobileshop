import {NgModule} from '@angular/core';
import {CategoryTwoComponent} from './category-two.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {CatalogueTableModule} from '../../widgets/catalogue-table/catalogue-table.module';
import { CatalogueHeaderModule } from '../../widgets/catalogue-header/catalogue-header.module';

@NgModule({
  declarations: [CategoryTwoComponent],
  imports: [
    CommonModule,
    RouterModule,
    CatalogueHeaderModule,
    CatalogueTableModule
  ]
})
export class CategoryTwoModule {
}
