import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OptionsRoutingModule } from './options-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { UpdateComponent } from './update/update.component';


@NgModule({
  declarations: [UpdateComponent],
  imports: [
    CommonModule,
    OptionsRoutingModule,
    NgbModule,
    FormsModule,
    NgSelectModule
  ]
})
export class OptionsModule { }
