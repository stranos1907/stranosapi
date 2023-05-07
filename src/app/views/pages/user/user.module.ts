import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ListComponent } from './list/list.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateComponent } from './create/create.component';
import { FormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';
import { SendComponent } from './send/send.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { VipComponent } from './vip/vip.component';
import { CreateModComponent } from './createMod/createMod.component';
import { ModsComponent } from './mods/mods.component';
import { EditModComponent } from './editMod/editMod.component';

@NgModule({
  declarations: [
    ListComponent,
    CreateComponent,
    CreateModComponent,
    EditComponent,
    SendComponent,
    ModsComponent,
    VipComponent,
    EditModComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    NgxDatatableModule,
    NgbModule,
    FormsModule,
    NgSelectModule
  ]
})
export class UserModule { }
