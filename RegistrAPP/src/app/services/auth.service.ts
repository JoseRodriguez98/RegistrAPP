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

  // Método para enviar correo de restablecimiento de contraseña, es propio de Firebase asi que nos sirve perfecto
  async sendPasswordResetEmail(email: string): Promise<void> {
    try {
      await this.afAuth.sendPasswordResetEmail(email);
      console.log('Correo de restablecimiento enviado.');
    } catch (error) {
      throw new Error('No se pudo enviar el correo de restablecimiento.');
    }
  }

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

  getCurrentUser(): Observable<any> {
    return this.afAuth.authState;
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
