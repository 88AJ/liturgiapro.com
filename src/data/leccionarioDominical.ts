import { LiturgicalColor, CelebrationRank } from '../types/liturgia';

export interface LectionaryEntry {
  titulo_celebracion: string;
  tiempo_liturgico: string;
  color: LiturgicalColor;
  grado: CelebrationRank;
  antifona_entrada: string;
  oracion_colecta: string;
  monicion_entrada?: string;
  primera_lectura: {
    titulo: string;
    cita: string;
    texto: string;
    monicion?: string;
  };
  salmo_responsorial: {
    cita: string;
    respuesta: string;
    texto: string;
  };
  segunda_lectura?: {
    titulo: string;
    cita: string;
    texto: string;
    monicion?: string;
  };
  aclamacion_evangelio: {
    texto: string;
  };
  evangelio: {
    titulo: string;
    cita: string;
    texto: string;
    monicion?: string;
  };
  oracion_ofrendas: string;
  antifona_comunion: string;
  oracion_comunion: string;
  reflexion_homiletica?: string[];
}

/**
 * Base de Datos del Leccionario Romano y Misal para los 34 Domingos del Tiempo Ordinario (Ciclos A, B y C)
 */
export const LECCIONARIO_ORDINARIO: Record<string, Partial<Record<'A' | 'B' | 'C', LectionaryEntry>>> = {
  // DOMINGO 20
  '20': {
    'A': {
      titulo_celebracion: 'XX Domingo del Tiempo Ordinario',
      tiempo_liturgico: 'Tiempo Ordinario',
      color: 'Verde',
      grado: 'Domingo',
      antifona_entrada: 'Fíjate, oh Dios, en nuestro escudo, mira el rostro de tu Ungido (Sal 83, 10-11).',
      monicion_entrada: 'Hermanos: La liturgia de hoy nos muestra que el amor de Dios no tiene fronteras ni acepción de personas.',
      oracion_colecta: 'Dios nuestro, que has preparado bienes invisibles para los que te aman, infunde en nuestros corazones la ternura de tu amor, para que, amándote en todo y sobre todo, consigamos tus promesas, que superan todo deseo. Por nuestro Señor Jesucristo.',
      primera_lectura: {
        titulo: 'Primera Lectura',
        cita: 'Isaías 56, 1. 6-7',
        monicion: 'El profeta Isaías abre las puertas del Templo a todos los pueblos: «Mi casa será llamada casa de oración para todos los pueblos».',
        texto: 'Así dice el Señor: «Observen el derecho, practiquen la justicia, porque mi salvación está para llegar y mi justicia para manifestarse... A los extranjeros que se han unido al Señor para servirlo... los traeré a mi monte santo, los llenaré de júbilo en mi casa de oración; porque mi casa es casa de oración para todos los pueblos». Palabra de Dios.'
      },
      salmo_responsorial: {
        cita: 'Salmo 66',
        respuesta: 'R. Que los pueblos te alaben, Señor; que todos los pueblos te alaben.',
        texto: 'El Señor tenga piedad y nos bendiga,\nilumine su rostro sobre nosotros;\nconozca la tierra tus caminos,\ntodos los pueblos tu salvación.\n\nR. Que los pueblos te alaben, Señor; que todos los pueblos te alaben.'
      },
      segunda_lectura: {
        titulo: 'Segunda Lectura',
        cita: 'Romanos 11, 13-15. 29-32',
        monicion: 'San Pablo reflexiona sobre la irrevocable vocación de Israel y los dones de la misericordia universal de Dios.',
        texto: 'Hermanos: Les digo a ustedes, los gentiles... los dones y la llamada de Dios son irrevocables. Así como ustedes en otro tiempo desobedecieron a Dios, pero ahora han alcanzado misericordia... Dios encerró a todos en la desobediencia para tener misericordia de todos. Palabra de Dios.'
      },
      aclamacion_evangelio: {
        texto: 'R. Aleluya, aleluya.\nJesús proclamaba el Evangelio del Reino, curando toda enfermedad en el pueblo.\nR. Aleluya.'
      },
      evangelio: {
        titulo: 'Santo Evangelio',
        cita: 'Mateo 15, 21-28',
        monicion: 'Una mujer cananea conmueve el corazón de Jesús con su fe inquebrantable y humilde súplica.',
        texto: 'En aquel tiempo, Jesús salió y se retiró a la región de Tiro y Sidón. Entonces una mujer cananea, saliendo de aquellos términos, se puso a gritar: «¡Ten piedad de mí, Señor, Hijo de David! Mi hija está atormentada por un demonio»... Ella vino a postrarse ante él diciendo: «¡Señor, socórreme!». Él le dijo: «No está bien tomar el pan de los hijos y echárselo a los perritos». Pero ella repuso: «Tienes razón, Señor; pero también los perritos comen las migajas que caen de la mesa de sus señores». Jesús respondió: «¡Mujer, qué grande es tu fe! Que se cumpla lo que deseas». Y en aquel instante quedó curada su hija. Palabra del Señor.'
      },
      oracion_ofrendas: 'Acepta, Señor, estos dones en los que se realiza un admirable intercambio...',
      antifona_comunion: 'En el Señor está la misericordia, la redención copiosa.',
      oracion_comunion: 'Unidos a Cristo por este sacramento, imploramos, Señor, tu clemencia...'
    }
  },

  // DOMINGO 21
  '21': {
    'A': {
      titulo_celebracion: 'XXI Domingo del Tiempo Ordinario',
      tiempo_liturgico: 'Tiempo Ordinario',
      color: 'Verde',
      grado: 'Domingo',
      antifona_entrada: 'Inclina tu oído, Señor, y escúchame; salva a tu siervo que confía en ti. Ten piedad de mí, Señor, pues a ti clamo todo el día (Sal 85, 1-3).',
      monicion_entrada: 'Hermanos: En este vigésimo primer domingo del Tiempo Ordinario, Jesús nos formula en el Evangelio la pregunta más decisiva de nuestra existencia: «¿Quién dicen ustedes que soy yo?». Con Pedro confesemos nuestra fe en Cristo y celebremos con júbilo este Santo Sacrificio.',
      oracion_colecta: 'Señor Dios, que unes en un solo querer los corazones de tus fieles, concédenos amar lo que mandas y desear lo que prometes, para que, en medio de las vicisitudes del mundo, nuestros corazones estén firmes allí donde se encuentran los verdaderos gozos. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
      primera_lectura: {
        titulo: 'Primera Lectura',
        cita: 'Isaías 22, 19-23',
        monicion: 'El profeta Isaías anuncia la investidura de Eliacim con la llave de la casa de David, signo de autoridad benevolente y fiel.',
        texto: 'Así dice el Señor a Sebná, mayordomo de palacio:\n«Te echaré de tu puesto, te destituiré de tu cargo. Aquel día llamaré a mi siervo, a Eliacim, hijo de Elcías: le vestiré tu túnica, le ceñiré tu banda, le confiaré tu poder; y será un padre para los habitantes de Jerusalén y para la casa de Judá.\n\nPondré sobre su hombro la llave de la casa de David: lo que él abra nadie lo cerrará, lo que él cierre nadie lo abrirá. Lo clavaré como un clavo en sitio firme, y será trono de gloria para la casa de su padre».\n\nPalabra de Dios.'
      },
      salmo_responsorial: {
        cita: 'Salmo 137, 1-2a. 2bc-3. 6 y 8bc',
        respuesta: 'R. Señor, tu misericordia es eterna, no abandones la obra de tus manos.',
        texto: 'Te doy gracias, Señor, de todo corazón;\ndelante de los ángeles tañeré para ti.\nMe postraré hacia tu santuario,\ndaré gracias a tu nombre por tu misericordia y tu lealtad.\n\nR. Señor, tu misericordia es eterna, no abandones la obra de tus manos.'
      },
      segunda_lectura: {
        titulo: 'Segunda Lectura',
        cita: 'Romanos 11, 33-36',
        monicion: 'San Pablo eleva un himno de alabanza ante la insondable sabiduría, la ciencia y los designios amorosos de Dios.',
        texto: '¡Qué abismo de generosidad, de sabiduría y de conocimiento el de Dios! ¡Qué insondables sus decisiones y qué irrastreables sus caminos! ¿Quién conoció la mente del Señor? ¿Quién fue su consejero? ¿Quién le ha dado primero para tener derecho a la recompensa?\n\nPorque de él, por él y para él son todas las cosas. A él la gloria por los siglos. Amén.\n\nPalabra de Dios.'
      },
      aclamacion_evangelio: {
        texto: 'R. Aleluya, aleluya.\nTú eres Pedro, y sobre esta piedra edificaré mi Iglesia, y el poder del infierno no prevalecerá contra ella.\nR. Aleluya.'
      },
      evangelio: {
        titulo: 'Santo Evangelio',
        cita: 'Mateo 16, 13-20',
        monicion: 'Jesús pregunta a sus apóstoles sobre su identidad. La inspirada respuesta de Pedro recibe la promesa de las llaves del Reino.',
        texto: 'En aquel tiempo, al llegar a la región de Cesarea de Filipo, Jesús preguntó a sus discípulos:\n«¿Quién dice la gente que es el Hijo del hombre?».\n\nEllos contestaron:\n«Unos dicen que Juan el Bautista; otros, que Elías; otros, que Jeremías o uno de los profetas».\n\nÉl les preguntó:\n«Y ustedes, ¿quién dicen que soy yo?».\n\nSimón Pedro tomó la palabra y dijo:\n«Tú eres el Mesías, el Hijo de Dios vivo».\n\nJesús le respondió:\n«¡Dichoso tú, Simón, hijo de Jonás!, porque eso no te lo ha revelado nadie de carne y hueso, sino mi Padre que está en el cielo. Ahora yo te digo: Tú eres Pedro, y sobre esta piedra edificaré mi Iglesia, y el poder del infierno no la derrotará.\n\nTe daré las llaves del reino de los cielos; lo que ates en la tierra quedará atado en los cielos, y lo que desates en la tierra quedará desatado en los cielos».\n\nY les mandó severamente a los discípulos que no dijesen a nadie que él era el Mesías.\n\nPalabra del Señor.'
      },
      oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
      antifona_comunion: 'El que come mi carne y bebe mi sangre tiene vida eterna, dice el Señor, y yo lo resucitaré en el último día (Jn 6, 55).',
      oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.',
      reflexion_homiletica: [
        'La pregunta que Cristo dirige a los doce en Cesarea de Filipo trasciende el tiempo y nos interpela directamente hoy: «¿Quién dicen ustedes que soy yo?».',
        'La confesión de fe de Pedro no brotó de la sabiduría humana, sino de la revelación del Padre celestial.'
      ]
    },
    'B': {
      titulo_celebracion: 'XXI Domingo del Tiempo Ordinario',
      tiempo_liturgico: 'Tiempo Ordinario',
      color: 'Verde',
      grado: 'Domingo',
      antifona_entrada: 'Inclina tu oído, Señor, y escúchame; salva a tu siervo que confía en ti (Sal 85, 1-2).',
      monicion_entrada: 'Hermanos: Concluimos el discurso del Pan de Vida con la confesión de Pedro: «Señor, ¿a quién iremos? Tú tienes palabras de vida eterna».',
      oracion_colecta: 'Señor Dios, que unes en un solo querer los corazones de tus fieles...',
      primera_lectura: {
        titulo: 'Primera Lectura',
        cita: 'Josué 24, 1-2a. 15-17. 18b',
        monicion: 'Josué congrega a las tribus en Siquén y les pide elegir con libertad y fidelidad a quién servir.',
        texto: 'En aquellos días, Josué reunió a todas las tribus de Israel en Siquén... y les dijo: «Si no les parece bien servir al Señor, elijan hoy a quién quieren servir... Por mi parte, yo y mi casa serviremos al Señor». El pueblo respondió: «¡Lejos de nosotros abandonar al Señor para servir a dioses extranjeros!... Nosotros también serviremos al Señor: ¡él es nuestro Dios!». Palabra de Dios.'
      },
      salmo_responsorial: {
        cita: 'Salmo 33',
        respuesta: 'R. Gusten y vean qué bueno es el Señor.',
        texto: 'Bendigo al Señor en todo momento,\nsu alabanza está siempre en mi boca;\nmi alma se gloría en el Señor:\nque los humildes lo escuchen y se alegren.\n\nR. Gusten y vean qué bueno es el Señor.'
      },
      segunda_lectura: {
        titulo: 'Segunda Lectura',
        cita: 'Efesios 5, 21-32',
        monicion: 'San Pablo contempla el matrimonio cristiano a la luz del amor entregado de Cristo a su Iglesia.',
        texto: 'Hermanos: Sean sumisos unos a otros en el temor de Cristo... Maridos, amen a sus esposas como Cristo amó a la Iglesia y se entregó a sí mismo por ella para consagrarla... «Por eso dejará el hombre a su padre y a su madre, y se unirá a su mujer y serán los dos una sola carne». Es este un gran misterio: y yo lo refiero a Cristo y a la Iglesia. Palabra de Dios.'
      },
      aclamacion_evangelio: {
        texto: 'R. Aleluya, aleluya.\nTus palabras, Señor, son espíritu y vida; tú tienes palabras de vida eterna.\nR. Aleluya.'
      },
      evangelio: {
        titulo: 'Santo Evangelio',
        cita: 'Juan 6, 60-69',
        monicion: 'Ante el misterio de la Eucaristía, Pedro confiesa: «Señor, ¿a quién iremos? Tú tienes palabras de vida eterna».',
        texto: 'En aquel tiempo, muchos de los discípulos de Jesús dijeron: «Este modo de hablar es duro, ¿quién puede escucharlo?»... Desde entonces, muchos discípulos se echaron atrás y ya no andaban con él. Entonces Jesús dijo a los Doce: «¿También ustedes quieren marcharse?». Le respondió Simón Pedro: «Señor, ¿a quién iremos? Tú tienes palabras de vida eterna; y nosotros creemos y sabemos que tú eres el Santo de Dios». Palabra del Señor.'
      },
      oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo...',
      antifona_comunion: 'El que come mi carne y bebe mi sangre tiene vida eterna...',
      oracion_comunion: 'Que la obra redentora de tu misericordia fructifique en nosotros...'
    }
  },

  // DOMINGO 22
  '22': {
    'A': {
      titulo_celebracion: 'XXII Domingo del Tiempo Ordinario',
      tiempo_liturgico: 'Tiempo Ordinario',
      color: 'Verde',
      grado: 'Domingo',
      antifona_entrada: 'Ten piedad de mí, Señor, pues a ti clamo todo el día; porque tú, Señor, eres bueno, indulgente y lleno de misericordia con aquellos que te invocan (Sal 85, 3. 5).',
      monicion_entrada: 'Hermanos: En este vigésimo segundo domingo del Tiempo Ordinario, la Palabra de Dios nos enseña que seguir a Jesús implica abrazar la cruz con generosidad y no amoldarse a los criterios del mundo.',
      oracion_colecta: 'Dios de poder y de misericordia, de quien procede todo don perfecto, infunde en nuestros corazones el amor de tu nombre, para que, haciendo más religiosa nuestra vida, asegures el bien que ha nacido en nosotros y lo conserves con tu constante protección. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
      primera_lectura: {
        titulo: 'Primera Lectura',
        cita: 'Jeremías 20, 7-9',
        monicion: 'El profeta Jeremías confiesa la fuerza irresistible de la Palabra de Dios que arde en su corazón como fuego ardiente.',
        texto: 'Me sedujiste, Señor, y me dejé seducir; me forzaste y prevaleciste. He sido el oprobio cotidiano, todos se burlan de mí. Siempre que hablo tengo que gritar: «¡Violencia, destrucción!». La palabra del Señor se ha convertido para mí en oprobio y burla cotidiana.\n\nMe dije: «No me acordaré de él, no hablaré más en su nombre»; pero había en mis entrañas como fuego ardiente encerrado en mis huesos; intentaba contenerlo, y no podía.\n\nPalabra de Dios.'
      },
      salmo_responsorial: {
        cita: 'Salmo 62, 2. 3-4. 5-6. 8-9',
        respuesta: 'R. Mi alma está sedienta de ti, Señor, Dios mío.',
        texto: 'Oh Dios, tú eres mi Dios, por ti madrugo,\nmi alma está sedienta de ti;\nmi carne tiene ansia de ti,\ncomo tierra reseca, agostada, sin agua.\n\nR. Mi alma está sedienta de ti, Señor, Dios mío.'
      },
      segunda_lectura: {
        titulo: 'Segunda Lectura',
        cita: 'Romanos 12, 1-2',
        monicion: 'San Pablo nos exhorta a ofrecer nuestros cuerpos como ofrenda viva, santa y agradable a Dios.',
        texto: 'Les ruego, pues, hermanos, por la misericordia de Dios, que ofrezcan sus cuerpos como ofrenda viva, santa, agradable a Dios: tal será su culto espiritual.\n\nY no se ajusten a este mundo, sino transfórmense por la renovación de la mente, para que sepan discernir cuál es la voluntad de Dios, qué es lo bueno, lo que le agrada, lo perfecto.\n\nPalabra de Dios.'
      },
      aclamacion_evangelio: {
        texto: 'R. Aleluya, aleluya.\nQue el Padre de nuestro Señor Jesucristo ilumine los ojos de nuestro corazón para que conozcamos cuál es la esperanza a la que nos llama.\nR. Aleluya.'
      },
      evangelio: {
        titulo: 'Santo Evangelio',
        cita: 'Mateo 16, 21-27',
        monicion: 'Jesús anuncia su pasión y declara las condiciones innegociables del discipulado: negarse a sí mismo y tomar la cruz.',
        texto: 'En aquel tiempo, Jesús empezó a manifestar a sus discípulos que tenía que ir a Jerusalén y padecer mucho a manos de los ancianos, sumos sacerdotes y escribas, y ser ejecutado y resucitar al tercer día.\n\nPedro se lo llevó aparte y se puso a increparlo:\n«¡Lejos de ti tal cosa, Señor! Eso no te pasará».\n\nJesús se volvió y dijo a Pedro:\n«¡Ponte detrás de mí, Satanás! Eres para mí tropiezo, porque tú piensas como los hombres, no como Dios».\n\nEntonces dijo a los discípulos:\n«El que quiera venir en pos de mí, que se niegue a sí mismo, que cargue con su cruz y me siga. Porque el que quiera salvar su vida la perderá, pero el que pierda su vida por mí la encontrará».\n\nPalabra del Señor.'
      },
      oracion_ofrendas: 'Que esta ofrenda sagrada, Señor, nos alcance siempre la bendición salvadora...',
      antifona_comunion: '¡Qué grande es tu bondad, Señor, que guardas para los que te temen!',
      oracion_comunion: 'Saciados con el pan celestial, te pedimos, Señor, que este alimento de caridad confirme nuestros corazones...'
    },
    'B': {
      titulo_celebracion: 'XXII Domingo del Tiempo Ordinario',
      tiempo_liturgico: 'Tiempo Ordinario',
      color: 'Verde',
      grado: 'Domingo',
      antifona_entrada: 'Ten piedad de mí, Señor, pues a ti clamo todo el día (Sal 85, 3).',
      monicion_entrada: 'Hermanos: Purifiquemos el corazón para vivir la religión del amor auténtico.',
      oracion_colecta: 'Dios de poder y de misericordia, de quien procede todo don perfecto...',
      primera_lectura: {
        titulo: 'Primera Lectura',
        cita: 'Deuteronomio 4, 1-2. 6-8',
        texto: 'En aquellos días, habló Moisés al pueblo y dijo: «Ahora, Israel, escucha los mandatos y preceptos que yo les enseño para que los pongan por obra... No añadirán nada a lo que yo les mando ni quitarán nada...». Palabra de Dios.'
      },
      salmo_responsorial: {
        cita: 'Salmo 14',
        respuesta: 'R. Señor, ¿quién puede hospedarse en tu tienda?',
        texto: 'El que procede honradamente y practica la justicia.\nR. Señor, ¿quién puede hospedarse en tu tienda?'
      },
      segunda_lectura: {
        titulo: 'Segunda Lectura',
        cita: 'Santiago 1, 17-18. 21b-22. 27',
        texto: 'Pongan por obra la palabra y no se contenten sólo con oírla, engañándose a ustedes mismos... La religión pura e intachable ante Dios Padre es visitar a huérfanos y viudas en su tribulación. Palabra de Dios.'
      },
      aclamacion_evangelio: {
        texto: 'R. Aleluya, aleluya. Por propia iniciativa nos engendró el Padre con la palabra de la verdad. R. Aleluya.'
      },
      evangelio: {
        titulo: 'Santo Evangelio',
        cita: 'Marcos 7, 1-8. 14-15. 21-23',
        texto: 'Jesús les dijo: «Este pueblo me honra con los labios, pero su corazón está lejos de mí... Lo que sale de dentro del hombre es lo que hace impuro al hombre». Palabra del Señor.'
      },
      oracion_ofrendas: 'Que esta ofrenda sagrada, Señor, nos alcance la bendición...',
      antifona_comunion: '¡Qué grande es tu bondad, Señor!',
      oracion_comunion: 'Saciados con el pan celestial, te pedimos, Señor...'
    },
    'C': {
      titulo_celebracion: 'XXII Domingo del Tiempo Ordinario',
      tiempo_liturgico: 'Tiempo Ordinario',
      color: 'Verde',
      grado: 'Domingo',
      antifona_entrada: 'Ten piedad de mí, Señor (Sal 85, 3).',
      monicion_entrada: 'Hermanos: La humildad es la puerta de la verdadera grandeza cristiana.',
      oracion_colecta: 'Dios de poder y de misericordia...',
      primera_lectura: {
        titulo: 'Primera Lectura',
        cita: 'Eclesiástico 3, 17-18. 20. 28-29',
        texto: 'Cuanto más grande seas, tanto más humíllate, y alcanzarás gracia ante el Señor. Palabra de Dios.'
      },
      salmo_responsorial: {
        cita: 'Salmo 67',
        respuesta: 'R. Preparaste, oh Dios, casa para los pobres.',
        texto: 'Los justos se alegran, gozan en la presencia de Dios...\nR. Preparaste, oh Dios, casa para los pobres.'
      },
      segunda_lectura: {
        titulo: 'Segunda Lectura',
        cita: 'Hebreos 12, 18-19. 22-24a',
        texto: 'Ustedes se han acercado al monte Sión, a la ciudad del Dios vivo, a la Jerusalén celestial. Palabra de Dios.'
      },
      aclamacion_evangelio: {
        texto: 'R. Aleluya, aleluya. Tomen mi yugo sobre ustedes y aprendan de mí, que soy manso y humilde. R. Aleluya.'
      },
      evangelio: {
        titulo: 'Santo Evangelio',
        cita: 'Lucas 14, 1. 7-14',
        texto: '«Cuando te inviten, ve a colocarte en el último puesto... Porque todo el que se enaltece será humillado, y el que se humilla será enaltecido». Palabra del Señor.'
      },
      oracion_ofrendas: 'Que esta ofrenda sagrada nos alcance la bendición...',
      antifona_comunion: '¡Qué grande es tu bondad, Señor!',
      oracion_comunion: 'Saciados con el pan celestial...'
    }
  },

  // DOMINGO 23
  '23': {
    'A': {
      titulo_celebracion: 'XXIII Domingo del Tiempo Ordinario',
      tiempo_liturgico: 'Tiempo Ordinario',
      color: 'Verde',
      grado: 'Domingo',
      antifona_entrada: 'Tú eres justo, Señor, y rectos son tus juicios; trátame según tu misericordia (Sal 118, 137. 124).',
      monicion_entrada: 'Hermanos: La liturgia nos llama a vivir la corrección fraterna, la oración comunitaria y el perdón mutuo.',
      oracion_colecta: 'Señor Dios, por quien nos llega la redención y se nos da la adopción filial, mira con bondad a tus hijos amados, para que los que creemos en Cristo alcancemos la verdadera libertad y la herencia eterna. Por nuestro Señor Jesucristo.',
      primera_lectura: {
        titulo: 'Primera Lectura',
        cita: 'Ezequiel 33, 7-9',
        monicion: 'El Señor constituye a Ezequiel como centinela para advertir al pueblo con amor.',
        texto: 'Así dice el Señor: «A ti, hijo de hombre, te he puesto como centinela para la casa de Israel. Cuando escuches una palabra de mi boca, les advertirás de mi parte. Si yo digo al malvado: "¡Malvado, vas a morir!", y tú no le hablas para advertir al malvado que cambie de conducta, el malvado morirá por su culpa, pero a ti te pediré cuenta de su sangre. Pero si tú adviertes al malvado para que se convierta de su conducta y no se convierte, él morirá por su culpa, pero tú habrás salvado tu vida». Palabra de Dios.'
      },
      salmo_responsorial: {
        cita: 'Salmo 94',
        respuesta: 'R. Ojalá escuchen hoy la voz del Señor: «No endurezcan su corazón».',
        texto: 'Vengan, cantemos con júbilo al Señor,\naclamemos a la Roca que nos salva;\nlleguemos a su presencia con alabanzas,\naclamémoslo con cánticos.\n\nR. Ojalá escuchen hoy la voz del Señor: «No endurezcan su corazón».'
      },
      segunda_lectura: {
        titulo: 'Segunda Lectura',
        cita: 'Romanos 13, 8-10',
        monicion: 'San Pablo nos recuerda que quien ama al prójimo ha cumplido plenamente la ley.',
        texto: 'Hermanos: No tengan más deuda con nadie que la del amor mutuo; porque el que ama al prójimo ha cumplido la ley... El amor no hace mal al prójimo; por tanto, el amor es la plenitud de la ley. Palabra de Dios.'
      },
      aclamacion_evangelio: {
        texto: 'R. Aleluya, aleluya.\nDios estaba en Cristo reconciliando al mundo consigo, y ha puesto en nosotros la palabra de la reconciliación.\nR. Aleluya.'
      },
      evangelio: {
        titulo: 'Santo Evangelio',
        cita: 'Mateo 18, 15-20',
        monicion: 'Jesús enseña la corrección fraterna y asegura su presencia donde dos o tres se reúnen en su nombre.',
        texto: 'En aquel tiempo, dijo Jesús a sus discípulos: «Si tu hermano peca contra ti, ve y repréndelo estando a solas tú y él. Si te escucha, habrás ganado a tu hermano... Donde dos o tres están reunidos en mi nombre, allí estoy yo en medio de ellos». Palabra del Señor.'
      },
      oracion_ofrendas: 'Dios nuestro, fuente de la sincera piedad y de la paz...',
      antifona_comunion: 'Como busca la cierva corrientes de agua, así mi alma te busca a ti...',
      oracion_comunion: 'Alimentados con el pan celestial, te suplicamos, Señor...'
    },
    'B': {
      titulo_celebracion: 'XXIII Domingo del Tiempo Ordinario',
      tiempo_liturgico: 'Tiempo Ordinario',
      color: 'Verde',
      grado: 'Domingo',
      antifona_entrada: 'Tú eres justo, Señor, y rectos son tus juicios (Sal 118, 137).',
      monicion_entrada: 'Hermanos: Jesús pronuncia sobre nosotros su palabra de poder: «Effetá», ábrete a su gracia.',
      oracion_colecta: 'Señor Dios, por quien nos llega la redención y se nos da la adopción filial...',
      primera_lectura: {
        titulo: 'Primera Lectura',
        cita: 'Isaías 35, 4-7a',
        texto: 'Digan a los cobardes de corazón: «¡Sean fuertes, no teman! Miren a su Dios que viene a salvarlos...». Entonces se abrirán los ojos de los ciegos, se destaparán los oídos de los sordos. Palabra de Dios.'
      },
      salmo_responsorial: {
        cita: 'Salmo 145',
        respuesta: 'R. Alaba, alma mía, al Señor.',
        texto: 'El Señor hace justicia a los oprimidos, da pan a los hambrientos.\nR. Alaba, alma mía, al Señor.'
      },
      segunda_lectura: {
        titulo: 'Segunda Lectura',
        cita: 'Santiago 2, 1-5',
        texto: 'No mezclen la fe en nuestro Señor Jesucristo con la acepción de personas. ¿Acaso no ha elegido Dios a los pobres para hacerlos ricos en la fe? Palabra de Dios.'
      },
      aclamacion_evangelio: {
        texto: 'R. Aleluya, aleluya. Jesús proclamaba el Evangelio del Reino y curaba toda dolencia. R. Aleluya.'
      },
      evangelio: {
        titulo: 'Santo Evangelio',
        cita: 'Marcos 7, 31-37',
        texto: 'Le trajeron un sordo y tartamudo... Jesús le dijo: «¡Effetá!» (que significa: «¡Ábrete!»). Al momento se le abrieron los oídos y hablaba correctamente. Palabra del Señor.'
      },
      oracion_ofrendas: 'Dios nuestro, fuente de la sincera piedad...',
      antifona_comunion: 'Como busca la cierva corrientes de agua...',
      oracion_comunion: 'Alimentados con el pan celestial...'
    },
    'C': {
      titulo_celebracion: 'XXIII Domingo del Tiempo Ordinario',
      tiempo_liturgico: 'Tiempo Ordinario',
      color: 'Verde',
      grado: 'Domingo',
      antifona_entrada: 'Tú eres justo, Señor (Sal 118, 137).',
      monicion_entrada: 'Hermanos: Las exigencias del seguimiento de Cristo piden entrega total.',
      oracion_colecta: 'Señor Dios, por quien nos llega la redención...',
      primera_lectura: {
        titulo: 'Primera Lectura',
        cita: 'Sabiduría 9, 13-18b',
        texto: '¿Quién hubiera conocido tu voluntad si tú no le hubieses dado la sabiduría y enviado tu santo espíritu? Palabra de Dios.'
      },
      salmo_responsorial: {
        cita: 'Salmo 89',
        respuesta: 'R. Señor, tú has sido nuestro refugio de generación en generación.',
        texto: 'Mil años en tu presencia son un ayer que pasó.\nR. Señor, tú has sido nuestro refugio.'
      },
      segunda_lectura: {
        titulo: 'Segunda Lectura',
        cita: 'Filemón 9b-10. 12-17',
        texto: 'Te ruego en favor de Onésimo... recíbelo no ya como esclavo, sino como hermano querido. Palabra de Dios.'
      },
      aclamacion_evangelio: {
        texto: 'R. Aleluya, aleluya. Haz brillar tu rostro sobre tu siervo. R. Aleluya.'
      },
      evangelio: {
        titulo: 'Santo Evangelio',
        cita: 'Lucas 14, 25-33',
        texto: '«Quien no carga con su cruz y viene en pos de mí, no puede ser mi discípulo... Cualquiera de ustedes que no renuncie a todos sus bienes no puede ser mi discípulo». Palabra del Señor.'
      },
      oracion_ofrendas: 'Dios nuestro, fuente de la piedad...',
      antifona_comunion: 'Como busca la cierva corrientes de agua...',
      oracion_comunion: 'Alimentados con el pan celestial...'
    }
  },

  // DOMINGO 24
  '24': {
    'A': {
      titulo_celebracion: 'XXIV Domingo del Tiempo Ordinario',
      tiempo_liturgico: 'Tiempo Ordinario',
      color: 'Verde',
      grado: 'Domingo',
      antifona_entrada: 'Concede la paz, Señor, a los que en ti esperan, para que tus profetas sean hallados fidedignos (Eclo 36, 18).',
      monicion_entrada: 'Hermanos: El perdón sin límites es el corazón del Evangelio: perdonar hasta setenta veces siete.',
      oracion_colecta: 'Señor Dios, creador y soberano de todas las cosas, míranos y concédenos servirte de todo corazón, para que experimentemos los efectos de tu misericordia. Por nuestro Señor Jesucristo.',
      primera_lectura: {
        titulo: 'Primera Lectura',
        cita: 'Eclesiástico 27, 30 – 28, 7',
        monicion: 'Perdona la ofensa a tu prójimo y se te perdonarán los pecados cuando reces.',
        texto: 'Rencor e ira son pasiones abominables con las que carga el pecador... Perdona la ofensa a tu prójimo, y se te perdonarán los pecados cuando reces. ¿Cómo puede un hombre guardar rencor a otro y pedir la salud al Señor? Acuérdate de los mandamientos y no guardes rencor a tu prójimo; acuérdate de la alianza del Altísimo y pasa por alto la ofensa. Palabra de Dios.'
      },
      salmo_responsorial: {
        cita: 'Salmo 102',
        respuesta: 'R. El Señor es compasivo y misericordioso, lento a la ira y rico en clemencia.',
        texto: 'Bendice, alma mía, al Señor,\ny todo mi ser a su santo nombre.\nÉl perdona todas tus culpas\ny cura todas tus enfermedades.\n\nR. El Señor es compasivo y misericordioso, lento a la ira y rico en clemencia.'
      },
      segunda_lectura: {
        titulo: 'Segunda Lectura',
        cita: 'Romanos 14, 7-9',
        monicion: 'Tanto en la vida como en la muerte pertenecemos al Señor Jesús.',
        texto: 'Hermanos: Ninguno de nosotros vive para sí mismo y ninguno muere para sí mismo. Si vivimos, vivimos para el Señor; y si morimos, morimos para el Señor... Para esto murió y resucitó Cristo: para ser Señor de vivos y muertos. Palabra de Dios.'
      },
      aclamacion_evangelio: {
        texto: 'R. Aleluya, aleluya.\nLes doy un mandamiento nuevo: que se amen unos a otros como yo los he amado, dice el Señor.\nR. Aleluya.'
      },
      evangelio: {
        titulo: 'Santo Evangelio',
        cita: 'Mateo 18, 21-35',
        monicion: 'Parábola del siervo despiadado: debemos perdonar de corazón como Dios nos perdonó.',
        texto: 'En aquel tiempo, se acercó Pedro a Jesús y le preguntó: «Señor, si mi hermano peca contra mí, ¿cuántas veces tengo que perdonarlo? ¿Hasta siete veces?». Jesús le contesta: «No te digo hasta siete veces, sino hasta setenta veces siete... ¿No debías tú también tener compasión de tu compañero, como yo tuve compasión de ti?... Lo mismo hará con ustedes mi Padre celestial si cada uno no perdona de corazón a su hermano». Palabra del Señor.'
      },
      oracion_ofrendas: 'Escucha propicio, Señor, nuestras plegarias...',
      antifona_comunion: '¡Qué preciosa es tu misericordia, oh Dios!',
      oracion_comunion: 'Que la gracia de este celestial sacramento, Señor, penetre nuestra alma...'
    },
    'B': {
      titulo_celebracion: 'XXIV Domingo del Tiempo Ordinario',
      tiempo_liturgico: 'Tiempo Ordinario',
      color: 'Verde',
      grado: 'Domingo',
      antifona_entrada: 'Concede la paz, Señor, a los que en ti esperan (Eclo 36, 18).',
      monicion_entrada: 'Hermanos: Confesemos a Jesús como el Mesías y tomemos nuestra cruz para seguirlo.',
      oracion_colecta: 'Señor Dios, creador y soberano de todas las cosas...',
      primera_lectura: {
        titulo: 'Primera Lectura',
        cita: 'Isaías 50, 5-9a',
        texto: 'El Señor Dios me abrió el oído; yo no me resistí... Ofrecí mi espalda a los que me golpeaban. El Señor Dios me ayuda, por eso no sentía los ultrajes. Palabra de Dios.'
      },
      salmo_responsorial: {
        cita: 'Salmo 114',
        respuesta: 'R. Caminaré en presencia del Señor en el país de la vida.',
        texto: 'Amo al Señor, porque escucha mi voz suplicante.\nR. Caminaré en presencia del Señor.'
      },
      segunda_lectura: {
        titulo: 'Segunda Lectura',
        cita: 'Santiago 2, 14-18',
        texto: 'La fe, si no tiene obras, está muerta en sí misma... Muéstrame tu fe sin obras, y yo por mis obras te mostraré mi fe. Palabra de Dios.'
      },
      aclamacion_evangelio: {
        texto: 'R. Aleluya, aleluya. Dios no permita que me gloríe sino en la cruz de Cristo. R. Aleluya.'
      },
      evangelio: {
        titulo: 'Santo Evangelio',
        cita: 'Marcos 8, 27-35',
        texto: 'Pedro le contestó: «Tú eres el Mesías»... «El que quiera salvar su vida la perderá, pero el que pierda su vida por mí y por el Evangelio la salvará». Palabra del Señor.'
      },
      oracion_ofrendas: 'Escucha propicio, Señor, nuestras plegarias...',
      antifona_comunion: '¡Qué preciosa es tu misericordia, oh Dios!',
      oracion_comunion: 'Que la gracia de este celestial sacramento nos purifique...'
    },
    'C': {
      titulo_celebracion: 'XXIV Domingo del Tiempo Ordinario',
      tiempo_liturgico: 'Tiempo Ordinario',
      color: 'Verde',
      grado: 'Domingo',
      antifona_entrada: 'Concede la paz, Señor (Eclo 36, 18).',
      monicion_entrada: 'Hermanos: Dios se alegra infinitamente al reencontrar al pecador que se convierte.',
      oracion_colecta: 'Señor Dios, creador y soberano...',
      primera_lectura: {
        titulo: 'Primera Lectura',
        cita: 'Éxodo 32, 7-11. 13-14',
        texto: 'Moisés suplicó al Señor su Dios... Y el Señor renunció al castigo con que había amenazado a su pueblo. Palabra de Dios.'
      },
      salmo_responsorial: {
        cita: 'Salmo 50',
        respuesta: 'R. Me levantaré y volveré junto a mi padre.',
        texto: 'Misericordia, Dios mío, por tu bondad; por tu inmensa compasión borra mi culpa.\nR. Me levantaré y volveré junto a mi padre.'
      },
      segunda_lectura: {
        titulo: 'Segunda Lectura',
        cita: '1 Timoteo 1, 12-17',
        texto: 'Cristo Jesús vino al mundo para salvar a los pecadores, de los cuales yo soy el primero. Palabra de Dios.'
      },
      aclamacion_evangelio: {
        texto: 'R. Aleluya, aleluya. Dios estaba en Cristo reconciliando al mundo consigo. R. Aleluya.'
      },
      evangelio: {
        titulo: 'Santo Evangelio',
        cita: 'Lucas 15, 1-32',
        texto: 'Parábolas de la misericordia: la oveja perdida, la dracma perdida y el Padre misericordioso que recibe con fiesta al hijo pródigo. Palabra del Señor.'
      },
      oracion_ofrendas: 'Escucha propicio, Señor...',
      antifona_comunion: '¡Qué preciosa es tu misericordia!',
      oracion_comunion: 'Que la gracia del sacramento nos renueve...'
    }
  },

  // DOMINGO 25
  '25': {
    'A': {
      titulo_celebracion: 'XXV Domingo del Tiempo Ordinario',
      tiempo_liturgico: 'Tiempo Ordinario',
      color: 'Verde',
      grado: 'Domingo',
      antifona_entrada: 'Yo soy la salvación de mi pueblo, dice el Señor. Si me invocan en cualquier tribulación, los escucharé y seré su Señor para siempre.',
      monicion_entrada: 'Hermanos: La bondad de Dios supera con creces nuestros cálculos y méritos humanos.',
      oracion_colecta: 'Señor Dios, que pusiste la plenitud de la ley en el amor a ti y al prójimo, concédenos cumplir tus mandamientos para que merezcamos llegar a la vida eterna. Por nuestro Señor Jesucristo.',
      primera_lectura: {
        titulo: 'Primera Lectura',
        cita: 'Isaías 55, 6-9',
        monicion: 'Los pensamientos y caminos del Señor superan infinitamente los nuestros.',
        texto: 'Busquen al Señor mientras se deja encontrar, invóquenlo mientras está cerca... Porque mis pensamientos no son sus pensamientos, ni sus caminos son mis caminos, oráculo del Señor. Como se alza el cielo sobre la tierra, así se alzan mis caminos sobre sus caminos. Palabra de Dios.'
      },
      salmo_responsorial: {
        cita: 'Salmo 144',
        respuesta: 'R. Cerca está el Señor de los que lo invocan.',
        texto: 'Día tras día te bendeciré\ny alabaré tu nombre por siempre jamás.\nEl Señor es clemente y misericordioso,\nlento a la cólera y rico en piedad.\n\nR. Cerca está el Señor de los que lo invocan.'
      },
      segunda_lectura: {
        titulo: 'Segunda Lectura',
        cita: 'Filipenses 1, 20c-24. 27a',
        monicion: 'San Pablo confiesa: «Para mí la vida es Cristo y el morir una ganancia».',
        texto: 'Hermanos: Para mí la vida es Cristo y el morir una ganancia... Lo importante es que lleven una vida digna del Evangelio de Cristo. Palabra de Dios.'
      },
      aclamacion_evangelio: {
        texto: 'R. Aleluya, aleluya.\nAbre, Señor, nuestro corazón para que aceptemos las palabras de tu Hijo.\nR. Aleluya.'
      },
      evangelio: {
        titulo: 'Santo Evangelio',
        cita: 'Mateo 20, 1-16a',
        monicion: 'Parábola de los jornaleros de la viña: Dios es infinitamente generoso con todos.',
        texto: 'En aquel tiempo, dijo Jesús a sus discípulos: «El reino de los cielos se parece a un propietario que salió a primera hora a contratar jornaleros para su viña... Al pagarles a todos un denario, los primeros protestaban... Él les dijo: "¿O vas a tener tú envidia porque yo soy bueno?". Así, los últimos serán primeros y los primeros últimos». Palabra del Señor.'
      },
      oracion_ofrendas: 'Acepta benigno, Señor, los dones de tu pueblo...',
      antifona_comunion: 'Tú has promulgado tus preceptos para que se observen con exactitud...',
      oracion_comunion: 'Acompaña, Señor, con tu auxilio continuo a los que alimentas...'
    },
    'B': {
      titulo_celebracion: 'XXV Domingo del Tiempo Ordinario',
      tiempo_liturgico: 'Tiempo Ordinario',
      color: 'Verde',
      grado: 'Domingo',
      antifona_entrada: 'Yo soy la salvación de mi pueblo, dice el Señor.',
      monicion_entrada: 'Hermanos: Quien quiera ser el primero en el Reino debe hacerse servidor de todos.',
      oracion_colecta: 'Señor Dios, que pusiste la plenitud de la ley en el amor...',
      primera_lectura: {
        titulo: 'Primera Lectura',
        cita: 'Sabiduría 2, 12. 17-20',
        texto: 'Se dijeron los impíos: «Tendamos una trampa al justo, que nos molesta y se opone a nuestras acciones...». Palabra de Dios.'
      },
      salmo_responsorial: {
        cita: 'Salmo 53',
        respuesta: 'R. El Señor sostiene mi vida.',
        texto: 'Oh Dios, sálvame por tu nombre; oh Dios, escucha mi súplica.\nR. El Señor sostiene mi vida.'
      },
      segunda_lectura: {
        titulo: 'Segunda Lectura',
        cita: 'Santiago 3, 16 – 4, 3',
        texto: 'La sabiduría que viene de lo alto es ante todo pura, pacífica, comprensiva, dócil, llena de misericordia. Palabra de Dios.'
      },
      aclamacion_evangelio: {
        texto: 'R. Aleluya, aleluya. Dios nos llamó por el Evangelio para alcanzar la gloria de Cristo. R. Aleluya.'
      },
      evangelio: {
        titulo: 'Santo Evangelio',
        cita: 'Marcos 9, 30-37',
        texto: '«Quien quiera ser el primero, que sea el último de todos y el servidor de todos». Y tomando a un niño, les dijo: «El que acoge a un niño en mi nombre, me acoge a mí». Palabra del Señor.'
      },
      oracion_ofrendas: 'Acepta benigno, Señor...',
      antifona_comunion: 'Tú has promulgado tus preceptos...',
      oracion_comunion: 'Acompaña, Señor, con tu auxilio...'
    },
    'C': {
      titulo_celebracion: 'XXV Domingo del Tiempo Ordinario',
      tiempo_liturgico: 'Tiempo Ordinario',
      color: 'Verde',
      grado: 'Domingo',
      antifona_entrada: 'Yo soy la salvación de mi pueblo.',
      monicion_entrada: 'Hermanos: Aprendamos a usar los bienes temporales para ganar amigos eternos.',
      oracion_colecta: 'Señor Dios, que pusiste la plenitud de la ley...',
      primera_lectura: {
        titulo: 'Primera Lectura',
        cita: 'Amós 8, 4-7',
        texto: 'Escuchen esto los que pisotean al pobre y disminuyen la medida para defraudar... Jamás olvidaré ninguna de sus acciones. Palabra de Dios.'
      },
      salmo_responsorial: {
        cita: 'Salmo 112',
        respuesta: 'R. Alaben al Señor, que alza al pobre.',
        texto: 'Alaben, siervos del Señor, alaben el nombre del Señor.\nR. Alaben al Señor, que alza al pobre.'
      },
      segunda_lectura: {
        titulo: 'Segunda Lectura',
        cita: '1 Timoteo 2, 1-8',
        texto: 'Dios quiere que todos los hombres se salven y lleguen al conocimiento de la verdad. Palabra de Dios.'
      },
      aclamacion_evangelio: {
        texto: 'R. Aleluya, aleluya. Jesucristo, siendo rico, se hizo pobre por nosotros. R. Aleluya.'
      },
      evangelio: {
        titulo: 'Santo Evangelio',
        cita: 'Lucas 16, 1-13',
        texto: '«El que es fiel en lo poco, también en lo mucho es fiel... No pueden servir a Dios y al dinero». Palabra del Señor.'
      },
      oracion_ofrendas: 'Acepta, Señor, nuestros dones...',
      antifona_comunion: 'Tú has promulgado tus preceptos...',
      oracion_comunion: 'Acompaña, Señor, a los que alimentas...'
    }
  },

  // DOMINGO 26
  '26': {
    'A': {
      titulo_celebracion: 'XXVI Domingo del Tiempo Ordinario',
      tiempo_liturgico: 'Tiempo Ordinario',
      color: 'Verde',
      grado: 'Domingo',
      antifona_entrada: 'Señor, todo lo que hiciste con nosotros, lo hiciste con verdadero juicio, porque hemos pecado contra ti (Dn 3, 31).',
      monicion_entrada: 'Hermanos: La conversión se demuestra con las obras del amor y la prontitud en el cumplimiento de la voluntad del Padre.',
      oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo.',
      primera_lectura: {
        titulo: 'Primera Lectura',
        cita: 'Ezequiel 18, 25-28',
        monicion: 'Cuando el malvado se aparta de la maldad y practica la justicia, salvará su vida.',
        texto: 'Así dice el Señor: «Cuando el justo se aparta de su justicia, comete la maldad y muere, muere por la maldad que cometió. Y cuando el malvado se aparta de la maldad que cometió y practica el derecho y la justicia, salvará su vida. Si recapacita y se aparta de todos los delitos, ciertamente vivirá y no morirá». Palabra de Dios.'
      },
      salmo_responsorial: {
        cita: 'Salmo 24',
        respuesta: 'R. Recuerda, Señor, que tu misericordia es eterna.',
        texto: 'Señor, enséñame tus caminos,\ninstrúyeme en tus sendas:\nhaz que camine con lealtad;\nenséñame, porque tú eres mi Dios y Salvador.\n\nR. Recuerda, Señor, que tu misericordia es eterna.'
      },
      segunda_lectura: {
        titulo: 'Segunda Lectura',
        cita: 'Filipenses 2, 1-11',
        monicion: 'Tengan los mismos sentimientos de Cristo Jesús, que se despojó de su rango y se humilló hasta la cruz.',
        texto: 'Hermanos: Tengan entre ustedes los mismos sentimientos que tuvo Cristo Jesús: el cual, siendo de condición divina, no retuvo ávidamente el ser igual a Dios, sino que se despojó de sí mismo tomando la condición de esclavo... haciéndose obediente hasta la muerte, y una muerte de cruz. Por eso Dios lo exaltó sobre todo y le concedió el Nombre sobre todo nombre. Palabra de Dios.'
      },
      aclamacion_evangelio: {
        texto: 'R. Aleluya, aleluya.\nMis ovejas escuchan mi voz, dice el Señor; yo las conozco y ellas me siguen.\nR. Aleluya.'
      },
      evangelio: {
        titulo: 'Santo Evangelio',
        cita: 'Mateo 21, 28-32',
        monicion: 'Parábola de los dos hijos: cumple la voluntad de Dios quien obedece con las obras.',
        texto: 'En aquel tiempo, dijo Jesús a los sumos sacerdotes y a los ancianos: «¿Qué les parece? Un hombre tenía dos hijos. Se acercó al primero y le dijo: "Hijo, ve hoy a trabajar en la viña". Él le contestó: "No quiero". Pero después se arrepintió y fue. Se acercó al segundo y le dijo lo mismo. Él le contestó: "Voy, señor". Pero no fue. ¿Quién de los dos cumplió la voluntad de su padre?». Ellos contestaron: «El primero». Jesús les dijo: «En verdad les digo que los publicanos y las prostitutas les llevan la delantera en el reino de Dios». Palabra del Señor.'
      },
      oracion_ofrendas: 'Concédenos, Dios misericordioso, que esta ofrenda te sea agradable...',
      antifona_comunion: 'Acuérdate de la palabra dada a tu siervo...',
      oracion_comunion: 'Que esta eucaristía renueve nuestra mente y nuestro cuerpo...'
    },
    'B': {
      titulo_celebracion: 'XXVI Domingo del Tiempo Ordinario',
      tiempo_liturgico: 'Tiempo Ordinario',
      color: 'Verde',
      grado: 'Domingo',
      antifona_entrada: 'Señor, todo lo que hiciste con nosotros, lo hiciste con verdadero juicio (Dn 3, 31).',
      monicion_entrada: 'Hermanos: Alegrémonos del bien que otros realizan en el nombre de Jesús.',
      oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia en el perdón...',
      primera_lectura: {
        titulo: 'Primera Lectura',
        cita: 'Números 11, 25-29',
        texto: 'El Señor bajó en la nube y dio de su espíritu a los setenta ancianos... Moisés dijo: «¿Tienes celos por mí? ¡Ojalá todo el pueblo del Señor profetizara!». Palabra de Dios.'
      },
      salmo_responsorial: {
        cita: 'Salmo 18',
        respuesta: 'R. Los mandatos del Señor alegran el corazón.',
        texto: 'La ley del Señor es perfecta y es descanso del alma.\nR. Los mandatos del Señor alegran el corazón.'
      },
      segunda_lectura: {
        titulo: 'Segunda Lectura',
        cita: 'Santiago 5, 1-6',
        texto: 'El jornal defraudado a los obreros está clamando a los oídos del Señor de los ejércitos. Palabra de Dios.'
      },
      aclamacion_evangelio: {
        texto: 'R. Aleluya, aleluya. Tu palabra, Señor, es la verdad; conságranos en la verdad. R. Aleluya.'
      },
      evangelio: {
        titulo: 'Santo Evangelio',
        cita: 'Marcos 9, 38-43. 45. 47-48',
        texto: 'Jesús respondió: «El que no está contra nosotros, está a favor nuestro... Y si tu mano te es ocasión de pecado, córtatela». Palabra del Señor.'
      },
      oracion_ofrendas: 'Concédenos, Dios misericordioso...',
      antifona_comunion: 'Acuérdate de la palabra dada a tu siervo...',
      oracion_comunion: 'Que esta eucaristía renueve nuestra vida...'
    },
    'C': {
      titulo_celebracion: 'XXVI Domingo del Tiempo Ordinario',
      tiempo_liturgico: 'Tiempo Ordinario',
      color: 'Verde',
      grado: 'Domingo',
      antifona_entrada: 'Señor, todo lo que hiciste con nosotros...',
      monicion_entrada: 'Hermanos: La parábola del rico y Lázaro nos alerta contra la ceguera del egoísmo.',
      oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia...',
      primera_lectura: {
        titulo: 'Primera Lectura',
        cita: 'Amós 6, 1a. 4-7',
        texto: '¡Ay de los que viven tranquilos en Sión, se acuestan en camas de marfil y no se afligen por la ruina de José! Palabra de Dios.'
      },
      salmo_responsorial: {
        cita: 'Salmo 145',
        respuesta: 'R. Alaba, alma mía, al Señor.',
        texto: 'El Señor mantiene su fidelidad perpetuamente, da pan a los hambrientos.\nR. Alaba, alma mía, al Señor.'
      },
      segunda_lectura: {
        titulo: 'Segunda Lectura',
        cita: '1 Timoteo 6, 11-16',
        texto: 'Combate el noble combate de la fe, conquista la vida eterna a la que fuiste llamado. Palabra de Dios.'
      },
      aclamacion_evangelio: {
        texto: 'R. Aleluya, aleluya. Jesucristo, siendo rico, se hizo pobre por nosotros. R. Aleluya.'
      },
      evangelio: {
        titulo: 'Santo Evangelio',
        cita: 'Lucas 16, 19-31',
        texto: 'Parábola del rico y el pobre Lázaro: «Si no escuchan a Moisés y a los profetas, no se convencerán ni aunque resucite un muerto». Palabra del Señor.'
      },
      oracion_ofrendas: 'Concédenos, Señor...',
      antifona_comunion: 'Acuérdate de la palabra...',
      oracion_comunion: 'Que esta eucaristía renueve nuestra alma...'
    }
  },

  // CRISTO REY (DOMINGO 34)
  '34': {
    'A': {
      titulo_celebracion: 'Jesucristo, Rey del Universo (XXXIV Domingo del Tiempo Ordinario)',
      tiempo_liturgico: 'Tiempo Ordinario',
      color: 'Blanco',
      grado: 'Solemnidad',
      antifona_entrada: 'Digno es el Cordero degollado de recibir el poder, la riqueza, la sabiduría, la fuerza y el honor (Ap 5, 12).',
      monicion_entrada: 'Hermanos: Culminamos el año litúrgico proclamando a Jesucristo Rey y Señor del universo.',
      oracion_colecta: 'Dios todopoderoso y eterno, que quisiste restaurar todas las cosas en tu amado Hijo, Rey del universo, concede, bondadoso, que toda la creación, liberada de la servidumbre, sirva a tu majestad y te alabe sin fin. Por nuestro Señor Jesucristo.',
      primera_lectura: {
        titulo: 'Primera Lectura',
        cita: 'Ezequiel 34, 11-12. 15-17',
        monicion: 'Ezequiel presenta a Dios como el Buen Pastor que cuida a sus ovejas y juzga con justicia.',
        texto: 'Así dice el Señor Dios: «Yo mismo buscaré a mis ovejas y las apacentaré... Buscaré la oveja perdida, recogeré a la descarriada, vendaré a la herida, curaré a la enferma... y juzgaré entre oveja y oveja». Palabra de Dios.'
      },
      salmo_responsorial: {
        cita: 'Salmo 22',
        respuesta: 'R. El Señor es mi pastor, nada me falta.',
        texto: 'El Señor es mi pastor, nada me falta:\nen verdes praderas me hace recostar;\nme conduce hacia fuentes tranquilas\ny repara mis fuerzas.\n\nR. El Señor es mi pastor, nada me falta.'
      },
      segunda_lectura: {
        titulo: 'Segunda Lectura',
        cita: '1 Corintios 15, 20-26. 28',
        monicion: 'Cristo resucitado vencerá a la muerte y entregará el Reino al Padre.',
        texto: 'Hermanos: Cristo ha resucitado de entre los muertos: primicia de todos los que han muerto... Y cuando todo le haya sido sometido, entonces también el Hijo se someterá a Dios, para que Dios sea todo en todos. Palabra de Dios.'
      },
      aclamacion_evangelio: {
        texto: 'R. Aleluya, aleluya.\n¡Bendito el que viene en el nombre del Señor! ¡Bendito el reino de nuestro padre David que llega!\nR. Aleluya.'
      },
      evangelio: {
        titulo: 'Santo Evangelio',
        cita: 'Mateo 25, 31-46',
        monicion: 'El juicio final: seremos examinados en el amor concreto hacia los más pequeños.',
        texto: 'En aquel tiempo, dijo Jesús a sus discípulos: «Cuando venga en su gloria el Hijo del hombre, y todos los ángeles con él, se sentará en el trono de su gloria y serán congregadas delante de él todas las naciones... Vengan, benditos de mi Padre, hereden el reino preparado para ustedes... Porque tuve hambre y me dieron de comer, tuve sed y me dieron de beber, fui forastero y me hospedaron... En verdad les digo que cada vez que lo hicieron con uno de estos, mis hermanos más pequeños, conmigo lo hicieron». Palabra del Señor.'
      },
      oracion_ofrendas: 'Al ofrecerte, Señor, el sacrificio de la reconciliación humana...',
      antifona_comunion: 'El Señor se sienta como Rey eterno; el Señor bendice a su pueblo con la paz.',
      oracion_comunion: 'Habiendo recibido el alimento de la inmortalidad, te pedimos, Señor...'
    }
  }
};

/**
 * Helper to retrieve authentic Sunday Lectionary entry for any week and cycle
 */
export function getSundayLectionary(weekNum: number | string, cycle: 'A' | 'B' | 'C'): LectionaryEntry | null {
  const key = String(weekNum);
  const weekData = LECCIONARIO_ORDINARIO[key];
  if (!weekData) return null;
  return weekData[cycle] || weekData['A'] || weekData['B'] || weekData['C'] || null;
}
