import {Component, Input, OnInit} from '@angular/core';
import {DataService} from 'src/app/services/data.service';
import {LoginModalService} from 'src/app/widgets/login-modal';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-pc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  hierarchy$;
  constructor(public dataService: DataService, public loginModalService: LoginModalService, public auth: AngularFireAuth) { }

  ngOnInit(): void {
    this.hierarchy$ = this.dataService.getHierarchy();
  }

}
