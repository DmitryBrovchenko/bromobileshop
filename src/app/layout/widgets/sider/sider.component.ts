import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import { HierarchyItem } from 'src/app/interfaces/hierarchy-item.interface';
import { Nullable } from 'src/app/interfaces/nullable';

@Component({
  selector: 'app-pc-sider',
  templateUrl: './sider.component.html',
  styleUrls: ['./sider.component.scss']
})
export class SiderComponent {
  @Input() hierarchy: Nullable<HierarchyItem[]>;

  @Output()
  collapsed = new EventEmitter<void>();

  @HostListener('click', ['$event']) onClick(event) {
    if (event.target.tagName.toLowerCase() === 'a') {
      this.collapsed.emit();
    }
  }

  joinPath = (basePath: string[], subPath: string) => [...basePath, subPath];

}
