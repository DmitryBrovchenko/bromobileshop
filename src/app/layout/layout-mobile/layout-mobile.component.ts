import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import {LoginModalService} from '../../widgets/login-modal';

@Component({
  selector: 'app-layout-mobile',
  templateUrl: './layout-mobile.component.html',
  styleUrls: ['./layout-mobile.component.scss']
})
export class LayoutMobileComponent implements OnInit {
  data;
  isLoading = true;
  constructor(public dataService: DataService, public loginModalService: LoginModalService) {
    dataService.getHierarchy().subscribe(result => {
      this.data = result;
      this.isLoading = false;
    });
  }
  ngOnInit(): void {
  }

}
