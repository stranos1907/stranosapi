import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HobbyRoutingModule } from './hobby-routing.module';
import { ListComponent } from './list/list.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateComponent } from './create/create.component';
import { FormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [
    ListComponent,
    CreateComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    HobbyRoutingModule,
    NgxDatatableModule,
    NgbModule,
    FormsModule
  ]
})
export class HobbyModule { }
