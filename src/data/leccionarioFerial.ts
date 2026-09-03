import { LiturgicalColor, CelebrationRank } from '../types/liturgia';

export interface FerialLectionaryEntry {
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
 * Base de Datos de Ferias del Tiempo Ordinario (Semanas 21 a 27) para Año Par (II) e Impar (I)
 */
export const LECCIONARIO_FERIAL: Record<
  string, // Semana (ej. '21', '22', '23', '24', '25', '26')
  Record<
    number, // Día de la semana (1 = Lunes, 2 = Martes, 3 = Miércoles, 4 = Jueves, 5 = Viernes, 6 = Sábado)
    Record<'I' | 'II', FerialLectionaryEntry>
  >
> = {
  // SEMANA 21
  '21': {
    1: {
      'II': {
        titulo_celebracion: 'Lunes de la 21ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Inclina tu oído, Señor, y escúchame; salva a tu siervo que confía en ti (Sal 85, 1-2).',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: '2 Tesalonicenses 1, 1-5. 11b-12',
          monicion: 'San Pablo alaba el progreso de la fe y la mutua caridad en la comunidad de Tesalónica.',
          texto: 'Pablo, Silvano y Timoteo a la Iglesia de los tesalonicenses... Debemos dar continuamente gracias a Dios por ustedes, hermanos... Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 95',
          respuesta: 'R. Cuenten las maravillas del Señor a todas las naciones.',
          texto: 'Canten al Señor un cántico nuevo, canten al Señor toda la tierra.\nR. Cuenten las maravillas del Señor.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. Mis ovejas escuchan mi voz, y yo las conozco y ellas me siguen. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Mateo 23, 13-22',
          monicion: 'Jesús denuncia la hipocresía de los escribas y fariseos y nos llama a la rectitud interior.',
          texto: 'En aquel tiempo, habló Jesús diciendo: «¡Ay de ustedes, escribas y fariseos hipócritas, que cierran a los hombres el reino de los cielos!... ¡Guías ciegos, que juran por el templo y no por el Dios que habita en él!». Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio...',
        antifona_comunion: 'El que come mi carne y bebe mi sangre tiene vida eterna...',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique en nosotros...'
      },
      'I': {
        titulo_celebracion: 'Lunes de la 21ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Inclina tu oído, Señor (Sal 85, 1).',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: '1 Tesalonicenses 1, 1-5. 8b-10',
          texto: 'Damos gracias a Dios por todos ustedes al recordarlos en nuestras oraciones... Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 149',
          respuesta: 'R. El Señor ama a su pueblo.',
          texto: 'Canten al Señor un cántico nuevo.\nR. El Señor ama a su pueblo.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Mateo 23, 13-22',
          texto: '«¡Ay de ustedes, escribas y fariseos hipócritas!...». Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el sacrificio...',
        antifona_comunion: 'El que come mi carne...',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      }
    },
    2: {
      'II': {
        titulo_celebracion: 'Martes de la 21ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Inclina tu oído, Señor (Sal 85, 1).',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: '2 Tesalonicenses 2, 1-3a. 14-17',
          texto: 'Hermanos: Les rogamos respecto a la venida de nuestro Señor Jesucristo... Manténganse firmes y conserven las tradiciones que han aprendido de nosotros. Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 95',
          respuesta: 'R. El Señor llega para juzgar la tierra.',
          texto: 'Digan a los pueblos: «El Señor es rey, él afianzó el orbe».\nR. El Señor llega para juzgar la tierra.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. La palabra de Dios es viva y eficaz, juzga los deseos e intenciones del corazón. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Mateo 23, 23-26',
          texto: '«¡Ay de ustedes, escribas y fariseos hipócritas, que pagan el diezmo de la menta y descuidan lo más importante de la ley: la justicia, la misericordia y la fe!... Limpien primero por dentro el vaso y el plato». Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el sacrificio...',
        antifona_comunion: 'El que come mi carne...',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      },
      'I': {
        titulo_celebracion: 'Martes de la 21ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Inclina tu oído, Señor (Sal 85, 1).',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: '1 Tesalonicenses 2, 1-8',
          texto: 'Saben bien que nuestra visita no fue estéril... Fuimos cariñosos con ustedes como una madre. Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 138',
          respuesta: 'R. Señor, tú me sondeas y me conoces.',
          texto: 'Señor, tú me sondeas y me conoces; me conoces cuando me siento o me levanto.\nR. Señor, tú me sondeas y me conoces.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Mateo 23, 23-26',
          texto: '«¡Ay de ustedes, escribas y fariseos hipócritas!...». Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el sacrificio...',
        antifona_comunion: 'El que come mi carne...',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      }
    },
    3: {
      'II': {
        titulo_celebracion: 'Miércoles de la 21ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Inclina tu oído, Señor, y escúchame; salva a tu siervo que confía en ti. Ten piedad de mí, Señor, pues a ti clamo todo el día (Sal 85, 1-3).',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: '2 Tesalonicenses 3, 6-10. 16-18',
          monicion: 'San Pablo exhorta al trabajo honrado y a no vivir ociosamente.',
          texto: `Hermanos, les ordenamos en nombre de nuestro Señor Jesucristo que se aparten de todo hermano que viva ociosamente y no según la tradición que recibieron de nosotros.

Ya saben cómo tienen que imitarnos: no vivimos ociosamente entre ustedes, ni comimos de balde el pan de nadie, sino que con cansancio y fatiga trabajamos día y noche para no ser gravosos a ninguno de ustedes. No porque no tuviéramos derecho, sino para darles en nosotros un modelo que imitar.

Además, cuando estábamos con ustedes, les dimos esta norma: «Si alguno no quiere trabajar, que tampoco coma».

Que el Señor de la paz les conceda la paz siempre y en todo lugar. El Señor esté con todos ustedes.

Palabra de Dios.`
        },
        salmo_responsorial: {
          cita: 'Salmo 127, 1-2. 4-5',
          respuesta: 'R. ¡Dichosos los que temen al Señor!',
          texto: `¡Dichoso el que teme al Señor
y sigue sus caminos!
Comerás del fruto de tu trabajo,
serás dichoso, te irá bien.

R. ¡Dichosos los que temen al Señor!

Ésta es la bendición del hombre que teme al Señor.
Que el Señor te bendiga desde Sión,
que veas la prosperidad de Jerusalén
todos los días de tu vida.

R. ¡Dichosos los que temen al Señor!`
        },
        aclamacion_evangelio: {
          texto: `R. Aleluya, aleluya.
El que guarda la palabra de Cristo, ciertamente el amor de Dios ha llegado en él a su plenitud.
R. Aleluya.`
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Mateo 23, 27-32',
          monicion: 'Jesús denuncia la apariencia de piedad exterior que esconde injusticia y corrupción en el corazón.',
          texto: `En aquel tiempo, habló Jesús diciendo:
«¡Ay de ustedes, escribas y fariseos hipócritas, que se parecen a sepulcros blanqueados! Por fuera tienen buena apariencia, pero por dentro están llenos de huesos de muertos y de podredumbre; lo mismo ustedes: por fuera parecen justos a los hombres, pero por dentro están llenos de hipocresía y de iniquidad.

¡Ay de ustedes, escribas y fariseos hipócritas, que edifican los sepulcros de los profetas y adornan los monumentos de los justos, diciendo: "Si hubiéramos vivido en tiempo de nuestros padres, no habríamos sido cómplices suyos en el derramamiento de la sangre de los profetas"! Con esto son testigos contra ustedes mismos de que son hijos de los que asesinaron a los profetas. ¡Colmen también ustedes la medida de sus padres!».

Palabra del Señor.`
        },
        oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
        antifona_comunion: 'El que come mi carne y bebe mi sangre tiene vida eterna, dice el Señor, y yo lo resucitaré en el último día (Jn 6, 55).',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.',
        reflexion_homiletica: [
          'La pureza que Dios busca no es el barniz exterior ni el juicio severo a los demás, sino la autenticidad y la transparencia del corazón.',
          'San Pablo nos enseña que el trabajo honesto y responsable es una manifestación concreta del testimonio cristiano.'
        ]
      },
      'I': {
        titulo_celebracion: 'Miércoles de la 21ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Inclina tu oído, Señor (Sal 85, 1).',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: '1 Tesalonicenses 2, 9-13',
          texto: 'Recuerden, hermanos, nuestros esfuerzos y fatigas; trabajando noche y día les anunciamos el Evangelio. Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 138',
          respuesta: 'R. Señor, tú me sondeas y me conoces.',
          texto: '¿A dónde iré lejos de tu aliento? ¿A dónde escaparé de tu mirada?\nR. Señor, tú me sondeas.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Mateo 23, 27-32',
          texto: '«¡Ay de ustedes, escribas y fariseos hipócritas, que se parecen a sepulcros blanqueados!...». Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el sacrificio...',
        antifona_comunion: 'El que come mi carne...',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      }
    },
    4: {
      'II': {
        titulo_celebracion: 'Jueves de la 21ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Inclina tu oído, Señor (Sal 85, 1).',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: '1 Corintios 1, 1-9',
          texto: 'Pablo, llamado a ser apóstol de Cristo Jesús por designio de Dios... Doy gracias a Dios continuamente por ustedes. Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 144',
          respuesta: 'R. Alabaré tu nombre por siempre jamás, Señor.',
          texto: 'Día tras día te bendeciré y alabaré tu nombre por siempre jamás.\nR. Alabaré tu nombre por siempre jamás, Señor.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. Estén en vela, porque no saben qué día vendrá su Señor. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Mateo 24, 42-51',
          texto: 'Jesús dijo a sus discípulos: «Estén en vela, porque no saben qué día vendrá su Señor... Dichoso el criado a quien su señor encuentre cumpliendo con su deber». Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el sacrificio...',
        antifona_comunion: 'El que come mi carne...',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      },
      'I': {
        titulo_celebracion: 'Jueves de la 21ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Inclina tu oído, Señor (Sal 85, 1).',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: '1 Tesalonicenses 3, 7-13',
          texto: 'Hermanos, en todas nuestras angustias y tribulaciones hemos recibido consuelo por su fe. Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 89',
          respuesta: 'R. Sácianos de tu misericordia, Señor, y nos alegraremos.',
          texto: 'Enséñanos a calcular nuestros años para que adquiramos un corazón sensato.\nR. Sácianos de tu misericordia.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Mateo 24, 42-51',
          texto: '«Estén en vela, porque no saben a qué hora vendrá el Hijo del hombre». Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, acepta...',
        antifona_comunion: 'El que come mi carne...',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      }
    },
    5: {
      'II': {
        titulo_celebracion: 'Viernes de la 21ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Inclina tu oído, Señor (Sal 85, 1).',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: '1 Corintios 1, 17-25',
          texto: 'El mensaje de la cruz es necedad para los que se pierden; pero para nosotros es fuerza de Dios. Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 32',
          respuesta: 'R. La misericordia del Señor llena la tierra.',
          texto: 'Aclamen, justos, al Señor, que merece la alabanza de los buenos.\nR. La misericordia del Señor llena la tierra.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. Velen y estén preparados, porque no saben a qué hora vendrá el Hijo del hombre. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Mateo 25, 1-13',
          texto: 'Parábola de las diez vírgenes: «Llegó el novio; las que estaban preparadas entraron con él al banquete de bodas, y se cerró la puerta». Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, acepta...',
        antifona_comunion: 'El que come mi carne...',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      },
      'I': {
        titulo_celebracion: 'Viernes de la 21ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Inclina tu oído, Señor (Sal 85, 1).',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: '1 Tesalonicenses 4, 1-8',
          texto: 'La voluntad de Dios es su santificación: que se aparten de la fornicación. Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 96',
          respuesta: 'R. Alégrense, justos, con el Señor.',
          texto: 'El Señor es rey, la tierra goza, se alegran los archipiélagos.\nR. Alégrense, justos, con el Señor.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Mateo 25, 1-13',
          texto: '«Estén, pues, en vela, porque no saben el día ni la hora». Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, acepta...',
        antifona_comunion: 'El que come mi carne...',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      }
    },
    6: {
      'II': {
        titulo_celebracion: 'Sábado de la 21ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Inclina tu oído, Señor (Sal 85, 1).',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: '1 Corintios 1, 26-31',
          texto: 'Miren su asamblea, hermanos: no hay en ella muchos sabios según la carne... sino que Dios eligió lo necio del mundo para confundir a los sabios. Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 32',
          respuesta: 'R. Dichoso el pueblo que el Señor se escogió como heredad.',
          texto: 'Dichosa la nación cuyo Dios es el Señor.\nR. Dichoso el pueblo.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. Les doy un mandamiento nuevo: que se amen unos a otros como yo los he amado. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Mateo 25, 14-30',
          texto: 'Parábola de los talentos: «Muy bien, siervo bueno y fiel; como has sido fiel en lo poco, te pondré al frente de mucho: entra en el gozo de tu señor». Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, acepta...',
        antifona_comunion: 'El que come mi carne...',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      },
      'I': {
        titulo_celebracion: 'Sábado de la 21ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Inclina tu oído, Señor (Sal 85, 1).',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: '1 Tesalonicenses 4, 9-11',
          texto: 'Acerca del amor fraterno no tienen necesidad de que les escriba, pues Dios mismo les ha enseñado a amarse mutuamente. Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 97',
          respuesta: 'R. El Señor llega para juzgar a los pueblos con rectitud.',
          texto: 'Canten al Señor un cántico nuevo porque ha hecho maravillas.\nR. El Señor llega para juzgar.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Mateo 25, 14-30',
          texto: '«A todo el que tiene se le dará y le sobrará...». Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, acepta...',
        antifona_comunion: 'El que come mi carne...',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      }
    }
  },

