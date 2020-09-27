import {NgModule} from '@angular/core';
import {LoginModalComponent} from './login-modal.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzInputModule} from 'ng-zorro-antd/input';
import {CommonModule} from '@angular/common';

const ANT_DESIGN_MODULES = [
  NzModalModule, NzButtonModule, NzFormModule, NzInputModule
];

@NgModule({
  declarations: [LoginModalComponent],
  exports: [LoginModalComponent],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, ANT_DESIGN_MODULES],
})
export class LoginModalModule {}
