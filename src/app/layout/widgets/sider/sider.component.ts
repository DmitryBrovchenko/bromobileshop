import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-pc-sider',
  templateUrl: './sider.component.html',
  styleUrls: ['./sider.component.scss']
})
export class SiderComponent implements OnInit {
  @Input() hierarchy;

  constructor() {
  }

  ngOnInit(): void {
  }

}
