import {NgModule} from '@angular/core';
import {SiderComponent} from './sider.component';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {TransliterateArrayPipeModule} from '../../pipes/transliterate-array';

@NgModule({
  declarations: [SiderComponent],
    imports: [NzLayoutModule, NzMenuModule, CommonModule, RouterModule, TransliterateArrayPipeModule],
  exports: [SiderComponent]
})
export class SiderModule {}
