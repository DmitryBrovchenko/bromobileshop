import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() name;
  @Input() price;
  @Input() id;
  @Input() editable: boolean = false;
  constructor() {

  }

  ngOnInit(): void {
  }

}
