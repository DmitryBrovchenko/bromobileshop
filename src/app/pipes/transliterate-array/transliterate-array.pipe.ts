import {Pipe, PipeTransform} from '@angular/core';
import {DataService} from '../../services/data.service';

@Pipe({
  name: 'transliterateArray'
})

export class TransliterateArrayPipe implements PipeTransform {
  constructor(private dataService: DataService) {}
  transform(arrayPath: Array<string>, startFrom: number): Array<string> {
    return arrayPath.map((path, ind) =>
      startFrom && (ind < startFrom) ? path : this.dataService.transliterate(path));
  }
}
