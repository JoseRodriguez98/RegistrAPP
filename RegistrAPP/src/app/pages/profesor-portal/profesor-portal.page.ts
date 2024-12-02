import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController} from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { ToastController, LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http'; // Importar HttpClient
import * as L from 'leaflet'; // Importar Leaflet
import { Geolocation } from '@capacitor/geolocation'; // Importar Capacitor Geolocation
import { StorageService } from '../../services/storage.service'; 
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-profesor-portal',
  templateUrl: './profesor-portal.page.html',
  styleUrls: ['./profesor-portal.page.scss'],
})
export class ProfesorPortalPage  {

  constructor(private router: Router) { }

  volverLogin() {
    this.router.navigate(['/profesor-login']); 
  
  }

  misCursos() {
    this.router.navigate(['/profesor-ver-cursos']); 
  }

  generarQR() {
    this.router.navigate(['/profesor-generar-qr']); 
  }

  verAsistencias() {
    this.router.navigate(['/profesor-ver-asistencia']); 
  }

  

}
