import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service'; //importamos el servicio de autenticación
import { AnimationController} from '@ionic/angular';
import { MenuController } from '@ionic/angular';

import { HttpClient } from '@angular/common/http'; // Importar HttpClient
import * as L from 'leaflet'; // Importar Leaflet
import { Geolocation } from '@capacitor/geolocation'; // Importar Capacitor Geolocation
import { StorageService } from '../services/storage.service'; 
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  //dejamos password sin definir para usarlos a conveniencia, serán declarados dentro del if las validaciones
  tituloSuperior: string;
  tituloInferior: string;
  mensajeBienvenida: string;
  mensajeCredenciales: string;
  mensajeDeBienvenidaNombre!: string;
  correo: string = '';
  password: string = '';
  tipo = '';

 
  
  constructor(
    private router: Router,
    private animationCtrl: AnimationController,
    private menuCtrl: MenuController,
    private authService: AuthService,
    private toastController: ToastController,
    private http: HttpClient,
    private storageService: StorageService,
    private alertController: AlertController,
    private loadingController: LoadingController)
   {
    this.tituloSuperior = 'RegistrAPP';
    this.tituloInferior = 'DuocUC - Sede San Joaquín';
    this.mensajeBienvenida = 'Bienvenido!';
    this.mensajeCredenciales = 'Ingrese sus credenciales';
   }
   

   //ahora creamos las funciones para el login del los usuarios
     async login() {

      const loading = await this.showLoading();
      try {
        await this.authService.login(this.correo, this.password); // Llamar al servicio de autenticación de auth.service.ts
        loading.dismiss();
        this.showToastMessage('Inicio de sesión exitoso', 'success');
        await new Promise(resolve => setTimeout(resolve, 1500)); // Espera 2 segundos antes de redirigir
        this.verificarAcceso();
      } catch (error) {
        this.showToastMessage('Inicio de sesión fallido', 'danger');
        loading.dismiss();
        console.error('Error al iniciar sesión', error);
      } 
  }

      goToPortal() {
        //window.location.href = '/portal'; // Redirige y recarga la página
        this.router.navigate(['/portal']);
      }
   //esta es para entrar con las credenciales

   /*validarSesion(){
     if(this.username === 'jojrodriguez' && this.password === '12345'){
      this.showToastMessage('Inicio de sesión exitoso', 'success');

      const extras: NavigationExtras = {

        state: {
          user: this.username,
          }
        }
        this.router.navigate(['/portal'], extras);
      

       } else {
        this.showToastMessage('Inicio de sesión fallido', 'danger');
     }
   }
*/

   // esta funcion es para recuperar la contraseña al no saberla

   async recuperarContrasena(){
     this.showToastMessage('Sigue las instrucciones para recuperar tú contraseña', 'warning');
     await new Promise(resolve => setTimeout(resolve, 2000));
     this.router.navigate(['/recuperacion']);
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

  async showLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
      duration: 2000
    });
    await loading.present();
    return loading;
  }

  irLoginProf(){
    this.router.navigate(['/profesor-login']);
  }

  async verificarAcceso() {
    try {
      this.authService.getUser().subscribe(user => {
        if (user && user.length > 0) {
          this.tipo = user[0].tipo; // Asignar el tipo de usuario

          if (this.tipo === '1') {
            this.showToastMessage('Acceso permitido', 'success');
            this.goToPortal();
          } else {
            this.showToastMessage('Acceso denegado', 'danger');
          }
        } else {
          this.showToastMessage('Usuario no permitido', 'danger');
        }
      }, error => {
        this.showToastMessage('Error al verificar acceso', 'danger');
        console.error('Error al verificar acceso', error);
      });
    } catch (error) {
      this.showToastMessage('Error al verificar acceso', 'danger');
      console.error('Error al verificar acceso', error);
    }
  }

}
