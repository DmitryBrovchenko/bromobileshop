import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuth = false;

  login() {
    this.isAuth = true;
  }

  logout() {
    this.isAuth = false;
  }

  isAuthenticated(): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.isAuth), 1000);
    });
  }
}
