import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireDatabaseModule} from '@angular/fire/compat/database';
import {AppComponent} from './app.component';
import {environment} from '../environments/environment';
import {FormsModule} from '@angular/forms';
import {LayoutModule} from './layout';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';
import {NzI18nModule, NZ_I18N, ru_RU} from 'ng-zorro-antd/i18n';
import { IconDefinition } from '@ant-design/icons-angular';
import {LockOutline, MenuOutline, MenuFoldOutline, MenuUnfoldOutline, HomeOutline, AppstoreOutline, UserOutline
} from '@ant-design/icons-angular/icons';
import ru from '@angular/common/locales/ru';
import {registerLocaleData} from '@angular/common';
import {AngularFireStorageModule} from '@angular/fire/compat/storage';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import {StoreModule} from '@ngrx/store';
import {hierarchyReducer} from './@ngrx/hierarchy/hierarchy.reducer';
import {EffectsModule} from '@ngrx/effects';
import {HierarchyEffects} from './@ngrx/hierarchy/hierarchy.effects';
import {RouterModule} from '@angular/router';
import {dictionaryReducer} from './@ngrx/dictionary/dictionary.reducer';
import {DictionaryEffects} from './@ngrx/dictionary/dictionary.effects';
import { CatalogueEffects } from './@ngrx/catalogue/catalogue.effects';
import { catalogueReducer } from './@ngrx/catalogue/catalogue.reducer';

registerLocaleData(ru);

const icons: IconDefinition[] = [LockOutline, MenuOutline, MenuFoldOutline, MenuUnfoldOutline, HomeOutline, AppstoreOutline, UserOutline];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    EffectsModule.forRoot([HierarchyEffects, DictionaryEffects, CatalogueEffects]),
    StoreModule.forRoot({hierarchy: hierarchyReducer, dictionary: dictionaryReducer, catalogue: catalogueReducer}),
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
    NzI18nModule,
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
