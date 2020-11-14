import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-sider',
  templateUrl: './sider.component.html',
  styleUrls: ['./sider.component.scss']
})
export class SiderComponent implements OnInit {
  @Input() collapsed: boolean;
  @Input() data: any;
  constructor() { }

  ngOnInit(): void {
  }

}
