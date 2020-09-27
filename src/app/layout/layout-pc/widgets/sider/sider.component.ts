import {Component, Input, OnInit} from '@angular/core';
import {DataService} from '../../../../services/data.service';

@Component({
  selector: 'app-pc-sider',
  templateUrl: './sider.component.html',
  styleUrls: ['./sider.component.scss']
})
export class SiderComponent implements OnInit {
  @Input() hierarchy;

  constructor(public dataService: DataService) {
  }

  ngOnInit(): void {
  }

}
