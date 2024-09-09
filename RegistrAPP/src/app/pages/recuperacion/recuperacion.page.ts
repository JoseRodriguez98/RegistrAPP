import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-recuperacion',
  templateUrl: './recuperacion.page.html',
  styleUrls: ['./recuperacion.page.scss'],
})
export class RecuperacionPage implements OnInit {

  username! : string;

  constructor(
    private router: Router,
    private toastController: ToastController,
  ) { }

  irLogin(){
    this.router.navigate(['/home']);
  }

  validarRecuperacion(){
    if(this.username === 'jojrodriguez'){
     this.showToastMessage('Recuperacion exitosa, correo enviado!', 'success');

     const extras: NavigationExtras = {
       state: {
         user: this.username,
         }
       }
       this.router.navigate(['/home'], extras);
     

      } else {
       this.showToastMessage('Usuario no encontrado', 'danger');
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

}
