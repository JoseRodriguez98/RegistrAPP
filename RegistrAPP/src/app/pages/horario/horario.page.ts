import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.page.html',
  styleUrls: ['./horario.page.scss'],
})
export class HorarioPage implements OnInit {

  constructor() { }

  async volverPortal() {
    window.location.href = '/portal'; // Redirige y recarga la página
  }



  ngOnInit() {
  }

}