  // SEMANA 22 (Lunes a Sábado)
  '22': {
    1: {
      'II': {
        titulo_celebracion: 'Lunes de la 22ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Ten piedad de mí, Señor, pues a ti clamo todo el día (Sal 85, 3).',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: '1 Corintios 2, 1-5',
          monicion: 'San Pablo predica la sabiduría de la cruz con la fuerza del Espíritu Santo.',
          texto: 'Yo, hermanos, cuando vine a ustedes a anunciarles el misterio de Dios, no lo hice con sublime elocuencia... Me presenté débil y tembloroso, para que su fe no se apoye en sabiduría humana sino en el poder de Dios. Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 118',
          respuesta: 'R. ¡Cuánto amo tu ley, Señor!',
          texto: '¡Cuánto amo tu ley, Señor! Todo el día la estoy meditando.\nR. ¡Cuánto amo tu ley, Señor!'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. El Espíritu del Señor está sobre mí; me ha enviado para anunciar el Evangelio a los pobres. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 4, 16-30',
          monicion: 'Jesús en la sinagoga de Nazaret proclama el cumplimiento de las profecías.',
          texto: 'En aquel tiempo, fue Jesús a Nazaret, donde se había criado, entró en la sinagoga como era su costumbre el sábado... «El Espíritu del Señor está sobre mí, porque él me ha ungido... Hoy se ha cumplido esta Escritura que acaban de oír». Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
        antifona_comunion: '¡Qué grande es tu bondad, Señor!',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      },
      'I': {
        titulo_celebracion: 'Lunes de la 22ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Ten piedad de mí, Señor (Sal 85, 3).',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: '1 Tesalonicenses 4, 13-18',
          texto: 'Hermanos, no queremos que ignoren la suerte de los difuntos para que no se aflijan como los hombres sin esperanza. Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 95',
          respuesta: 'R. El Señor llega a juzgar la tierra.',
          texto: 'Canten al Señor un cántico nuevo.\nR. El Señor llega a juzgar la tierra.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 4, 16-30',
          texto: '«Hoy se ha cumplido esta Escritura que acaban de oír». Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
        antifona_comunion: '¡Qué grande es tu bondad!',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      }
    },
    2: {
      'II': {
        titulo_celebracion: 'Martes de la 22ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Ten piedad de mí, Señor (Sal 85, 3).',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: '1 Corintios 2, 10b-16',
          texto: 'El Espíritu todo lo sondea, incluso las profundidades de Dios... Nosotros tenemos la mente de Cristo. Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 144',
          respuesta: 'R. El Señor es justo en todos sus caminos.',
          texto: 'El Señor es clemente y misericordioso, lento a la cólera y rico en piedad.\nR. El Señor es justo en todos sus caminos.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. Un gran profeta ha surgido entre nosotros: Dios ha visitado a su pueblo. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 4, 31-37',
          texto: 'Jesús bajó a Cafarnaún... y enseñaba con autoridad. En la sinagoga había un hombre poseído por un demonio impuro. Jesús lo increpó diciendo: «¡Cállate y sal de él!». Y el demonio salió de él. Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
        antifona_comunion: '¡Qué grande es tu bondad!',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      },
      'I': {
        titulo_celebracion: 'Martes de la 22ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Ten piedad de mí, Señor (Sal 85, 3).',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: '1 Tesalonicenses 5, 1-6. 9-11',
          texto: 'Ustedes, hermanos, no viven en tinieblas para que ese día los sorprenda como un ladrón. Todos ustedes son hijos de la luz. Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 26',
          respuesta: 'R. Espero gozar de la dicha del Señor en el país de la vida.',
          texto: 'El Señor es mi luz y mi salvación, ¿a quién temeré?\nR. Espero gozar de la dicha del Señor.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 4, 31-37',
          texto: '«¡Sé quién eres: el Santo de Dios!». Jesús lo increpó y el demonio salió. Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
        antifona_comunion: '¡Qué grande es tu bondad!',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      }
    },
    3: {
      'II': {
        titulo_celebracion: 'Miércoles de la 22ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Ten piedad de mí, Señor (Sal 85, 3).',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: '1 Corintios 3, 1-9',
          texto: 'Yo planté, Apolo regó; pero fue Dios quien dio el crecimiento. Así que ni el que planta es algo, ni el que riega, sino Dios que da el crecimiento. Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 32',
          respuesta: 'R. Dichoso el pueblo que el Señor se escogió como heredad.',
          texto: 'Dichosa la nación cuyo Dios es el Señor.\nR. Dichoso el pueblo.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. El Señor me ha enviado para anunciar el Evangelio a los pobres. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 4, 38-44',
          texto: 'Jesús entró en la casa de Simón. La suegra de Simón estaba con fiebre alta y le rogaron por ella. Él se inclinó sobre ella, increpó a la fiebre y la fiebre se le quitó... «También a las otras ciudades tengo que anunciarles el reino de Dios, porque para esto he sido enviado». Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
        antifona_comunion: '¡Qué grande es tu bondad!',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      },
      'I': {
        titulo_celebracion: 'Miércoles de la 22ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Ten piedad de mí, Señor (Sal 85, 3).',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: 'Colosenses 1, 1-8',
          texto: 'Damos gracias a Dios, Padre de nuestro Señor Jesucristo... al enterarnos de su fe en Cristo Jesús y del amor que tienen a todos los santos. Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 51',
          respuesta: 'R. Confío en la misericordia de Dios por siempre jamás.',
          texto: 'Yo, como verde olivo en la casa de Dios, confío en su misericordia.\nR. Confío en la misericordia de Dios.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 4, 38-44',
          texto: 'Jesús curó a la suegra de Pedro y a muchos enfermos al ponerse el sol. Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
        antifona_comunion: '¡Qué grande es tu bondad!',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      }
    },
    4: {
      'II': {
        titulo_celebracion: 'Jueves de la 22ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Ten piedad de mí, Señor (Sal 85, 3).',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: '1 Corintios 3, 18-23',
          texto: 'Nadie se engañe: si alguno se cree sabio según este mundo, hágase necio para llegar a ser sabio. Porque la sabiduría de este mundo es necedad ante Dios. Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 23',
          respuesta: 'R. Del Señor es la tierra y cuanto la llena.',
          texto: 'Del Señor es la tierra y cuanto la llena, el orbe y todos sus habitantes.\nR. Del Señor es la tierra.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. Síganme, dice el Señor, y los haré pescadores de hombres. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 5, 1-11',
          texto: 'La pesca milagrosa: Jesús dijo a Simón: «Rema mar adentro y echen sus redes para la pesca». Simón respondió: «Maestro, nos hemos pasado la noche bregando y no hemos sacado nada; pero, por tu palabra, echaré las redes»... «No temas; desde ahora serás pescador de hombres». Y dejándolo todo, lo siguieron. Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
        antifona_comunion: '¡Qué grande es tu bondad!',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      },
      'I': {
        titulo_celebracion: 'Jueves de la 22ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Ten piedad de mí, Señor (Sal 85, 3).',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: 'Colosenses 1, 9-14',
          texto: 'No cesamos de rezar por ustedes... Damos gracias al Padre que los ha hecho capaces de compartir la herencia de los santos en la luz. Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 97',
          respuesta: 'R. El Señor da a conocer su salvación.',
          texto: 'El Señor da a conocer su salvación, revela a las naciones su justicia.\nR. El Señor da a conocer su salvación.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 5, 1-11',
          texto: '«Rema mar adentro y echen las redes...». Dejándolo todo, lo siguieron. Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
        antifona_comunion: '¡Qué grande es tu bondad!',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      }
    },
    5: {
      'II': {
        titulo_celebracion: 'Viernes de la 22ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Ten piedad de mí, Señor (Sal 85, 3).',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: '1 Corintios 4, 1-5',
          texto: 'Que la gente nos considere como servidores de Cristo y administradores de los misterios de Dios... Quien me juzga es el Señor. Por eso, no juzguen nada antes de tiempo. Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 36',
          respuesta: 'R. La salvación de los justos viene del Señor.',
          texto: 'Confía en el Señor y haz el bien, habita tu tierra y practica la lealtad.\nR. La salvación de los justos viene del Señor.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. Yo soy la luz del mundo; el que me sigue tendrá la luz de la vida. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 5, 33-39',
          texto: '«¿Acaso pueden hacer ayunar a los invitados a la boda mientras el novio está con ellos?... Nadie echa vino nuevo en odres viejos». Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
        antifona_comunion: '¡Qué grande es tu bondad!',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      },
      'I': {
        titulo_celebracion: 'Viernes de la 22ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Ten piedad de mí, Señor (Sal 85, 3).',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: 'Colosenses 1, 15-20',
          texto: 'Cristo es imagen del Dios invisible, primogénito de toda criatura... porque en él quiso Dios que residiera toda la plenitud y reconciliar por él todas las cosas. Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 99',
          respuesta: 'R. Entren en la presencia del Señor con vítores.',
          texto: 'Aclama al Señor, tierra entera, sirvan al Señor con alegría.\nR. Entren en la presencia del Señor.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 5, 33-39',
          texto: '«Nadie corta un trozo de un vestido nuevo para ponérselo a uno viejo... El vino nuevo debe echarse en odres nuevos». Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
        antifona_comunion: '¡Qué grande es tu bondad!',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      }
    },
    6: {
      'II': {
        titulo_celebracion: 'Sábado de la 22ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Ten piedad de mí, Señor (Sal 85, 3).',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: '1 Corintios 4, 6b-15',
          texto: '¿Quién te hace a ti superior? ¿Qué tienes que no hayas recibido?... Les escribo esto no para avergonzarlos, sino para amonestarlos como a hijos queridos. Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 144',
          respuesta: 'R. Cerca está el Señor de los que lo invocan.',
          texto: 'El Señor es justo en todos sus caminos, es bondadoso en todas sus acciones.\nR. Cerca está el Señor.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. Yo soy el camino, la verdad y la vida; nadie va al Padre sino por mí. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 6, 1-5',
          texto: 'Un sábado, iba Jesús atravesando un sembrado; sus discípulos arrancaban espigas y las comían... Jesús les dijo: «¿No han leído lo que hizo David cuando tuvo hambre?... El Hijo del hombre es señor del sábado». Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
        antifona_comunion: '¡Qué grande es tu bondad!',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      },
      'I': {
        titulo_celebracion: 'Sábado de la 22ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Ten piedad de mí, Señor (Sal 85, 3).',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: 'Colosenses 1, 21-23',
          texto: 'Ahora Dios los ha reconciliado por la muerte que Cristo sufrió en su cuerpo de carne, para hacerlos comparecer santos e irreprochables ante él. Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 53',
          respuesta: 'R. El Señor sostiene mi vida.',
          texto: 'Oh Dios, sálvame por tu nombre, sal por mí con tu poder.\nR. El Señor sostiene mi vida.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 6, 1-5',
          texto: '«El Hijo del hombre es señor del sábado». Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
        antifona_comunion: '¡Qué grande es tu bondad!',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      }
    }
  },

