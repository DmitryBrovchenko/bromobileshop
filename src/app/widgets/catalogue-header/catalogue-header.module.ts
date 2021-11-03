import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NzBreadCrumbModule } from "ng-zorro-antd/breadcrumb";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
import { CatalogueHeaderComponent } from "./catalogue-header.component";

const ANT_DESIGN_MODULES = [
    NzIconModule,
    NzBreadCrumbModule,
    NzDropDownModule,
    NzPageHeaderModule
];

@NgModule({
    declarations: [CatalogueHeaderComponent],
    imports: [CommonModule, RouterModule, ANT_DESIGN_MODULES],
    exports: [CatalogueHeaderComponent]
})
export class CatalogueHeaderModule {}