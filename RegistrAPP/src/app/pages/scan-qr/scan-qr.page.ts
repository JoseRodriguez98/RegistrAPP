import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service'; 
import { AuthService } from '../../services/auth.service';
import { ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { LensFacing } from '@capacitor-mlkit/barcode-scanning';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Browser } from '@capacitor/browser';
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

  scannedData: any;

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private toastController: ToastController,
    private router: Router,
    private platform: Platform,
    private modalController: ModalController
  ) {}






  async volverPortal() {
    //window.location.href = '/portal'; // Redirige y recarga la página
    this.router.navigate(['/portal']);
  }

  ngOnInit(): void {
    // Verificar permisos de cámara
  
    // Obtener información del usuario actual
    this.authService.getCurrentUser().subscribe((user: { email: string } | null) => {
      if (user) {
        console.log('Usuario autenticado:', user);
        this.userEmail = user.email;
        this.loadStoredLocation();
        this.checkTimeAndShowToast();
      } else {
        console.warn('No se encontró un usuario autenticado.');
      }
    }, (err) => {
      console.error('Error al obtener usuario:', err);
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
    startTime.setHours(4, 30, 0); // 08:30 hrs -> startTime.setHours(8, 30, 0);
    const endTime = new Date();
    endTime.setHours(18, 50, 0); // 18:50 hrs -> endTime.setHours(18, 50, 0);

    if (currentTime >= startTime && currentTime <= endTime) {
      this.presentToast('Está dentro de un horario permitido', 'success');
      this.isButtonDisabled = false;
    } else {
      this.presentToast('No es posible registrar asistencia en estos horarios', 'danger');
      this.isButtonDisabled = true;
    }
  }



///////
scanQRCode() {
  BarcodeScanner.checkPermission({ force: true }).then((status) => {
    if (status.granted) {
      BarcodeScanner.hideBackground(); // Oculta el fondo durante el escaneo
      BarcodeScanner.startScan().then(async (result) => {
        BarcodeScanner.showBackground(); // Vuelve a mostrar el fondo después del escaneo
        if (result.hasContent) {
          let url = result.content.trim();
          if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url; // Asegura que tenga un esquema válido
          }
          await Browser.open({ url }); // Abre el navegador con el URL
        } else {
          console.log('No se encontró contenido en el código QR.');
        }
      }).catch((err) => {
        console.error('Error al escanear QR:', err);
        BarcodeScanner.showBackground();
      });
    } else {
      console.log('Permiso denegado para usar la cámara.');
    }
});
}
///////

}