import {Pipe, PipeTransform} from '@angular/core';
import {PageParamsInterface} from '../../interfaces/page-params.interface';
import {DataService} from '../../services/data.service';

@Pipe({
  name: 'sortData'
})
export class SortedDataPipe implements PipeTransform {
  constructor(private dataService: DataService) {}
  transform(data: any, queryParams: PageParamsInterface): any {
    const params: PageParamsInterface = {...this.dataService.defaultParams, ...queryParams};
    console.log('Sorted!', params.sort);
    const sortedData = data.sort((a, b) =>
      params.sort === 'Name' ? a[params.sort] > b[params.sort] ? 1 : -1
        : b[params.sort] > a[params.sort] ? 1 : -1);
    return sortedData.filter((d, i) =>
      (i >= (params.page - 1) * params.show) && (i < params.page * params.show)
    );
  }
}
