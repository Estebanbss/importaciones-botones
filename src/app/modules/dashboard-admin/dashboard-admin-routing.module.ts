import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Mis componentes
import { PaginaInicioComponent } from './pages/pagina-inicio/pagina-inicio.component';
import { ListadoPrestadorComponent } from './pages/prestadores-turisticos/listado-prestador/listado-prestador.component';
import { ListadoAtractivoComponent } from './pages/atractivos-turisticos/listado-atractivo/listado-atractivo.component';
import { ListadoMunicipioComponent } from './pages/municipios/listado-municipio/listado-municipio.component';
import { ListadoRutasComponent } from './pages/rutas-turisticas/listado-rutas/listado-rutas.component';
import { AgregarPrestadorComponent } from './pages/prestadores-turisticos/agregar-prestador/agregar-prestador.component';
import { AgregarAtractivoComponent } from './pages/atractivos-turisticos/agregar-atractivo/agregar-atractivo.component';
import { AgregarMunicipioComponent } from './pages/municipios/agregar-municipio/agregar-municipio.component';
import { AgregarRutasComponent } from './pages/rutas-turisticas/agregar-rutas/agregar-rutas.component';
import { EditarPrestadorComponent } from './pages/prestadores-turisticos/editar-prestador/editar-prestador.component';
import { EditarAtractivoComponent } from './pages/atractivos-turisticos/editar-atractivo/editar-atractivo.component';
import { EditarMunicipioComponent } from './pages/municipios/editar-municipio/editar-municipio.component';
import { EditarRutasComponent } from './pages/rutas-turisticas/editar-rutas/editar-rutas.component';

const routes: Routes = [
  {
    //Creamos el ruteo de hijos
    path: '',
    children: [ //En este módulo se cargan las direcciones de este módulo
     //Por defecto
     { path: '', redirectTo: 'pagina-inicio', pathMatch: 'full'},
     //Listado de Vistas en Componentes
     {
      //Pagina Base donde van todas las vistas y el router-outlet
      path: 'pagina-inicio',
      component: PaginaInicioComponent,
      children: [
        //Vistas
        { path: '', redirectTo: 'list-prestadores-turisticos', pathMatch: 'full'},
        //Componentes listado
        { path: 'list-prestadores-turisticos', component: ListadoPrestadorComponent},
        { path: 'list-atractivo-turistico', component: ListadoAtractivoComponent},
        { path: 'list-municipio', component: ListadoMunicipioComponent },
        { path: 'list-rutas-turisticas', component: ListadoRutasComponent },
        //Componentes Agregar
        { path: 'agregar-prestadores-turisticos', component: AgregarPrestadorComponent},
        { path: 'agregar-atractivo-turistico', component: AgregarAtractivoComponent},
        { path: 'agregar-municipio', component: AgregarMunicipioComponent },
        { path: 'agregar-rutas-turisticas', component: AgregarRutasComponent },
        //Componentes Editar
        { path: 'editar-prestadores-turisticos', component: EditarPrestadorComponent},
        { path: 'editar-atractivo-turistico', component: EditarAtractivoComponent},
        { path: 'editar-municipio', component: EditarMunicipioComponent },
        { path: 'editar-rutas-turisticas', component: EditarRutasComponent },
        //Ruta que no se encuentra
        { path: '**', redirectTo: 'list-prestadores-turisticos' }
      ]
    },
     //Ruta no conocida
     { path: '**', redirectTo: 'pagina-inicio' } //Ruta por defecto, la primera ruta a la que va a ingresar en el módulo
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardAdminRoutingModule { }
