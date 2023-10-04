import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ModalServiceService } from 'src/app/core/services/modal-service.service';
import {Ruta} from 'src/app/common/place.interface';
import { PrestadoresService } from 'src/app/core/services/prestadores.service';

@Component({
  selector: 'app-import-rutas',
  templateUrl: './import-rutas.component.html',
  styleUrls: ['./import-rutas.component.css']
})
export class ImportRutasComponent {
  constructor( private MatProgressBarModule: MatProgressBarModule, private modalService: ModalServiceService,     private prestadoresService: PrestadoresService,) {
    this.ruta = {
      //id -> Nos lo da firebase
      name: '',
      descripcion: '',
      googleMaps: '',
      latitud: 0,
      longitud: 0,
      informacionAdicional: '',
      agenciaDeViajes: '',
      pathImages: [], // -> lo conseguimos en la inserción de imágenes
      // meGusta: 0, // -> # de Me gustas en la App
      pathImagePortada: { // -> lo conseguimos en la inserción de imágenes
        path:'',
        url: ''
      }
    }


  }

  closemodal() {
    this.modalService.setModalSuichRutas(false);//cierra el modal
   }

  ngOnInit(): void {

  }


//?->data en crudo formato JSON (esta crudo osea hay que cocinarlo como un pollo asado)
  data:any = [];//almacena el archivo en formato JSON

  //* -> valores de la barra de progreso
  progress:number = 0;//almacena el progreso de la carga del archivo
  mode='determinate'//modo de la barra de progreso
  value:any=0//valor de la barra de progreso
//* ->-----------------------------------------------------------------------

  // ? -> Propiedad para almacenar los archivos antes de cargarlos a la BD
  files: any[] = []; //Presupongo que los archivos son un arreglo de tipo any, no estoy seguro

   // ? -> Propiedad de tipo Object que va a almacenar nuestros datos y se va a pasar a Firestore
  ruta: Ruta;//almacena los datos del prestador turistico


  //? -> Propiedad para almacenar la imágen de portada antes de cargarla a la BD
  portadaFile: any;

  prestarrays:any=[]


datocurioso(){
  this.prestarrays=[]

  for (let index = 0; index < this.data[0].length; index++) {
    this.ruta = {
      //id -> Nos lo da firebase
      name: this.data[3][index].name === undefined  ? '--' : this.data[0][index].name,
      descripcion: this.data[3][index].descripcion === undefined  ? '--' : this.data[0][index].descripcion,
      googleMaps: this.data[3][index].googleMaps === undefined  ? '--' : this.data[0][index].googleMaps,
      latitud: this.data[3][index].latitud === undefined  ? 0 : this.data[0][index].latitud,
      longitud: this.data[3][index].longitud === undefined  ? 0 : this.data[0][index].longitud,
      informacionAdicional: this.data[3][index].informacionAdicional === undefined  ? '--' : this.data[0][index].informacionAdicional,
      agenciaDeViajes: this.data[3][index].agenciaDeViajes === undefined  ? '--' : this.data[0][index].agenciaDeViajes,
      pathImages: [], // -> lo conseguimos en la inserción de imágenes
      meGusta: 0, // -> # de Me gustas en la App
      pathImagePortada: { // -> lo conseguimos en la inserción de imágenes
        path:'',
        url: ''
      }
    }
    this.prestarrays.push(this.ruta)
  }

  this.prestadoresService.agregarRutasImportacion(this.prestarrays)
}

//?metodo para subir el archivo
  fileUpload(event:any){
    this.progress = 0;//reincia la barra de progreso cuando se sube un nuevo archivo
    const selectedFile = event.target.files[0];//obtiene el archivo seleccionado
    const fileReader = new FileReader();//lee el archivo
    fileReader.readAsBinaryString(selectedFile);//lo convierte en binario
    fileReader.onprogress = (event) => {//muestra el progreso de la carga del archivo
      this.progress = Math.round((event.loaded / event.total) * 100);//calcula el porcentaje de carga
      this.value=this.progress//asigna el valor del porcentaje a la barra de progreso
      console.log(`Progress: ${this.progress}%`);//muestra el porcentaje de carga en la consola
    };//muestra el progreso de la carga del archivo

//?metodo para leer el archivo
    fileReader.onload = (event) => {//cuando el archivo se carga
      let binaryData = event.target?.result;//obtiene el archivo en binario
      let workbook = XLSX.read(binaryData, {type: 'binary'});//lo convierte en un libro de trabajo
      workbook.SheetNames.forEach(sheet => {const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]); this.data.push(data) })//convierte el libro de trabajo en un objeto JSON
    }

  }
}
