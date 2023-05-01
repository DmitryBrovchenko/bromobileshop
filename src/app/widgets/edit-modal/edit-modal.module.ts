import { LetDirectiveModule } from './../../directives/let/let-directive.module';
import { CommonModule } from '@angular/common';
import {NgModule} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzInputModule} from 'ng-zorro-antd/input';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzImageModule } from 'ng-zorro-antd/image';

import { EditModalComponent } from "./edit-modal.component";
import { EditModalService } from './edit-modal.service';
import { GetImagePipeModule } from 'src/app/pipes/get-image/get-image.pipe.module';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { ButtonModule } from '../button';
import { ExecuteWithPipeModule } from 'src/app/pipes/execute-with';

const ANT_DESIGN_MODULES = [
    NzModalModule, NzButtonModule, NzFormModule, NzInputModule, NzUploadModule, NzSelectModule, NzTabsModule, NzGridModule, NzImageModule
]

@NgModule({
    declarations: [EditModalComponent],
    exports: [EditModalComponent],
    imports: [
        CommonModule,
        ButtonModule,
        ExecuteWithPipeModule,
        LetDirectiveModule,
        GetImagePipeModule,
        ReactiveFormsModule,
        ANT_DESIGN_MODULES
    ],
    providers: [EditModalService]
})
export class EditModalModule {}