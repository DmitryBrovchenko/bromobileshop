import {Component, Input, OnInit} from '@angular/core';
import {LoginModalService} from 'src/app/widgets/login-modal';
import {DataService} from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-pc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() hierarchy;
  search: string;

  get userTooltip(): string {
    return this.userService.userName 
    ? `Выполнен вход как ${this.userService.userName}`
    : 'Войти в профиль'
  }

  constructor(
    public dataService: DataService,
    public loginModalService: LoginModalService,
    public userService: UserService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  doSearch(criteria: string) {
    if (criteria) {
      this.router.navigate(['/search'], 
      {
        queryParams: {criteria}
      });
    }
  }
}
