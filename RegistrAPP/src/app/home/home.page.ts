import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  tituloSuperior: string;
  tituloInferior: string;
  mensajeBienvenida: string;
  mensajeCredenciales: string;
  username!: string;
  password!: string;

  constructor
  (private router: Router, 
    private toastController: ToastController,)
   {
    this.tituloSuperior = 'RegistrAPP';
    this.tituloInferior = 'DuocUC - Sede San Joaquín';
    this.mensajeBienvenida = 'Bienvenido a RegistrAPP';
    this.mensajeCredenciales = 'Ingrese sus credenciales';
   }

}
