import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { NzModalService } from "ng-zorro-antd/modal";
import { switchMap, take } from "rxjs/operators";
import { selectItemsByStructure } from "src/app/@ngrx/dictionary/dictionary.reducer";
import { selectHierarchyNamesL1 } from "src/app/@ngrx/hierarchy/hierarchy.reducer";
import { CatalogueItem } from "src/app/interfaces/catalogue-item.interface";
import { EditModalComponent } from "./edit-modal.component";

@Injectable()
export class EditModalService {
    constructor(
        private modalService: NzModalService, 
        private store: Store,
    ) {}

    openModal(product: CatalogueItem) {
        // Get the list of fitst level categories - fixed list for all products
        this.store.select(selectHierarchyNamesL1).pipe(
            switchMap((structureNames) => this.store.select(selectItemsByStructure(structureNames))),
            take(1)
        ).subscribe(categoryList => {
            this.modalService.create({
                nzTitle: `Редактировать ${product.Name}`,
                nzContent: EditModalComponent,
                nzComponentParams: { product, categoryList },
                nzCancelText: 'Отмена',
                nzWidth: 720,
            });
        });
    }
}