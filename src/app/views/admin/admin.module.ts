import {AdminComponent} from './admin.component';
import {NgModule} from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown'
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AdminContentTableComponent } from './admin-content-table/admin-content-table.component';
import { AdminHomePageComponent } from './admin-home-page/admin-home-page.component';
import { NzMenuModule } from 'ng-zorro-antd/menu';

const ANT_DESIGN_MODULES = [
  NzTableModule,
  NzAutocompleteModule,
  NzButtonModule, 
  NzDropDownModule, 
  NzIconModule, 
  NzInputModule, 
  NzMenuModule,
  NzSelectModule, 
  NzPopconfirmModule, 
  NzPopoverModule
]

@NgModule({
  declarations: [AdminComponent, AdminContentTableComponent, AdminHomePageComponent],
  imports: [AdminRoutingModule, CommonModule, FlexLayoutModule, FormsModule, ANT_DESIGN_MODULES]
})
export class AdminModule {}
