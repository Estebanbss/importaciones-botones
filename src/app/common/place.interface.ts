//Interfaz Base para Modelar nuestros datos - Base Modelo de Nuestros Objetos.
//Podemos extender los datos si es necesario con otra interfaz usando extends o integrar una interfaz y funciones dentro de otra para hacerla más robusta.

// Caso Practico:
// INTERFACES DE TIPO: ATRACTIVO TURÍSTICO - PRESTADOR TURISTICO - MUNICIPIO - RUTAS TURÍSTICAS.
// BASADOS EN SUS DEBIDOS FORMULARIOS A TENER EN CUENTA.

//Iniciamos con una interfaz con propiedades compartidas
export default interface Place {
  id?: string; // NO aparece en el Formulario, Firebase lo establece por defecto.
  name: string;
  descripcion: string;
  latitud?: number; //Opcional - Aparece en el formulario
  longitud?: number; //Opcional - Aparece en el formulario
  googleMaps?: string; //Opcional - Aparece en el formulario
  meGusta?: number; //Opcional - Se establece un contador que sólo trae el dato en caso de que presionen un ícono, similar al de editar o borrar. Y se enlaza con el id del sitio.
  pathImages?: string[]; //Array de Paths de Imágenes opcional ya que no se pueden exportar la información en un Json.
}

//Interfaz para Prestadoes Turisticos
export interface PrestadorTuristico extends Place {
  //id -> Se toma por código
  //name: string;
  rntRm: string;
  //descripcion: string;
  servicios: string;
  zona: string;
  municipio: string;
  direccion: string;
  indicacionesAcceso: string;
  //googleMaps?: string;
  //latitud?: number;
  //longitud?: number;
  whatsapp: number;
  celular1: number;
  celular2: number;
  facebook: string;
  instagram: string;
  pagWeb: string;
  correo: string;
  horarioAtencion: string;
  //pathImage?: string[]; -> Se toma por código
  //meGusta?: number; -> Se toma por código
}

// Interfaz Atractivo turístico
export interface AtractivoTuristico extends Place {
  //id
  //nombre: string;
  bienOLugar: string;
  //descripcion: string;
  clima: string;
  zona: string;
  municipio: string;
  direccionBarrioVereda: string;
  indicacionesAcceso: string;
  //latitud?: number;
  //longitud?: number;
  //googleMaps?: string;
  recomendaciones: string;
  actividades: string;
  horarioAtencion: string;
  administrador: string;
  contactoAdmin: string;
  redSocial: string;
  //pathImage?: string[];
  //meGusta?: number;
}

// Interfaz Municipio
export interface Municipio extends Place {
  //id
  //nombre: string;
  subregion: string;
  //descripcion: string;
  poblacion: string;
  gentilicio: string;
  clima: string;
  servicios: string;
  FiestasEventos: string;
  hechosHistoricos: string;
  sitioWeb: string;
  facebook: string;
  instagram: string;
  twitter: string;
  youtube: string;
  //latitud?: number;
  //longitud?: number;
  //googleMaps?: string;
  //pathImage?: string[];
  //meGusta?: number;
}

// Interfaz Ruta
export interface Ruta extends Place {
  //id
  //nombre: string
  informacionAdicional: string;
  agenciaDeViajes: string;
  //descripcion: string;
  //latitud?: number;
  //longitud?: number;
  //googleMaps?: string;
  //pathImage?: string[];
  //meGusta?: number;
}


//EJEMPLOS
// const ruta: Ruta = {
//   informacionAdicional: '',
//   agenciaDeViajes: '',
//   name: '',
//   descripcion: 'Ruta de prueba',
//   id: '',
//   latitud: 1,
//   longitud: 2,
//   googleMaps: ''
// }

//Ejemplo Objeto
// const municipio: Municipio = {
//   name: 'string',
//   subregion: 'string',
//   descripcion: 'string',
//   poblacion: 'string',
//   gentilicio: 'string',
//   clima: 'string',
//   servicios:'string',
//   FiestasEventos: 'string',
//   hechosHistoricos: 'string',
//   sitioWeb: 'string',
//   facebook: 'string',
//   instagram: 'string',
//   twitter:'string',
//   youtube: 'string',
//   //Place
//   id: 'string',
//   latitud: 123,
//   longitud: 456,
//   googleMaps: '',
//   pathImage: ['', '', '']
// }

//Se puede crear otro tipo de interfaces con el fin de modelar otros tipos de datos distintos
//Ejemplo sería categorías
