import {Pipe, PipeTransform} from '@angular/core';
import { transliterate } from 'src/app/utils';

@Pipe({
  name: 'transliterateArray'
})

export class TransliterateArrayPipe implements PipeTransform {
  
  transform(arrayPath: Array<string>, startFrom: number): Array<string> {
    return arrayPath.map((path, ind) =>
      startFrom && (ind < startFrom) ? path : transliterate(path));
  }
}
