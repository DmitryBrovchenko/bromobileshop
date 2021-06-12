import {Component, OnInit} from '@angular/core';
import { take } from 'rxjs/operators';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Bromobile shop';
  constructor(public userService: UserService) {
  }
  ngOnInit(): void {
    this.userService.getAuthState().pipe(take(1))
    .subscribe((user) => {
      console.log('User', user);
      if(!user) {
        this.userService.loginGuest().then(() => console.log('Logged in'))
      }
    });
  }
}
