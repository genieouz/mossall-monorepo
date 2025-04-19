import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CollaboratorsComponent } from './collaborators.component';
import { OverviewComponent } from './components/overview/overview.component';
import { CreateCollobatorComponent } from './components/create-collobator/create-collobator.component';
import { EditCollaboratorComponent } from './components/edit-collaborator/edit-collaborator.component';
import { DetailCollaboratorComponent } from './components/detail-collaborator/detail-collaborator.component';

const routes: Routes = [
  {
    path: '',
    component: CollaboratorsComponent,

    children: [
      {
        path: '',
        component: OverviewComponent,
      },
      {
        path: 'create-collaborator',
        component: CreateCollobatorComponent,
      },
      {
        path: ':id',
        component: EditCollaboratorComponent,
      },
      {
        path: 'details/:id',
        component: DetailCollaboratorComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollaboratorsRoutingModule {}
