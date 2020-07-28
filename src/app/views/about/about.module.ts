import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AboutComponent} from './about.component';
import {RouterModule} from '@angular/router';
import {AuthGuard} from '../../services/auth.guard';
import {AboutExtraComponent} from './about-extra';

@NgModule({
  declarations: [AboutComponent, AboutExtraComponent],
  imports: [CommonModule, RouterModule.forChild([
      {
        path: '', component: AboutComponent, canActivateChild: [AuthGuard], children: [
          {path: 'extra', component: AboutExtraComponent}
        ]
      }
    ]
  )],
  exports: [RouterModule]
})
export class AboutModule {
}
