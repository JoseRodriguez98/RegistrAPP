import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfesorGenerarQrPageRoutingModule } from './profesor-generar-qr-routing.module';

import { ProfesorGenerarQrPage } from './profesor-generar-qr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfesorGenerarQrPageRoutingModule
  ],
  declarations: [ProfesorGenerarQrPage]
})
export class ProfesorGenerarQrPageModule {}
