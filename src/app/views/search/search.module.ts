import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchComponent} from './search.component';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {FilterPipe} from '../../pipes/filter.pipe';
import { CatalogueTableModule } from 'src/app/widgets/catalogue-table/catalogue-table.module';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  declarations: [SearchComponent, FilterPipe],
  imports: [
    NzPageHeaderModule,
    NzInputModule,
    NzButtonModule,
    CommonModule,
    RouterModule,
    FormsModule,
    CatalogueTableModule
  ]
})
export class SearchModule {
}
