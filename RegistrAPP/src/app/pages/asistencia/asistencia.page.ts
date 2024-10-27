import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  constructor() { }

  async volverPortal() {
    window.location.href = '/portal'; // Redirige y recarga la página
  }

  ngOnInit() {
  }

}
