import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: []
})
export class LayoutComponent implements OnInit {
  hierarchy$;
  constructor(private dataService: DataService) {}
  ngOnInit(): void {
    this.hierarchy$ = this.dataService.getHierarchy();
  }

}
