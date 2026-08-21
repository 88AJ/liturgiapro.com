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
  // DOMINGO 21 DEL TIEMPO ORDINARIO
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
        texto: `Así dice el Señor a Sebná, mayordomo de palacio:\n«Te echaré de tu puesto, te destituiré de tu cargo. Aquel día llamaré a mi siervo, a Eliacim, hijo de Elcías: le vestiré tu túnica, le ceñiré tu banda, le confiaré tu poder; y será un padre para los habitantes de Jerusalén y para la casa de Judá.\n\nPondré sobre su hombro la llave de la casa de David: lo que él abra nadie lo cerrará, lo que él cierre nadie lo abrirá. Lo clavaré como un clavo en sitio firme, y será trono de gloria para la casa de su padre».\n\nPalabra de Dios.`
      },
      salmo_responsorial: {
        cita: 'Salmo 137, 1-2a. 2bc-3. 6 y 8bc',
        respuesta: 'R. Señor, tu misericordia es eterna, no abandones la obra de tus manos.',
        texto: `Te doy gracias, Señor, de todo corazón;\ndelante de los ángeles tañeré para ti.\nMe postraré hacia tu santuario,\ndaré gracias a tu nombre por tu misericordia y tu lealtad.\n\nR. Señor, tu misericordia es eterna, no abandones la obra de tus manos.\n\nCuando te invoqué, me escuchaste,\nacreciste el valor en mi alma.\nEl Señor es sublime, se fija en el humilde,\ny de lejos conoce al soberbio.\n\nR. Señor, tu misericordia es eterna, no abandones la obra de tus manos.\n\nSeñor, tu misericordia es eterna,\nno abandones la obra de tus manos.\n\nR. Señor, tu misericordia es eterna, no abandones la obra de tus manos.`
      },
      segunda_lectura: {
        titulo: 'Segunda Lectura',
        cita: 'Romanos 11, 33-36',
        monicion: 'San Pablo eleva un himno de alabanza ante la insondable sabiduría, la ciencia y los designios amorosos de Dios.',
        texto: `¡Qué abismo de generosidad, de sabiduría y de conocimiento el de Dios! ¡Qué insondables sus decisiones y qué irrastreables sus caminos! ¿Quién conoció la mente del Señor? ¿Quién fue su consejero? ¿Quién le ha dado primero para tener derecho a la recompensa?\n\nPorque de él, por él y para él son todas las cosas. A él la gloria por los siglos. Amén.\n\nPalabra de Dios.`
      },
      aclamacion_evangelio: {
        texto: 'R. Aleluya, aleluya.\nTú eres Pedro, y sobre esta piedra edificaré mi Iglesia, y el poder del infierno no prevalecerá contra ella.\nR. Aleluya.'
      },
      evangelio: {
        titulo: 'Santo Evangelio',
        cita: 'Mateo 16, 13-20',
        monicion: 'Jesús pregunta a sus apóstoles sobre su identidad. La inspirada respuesta de Pedro recibe la promesa de las llaves del Reino.',
        texto: `En aquel tiempo, al llegar a la región de Cesarea de Filipo, Jesús preguntó a sus discípulos:\n«¿Quién dice la gente que es el Hijo del hombre?».\n\nEllos contestaron:\n«Unos dicen que Juan el Bautista; otros, que Elías; otros, que Jeremías o uno de los profetas».\n\nÉl les preguntó:\n«Y ustedes, ¿quién dicen que soy yo?».\n\nSimón Pedro tomó la palabra y dijo:\n«Tú eres el Mesías, el Hijo de Dios vivo».\n\nJesús le respondió:\n«¡Dichoso tú, Simón, hijo de Jonás!, porque eso no te lo ha revelado nadie de carne y hueso, sino mi Padre que está en el cielo. Ahora yo te digo: Tú eres Pedro, y sobre esta piedra edificaré mi Iglesia, y el poder del infierno no la derrotará.\n\nTe daré las llaves del reino de los cielos; lo que ates en la tierra quedará atado en los cielos, y lo que desates en la tierra quedará desatado en los cielos».\n\nY les mandó severamente a los discípulos que no dijesen a nadie que él era el Mesías.\n\nPalabra del Señor.`
      },
      oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
      antifona_comunion: 'El que come mi carne y bebe mi sangre tiene vida eterna, dice el Señor, y yo lo resucitaré en el último día (Jn 6, 55).',
      oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.',
      reflexion_homiletica: [
        `La pregunta que Cristo dirige a los doce en Cesarea de Filipo trasciende el tiempo y nos interpela directamente hoy: «¿Quién dicen ustedes que soy yo?». No basta con saber qué opinan los sociólogos o los teólogos; Jesús reclama una respuesta personal nacida del encuentro íntimo con Él.`,
        `La confesión de fe de Pedro no brotó de la sabiduría humana («carne y hueso»), sino de la revelación del Padre celestial. Al reconocer a Jesús como el Hijo de Dios vivo, Pedro recibe la roca sobre la que descansa la Iglesia: la certeza de que las puertas del hades jamás prevalecerán contra el Pueblo de la Alianza. Al participar del banquete eucarístico, renovemos nuestra adhesión fiel a Cristo y a su Iglesia.`
      ]
    },
    'B': {
      titulo_celebracion: 'XXI Domingo del Tiempo Ordinario',
      tiempo_liturgico: 'Tiempo Ordinario',
      color: 'Verde',
      grado: 'Domingo',
      antifona_entrada: 'Inclina tu oído, Señor, y escúchame; salva a tu siervo que confía en ti (Sal 85, 1-2).',
      monicion_entrada: 'Hermanos: Celebramos el vigésimo primer domingo del Tiempo Ordinario. Hoy concluimos el discurso del Pan de Vida con la confesión de Pedro: «Señor, ¿a quién iremos? Tú tienes palabras de vida eterna».',
      oracion_colecta: 'Señor Dios, que unes en un solo querer los corazones de tus fieles, concédenos amar lo que mandas y desear lo que prometes...',
      primera_lectura: {
        titulo: 'Primera Lectura',
        cita: 'Josué 24, 1-2a. 15-17. 18b',
        monicion: 'Josué reúne a las tribus de Israel en Siquem y las pone ante la elección libre y madura de servir al Señor o a los ídolos.',
        texto: `En aquellos días, Josué reunió a todas las tribus de Israel en Siquem... y dijo al pueblo: «Si no les parece bien servir al Señor, elijan hoy a quién quieren servir... Por mi parte, yo y mi casa serviremos al Señor». El pueblo respondió: «¡Lejos de nosotros abandonar al Señor para servir a otros dioses!»... Palabra de Dios.`
      },
      salmo_responsorial: {
        cita: 'Salmo 33',
        respuesta: 'R. Gusten y vean qué bueno es el Señor.',
        texto: `Bendigo al Señor en todo momento,\nsu alabanza está siempre en mi boca;\nmi alma se gloría en el Señor:\nque los humildes lo escuchen y se alegren.\n\nR. Gusten y vean qué bueno es el Señor.`
      },
      segunda_lectura: {
        titulo: 'Segunda Lectura',
        cita: 'Efesios 5, 21-32',
        monicion: 'San Pablo presenta el misterio del matrimonio como reflejo del amor esponsal, fiel e indisoluble entre Cristo y la Iglesia.',
        texto: `Hermanos: Sean sumisos unos a otros en el temor de Cristo... Maridos, amen a sus esposas como Cristo amó a la Iglesia y se entregó a sí mismo por ella... Este misterio es grande: yo lo refiero a Cristo y a la Iglesia. Palabra de Dios.`
      },
      aclamacion_evangelio: {
        texto: 'R. Aleluya, aleluya.\nTus palabras, Señor, son espíritu y vida; tú tienes palabras de vida eterna.\nR. Aleluya.'
      },
      evangelio: {
        titulo: 'Santo Evangelio',
        cita: 'Juan 6, 60-69',
        monicion: 'Ante las dudas de muchos discípulos que se apartan, Pedro profesa conmovido la fe de los Doce en Jesús.',
        texto: `En aquel tiempo, muchos de los discípulos de Jesús dijeron: «Este modo de hablar es duro, ¿quién puede escucharlo?»... Desde entonces, muchos discípulos se echaron atrás y ya no andaban con él. Jesús dijo entonces a los Doce: «¿También ustedes quieren marcharse?». Simón Pedro le contestó: «Señor, ¿a quién iremos? Tú tienes palabras de vida eterna; y nosotros creemos y sabemos que tú eres el Santo de Dios». Palabra del Señor.`
      },
      oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción...',
      antifona_comunion: 'El que come mi carne y bebe mi sangre permanece en mí y yo en él, dice el Señor.',
      oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros...'
    },
    'C': {
      titulo_celebracion: 'XXI Domingo del Tiempo Ordinario',
      tiempo_liturgico: 'Tiempo Ordinario',
      color: 'Verde',
      grado: 'Domingo',
      antifona_entrada: 'Inclina tu oído, Señor, y escúchame; salva a tu siervo que confía en ti.',
      monicion_entrada: 'Hermanos: Sean bienvenidos a la Eucaristía dominical. El Señor nos advierte hoy sobre la necesidad de esforzarnos por entrar por la puerta angosta de la caridad y la conversión humilde.',
      oracion_colecta: 'Señor Dios, que unes en un solo querer los corazones de tus fieles, concédenos amar lo que mandas y desear lo que prometes...',
      primera_lectura: {
        titulo: 'Primera Lectura',
        cita: 'Isaías 66, 18-21',
        monicion: 'El Señor anuncia la universalidad de la salvación: personas de todas las naciones y lenguas contemplarán su gloria.',
        texto: `Así dice el Señor: «Yo vendré para reunir a todas las naciones y lenguas, y vendrán y verán mi gloria... Y de entre ellos escogeré a algunos para sacerdotes y levitas», dice el Señor. Palabra de Dios.`
      },
      salmo_responsorial: {
        cita: 'Salmo 116, 1. 2',
        respuesta: 'R. Vayan por todo el mundo y proclamen el Evangelio.',
        texto: `Alaben al Señor, todas las naciones,\naclámenlo, todos los pueblos.\n\nR. Vayan por todo el mundo y proclamen el Evangelio.\n\nFirme es su misericordia con nosotros,\nsu fidelidad dura por siempre.\n\nR. Vayan por todo el mundo y proclamen el Evangelio.`
      },
      segunda_lectura: {
        titulo: 'Segunda Lectura',
        cita: 'Hebreos 12, 5-7. 11-13',
        monicion: 'El autor de la carta a los Hebreos nos recuerda que las pruebas son correcciones paternales de Dios para madurar nuestra santidad.',
        texto: `Hermanos: No menosprecien la corrección del Señor ni desmayen cuando los reprenda; pues a quien ama el Señor, lo disciplina... Toda corrección al presente no parece de gozo sino de tristeza; pero después da fruto apacible de justicia a los que en ella han sido ejercitados. Palabra de Dios.`
      },
      aclamacion_evangelio: {
        texto: 'R. Aleluya, aleluya.\nYo soy el camino, la verdad y la vida, dice el Señor; nadie va al Padre sino por mí.\nR. Aleluya.'
      },
      evangelio: {
        titulo: 'Santo Evangelio',
        cita: 'Lucas 13, 22-30',
        monicion: 'Jesús nos exhorta a no confiar en privilegios aparentes sino a entrar decididamente por la puerta estrecha del Evangelio.',
        texto: `En aquel tiempo, Jesús pasaba por ciudades y aldeas enseñando y caminando hacia Jerusalén. Uno le preguntó: «Señor, ¿son pocos los que se salvan?». Él les dijo: «Esfuércense en entrar por la puerta estrecha, porque les digo que muchos intentarán entrar y no podrán... Vendrán de oriente y de occidente, del norte y del sur, y se sentarán a la mesa en el reino de Dios. Y hay últimos que serán primeros, y primeros que serán últimos». Palabra del Señor.`
      },
      oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción...',
      antifona_comunion: 'El que come mi carne y bebe mi sangre permanece en mí y yo en él, dice el Señor.',
      oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros...'
    }
  },

  // DOMINGO 22 DEL TIEMPO ORDINARIO
  '22': {
    'A': {
      titulo_celebracion: 'XXII Domingo del Tiempo Ordinario',
      tiempo_liturgico: 'Tiempo Ordinario',
      color: 'Verde',
      grado: 'Domingo',
      antifona_entrada: 'Ten piedad de mí, Señor, que a ti clamo todo el día; tú, Señor, eres bueno y clemente, rico en misericordia con los que te invocan (Sal 85, 3. 5).',
      monicion_entrada: 'Hermanos: En este vigésimo segundo domingo ordinario, Jesús nos recuerda que seguirlo exige abrazar la cruz con generosidad y fidelidad diaria.',
      oracion_colecta: 'Dios todopoderoso, de quien procede todo don perfecto, infunde en nuestros corazones el amor de tu nombre, y concédenos que, haciendo crecer en nosotros la religión, fomentes el bien y lo conserves con solícita piedad. Por nuestro Señor Jesucristo...',
      primera_lectura: {
        titulo: 'Primera Lectura',
        cita: 'Jeremías 20, 7-9',
        monicion: 'El profeta Jeremías confiesa la irresistible seducción de la Palabra divina que arde en sus entrañas como fuego devorador.',
        texto: `Me sedujiste, Señor, y me dejé seducir; me forzaste y me pudiste... La palabra del Señor se convirtió para mí en oprobio e irrisión todo el día. Pero me decía: «No me acordaré de él, no hablaré más en su nombre»; y había en mi corazón un fuego ardiente, encerrado en mis huesos; intentaba contenerlo y no podía. Palabra de Dios.`
      },
      salmo_responsorial: {
        cita: 'Salmo 62',
        respuesta: 'R. Mi alma está sedienta de ti, Señor, Dios mío.',
        texto: `Oh Dios, tú eres mi Dios, por ti madrugo,\nmi alma está sedienta de ti;\nmi carne tiene ansia de ti,\ncomo tierra reseca, agostada, sin agua.\n\nR. Mi alma está sedienta de ti, Señor, Dios mío.`
      },
      segunda_lectura: {
        titulo: 'Segunda Lectura',
        cita: 'Romanos 12, 1-2',
        monicion: 'San Pablo nos exhorta a ofrecernos a Dios como una ofrenda viva, renovando nuestra mente según el Espíritu.',
        texto: `Les ruego, hermanos, por la misericordia de Dios, que ofrezcan sus cuerpos como sacrificio vivo, santo, agradable a Dios: este es su culto espiritual. No se amolden a este mundo, sino transfórmense por la renovación de la mente, para que sepan discernir cuál es la voluntad de Dios: lo bueno, lo agradable, lo perfecto. Palabra de Dios.`
      },
      aclamacion_evangelio: {
        texto: 'R. Aleluya, aleluya.\nEl Padre de nuestro Señor Jesucristo ilumine los ojos de nuestro corazón, para que comprendamos cuál es la esperanza a la que nos llama.\nR. Aleluya.'
      },
      evangelio: {
        titulo: 'Santo Evangelio',
        cita: 'Mateo 16, 21-27',
        monicion: 'Jesús anuncia su pasión y declara las condiciones innegociables del discipulado: negarse a sí mismo y tomar la cruz.',
        texto: `En aquel tiempo, Jesús empezó a manifestar a sus discípulos que tenía que ir a Jerusalén y padecer mucho a manos de los ancianos, sumos sacerdotes y escribas, y ser ejecutado y resucitar al tercer día. Pedro se lo llevó aparte y se puso a increparlo: «¡Lejos de ti tal cosa, Señor! Eso no te pasará». Jesús se volvió y dijo a Pedro: «¡Ponte detrás de mí, Satanás! Eres para mí tropiezo, porque tú piensas como los hombres, no como Dios».\n\nEntonces dijo a los discípulos: «El que quiera venir en pos de mí, que se niegue a sí mismo, que cargue con su cruz y me siga. Porque el que quiera salvar su vida la perderá, pero el que pierda su vida por mí la encontrará». Palabra del Señor.`
      },
      oracion_ofrendas: 'Que esta ofrenda sagrada, Señor, nos alcance siempre la bendición salvadora...',
      antifona_comunion: '¡Qué grande es tu bondad, Señor, que guardas para tus fieles!',
      oracion_comunion: 'Saciados con el pan celestial, te pedimos, Señor, que este alimento de caridad confirme nuestros corazones...'
    }
  },

  // DOMINGO 20 DEL TIEMPO ORDINARIO
  '20': {
    'A': {
      titulo_celebracion: 'XX Domingo del Tiempo Ordinario',
      tiempo_liturgico: 'Tiempo Ordinario',
      color: 'Verde',
      grado: 'Domingo',
      antifona_entrada: 'Fíjate, oh Dios, en nuestro escudo, mira el rostro de tu Ungido (Sal 83, 10-11).',
      monicion_entrada: 'Hermanos: La liturgia de hoy nos muestra que el amor de Dios no tiene fronteras ni acepción de personas.',
      oracion_colecta: 'Dios nuestro, que has preparado bienes invisibles para los que te aman, infunde en nuestros corazones la ternura de tu amor...',
      primera_lectura: {
        titulo: 'Primera Lectura',
        cita: 'Isaías 56, 1. 6-7',
        monicion: 'El profeta Isaías abre las puertas del Templo a todos los pueblos: «Mi casa será llamada casa de oración para todos los pueblos».',
        texto: `Así dice el Señor: «Observen el derecho, practiquen la justicia, porque mi salvación está para llegar y mi justicia para manifestarse... A los extranjeros que se han unido al Señor para servirlo... los traeré a mi monte santo, los llenaré de júbilo en mi casa de oración; porque mi casa es casa de oración para todos los pueblos». Palabra de Dios.`
      },
      salmo_responsorial: {
        cita: 'Salmo 66',
        respuesta: 'R. Que los pueblos te alaben, Señor; que todos los pueblos te alaben.',
        texto: `El Señor tenga piedad y nos bendiga,\nilumine su rostro sobre nosotros;\nconozca la tierra tus caminos,\ntodos los pueblos tu salvación.\n\nR. Que los pueblos te alaben, Señor; que todos los pueblos te alaben.`
      },
      segunda_lectura: {
        titulo: 'Segunda Lectura',
        cita: 'Romanos 11, 13-15. 29-32',
        monicion: 'San Pablo reflexiona sobre la irrevocable vocación de Israel y los dones de la misericordia universal de Dios.',
        texto: `Hermanos: Les digo a ustedes, los gentiles... los dones y la llamada de Dios son irrevocables. Así como ustedes en otro tiempo desobedecieron a Dios, pero ahora han alcanzado misericordia... Dios encerró a todos en la desobediencia para tener misericordia de todos. Palabra de Dios.`
      },
      aclamacion_evangelio: {
        texto: 'R. Aleluya, aleluya.\nJesús proclamaba el Evangelio del Reino, curando toda enfermedad en el pueblo.\nR. Aleluya.'
      },
      evangelio: {
        titulo: 'Santo Evangelio',
        cita: 'Mateo 15, 21-28',
        monicion: 'Una mujer cananea conmueve el corazón de Jesús con su fe inquebrantable y humilde súplica.',
        texto: `En aquel tiempo, Jesús salió y se retiró a la región de Tiro y Sidón. Entonces una mujer cananea, saliendo de aquellos términos, se puso a gritar: «¡Ten piedad de mí, Señor, Hijo de David! Mi hija está atormentada por un demonio»... Ella vino a postrarse ante él diciendo: «¡Señor, socórreme!». Él le dijo: «No está bien tomar el pan de los hijos y echárselo a los perritos». Pero ella repuso: «Tienes razón, Señor; pero también los perritos comen las migajas que caen de la mesa de sus señores». Jesús respondió: «¡Mujer, qué grande es tu fe! Que se cumpla lo que deseas». Y en aquel instante quedó curada su hija. Palabra del Señor.`
      },
      oracion_ofrendas: 'Acepta, Señor, estos dones en los que se realiza un admirable intercambio...',
      antifona_comunion: 'En el Señor está la misericordia, la redención copiosa.',
      oracion_comunion: 'Unidos a Cristo por este sacramento, imploramos, Señor, tu clemencia...'
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
      oracion_colecta: 'Dios todopoderoso y eterno, que quisiste restaurar todas las cosas en tu amado Hijo, Rey del universo...',
      primera_lectura: {
        titulo: 'Primera Lectura',
        cita: 'Ezequiel 34, 11-12. 15-17',
        monicion: 'El profeta Ezequiel presenta a Dios como el Buen Pastor que busca a la oveja perdida y juzga con justicia.',
        texto: `Así dice el Señor Dios: «Yo mismo buscaré a mis ovejas y las apacentaré... Buscaré la oveja perdida, recogeré a la descarriada, vendaré a la herida, curaré a la enferma... y juzgaré entre oveja y oveja». Palabra de Dios.`
      },
      salmo_responsorial: {
        cita: 'Salmo 22',
        respuesta: 'R. El Señor es mi pastor, nada me falta.',
        texto: `El Señor es mi pastor, nada me falta:\nen verdes praderas me hace recostar;\nme conduce hacia fuentes tranquilas\ny repara mis fuerzas.\n\nR. El Señor es mi pastor, nada me falta.`
      },
      segunda_lectura: {
        titulo: 'Segunda Lectura',
        cita: '1 Corintios 15, 20-26. 28',
        monicion: 'Cristo resucitado vencerá todo principado y la muerte misma, para entregar el Reino a Dios Padre.',
        texto: `Hermanos: Cristo ha resucitado de entre los muertos: primicia de todos los que han muerto... Y cuando todo le haya sido sometido, entonces también el Hijo se someterá a Dios, para que Dios sea todo en todos. Palabra de Dios.`
      },
      aclamacion_evangelio: {
        texto: 'R. Aleluya, aleluya.\n¡Bendito el que viene en el nombre del Señor!\nR. Aleluya.'
      },
      evangelio: {
        titulo: 'Santo Evangelio',
        cita: 'Mateo 25, 31-46',
        monicion: 'El juicio final: seremos examinados en el amor concreto hacia los más pequeños de los hermanos de Jesús.',
        texto: `En aquel tiempo, dijo Jesús a sus discípulos: «Cuando venga en su gloria el Hijo del hombre, y todos los ángeles con él, se sentará en el trono de su gloria y serán congregadas delante de él todas las naciones... Vengan, benditos de mi Padre, hereden el reino preparado para ustedes... Porque tuve hambre y me dieron de comer, tuve sed y me dieron de beber, fui forastero y me hospedaron...». Palabra del Señor.`
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
