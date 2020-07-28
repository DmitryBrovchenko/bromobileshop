import {NgModule} from '@angular/core';
import {SortedDataPipe} from './sorted-data.pipe';

@NgModule({
  declarations: [SortedDataPipe],
  exports: [SortedDataPipe]
})
export class SortedDataPipeModule {}
