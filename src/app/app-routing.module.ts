import {NgModule} from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import {CatalogueComponent} from './views/catalogue';
import {ProductComponent} from './views/product';
import {SearchComponent} from './views/search';
import {ErrorPageComponent} from './views/error-page';
import { AuthGuard } from './services/auth.guard';
import {CategoryOneComponent} from './views/category-one';
import {CategoryTwoComponent} from './views/category-two';
import {CategoryThreeComponent} from './views/category-three';
import {CategoryFourComponent} from './views/category-four';


const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'home'},
    {path: 'home', loadChildren: () => import('./views/home').then(m => m.HomeModule)},
    {path: 'catalogue', component: CatalogueComponent},
    {path: 'catalogue/:categoryOne', component: CategoryOneComponent},
    {path: 'catalogue/:categoryOne/:categoryTwo', component: CategoryTwoComponent},
    {path: 'catalogue/:categoryOne/:categoryTwo/:categoryThree', component: CategoryThreeComponent},
    {path: 'catalogue/:categoryOne/:categoryTwo/:categoryThree/:categoryFour', component: CategoryFourComponent},
    {path: 'contacts', loadChildren: () => import('./views/contacts').then(m => m.ContactsModule)},
    {path: 'search', component: SearchComponent},
    {path: 'product/:id', component: ProductComponent},
    {path: 'admin', canActivate: [AuthGuard], loadChildren: () => import('./views/admin').then(m => m.AdminModule)},
    {path: '**', component: ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}