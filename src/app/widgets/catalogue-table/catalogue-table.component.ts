import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CatalogueItem} from '../../interfaces/catalogue-item.interface';

@Component({
  selector: 'app-catalogue-table',
  templateUrl: './catalogue-table.component.html',
  styleUrls: ['./catalogue-table.component.scss'],
})
export class CatalogueTableComponent {
  @Input()
  data: CatalogueItem[];

  @Input()
  params: any;

  @Output()
  typeChanged = new EventEmitter<string>();

  @Output()
  sortChanged = new EventEmitter<string>();

  @Output()
  pageChanged = new EventEmitter<number>();

  @Output()
  sizeChanged = new EventEmitter<number>();
}
