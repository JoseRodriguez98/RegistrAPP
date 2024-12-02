import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfesorVerAsistenciasPage } from './profesor-ver-asistencias.page';

const routes: Routes = [
  {
    path: '',
    component: ProfesorVerAsistenciasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfesorVerAsistenciasPageRoutingModule {}
