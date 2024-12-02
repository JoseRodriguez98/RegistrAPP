import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
    
  },
  {
    path: 'recuperacion',
    loadChildren: () => import('./pages/recuperacion/recuperacion.module').then( m => m.RecuperacionPageModule)
  },
  {
    path: 'portal',
    loadChildren: () => import('./pages/portal/portal.module').then( m => m.PortalPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'asistencia',
    loadChildren: () => import('./pages/asistencia/asistencia.module').then( m => m.AsistenciaPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'scan-qr',
    loadChildren: () => import('./pages/scan-qr/scan-qr.module').then( m => m.ScanQrPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'horario',
    loadChildren: () => import('./pages/horario/horario.module').then( m => m.HorarioPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'configuracion',
    loadChildren: () => import('./pages/configuracion/configuracion.module').then( m => m.ConfiguracionPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'profesor-portal',
    loadChildren: () => import('./pages/profesor-portal/profesor-portal.module').then( m => m.ProfesorPortalPageModule)
  },
  {
    path: 'profesor-login',
    loadChildren: () => import('./pages/profesor-login/profesor-login.module').then( m => m.ProfesorLoginPageModule)
  },
  {
    path: 'profesor-generar-qr',
    loadChildren: () => import('./pages/profesor-generar-qr/profesor-generar-qr.module').then( m => m.ProfesorGenerarQrPageModule)
  },
  {
    path: 'profesor-ver-asistencias',
    loadChildren: () => import('./pages/profesor-ver-asistencias/profesor-ver-asistencias.module').then( m => m.ProfesorVerAsistenciasPageModule)
  },
  {
    path: 'profesor-ver-cursos',
    loadChildren: () => import('./pages/profesor-ver-cursos/profesor-ver-cursos.module').then( m => m.ProfesorVerCursosPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./page-not-found/page-not-found.module').then( m => m.PageNotFoundPageModule)
  },
  
  
  
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
