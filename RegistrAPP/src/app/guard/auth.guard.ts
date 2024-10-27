import { CanActivateFn } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const afAuth = inject(AngularFireAuth);
  const router = inject(Router);

  // Observable que emite si el usuario está autenticado o no
  const isAuthenticated$: Observable<boolean> = afAuth.authState.pipe(
    take(1), // Solo toma el primer valor emitido y completa el observable
    map(user => !!user) // Devuelve true si el usuario está autenticado, de lo contrario false
  );

  // Usamos el observable para controlar la navegación
  return isAuthenticated$.pipe(
    map(isAuthenticated => {
      if (isAuthenticated) {
        return true;
      } else {
        router.navigate(['/home']);
        return false;
      }
    })
  );
};
