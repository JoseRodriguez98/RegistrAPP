import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {

  constructor() { }

  async volverPortal() {
    window.location.href = '/portal'; // Redirige y recarga la página
  }

  ngOnInit() {
  }

}
