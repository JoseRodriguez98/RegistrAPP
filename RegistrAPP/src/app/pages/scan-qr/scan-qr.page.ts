import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service'; 
import { AuthService } from '../../services/auth.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
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
  isButtonDisabled: boolean = false;

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private toastController: ToastController,
    private router: Router
  ) {}

  async volverPortal() {
    //window.location.href = '/portal'; // Redirige y recarga la página
    this.router.navigate(['/portal']);
  }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.userEmail = user.email;
        this.loadStoredLocation();
        this.checkTimeAndShowToast();
      }
    });
  }

  async loadStoredLocation() {
    this.ubicacion = await this.storageService.get(`ubicacion_${this.userEmail}`);
    console.log('Ubicación cargada desde Storage:', this.ubicacion);
  }

  async presentToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: color
    });
    toast.present();
  }

  checkTimeAndShowToast() {
    const currentTime = new Date();
    const startTime = new Date();
    startTime.setHours(8, 30, 0); // 08:30 hrs
    const endTime = new Date();
    endTime.setHours(18, 50, 0); // 18:50 hrs

    if (currentTime >= startTime && currentTime <= endTime) {
      this.presentToast('Está dentro de un horario permitido', 'success');
      this.isButtonDisabled = false;
    } else {
      this.presentToast('No es posible registrar asistencia en estos horarios', 'danger');
      this.isButtonDisabled = true;
    }
  }
}
