import {Injectable} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';
import {LoginModalComponent} from './login-modal.component';

@Injectable({
  providedIn: 'root'
})

export class LoginModalService {
  constructor(private modalService: NzModalService) {
  }
  openModal() {
    this.modalService.create({
      nzTitle: 'Войти в профиль',
      nzContent: LoginModalComponent
    });
  }
}
