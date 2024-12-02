import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfesorPortalPage } from './profesor-portal.page';

const routes: Routes = [
  {
    path: '',
    component: ProfesorPortalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfesorPortalPageRoutingModule {}
