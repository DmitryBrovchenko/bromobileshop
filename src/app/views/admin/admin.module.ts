import { BrandEditModule } from './widgets/brand-edit';
import { CarouselEditModule } from './widgets/carousel-edit';
import { NzFormModule } from 'ng-zorro-antd/form';
import {AdminComponent} from './admin.component';
import {NgModule} from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown'
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AdminContentTableComponent } from './admin-content-table/admin-content-table.component';
import { AdminHomePageComponent } from './admin-home-page/admin-home-page.component';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { AdminEditCarouselComponent } from './admin-edit-carousel/admin-edit-carousel.component';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { AdminEditBrandsComponent } from './admin-edit-brands/admin-edit-brands.component';

const ANT_DESIGN_MODULES = [
  NzTableModule,
  NzAutocompleteModule,
  NzButtonModule, 
  NzDividerModule,
  NzDropDownModule, 
  NzFormModule,
  NzIconModule, 
  NzImageModule,
  NzInputModule, 
  NzListModule,
  NzMenuModule,
  NzSelectModule, 
  NzPopconfirmModule, 
  NzPopoverModule
]

@NgModule({
  declarations: [AdminComponent, AdminContentTableComponent, AdminHomePageComponent, AdminEditBrandsComponent, AdminEditCarouselComponent],
  imports: [AdminRoutingModule, BrandEditModule, CarouselEditModule, CommonModule, FlexLayoutModule, FormsModule, ReactiveFormsModule, ANT_DESIGN_MODULES]
})
export class AdminModule {}
