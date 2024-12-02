import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastController, LoadingController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service'; //importamos el servicio de autenticación

@Component({
  selector: 'app-profesor-login',
  templateUrl: './profesor-login.page.html',
  styleUrls: ['./profesor-login.page.scss'],
})
export class ProfesorLoginPage {
  correo: string = '';
  password: string = '';
  tipo: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {}

  // Método para iniciar sesión



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
      this.router.navigate(['/profesor-portal']);
    }




      // Método para recuperar la contraseña
  async recuperarContrasena(){
    this.showToastMessage('Sigue las instrucciones para recuperar tú contraseña', 'warning');
    await new Promise(resolve => setTimeout(resolve, 2000));
    this.router.navigate(['/recuperacion']);
  }
  // Mostrar mensajes emergentes (Toast)
  async showToastMessage(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color: color,
      position: 'bottom',
    });
    toast.present();
  }

  // Mostrar el indicador de carga (Loading)
  async showLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
      spinner: 'crescent',
      duration: 3000,
    });
    await loading.present();
    return loading;
  }

  irLogin(){
    this.router.navigate(['/home']);
  }

  async verificarAcceso() {
    try {
      this.authService.getProfe().subscribe(user => {
        if (user && user.length > 0) {
          this.tipo = user[0].tipo; // Asignar el tipo de usuario

          if (this.tipo === '0') {
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


