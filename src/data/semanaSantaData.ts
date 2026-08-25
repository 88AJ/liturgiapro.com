import { LiturgicalColor } from '../types/liturgia';

export interface HolyWeekRoleChecklist {
  momento: string;
  items: { id: string; texto: string; notas?: string }[];
}

export interface HolyWeekChant {
  momento: string;
  titulo: string;
  tonalidad?: string;
  autor?: string;
  letra: string;
  acordes?: string;
}

export interface HolyWeekSection {
  tipo: 'rubrica' | 'sacerdote' | 'pueblo' | 'lectura' | 'monicion' | 'canto' | 'dialogo';
  titulo?: string;
  texto: string;
  subtexto?: string;
  cita?: string;
}

export interface HolyWeekDay {
  id: string;
  titulo: string;
  subtitulo: string;
  tiempo: string;
  color: LiturgicalColor;
  colorHex: string;
  lema: string;
  descripcion: string;
  fechaSugerida: string; // ej: 2026-03-29
  
  // 1. Guion Litúrgico / Misal
  partesMisal: {
    id: string;
    nombre: string;
    secciones: HolyWeekSection[];
  }[];

  // 2. Sacristía & Credencia
  sacristia: {
    reglasOro: string[];
    vestiduras: string[];
    altarYCredencia: string[];
    elementosEspeciales: string[];
    checklists: HolyWeekRoleChecklist[];
  };

  // 3. Cantoral
  cantoral: HolyWeekChant[];

  // 4. Ministerios
  ministerios: {
    monaguillos: string[];
    mec: string[];
    lectores: string[];
    ujieres: string[];
  };

  // 5. Subsidios & Devociones
  subsidios?: {
    titulo: string;
    tipo: 'viacrucis' | 'horasanta' | 'sietepalabras' | 'retiro' | 'exsultet';
    contenido: string;
  }[];
}