  // SEMANA 23 (Lunes a Sábado)
  '23': {
    1: {
      'II': {
        titulo_celebracion: 'Lunes de la 23ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Tú eres justo, Señor, y rectos son tus juicios (Sal 118, 137).',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: '1 Corintios 5, 1-8',
          texto: 'Purifíquense de la vieja levadura para ser una masa nueva... porque nuestra víctima pascual, Cristo, ha sido inmolada. Celebremos la fiesta con los panes ázimos de la sinceridad y de la verdad. Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 5',
          respuesta: 'R. Guíame, Señor, con tu justicia.',
          texto: 'Tú no eres un Dios que ame la maldad; el malvado no es tu huésped.\nR. Guíame, Señor, con tu justicia.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. Mis ovejas escuchan mi voz, y yo las conozco y ellas me siguen. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 6, 6-11',
          texto: 'En sábado entró Jesús en la sinagoga y enseñaba. Había allí un hombre que tenía la mano derecha atrofiada... Jesús le dijo: «Extiende tu mano». Él la extendió y su mano quedó sana. Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
        antifona_comunion: 'Como busca la cierva corrientes de agua...',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      },
      'I': {
        titulo_celebracion: 'Lunes de la 23ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Tú eres justo, Señor (Sal 118, 137).',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: 'Colosenses 1, 24 – 2, 3',
          texto: 'Ahora me alegro de mis sufrimientos por ustedes: así completo en mi carne lo que falta a los padecimientos de Cristo, en favor de su cuerpo que es la Iglesia. Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 61',
          respuesta: 'R. De Dios viene mi salvación y mi gloria.',
          texto: 'Sólo en Dios descansa mi alma, de él viene mi salvación.\nR. De Dios viene mi salvación.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 6, 6-11',
          texto: '«¿Es lícito en sábado hacer el bien o hacer el mal, salvar una vida o destruirla?». Curó la mano atrofiada. Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
        antifona_comunion: 'Como busca la cierva...',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      }
    },
    2: {
      'II': {
        titulo_celebracion: 'Martes de la 23ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Tú eres justo, Señor (Sal 118, 137).',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: '1 Corintios 6, 1-11',
          texto: '¿No saben que los injustos no heredarán el reino de Dios?... Pero han sido lavados, han sido consagrados, han sido justificados en el nombre de nuestro Señor Jesucristo. Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 149',
          respuesta: 'R. El Señor ama a su pueblo.',
          texto: 'Canten al Señor un cántico nuevo, resuene su alabanza en la asamblea.\nR. El Señor ama a su pueblo.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. Yo los he elegido del mundo para que vayan y den fruto. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 6, 12-19',
          texto: 'Jesús se retiró al monte a orar y pasó la noche orando a Dios. Cuando se hizo de día, llamó a sus discípulos, escogió a doce de ellos y los nombró apóstoles... De él salía una fuerza que los curaba a todos. Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
        antifona_comunion: 'Como busca la cierva...',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      },
      'I': {
        titulo_celebracion: 'Martes de la 23ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Tú eres justo, Señor (Sal 118, 137).',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: 'Colosenses 2, 6-15',
          texto: 'Vivan arraigados y edificados en Cristo, firmes en la fe... En él fueron sepultados en el bautismo y resucitaron por la fe en el poder de Dios. Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 144',
          respuesta: 'R. El Señor es bueno con todos.',
          texto: 'El Señor es cariñoso con todas sus criaturas.\nR. El Señor es bueno con todos.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 6, 12-19',
          texto: 'Jesús pasó la noche en oración y eligió a los Doce. Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
        antifona_comunion: 'Como busca la cierva...',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      }
    },
    3: {
      'II': {
        titulo_celebracion: 'Miércoles de la 23ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Tú eres justo, Señor (Sal 118, 137).',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: '1 Corintios 7, 25-31',
          texto: 'El tiempo es corto... Porque la apariencia de este mundo pasa. Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 44',
          respuesta: 'R. Escucha, hija, mira: inclina el oído.',
          texto: 'Prenda es el rey de tu belleza; póstrate ante él, que él es tu Señor.\nR. Escucha, hija, mira.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. Alégrense y salten de gozo, porque su recompensa será grande en los cielos. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 6, 20-26',
          texto: 'Jesús levantó los ojos hacia sus discípulos y dijo: «Dichosos los pobres, porque de ustedes es el reino de Dios. Dichosos los que ahora tienen hambre, porque quedarán saciados... ¡Pero ay de ustedes, los ricos, porque ya tienen su consuelo!». Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
        antifona_comunion: 'Como busca la cierva...',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      },
      'I': {
        titulo_celebracion: 'Miércoles de la 23ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Tú eres justo, Señor (Sal 118, 137).',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: 'Colosenses 3, 1-11',
          texto: 'Si han resucitado con Cristo, busquen los bienes de allá arriba, donde está Cristo sentado a la derecha de Dios... Su vida está escondida con Cristo en Dios. Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 144',
          respuesta: 'R. El Señor es bueno con todos.',
          texto: 'Día tras día te bendeciré, alabaré tu nombre por siempre jamás.\nR. El Señor es bueno.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 6, 20-26',
          texto: 'Las bienaventuranzas y los ayes de Lucas. Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
        antifona_comunion: 'Como busca la cierva...',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      }
    },
    4: {
      'II': {
        titulo_celebracion: 'Jueves de la 23ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Tú eres justo, Señor (Sal 118, 137).',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: '1 Corintios 8, 1b-7. 11-13',
          texto: 'El conocimiento envanece, mientras que el amor edifica... Si un alimento es ocasión de caída para mi hermano, no comeré carne jamás. Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 138',
          respuesta: 'R. Guíame, Señor, por el camino eterno.',
          texto: 'Tú creaste mis entrañas, me tejiste en el seno materno.\nR. Guíame, Señor, por el camino eterno.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. Si nos amamos unos a otros, Dios permanece en nosotros y su amor ha llegado en nosotros a la plenitud. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 6, 27-38',
          texto: 'Jesús dijo a sus discípulos: «Amen a sus enemigos, hagan el bien a los que los odian, bendigan a los que los maldicen, oren por los que los calumnian... Sean compasivos como su Padre es compasivo. No juzguen y no serán juzgados... Den y se les dará». Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
        antifona_comunion: 'Como busca la cierva...',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      },
      'I': {
        titulo_celebracion: 'Jueves de la 23ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Tú eres justo, Señor (Sal 118, 137).',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: 'Colosenses 3, 12-17',
          texto: 'Como elegidos de Dios, vístanse de compasión entrañable, bondad, humildad, mansedumbre, paciencia. Y por encima de todo, revístanse del amor, que es el vínculo de la perfección. Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 150',
          respuesta: 'R. Todo ser que alienta alabe al Señor.',
          texto: 'Alaben al Señor en su templo santo, alábenlo en su fuerte firmamento.\nR. Todo ser que alienta alabe al Señor.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 6, 27-38',
          texto: '«Amen a sus enemigos y su recompensa será grande...». Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
        antifona_comunion: 'Como busca la cierva...',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      }
    },
    5: {
      'II': {
        titulo_celebracion: 'Viernes de la 23ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Tú eres justo, Señor (Sal 118, 137).',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: '1 Corintios 9, 16-19. 22b-27',
          texto: 'El hecho de predicar el Evangelio no es para mí motivo de orgullo; es una necesidad que se me impone: ¡ay de mí si no anuncio el Evangelio!... Me he hecho todo para todos, para ganar sea como sea a algunos. Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 83',
          respuesta: 'R. ¡Qué deseables son tus moradas, Señor del universo!',
          texto: 'Mi alma se consume y anhela los atrios del Señor.\nR. ¡Qué deseables son tus moradas.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. Tu palabra, Señor, es la verdad; conságranos en la verdad. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 6, 39-42',
          texto: '«¿Acaso puede un ciego guiar a otro ciego? ¿No caerán los dos en el hoyo?... ¿Por qué te fijas en la mota que tiene tu hermano en el ojo y no reparas en la viga que llevas en el tuyo?». Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
        antifona_comunion: 'Como busca la cierva...',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      },
      'I': {
        titulo_celebracion: 'Viernes de la 23ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Tú eres justo, Señor (Sal 118, 137).',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: '1 Timoteo 1, 1-2. 12-14',
          texto: 'Doy gracias a aquel que me capacitó, a Cristo Jesús nuestro Señor, porque me tuvo por digno de confianza al ponerme en el ministerio. Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 15',
          respuesta: 'R. Tú, Señor, eres el lote de mi heredad.',
          texto: 'El Señor es el lote de mi heredad y mi copa; mi suerte está en tu mano.\nR. Tú, Señor, eres mi heredad.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 6, 39-42',
          texto: '«Saca primero la viga de tu ojo y entonces verás claro para sacar la mota del ojo de tu hermano». Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
        antifona_comunion: 'Como busca la cierva...',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      }
    },
    6: {
      'II': {
        titulo_celebracion: 'Sábado de la 23ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Tú eres justo, Señor (Sal 118, 137).',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: '1 Corintios 10, 14-22',
          texto: 'El cáliz de la bendición que bendecimos, ¿no es comunión con la sangre de Cristo? Y el pan que partimos, ¿no es comunión con el cuerpo de Cristo? Porque el pan es uno, nosotros, siendo muchos, formamos un solo cuerpo. Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 115',
          respuesta: 'R. Te ofreceré, Señor, un sacrificio de alabanza.',
          texto: '¿Cómo pagaré al Señor todo el bien que me ha hecho? Alzaré la copa de la salvación.\nR. Te ofreceré, Señor, un sacrificio de alabanza.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. El que me ama guardará mi palabra, y mi Padre lo amará y vendremos a él. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 6, 43-49',
          texto: '«No hay árbol bueno que dé fruto malo, ni árbol malo que dé fruto bueno; por el fruto se conoce al árbol... El que escucha mis palabras y las pone en práctica se parece a un hombre que construyó una casa sobre roca». Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
        antifona_comunion: 'Como busca la cierva...',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      },
      'I': {
        titulo_celebracion: 'Sábado de la 23ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Tú eres justo, Señor (Sal 118, 137).',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: '1 Timoteo 1, 15-17',
          texto: 'Es doctrina cierta y digna de fe: que Cristo Jesús vino al mundo para salvar a los pecadores, de los cuales yo soy el primero. Al Rey de los siglos, inmortal, invisible, al único Dios, honor y gloria por los siglos. Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 112',
          respuesta: 'R. Bendito sea el nombre del Señor por siempre jamás.',
          texto: 'Alaben, siervos del Señor, alaben el nombre del Señor.\nR. Bendito sea el nombre del Señor.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 6, 43-49',
          texto: '«¿Por qué me llaman "Señor, Señor", y no hacen lo que digo?». Casa edificada sobre roca. Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
        antifona_comunion: 'Como busca la cierva...',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      }
    }
  },

