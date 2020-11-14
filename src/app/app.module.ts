import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AppComponent} from './app.component';
import {environment} from '../environments/environment';
import {FormsModule} from '@angular/forms';
import {LayoutModule} from './layout';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CatalogueModule} from './views/catalogue';
import {ErrorPageModule} from './views/error-page';
import {SearchModule} from './views/search/search.module';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';
import {NZ_I18N, ru_RU} from 'ng-zorro-antd/i18n';
import { IconDefinition } from '@ant-design/icons-angular';
import {LockOutline, MenuOutline, MenuFoldOutline, MenuUnfoldOutline, HomeOutline, AppstoreOutline, UserOutline
} from '@ant-design/icons-angular/icons';
import {CategoryOneModule} from './views/category-one';
import ru from '@angular/common/locales/ru';
import {registerLocaleData} from '@angular/common';
import {CategoryTwoModule} from './views/category-two';
import {CategoryThreeModule} from './views/category-three';
import {CategoryFourModule} from './views/category-four';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireAuthModule} from '@angular/fire/auth';
import { AdminModule } from './views/admin';
import {StoreModule} from '@ngrx/store';
import {appReducer} from './@ngrx/app.reducer';
import {EffectsModule} from '@ngrx/effects';
import {AppEffects} from './@ngrx/app.effects';
import {RouterModule} from '@angular/router';

registerLocaleData(ru);

const icons: IconDefinition[] = [LockOutline, MenuOutline, MenuFoldOutline, MenuUnfoldOutline, HomeOutline, AppstoreOutline, UserOutline];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    EffectsModule.forRoot([AppEffects]),
    StoreModule.forRoot({hierarchy: appReducer}),
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    NzIconModule,
    RouterModule.forRoot([])
  ],
  providers: [
    { provide: NZ_ICONS, useValue: icons },
    {provide: NZ_I18N, useValue: ru_RU},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
