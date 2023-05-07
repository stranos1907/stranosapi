import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PackageRoutingModule } from './package-routing.module';
import { ListComponent } from './list/list.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateComponent } from './create/create.component';
import { FormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';
import { VipListComponent } from './viplist/viplist.component';


@NgModule({
  declarations: [
    ListComponent,
    CreateComponent,
    EditComponent,
    VipListComponent
  ],
  imports: [
    CommonModule,
    PackageRoutingModule,
    NgxDatatableModule,
    NgbModule,
    FormsModule
  ]
})
export class PackageModule { }
