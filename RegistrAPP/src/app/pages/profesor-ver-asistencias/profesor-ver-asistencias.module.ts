import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfesorVerAsistenciasPageRoutingModule } from './profesor-ver-asistencias-routing.module';

import { ProfesorVerAsistenciasPage } from './profesor-ver-asistencias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfesorVerAsistenciasPageRoutingModule
  ],
  declarations: [ProfesorVerAsistenciasPage]
})
export class ProfesorVerAsistenciasPageModule {}
