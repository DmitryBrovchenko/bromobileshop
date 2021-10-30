import { Component, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  @Input()
  hierarchy;

  @ViewChild('sider', {static: true})
  siderComponent;

  isCollapsed = false;
  constructor() {
  }
  
  collapseSider() {
    if (this.siderComponent.matchBreakPoint) {
      this.isCollapsed = true;
    }
  }

}
