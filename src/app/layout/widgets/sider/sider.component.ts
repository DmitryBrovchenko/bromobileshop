import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pc-sider',
  templateUrl: './sider.component.html',
  styleUrls: ['./sider.component.scss']
})
export class SiderComponent implements OnInit {
  @Input() hierarchy;

  @Output()
  collapsed = new EventEmitter<void>();

  @HostListener('click', ['$event']) onClick(event) {
    if (event.target.tagName.toLowerCase() === 'a') {
      this.collapsed.emit();
    }
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
