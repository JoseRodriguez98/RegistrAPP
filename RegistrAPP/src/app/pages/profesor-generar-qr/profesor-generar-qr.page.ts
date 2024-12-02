import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastController } from '@ionic/angular';
import * as QRCode from 'qrcode';

// DEFINIMOS LAS INTERFACES AL INICIO DEL ARCHIVO
// Esto describe cómo se ven los datos de Firebase

interface Clase {
  nombreClase: string;
  sala: string;
  seccion: string;
}

interface Dia {
  [rangoHorario: string]: Clase; // Los rangos de hora como "08:30 - 09:10" son las claves
}

interface Profesor {
  clases: {
    lunes?: Dia; // Cada día es opcional
    martes?: Dia;
    miércoles?: Dia;
    jueves?: Dia;
    viernes?: Dia;
    sábado?: Dia;
    domingo?: Dia;
  };
}

@Component({
  selector: 'app-profesor-generar-qr',
  templateUrl: './profesor-generar-qr.page.html',
  styleUrls: ['./profesor-generar-qr.page.scss'],
})
export class ProfesorGenerarQrPage implements OnInit {
  horarioActual: any; // Almacena la clase correspondiente a la hora actual
  qrCodeData: string | null = null; // Almacena el código QR generado
  userId: string = 'azE7056E9WcqtPBMyIz6'; // Cambia esto por el ID dinámico del profesor
  horaActual: string = ''; // Nueva propiedad para almacenar la hora actual

  constructor(
    private firestore: AngularFirestore,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.horaActual = this.obtenerHoraActual(new Date());
    this.verificarClaseActual(); // Llamamos a la función al cargar el componente
  }

  async verificarClaseActual() {
    const ahora = new Date();
    const horaActual = this.obtenerHoraActual(ahora);

    try {
      // Obtener el documento del profesor
      const profesorDoc = await this.firestore
        .collection('profesores')
        .doc(this.userId)
        .ref.get();

      if (profesorDoc.exists) {
        const data = profesorDoc.data() as Profesor; // Indicamos que los datos son del tipo Profesor
        const clases = data?.clases;

        if (clases && clases['lunes']) {
          const bloquesHorarios = clases['lunes'];

          // Buscar si la hora actual está dentro de algún rango
          const horario = this.buscarClasePorHora(bloquesHorarios, horaActual);
          if (horario) {
            this.horarioActual = horario;
          } else {
            this.horarioActual = null;
            this.mostrarToast('No hay clases programadas para esta hora.');
          }
        } else {
          this.horarioActual = null;
          this.mostrarToast('No se encontraron clases para el día de hoy.');
        }
      } else {
        this.horarioActual = null;
        this.mostrarToast('No se encontraron datos para este profesor.');
      }
    } catch (error) {
      console.error('Error al obtener el horario:', error);
      this.mostrarToast('Error al obtener el horario.');
    }
  }

  buscarClasePorHora(bloquesHorarios: any, horaActual: string): any {
    // Recorremos los bloques horarios del día
    for (const [rango, datosClase] of Object.entries(bloquesHorarios)) {
      const [horaInicio, horaFin] = rango.split(' - '); // Separar el rango en horaInicio y horaFin
      if (this.estaDentroDelRango(horaActual, horaInicio, horaFin)) {
        return datosClase; // Retornar los datos de la clase correspondiente
      }
    }
    return null; // No se encontró un horario válido
  }

  estaDentroDelRango(hora: string, inicio: string, fin: string): boolean {
    return hora >= inicio && hora <= fin; // Verificar si la hora está dentro del rango
  }

  async generarQR() {
    if (this.horarioActual) {
      const ahora = new Date();
      const contenidoQR = {
        nombreClase: this.horarioActual.nombreClase,
        sala: this.horarioActual.sala,
        seccion: this.horarioActual.seccion,
        horaGenerada: ahora.toLocaleTimeString(),
      };

      try {
        this.qrCodeData = await QRCode.toDataURL(JSON.stringify(contenidoQR));
        this.mostrarToast('Código QR generado exitosamente.');
      } catch (error) {
        console.error('Error al generar el QR:', error);
        this.mostrarToast('Error al generar el código QR.');
      }
    }
  }

  obtenerHoraActual(fecha: Date): string {
    const horas = fecha.getHours().toString().padStart(2, '0');
    const minutos = fecha.getMinutes().toString().padStart(2, '0');
    return `${horas}:${minutos}`;
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      position: 'bottom',
    });
    await toast.present();
  }
}
