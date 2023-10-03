import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ModalServiceService } from 'src/app/core/services/modal-service.service';
import { PrestadorTuristico } from 'src/app/common/place.interface';
import { PrestadoresService } from 'src/app/core/services/prestadores.service';

@Component({
  selector: 'app-import',
  templateUrl: './import-pst.component.html',
  styleUrls: ['./import-pst.component.css'],


})

export class ImportComponent implements OnInit{

  constructor( private MatProgressBarModule: MatProgressBarModule, private modalService: ModalServiceService,     private prestadoresService: PrestadoresService,) {

    this.prestadorTuristico = {
      //id -> Nos lo da firebase
      name: '',
      rntRm: '',
      descripcion: '',
      servicios: '',
      zona: '',
      municipio: '',
      direccion: '',
      indicacionesAcceso: '',
      googleMaps: '',
      latitud: 0,
      longitud: 0,
      whatsapp: 0,
      celular1: 0,
      celular2: 0,
      facebook: '',
      instagram: '',
      pagWeb: '',
      correo: '',
      horarioAtencion: '',

      alojamientoRural: "",
      tiendasDeCafé: "",
      antojosTípicos: "",
      sitioNatural:"",
      patrimonioCultural: "",
      miradores:"",
      parquesNaturales:"",
      agenciasDeViajes:"",
      centroRecreativo:"",
      guíasDeTurismo:"",
      aventura:"",
      agroYEcoturismo:"",
      planesORutas:"",
      artesanías:"",
      transporte:"",
      eventos:"",

      pathImages: [], // -> lo conseguimos en la inserción de imágenes
      meGusta: 0, // -> # de Me gustas en la App
      pathImagePortada: { // -> lo conseguimos en la inserción de imágenes
        path:'',
        url: ''
      }
    }


  }

  closemodal() {
    this.modalService.setModalSuichPst(false);//cierra el modal
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
   prestadorTuristico: PrestadorTuristico;//almacena los datos del prestador turistico


  //? -> Propiedad para almacenar la imágen de portada antes de cargarla a la BD
  portadaFile: any;

  prestarrays:any=[]


datocurioso(){
  this.prestarrays=[]

  for (let index = 0; index < this.data[0].length; index++) {
    this.prestadorTuristico = {
      //id -> Nos lo da firebase
      name: this.data[0][index].name === undefined  ? '--' : this.data[0][index].name,
      rntRm: this.data[0][index].rntRm === undefined  ? '--' : this.data[0][index].rntRm,
      descripcion: this.data[0][index].descripcion === undefined  ? '--' : this.data[0][index].descripcion,
      servicios: this.data[0][index].servicios === undefined  ? '--' : this.data[0][index].servicios,
      zona: this.data[0][index].zona === undefined  ? '--' : this.data[0][index].zona,
      municipio: this.data[0][index].municipio === undefined  ? '--' : this.data[0][index].municipio,
      direccion: this.data[0][index].direccion === undefined  ? '--' : this.data[0][index].direccion,
      indicacionesAcceso: this.data[0][index].indicacionesAcceso === undefined  ? '--' : this.data[0][index].indicacionesAcceso,
      googleMaps: this.data[0][index].googleMaps === undefined  ? '--' : this.data[0][index].googleMaps,
      latitud:this.data[0][index].latitud === undefined  ? '--' : this.data[0][index].latitud,
      longitud:this.data[0][index].longitud === undefined  ? '0' : this.data[0][index].longitud,
      whatsapp:this.data[0][index].whatsapp === undefined  ? '0' : this.procesarValor(this.data[0][index].whatsapp),
      celular1:this.data[0][index].celular1 === undefined  ? '0' : this.procesarValor(this.data[0][index].celular1),
      celular2:this.data[0][index].celular2 === undefined  ? '0' : this.procesarValor(this.data[0][index].celular2),
      facebook: this.data[0][index].facebook === undefined  ? '--' : this.data[0][index].facebook,
      instagram: this.data[0][index].instagram === undefined  ? '--' : this.data[0][index].instagram,
      pagWeb: this.data[0][index].pagWeb === undefined  ? '--' : this.data[0][index].pagWeb,
      correo: this.data[0][index].correo === undefined  ? '--' : this.data[0][index].correo,
      horarioAtencion: this.data[0][index].horarioAtencion === undefined  ? '--' : this.data[0][index].horarioAtencion,

      alojamientoRural: this.data[0][index].alojamientoRural === undefined  ? '--' : this.data[0][index].alojamientoRural,
      tiendasDeCafé: this.data[0][index].tiendasDeCafé === undefined  ? '--' : this.data[0][index].tiendasDeCafé,
      antojosTípicos:this.data[0][index].antojosTípicos === undefined  ? '--' : this.data[0][index].antojosTípicos,
      sitioNatural:this.data[0][index].sitioNatural === undefined  ? '--' : this.data[0][index].sitioNatural,
      patrimonioCultural: this.data[0][index].patrimonioCultural === undefined  ? '--' : this.data[0][index].patrimonioCultural,
      miradores: this.data[0][index].miradores === undefined  ? '--' : this.data[0][index].miradores,
      parquesNaturales: this.data[0][index].parquesNaturales === undefined  ? '--' : this.data[0][index].parquesNaturales,
      agenciasDeViajes: this.data[0][index].agenciasDeViajes === undefined  ? '--' : this.data[0][index].agenciasDeViajes,
      centroRecreativo:this.data[0][index].centroRecreativo === undefined  ? '--' : this.data[0][index].centroRecreativo,
      guíasDeTurismo:this.data[0][index].guíasDeTurismo === undefined  ? '--' : this.data[0][index].guíasDeTurismo,
      aventura: this.data[0][index].aventura === undefined  ? '--' : this.data[0][index].aventura,
      agroYEcoturismo: this.data[0][index].agroYEcoturismo === undefined  ? '--' : this.data[0][index].agroYEcoturismo,
      planesORutas: this.data[0][index].planesORutas === undefined  ? '--' : this.data[0][index].planesORutas,
      artesanías: this.data[0][index].artesanías === undefined  ? '--' : this.data[0][index].artesanías,
      transporte: this.data[0][index].transporte === undefined  ? '--' : this.data[0][index].transporte,
      eventos: this.data[0][index].eventos === undefined  ? '--' : this.data[0][index].eventos,

      pathImages: [], // -> lo conseguimos en la inserción de imágenes
      meGusta: 0, // -> # de Me gustas en la App
      pathImagePortada: { // -> lo conseguimos en la inserción de imágenes
        path:'',
        url: ''
      }
    }
    this.prestarrays.push(this.prestadorTuristico)
  }

  this.prestadoresService.agregarPrestadoresImportacion(this.prestarrays)
}

procesarValor(valor: any): number {
  if (valor === undefined) {
    return 0;
  }

  const valorSinEspacios = String(valor).replace(/\s+/g, '');

  const valorComoNumero = parseInt(valorSinEspacios, 10);

  if (!isNaN(valorComoNumero)) {
    return valorComoNumero;
  } else {
    return 0;
  }
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