  // SEMANA 24 (Lunes a Sábado)
  '24': {
    1: {
      'II': {
        titulo_celebracion: 'Lunes de la 24ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Concede la paz, Señor, a los que en ti esperan (Eclo 36, 18).',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: '1 Corintios 11, 17-26. 33',
          texto: 'Cada vez que comen de este pan y beben del cáliz, proclaman la muerte del Señor, hasta que vuelva. Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 39',
          respuesta: 'R. Proclamamos la muerte del Señor, hasta que vuelva.',
          texto: 'Tú no quieres sacrificios ni ofrendas, y en cambio me abriste el oído.\nR. Proclamamos la muerte del Señor.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. Tanto amó Dios al mundo que entregó a su Unigénito, para que todo el que crea en él tenga vida eterna. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 7, 1-10',
          texto: 'El centurión de Cafarnaún: «Señor, no te molestes, pues no soy digno de que entres bajo mi techo... pero di una sola palabra y mi criado quedará sano». Jesús dijo: «Ni en Israel he encontrado tanta fe». Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
        antifona_comunion: '¡Qué preciosa es tu misericordia!',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      },
      'I': {
        titulo_celebracion: 'Lunes de la 24ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Concede la paz, Señor (Eclo 36, 18).',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: '1 Timoteo 2, 1-8',
          texto: 'Te ruego ante todo que se hagan oraciones y súplicas por todos los hombres... Dios quiere que todos los hombres se salven. Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 27',
          respuesta: 'R. Bendito sea el Señor, que escuchó mi voz suplicante.',
          texto: 'Escucha mi voz suplicante cuando te pido auxilio.\nR. Bendito sea el Señor.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 7, 1-10',
          texto: '«Señor, no soy digno de que entres bajo mi techo». Sanación del criado del centurión. Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
        antifona_comunion: '¡Qué preciosa es tu misericordia!',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      }
    },
    2: {
      'II': {
        titulo_celebracion: 'Martes de la 24ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Concede la paz, Señor (Eclo 36, 18).',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: '1 Corintios 12, 12-14. 27-31a',
          texto: 'Ustedes son el cuerpo de Cristo, y cada uno es un miembro. Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 99',
          respuesta: 'R. Somos su pueblo y ovejas de su rebaño.',
          texto: 'Sepan que el Señor es Dios: que él nos hizo y somos suyos.\nR. Somos su pueblo.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. Un gran profeta ha surgido entre nosotros: Dios ha visitado a su pueblo. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 7, 11-17',
          texto: 'Resurrección del hijo de la viuda de Naín: «Muchacho, a ti te digo: ¡levántate!». El muerto se incorporó y empezó a hablar, y Jesús se lo entregó a su madre. Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
        antifona_comunion: '¡Qué preciosa es tu misericordia!',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      },
      'I': {
        titulo_celebracion: 'Martes de la 24ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Concede la paz, Señor (Eclo 36, 18).',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: '1 Timoteo 3, 1-13',
          texto: 'Si alguno aspira al cargo de obispo, desea una noble función... Los diáconos deben ser intachables. Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 100',
          respuesta: 'R. Caminaré con rectitud de corazón.',
          texto: 'Voy a cantar la bondad y la justicia, para ti es mi música, Señor.\nR. Caminaré con rectitud.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 7, 11-17',
          texto: '«¡Muchacho, a ti te digo: levántate!». El hijo de la viuda de Naín resucita. Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
        antifona_comunion: '¡Qué preciosa es tu misericordia!',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      }
    },
    3: {
      'II': {
        titulo_celebracion: 'Miércoles de la 24ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Concede la paz, Señor (Eclo 36, 18).',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: '1 Corintios 12, 31 – 13, 13',
          texto: 'Himno de la caridad: «Aunque hablara las lenguas de los hombres y de los ángeles, si no tengo amor, no soy nada... El amor es paciente, es benigno... Quedan la fe, la esperanza y el amor; pero la mayor de ellas es el amor». Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 32',
          respuesta: 'R. Dichoso el pueblo que el Señor se escogió como heredad.',
          texto: 'Dichosa la nación cuyo Dios es el Señor.\nR. Dichoso el pueblo.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. Tus palabras, Señor, son espíritu y vida; tú tienes palabras de vida eterna. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 7, 31-35',
          texto: '«¿A quién compararé los hombres de esta generación?... Tocamos la flauta y no bailaron, cantamos lamentaciones y no lloraron... La sabiduría de Dios ha quedado justificada por todos sus hijos». Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
        antifona_comunion: '¡Qué preciosa es tu misericordia!',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      },
      'I': {
        titulo_celebracion: 'Miércoles de la 24ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Concede la paz, Señor (Eclo 36, 18).',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: '1 Timoteo 3, 14-16',
          texto: 'La Iglesia del Dios vivo es columna y fundamento de la verdad. Grande es el misterio de la piedad: manifestado en la carne, justificado en el Espíritu. Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 110',
          respuesta: 'R. Grandes son las obras del Señor.',
          texto: 'Doy gracias al Señor de todo corazón en la asamblea de los justos.\nR. Grandes son las obras del Señor.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 7, 31-35',
          texto: '«La sabiduría ha quedado justificada por sus hijos». Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
        antifona_comunion: '¡Qué preciosa es tu misericordia!',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      }
    },
    4: {
      'II': {
        titulo_celebracion: 'Jueves de la 24ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Concede la paz, Señor (Eclo 36, 18).',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: '1 Corintios 15, 1-11',
          texto: 'Les recuerdo el Evangelio que les proclamé: que Cristo murió por nuestros pecados según las Escrituras; fue sepultado y resucitó al tercer día... y se apareció a Cefas y luego a los Doce. Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 117',
          respuesta: 'R. Den gracias al Señor porque es bueno, porque es eterna su misericordia.',
          texto: 'La diestra del Señor es excelsa, la diestra del Señor hace proezas.\nR. Den gracias al Señor.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. Vengan a mí todos los que están cansados y agobiados, y yo los aliviaré. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 7, 36-50',
          texto: 'La mujer pecadora en casa de Simón: con sus lágrimas bañaba los pies de Jesús y los enjugaba con sus cabellos. «Muchos pecados le han sido perdonados porque ha amado mucho... Tu fe te ha salvado; vete en paz». Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
        antifona_comunion: '¡Qué preciosa es tu misericordia!',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      },
      'I': {
        titulo_celebracion: 'Jueves de la 24ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Concede la paz, Señor (Eclo 36, 18).',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: '1 Timoteo 4, 12-16',
          texto: 'Que nadie te menosprecie por tu juventud; sé modelo de los creyentes en la palabra, en la conducta, en el amor, en la fe, en la pureza. Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 110',
          respuesta: 'R. Grandes son las obras del Señor.',
          texto: 'Esplendor y belleza son sus obras, su generosidad dura por siempre.\nR. Grandes son las obras del Señor.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 7, 36-50',
          texto: '«Sus muchos pecados quedan perdonados, porque ha mostrado mucho amor». Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
        antifona_comunion: '¡Qué preciosa es tu misericordia!',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      }
    },
    5: {
      'II': {
        titulo_celebracion: 'Viernes de la 24ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Concede la paz, Señor (Eclo 36, 18).',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: '1 Corintios 15, 12-20',
          texto: 'Si Cristo no ha resucitado, vana es nuestra predicación y vana también la fe de ustedes... ¡Pero no! Cristo ha resucitado de entre los muertos: primicia de los que han muerto. Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 16',
          respuesta: 'R. Al despertar me saciaré de tu semblante, Señor.',
          texto: 'Señor, escucha mi apelación, atiende a mis clamores.\nR. Al despertar me saciaré.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. Bendito seas, Padre, Señor del cielo y de la tierra, porque has revelado a los pequeños los misterios del Reino. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 8, 1-3',
          texto: 'Jesús iba caminando por ciudades y aldeas, proclamando la Buena Noticia del reino de Dios. Lo acompañaban los Doce y algunas mujeres que lo servían con sus bienes: María Magdalena, Juana, Susana y muchas otras. Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
        antifona_comunion: '¡Qué preciosa es tu misericordia!',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      },
      'I': {
        titulo_celebracion: 'Viernes de la 24ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Concede la paz, Señor (Eclo 36, 18).',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: '1 Timoteo 6, 2c-12',
          texto: 'La raíz de todos los males es el afán del dinero... Tú, hombre de Dios, huye de estas cosas y busca la justicia, la piedad, la fe, el amor. Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 48',
          respuesta: 'R. Dichosos los pobres en el espíritu, porque de ellos es el reino de los cielos.',
          texto: '¿Por qué temer en los días aciagos cuando me cerca la malicia de mis agresores?\nR. Dichosos los pobres en el espíritu.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 8, 1-3',
          texto: 'Las santas mujeres que servían a Jesús con sus propios bienes. Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
        antifona_comunion: '¡Qué preciosa es tu misericordia!',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      }
    },
    6: {
      'II': {
        titulo_celebracion: 'Sábado de la 24ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Concede la paz, Señor (Eclo 36, 18).',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: '1 Corintios 15, 35-37. 42-49',
          texto: 'Se siembra un cuerpo corruptible, resucita incorruptible; se siembra un cuerpo débil, resucita lleno de fuerza. Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 55',
          respuesta: 'R. Caminaré en presencia de Dios a la luz de la vida.',
          texto: 'Mis enemigos retrocederán cuando yo te invoque; bien sé que Dios está a mi favor.\nR. Caminaré en presencia de Dios.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. Dichosos los que guardan la palabra de Dios con un corazón noble y bueno, y dan fruto perseverando. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 8, 4-15',
          texto: 'Parábola del sembrador: «Salió el sembrador a sembrar su semilla... La semilla que cayó en tierra buena son los que escuchan la palabra con un corazón noble y bueno, la guardan y dan fruto por su perseverancia». Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
        antifona_comunion: '¡Qué preciosa es tu misericordia!',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      },
      'I': {
        titulo_celebracion: 'Sábado de la 24ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Concede la paz, Señor (Eclo 36, 18).',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: '1 Timoteo 6, 13-16',
          texto: 'Te ordeno delante de Dios que guarda la vida de todas las cosas, que guardes el mandamiento sin mancha ni reproche. Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 99',
          respuesta: 'R. Entren en la presencia del Señor con vítores.',
          texto: 'Aclama al Señor, tierra entera, sirvan al Señor con alegría.\nR. Entren en la presencia del Señor.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 8, 4-15',
          texto: 'La parábola del sembrador y los cuatro terrenos. Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
        antifona_comunion: '¡Qué preciosa es tu misericordia!',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      }
    }
  },

