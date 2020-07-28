import {Component, Input, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-sider-main',
  templateUrl: './sider-main.component.html',
  styleUrls: ['./sider-main.component.scss']
})
export class SiderMainComponent implements OnInit {
  @Input() data: any;
  @Input() collapsed: boolean;
  constructor(public dataService: DataService) { }

  ngOnInit(): void {
  }

}
