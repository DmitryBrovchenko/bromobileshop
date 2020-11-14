import {Pipe, PipeTransform} from '@angular/core';
import {UtilService} from '../../services/util.service';

@Pipe({
  name: 'transliterateArray'
})

export class TransliterateArrayPipe implements PipeTransform {
  constructor(private utilService: UtilService) {}
  transform(arrayPath: Array<string>, startFrom: number): Array<string> {
    return arrayPath.map((path, ind) =>
      startFrom && (ind < startFrom) ? path : this.utilService.transliterate(path));
  }
}
