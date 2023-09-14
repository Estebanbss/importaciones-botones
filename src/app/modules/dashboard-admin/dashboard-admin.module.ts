import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardAdminRoutingModule } from './dashboard-admin-routing.module';
import { ReactiveFormsModule } from '@angular/forms'; //Formularios Reactivos

import { PaginaInicioComponent } from './pages/pagina-inicio/pagina-inicio.component';
import { ListadoPrestadorComponent } from './pages/prestadores-turisticos/listado-prestador/listado-prestador.component';
import { ListadoAtractivoComponent } from './pages/atractivos-turisticos/listado-atractivo/listado-atractivo.component';
import { ListadoMunicipioComponent } from './pages/municipios/listado-municipio/listado-municipio.component';
import { ListadoRutasComponent } from './pages/rutas-turisticas/listado-rutas/listado-rutas.component';
import { AgregarPrestadorComponent } from './pages/prestadores-turisticos/agregar-prestador/agregar-prestador.component';
import { EditarPrestadorComponent } from './pages/prestadores-turisticos/editar-prestador/editar-prestador.component';
import { AgregarAtractivoComponent } from './pages/atractivos-turisticos/agregar-atractivo/agregar-atractivo.component';
import { EditarAtractivoComponent } from './pages/atractivos-turisticos/editar-atractivo/editar-atractivo.component';
import { AgregarMunicipioComponent } from './pages/municipios/agregar-municipio/agregar-municipio.component';
import { EditarMunicipioComponent } from './pages/municipios/editar-municipio/editar-municipio.component';
import { AgregarRutasComponent } from './pages/rutas-turisticas/agregar-rutas/agregar-rutas.component';
import { EditarRutasComponent } from './pages/rutas-turisticas/editar-rutas/editar-rutas.component';


@NgModule({
  declarations: [
    PaginaInicioComponent,
    ListadoPrestadorComponent,
    ListadoAtractivoComponent,
    ListadoMunicipioComponent,
    ListadoRutasComponent,
    AgregarPrestadorComponent,
    EditarPrestadorComponent,
    AgregarAtractivoComponent,
    EditarAtractivoComponent,
    AgregarMunicipioComponent,
    EditarMunicipioComponent,
    AgregarRutasComponent,
    EditarRutasComponent
  ],
  imports: [
    CommonModule,
    DashboardAdminRoutingModule,
    ReactiveFormsModule
  ]
})
export class DashboardAdminModule { }
