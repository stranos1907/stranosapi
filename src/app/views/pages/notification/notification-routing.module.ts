import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SendComponent } from './send/send.component';

const routes: Routes = [
  {
    path: '',
    component: SendComponent,
    children: [
      {
        path: '',
        redirectTo: 'send',
        pathMatch: 'full'
      },
      {
        path: 'send',
        component: SendComponent
      },


    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule { }
