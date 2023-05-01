import {Component, EventEmitter, Input, Output} from '@angular/core';
import { PageParamsInterface } from 'src/app/interfaces/page-params.interface';
import { UserService } from 'src/app/services/user.service';
import {CatalogueItem} from '../../interfaces/catalogue-item.interface';
import { Nullable } from 'src/app/interfaces/nullable';

@Component({
  selector: 'app-catalogue-table',
  templateUrl: './catalogue-table.component.html',
  styleUrls: ['./catalogue-table.component.scss'],
})
export class CatalogueTableComponent {
  @Input()
  data: CatalogueItem[];

  @Input()
  params: PageParamsInterface;

  @Output()
  typeChanged = new EventEmitter<string>();

  @Output()
  sortChanged = new EventEmitter<string>();

  @Output()
  pageChanged = new EventEmitter<number>();

  @Output()
  sizeChanged = new EventEmitter<number>();

  type;

  getType = (params: Nullable<PageParamsInterface>) => this.type = params?.type || 'tile';

  constructor(public userService: UserService) {}
}
