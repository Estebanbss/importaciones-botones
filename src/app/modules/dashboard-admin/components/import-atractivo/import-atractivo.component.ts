import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ModalServiceService } from 'src/app/core/services/modal-service.service';
import { AtractivoTuristico } from 'src/app/common/place.interface';
import { PrestadoresService } from 'src/app/core/services/prestadores.service';


@Component({
  selector: 'app-import-atractivo',
  templateUrl: './import-atractivo.component.html',
  styleUrls: ['./import-atractivo.component.css']
})
export class ImportAtractivoComponent {

  constructor( private MatProgressBarModule: MatProgressBarModule, private modalService: ModalServiceService,     private prestadoresService: PrestadoresService,) {
    this.atractivoTuristico = {
      //id -> Nos lo da firebase
      name: '',
      bienOLugar: '',
      descripcion: '',
      clima: '',
      zona: '',
      municipio: '',
      direccionBarrioVereda: '',
      indicacionesAcceso: '',
      googleMaps: '',
      latitud: 0,
      longitud: 0,
      actividades: '',
      horarioAtencion: '',
      recomendaciones: '',
      administrador: '',
      contactoAdmin : '',
      redSocial: '',
      pathImages: [], // -> lo conseguimos en la inserción de imágenes
      meGusta: 0, // -> # de Me gustas en la App
      pathImagePortada: { // -> lo conseguimos en la inserción de imágenes
        path:'',
        url: ''
      }
    }
  }

  closemodal() {
    this.modalService.setModalSuichAtrac(false);//cierra el modal
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
   atractivoTuristico: AtractivoTuristico;//almacena los datos del prestador turistico


  //? -> Propiedad para almacenar la imágen de portada antes de cargarla a la BD
  portadaFile: any;

  prestarrays:any=[]


datocurioso(){
  this.prestarrays=[]

  for (let index = 0; index < this.data[0].length; index++) {
    this.atractivoTuristico = {
       //id -> Nos lo da firebase
       name: this.data[0][index].name === undefined  ? '--' : this.data[0][index].name,
       bienOLugar: this.data[0][index].bienOLugar === undefined  ? '--' : this.data[0][index].bienOLugar,
       descripcion: this.data[0][index].descripcion === undefined  ? '--' : this.data[0][index].descripcion,
       clima: this.data[0][index].clima === undefined  ? '--' : this.data[0][index].clima,
       zona: this.data[0][index].zona === undefined  ? '--' : this.data[0][index].zona,
       municipio: this.data[0][index].municipio === undefined  ? '--' : this.data[0][index].municipio,
       direccionBarrioVereda: this.data[0][index].direccionBarrioVereda === undefined  ? '--' : this.data[0][index].direccionBarrioVereda,
       indicacionesAcceso: this.data[0][index].indicacionesAcceso === undefined  ? '--' : this.data[0][index].indicacionesAcceso,
       googleMaps: this.data[0][index].googleMaps === undefined  ? '--' : this.data[0][index].googleMaps,
       latitud: this.data[0][index].latitud === undefined  ? '0' : this.data[0][index].latitud,
       longitud: this.data[0][index].longitud === undefined  ? '0' : this.data[0][index].longitud,
       actividades: this.data[0][index].actividades === undefined  ? '--' : this.data[0][index].actividades,
       horarioAtencion: this.data[0][index].horarioAtencion === undefined  ? '--' : this.data[0][index].horarioAtencion,
       recomendaciones: this.data[0][index].recomendaciones === undefined  ? '--' : this.data[0][index].recomendaciones,
       administrador: this.data[0][index].administrador === undefined  ? '--' : this.data[0][index].administrador,
       contactoAdmin : this.data[0][index].contactoAdmin === undefined  ? '--' : this.data[0][index].contactoAdmin,
       redSocial: this.data[0][index].redSocial === undefined  ? '--' : this.data[0][index].redSocial,
      pathImages: [], // -> lo conseguimos en la inserción de imágenes
      meGusta: 0, // -> # de Me gustas en la App
      pathImagePortada: { // -> lo conseguimos en la inserción de imágenes
        path:'',
        url: ''
      }
    }
    this.prestarrays.push(this.atractivoTuristico)
  }

  this.prestadoresService.agregarAtractivoImportacion(this.prestarrays)
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
