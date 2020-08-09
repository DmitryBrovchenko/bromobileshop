import {Component, OnInit} from '@angular/core';
import {NzModalRef} from 'ng-zorro-antd/modal';
import {AngularFireAuth} from '@angular/fire/auth';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {
  credentials: FormGroup;
  error = false;
  errorMessage;
  constructor(private modal: NzModalRef, private auth: AngularFireAuth, private fb: FormBuilder) {}

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
      this.auth.auth.signInWithEmailAndPassword(this.credentials.value.email, this.credentials.value.password)
        .catch(() => {
          this.error = true;
          this.errorMessage = 'Пользователь с указанными данными не был найден';
        })
        .then(() => {if (!this.error) {this.modal.destroy(); }});
    }
  }
}
