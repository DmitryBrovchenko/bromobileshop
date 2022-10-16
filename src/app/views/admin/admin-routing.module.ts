import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminContentTableComponent } from "./admin-content-table/admin-content-table.component";
import { AdminHomePageComponent } from "./admin-home-page/admin-home-page.component";
import { AdminComponent } from "./admin.component";

const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'content'},
    {
        path: '', 
        component: AdminComponent,
        children: [
            { path: 'content', component: AdminContentTableComponent },
            { path: 'home', component: AdminHomePageComponent }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {}