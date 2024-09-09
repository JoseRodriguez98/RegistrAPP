import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

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
  username!: string;
  password!: string;
 
  
  constructor(
    private router: Router, 
    private toastController: ToastController,)
   {
    this.tituloSuperior = 'RegistrAPP';
    this.tituloInferior = 'DuocUC - Sede San Joaquín';
    this.mensajeBienvenida = 'Bienvenido a RegistrAPP';
    this.mensajeCredenciales = 'Ingrese sus credenciales';
   }

   //ahora creamos las funciones para el login del los usuarios

   //esta es para entrar con las credenciales
   validarSesion(){
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


   // esta funcion es para recuperar la contraseña al no saberla

   recuperarContrasena(){
     this.showToastMessage('Sigue las instrucciones para recuperar tú contraseña', 'warning');
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
