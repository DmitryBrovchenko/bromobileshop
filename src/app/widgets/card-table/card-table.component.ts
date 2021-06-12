import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card-table',
  templateUrl: './card-table.component.html',
  styleUrls: ['./card-table.component.scss']
})
export class CardTableComponent implements OnInit {
  @Input() name: string;
  @Input() price: number;
  @Input() id: string;
  @Input() editable: boolean = false;

  ngOnInit(): void {
  }

}
