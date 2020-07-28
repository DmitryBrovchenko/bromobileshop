import {NgModule} from '@angular/core';
import {CatalogueComponent} from './catalogue.component';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {StylesDirective} from '../../directives/styles.directive';
import {NgZorroAntdModule, NzGridModule} from 'ng-zorro-antd';

@NgModule({
  declarations: [CatalogueComponent, StylesDirective],
  imports: [CommonModule, AngularFireDatabaseModule, FormsModule, NzGridModule, RouterModule, NgZorroAntdModule]
})
export class CatalogueModule {}
