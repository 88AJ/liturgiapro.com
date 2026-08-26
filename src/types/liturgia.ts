export type LiturgicalColor = 'Verde' | 'Blanco' | 'Morado' | 'Rojo' | 'Rosa' | 'Negro';

export type LiturgicalSeason = 
  | 'Tiempo Ordinario' 
  | 'Cuaresma' 
  | 'Semana Santa' 
  | 'Triduo Pascual' 
  | 'Pascua' 
  | 'Octava de Pascua' 
  | 'Adviento' 
  | 'Navidad' 
  | 'Octava de Navidad'
  | 'Solemnidad';

export type CelebrationRank = 
  | 'Solemnidad' 
  | 'Fiesta' 
  | 'Memoria Obligatoria' 
  | 'Memoria Libre' 
  | 'Feria' 
  | 'Domingo';

export interface ReadingItem {
  titulo: string;
  cita: string;
  texto: string;
  monicion?: string;
}

export interface PsalmItem {
  cita: string;
  respuesta: string;
  texto: string;
  aclamacion?: string;
}

export interface LiturgiaPalabra {
  primera_lectura?: ReadingItem;
  salmo_responsorial?: PsalmItem;
  segunda_lectura?: ReadingItem;
  aclamacion_evangelio?: {
    cita?: string;
    texto: string;
  };
  evangelio?: ReadingItem;
}

export interface LiturgicalDay {
  fecha: string;
  dia_semana: string;
  tiempo_liturgico: string;
  color: LiturgicalColor;
  grado?: CelebrationRank;
  titulo_celebracion?: string;
  celebracion?: string;
  ciclo?: 'A' | 'B' | 'C';
  ano_ferial?: 'I' | 'II';
  monicion_entrada?: string;
  antifona_entrada?: string;
  rito_penitencial?: string;
  gloria?: boolean | string;
  oracion_colecta?: string;
  liturgia_palabra: LiturgiaPalabra;
  credo?: boolean | string;
  oracion_fieles?: string[];
  oracion_ofrendas?: string;
  prefacio?: {
    titulo: string;
    texto: string;
  };
  plegaria_eucaristica?: string;
  antifona_comunion?: string;
  oracion_comunion?: string;
  reflexion_homiletica?: string | string[];
  santos_dia?: string[];
  cantos_sugeridos?: SchemaCantosMisa;
  fuente_oficial?: string;
}

export type MomentoMisa = 
  | 'Entrada' 
  | 'Kyrie' 
  | 'Gloria' 
  | 'Salmo' 
  | 'Aleluya' 
  | 'Ofertorio' 
  | 'Santo' 
  | 'Paz' 
  | 'Cordero' 
  | 'Comunión' 
  | 'Meditación' 
  | 'Salida' 
  | 'Mariano';

export interface Cantico {
  id: string;
  titulo: string;
  momento: MomentoMisa;
  tiempo?: string;
  tonalidad?: string;
  acordes?: string;
  letra: string;
  autor?: string;
  youtubeQuery?: string;
}

export interface SchemaCantosMisa {
  entrada?: string;
  gloria?: string;
  salmo?: string;
  aleluya?: string;
  ofertorio?: string;
  santo?: string;
  paz?: string;
  comunion?: string;
  salida?: string;
}

export type SacramentoType = 
  | 'bautismo' 
  | 'confirmacion' 
  | 'matrimonio' 
  | 'reconciliacion' 
  | 'uncion' 
  | 'orden' 
  | 'xvanos' 
  | 'exequias';

export interface BautismoParams {
  nombreBebe: string;
  nombrePadres: string;
  nombrePadrinos: string;
  nombreCelebrante: string;
  nombreParroquia: string;
  fecha: string;
  enMisa: boolean;
}

export interface MatrimonioParams {
  nombreEsposo: string;
  nombreEsposa: string;
  nombrePadrinosVelacion?: string;
  nombrePadrinosAnillos?: string;
  nombrePadrinosArras?: string;
  nombrePadrinosLazo?: string;
  nombrePadrinosFlores?: string;
  nombrePadresNovio?: string;
  nombrePadresNovia?: string;
  nombreAmigosNovio?: string;
  nombreAmigasNovia?: string;
  nombreCelebrante: string;
  nombreParroquia: string;
  ciudadLugar?: string;
  nombreMusicos?: string;
  fecha: string;
}

