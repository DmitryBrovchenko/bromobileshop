import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AngularYandexMapsModule, YaConfig } from "angular8-yandex-maps";
import { ContactsRoutingModule } from "./contacts-routing.module";
import { ContactsComponent } from "./contacts.component";

const MAP_CONFIG: YaConfig = {
    apikey: 'f213c1f8-1d7b-4e8c-b27a-589fb8e42cce',
    lang: 'ru_RU'
};

@NgModule({
    declarations: [ContactsComponent],
    exports: [ContactsComponent],
    imports: [
        CommonModule,
        ContactsRoutingModule,
        AngularYandexMapsModule.forRoot(MAP_CONFIG)
    ]
})
export class ContactsModule {}