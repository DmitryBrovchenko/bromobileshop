import {NgModule} from '@angular/core';
import {CatalogueComponent} from './catalogue.component';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {StylesDirective} from '../../directives/styles.directive';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {TransliterateArrayPipeModule} from '../../pipes/transliterate-array';

@NgModule({
  declarations: [CatalogueComponent, StylesDirective],
    imports: [CommonModule, AngularFireDatabaseModule, FormsModule, NzGridModule, RouterModule, TransliterateArrayPipeModule]
})
export class CatalogueModule {}
