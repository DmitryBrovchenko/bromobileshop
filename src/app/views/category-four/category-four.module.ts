import {NgModule} from '@angular/core';
import {CategoryFourComponent} from './category-four.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {CatalogueTableModule} from '../../widgets/catalogue-table/catalogue-table.module';
import { CatalogueHeaderModule } from 'src/app/widgets/catalogue-header/catalogue-header.module';

@NgModule({
  declarations: [CategoryFourComponent],
    imports: [
      CommonModule,
      RouterModule,
      CatalogueHeaderModule,
      CatalogueTableModule,
    ]
})
export class CategoryFourModule {}
