import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-recuperacion',
  templateUrl: './recuperacion.page.html',
  styleUrls: ['./recuperacion.page.scss'],
})
export class RecuperacionPage implements OnInit {

  username! : string; // Este será el correo que se irá a comparar

  constructor(
    private router: Router,
    private authService: AuthService, 
    private toastController: ToastController,
  ) { }

  irLogin(){
    this.router.navigate(['/home']);
  }
  async validarRecuperacion() {
    if (!this.username) {
      this.showToastMessage('Por favor ingresa tu correo.', 'danger');
      return;
    }

    try {
      await this.authService.sendPasswordResetEmail(this.username);
      this.showToastMessage('Correo de recuperación enviado. Revisa tu bandeja de entrada.', 'success');
      this.volverHome();
    } catch (error) {
      this.showToastMessage('Error al enviar el correo. Verifica que el correo esté registrado.', 'danger');
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
  ngOnInit() {
  }

  async volverHome(){
    await new Promise(resolve => setTimeout(resolve, 2000));
    this.router.navigate(['/home']);
  }

}
