import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageData } from 'src/app/interfaces/source-data.interface';
import { UtilService } from 'src/app/services/util.service';

const LEVELS = ['One', 'Two', 'Three', 'Four']; 

@Component({
  selector: 'app-catalogue-header',
  templateUrl: './catalogue-header.component.html',
  styleUrls: ['./catalogue-header.component.scss']
})
export class CatalogueHeaderComponent implements OnChanges {
  @Input()
  pageData: PageData = null;

  @Input()
  hierarchyLevel = 1;

  currentPage: string = '';
  isBottomLevel: boolean = false;
  routes: {
    name: string,
    routePath: string[]
  }[] = [];

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public utilService: UtilService,
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.pageData.currentValue) {
      this.currentPage = this.pageData[`category${LEVELS[this.hierarchyLevel - 1]}`];
      this.isBottomLevel = !this.pageData.hierarchy?.children?.[0] || this.pageData.hierarchy.children[0].name ==='';
      
      this.routes = [];
      const routePath = ['/catalogue'];
      this.routes.push({
        name: 'Каталог',
        routePath: [...routePath],
      });
      for (let i = 0; i <= this.hierarchyLevel - 2; ++i) {
        routePath.push(this.pageData[`category${LEVELS[i]}Source`]);
        this.routes.push({
          name: this.pageData[`category${LEVELS[i]}`],
          routePath: [...routePath],
        });
      }
    }
  }

  trackByName(index: number, item: {name: string, route: string[]}) {
    return item.name;
  }

}
