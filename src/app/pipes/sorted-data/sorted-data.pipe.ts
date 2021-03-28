import {Pipe, PipeTransform} from '@angular/core';
import {PageParamsInterface} from '../../interfaces/page-params.interface';
import {DataService} from '../../services/data.service';
import {CatalogueItem} from '../../interfaces/catalogue-item.interface';

@Pipe({
  name: 'sortData'
})
export class SortedDataPipe implements PipeTransform {
  constructor(private dataService: DataService) {}
  transform(data: CatalogueItem[], queryParams: PageParamsInterface): CatalogueItem[] {
    const params: PageParamsInterface = {...this.dataService.defaultParams, ...queryParams};
    const sortedData = data.sort((a, b) =>
      params.sort === 'Name' ? a[params.sort] > b[params.sort] ? 1 : -1
        : b[params.sort] > a[params.sort] ? 1 : -1);
    return sortedData.filter((d, i) =>
      (i >= (params.page - 1) * params.show) && (i < params.page * params.show)
    );
  }
}