export const SEMANA_SANTA_DATA: Record<string, HolyWeekDay> = {
  'ramos': {
    id: 'ramos',
    titulo: 'Domingo de Ramos en la Pasión del Señor',
    subtitulo: 'Conmemoración de la Entrada Triunfal del Señor en Jerusalén',
    tiempo: 'Semana Santa',
    color: 'Rojo',
    colorHex: '#800020',
    lema: '«¡Hosanna al Hijo de David! ¡Bendito el que viene en el nombre del Señor!»',
    descripcion: 'Abre la Semana Santa uniendo el triunfo mesiánico de Cristo en Jerusalén con el anuncio solemne de su Pasión y Muerte en la Cruz.',
    fechaSugerida: '2026-03-29',
    partesMisal: [
      {
        id: 'conmemoracion_entrada',
        nombre: 'I. Conmemoración de la Entrada del Señor en Jerusalén',
        secciones: [
          {
            tipo: 'rubrica',
            texto: 'En una iglesia o lugar adecuado fuera del templo, los fieles se congregan llevando ramos en las manos. El sacerdote y los ministros, revestidos de color rojo, se dirigen al lugar.'
          },
          {
            tipo: 'canto',
            titulo: 'Antífona de Entrada (Mt 21, 9)',
            texto: 'Hosanna al Hijo de David, bendito el que viene en nombre del Señor, el Rey de Israel. ¡Hosanna en el cielo!'
          },
          {
            tipo: 'sacerdote',
            titulo: 'Saludo Inicial',
            texto: 'En el nombre del Padre, y del Hijo, y del Espíritu Santo. La gracia de nuestro Señor Jesucristo, el amor del Padre y la comunión del Espíritu Santo estén con todos ustedes.'
          },
          {
            tipo: 'monicion',
            titulo: 'Monición del Celebrante',
            texto: 'Queridos hermanos: Ya desde el principio de la Cuaresma hemos venido preparando nuestros corazones con la penitencia y las obras de caridad. Hoy nos congregamos para iniciar, unidos con toda la Iglesia, la celebración del misterio pascual de nuestro Señor...'
          },
          {
            tipo: 'sacerdote',
            titulo: 'Oración de Bendición de los Ramos',
            texto: 'Dios todopoderoso y eterno, santifica con tu bendición + estos ramos, para que quienes acompañamos con gozo a Cristo nuestro Rey, podamos llegar por Él a la Jerusalén celestial. Él, que vive y reina por los siglos de los siglos. Amén.'
          },
          {
            tipo: 'rubrica',
            texto: 'El sacerdote rocía los ramos con agua bendita en silencio. Luego se proclama el Evangelio de la entrada en Jerusalén.'
          },
          {
            tipo: 'lectura',
            titulo: 'Evangelio de la Entrada (Mateo 21, 1-11)',
            cita: 'Mateo 21, 1-11',
            texto: `Cuando se acercaban a Jerusalén y llegaron a Betfagé, junto al monte de los Olivos, Jesús envió a dos discípulos diciéndoles: «Vayan a la aldea que tienen enfrente y encontrarán enseguida una burra atada con su burrito; desátenlos y tráiganmelos»...\n\nLa multitud, que era muy numerosa, alfombraba el camino con sus mantos; otros cortaban ramas de árboles y las tendían en el camino. Y las multitudes que iban delante y las que iban detrás gritaban: «¡Hosanna al Hijo de David! ¡Bendito el que viene en nombre del Señor! ¡Hosanna en las alturas!».\n\nAl entrar en Jerusalén, toda la ciudad se conmovió y decían: «¿Quién es éste?». Y la multitud respondía: «Éste es el profeta Jesús, de Nazaret de Galilea».\n\nPalabra del Señor.`
          },
          {
            tipo: 'rubrica',
            texto: 'Terminado el Evangelio, se inicia la Procesión hacia el templo mientras el coro y el pueblo entonan cantos en honor a Cristo Rey.'
          }
        ]
      },
      {
        id: 'liturgia_palabra',
        nombre: 'II. Liturgia de la Palabra y Pasión del Señor',
        secciones: [
          {
            tipo: 'sacerdote',
            titulo: 'Oración Colecta',
            texto: 'Dios todopoderoso y eterno, que hiciste que nuestro Salvador se encarnara y padeciera en la cruz para dar a la humanidad ejemplo de humildad, concédenos benigno que las enseñanzas de su Pasión nos sirvan de testimonio y merezcamos participar de su gloriosa Resurrección. Por nuestro Señor Jesucristo.'
          },
          {
            tipo: 'lectura',
            titulo: 'Primera Lectura (El Siervo Doliente)',
            cita: 'Isaías 50, 4-7',
            texto: 'El Señor Dios me ha dado una lengua de discípulo, para que sepa sostener con mi palabra al abatido... Mi rostro no hurté a los insultos ni a los salivazos. El Señor Dios es mi ayuda, por eso no quedé confundido. Palabra de Dios.'
          },
          {
            tipo: 'lectura',
            titulo: 'Salmo Responsorial',
            cita: 'Salmo 21',
            texto: 'R. Dios mío, Dios mío, ¿por qué me has abandonado?\n\nAl verme se burlan de mí, hacen visajes, menean la cabeza: «Acudió al Señor, que lo libre; que lo salve si tanto lo quiere».\n\nR. Dios mío, Dios mío, ¿por qué me has abandonado?'
          },
          {
            tipo: 'lectura',
            titulo: 'Segunda Lectura',
            cita: 'Filipenses 2, 6-11',
            texto: 'Cristo, siendo de condición divina, no hizo alarde de ser igual a Dios; sino que se despojó de sí mismo tomando la condición de esclavo... Por eso Dios lo exaltó sobre todo y le otorgó el Nombre que está sobre todo nombre. Palabra de Dios.'
          },
          {
            tipo: 'rubrica',
            texto: 'La Pasión del Señor se proclama sin incienso ni ciriales, sin saludo ni signación. Puede proclamarse a tres voces: Cronista (C), Sinarquía/Pueblo (S) y Cristo (†).'
          },
          {
            tipo: 'lectura',
            titulo: 'Pasión de Nuestro Señor Jesucristo según San Mateo',
            cita: 'Mateo 26, 14 – 27, 66',
            texto: `(C) En aquel tiempo, uno de los Doce, llamado Judas Iscariote, fue a los sumos sacerdotes y les dijo:\n(S) «¿Cuánto me darán si se lo entrego?»...\n\n(C) Jesús, dando de nuevo un fuerte grito, exhaló el espíritu.\n\n[Rúbrica: Aquí se arrodillan todos y se hace una pausa de silencio profundo]\n\n(C) En ese momento el velo del templo se rasgó en dos de arriba abajo... El centurión y los que estaban con él custodiando a Jesús exclamaron:\n(S) «¡Verdaderamente este hombre era Hijo de Dios!».\n\nPalabra del Señor.`
          }
        ]
      }
    ],
    sacristia: {
      reglasOro: [
        'Las vestiduras son de color ROJO para el celebrante, concelebrantes y diácono.',
        'Tener agua bendita con hisopo y acetre preparado en el atrio o lugar exterior de bendición.',
        'Tener preparados 3 micrófonos o atriles si la Pasión se lee a tres voces (Cronista, Pueblo, Cristo).'
      ],
      vestiduras: [
        'Casulla roja y estola roja para el sacerdote celebrante.',
        'Capa pluvial roja (opcional pero muy recomendada para la procesión de entrada).',
        'Albas y cíngulos para acólitos y lectores.'
      ],
      altarYCredencia: [
        'Ramos de palma o laurel en la mesa de bendición.',
        'Misal Romano marcado en Domingo de Ramos y Leccionario de la Pasión.',
        'Cáliz con purificador, patena con hostia grande, copones con formas suficientes.',
        'Vinajeras con agua y vino, lavabo y manutergio.'
      ],
      elementosEspeciales: [
        'Acetre con agua bendita e hisopo.',
        'Incensario con carbón encendido y naveta con incienso para la procesión.',
        'Cruz alta engalanada con un ramo o velo rojo y ciriales para encabezar la procesión.'
      ],
      checklists: [
        {
          momento: 'Antes de la Misa (Preparación Atrio)',
          items: [
            { id: 'ramos_mesa', texto: 'Mesa exterior con mantel y ramos listos para bendecir.' },
            { id: 'ramos_agua', texto: 'Acetre y aspersorio con agua bendita en el punto de partida.' },
            { id: 'ramos_incienso', texto: 'Carbón encendido listo en el incensario.' },
            { id: 'ramos_pasion', texto: 'Libros de la Pasión colocados en los atriles de los tres lectores.' }
          ]
        },
        {
          momento: 'Durante la Procesión',
          items: [
            { id: 'ramos_cruz', texto: 'Cruz procesional al frente con ciriales a los lados.' },
            { id: 'ramos_turif', texto: 'Turiferario precediendo al sacerdote.' },
            { id: 'ramos_orden', texto: 'Ujieres guiando al pueblo hacia las naves del templo.' }
          ]
        }
      ]
    },
    cantoral: [
      {
        momento: 'Bendición y Procesión de Ramos',
        titulo: '¡Hosanna al Hijo de David!',
        tonalidad: 'Re Mayor',
        letra: '¡Hosanna al Hijo de David!\n¡Bendito el que viene en el nombre del Señor!\n¡El Rey de Israel!\n¡Hosanna, hosanna en el cielo!',
        acordes: 'D - A - G - D / G - D - A7 - D'
      },
      {
        momento: 'Procesión hacia el Altar',
        titulo: 'Los Niños Hebreos',
        tonalidad: 'Mi Menor',
        letra: 'Los niños hebreos, llevando ramos de olivo,\nsalieron al encuentro del Señor aclamando:\n¡Hosanna en el cielo! ¡Hosanna en las alturas!',
        acordes: 'Em - D - C - B7 / Em - Am - B7 - Em'
      },
      {
        momento: 'Comunión',
        titulo: 'Cuerpo de Cristo, Pan de Vida',
        tonalidad: 'Sol Mayor',
        letra: 'Tomad y comed, este es mi Cuerpo;\ntomad y bebed, esta es mi Sangre.\nHaced esto en memoria mía.',
        acordes: 'G - C - D - G / Em - C - D7 - G'
      }
    ],
    ministerios: {
      monaguillos: [
        'El incensario debe abrir la marcha de la procesión exterior.',
        'Dos acólitos con ciriales flanquean la Cruz procesional.',
        'Durante la lectura de la Pasión, los monaguillos permanecen sentados o de pie en reverente silencio; no se llevan ciriales ni incienso al ambón.'
      ],
      mec: [
        'Purificar los copones con sumo respeto tras la comunión multitudinaria.',
        'Distribuir con calma ante la alta afluencia de fieles con ramos.'
      ],
      lectores: [
        'Ensayar la lectura de la Pasión a tres voces previamente con el cronista y sacerdote.',
        'Respetar el momento solemne de ponerse de rodillas tras la muerte del Señor.'
      ],
      ujieres: [
        'Distribuir ramos a los fieles a la entrada del atrio.',
        'Cuidar el orden de acceso al templo al concluir la procesión.',
        'Hacer la colecta parroquial de forma ágil durante el ofertorio.'
      ]
    }
  },

  'jueves': {
    id: 'jueves',
    titulo: 'Jueves Santo de la Cena del Señor',
    subtitulo: 'Misa Vespertina «In Coena Domini», Lavatorio de Pies y Traslado del Santísimo',
    tiempo: 'Triduo Pascual',
    color: 'Blanco',
    colorHex: '#FFFFFF',
    lema: '«Habiendo amado a los suyos que estaban en el mundo, los amó hasta el extremo» (Jn 13, 1)',
    descripcion: 'Inicia el Sacratísimo Triduo Pascual. Celebramos la institución de la Eucaristía, el Orden Sacerdotal y el mandamiento del amor fraterno.',
    fechaSugerida: '2026-04-02',
    partesMisal: [
      {
        id: 'ritos_iniciales',
        nombre: 'I. Ritos Iniciales y Canto del Gloria',
        secciones: [
          {
            tipo: 'rubrica',
            texto: 'El sagrario debe estar completamente vacío antes de iniciar la Misa. Se consagran en esta Misa las hostias necesarias para la comunión de hoy y de la celebración del Viernes Santo.'
          },
          {
            tipo: 'canto',
            titulo: 'Antífona de Entrada (Gálatas 6, 14)',
            texto: 'Nosotros debemos gloriarnos en la cruz de nuestro Señor Jesucristo: en él está nuestra salvación, vida y resurrección; él nos ha salvado y liberado.'
          },
          {
            tipo: 'rubrica',
            texto: 'Durante el canto del Himno del Gloria se tocan solemnemente las campanas. Al terminar el himno, las campanas enmudecen por completo hasta el Gloria de la Vigilia Pascual.'
          },
          {
            tipo: 'sacerdote',
            titulo: 'Oración Colecta',
            texto: 'Dios nuestro, que nos has congregado para celebrar la santísima Cena en la que tu Hijo unigénito, antes de entregarse a la muerte, confió a la Iglesia el nuevo y eterno sacrificio, concédenos alcanzar, en la participación de tan augusto misterio, la plenitud del amor y de la vida. Por nuestro Señor Jesucristo.'
          }
        ]
      },
      {
        id: 'lavatorio_pies',
        nombre: 'II. Liturgia de la Palabra y Lavatorio de los Pies (Mandatum)',
        secciones: [
          {
            tipo: 'lectura',
            titulo: 'Primera Lectura (La Pascua Judía)',
            cita: 'Éxodo 12, 1-8. 11-14',
            texto: 'El Señor dijo a Moisés y a Aarón: «Este mes será para ustedes el principal... Tomarán un cordero sin defecto... Es la Pascua del Señor». Palabra de Dios.'
          },
          {
            tipo: 'lectura',
            titulo: 'Segunda Lectura (La Institución Eucarística)',
            cita: '1 Corintios 11, 23-26',
            texto: 'Hermanos: Yo recibí del Señor lo que les he transmitido: que el Señor Jesús, la noche en que iba a ser entregado, tomó pan y dando gracias lo partió diciendo: «Esto es mi Cuerpo que se entrega por ustedes». Palabra de Dios.'
          },
          {
            tipo: 'lectura',
            titulo: 'Evangelio (El Lavatorio de los Pies)',
            cita: 'Juan 13, 1-15',
            texto: 'Antes de la fiesta de la Pascua, sabiendo Jesús que había llegado su hora... se levantó de la cena, se quitó el manto y tomando una toalla se la ciñó; echó agua en un lebrillo y se puso a lavar los pies a los discípulos... «Les he dado ejemplo para que lo que yo he hecho con ustedes, ustedes también lo hagan». Palabra del Señor.'
          },
          {
            tipo: 'rubrica',
            texto: 'Concluida la homilía, se procede al Lavatorio de los Pies. El sacerdote se quita la casulla, se ciñe una toalla y ayudado por los ministros lava y seca los pies a las personas elegidas mientras se cantan antífonas de la caridad.'
          },
          {
            tipo: 'canto',
            titulo: 'Canto del Lavatorio (Ubi Caritas)',
            texto: 'Donde hay caridad y amor, allí está Dios. El amor de Cristo nos ha congregado en la unidad.'
          }
        ]
      },
      {
        id: 'traslado_monumento',
        nombre: 'III. Liturgia Eucarística y Traslado del Santísimo Sacramento al Monumento',
        secciones: [
          {
            tipo: 'rubrica',
            texto: 'Terminada la comunión, se deja sobre el altar el copón con las hostias consagradas para el Viernes Santo. El sacerdote inciensa el Santísimo de rodillas, toma el velo humeral blanco y recibe el copón cubierto.'
          },
          {
            tipo: 'rubrica',
            texto: 'Se forma la procesión solemne por la nave de la iglesia precedida por la cruz, ciriales e incensarios humeantes hacia el lugar de la reserva (Monumento).'
          },
          {
            tipo: 'canto',
            titulo: 'Himno Eucarístico (Pange Lingua / Cantemos al Amor de los Amores)',
            texto: 'Canta, oh lengua, el misterio del cuerpo glorioso y de la sangre preciosa que el Rey de las naciones derramó como precio del mundo...\n\nTantum ergo Sacramentum veneremur cernui... (Adoremos, pues, postrados tan augusto Sacramento).'
          },
          {
            tipo: 'rubrica',
            texto: 'Llegados al Monumento, se deposita el copón en el tabernáculo. El sacerdote inciensa de nuevo y tras unos momentos de silencio y adoración, los ministros regresan al presbiterio y despojan el altar en silencio.'
          }
        ]
      }
    ],
    sacristia: {
      reglasOro: [
        'Dejar el Sagrario completamente ABIERTO y VACÍO antes de la Misa.',
        'Consagrar copones suficientes con hostias para la comunión de Jueves y Viernes Santo.',
        'Tener listo el lebrillo, jarra con agua tibia, jabón suave y 12 toallas limpias para el lavatorio.',
        'Desnudar el altar completamente (despojo) al terminar la Misa en reverente silencio.'
      ],
      vestiduras: [
        'Casulla blanca/dorada festiva para el celebrante.',
        'Velo humeral blanco para el traslado del Santísimo.',
        'Toalla para ceñirse el sacerdote durante el lavatorio.'
      ],
      altarYCredencia: [
        'Copón principal y copones auxiliares con formas suficientes.',
        'Cáliz con purificador y corporal.',
        'Lebrillo y jarra con agua tibia.',
        '12 toallas blancas limpias.',
        'Matraca de madera para suplir las campanas.'
      ],
      elementosEspeciales: [
        'Monumento o capilla de reserva bellamente adornada con flores y cirios para la adoración.',
        'Dos incensarios con carbón abundante para el traslado.',
        'Velo humeral blanco/dorado.',
        'Cirio o lámparas de adoración.'
      ],
      checklists: [
        {
          momento: 'Antes de la Misa Vespertina',
          items: [
            { id: 'jueves_sagrario_vacio', texto: 'Verificar sagrario principal abierto y sin reserva.' },
            { id: 'jueves_formas', texto: 'Calcular hostias para Jueves y Viernes Santo en los copones.' },
            { id: 'jueves_lavatorio_kit', texto: 'Jarra con agua tibia, lebrillo y toallas colocadas junto a las sillas de los 12.' },
            { id: 'jueves_monumento', texto: 'Monumento de reserva preparado con corporal, llave y cirios.' }
          ]
        },
        {
          momento: 'Al terminar la Misa (Despojo del Altar)',
          items: [
            { id: 'jueves_despojo', texto: 'Retirar manteles, velas y flores del altar principal.' },
            { id: 'jueves_cruces', texto: 'Cubrir o retirar las cruces del templo si es costumbre.' },
            { id: 'jueves_adoracion', texto: 'Iniciar los turnos de guardia y Hora Santa ante el Monumento.' }
          ]
        }
      ]
    },
    cantoral: [
      {
        momento: 'Gloria',
        titulo: 'Gloria a Dios en el Cielo (Festivo)',
        tonalidad: 'Sol Mayor',
        letra: 'Gloria a Dios en el cielo, y en la tierra paz a los hombres que ama el Señor...\n(Repique jubiloso de campanas)',
        acordes: 'G - D - Em - C / G - D7 - G'
      },
      {
        momento: 'Lavatorio de los Pies',
        titulo: 'Un Mandamiento Nuevo',
        tonalidad: 'Re Mayor',
        letra: 'Un mandamiento nuevo nos da el Señor:\nque nos amemos todos como Él nos amó.\nLa señal de los cristianos es amarnos como hermanos.',
        acordes: 'D - A7 - D / G - D - A7 - D'
      },
      {
        momento: 'Traslado del Santísimo',
        titulo: 'Pange Lingua / Cantemos al Amor de los Amores',
        tonalidad: 'Re Menor / Fa Mayor',
        letra: 'Cantemos al Amor de los amores, cantemos al Señor.\n¡Dios está aquí! Venid adoradores, adoremos a Cristo Redentor.\n¡Gloria a Cristo Jesús! Cielos y tierra, bendecid al Señor.',
        acordes: 'F - C - Dm - Bb / F - C7 - F'
      }
    ],
    ministerios: {
      monaguillos: [
        'Tocar campanillas vigorosamente durante el himno del Gloria.',
        'Acompañar con jarra y toallas al sacerdote durante el lavatorio.',
        'Dos turiferarios con incensarios encendidos marchan delante del Santísimo en el traslado.'
      ],
      mec: [
        'Apoyar en la comunión del pueblo bajo las dos especies si está prescrito.',
        'Acompañar en la adoración eucarística nocturna por turnos.'
      ],
      lectores: [
        'Proclamar el texto de la Institución con unción y claridad.',
        'Animar los salmos de adoración en el Monumento.'
      ],
      ujieres: [
        'Coordinar el paso de los fieles hacia el Monumento al finalizar la Misa.',
        'Guardar el silencio sagrado en el templo durante la noche de adoración.'
      ]
    },
    subsidios: [
      {
        titulo: 'Guion de la Hora Santa ante el Monumento',
        tipo: 'horasanta',
        contenido: `I. CANTO DE ENTRADA: Altísimo Señor o Cantemos al Amor de los Amores.\n\nII. EXPOSICIÓN Y SILENCIO DE ADORACIÓN (10 min)\nSacerdote: «Alabado sea el Santísimo Sacramento del Altar»\nPueblo: «Sea por siempre bendito y alabado».\n\nIII. LECTURA DEL EVANGELIO DE GETSEMANÍ (Mt 26, 36-46):\n«Llegó Jesús con ellos a un huerto llamado Getsemaní y dijo: "Quédense aquí y velen conmigo". Y cayendo rostro en tierra suplicaba: "Padre mío, si es posible, aparta de mí este cáliz; pero no se haga mi voluntad, sino la tuya"».\n\nIV. MEDITACIÓN: La soledad de Jesús en el huerto, la agonía por los pecados de la humanidad y la llamada a consolar su Corazón Eucarístico.\n\nV. PRECES POR LOS SACERDOTES Y POR LA IGLESIA.\n\nVI. RESERVA EN SILENCIO (a medianoche concluye la adoración solemne y queda en intimidad).`
      }
    ]
  },

  'viernes': {
    id: 'viernes',
    titulo: 'Viernes Santo de la Pasión del Señor',
    subtitulo: 'Celebración Litúrgica de la Muerte de Cristo, Adoración de la Cruz y Santo Viacrucis',
    tiempo: 'Triduo Pascual',
    color: 'Rojo',
    colorHex: '#800020',
    lema: '«Mirarán al que traspasaron» (Jn 19, 37)',
    descripcion: 'Día de ayuno y abstinencia. La Iglesia no celebra la Eucaristía, sino la solemne acción litúrgica de la Pasión, la Adoración del Árbol de la Cruz y la Sagrada Comunión.',
    fechaSugerida: '2026-04-03',
    partesMisal: [
      {
        id: 'postracion_inicial',
        nombre: 'I. Entrada en Silencio y Postración',
        secciones: [
          {
            tipo: 'rubrica',
            texto: 'El altar está completamente desnudo: sin manteles, sin cruz, sin velas. El sacerdote y los ministros entran en absoluto silencio, van al altar y se postran rostro en tierra; todos los fieles se arrodillan y oran en silencio.'
          },
          {
            tipo: 'sacerdote',
            titulo: 'Oración Inicial',
            texto: 'Acuérdate, Señor, de tu misericordia y santifica con tu constante protección a tus siervos, por quienes tu Hijo Jesucristo instituyó, con su sangre derramada, el misterio pascual. Por Jesucristo, nuestro Señor. Amén.'
          }
        ]
      },
      {
        id: 'liturgia_palabra_viernes',
        nombre: 'II. Liturgia de la Palabra y Pasión según San Juan',
        secciones: [
          {
            tipo: 'lectura',
            titulo: 'Primera Lectura (El Siervo que cargó con nuestros dolores)',
            cita: 'Isaías 52, 13 – 53, 12',
            texto: 'Miren, mi siervo tendrá éxito... Él soportó nuestros sufrimientos y aguantó nuestros dolores... Fue traspasado por nuestras rebeliones, triturado por nuestros crímenes. Nuestro castigo salvador cayó sobre él y por sus llagas fuimos curados. Palabra de Dios.'
          },
          {
            tipo: 'lectura',
            titulo: 'Salmo Responsorial',
            cita: 'Salmo 30',
            texto: 'R. Padre, a tus manos encomiendo mi espíritu.\n\nA ti, Señor, me acojo, no quede yo nunca defraudado;\ntu justicia me ponga a salvo.\nEn tus manos encomiendo mi espíritu:\ntú, el Dios leal, me librarás.\n\nR. Padre, a tus manos encomiendo mi espíritu.'
          },
          {
            tipo: 'lectura',
            titulo: 'Segunda Lectura',
            cita: 'Hebreos 4, 14-16; 5, 7-9',
            texto: 'Hermanos: Ya que tenemos un Sumo Sacerdote eminente que ha atravesado los cielos, Jesús, el Hijo de Dios, mantengamos firme la confesión de la fe... y convertido en causa de salvación eterna para todos los que le obedecen. Palabra de Dios.'
          },
          {
            tipo: 'lectura',
            titulo: 'Pasión de Nuestro Señor Jesucristo según San Juan',
            cita: 'Juan 18, 1 – 19, 42',
            texto: `En aquel tiempo, salió Jesús con sus discípulos al otro lado del torrente Cedrón, donde había un huerto... Pilato les dijo: «Aquí tienen a su Rey». Ellos gritaron: «¡Fuera, fuera, crucifícalo!»...\n\nJesús, sabiendo que ya todo estaba cumplido, dijo: «Tengo sed»... Inclinando la cabeza, entregó el espíritu.\n\n[Aquí se arrodillan todos y se hace una pausa de profundo silencio]\n\nUno de los soldados le traspasó el costado con una lanza, y al instante salió sangre y agua. Palabra del Señor.`
          }
        ]
      },
      {
        id: 'oracion_universal',
        nombre: 'III. Solemne Oración Universal (10 Intenciones)',
        secciones: [
          {
            tipo: 'rubrica',
            texto: 'La liturgia de la Palabra concluye con las 10 solemnes oraciones universales: 1. Por la Santa Iglesia, 2. Por el Papa, 3. Por todos los órdenes sagrados y por los fieles, 4. Por los catecúmenos, 5. Por la unidad de los cristianos, 6. Por los judíos, 7. Por los que no creen en Cristo, 8. Por los que no creen en Dios, 9. Por los gobernantes, 10. Por los que sufren.'
          }
        ]
      },
      {
        id: 'adoracion_cruz',
        nombre: 'IV. Adoración de la Santa Cruz',
        secciones: [
          {
            tipo: 'rubrica',
            texto: 'El sacerdote o el diácono va a la sacristía y trae procesionalmente la Cruz cubierta con un velo rojo o morado, acompañado de dos ministros con cirios encendidos. En tres paradas descubre la cruz cantando:'
          },
          {
            tipo: 'sacerdote',
            titulo: 'Ostensión de la Cruz',
            texto: '«Miren el árbol de la Cruz, donde estuvo clavada la salvación del mundo».'
          },
          {
            tipo: 'pueblo',
            titulo: 'Respuesta del Pueblo',
            texto: '«¡Vengan y adoremos!» (Todos se arrodillan en adoración).'
          },
          {
            tipo: 'canto',
            titulo: 'Improperios (Popule Meus)',
            texto: 'Pueblo mío, ¿qué te he hecho, o en qué te he ofendido? Respóndeme...\n¡Santo es Dios! ¡Santo y Fuerte! ¡Santo e Inmortal, ten piedad de nosotros!'
          }
        ]
      },
      {
        id: 'sagrada_comunion_viernes',
        nombre: 'V. Sagrada Comunión y Despedida en Silencio',
        secciones: [
          {
            tipo: 'rubrica',
            texto: 'Se extiende un mantel sobre el altar con un corporal. Se trae el Santísimo Sacramento desde el Monumento. Se reza el Padre Nuestro y se distribuye la Comunión. Terminada la oración final, todos se retiran en absoluto silencio.'
          }
        ]
      }
    ],
    sacristia: {
      reglasOro: [
        'El altar debe estar TOTALMENTE DESNUDO al inicio (sin manteles, sin velas, sin cruz).',
        'Tener preparada la Cruz velada para la ostensión y adoración.',
        'Tener listos dos ciriales para acompañar la Cruz y para el traslado del Santísimo desde el Monumento.',
        'Vestiduras ROJAS para el celebrante y diácono.'
      ],
      vestiduras: [
        'Casulla roja y estola roja para el celebrante.',
        'Albas y cíngulos para los acólitos.'
      ],
      altarYCredencia: [
        'Mantel de comunión doblado en la credencia (se coloca únicamente para el rito de comunión).',
        'Corporal, purificador y vaso con agua para purificar los dedos.',
        'Velo humeral rojo o blanco para traer el Santísimo del Monumento.'
      ],
      elementosEspeciales: [
        'Cruz grande de madera digna, cubierta con velo morado o rojo fácil de desvelar en tres partes.',
        'Cojín o paño para la base de la cruz durante la adoración.',
        'Matraca de madera para convocar al viacrucis y a la liturgia.'
      ],
      checklists: [
        {
          momento: 'Antes de la Celebración de la Pasión',
          items: [
            { id: 'viernes_cruz_velada', texto: 'Cruz procesional o de adoración cubierta con velo en sacristía.' },
            { id: 'viernes_altar_desnudo', texto: 'Confirmar altar sin ningún elemento decorativo.' },
            { id: 'viernes_leccionario_pasion', texto: 'Leccionario abierto en la Pasión según San Juan (Jn 18–19).' },
            { id: 'viernes_humeral', texto: 'Velo humeral listo para el traslado de comunión.' }
          ]
        }
      ]
    },
    cantoral: [
      {
        momento: 'Ostensión de la Cruz',
        titulo: 'Mirad el Árbol de la Cruz',
        tonalidad: 'La Menor',
        letra: 'V. Mirad el árbol de la cruz, donde estuvo clavada la salvación del mundo.\nR. ¡Venid a adorar! ¡Venid a adorar!',
        acordes: 'Am - G - F - E / Am - Dm - E7 - Am'
      },
      {
        momento: 'Adoración de la Cruz',
        titulo: 'Pueblo Mío (Los Improperios)',
        tonalidad: 'Re Menor',
        letra: 'Pueblo mío, ¿qué te he hecho? ¿En qué te he ofendido? ¡Respóndeme!\nYo te saqué de Egipto y te guié por el desierto,\ny tú has preparado una cruz para tu Salvador.\n¡Santo Dios, Santo y Fuerte, Santo e Inmortal, ten piedad de nosotros!',
        acordes: 'Dm - Gm - A7 - Dm / Gm - C - F - Bb - A7 - Dm'
      },
      {
        momento: 'Viacrucis / Comunión',
        titulo: 'Oh Rostro Lacerado',
        tonalidad: 'Mi Menor',
        letra: 'Oh Rostro Lacerado, bañado en sudor,\nde espinas coronado, herido por mi amor.\nJesús, Cordero manso, clavado en una cruz,\nenséñanos a amarte, divina eterna luz.',
        acordes: 'Em - B7 - Em / Am - Em - B7 - Em'
      }
    ],
    ministerios: {
      monaguillos: [
        'Postrarse junto con el sacerdote al entrar al presbiterio en silencio total.',
        'Dos acólitos con ciriales encendidos acompañan la entrada de la Cruz y la reserva eucarística.',
        'No se utiliza incensario ni campanillas en ningún momento de la liturgia del Viernes Santo.'
      ],
      mec: [
        'Distribuir la Eucaristía con suma devoción en la sobriedad del rito de comunión.',
        'Colaborar en el acompañamiento a enfermos con el viático si fuera necesario.'
      ],
      lectores: [
        'Proclamar las 10 intenciones solemnes con dicción clara y pausas reverentes para la oración comunitaria.',
        'Ensayar con esmero el relato de la Pasión de San Juan.'
      ],
      ujieres: [
        'Guiar la fila de veneración de la Santa Cruz para que los fieles puedan adorar con orden (beso o genuflexión).',
        'Colecta pontificia obligatoria por los Santos Lugares de Tierra Santa.'
      ]
    },
    subsidios: [
      {
        titulo: 'Santo Viacrucis Parroquial (14 Estaciones)',
        tipo: 'viacrucis',
        contenido: `1ª Estación: Jesús es condenado a muerte.\n«Te adoramos, oh Cristo, y te bendecimos, que por tu santa cruz redimiste al mundo».\n\n2ª Estación: Jesús carga con la cruz.\n3ª Estación: Jesús cae por primera vez.\n4ª Estación: Jesús encuentra a su afligida Madre.\n5ª Estación: Simón de Cirene ayuda a Jesús a llevar la cruz.\n6ª Estación: La Verónica enjuga el rostro de Jesús.\n7ª Estación: Jesús cae por segunda vez.\n8ª Estación: Jesús consuela a las santas mujeres de Jerusalén.\n9ª Estación: Jesús cae por tercera vez.\n10ª Estación: Jesús es despojado de sus vestiduras.\n11ª Estación: Jesús es clavado en la cruz.\n12ª Estación: Jesús muere en la cruz.\n13ª Estación: Jesús es bajado de la cruz y puesto en brazos de su Madre.\n14ª Estación: Jesús es colocado en el sepulcro.\n\nOración final por la esperanza de la Resurrección.`
      },
      {
        titulo: 'Sermón de las Siete Palabras en la Cruz',
        tipo: 'sietepalabras',
        contenido: `1ª Palabra: «Padre, perdónalos, porque no saben lo que hacen» (Lc 23, 34).\n2ª Palabra: «Hoy estarás conmigo en el paraíso» (Lc 23, 43).\n3ª Palabra: «Mujer, ahí tienes a tu hijo. Hijo, ahí tienes a tu madre» (Jn 19, 26-27).\n4ª Palabra: «Dios mío, Dios mío, ¿por qué me has abandonado?» (Mt 27, 46).\n5ª Palabra: «Tengo sed» (Jn 19, 28).\n6ª Palabra: «Todo está cumplido» (Jn 19, 30).\n7ª Palabra: «Padre, en tus manos encomiendo mi espíritu» (Lc 23, 46).`
      }
    ]
  },

  'vigilia': {
    id: 'vigilia',
    titulo: 'Solemne Vigilia Pascual en la Noche Santa',
    subtitulo: 'La Madre de Todas las Santas Vigilias: Lucernario, Pregón Pascual, Bautismos y Eucaristía',
    tiempo: 'Triduo Pascual / Pascua',
    color: 'Blanco',
    colorHex: '#FFFFFF',
    lema: '«¿Por qué buscan entre los muertos al que vive? No está aquí, ¡ha resucitado!» (Lc 24, 5-6)',
    descripcion: 'Cumbre de todo el año cristiano. Celebramos el paso de las tinieblas a la luz mediante el Fuego Nuevo, el Cirio Pascual, la proclamación de las maravillas de la salvación, el Bautismo y la primera Misa de Resurrección.',
    fechaSugerida: '2026-04-04',
    partesMisal: [
      {
        id: 'lucernario',
        nombre: 'I. Primera Parte: Solemne Lucernario y Pregón Pascual (Exsultet)',
        secciones: [
          {
            tipo: 'rubrica',
            texto: 'Todas las luces del templo deben estar completamente apagadas. Fuera de la iglesia se prepara una hoguera con fuego nuevo. El sacerdote con los ministros se acerca al fuego llevando el Cirio Pascual.'
          },
          {
            tipo: 'sacerdote',
            titulo: 'Bendición del Fuego Nuevo',
            texto: 'Oremos. Dios nuestro, que por medio de tu Hijo comunicaste a tus fieles el fuego de tu luz, santifica este fuego nuevo, y concédenos que la celebración de estas fiestas pascuales inflame en nosotros el deseo del cielo. Por Jesucristo, nuestro Señor. Amén.'
          },
          {
            tipo: 'rubrica',
            texto: 'El sacerdote graba con un punzón la cruz en el Cirio Pascual, las letras griegas Alfa y Omega, y los cuatro dígitos del año en curso (2026), diciendo:'
          },
          {
            tipo: 'dialogo',
            titulo: 'Preparación del Cirio Pascual',
            texto: '1. Cristo ayer y hoy (trazo vertical)\n2. Principio y fin (trazo horizontal)\n3. Alfa (letra Alfa)\n4. y Omega (letra Omega)\n5. Suyo es el tiempo (número 2)\n6. y la eternidad (número 0)\n7. A Él la gloria y el poder (número 2)\n8. por los siglos de los siglos. Amén (número 6).'
          },
          {
            tipo: 'rubrica',
            texto: 'Inserta los cinco granos de incienso en cruz diciendo: «Por sus llagas santas y gloriosas nos proteja y nos guarde Jesucristo nuestro Señor. Amén». Enciende el Cirio con el fuego nuevo.'
          },
          {
            tipo: 'sacerdote',
            titulo: 'Procesión con el Cirio',
            texto: 'El diácono o el sacerdote eleva el cirio y canta tres veces a lo largo del templo: «Luz de Cristo». Todos responden: «Demos gracias a Dios».'
          },
          {
            tipo: 'rubrica',
            texto: 'Al segundo anuncio se encienden las velas de los fieles desde el Cirio Pascual. Al tercer anuncio se encienden las luces del templo. El diácono inciensa el Cirio y entona el solemne Pregón Pascual (Exsultet).'
          },
          {
            tipo: 'canto',
            titulo: 'Pregón Pascual (Exsultet)',
            texto: '¡Exulten por fin los coros de los ángeles, exulte la asamblea celeste y un himno de gloria aclame el triunfo del Señor resucitado! ¡Alégrese también la tierra inundada de tanta claridad!...\n\n¡Esta es la noche en que Cristo, rotas las cadenas de la muerte, asciende victorioso del abismo!...\n\n¡Oh feliz culpa que mereció tal y tan grande Redentor!'
          }
        ]
      },
      {
        id: 'liturgia_palabra_vigilia',
        nombre: 'II. Segunda Parte: Liturgia de la Palabra (Las 7 Lecturas y el Gloria Pascual)',
        secciones: [
          {
            tipo: 'rubrica',
            texto: 'Se proponen siete lecturas del Antiguo Testamento que recorren la historia de la salvación (mínimo tres, siendo obligatoria la del Éxodo). Cada lectura va seguida de su salmo y oración colecta.'
          },
          {
            tipo: 'lectura',
            titulo: '1ª Lectura: La Creación',
            cita: 'Génesis 1, 1 – 2, 2',
            texto: 'Al principio creó Dios el cielo y la tierra... Vio Dios todo lo que había hecho, y era muy bueno. Palabra de Dios.'
          },
          {
            tipo: 'lectura',
            titulo: '3ª Lectura: El Paso del Mar Rojo (Obligatoria)',
            cita: 'Éxodo 14, 15 – 15, 1',
            texto: 'El Señor dijo a Moisés: «Di a los israelitas que se pongan en marcha... extiendan tu mano sobre el mar y divídelo»... Israel vio la mano potente del Señor sobre los egipcios y creyó en el Señor. Palabra de Dios.'
          },
          {
            tipo: 'rubrica',
            texto: 'Terminada la última lectura del Antiguo Testamento con su oración, se encienden los cirios del altar y el sacerdote entona solemnemente el Gloria, mientras repican jubilosas todas las campanas.'
          },
          {
            tipo: 'sacerdote',
            titulo: 'Oración Colecta de la Vigilia',
            texto: 'Señor Dios, que haces resplandecer esta noche santísima con la gloria de la Resurrección del Señor, aviva en tu Iglesia el espíritu de adopción filial, para que, renovados en cuerpo y alma, nos entreguemos plenamente a tu servicio. Por nuestro Señor Jesucristo.'
          },
          {
            tipo: 'lectura',
            titulo: 'Epístola Apostólica',
            cita: 'Romanos 6, 3-11',
            texto: 'Hermanos: ¿No saben que cuantos fuimos bautizados en Cristo Jesús, fuimos bautizados en su muerte?... Si hemos muerto con Cristo, creemos que también viviremos con Él. Palabra de Dios.'
          },
          {
            tipo: 'rubrica',
            texto: 'El sacerdote entona solemnemente el Aleluya pascual tres veces, elevando el tono en cada una, y el pueblo lo repite.'
          },
          {
            tipo: 'lectura',
            titulo: 'Evangelio de la Resurrección',
            cita: 'Mateo 28, 1-10 (Ciclo A)',
            texto: 'Pasado el sábado, al alborear el primer día de la semana, María Magdalena y la otra María fueron a ver el sepulcro. De pronto hubo un gran terremoto, pues un ángel del Señor bajó del cielo... y dijo a las mujeres: «No teman; sé que buscan a Jesús el crucificado. No está aquí: ¡ha resucitado como había dicho!». Palabra del Señor.'
          }
        ]
      },
      {
        id: 'liturgia_bautismal',
        nombre: 'III. Tercera Parte: Liturgia Bautismal y Renovación de Promesas',
        secciones: [
          {
            tipo: 'rubrica',
            texto: 'El sacerdote y los ministros van a la fuente bautismal o se coloca el recipiente con agua en el presbiterio. Se cantan las Letanías de los Santos.'
          },
          {
            tipo: 'sacerdote',
            titulo: 'Bendición del Agua Bautismal',
            texto: 'El sacerdote sumerge el Cirio Pascual en el agua una o tres veces diciendo: «Te pedimos, Señor, que por la gracia de tu Hijo descienda sobre esta agua la fuerza del Espíritu Santo, para que los sepultados con Cristo en el bautismo resuciten con Él a la vida eterna».'
          },
          {
            tipo: 'rubrica',
            texto: 'Si hay catecúmenos se celebran los Bautismos y Confirmaciones. Enseguida, todos los fieles de pie y con las velas encendidas renuevan las Promesas Bautismales y son asperjados con el agua bendita.'
          }
        ]
      },
      {
        id: 'liturgia_eucaristica_pascual',
        nombre: 'IV. Cuarta Parte: Liturgia Eucarística Pascual',
        secciones: [
          {
            tipo: 'rubrica',
            texto: 'La Misa prosigue con la preparación de los dones como de costumbre. Se utiliza el Prefacio Pascual I («En esta noche sobre todo...»). Al final de la Misa se despide con el doble Aleluya: «Pueden ir en paz, aleluya, aleluya. R. Demos gracias a Dios, aleluya, aleluya».'
          }
        ]
      }
    ],
    sacristia: {
      reglasOro: [
        'La Vigilia DEBE comenzar en la noche, después de anochecer, y concluir antes del amanecer del domingo.',
        'Tener leña seca y encendedor listos en el atrio exterior para la fogata de fuego nuevo.',
        'Cirio Pascual nuevo del año 2026 con los 5 granos de incienso y punzón de marcar.',
        'Agua abundante en la pila bautismal para la bendición y aspersión.',
        'Velitas con cono protector para todos los fieles.'
      ],
      vestiduras: [
        'Casulla blanca/dorada más solemne y festiva del ajuar parroquial.',
        'Dalmaticas blancas para diáconos.',
        'Albas impecables para todos los ministros y acólitos.'
      ],
      altarYCredencia: [
        'Cirio Pascual con candelabro monumental junto al ambón.',
        'Campanas preparadas para el Gloria.',
        'Letanías de los Santos impresas para el coro y cantores.',
        'Hisopo grande y acetres para la aspersión general de los fieles.'
      ],
      elementosEspeciales: [
        'Hoguera exterior con carbones.',
        'Punzón y 5 clavos de incienso rojos/dorados para el Cirio.',
        'Santo Crisma y Óleo de los Catecúmenos si hay bautismos y confirmaciones.',
        'Velas para todos los fieles y servidores.'
      ],
      checklists: [
        {
          momento: 'Antes del Inicio (Atrio y Templo)',
          items: [
            { id: 'vigilia_luces_off', texto: 'Todas las luces interiores y exteriores del templo totalmente apagadas.' },
            { id: 'vigilia_fuego_listo', texto: 'Hoguera exterior con leña y brasas vivas.' },
            { id: 'vigilia_cirio_nuevo', texto: 'Cirio Pascual 2026 listo con estilete y 5 granos de incienso.' },
            { id: 'vigilia_velas_pueblo', texto: 'Ujieres con canastas de velas distribuidas a los fieles.' }
          ]
        },
        {
          momento: 'En el Gloria',
          items: [
            { id: 'vigilia_luces_on', texto: 'Encender iluminación festiva del templo.' },
            { id: 'vigilia_campanas', texto: 'Repique solemne de todas las campanas y campanillas.' },
            { id: 'vigilia_altar_velas', texto: 'Encender los cirios del altar.' }
          ]
        }
      ]
    },
    cantoral: [
      {
        momento: 'Procesión del Lucernario',
        titulo: 'Luz de Cristo (Lumen Christi)',
        tonalidad: 'Modo Gregoriano',
        letra: 'V. Luz de Cristo.\nR. Demos gracias a Dios.',
        acordes: 'Canto a capela solista / respuesta coral'
      },
      {
        momento: 'Pregón Pascual',
        titulo: 'Exsultet (Pregón Pascual Solemne)',
        tonalidad: 'Modo Pascual',
        letra: 'Alégrese la tierra inundada de tanta claridad,\ny que, radiante con el fulgor del Rey eterno,\nsienta que han desaparecido las tinieblas de todo el orbe.\n¡Cristo ha resucitado de entre los muertos!',
        acordes: 'Recitativo solemne con órgano suave de fondo'
      },
      {
        momento: 'Gloria Pascual',
        titulo: 'Gloria a Dios en el Cielo (Pascual Jubiloso)',
        tonalidad: 'Re Mayor',
        letra: '¡Gloria a Dios en el cielo y en la tierra paz!\nTe alabamos, te bendecimos, te adoramos, te glorificamos...\n(Repique general de campanas y luces plenas)',
        acordes: 'D - G - A - D / Bm - Em - A7 - D'
      },
      {
        momento: 'Aspersión Bautismal',
        titulo: 'Bautízame, Señor, con tu Espíritu / Agua Pura',
        tonalidad: 'Fa Mayor',
        letra: 'Vi que salía agua del lado derecho del templo, ¡Aleluya!\nY todos aquellos a quienes llegó esta agua fueron salvados,\ny cantarán: ¡Aleluya, aleluya!',
        acordes: 'F - C - Dm - Bb / F - C7 - F'
      },
      {
        momento: 'Salida / Resurrección',
        titulo: '¡Resucitó, Resucitó, Resucitó, Aleluya!',
        tonalidad: 'La Menor / Mi Menor',
        letra: '¡Resucitó, resucitó, resucitó, aleluya!\n¡Aleluya, aleluya, aleluya, resucitó!\nLa muerte, ¿dónde está la muerte?\n¿Dónde está mi muerte, dónde su victoria?',
        acordes: 'Am - G - F - E / Am - Dm - E7 - Am'
      }
    ],
    ministerios: {
      monaguillos: [
        'Acompañar la procesión a oscuras manteniendo la solemnidad del Cirio Pascual.',
        'Encender las velas del altar durante el Gloria con presteza.',
        'Asistir al sacerdote con los óleos y el agua durante los bautismos.'
      ],
      mec: [
        'Apoyar en la logística del bautismo de adultos o niños si los hay.',
        'Distribuir la Eucaristía en la fiesta más grande de la Iglesia.'
      ],
      lectores: [
        'Proclamar las lecturas veterotestamentarias con voz pausada y solemne.',
        'Guiar las respuestas de los salmos responsoriales.'
      ],
      ujieres: [
        'Distribuir las velitas con protectores a todos los asistentes en el atrio.',
        'Cuidar que no se enciendan las velas hasta que el Cirio Pascual ingrese al templo.',
        'Apoyar en el flujo de la aspersión bautismal por las naves.'
      ]
    }
  },

  'domingo_pascua': {
    id: 'domingo_pascua',
    titulo: 'Domingo de Pascua de la Resurrección del Señor',
    subtitulo: 'Misa Solemne del Día de Pascua y Secuencia Pascual «Victimae Paschali Laudes»',
    tiempo: 'Tiempo Pascual',
    color: 'Blanco',
    colorHex: '#FFFFFF',
    lema: '«¡Este es el día en que actuó el Señor: sea nuestra alegría y nuestro gozo!» (Sal 117)',
    descripcion: 'Día de júbilo supremo. La Iglesia se viste de fiesta para celebrar el triunfo definitivo de Cristo sobre el pecado y la muerte. Se canta la Secuencia Pascual y se renueva la bendición.',
    fechaSugerida: '2026-04-05',
    partesMisal: [
      {
        id: 'ritos_domingo_pascua',
        nombre: 'I. Ritos Iniciales y Aspersión con Agua Bautismal',
        secciones: [
          {
            tipo: 'rubrica',
            texto: 'El Cirio Pascual permanece encendido junto al ambón en todas las Misas del tiempo pascual. En lugar del acto penitencial ordinario, es muy recomendable realizar el Rito de Aspersión con el agua bendecida en la Noche Santa.'
          },
          {
            tipo: 'canto',
            titulo: 'Antífona de Entrada (Salmo 138, 18. 5-6)',
            texto: 'He resucitado y todavía estoy contigo; has puesto sobre mí tu mano; tu sabiduría ha sido maravillosa, aleluya.'
          },
          {
            tipo: 'sacerdote',
            titulo: 'Oración Colecta',
            texto: 'Señor Dios, que por medio de tu Hijo unigénito, vencedor de la muerte, nos has abierto las puertas de la eternidad, concede a quienes celebramos la solemnidad de la Resurrección del Señor que, renovados por tu Espíritu, resucitemos a la luz de la vida. Por nuestro Señor Jesucristo.'
          }
        ]
      },
      {
        id: 'palabra_domingo_pascua',
        nombre: 'II. Liturgia de la Palabra y Secuencia Pascual',
        secciones: [
          {
            tipo: 'lectura',
            titulo: 'Primera Lectura (El Testimonio de Pedro)',
            cita: 'Hechos 10, 34a. 37-43',
            texto: 'En aquellos días, Pedro tomó la palabra y dijo: «Ustedes conocen lo que sucedió en toda Judea... A éste, Dios lo resucitó al tercer día y nos lo hizo ver, no a todo el pueblo, sino a los testigos que Dios había escogido de antemano, a nosotros, que comimos y bebimos con Él después de su resurrección». Palabra de Dios.'
          },
          {
            tipo: 'lectura',
            titulo: 'Salmo Responsorial',
            cita: 'Salmo 117',
            texto: 'R. Éste es el día en que actuó el Señor: sea nuestra alegría y nuestro gozo. ¡Aleluya!\n\nDen gracias al Señor porque es bueno,\nporque es eterna su misericordia.\nDiga la casa de Israel:\neterna es su misericordia.\n\nR. Éste es el día en que actuó el Señor: sea nuestra alegría y nuestro gozo. ¡Aleluya!'
          },
          {
            tipo: 'lectura',
            titulo: 'Segunda Lectura',
            cita: 'Colosenses 3, 1-4',
            texto: 'Hermanos: Ya que ustedes han resucitado con Cristo, busquen las cosas de arriba, donde está Cristo sentado a la derecha de Dios; aspiren a los bienes celestiales, no a los de la tierra. Palabra de Dios.'
          },
          {
            tipo: 'canto',
            titulo: 'Secuencia Pascual (Victimae Paschali Laudes - Obligatoria hoy)',
            texto: `Ofrezcan los cristianos alabanzas a la Víctima pascual.\nEl Cordero ha redimido a las ovejas: Cristo, el inocente, reconcilió a los pecadores con el Padre.\n\nMuerte y vida se enfrentaron en un duelo admirable:\nel Señor de la vida estuvo muerto, y ahora reina vivo.\n\nDinos, María: ¿qué viste en el camino?\n«Vi el sepulcro de Cristo viviente y la gloria del Señor resucitado;\nvi a los ángeles como testigos, el sudario y los lienzos.\n¡Resucitó Cristo, mi esperanza; precederá a los suyos en Galilea!».\n\nSabemos que Cristo verdaderamente ha resucitado de entre los muertos.\nTú, Rey victorioso, ten piedad de nosotros. Amén. ¡Aleluya!`
          },
          {
            tipo: 'lectura',
            titulo: 'Santo Evangelio (El Sepulcro Vacío)',
            cita: 'Juan 20, 1-9',
            texto: 'El primer día de la semana, María la Magdalena fue al sepulcro al amanecer, cuando aún estaba oscuro, y vio la losa quitada del sepulcro. Echó a correr y fue donde estaba Simón Pedro y el otro discípulo a quien Jesús amaba... Entró también el otro discípulo; vio y creyó. Pues hasta entonces no habían entendido la Escritura: que Él había de resucitar de entre los muertos. Palabra del Señor.'
          }
        ]
      }
    ],
    sacristia: {
      reglasOro: [
        'El Cirio Pascual encendido preside junto al ambón durante todas las Misas.',
        'Vestiduras blancas festivas.',
        'Tener agua bendecida en la Noche Santa para el rito de aspersión dominical.'
      ],
      vestiduras: [
        'Casulla blanca y estola festiva.',
        'Albas para todos los ministros.'
      ],
      altarYCredencia: [
        'Mantel blanco festivo con flores abundantes en el presbiterio.',
        'Acetre con hisopo para la aspersión.',
        'Subsidios de la Secuencia Pascual para el coro y los fieles.'
      ],
      elementosEspeciales: [
        'Flores pascuales (azucenas, lilis, orquídeas blancas).',
        'Icono de la Resurrección o imagen de Cristo Resucitado entronizada.'
      ],
      checklists: [
        {
          momento: 'Antes de las Misas del Domingo',
          items: [
            { id: 'pascua_cirio_on', texto: 'Encender el Cirio Pascual antes de iniciar la celebración.' },
            { id: 'pascua_secuencia_libreto', texto: 'Hojas de la Secuencia Victimae Paschali listas en el ambón y coro.' },
            { id: 'pascua_aspersorio', texto: 'Acetre con agua pascual preparado para el rito de entrada.' }
          ]
        }
      ]
    },
    cantoral: [
      {
        momento: 'Entrada',
        titulo: 'El Señor Resucitó, ¡Aleluya!',
        tonalidad: 'Sol Mayor',
        letra: 'El Señor resucitó, cantemos con alegría,\ndemos gracias al Señor, aleluya.\nJesucristo que moría en la cruz para salvarnos,\nha vencido a las tinieblas y nos da su vida eterna.',
        acordes: 'G - C - D - G / Em - Am - D7 - G'
      },
      {
        momento: 'Secuencia',
        titulo: 'Victimae Paschali Laudes (Secuencia de Pascua)',
        tonalidad: 'Re Mayor',
        letra: 'Victimae paschali laudes immolent Christiani...\n¡Lucharon vida y muerte en singular batalla y muerto el que es la Vida, triunfante se levanta!',
        acordes: 'D - A - G - D / Bm - F#m - G - A7 - D'
      },
      {
        momento: 'Comunión',
        titulo: 'Este es el Pan de los Hijos / Cristo Nuestra Pascua',
        tonalidad: 'Do Mayor',
        letra: 'Cristo nuestra Pascua ha sido inmolado, aleluya.\nCelebremos la fiesta con el pan de la sinceridad y de la verdad, aleluya.',
        acordes: 'C - G - Am - F / C - G7 - C'
      },
      {
        momento: 'Salida',
        titulo: 'Reina del Cielo, Alégrate (Regina Caeli)',
        tonalidad: 'Fa Mayor',
        letra: 'Reina del cielo, alégrate, aleluya.\nPorque el Señor a quien mereciste llevar, aleluya.\nHa resucitado según su palabra, aleluya.\nRuega al Señor por nosotros, aleluya.',
        acordes: 'F - Bb - C - F / Dm - Gm - C7 - F'
      }
    ],
    ministerios: {
      monaguillos: [
        'Portar la Cruz procesional y ciriales con alegría pascual.',
        'Acompañar al sacerdote durante la aspersión por los pasillos.'
      ],
      mec: [
        'Distribuir la Eucaristía a la gran asamblea pascual con reverencia y agilidad.'
      ],
      lectores: [
        'Cantar o recitar la Secuencia Pascual con entonación festiva.'
      ],
      ujieres: [
        'Acoger con felicitaciones pascuales a los fieles a la entrada.',
        'Distribuir los boletines conmemorativos de Pascua.'
      ]
    }
  }
};
