import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { StorageService } from '../../services/storage.service';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { HttpClient } from '@angular/common/http';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.page.html',
  styleUrls: ['./horario.page.scss'],
})
export class HorarioPage implements OnInit {

  horario : any;
  bloques: string[] = [
    '08:30 - 09:10',
    '09:10 - 09:50',
    '10:00 - 10:40',
    '10:40 - 11:20',
    '11:30 - 12:10',
    '12:10 - 12:50',
    '13:00 - 13:40',
    '13:40 - 14:20',
    '14:30 - 15:10',
    '15:10 - 15:50',
    '16:00 - 16:40',
    '16:40 - 17:20',
    '17:20 - 18:00',
    '18:10 - 18:50',
  ]; // Define los bloques de tiempo.

  dias: string[] = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'];

  horarioEstructurado: any = {}; // Para almacenar el horario final estructurado.

  constructor(private router: Router,
              private storageService: StorageService,
              private platform: Platform, 
              private http: HttpClient
  ) { }

  async descargarPdf() {
    const fileName = 'Horario_4to_semestre.pdf';
    const filePath = `assets/${fileName}`;

    // Verificar si la plataforma es nativa
    if (this.platform.is('hybrid')) {
      // Leer el archivo desde los assets
      const response = await this.http
        .get(filePath, { responseType: 'blob' })
        .toPromise();

      // Convertir el blob a base64
      const base64Data = await this.convertBlobToBase64(response) as string;

      // Guardar el archivo en el sistema de archivos del dispositivo
      await Filesystem.writeFile({
        path: fileName,
        data: base64Data,
        directory: Directory.Documents,
        recursive: true,
      });

      // Obtener la URI nativa del archivo
      const fileUri = await Filesystem.getUri({
        directory: Directory.Documents,
        path: fileName,
      });

      // Abrir el archivo con el visor de PDF nativo
      const path = Capacitor.convertFileSrc(fileUri.uri);
      window.open(path, '_system');
    } else {
      // Si está en el navegador, abrir el PDF en una nueva pestaña
      window.open(filePath, '_blank');
    }
  }

  // Función para convertir blob a base64
  convertBlobToBase64(blob: Blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  }

  async volverPortal() {
    //window.location.href = '/portal'; // Redirige y recarga la página
    this.router.navigate(['/portal']);
  }

  async ngOnInit() {
    this.horario = await this.storageService.get('horario');
    console.log('Horario cargado desde el Storage:', this.horario);

    this.dias.forEach(dia => {
      this.horarioEstructurado[dia] = this.bloques.map(bloque => {
        // Encuentra la materia correspondiente al bloque.
        const clase = this.horario[dia]?.find((item: any) => item.hora === bloque);
        return clase ? clase.materia : ''; // Si no hay clase, deja vacío.
      });
    });

    console.log('Horario estructurado:', this.horarioEstructurado);
  }
  

}
