import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrestadorTuristico } from 'src/app/common/place.interface';
import { PrestadoresService } from 'src/app/core/services/prestadores.service';
import { ModalServiceService } from 'src/app/core/services/modal-service.service';




@Component({
  selector: 'app-listado-prestador',
  templateUrl: './listado-prestador.component.html',
  styleUrls: ['./listado-prestador.component.css'],

})
export class ListadoPrestadorComponent implements OnInit {
  modalsuich!:boolean;
  modalsuichatrac!:boolean;
  modalsuichmuni!:boolean;
  modalsuichrutas!:boolean;
  modalsuichtodo!:boolean;
  warning!:boolean;


  onKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      this.closemodal();
    }
  }

  closemodal() {
    this.modalService.setModalSuichPst(false);//cierra el modal
    this.modalService.setModalSuichMuni(false);//cierra el modal
    this.modalService.setModalSuichAtrac(false);//cierra el modal
    this.modalService.setModalSuichRutas(false);//cierra el modal
    this.modalService.setWarning(false);//cierra el modal
    this.modalService.setModalSuichTodo(false);//cierra el modal
   }


  openmodalpst() {
    this.modalService.setModalSuichPst(true);
  }
  openmodalmuni() {
    this.modalService.setModalSuichMuni(true);
  }
  openmodalatrac() {
    this.modalService.setModalSuichAtrac(true);
  }
  openmodalrutas() {
    this.modalService.setModalSuichRutas(true);
  }
  openmodalwarning(value: string) {
    this.modalService.setWarning(true);
    this.modalService.setValue(value);
  }

  openmodalwarningtodo(){
    this.prestadoresService.borrarTodosLosDocumentos("prestadores")
    this.prestadoresService.borrarTodosLosDocumentos("atractivos")
    this.prestadoresService.borrarTodosLosDocumentos("rutas")
    this.prestadoresService.borrarTodosLosDocumentos("municipios")
    alert("SE BORRO TODO D:")

  }
  openmodaltodo() {
    this.modalService.setModalSuichTodo(true);
  }

  //? -> Propiedad para almacenar el arreglo de objetos que nos va a traer la BD al disparar el método getPrestadores, la utilizamos para Bandear los datos en el html de list y mostrar los datos
  prestadores: PrestadorTuristico[] = [];

  //? -> Inyecciones de dependencias
  constructor(
    private prestadoresService: PrestadoresService, // Inyectamos el servicio
    private router: Router, // Clase Router para moverme a otro componente una vez enviado el form
    private modalService: ModalServiceService
  ) {

  }


  ngOnInit() {
     this.modalService.modalsuich$.subscribe((value) => {
      this.modalsuich = value;
    });

    this.modalService.modalsuichatrac$.subscribe((value) => {
      this.modalsuichatrac = value;
    });

    this.modalService.modalsuichmuni$.subscribe((value) => {
      this.modalsuichmuni = value;
    });

    this.modalService.modalsuichrutas$.subscribe((value) => {
      this.modalsuichrutas = value;
    });

    this.modalService.modalsuichtodo$.subscribe((value) => {
      this.modalsuichtodo = value;
    });

    this.modalService.modalsuichtodo$.subscribe((value) => {
      this.modalsuichtodo = value;
    });

    this.modalService.warning$.subscribe((value) => {
      this.warning = value;
    });

    //Lo ejecutamos en el método OnInit para que dispare el método getPrestadores y me cargue los datos apenas se cargue el componente. Además de que disparamos el cold Observable para que se actualizen los datos a tiempo real.
    this.getPrestadores();
  }

  //? -> Método para obtener los elementos de la BD
  getPrestadores() {
    //? -> Aquí nos suscribimos a nuestro observable desde el método de nuestro servicio para que esté atento a los cambios que se hagan a tiempo real.
    this.prestadoresService.obtenerPrestadores().subscribe(data => {
      // data nos trae un arreglo con el conjunto de elemento de tipo Object - Arreglo de Objetos
      // console.log(data);
      this.prestadores = data; //Pasamos la información a una propiedad nativa de la clase para hacer el Banding
    })
  }


  //? -> Método para eliminar un Prestador
  eliminarPrestador(prestador: any) {
    //Primero borramos los datos del Storage ya que necesitamos el path de la imágenes que tiene nuestro objeto guardado en Firestore
    this.prestadoresService.borrarImagenesPrestador(prestador);

    //Aquí eliminamos los datos de Firestore
    this.prestadoresService.borrarPrestador(prestador)
    .then(() => {
      alert('Prestador Turistico Eliminado');
    })
    .catch(error => console.log(error));
  }

  //? -> Método para obtener objeto a actualizar y enviarlo por medio de Observables
  obtenerPrestador(prestador: any) {
    //Utilizamos un BehaviorSubject para obtener el dato que queremos actualizar
    this.prestadoresService.editPrestadorData = prestador;
    this.router.navigate(['/dashboard-admin/pagina-inicio/editar-prestadores-turisticos']);
  }

}
