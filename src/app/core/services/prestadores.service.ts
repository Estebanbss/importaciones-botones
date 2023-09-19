import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, query, orderBy, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Storage, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { PrestadorTuristico } from 'src/app/common/place.interface';


@Injectable({
  providedIn: 'root'
})
export class PrestadoresService {

  //? Observable con el que compartimos información para editar un elemento de List a Editar
  private sharingDataPrestador: BehaviorSubject<PrestadorTuristico> = new BehaviorSubject<PrestadorTuristico>( {
          id: '', // -> Nos lo crea Firebase
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
          pathImages: [], // -> lo conseguimos en la inserción de imágenes
          meGusta: 0 // -> # de Me gustas en la App
  } )

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

  //? SECCIÓN COMPARTIR INFORMACIÓN

  //? Métodos para compartir información entre componentes por Observable

  //? Nos suscribimos a éste método para obtener los datos que tiene el observable
  get sharingPrestador() {
    return this.sharingDataPrestador.asObservable();
  }

  //? Cambiamos la Información al observable
  set editPrestadorData(newValue: PrestadorTuristico ) {
    this.sharingDataPrestador.next(newValue);
  }

  //? SECCIÓN AGREGAR

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
        const imgRef = ref(this.storage, `prestadoresStorage/${prestador.name}/${file.name}`);

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
        console.log('Error en el arreglo de Promesas');
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

  //? SECCIÓN LEER

  //? -> Creamos un método para obtener los datos de una colección
  //Read - R
  obtenerPrestadores(): Observable<PrestadorTuristico[]> {
    // Creamos una referencia a la colección de la que queremos recibir los datos
    const prestadorRef = collection(this.firestore, 'prestadores'); // Servicio y nombre de la colección

    //Ordenamos los datos que queremos traer de la colleción usando orderBy y limit en un query
    //El query nos sirve para organizar los datos que queremos traer de la BD
    const q = query(prestadorRef, orderBy("name", "asc"));

    //Retornamos el observable que nos devuelve una función anónima a la que nos debemos suscribir y en la que recibimos los datos solicitados de la colección
    return collectionData( q, { idField: 'id' }) as Observable<PrestadorTuristico[]>

  } //? -> Fin del método obtener Prestador

  //? SECCIÓN BORRAR

  //? -> Método para eliminar datos de la BD
  //Delete - D
  //Aquí podemos elegir pasar como parámetro el objeto entero con todos los elementos ó sólo el elemento con el que queremos crear la referencia para borrar
  //En este caso pasamos el objeto con todos los elementos
  borrarPrestador(prestador: any): Promise<any> {
    //Creamos la referencia al documento que queremos borrar
    const docRef = doc(this.firestore, `prestadores/${prestador.id}`); // Borramos por id
    return deleteDoc(docRef); // Nos retorna una promesa
  } //? Fin método eleminar prestador


  //? SECCIÓN ACTUALIZAR

  //? -> Método para Actualizar los datos de un Documento
  //Update - U
  actualizarEmpleado(prestador: any, files: any): Promise<any> {

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
        const imgRef = ref(this.storage, `prestadoresStorage/${prestador.name}/${file.name}`);

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

        //? ACTUALIZACIÓN DE DATOS
        //Creamos la referencia al documento de firestore
        const docRef = doc(this.firestore, `prestadores/${prestador.id}`);
        return updateDoc(docRef, prestador); // Retornamos la promesa

      })
      .catch(error => {
        console.log(error);
        console.log('Error en el arreglo de Promesas');
      }); //? Fin del Promise.all

    } else { // Si no hay archivos para cargar

      //? ACTUALIZACIÓN DE DATOS
      //Creamos la referencia al documento de firestore
      const docRef = doc(this.firestore, `prestadores/${prestador.id}`);
      return updateDoc(docRef, prestador); // Retornamos la promesa

    } //? -> Fin de la validación para carga de imágenes

    //? Código ChatGpt para solucionar return
    // Añadimos una declaración de retorno al final de la función
    return Promise.resolve(); // Puedes utilizar cualquier promesa vacía aquí

  } //? -> Fin del método Actualizar Empleado

  //? -> Método para obtener la URL de descarga de las imágenes y poder mostrarlas
  getImages(prestador: any) {
    //Arreglo de imágenes que vamos a retornar
    const images: any = [];

    //Vamos a recorrer el arreglo de pathImages de nuestro objeto para traer las URL de descarga de cada referencia
    prestador.pathImages.forEach(async (path: any) => {

      //Creamos una referencia a las imágenes que deseamos descargar
      const pathReference = ref(this.storage, path);

      //Utilizamos el método Firebase para obtener la URL de descarga
      const url = await getDownloadURL(pathReference);

      //Guardamos la url descargada en el arreglo de imágenes que vamos a mostrar
      images.push(url);

    });

    //Retornamos el arreglo de las url de imágen
    return images;

  }

  //? -> Método para eliminar las imágenes

}
