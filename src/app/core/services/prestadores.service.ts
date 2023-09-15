import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { PrestadorTuristico } from 'src/app/common/place.interface';


@Injectable({
  providedIn: 'root'
})
export class PrestadoresService {

  //? Propiedad Array de Promesas
  arregloDePromesas: Promise<any>[]; //Lo utilizamos para guardar nuestras promesas en la carga de archivos al servicio storage y asegurarnos que se cumplan todas para poder trabajar con ellas sin problema.

  //? -> Inyecciones de Dependencias
  //Inyección de servicios Firebase
  constructor(
    private firestore: Firestore, //Inyectamos el servicio de Firestore
    private storage: Storage //Inyectamos el servicio de Storage
    ) {
      //Aquí inicializamos nuestras propiedades de la clase
      this.arregloDePromesas = [];
    }

  //? Método para generar los empleados e insertarlos en la base de datos
  //Create - C
  agregarPrestador(prestador: any, files: any): Promise<any> {

    // console.log(prestador.pathImages.length);
    // console.log(prestador.pathImages);

    //? -> Deberíamos ejecutar la carga de archivos antes de guardar los datos en la BD para que se guarde el arreglo de paths de las Imágenes de una vez en Firestore.
    //Hacer una validación para ejecutar el código si hay Archivos para cargar, de otra forma no es necesario

    if(!(files.length === 0)) {
      console.log('Exísten archivos a cargar');

      //Creamos una referencia al sitio de firebase
      //En la referencia se coloca el servicio y el path donde queremos guardar, aún si el path no exíste se puede declarar

      //? Creamos una forma para cargar todo el arreglo
      //Utilizamos un ciclo for para recorrer el arreglo e insertar archivo por archivo adquiriendo su referencia
      for(let file of files) {

        //Creamos la referencia para guardar en Storage
        const imgRef = ref(this.storage, `prestadoresStorage/${file.name}`);

        //? Procedemos a insertar las imágenes una a una en el Storage con el método uploadBytes y guardamos las respuestas en un arreglo de Promesas
        //Creamos un arreglo de promesas con lo que nos devuelve el método uploadBytes
        this.arregloDePromesas.push(uploadBytes(imgRef, file)); //Método para subir los archivos y retorna Promesas

      } //Fin del for

      //? Necesitamos los datos que dan las respuestas a las promesas de la carga de Imágenes, por eso gestionamos todo con un Promise.all para obtenerlas
      //Utilizamos un Promise all para asegurarnos de que el código no avanza hasta que todas las promesas se cumplan
      Promise.all(this.arregloDePromesas)
      .then(resultados => {

        //Nos retorna un arreglo con las respuestas de las promesas
        //Procedemos a iterar para trabajar con cada resultado y obtener el o los path que queremos guardar
        for( let resultado of resultados) {
          // console.log(resultado);
          const fullPath = resultado.metadata.fullPath;
          // console.log(fullPath);
          prestador.pathImages.push(fullPath); //Guardamos los Paths en nuestro arreglo pathImages
        }

        //? CARGA DE DATOS A FIRESTORE
        //Creamos una referencia a la colleción
        const prestadorRef = collection(this.firestore, 'prestadores'); // Servicio y nombre de la colección
        //Añadimos en un documento la referencia y los datos que lo componen
        return addDoc(prestadorRef, prestador); // Retorna una Promesa

      })
      .catch(error => {
        console.log(error);
      }); //? Fin del Promise.all

    } else { // Si no hay archivos para cargar

      //? CARGA DE DATOS A FIRESTORE
      //Creamos una referencia a la colleción
      const prestadorRef = collection(this.firestore, 'prestadores'); // Servicio y nombre de la colección
      //Añadimos en un documento la referencia y los datos que lo componen
      return addDoc(prestadorRef, prestador); // Retorna una Promesa

    } //? -> Fin de la validación para carga de imágenes

    //? Código ChatGpt para solucionar return
    // Añadimos una declaración de retorno al final de la función
    return Promise.resolve(); // Puedes utilizar cualquier promesa vacía aquí

  } //? Fin método agregar Prestador


  //? -> Creamos un método para obtener los datos de una colección
  //Read - R
  obtenerPrestadores(): Observable<PrestadorTuristico[]> {
    // Creamos una referencia a la colección de la que queremos recibir los datos
    const prestadorRef = collection(this.firestore, 'prestadores'); // Servicio y nombre de la colección

    //Retornamos el observable que nos devuelve una función anónima a la que nos debemos suscribir y en la que recibimos los datos solicitados de la colección
    return collectionData( prestadorRef, { idField: 'id' }) as Observable<PrestadorTuristico[]>

  }


}
