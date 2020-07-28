import {NgModule} from '@angular/core';
import {ErrorPageComponent} from './error-page.component';
import {RouterModule} from '@angular/router';
import {NzLayoutModule} from 'ng-zorro-antd';

@NgModule({
  declarations: [ErrorPageComponent],
    imports: [RouterModule, NzLayoutModule]
})
export class ErrorPageModule {}
