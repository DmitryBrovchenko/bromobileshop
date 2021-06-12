import {Component, OnInit} from '@angular/core';
import {NzModalRef} from 'ng-zorro-antd/modal';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {
  credentials: FormGroup;
  error = false;
  errorMessage;
  constructor(private modal: NzModalRef, private userService: UserService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.credentials = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  destroyModal(): void {
    this.modal.destroy();
  }
  login(): void {
    if (this.credentials.valid) {
      this.error = false;
      this.userService.login(this.credentials.value.email, this.credentials.value.password)
        .catch(() => {
          this.error = true;
          this.errorMessage = 'Пользователь с указанными данными не был найден';
        })
        .then(() => {if (!this.error) {this.modal.destroy(); }});
    }
  }
}
