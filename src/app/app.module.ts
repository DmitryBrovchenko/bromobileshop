import { UserService } from 'src/app/services/user.service';
import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
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
import {CheckCircleOutline, ClearOutline, CloseCircleOutline, CloudUploadOutline, DeleteOutline, DeleteRowOutline, EditOutline, FileTextOutline, FilterOutline, LockOutline, MenuOutline, MenuFoldOutline, MenuUnfoldOutline, MoreOutline, PlusCircleOutline, HomeOutline, AppstoreOutline, LoginOutline, LogoutOutline, PictureOutline, PlusSquareOutline, RollbackOutline, UserOutline
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
import { imagesReducer } from './@ngrx/images/images.reducer';
import { ImagesEffects } from './@ngrx/images/images.effects';
import { AppRoutingModule } from './app-routing.module';
import { CatalogueModule } from './views/catalogue';
import { CategoryOneModule } from './views/category-one';
import { CategoryTwoModule } from './views/category-two';
import { CategoryThreeModule } from './views/category-three';
import { CategoryFourModule } from './views/category-four';
import { SearchModule } from './views/search/search.module';
import { ErrorPageModule } from './views/error-page';
import { AdminModule } from './views/admin';
import { ContactsModule } from './views/contacts';
import { BrandsEffects } from './@ngrx/brands/brands.effects';
import { CarouselEffects } from './@ngrx/carousel/carousel.effects';
import { brandsReducer } from './@ngrx/brands/brands.reducer';
import { carouselReducer } from './@ngrx/carousel/carousel.reducer';
import { HomeModule } from './views/home';
import { authInitializer } from './services/auth.initializer';

registerLocaleData(ru);

const icons: IconDefinition[] = [
  CheckCircleOutline,
  ClearOutline,
  CloseCircleOutline,
  CloudUploadOutline,
  DeleteOutline,
  DeleteRowOutline,
  EditOutline,
  FileTextOutline,
  FilterOutline,
  LockOutline, 
  MenuOutline, 
  MenuFoldOutline, 
  MenuUnfoldOutline, 
  MoreOutline,
  PlusCircleOutline,
  PlusSquareOutline,
  HomeOutline, 
  AppstoreOutline, 
  LoginOutline, 
  LogoutOutline, 
  PictureOutline,
  RollbackOutline,
  UserOutline
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    LayoutModule,
    CatalogueModule,
    CategoryOneModule,
    CategoryTwoModule,
    CategoryThreeModule,
    CategoryFourModule,
    ContactsModule,
    HomeModule,
    SearchModule,
    ErrorPageModule,
    AdminModule,
    EffectsModule.forRoot([
      BrandsEffects,
      CarouselEffects,
      HierarchyEffects,
      DictionaryEffects, 
      CatalogueEffects,
      ImagesEffects,
    ]),
    StoreModule.forRoot({
      brands: brandsReducer,
      hierarchy: hierarchyReducer,
      dictionary: dictionaryReducer,
      carousel: carouselReducer,
      catalogue: catalogueReducer,
      images: imagesReducer,
    }),
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzIconModule,
    NzI18nModule,
    RouterModule.forRoot([])
  ],
  providers: [
    { provide: NZ_ICONS, useValue: icons },
    {provide: NZ_I18N, useValue: ru_RU},
    { 
      provide: APP_INITIALIZER,
      useFactory: authInitializer,
      deps: [UserService],
      multi: true 
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
