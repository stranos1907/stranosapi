import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SendComponent } from './send/send.component';


@NgModule({
  declarations: [SendComponent],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    NgbModule,
    FormsModule,
    NgSelectModule
  ]
})
export class NotificationModule { }
