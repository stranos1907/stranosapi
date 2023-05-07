import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  {
    path: '',
    component: UpdateComponent,
    children: [
      {
        path: '',
        redirectTo: 'update',
        pathMatch: 'full'
      },
      {
        path: 'update',
        component: UpdateComponent
      },


    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OptionsRoutingModule { }
