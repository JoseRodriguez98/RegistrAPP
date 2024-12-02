import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfesorVerCursosPage } from './profesor-ver-cursos.page';

const routes: Routes = [
  {
    path: '',
    component: ProfesorVerCursosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfesorVerCursosPageRoutingModule {}
