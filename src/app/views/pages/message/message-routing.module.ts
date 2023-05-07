import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { ListComponent } from './list/list.component';
import { ListTemplateComponent } from './list-template/listtemplate.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';


const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    children: [
      {
        path: '',
        redirectTo: 'dialogs',
        pathMatch: 'full'
      },
      {
        path: 'dialogs',
        component: ListComponent
      }
    ]
  },
  {
    path: 'add-template',
    component: CreateComponent,
  },
  {
    path: 'edit-template/:id',
    component: EditComponent,
  },
  {
    path: 'chat/:id',
    component: ChatComponent,
    children: []
  },
  {
    path: 'templates',
    component: ListTemplateComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessageRoutingModule { }
