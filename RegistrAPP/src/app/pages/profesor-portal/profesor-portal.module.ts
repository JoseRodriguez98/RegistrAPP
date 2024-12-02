import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfesorPortalPageRoutingModule } from './profesor-portal-routing.module';

import { ProfesorPortalPage } from './profesor-portal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfesorPortalPageRoutingModule
  ],
  declarations: [ProfesorPortalPage]
})
export class ProfesorPortalPageModule {}
