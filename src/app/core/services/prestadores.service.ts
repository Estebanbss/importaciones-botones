import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Storage } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class PrestadoresService {

  arregloDePromesas: Promise<any>[]; //Lo utilizamos para guardar nuestras promesas en la carga de archivos al servicio storage y asegurarnos que se cumplan todas para poder trabajar con ellas sin problema.

  //Inyección de servicios Firebase
  constructor(
    private firestore: Firestore, //Inyectamos el servicio de Firestore
    private storage: Storage //Inyectamos el servicio de Storage
    ) {
      //Aquí inicializamos nuestras propiedades de la clase
      this.arregloDePromesas = [];
    }

  //Método para generar los empleados e insertarlos en la base de datos
  //Create - C
  agregarPrestador(prestador: any, files: any): Promise<any> {

    //? -> Deberíamos ejecutar la carga de archivos antes de guardar los datos en la BD para que se guarde el arreglo de paths de la Imágenes de una vez en Firestore.
    //Hacer una validación para ejecutar el código si hay Archivos para cargar, de otra forma no es necesario

    if(!(files.length === 0)) {
      // console.log('Exísten archivos a cargar');

      //Creamos una referencia al sitio de firebase
      // En la referencia se coloca el servicio y el path donde queremos guardar, aún si el path no exíste se puede declarar

      // //? Creamos una forma para cargar todo el arreglo
      // //Utilizamos un ciclo for para recorrer el arreglo e insertar archivo por archivo adquiriendo su referencia
      // for(let file of files) {

      //   //Creamos la referencia para guardar
      //   const imgRef = ref(this.storage, `prestadoresStorage/${file.name}`);

      //   //Creamos un arreglo de promesas con lo que nos devuelve el método uploadBytes
      //   this.arregloDePromesas.push(uploadBytes(imgRef, file)); //Método para subir los archivos y retorna Promesas


      // } //Fin del for

    } //? -> Fin de la validación para carga de imágenes

    //? CARGA DE DATOS A FIRESTORE - YA SEA QUE LLEVE PATHS DE IMÁGENES O NO
    //Creamos una referencia a la colleción
    const prestadorRef = collection(this.firestore, 'prestadores'); // Servicio y nombre de la colección
    //Añadimos en un documento la referencia y los datos que lo componen
    return addDoc(prestadorRef, prestador); // Retorna una Promesa
  }


}
