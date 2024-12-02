import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfesorLoginPageRoutingModule } from './profesor-login-routing.module';

import { ProfesorLoginPage } from './profesor-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfesorLoginPageRoutingModule
  ],
  declarations: [ProfesorLoginPage]
})
export class ProfesorLoginPageModule {}
