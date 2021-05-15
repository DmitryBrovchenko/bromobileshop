import {Component, Input, OnInit} from '@angular/core';
import {LoginModalService} from 'src/app/widgets/login-modal';
import {AngularFireAuth} from '@angular/fire/auth';
import {DataService} from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() hierarchy;
  search: string;

  constructor(
    public dataService: DataService,
    public loginModalService: LoginModalService,
    public auth: AngularFireAuth,
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
