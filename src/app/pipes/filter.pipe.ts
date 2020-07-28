import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(products: any[], search: string = ''): any[] {
    if (!search.trim()) {
      return products;
    }
    return products.filter(product => product.content.toLowerCase().includes(search.toLowerCase()));
  }

}
