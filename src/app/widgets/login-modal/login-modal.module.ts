import {NgModule} from '@angular/core';
import {LoginModalComponent} from './login-modal.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzFormModule, NzInputModule} from 'ng-zorro-antd';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [LoginModalComponent],
  exports: [LoginModalComponent],
  imports: [FormsModule, ReactiveFormsModule, NzModalModule, NzButtonModule, NzFormModule, NzInputModule, CommonModule],
})
export class LoginModalModule {}
