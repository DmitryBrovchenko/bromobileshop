import {Component, Input, OnInit} from '@angular/core';
import { CatalogueItem } from 'src/app/interfaces/catalogue-item.interface';
import { EditModalService } from '../edit-modal/edit-modal.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() product: CatalogueItem;
  @Input() editable: boolean = false;

  productDescription: string;
  
  constructor(public editModalService: EditModalService) {
  }

  ngOnInit(): void {
    this.productDescription = this.product?.Quantity ? `Цена: ${this.product.Price}р` : 'Нет в наличии';
  }

}
