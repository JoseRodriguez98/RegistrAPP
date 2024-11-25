import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FirebaseModule } from '../../firebase.module'; // Importa el nuevo módulo


@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  asistencia$: Observable<any[]> = new Observable(); // Inicializamos el Observable

  constructor(private router: Router,
              private firestore: Firestore
            ) { }

  async volverPortal() {
    this.router.navigate(['/portal']);
    
  }

  ngOnInit() {
    const asistenciaCollection = collection(this.firestore, 'users'); // Nombre de la colección en Firebase
    this.asistencia$ = collectionData(asistenciaCollection, { idField: 'id' }); // Obtenemos los datos con sus IDs
    this.asistencia$ = collectionData(asistenciaCollection).pipe(
      map((users: any[]) =>
        users.map(user => {
          const asistencias = user.asistencia;
          return Object.keys(asistencias).map(key => ({
            id: key,
            ...asistencias[key],
            fecha: new Date(asistencias[key].fecha.seconds * 1000), // Convierte `fecha` a `Date`
          }));
        }).reduce((acc, val) => acc.concat(val), []) // Aplana la lista
        .sort((a, b) => b.fecha.getTime() - a.fecha.getTime()) // Ordena por fecha descendente
      ),
      map(asistencias => 
        asistencias.map(asistencia => ({
          ...asistencia,
          fecha: asistencia.fecha.toLocaleString(), // Convierte la fecha a formato legible
        }))
      )
    );
    
    
    
  }

}
