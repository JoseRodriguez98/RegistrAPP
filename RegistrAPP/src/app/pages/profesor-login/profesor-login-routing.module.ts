import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfesorLoginPage } from './profesor-login.page';

const routes: Routes = [
  {
    path: '',
    component: ProfesorLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfesorLoginPageRoutingModule {}
