import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service'; 
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.page.html',
  styleUrls: ['./scan-qr.page.scss'],
})
export class ScanQrPage implements OnInit {

  ubicacion: any = {
    latitud: null,
    longitud: null,
    direccion: null,
    fechaHora: null
  };
  userEmail: string = '';

  constructor(
    private storageService: StorageService,
    private authService: AuthService
  ) {

   }

  async volverPortal() {
    window.location.href = '/portal'; // Redirige y recarga la página
  }
  ngOnInit() {
    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.userEmail = user.email;
        this.loadStoredLocation();
      }
    });
  }

  async loadStoredLocation() {
    this.ubicacion = await this.storageService.get(`ubicacion_${this.userEmail}`);
    console.log('Ubicación cargada desde Storage:', this.ubicacion);
  }

}
