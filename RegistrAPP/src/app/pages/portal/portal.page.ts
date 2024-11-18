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
  selector: 'app-portal',
  templateUrl: './portal.page.html',
  styleUrls: ['./portal.page.scss'],
})

export class PortalPage implements OnInit {

  horario: any;
  nombreCompleto: string | null = ' ';
  //esta 4 son para el posicionamiento de la api de la geolocalización
  latitud: number = 0;
  longitud: number = 0;
  direccion: string | null = null;
  posicionError: string | null = null;
  map: any; // variable para almacenar el mapa de Leaflet
  userEmail: string = '';

  constructor(
              private router: Router,
              private animationCtrl: AnimationController,
              private menuCtrl: MenuController,
              private authService: AuthService,
              private toastController: ToastController,
              private http: HttpClient,
              private storageService: StorageService,
              private alertController: AlertController,
              private loadingController: LoadingController
  ) { 
    
  }
  registrarAsistencia() {
    this.router.navigate(['/scan-qr']);
  }

  irHorario() {
    this.router.navigate(['/horario']);
  }

  irConfiguracion() {
    this.router.navigate(['/configuracion']);
  }

  irMisAsistencias() {
    this.router.navigate(['/asistencia']);
  }
  /*irLogin(){
    this.router.navigate(['/home']);
  }*/

  async logOut() {
    const loading = await this.showLoading();
    // Aquí puedes implementar la lógica para cerrar sesión, como limpiar tokens, cerrar sesión en un servicio, etc.
    console.log('Sesión cerrada');
    this.authService.logout(); // Cerrar sesión con el servicio de autenticación
    loading.dismiss();
    this.showToastMessage('Haz cerrado tú sesión', 'warning');
    await new Promise(resolve => setTimeout(resolve, 1100));
    // Redireccionar al usuario a la página de inicio de sesión, por ejemplo:
    /*this.router.navigate(['/login']);*/
    this.router.navigate(['/home']);
  }

  ngOnInit() {
    this.requestLocationPermission();

    this.authService.getUser().subscribe(
      async (userData) => {
        console.log('Datos completos del usuario:', userData);
        if (userData && userData.length > 0) {
          const usuario = userData[0]; // Suponiendo que el correo es único
          this.nombreCompleto = usuario.nombreCompleto; // Establecer el nombre del usuario
          const horario = usuario.horario;
  
          if (horario) {
            // Guardar el horario en el Storage
            await this.storageService.set('horario', horario);
            console.log('Horario guardado en el Storage:', horario);
          } else {
            console.warn('El usuario no tiene un horario definido.');
          }
        } else {
          console.error('No se encontraron datos para el usuario autenticado.');
        }
      },
      (error) => {
        console.error('Error al obtener los datos del usuario:', error);
      }
    );

    // Llamar a la función para obtener la geolocalización
    this.getGeolocation();

    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.userEmail = user.email;
      }
    });


  }

    // Función para solicitar permisos y obtener ubicación
    async requestLocationPermission() {
      try {
        // Solicitar permisos de geolocalización
        const permission = await Geolocation.requestPermissions();
        if (permission.location === 'granted') {
          this.getGeolocation();
        } else {
          console.log('Permisos de geolocalización no otorgados');
        }
      } catch (error) {
        console.error('Error solicitando permisos de geolocalización:', error);
      }
    }
  

  async showToastMessage(text: string, msgColor: string) {
    const toast = await this.toastController.create({
       message: text,
       duration: 3000,
       color: msgColor,
       position: 'bottom'
     }) 
     toast.present();
 }

    // Función para obtener la geolocalización precisa usando Capacitor Geolocation
    async getGeolocation() {
      try {
        const coordinates = await Geolocation.getCurrentPosition();
        this.latitud = coordinates.coords.latitude;
        this.longitud = coordinates.coords.longitude;
  
        // Ahora que tenemos las coordenadas, cargar el mapa y obtener la dirección
        this.getDireccion(this.latitud, this.longitud);
        this.loadMap(); // Mover la llamada de cargar el mapa aquí
      } catch (error) {
        this.posicionError = 'No se pudo obtener la ubicación.';
        console.error('Error al obtener la geolocalización:', error);
      }
    }
  
    getDireccion(lat: number, lng: number) {
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`;
      this.http.get(url).subscribe((data: any) => {
        if (data && data.address) {
          this.direccion = `${data.address.road}, ${data.address.city}, ${data.address.country}`;
        } else {
          this.direccion = 'Dirección no encontrada';
        }
      }, error => {
        console.error('Error al obtener la dirección:', error);
        this.direccion = 'Error al obtener la dirección';
      });
    }
  
    loadMap() {
      if (this.latitud && this.longitud) {
        this.map = L.map('map').setView([this.latitud, this.longitud], 13); // Centrar el mapa en las coordenadas
  
        // Cargar la capa de mapa desde OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);
  
        // Añadir un marcador en la posición del usuario
        const marker = L.marker([this.latitud, this.longitud]).addTo(this.map);
        marker.bindPopup('¡Estás aquí!').openPopup();
      }
    }

    async showLoading() {
      const loading = await this.loadingController.create({
        message: 'Cargando...',
        duration: 2000
      });
      await loading.present();
      return loading;
    }


    async guardarLocalizacion() {
      const alert = await this.alertController.create({
        header: 'Confirmar acción',
        message: '¿Estás seguro de que deseas guardar la ubicación actual?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              console.log('Acción cancelada');
            }
          },
          {
            text: 'Confirmar',
            handler: async () => {
              // Código para guardar la ubicación si el usuario confirma
              const ubicacion = {
                latitud: this.latitud,
                longitud: this.longitud,
                direccion: this.direccion,
                fechaHora: new Date().toLocaleString()
              };
              await this.storageService.set(`ubicacion_${this.userEmail}`, ubicacion);
              this.showToastMessage('Última ubicación guardada con éxito', 'tertiary');
            }
          }
        ]
      });
    
      await alert.present();
    }

}
