import {NgModule} from '@angular/core';
import {HomeComponent} from './home.component';
import {CommonModule} from '@angular/common';
import {NzLayoutModule} from 'ng-zorro-antd';
import {SiderMainModule} from '../../widgets/sider-main/sider-main.module';
import {AngularFireAuthModule} from '@angular/fire/auth';

@NgModule({
  declarations: [HomeComponent],
    imports: [CommonModule, NzLayoutModule, SiderMainModule, AngularFireAuthModule]
})
export class HomeModule {}
