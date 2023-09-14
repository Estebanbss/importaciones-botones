import { Component } from '@angular/core';

@Component({
  selector: 'app-pagina-inicio',
  templateUrl: './pagina-inicio.component.html',
  styleUrls: ['./pagina-inicio.component.css']
})
export class PaginaInicioComponent {
  public ha: boolean = false;

  hidden(){
    this.ha == false ? this.ha = true : this.ha = false;
  }
}

