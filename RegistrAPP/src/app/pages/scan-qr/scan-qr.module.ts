import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScanQrPageRoutingModule } from './scan-qr-routing.module';

import { ScanQrPage } from './scan-qr.page';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScanQrPageRoutingModule
  ],
  declarations: [ScanQrPage, BarcodeScanningModalComponent]
})
export class ScanQrPageModule {}
