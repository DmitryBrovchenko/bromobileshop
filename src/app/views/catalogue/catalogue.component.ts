import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit {
  data;
  isLoading = true;
  constructor(public dataService: DataService) {
    dataService.getHierarchy().subscribe(res => {
      this.isLoading = false;
      this.data = res;
    });
  }

  ngOnInit() {}

}
