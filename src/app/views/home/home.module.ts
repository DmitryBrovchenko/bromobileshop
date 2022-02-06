import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzToolTipModule } from "ng-zorro-antd/tooltip";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";

@NgModule({
    declarations: [HomeComponent],
    exports: [HomeComponent],
    imports: [
        CommonModule,
        HomeRoutingModule, 
        NzCardModule, 
        NzCarouselModule,
        NzToolTipModule,
        StoreModule
    ]
})
export class HomeModule {}