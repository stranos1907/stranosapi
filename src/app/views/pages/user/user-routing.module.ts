import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { SendComponent } from './send/send.component';

import { VipComponent } from './vip/vip.component';
import { CreateModComponent } from './createMod/createMod.component';
import { ModsComponent } from './mods/mods.component';
import { EditModComponent } from './editMod/editMod.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: ListComponent
      },
    ]
  },
  {
    path: 'vip',
    component: VipComponent
  },
  {
    path: 'mods',
    component: ModsComponent
  },
  {
    path: 'create',
    component: CreateComponent
  },
  {
    path: 'create-mod',
    component: CreateModComponent
  },
  {
    path: 'edit/:id',
    component: EditComponent
  },
  {
    path: 'edit/mod/:id',
    component: EditModComponent
  },
  {
    path: 'send/:id',
    component: SendComponent
  }

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
