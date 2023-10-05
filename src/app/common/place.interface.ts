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
  pathImages?: PathImage[]; //Array de Paths de Imágenes opcional ya que no se pueden exportar la información en un Json.
  pathImagePortada?: PathImage; //Imagen Principal del Sitio
}

//Vamos a crear un arreglo de objetos para almacenar el path de las imágenes y sus url de descarga
interface PathImage {
  path: string;
  url: string;
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
  whatsapp: any;
  celular1: any;
  celular2: any;
  facebook: string;
  instagram: string;
  pagWeb: string;
  correo: string;
  horarioAtencion: string;
  alojamientoRural?: string;
  tiendasDeCafé?: string;
  antojosTípicos?: string;
  sitioNatural?:string;
  patrimonioCultural?: string;
  miradores?:string;
  parquesNaturales?:string;
  agenciasDeViajes?:string;
  centroRecreativo?:string;
  guíasDeTurismo?:string;
  aventura?:string;
  agroYEcoturismo?:string;
  planesORutas?:string;
  artesanías?:string;
  transporte?:string;
  eventos?:string;
  //pathImage?: PathImage[]; -> Se toma por código
  //meGusta?: number; -> Se toma por código
  //pathImagePortada?: PathImage;
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
  //pathImagePortada?: PathImage;
}

// Interfaz Municipio
export interface Municipio extends Place {
  //id
  //nombre: string;
  zona: string;
  //descripcion: string;
  poblacion: string;
  gentilicio: string;
  clima: string;
  servicios: string;
  fiestasEventos: string;
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
  //pathImagePortada?: PathImage;
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
  //pathImagePortada?: PathImage;
}

//Se puede crear otro tipo de interfaces con el fin de modelar otros tipos de datos distintos
//Ejemplo sería categorías
