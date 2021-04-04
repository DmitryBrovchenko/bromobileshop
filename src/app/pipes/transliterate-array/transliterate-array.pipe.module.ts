import {NgModule} from '@angular/core';
import {TransliterateArrayPipe} from './transliterate-array.pipe';

@NgModule({
  providers: [TransliterateArrayPipe],
  declarations: [TransliterateArrayPipe],
  exports: [TransliterateArrayPipe],
})

export class TransliterateArrayPipeModule {}
