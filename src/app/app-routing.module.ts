import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  //Primera página por defecto
  {
    path: '',
    redirectTo: 'dashboard-admin',
    pathMatch: 'full'
  },
  //Modulos a cargar
  {
    path: 'dashboard-admin', //Es un nombre cualquiera, pero lo llamo como mi módulo de de dashboard-admin
    loadChildren: () => import('./modules/dashboard-admin/dashboard-admin.module').then( m => m.DashboardAdminModule ) //Importamos el Módulo Hijo.
  },
  //Path en caso de que no vaya a ningún sitio
  {
    path: '**', //Path por defecto cuando ponen cualquier cosa o nada
    redirectTo: 'dashboard-admin'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
