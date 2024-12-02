import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfesorVerCursosPageRoutingModule } from './profesor-ver-cursos-routing.module';

import { ProfesorVerCursosPage } from './profesor-ver-cursos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfesorVerCursosPageRoutingModule
  ],
  declarations: [ProfesorVerCursosPage]
})
export class ProfesorVerCursosPageModule {}