  // SEMANA 25 (Lunes a Sábado)
  '25': {
    1: {
      'II': {
        titulo_celebracion: 'Lunes de la 25ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Yo soy la salvación de mi pueblo, dice el Señor.',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: 'Proverbios 3, 27-34',
          texto: 'No niegues un favor a quien lo necesita... No trames daños contra tu prójimo. El Señor da su gracia a los humildes. Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 14',
          respuesta: 'R. El justo habitará en tu monte santo, Señor.',
          texto: 'El que procede honradamente y practica la justicia.\nR. El justo habitará en tu monte santo.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. Brille así su luz ante los hombres para que vean sus buenas obras y den gloria a su Padre. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 8, 16-18',
          texto: '«Nadie enciende una lámpara para taparla con una vasija o ponerla debajo de la cama, sino que la pone en el candelero para que los que entren vean la luz. Pues nada hay oculto que no llegue a descubrirse». Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
        antifona_comunion: 'Tú has promulgado tus preceptos...',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      },
      'I': {
        titulo_celebracion: 'Lunes de la 25ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Yo soy la salvación de mi pueblo.',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: 'Esdras 1, 1-6',
          texto: 'Ciro, rey de Persia, promulga el decreto para que los israelitas regresen a Jerusalén y reconstruyan la Casa del Señor. Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 125',
          respuesta: 'R. El Señor ha estado grande con nosotros.',
          texto: 'Cuando el Señor hizo volver a los cautivos de Sión nos parecía soñar.\nR. El Señor ha estado grande con nosotros.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 8, 16-18',
          texto: '«Nadie enciende una lámpara para esconderla... Al que tiene se le dará». Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
        antifona_comunion: 'Tú has promulgado...',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      }
    },
    2: {
      'II': {
        titulo_celebracion: 'Martes de la 25ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Yo soy la salvación de mi pueblo.',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: 'Proverbios 21, 1-6. 10-13',
          texto: 'El corazón del rey es una corriente de agua en manos del Señor... Practicar la justicia y el derecho agrada al Señor más que los sacrificios. Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 118',
          respuesta: 'R. Guíame, Señor, por la senda de tus mandatos.',
          texto: 'Dichoso el que con vida intachable camina en la ley del Señor.\nR. Guíame, Señor.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. Dichosos los que escuchan la palabra de Dios y la cumplen. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 8, 19-21',
          texto: 'Vinieron a ver a Jesús su madre y sus hermanos... Le avisaron: «Tu madre y tus hermanos están fuera y quieren verte». Él les respondió: «Mi madre y mis hermanos son estos: los que escuchan la palabra de Dios y la ponen por obra». Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
        antifona_comunion: 'Tú has promulgado...',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      },
      'I': {
        titulo_celebracion: 'Martes de la 25ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Yo soy la salvación...',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: 'Esdras 6, 7-8. 12b. 14-20',
          texto: 'Terminaron la construcción del Templo y los israelitas celebraron con júbilo la dedicación de la Casa de Dios. Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 121',
          respuesta: 'R. ¡Qué alegría cuando me dijeron: «Vamos a la casa del Señor»!',
          texto: '¡Qué alegría cuando me dijeron: «Vamos a la casa del Señor»! Ya están pisando nuestros pies tus umbrales, Jerusalén.\nR. ¡Qué alegría!'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 8, 19-21',
          texto: '«Mi madre y mis hermanos son los que escuchan la palabra de Dios y la cumplen». Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
        antifona_comunion: 'Tú has promulgado...',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      }
    },
    3: {
      'II': {
        titulo_celebracion: 'Miércoles de la 25ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Yo soy la salvación de mi pueblo.',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: 'Proverbios 30, 5-9',
          texto: 'Toda palabra de Dios es acrisolada... Dos cosas te pido: no me des pobreza ni riqueza, dame sólo mi ración de pan. Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 118',
          respuesta: 'R. Lámpara es tu palabra para mis pasos, Señor.',
          texto: 'Aparta de mí el camino del engaño y dame la gracia de tu ley.\nR. Lámpara es tu palabra.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. El reino de Dios está cerca; conviértanse y crean en el Evangelio. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 9, 1-6',
          texto: 'Jesús convocó a los Doce y les dio poder y autoridad sobre toda clase de demonios y para curar enfermedades. Y los envió a proclamar el reino de Dios y a curar a los enfermos, diciéndoles: «No lleven nada para el camino...». Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
        antifona_comunion: 'Tú has promulgado...',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      },
      'I': {
        titulo_celebracion: 'Miércoles de la 25ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Yo soy la salvación...',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: 'Esdras 9, 5-9',
          texto: 'Plegaria penitencial de Esdras: «Dios mío, estoy avergonzado y confuso para levantar mi rostro hacia ti... Pero nuestro Dios no nos ha abandonado en nuestra esclavitud». Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Tobías 13',
          respuesta: 'R. Bendito sea Dios, que vive eternamente.',
          texto: 'Castiga y tiene compasión, hace bajar al abismo y saca de él.\nR. Bendito sea Dios.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 9, 1-6',
          texto: 'Misión de los Doce: proclamar el Reino y curar a los enfermos. Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
        antifona_comunion: 'Tú has promulgado...',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      }
    },
    4: {
      'II': {
        titulo_celebracion: 'Jueves de la 25ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Yo soy la salvación de mi pueblo.',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: 'Eclesiastés 1, 2-11',
          texto: '«¡Vanidad de vanidades —dice el Eclesiastés—, vanidad de vanidades, todo es vanidad!». ¿Qué saca el hombre de todo su esfuerzo con que se afana bajo el sol?... Lo que fue, eso será; no hay nada nuevo bajo el sol. Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 89',
          respuesta: 'R. Señor, tú has sido nuestro refugio de generación en generación.',
          texto: 'Tú reduces el hombre al polvo, diciendo: «Vuelvan, hijos de Adán».\nR. Señor, tú has sido nuestro refugio.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. Yo soy el camino, la verdad y la vida, dice el Señor; nadie va al Padre sino por mí. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 9, 7-9',
          texto: 'El tetrarca Herodes se enteró de todo lo que pasaba y estaba perplejo, porque unos decían: «Juan ha resucitado de entre los muertos»... Herodes decía: «A Juan yo le corté la cabeza; ¿quién es, pues, éste de quien oigo tales cosas?». Y tenía ganas de verlo. Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
        antifona_comunion: 'Tú has promulgado...',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      },
      'I': {
        titulo_celebracion: 'Jueves de la 25ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Yo soy la salvación...',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: 'Ageo 1, 1-8',
          texto: 'Así dice el Señor: «¿Es tiempo de que ustedes habiten en casas cubiertas mientras esta Casa de Dios está en ruinas? Mediten bien sus caminos». Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 149',
          respuesta: 'R. El Señor ama a su pueblo.',
          texto: 'Canten al Señor un cántico nuevo, resuene su alabanza en la asamblea.\nR. El Señor ama a su pueblo.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 9, 7-9',
          texto: 'Herodes intrigado por las obras de Jesús. Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
        antifona_comunion: 'Tú has promulgado...',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      }
    },
    5: {
      'II': {
        titulo_celebracion: 'Viernes de la 25ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Yo soy la salvación de mi pueblo.',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: 'Eclesiastés 3, 1-11',
          texto: 'Todo tiene su momento, y cada cosa su tiempo bajo el cielo: tiempo de nacer y tiempo de morir; tiempo de plantar y tiempo de arrancar... Todo lo hizo Dios hermoso a su tiempo. Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 143',
          respuesta: 'R. ¡Bendito sea el Señor, mi Roca!',
          texto: '¡Bendito sea el Señor, mi Roca, que adiestra mis manos para el combate!\nR. ¡Bendito sea el Señor, mi Roca!'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. El Hijo del hombre ha venido a servir y a dar su vida en rescate por muchos. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 9, 18-22',
          texto: 'Estando Jesús orando a solas, estaban con él los discípulos y les preguntó: «¿Quién dice la gente que soy yo?». Pedro respondió: «El Mesías de Dios». Él les prohibió severamente decírselo a nadie y añadió: «El Hijo del hombre tiene que padecer mucho... y resucitar al tercer día». Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
        antifona_comunion: 'Tú has promulgado...',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      },
      'I': {
        titulo_celebracion: 'Viernes de la 25ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Yo soy la salvación...',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: 'Ageo 2, 1-9',
          texto: '«¡Ánimo, pueblo entero del país! —oráculo del Señor—, trabajen, que yo estoy con ustedes... La gloria postrera de este Templo será mayor que la primera». Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 42',
          respuesta: 'R. Espera en Dios, que volverás a alabarlo: «Salud de mi rostro, Dios mío».',
          texto: 'Hazme justicia, oh Dios, defiende mi causa contra gente sin piedad.\nR. Espera en Dios.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 9, 18-22',
          texto: 'Pedro confiesa: «Tú eres el Mesías de Dios». Anuncio de la Pasión. Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
        antifona_comunion: 'Tú has promulgado...',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      }
    },
    6: {
      'II': {
        titulo_celebracion: 'Sábado de la 25ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Yo soy la salvación de mi pueblo.',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: 'Eclesiastés 11, 9 – 12, 8',
          texto: 'Alégrate, joven, en tu juventud... Acuérdate de tu Creador en los días de tu juventud, antes de que lleguen los días aciagos... «¡Vanidad de vanidades —dice el Eclesiastés—, todo es vanidad!». Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 89',
          respuesta: 'R. Señor, tú has sido nuestro refugio de generación en generación.',
          texto: 'Tú reduces el hombre al polvo... Mil años en tu presencia son un ayer que pasó.\nR. Señor, tú has sido nuestro refugio.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. Nuestro Salvador Jesucristo destruyó la muerte e hizo brillar la vida por medio del Evangelio. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 9, 43b-45',
          texto: 'En aquel tiempo, entre la admiración general por todo lo que hacía, Jesús dijo a sus discípulos: «Metan bien en sus oídos estas palabras: El Hijo del hombre va a ser entregado en manos de los hombres». Pero ellos no entendían este lenguaje. Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
        antifona_comunion: 'Tú has promulgado...',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      },
      'I': {
        titulo_celebracion: 'Sábado de la 25ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Yo soy la salvación...',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: 'Zacarías 2, 5-9. 14-15a',
          texto: '«¡Canta y alégrate, hija de Sión! Porque yo vengo a habitar en medio de ti —oráculo del Señor—. Muchas naciones se unirán al Señor aquel día». Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Jeremías 31',
          respuesta: 'R. El Señor nos guardará como un pastor a su rebaño.',
          texto: 'Escuchen, naciones, la palabra del Señor, anúncienla en las islas lejanas.\nR. El Señor nos guardará.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 9, 43b-45',
          texto: '«El Hijo del hombre va a ser entregado en manos de los hombres». Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
        antifona_comunion: 'Tú has promulgado...',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      }
    }
  },

