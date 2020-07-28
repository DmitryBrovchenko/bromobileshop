import {NgModule} from '@angular/core';
import {ProductComponent} from './product.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [ProductComponent],
  imports: [CommonModule, RouterModule]
})
export class ProductModule {}

