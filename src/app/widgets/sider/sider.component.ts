import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-sider',
  templateUrl: './sider.component.html',
  styleUrls: ['./sider.component.scss']
})
export class SiderComponent implements OnInit {
  @Input() collapsed: boolean;
  @Input() data: any;
  constructor(public dataService: DataService) { }

  ngOnInit(): void {
  }

}
