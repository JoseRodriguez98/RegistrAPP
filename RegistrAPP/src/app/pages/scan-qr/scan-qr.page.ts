import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.page.html',
  styleUrls: ['./scan-qr.page.scss'],
})
export class ScanQrPage implements OnInit {

  constructor() { }

  async volverPortal() {
    window.location.href = '/portal'; // Redirige y recarga la página
  }
  ngOnInit() {
  }

}
