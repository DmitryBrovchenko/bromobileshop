import {NgModule} from '@angular/core';
import {CategoryThreeComponent} from './category-three.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {CatalogueTableModule} from '../../widgets/catalogue-table/catalogue-table.module';
import { CatalogueHeaderModule } from 'src/app/widgets/catalogue-header/catalogue-header.module';

@NgModule({
  declarations: [CategoryThreeComponent],
    imports: [
      CatalogueHeaderModule,
      CatalogueTableModule,
      CommonModule,
      RouterModule,
    ]
})
export class CategoryThreeModule {}
