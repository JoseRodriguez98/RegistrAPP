import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service'; 
import { AuthService } from '../../services/auth.service';
import { ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { LensFacing, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
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

  scanResult = '';

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private toastController: ToastController,
    private router: Router,
    private platform: Platform,
    private modalController: ModalController
  ) {}



  async startScan() {
    const modal = await this.modalController.create({
    component: BarcodeScanningModalComponent,
    cssClass: 'barcode-scanning-modal',
    showBackdrop: false,
    componentProps: { 
      formats: [],
      LensFacing: LensFacing.Back
     }
    });
  
    await modal.present();

    const { data } = await modal.onWillDismiss();

    if(data){
      this.scanResult = data?.barcode?.displayValue;
    }
    
  }


  async volverPortal() {
    //window.location.href = '/portal'; // Redirige y recarga la página
    this.router.navigate(['/portal']);
  }

  ngOnInit(): void {
    // Verificar permisos de cámara
    if (this.platform.is('capacitor')) {
      BarcodeScanner.checkPermissions().then((permissionStatus: { camera: string }) => {
        if (permissionStatus.camera !== 'granted') {
          BarcodeScanner.requestPermissions().then(() => {
            console.log('Permisos de cámara otorgados.');
          }).catch((err) => {
            console.error('Error al solicitar permisos:', err);
          });
        }
      }).catch((err) => {
        console.error('Error al verificar permisos:', err);
      });
    }
  
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
}
