import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/data.service';
import {LoginModalService} from '../widgets/login-modal';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
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
