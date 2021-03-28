import {Component, Input, OnInit} from '@angular/core';
import {LoginModalService} from 'src/app/widgets/login-modal';
import {AngularFireAuth} from '@angular/fire/auth';
import {DataService} from 'src/app/services/data.service';

@Component({
  selector: 'app-pc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() hierarchy;
  constructor(public dataService: DataService, public loginModalService: LoginModalService, public auth: AngularFireAuth) { }

  ngOnInit(): void {
  }
}
