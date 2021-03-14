import {NgModule} from '@angular/core';
import {CatalogueTableComponent} from './catalogue-table.component';
import {CommonModule} from '@angular/common';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzRadioModule} from 'ng-zorro-antd/radio';
import {CardModule} from '../card';
import {SortedDataPipeModule} from '../../pipes/sorted-data';
import {CardTableModule} from '../card-table';

const ANT_DESIGN_MODULES = [
  NzPaginationModule,
  NzGridModule,
  NzDividerModule,
  NzRadioModule,
  NzIconModule
];

@NgModule({
  declarations: [CatalogueTableComponent],
  imports: [CommonModule, CardModule, SortedDataPipeModule, CardTableModule, ANT_DESIGN_MODULES],
  exports: [CatalogueTableComponent],
})
export class CatalogueTableModule {}
