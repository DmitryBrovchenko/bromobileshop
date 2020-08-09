import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';

import {AppComponent} from './app.component';
import {environment} from '../environments/environment';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {LayoutModule} from './layout';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CatalogueModule} from './views/catalogue';
import {ErrorPageModule} from './views/error-page';
import {SearchModule} from './views/search/search.module';
import {NZ_I18N, NZ_ICONS, NzIconModule, ru_RU} from 'ng-zorro-antd';
import { IconDefinition } from '@ant-design/icons-angular';
import {LockOutline, MenuOutline, MenuFoldOutline, MenuUnfoldOutline, HomeOutline, AppstoreOutline, UserOutline
} from '@ant-design/icons-angular/icons';
import {HomeModule} from './views/home/home.module';
import {CategoryOneModule} from './views/category-one';
import ru from '@angular/common/locales/ru';
import {registerLocaleData} from '@angular/common';
import {CategoryTwoModule} from './views/category-two';
import {CategoryThreeModule} from './views/category-three';
import {CategoryFourModule} from './views/category-four';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireAuthModule} from '@angular/fire/auth';

registerLocaleData(ru);

const icons: IconDefinition[] = [LockOutline, MenuOutline, MenuFoldOutline, MenuUnfoldOutline, HomeOutline, AppstoreOutline, UserOutline];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    HomeModule,
    CatalogueModule,
    CategoryOneModule,
    CategoryTwoModule,
    CategoryThreeModule,
    CategoryFourModule,
    SearchModule,
    ErrorPageModule,
    NzIconModule
  ],
  providers: [
    { provide: NZ_ICONS, useValue: icons },
    {provide: NZ_I18N, useValue: ru_RU},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
