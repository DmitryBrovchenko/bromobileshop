import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  data;
  isLoading = true;
  constructor(public dataService: DataService) {
    dataService.getHierarchy().subscribe(result => {
      this.data = result;
      this.isLoading = false;
    });
  }

  ngOnInit(): void {
  }

}
