import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PackageRoutingModule } from './payment-routing.module';
import { ListComponent } from './list/list.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { VipPaymentsComponent } from './vippayments/list.component';


@NgModule({
  declarations: [
    ListComponent,
    VipPaymentsComponent
  ],
  imports: [
    CommonModule,
    PackageRoutingModule,
    NgxDatatableModule,
    NgbModule,
    FormsModule
  ]
})
export class PaymentModule { }
