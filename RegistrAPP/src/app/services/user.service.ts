import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {  


  //este al final no lo usaremos
  constructor(private firestore: AngularFirestore) { }
  addUser(nombreCompleto: string, correo: string, rut: string, password: string): Promise<void> {
    const id = this.firestore.createId(); //crea un ID unico
    return this.firestore.collection('users').doc(id).set({ nombreCompleto, correo, rut, password});
    }
  getUsers(): Observable<any[]> {
    return this.firestore.collection('users').valueChanges();
  }

}
