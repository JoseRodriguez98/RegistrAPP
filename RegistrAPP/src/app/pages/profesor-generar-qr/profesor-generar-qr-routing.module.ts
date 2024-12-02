import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfesorGenerarQrPage } from './profesor-generar-qr.page';

const routes: Routes = [
  {
    path: '',
    component: ProfesorGenerarQrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfesorGenerarQrPageRoutingModule {}
