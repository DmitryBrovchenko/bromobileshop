import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchComponent} from './search.component';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {FilterPipe} from '../../pipes/filter.pipe';

@NgModule({
  declarations: [SearchComponent, FilterPipe],
  imports: [CommonModule, RouterModule, FormsModule, AngularFireDatabaseModule]
})
export class SearchModule {
}
