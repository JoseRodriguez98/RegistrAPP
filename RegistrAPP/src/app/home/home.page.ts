import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service'; //importamos el servicio de autenticación
import { LoadingService } from '../services/loading.service';

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

 
  
  constructor(
    private router: Router, 
    private toastController: ToastController,
    private authService: AuthService,
    private loadingService: LoadingService)
   {
    this.tituloSuperior = 'RegistrAPP';
    this.tituloInferior = 'DuocUC - Sede San Joaquín';
    this.mensajeBienvenida = 'Bienvenido a RegistrAPP';
    this.mensajeCredenciales = 'Ingrese sus credenciales';
   }
   

   //ahora creamos las funciones para el login del los usuarios
     async login() {
      this.loadingService.show();
      try {
        await this.authService.login(this.correo, this.password); // Llamar al servicio de autenticación de auth.service.ts
        this.showToastMessage('Inicio de sesión exitoso', 'success');
        await new Promise(resolve => setTimeout(resolve, 2000)); // Espera 2 segundos antes de redirigir
        this.goToPortal();
      } catch (error) {
        this.showToastMessage('Inicio de sesión fallido', 'danger');
        console.error('Error al iniciar sesión', error);
      } finally {
        this.loadingService.hide(); // Ocultamos el indicador de carga en ambos casos (éxito o error)
      }
  }

      goToPortal() {
        window.location.href = '/portal'; // Redirige y recarga la página
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

}
