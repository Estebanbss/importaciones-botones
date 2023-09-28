import { Component } from '@angular/core';

@Component({
  selector: 'app-pagina-inicio',
  templateUrl: './pagina-inicio.component.html',
  styleUrls: ['./pagina-inicio.component.css']
})
export class PaginaInicioComponent {
cerrado:boolean = true;

suich(){
  this.cerrado === true ? this.cerrado = false : this.cerrado = true;
  console.log(this.cerrado);
}

}

