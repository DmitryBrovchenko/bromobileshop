import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {CatalogueComponent} from './views/catalogue';
import {ProductComponent} from './views/product';
import {LayoutComponent} from './layout';
import {SearchComponent} from './views/search';
import {HomeComponent} from './views/home';
import {ErrorPageComponent} from './views/error-page';
import {AuthGuard} from './services/auth.guard';
import {CategoryOneComponent} from './views/category-one';
import {CategoryTwoComponent} from './views/category-two';
import {CategoryThreeComponent} from './views/category-three';
import {CategoryFourComponent} from './views/category-four';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: '', component: LayoutComponent, children: [
      {path: 'home', component: HomeComponent},
      {path: 'catalogue', component: CatalogueComponent},
      {path: 'catalogue/:categoryOne', component: CategoryOneComponent},
      {path: 'catalogue/:categoryOne/:categoryTwo', component: CategoryTwoComponent},
      {path: 'catalogue/:categoryOne/:categoryTwo/:categoryThree', component: CategoryThreeComponent},
      {path: 'catalogue/:categoryOne/:categoryTwo/:categoryThree/:categoryFour', component: CategoryFourComponent},
      {path: 'search', component: SearchComponent},
      {path: 'product/:id', component: ProductComponent},
      {
        path: 'about', canActivate: [AuthGuard], data: {title: 'Lalka'},
        loadChildren: () => import('./views/about').then(m => m.AboutModule)
      },
      {path: '**', component: ErrorPageComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