export interface ExequiasParams {
  nombreDifunto: string;
  esAdulto: boolean;
  nombreFamiliares: string;
  nombreCelebrante: string;
  nombreParroquia: string;
  fecha: string;
  incluyeSepulcro: boolean;
}

export interface XVAñosParams {
  nombreQuinceanera: string;
  nombrePadres: string;
  nombrePadrinosBibliaRosario?: string;
  nombrePadrinosFlores?: string;
  nombrePadrinos?: string;
  nombreCelebrante: string;
  nombreParroquia: string;
  ciudadLugar?: string;
  nombreMusicos?: string;
  fecha: string;
}

export interface ConfirmacionParams {
  nombreObispo: string;
  nombrePastor: string;
  nombreVicario: string;
  nombreDiaconos?: string;
  nombreCRE?: string;
  nombreCatequistas?: string;
  nombreCoro?: string;
  nombreLectores?: string;
  nombreMonaguillos?: string;
  cantidadConfirmandos?: string;
  nombreParroquia: string;
  parroquiaDireccion?: string;
  ciudadLugar?: string;
  parroquiaTelefono?: string;
  fecha: string;
  idiomaModo?: 'bilingue' | 'espanol' | 'ingles';
}

export interface ParishBulletinData {
  nombreBoletin: string;
  parroquia: string;
  parroquiaDireccion: string;
  parroquiaTelefono: string;
  parroquiaEmail: string;
  mision?: string;
  misionDireccion?: string;
  misionTelefono?: string;
  misionEmail?: string;
  diocesis: string;
  fecha: string;
  edicionNumero: string;
  lemaHeader: string;
  lemaSemanal: string;
  portadaArteUrl?: string;
  portadaArteTitulo?: string;
  clerigos: { titulo: string; nombre: string; rol: string }[];
  qrDonacionUrl?: string;
  
  // Page 2: Mass Intentions & Directory
  intencionesMisasDetalladas: {
    dia: string;
    celebracion?: string;
    hora: string;
    lugar: string;
    intencion: string;
    idioma?: string;
  }[];
  horaSantaInfo?: { lugar: string; horario: string; confesiones: string };
  horarioOficina?: string;
  directorioMinisterios: { cargo: string; nombre: string; email?: string; telefono?: string }[];
  
  // Page 3: Sick, Agenda & Stewardship
  enfermosList: string[];
  oracionEnfermosTexto?: string;
  agendaSemanal: { fecha: string; evento: string; lugar: string; hora: string }[];
  diezmosYOfrendas: {
    comunidad: string;
    necesarioSemanal: string;
    necesarioMensual: string;
    colectaMes: string;
    donacionSemana: string;
  }[];
  velasSagrario: { parroquia: string; intencion: string }[];
  
  // Page 4: Liturgical Guide & Saints
  reflexionDomingo?: { titulo: string; cita: string; texto: string; oracion: string };
  semanaEnCasa?: { dia: string; santo: string; resumen: string; lecturas: string }[];
  
  // Page 5: From the Pastor & Parishioners
  mensajePastor: string;
  parroco: string;
  vicario?: string;
  articuloFeligres?: { titulo: string; autor: string; versiculoBiblico: string; texto: string };
  
  // Page 6: Announcements, Financial Report & Sponsors
  reporteFestival?: {
    titulo: string;
    fecha: string;
    ingresos: string;
    gastos: string;
    ganancia: string;
    booths: { nombre: string; patrocinador: string; monto: string }[];
  };
  anunciosGraficos: {
    titulo: string;
    subtitulo: string;
    fecha: string;
    descripcion: string;
    categoria: 'evento' | 'verano' | 'bingo' | 'aviso' | 'caridad';
  }[];
  patrocinadores: {
    negocio: string;
    rubro: string;
    contacto: string;
    telefono: string;
    direccion?: string;
  }[];
  codigoVestimenta?: {
    ninas: string;
    ninos: string;
    prohibido: string;
  };
  
  // Legacy compatibility
  horariosMisas?: { dia: string; horas: string }[];
  intencionesSemana?: string[];
  avisosParroquiales?: { titulo: string; descripcion: string }[];
  evangelioSemana?: { cita: string; texto: string; reflexionBreve: string };
  contacto?: { direccion: string; telefono: string; email: string };
}

export interface PadreProChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedAction?: {
    type: 'apply_moniciones' | 'apply_homilia' | 'apply_oracion_fieles';
    payload: any;
  };
}
