import {Component, Input, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-layout-pc',
  templateUrl: './layout-pc.component.html',
  styleUrls: ['./layout-pc.component.scss']
})
export class LayoutPcComponent implements OnInit {
  @Input() hierarchy;
  constructor() {
  }
  ngOnInit(): void {
  }

}
