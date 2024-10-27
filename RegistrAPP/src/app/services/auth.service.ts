import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth:AngularFireAuth, private firestore: AngularFirestore) { }

  async login(correo:string, password:string){
    return this.afAuth.signInWithEmailAndPassword(correo, password);
  }

  //al final no piden esto
  async register(correo:string, password:string){
    return this.afAuth.createUserWithEmailAndPassword(correo, password);
  }

  async logout(){
    return this.afAuth.signOut();
  }

  
  // Obtener el usuario autenticado

  getUser(): Observable<any> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        console.log(user); // Agregar este log
        if (user) {
          // Si el usuario está autenticado, buscamos su información en Firestore
          return this.firestore.collection('users', ref => ref.where('correo', '==', user.email))
            .valueChanges({ idField: 'id' });
        } else {
          return of(null); // Si no hay usuario autenticado, devolvemos null
        }
      })
    );
  }
}