  // SEMANA 26 (Lunes a Sábado)
  '26': {
    1: {
      'II': {
        titulo_celebracion: 'Lunes de la 26ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Señor, todo lo que hiciste con nosotros, lo hiciste con verdadero juicio (Dn 3, 31).',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: 'Job 1, 6-22',
          texto: 'Job pierde sus bienes e hijos y adora a Dios: «Desnudo salí del vientre de mi madre y desnudo volveré a él. El Señor dio, el Señor quitó; ¡bendito sea el nombre del Señor!». Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 16',
          respuesta: 'R. Inclina tu oído hacia mí, Señor, y escucha mis palabras.',
          texto: 'Señor, escucha mi apelación, atiende a mis clamores.\nR. Inclina tu oído hacia mí.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. El Hijo del hombre vino a servir y a dar su vida en rescate por muchos. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 9, 46-50',
          texto: 'Surgió entre los discípulos una discusión sobre quién de ellos sería el mayor. Jesús tomó a un niño, lo puso a su lado y les dijo: «El que acoge a este niño en mi nombre, me acoge a mí... El más pequeño entre todos ustedes, ése es el más grande». Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
        antifona_comunion: 'Acuérdate de la palabra...',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      },
      'I': {
        titulo_celebracion: 'Lunes de la 26ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Señor, todo lo que hiciste...',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: 'Zacarías 8, 1-8',
          texto: '«Volveré a Sión y habitaré en medio de Jerusalén... Salvaré a mi pueblo y ellos serán mi pueblo». Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 101',
          respuesta: 'R. El Señor reconstruirá a Sión y aparecerá en su gloria.',
          texto: 'Las naciones temerán el nombre del Señor y los reyes su gloria.\nR. El Señor reconstruirá a Sión.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 9, 46-50',
          texto: '«El más pequeño entre ustedes, ése es el más grande». Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
        antifona_comunion: 'Acuérdate...',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      }
    },
    2: {
      'II': {
        titulo_celebracion: 'Martes de la 26ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Señor, todo lo que hiciste con nosotros (Dn 3, 31).',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: 'Job 3, 1-3. 11-17. 20-23',
          texto: 'Job abre su boca y maldice el día de su nacimiento: «¿Por qué no morí al salir del seno materno?... Allí los malvados cesan de turbar y allí descansan los exhaustos». Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 87',
          respuesta: 'R. Llegue a tu presencia mi súplica, Señor.',
          texto: 'Señor, Dios de mi salvación, de día y de noche clamo ante ti.\nR. Llegue a tu presencia mi súplica.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. El Hijo del hombre vino a servir y a dar su vida en rescate por todos. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 9, 51-56',
          texto: 'Cuando se iba cumpliendo el tiempo de su asunción, Jesús tomó la firme decisión de ponerse en camino hacia Jerusalén. Unos samaritanos no lo recibieron. Santiago y Juan dijeron: «Señor, ¿quieres que mandemos bajar fuego del cielo para que los consuma?». Pero él se volvió y los reprendió. Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
        antifona_comunion: 'Acuérdate de la palabra...',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      },
      'I': {
        titulo_celebracion: 'Martes de la 26ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Señor, todo lo que hiciste...',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: 'Zacarías 8, 20-23',
          texto: '«Vendrán pueblos numerosos a buscar al Señor... diez hombres de lenguas extranjeras se agarrarán al manto de un judío diciendo: "Queremos ir con ustedes, porque hemos oído que Dios está con ustedes"». Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 86',
          respuesta: 'R. Dios está con nosotros.',
          texto: 'Él la fundó sobre los montes santos; el Señor ama las puertas de Sión.\nR. Dios está con nosotros.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 9, 51-56',
          texto: 'Jesús toma la firme resolución de ir hacia Jerusalén. Rechazo samaritano. Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
        antifona_comunion: 'Acuérdate...',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      }
    },
    3: {
      'II': {
        titulo_celebracion: 'Miércoles de la 26ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Señor, todo lo que hiciste con nosotros (Dn 3, 31).',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: 'Job 9, 1-12. 14-16',
          texto: '«¿Cómo puede un mortal tener razón contra Dios? Si pretendiera litigar con él, no podría responderle una de cada mil preguntas... Él arranca los montes sin que se enteren». Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 87',
          respuesta: 'R. Llegue a tu presencia mi súplica, Señor.',
          texto: 'Señor, todo el día te estoy invocando, tendiendo las manos hacia ti.\nR. Llegue a tu presencia mi súplica.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. Todo lo considero pérdida y basura con tal de ganar a Cristo y encontrarme en él. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 9, 57-62',
          texto: 'Mientras iban de camino, uno le dijo: «Te seguiré a dondequiera que vayas». Jesús le respondió: «Las zorras tienen madrigueras y los pájaros nidos, pero el Hijo del hombre no tiene dónde reclinar la cabeza». A otro le dijo: «Sígueme»... «Nadie que pone la mano en el arado y mira hacia atrás es apto para el reino de Dios». Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
        antifona_comunion: 'Acuérdate de la palabra...',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      },
      'I': {
        titulo_celebracion: 'Miércoles de la 26ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Señor, todo lo que hiciste...',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: 'Nehemías 2, 1-8',
          texto: 'El rey Artajerjes concede a Nehemías regresar a Jerusalén para reedificar las murallas de la ciudad de sus padres. Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 136',
          respuesta: 'R. Que se me pegue la lengua al paladar si no me acuerdo de ti, Jerusalén.',
          texto: 'Junto a los canales de Babilonia nos sentamos a llorar con nostalgia de Sión.\nR. Que se me pegue la lengua al paladar.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 9, 57-62',
          texto: '«Te seguiré a donde vayas... Nadie que mira hacia atrás es apto para el reino de Dios». Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
        antifona_comunion: 'Acuérdate...',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      }
    },
    4: {
      'II': {
        titulo_celebracion: 'Jueves de la 26ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Señor, todo lo que hiciste con nosotros (Dn 3, 31).',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: 'Job 19, 21-27',
          texto: '«¡Tengan piedad de mí, amigos míos!... Yo sé que mi Redentor vive, y que al fin se levantará sobre el polvo; y después de deshecha esta mi piel, en mi carne veré a Dios; yo mismo lo veré, mis propios ojos lo contemplarán». Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 26',
          respuesta: 'R. Espero gozar de la dicha del Señor en el país de la vida.',
          texto: 'Señor, escucha mi voz suplicante; tu rostro buscaré, Señor.\nR. Espero gozar de la dicha del Señor.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. El reino de Dios está cerca; conviértanse y crean en el Evangelio. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 10, 1-12',
          texto: 'Misión de los setenta y dos discípulos: «La mies es abundante y los obreros pocos; rueguen, pues, al dueño de la mies que envíe obreros a su mies. ¡Pónganse en camino! Miren que los envío como corderos en medio de lobos... En la casa en que entren, digan primero: "Paz a esta casa"». Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
        antifona_comunion: 'Acuérdate de la palabra...',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      },
      'I': {
        titulo_celebracion: 'Jueves de la 26ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Señor, todo lo que hiciste...',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: 'Nehemías 8, 1-4a. 5-6. 7b-12',
          texto: 'Esdras lee el libro de la Ley al pueblo. Todo el pueblo lloraba al escuchar la Ley. Esdras dijo: «No estén tristes, pues el gozo del Señor es su fortaleza». Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 18',
          respuesta: 'R. Los mandatos del Señor alegran el corazón.',
          texto: 'La ley del Señor es perfecta y es descanso del alma.\nR. Los mandatos del Señor alegran el corazón.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 10, 1-12',
          texto: 'Misión de los 72 discípulos: «La mies es mucha y los obreros pocos». Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
        antifona_comunion: 'Acuérdate...',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      }
    },
    5: {
      'II': {
        titulo_celebracion: 'Viernes de la 26ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Señor, todo lo que hiciste con nosotros (Dn 3, 31).',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: 'Job 38, 1. 12-21; 40, 3-5',
          texto: 'El Señor respondió a Job desde el seno de la tormenta: «¿Has mandado tú a la mañana en tus días o asignado su puesto a la aurora?...». Job respondió al Señor: «Soy insignificante; ¿qué puedo responderte? Me tapo la boca con la mano». Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 138',
          respuesta: 'R. Guíame, Señor, por el camino eterno.',
          texto: '¿A dónde iré lejos de tu aliento? Si subo al cielo, allí estás tú.\nR. Guíame, Señor, por el camino eterno.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. Ojalá escuchen hoy la voz del Señor: «No endurezcan su corazón». R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 10, 13-16',
          texto: '«¡Ay de ti, Corozaín! ¡Ay de ti, Betsaida! Porque si en Tiro y en Sidón se hubieran hecho los milagros que se han hecho en ustedes, hace tiempo que se habrían convertido... Quien a ustedes escucha, a mí me escucha; quien a ustedes rechaza, a mí me rechaza». Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
        antifona_comunion: 'Acuérdate de la palabra...',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      },
      'I': {
        titulo_celebracion: 'Viernes de la 26ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Señor, todo lo que hiciste...',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: 'Baruc 1, 15-22',
          texto: 'Al Señor, Dios nuestro, la justicia; a nosotros, la vergüenza en el rostro... Hemos pecado contra el Señor, desobedeciéndole. Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 78',
          respuesta: 'R. Líbranos, Señor, por el honor de tu nombre.',
          texto: 'No recuerdes contra nosotros las culpas de nuestros antepasados; que tu compasión nos alcance pronto.\nR. Líbranos, Señor.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 10, 13-16',
          texto: '«Quien a ustedes escucha, a mí me escucha; y quien a ustedes rechaza, a mí me rechaza». Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
        antifona_comunion: 'Acuérdate...',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      }
    },
    6: {
      'II': {
        titulo_celebracion: 'Sábado de la 26ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Señor, todo lo que hiciste con nosotros (Dn 3, 31).',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: 'Job 42, 1-3. 5-6. 12-16',
          texto: 'Job respondió al Señor: «Sé que lo puedes todo... Te conocía sólo de oídas, pero ahora te han visto mis ojos; por eso me retracto y me arrepiento en polvo y ceniza». Y el Señor bendijo a Job al final más que al principio. Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 118',
          respuesta: 'R. Haz brillar, Señor, tu rostro sobre tu siervo.',
          texto: 'Enséñame el buen juicio y la ciencia, porque me fío de tus mandatos.\nR. Haz brillar, Señor, tu rostro.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. Bendito seas, Padre, Señor del cielo y de la tierra, porque has revelado a los pequeños los misterios del Reino. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 10, 17-24',
          texto: 'Los setenta y dos regresaron llenos de alegría diciendo: «Señor, hasta los demonios se nos someten en tu nombre». Jesús les dijo: «No se alegren de que los espíritus se les sometan; alégrense más bien de que sus nombres están inscritos en el cielo»... «Te doy gracias, Padre, porque has escondido estas cosas a los sabios y entendidos y se las has revelado a los pequeños». Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
        antifona_comunion: 'Acuérdate de la palabra...',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      },
      'I': {
        titulo_celebracion: 'Sábado de la 26ª semana del Tiempo Ordinario',
        tiempo_liturgico: 'Tiempo Ordinario',
        color: 'Verde',
        grado: 'Feria',
        antifona_entrada: 'Señor, todo lo que hiciste...',
        oracion_colecta: 'Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
        primera_lectura: {
          titulo: 'Primera Lectura',
          cita: 'Baruc 4, 5-12. 27-29',
          texto: '«¡Ánimo, pueblo mío!... El que les mandó estas desgracias les traerá el gozo eterno con su salvación». Palabra de Dios.'
        },
        salmo_responsorial: {
          cita: 'Salmo 68',
          respuesta: 'R. El Señor escucha a sus pobres.',
          texto: 'Miren, los humildes, y alégrense; busquen a Dios y revivirá su corazón.\nR. El Señor escucha a sus pobres.'
        },
        aclamacion_evangelio: {
          texto: 'R. Aleluya, aleluya. R. Aleluya.'
        },
        evangelio: {
          titulo: 'Santo Evangelio',
          cita: 'Lucas 10, 17-24',
          texto: '«Alégrense de que sus nombres están inscritos en el cielo... Dichosos los ojos que ven lo que ustedes ven». Palabra del Señor.'
        },
        oracion_ofrendas: 'Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.',
        antifona_comunion: 'Acuérdate...',
        oracion_comunion: 'Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.'
      }
    }
  }
};

/**
 * Helper para obtener la feria de la semana
 */
export function getFerialLectionary(
  weekNum: number | string,
  dayOfWeek: number,
  anoFerial: 'I' | 'II'
): FerialLectionaryEntry | null {
  const weekData = LECCIONARIO_FERIAL[String(weekNum)];
  if (!weekData) return null;
  const dayData = weekData[dayOfWeek];
  if (!dayData) return null;
  return dayData[anoFerial] || dayData['II'] || dayData['I'] || null;
}
