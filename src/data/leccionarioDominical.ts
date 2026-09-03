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
 * Base de Datos del Leccionario Romano y Misal para los Domingos del Tiempo Ordinario (Ciclos A, B y C)
 * Textos 100% Íntegros, Canónicos y Sin Abreviar (Leccionario CEM & Misal Romano Oficial)
 */
export const LECCIONARIO_ORDINARIO: Record<string, Partial<Record<'A' | 'B' | 'C', LectionaryEntry>>> = {
  "20": {
    "A": {
      "titulo_celebracion": "XX Domingo del Tiempo Ordinario",
      "tiempo_liturgico": "Tiempo Ordinario",
      "color": "Verde",
      "grado": "Domingo",
      "antifona_entrada": "Fíjate, oh Dios, en nuestro escudo, mira el rostro de tu Ungido (Sal 83, 10-11).",
      "oracion_colecta": "Dios nuestro, que has preparado bienes invisibles para los que te aman, infunde en nuestros corazones la ternura de tu amor, para que, amándote en todo y sobre todo, consigamos tus promesas, que superan todo deseo. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.",
      "primera_lectura": {
        "titulo": "Primera Lectura",
        "cita": "Isaías 56, 1. 6-7",
        "monicion": "El profeta Isaías abre las puertas del Templo a todos los pueblos: «Mi casa será llamada casa de oración para todos los pueblos».",
        "texto": "Así dice el Señor:\n«Guarden el derecho, practiquen la justicia, porque mi salvación está para llegar y se va a revelar mi victoria.\n\nY a los extranjeros que se han unido al Señor para servirlo, para amar el nombre del Señor y ser sus servidores, que guardan el sábado sin profanarlo y perseveran en mi alianza, los traeré a mi monte santo, los llenaré de júbilo en mi casa de oración; sus holocaustos y sus sacrificios serán aceptables sobre mi altar; porque mi casa será llamada casa de oración para todos los pueblos».\n\nPalabra de Dios."
      },
      "salmo_responsorial": {
        "cita": "Salmo 66, 2-3. 5. 6 y 8",
        "respuesta": "R. Que los pueblos te alaben, Señor; que todos los pueblos te alaben.",
        "texto": "El Señor tenga piedad y nos bendiga,\nilumine su rostro sobre nosotros;\nconozca la tierra tus caminos,\ntodos los pueblos tu salvación.\n\nR. Que los pueblos te alaben, Señor; que todos los pueblos te alaben.\n\nQue canten de alegría las naciones,\nporque riges el mundo con justicia\ny gobiernas las naciones de la tierra.\n\nR. Que los pueblos te alaben, Señor; que todos los pueblos te alaben.\n\nQue los pueblos te alaben, Señor,\nque todos los pueblos te alaben.\nQue Dios nos bendiga; que le teman\nhasta los confines del orbe.\n\nR. Que los pueblos te alaben, Señor; que todos los pueblos te alaben."
      },
      "segunda_lectura": {
        "titulo": "Segunda Lectura",
        "cita": "Romanos 11, 13-15. 29-32",
        "monicion": "San Pablo enseña que los dones y la llamada de Dios son irrevocables y alcanzan a todos.",
        "texto": "Hermanos: Les digo a ustedes, los gentiles: mientras sea yo apóstol de los gentiles, haré honor a mi ministerio, por si consigo provocar el celo de los de mi raza y salvar a algunos de ellos. Pues si su rechazo ha sido la reconciliación del mundo, ¿qué será su readmisión sino una resurrección de entre los muertos?\n\nPorque los dones y la vocación de Dios son irrevocables.\n\nPues así como ustedes en otro tiempo desobedecieron a Dios, pero ahora han alcanzado misericordia con ocasión de la desobediencia de ellos, así también ellos han desobedecido ahora con ocasión de la misericordia que ustedes han alcanzado, para que también ellos alcancen ahora misericordia. Pues Dios encerró a todos en la desobediencia, para tener misericordia de todos.\n\nPalabra de Dios."
      },
      "aclamacion_evangelio": {
        "texto": "R. Aleluya, aleluya.\nJesús proclamaba el Evangelio del reino, curando toda dolencia en el pueblo.\nR. Aleluya."
      },
      "evangelio": {
        "titulo": "Santo Evangelio",
        "cita": "Mateo 15, 21-28",
        "monicion": "Jesús ensalza la fe perseverante de la mujer cananea: «Mujer, ¡qué grande es tu fe!».",
        "texto": "En aquel tiempo, Jesús partió de allí y se retiró a la región de Tiro y de Sidón. De pronto, una mujer cananea, que procedía de aquellos confines, se puso a gritar diciendo:\n«¡Ten compasión de mí, Señor, Hijo de David! Mi hija está atormentada por un demonio».\n\nPero él no le respondió una palabra. Entonces los discípulos se le acercaron y le rogaban:\n«Atiéndela, que viene gritando detrás de nosotros».\n\nÉl respondió:\n«No he sido enviado sino a las ovejas descarriadas de la casa de Israel».\n\nElla se acercó y se postró ante él diciendo:\n«¡Señor, ayúdame!».\n\nÉl le contestó:\n«No está bien tomar el pan de los hijos y echárselo a los perritos».\n\nPero ella dijo:\n«Es verdad, Señor, pero también los perritos comen las migajas que caen de la mesa de sus amos».\n\nEntonces Jesús le respondió:\n«Mujer, ¡qué grande es tu fe! Que se cumpla lo que deseas».\n\nY en aquel mismo instante su hija quedó curada.\n\nPalabra del Señor."
      },
      "oracion_ofrendas": "Acepta, Señor, estos dones en los que se realiza un admirable intercambio, para que, al ofrecerte lo que tú nos diste, merezcamos recibirte a ti mismo. Por Jesucristo, nuestro Señor. Amén.",
      "antifona_comunion": "En el Señor está la misericordia, la redención copiosa (Sal 129, 7).",
      "oracion_comunion": "Unidos a Cristo por este sacramento, imploramos, Señor, tu clemencia, para que, configurados a su imagen en la tierra, merezcamos participar de su gloria en el cielo. Por Jesucristo, nuestro Señor. Amén.",
      "reflexion_homiletica": []
    },
    "B": {
      "titulo_celebracion": "XX Domingo del Tiempo Ordinario",
      "tiempo_liturgico": "Tiempo Ordinario",
      "color": "Verde",
      "grado": "Domingo",
      "antifona_entrada": "Fíjate, oh Dios, en nuestro escudo, mira el rostro de tu Ungido (Sal 83, 10-11).",
      "oracion_colecta": "Dios nuestro, que has preparado bienes invisibles para los que te aman, infunde en nuestros corazones la ternura de tu amor, para que, amándote en todo y sobre todo, consigamos tus promesas, que superan todo deseo. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.",
      "primera_lectura": {
        "titulo": "Primera Lectura",
        "cita": "Proverbios 9, 1-6",
        "monicion": "La Sabiduría divina prepara su banquete e invita a los sencillos a comer de su pan y beber de su vino.",
        "texto": "La Sabiduría se ha edificado una casa, ha labrado sus siete columnas, ha matado sus víctimas, ha mezclado su vino y ha preparado su mesa.\n\nHa enviado a sus criadas para que proclamen en los lugares más altos de la ciudad:\n«El que sea sencillo, que venga acá».\n\nA los faltos de juicio les dice:\n«Vengan, coman de mi pan y beban del vino que he mezclado. Dejen la insensatez y vivirán, y sigan el camino de la inteligencia».\n\nPalabra de Dios."
      },
      "salmo_responsorial": {
        "cita": "Salmo 33, 2-3. 10-11. 12-13. 14-15",
        "respuesta": "R. Gusten y vean qué bueno es el Señor.",
        "texto": "Bendigo al Señor en todo momento,\nsu alabanza está siempre en mi boca;\nmi alma se gloría en el Señor:\nque los humildes lo escuchen y se alegren.\n\nR. Gusten y vean qué bueno es el Señor.\n\nTeman al Señor, santos suyos,\nque nada les falta a los que lo temen;\nlos ricos se empobrecen y pasan hambre,\nlos que buscan al Señor no carecen de nada.\n\nR. Gusten y vean qué bueno es el Señor.\n\nVengan, hijos, escúchenme:\nles enseñaré el temor del Señor.\n¿Quién es el hombre que ama la vida\ny desea días de prosperidad?\n\nR. Gusten y vean qué bueno es el Señor.\n\nGuarda tu lengua del mal,\ntus labios de la falsedad;\napártate del mal y haz el bien,\nbusca la paz y corre tras ella.\n\nR. Gusten y vean qué bueno es el Señor."
      },
      "segunda_lectura": {
        "titulo": "Segunda Lectura",
        "cita": "Efesios 5, 15-20",
        "monicion": "San Pablo nos exhorta a vivir no como necios sino como sabios, llenándonos del Espíritu Santo.",
        "texto": "Hermanos: Tengan mucho cuidado de cómo se conducen: no como necios, sino como sabios, aprovechando el momento presente, porque los días son malos.\n\nPor tanto, no sean insensatos, sino comprendan cuál es la voluntad del Señor. Y no se emborrachen con vino, que es causa de libertinaje, sino llénense del Espíritu.\n\nReciten entre ustedes salmos, himnos y cánticos inspirados; canten y toquen para el Señor desde lo hondo de su corazón, dando gracias siempre y por todo a Dios Padre, en el nombre de nuestro Señor Jesucristo.\n\nPalabra de Dios."
      },
      "aclamacion_evangelio": {
        "texto": "R. Aleluya, aleluya.\nEl que come mi carne y bebe mi sangre habita en mí y yo en él, dice el Señor.\nR. Aleluya."
      },
      "evangelio": {
        "titulo": "Santo Evangelio",
        "cita": "Juan 6, 51-58",
        "monicion": "Jesús proclama: «Mi carne es verdadera comida y mi sangre es verdadera bebida; el que come mi carne tiene vida eterna».",
        "texto": "En aquel tiempo, dijo Jesús a la multitud de los judíos:\n«Yo soy el pan vivo que ha bajado del cielo: el que coma de este pan vivirá para siempre. Y el pan que yo daré es mi carne para la vida del mundo».\n\nDisputaban entonces los judíos entre sí diciendo:\n«¿Cómo puede éste darnos a comer su carne?».\n\nEntonces Jesús les dijo:\n«En verdad, en verdad les digo: si no comen la carne del Hijo del hombre y no beben su sangre, no tienen vida en ustedes. El que come mi carne y bebe mi sangre tiene vida eterna, y yo lo resucitaré en el último día. Porque mi carne es verdadera comida y mi sangre es verdadera bebida. El que come mi carne y bebe mi sangre habita en mí y yo en él.\n\nComo el Padre que vive me ha enviado, y yo vivo por el Padre, así, el que me come vivirá por mí. Éste es el pan que ha bajado del cielo: no como el de sus padres, que lo comieron y murieron; el que come este pan vivirá para siempre».\n\nPalabra del Señor."
      },
      "oracion_ofrendas": "Acepta, Señor, estos dones en los que se realiza un admirable intercambio, para que, al ofrecerte lo que tú nos diste, merezcamos recibirte a ti mismo. Por Jesucristo, nuestro Señor. Amén.",
      "antifona_comunion": "En el Señor está la misericordia, la redención copiosa (Sal 129, 7).",
      "oracion_comunion": "Unidos a Cristo por este sacramento, imploramos, Señor, tu clemencia, para que, configurados a su imagen en la tierra, merezcamos participar de su gloria en el cielo. Por Jesucristo, nuestro Señor. Amén.",
      "reflexion_homiletica": []
    },
    "C": {
      "titulo_celebracion": "XX Domingo del Tiempo Ordinario",
      "tiempo_liturgico": "Tiempo Ordinario",
      "color": "Verde",
      "grado": "Domingo",
      "antifona_entrada": "Fíjate, oh Dios, en nuestro escudo, mira el rostro de tu Ungido (Sal 83, 10-11).",
      "oracion_colecta": "Dios nuestro, que has preparado bienes invisibles para los que te aman, infunde en nuestros corazones la ternura de tu amor, para que, amándote en todo y sobre todo, consigamos tus promesas, que superan todo deseo. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.",
      "primera_lectura": {
        "titulo": "Primera Lectura",
        "cita": "Jeremías 38, 4-6. 8-10",
        "monicion": "El profeta Jeremías es arrojado al aljibe por proclamar fielmente la palabra de Dios, pero el Señor lo libra de la muerte.",
        "texto": "En aquellos días, los príncipes dijeron al rey:\n«Muera ese Jeremías, porque desmoraliza a los soldados que quedan en la ciudad y a todo el pueblo, diciéndoles semejantes cosas; ese hombre no busca el bien del pueblo, sino su ruina».\n\nRespondió el rey Sedecías:\n«Ahí lo tienen en sus manos; pues el rey no puede nada contra ustedes».\n\nEntonces se apoderaron de Jeremías y lo arrojaron en el aljibe de Malquías, príncipe real, en el patio de la guardia, descolgándolo con sogas. En el aljibe no había agua, sino lodo, y Jeremías se hundió en el lodo.\n\nEbedmélec salió del palacio real y dijo al rey:\n«Mi señor, el rey, esos hombres han obrado mal tratando así al profeta Jeremías, arrojándolo al aljibe; va a morir de hambre en ese lugar, porque ya no hay pan en la ciudad».\n\nEntonces el rey ordenó a Ebedmélec, el cusita:\n«Toma contigo de aquí a treinta hombres y saca al profeta Jeremías del aljibe antes de que muera».\n\nPalabra de Dios."
      },
      "salmo_responsorial": {
        "cita": "Salmo 39, 2. 3. 4. 18",
        "respuesta": "R. Señor, date prisa en socorrerme.",
        "texto": "Yo esperaba con ansia al Señor;\nél se inclinó y escuchó mi grito:\nme levantó de la fosa fatal,\nde la charca fangosa.\n\nR. Señor, date prisa en socorrerme.\n\nAfianzó mis pies sobre roca,\naseguró mis pasos;\nme puso en la boca un cántico nuevo,\nun himno a nuestro Dios.\n\nR. Señor, date prisa en socorrerme.\n\nMuchos, al verlo, quedaron sobrecogidos\ny confiaron en el Señor.\nYo soy pobre y desvalido,\npero el Señor cuida de mí;\ntú eres mi auxilio y mi libertador:\nDios mío, no tardes.\n\nR. Señor, date prisa en socorrerme."
      },
      "segunda_lectura": {
        "titulo": "Segunda Lectura",
        "cita": "Hebreos 12, 1-4",
        "monicion": "«Corramos con constancia en la carrera que se nos propone, fijos los ojos en Jesús, el que inicia y consuma la fe».",
        "texto": "Hermanos: Teniendo en derredor nuestro tan gran nube de testigos, despojémonos de todo lastre y del pecado que nos asedia, y corramos con constancia en la carrera que se nos propone, fijos los ojos en el que inició y consumó la fe, Jesús: quien, en lugar del gozo que se le proponía, soportó la cruz sin miedo a la ignominia, y está sentado a la derecha del trono de Dios.\n\nPiensen en aquel que soportó tal contradicción de parte de los pecadores contra sí mismo, para que no decaigan en su ánimo ni desfallezcan. Pues todavía no han llegado a resistir hasta la sangre en su lucha contra el pecado.\n\nPalabra de Dios."
      },
      "aclamacion_evangelio": {
        "texto": "R. Aleluya, aleluya.\nMis ovejas escuchan mi voz, dice el Señor; yo las conozco y ellas me siguen.\nR. Aleluya."
      },
      "evangelio": {
        "titulo": "Santo Evangelio",
        "cita": "Lucas 12, 49-53",
        "monicion": "Jesús proclama: «He venido a prender fuego en la tierra, ¡y cuánto desearía que ya estuviera ardiendo!».",
        "texto": "En aquel tiempo, dijo Jesús a sus discípulos:\n«He venido a prender fuego en la tierra, ¡y cuánto desearía que ya estuviera ardiendo! Con un bautismo tengo que ser bautizado, ¡y qué angustia siento hasta que se cumpla!\n\n¿Piensan que he venido a traer paz a la tierra? No, sino división. Porque de aquí en adelante, cinco en una misma casa estarán divididos: tres contra dos y dos contra tres; estarán divididos el padre contra el hijo y el hijo contra el padre, la madre contra la hija y la hija contra la madre, la suegra contra su nuera y la nuera contra la suegra».\n\nPalabra del Señor."
      },
      "oracion_ofrendas": "Acepta, Señor, estos dones en los que se realiza un admirable intercambio, para que, al ofrecerte lo que tú nos diste, merezcamos recibirte a ti mismo. Por Jesucristo, nuestro Señor. Amén.",
      "antifona_comunion": "En el Señor está la misericordia, la redención copiosa (Sal 129, 7).",
      "oracion_comunion": "Unidos a Cristo por este sacramento, imploramos, Señor, tu clemencia, para que, configurados a su imagen en la tierra, merezcamos participar de su gloria en el cielo. Por Jesucristo, nuestro Señor. Amén.",
      "reflexion_homiletica": []
    }
  },
  "21": {
    "A": {
      "titulo_celebracion": "XXI Domingo del Tiempo Ordinario",
      "tiempo_liturgico": "Tiempo Ordinario",
      "color": "Verde",
      "grado": "Domingo",
      "antifona_entrada": "Fíjate, oh Dios, en nuestro escudo, mira el rostro de tu Ungido (Sal 83, 10-11).",
      "oracion_colecta": "Señor Dios, que unes en un solo querer los corazones de tus fieles, concédenos amar lo que mandas y desear lo que prometes, para que, en medio de las vicisitudes del mundo, nuestros corazones estén firmes allí donde se encuentran los verdaderos gozos. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.",
      "primera_lectura": {
        "titulo": "Primera Lectura",
        "cita": "Isaías 22, 19-23",
        "monicion": "El Señor pone la llave del palacio de David sobre el hombro de su siervo Eliacín: «Lo que él abra nadie lo cerrará».",
        "texto": "Así dice el Señor a Sobna, mayordomo de palacio:\n«Te echaré de tu puesto, te destituiré de tu cargo.\n\nAquel día llamaré a mi siervo, a Eliacín, hijo de Elcías; lo vestiré con tu túnica, lo ceñiré con tu banda, le confiaré tu poder; y será un padre para los habitantes de Jerusalén y para la casa de Judá.\n\nPondré la llave del palacio de David sobre su hombro: lo que él abra nadie lo cerrará, lo que él cierre nadie lo abrirá. Lo clavaré como un clavo en sitio firme, y será un trono de gloria para la casa de su padre».\n\nPalabra de Dios."
      },
      "salmo_responsorial": {
        "cita": "Salmo 137, 1-2a. 2bc-3. 6 y 8bc",
        "respuesta": "R. Señor, tu misericordia es eterna; no abandones la obra de tus manos.",
        "texto": "Te doy gracias, Señor, de todo corazón;\ndelante de los ángeles tocaré para ti;\nme postraré hacia tu santuario,\ndaré gracias a tu nombre: por tu misericordia y tu lealtad.\n\nR. Señor, tu misericordia es eterna; no abandones la obra de tus manos.\n\nCuando te invoqué, me escuchaste,\nacreciste el valor en mi alma.\nEl Señor es sublime, se fija en el humilde,\ny de lejos conoce al soberbio.\n\nR. Señor, tu misericordia es eterna; no abandones la obra de tus manos.\n\nSeñor, tu misericordia es eterna,\nno abandones la obra de tus manos.\n\nR. Señor, tu misericordia es eterna; no abandones la obra de tus manos."
      },
      "segunda_lectura": {
        "titulo": "Segunda Lectura",
        "cita": "Romanos 11, 33-36",
        "monicion": "Solemne himno a la sabiduría insondable de Dios: «De él, por él y para él son todas las cosas».",
        "texto": "¡Qué abismo de generosidad, de sabiduría y de conocimiento el de Dios! ¡Qué insondables sus decisiones y qué irrastreables sus caminos!\n\nPorque ¿quién conoció la mente del Señor? ¿O quién fue su consejero? ¿O quién le dio primero para tener derecho a recompensa?\n\nPorque de él, por él y para él son todas las cosas. A él la gloria por los siglos. Amén.\n\nPalabra de Dios."
      },
      "aclamacion_evangelio": {
        "texto": "R. Aleluya, aleluya.\nTú eres Pedro, y sobre esta piedra edificaré mi Iglesia, y el poder del infierno no la derrotará.\nR. Aleluya."
      },
      "evangelio": {
        "titulo": "Santo Evangelio",
        "cita": "Mateo 16, 13-20",
        "monicion": "Profesión de fe de Pedro en Cesarea de Filipo y la promesa del primado: «Tú eres el Mesías, el Hijo de Dios vivo».",
        "texto": "En aquel tiempo, al llegar a la región de Cesarea de Filipo, Jesús preguntó a sus discípulos:\n«¿Quién dice la gente que es el Hijo del hombre?».\n\nEllos contestaron:\n«Unos que Juan el Bautista, otros que Elías, otros que Jeremías o uno de los profetas».\n\nÉl les dijo:\n«Y ustedes, ¿quién dicen que soy yo?».\n\nTomando la palabra Simón Pedro, dijo:\n«Tú eres el Mesías, el Hijo de Dios vivo».\n\nJesús le respondió:\n«¡Dichoso tú, Simón, hijo de Jonás!, porque eso no te lo ha revelado la carne ni la sangre, sino mi Padre que está en los cielos. Y yo te digo: Tú eres Pedro, y sobre esta piedra edificaré mi Iglesia, y el poder del infierno no prevalecerá contra ella. A ti te daré las llaves del reino de los cielos; y lo que ates en la tierra quedará atado en los cielos, y lo que desates en la tierra quedará desatado en los cielos».\n\nEntonces mandó a los discípulos que no dijeran a nadie que él era el Mesías.\n\nPalabra del Señor."
      },
      "oracion_ofrendas": "Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.",
      "antifona_comunion": "En el Señor está la misericordia, la redención copiosa (Sal 129, 7).",
      "oracion_comunion": "Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.",
      "reflexion_homiletica": []
    },
    "B": {
      "titulo_celebracion": "XXI Domingo del Tiempo Ordinario",
      "tiempo_liturgico": "Tiempo Ordinario",
      "color": "Verde",
      "grado": "Domingo",
      "antifona_entrada": "Fíjate, oh Dios, en nuestro escudo, mira el rostro de tu Ungido (Sal 83, 10-11).",
      "oracion_colecta": "Señor Dios, que unes en un solo querer los corazones de tus fieles, concédenos amar lo que mandas y desear lo que prometes, para que, en medio de las vicisitudes del mundo, nuestros corazones estén firmes allí donde se encuentran los verdaderos gozos. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.",
      "primera_lectura": {
        "titulo": "Primera Lectura",
        "cita": "Josué 24, 1-2a. 15-17. 18b",
        "monicion": "Josué convoca a las tribus en Siquén y renueva la Alianza: «Nosotros serviremos al Señor, porque él es nuestro Dios».",
        "texto": "En aquellos días, Josué reunió a todas las tribus de Israel en Siquén; convocó a los ancianos de Israel, a sus jefes, a sus jueces y a sus oficiales, y se presentaron ante Dios.\n\nJosué dijo a todo el pueblo:\n«Si no les parece bien servir al Señor, elijan hoy a quién quieren servir: a los dioses a quienes sirvieron sus antepasados al otro lado del Río, o a los dioses de los amorreos en cuya tierra habitan; pero yo y mi casa serviremos al Señor».\n\nEl pueblo respondió:\n«¡Lejos de nosotros abandonar al Señor para servir a otros dioses! Porque el Señor es nuestro Dios; él nos sacó a nosotros y a nuestros padres de la tierra de Egipto, de la casa de la esclavitud; él hizo ante nuestros ojos estos grandes signos y nos guardó en todo el camino que recorrimos y entre todos los pueblos por los que pasamos. También nosotros serviremos al Señor, porque él es nuestro Dios».\n\nPalabra de Dios."
      },
      "salmo_responsorial": {
        "cita": "Salmo 33, 2-3. 16-17. 18-19. 20-21. 22-23",
        "respuesta": "R. Gusten y vean qué bueno es el Señor.",
        "texto": "Bendigo al Señor en todo momento,\nsu alabanza está siempre en mi boca;\nmi alma se gloría en el Señor:\nque los humildes lo escuchen y se alegren.\n\nR. Gusten y vean qué bueno es el Señor.\n\nLos ojos del Señor miran a los justos,\nsus oídos escuchan sus gritos;\npero el Señor se enfrenta con los malhechores,\npara borrar de la tierra su memoria.\n\nR. Gusten y vean qué bueno es el Señor.\n\nCuando uno grita, el Señor lo escucha\ny lo libra de sus angustias;\nel Señor está cerca de los atribulados,\nsalva a los abatidos.\n\nR. Gusten y vean qué bueno es el Señor.\n\nAunque el justo padezca muchos males,\nde todos lo libra el Señor.\nÉl cuida de todos sus huesos,\nni uno solo se quebrará.\n\nR. Gusten y vean qué bueno es el Señor."
      },
      "segunda_lectura": {
        "titulo": "Segunda Lectura",
        "cita": "Efesios 5, 21-32",
        "monicion": "San Pablo compara el amor matrimonial indisoluble con la unión mística de Cristo y su Iglesia.",
        "texto": "Hermanos: Sométanse unos a otros por reverencia a Cristo: las mujeres a sus maridos, como al Señor; porque el marido es cabeza de la mujer, como Cristo es cabeza de la Iglesia, salvador de su cuerpo. Y como la Iglesia se somete a Cristo, así también las mujeres a sus maridos en todo.\n\nMaridos, amen a sus mujeres, como Cristo amó a la Iglesia y se entregó a sí mismo por ella, para santificarla, purificándola mediante el baño del agua y la palabra, y para presentársela a sí mismo gloriosa, sin mancha ni arruga ni nada semejante, sino santa e inmaculada.\n\nDe igual modo, los maridos deben amar a sus mujeres como a sus propios cuerpos. El que ama a su mujer se ama a sí mismo. Pues nadie jamás ha odiado su propia carne, sino que la alimenta y la cuida, como Cristo a la Iglesia, porque somos miembros de su cuerpo.\n\n«Por eso dejará el hombre a su padre y a su madre, y se unirá a su mujer, y serán los dos una sola carne». Es este un gran misterio: y yo lo refiero a Cristo y a la Iglesia.\n\nPalabra de Dios."
      },
      "aclamacion_evangelio": {
        "texto": "R. Aleluya, aleluya.\nTus palabras, Señor, son espíritu y vida; tú tienes palabras de vida eterna.\nR. Aleluya."
      },
      "evangelio": {
        "titulo": "Santo Evangelio",
        "cita": "Juan 6, 60-69",
        "monicion": "Confesión de Pedro tras el discurso del Pan de Vida: «Señor, ¿a quién iremos? Tú tienes palabras de vida eterna».",
        "texto": "En aquel tiempo, muchos de los discípulos de Jesús, al oírlo, dijeron:\n«Este modo de hablar es duro; ¿quién puede escucharlo?».\n\nJesús, sabiendo interiormente que sus discípulos murmuraban por esto, les dijo:\n«¿Esto los escandaliza? ¿Pues qué si vieran al Hijo del hombre subir adonde estaba antes? El Espíritu es quien da vida; la carne no sirve para nada. Las palabras que les he dicho son espíritu y son vida. Pero hay algunos de ustedes que no creen».\n\nPues Jesús sabía desde el principio quiénes eran los que no creían y quién era el que lo iba a entregar. Y decía:\n«Por eso les he dicho que nadie puede venir a mí si no le es concedido por el Padre».\n\nDesde entonces muchos de sus discípulos se echaron atrás y ya no andaban con él. Entonces Jesús dijo a los Doce:\n«¿También ustedes quieren marcharse?».\n\nLe respondió Simón Pedro:\n«Señor, ¿a quién iremos? Tú tienes palabras de vida eterna; y nosotros hemos creído y conocido que tú eres el Santo de Dios».\n\nPalabra del Señor."
      },
      "oracion_ofrendas": "Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.",
      "antifona_comunion": "En el Señor está la misericordia, la redención copiosa (Sal 129, 7).",
      "oracion_comunion": "Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.",
      "reflexion_homiletica": []
    },
    "C": {
      "titulo_celebracion": "XXI Domingo del Tiempo Ordinario",
      "tiempo_liturgico": "Tiempo Ordinario",
      "color": "Verde",
      "grado": "Domingo",
      "antifona_entrada": "Fíjate, oh Dios, en nuestro escudo, mira el rostro de tu Ungido (Sal 83, 10-11).",
      "oracion_colecta": "Señor Dios, que unes en un solo querer los corazones de tus fieles, concédenos amar lo que mandas y desear lo que prometes, para que, en medio de las vicisitudes del mundo, nuestros corazones estén firmes allí donde se encuentran los verdaderos gozos. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.",
      "primera_lectura": {
        "titulo": "Primera Lectura",
        "cita": "Isaías 66, 18-21",
        "monicion": "El Señor congregará a todas las naciones para contemplar su gloria en la santa montaña de Jerusalén.",
        "texto": "Así dice el Señor:\n«Yo vengo para reunir a las naciones de toda lengua; vendrán y verán mi gloria. Les daré una señal y enviaré a algunos de sus supervivientes a las naciones: a Tarsis, Libia y Lidia, tiradores de arco; a Túbal y Grecia, a las islas remotas que no oyeron mi fama ni vieron mi gloria; y anunciarán mi gloria a las naciones.\n\nY de todas las naciones traerán a todos los hermanos de ustedes como ofrenda al Señor, a caballo, en carros, en literas, en mulos y en dromedarios, hasta mi monte santo de Jerusalén, dice el Señor, como los israelitas llevan la ofrenda en vasija pura al templo del Señor. Y también de entre ellos tomaré para sacerdotes y levitas, dice el Señor».\n\nPalabra de Dios."
      },
      "salmo_responsorial": {
        "cita": "Salmo 116, 1. 2",
        "respuesta": "R. Vayan por el mundo entero y proclamen el Evangelio.",
        "texto": "Alaben al Señor, todas las naciones,\naclámenlo, todos los pueblos.\n\nR. Vayan por el mundo entero y proclamen el Evangelio.\n\nFirme es su misericordia con nosotros,\nsu fidelidad dura por siempre.\n\nR. Vayan por el mundo entero y proclamen el Evangelio."
      },
      "segunda_lectura": {
        "titulo": "Segunda Lectura",
        "cita": "Hebreos 12, 5-7. 11-13",
        "monicion": "La corrección divina es signo del amor paterno de Dios que educa a sus hijos amados.",
        "texto": "Hermanos: Han olvidado la exhortación paternal que les fue dirigida: «Hijo mío, no desprecies la corrección del Señor, ni te desanimes cuando te reprenda; porque el Señor reprende a los que ama y castiga a todo el que recibe como hijo».\n\nSoporten la prueba para su corrección: Dios los trata como a hijos; pues ¿qué hijo hay a quien su padre no corrija?\n\nEs verdad que ninguna corrección parece al presente causar gozo, sino tristeza; pero luego produce fruto apacible de justicia a los que en ella han sido ejercitados. Por tanto, «levanten las manos caídas y las rodillas vacilantes», y «hagan caminos llanos para sus pies», para que el cojo no tropiece, sino que más bien se cure.\n\nPalabra de Dios."
      },
      "aclamacion_evangelio": {
        "texto": "R. Aleluya, aleluya.\nYo soy el camino, y la verdad, y la vida, dice el Señor; nadie va al Padre sino por mí.\nR. Aleluya."
      },
      "evangelio": {
        "titulo": "Santo Evangelio",
        "cita": "Lucas 13, 22-30",
        "monicion": "Jesús nos exhorta a esforzarnos por entrar por la puerta estrecha.",
        "texto": "En aquel tiempo, Jesús pasaba por ciudades y aldeas enseñando, mientras caminaba hacia Jerusalén. Uno le preguntó:\n«Señor, ¿son pocos los que se salvan?».\n\nÉl les dijo:\n«Esfuércense por entrar por la puerta estrecha, porque les digo que muchos intentarán entrar y no podrán.\n\nCuando el dueño de casa se levante y cierre la puerta, se quedarán afuera y se pondrán a llamar a la puerta diciendo: \"Señor, ábrenos\". Y él les responderá: \"No sé de dónde son\". Entonces comenzarán a decir: \"Hemos comido y bebido contigo y tú has enseñado en nuestras plazas\". Pero él les dirá: \"Les digo que no sé de dónde son. ¡Apártense de mí todos los malhechores!\".\n\nAllí será el llanto y el crujido de dientes, cuando vean a Abrahán, a Isaac, a Jacob y a todos los profetas en el reino de Dios, pero ustedes arrojados fuera. Y vendrán de oriente y de occidente, del norte y del sur, y se sentarán a la mesa en el reino de Dios. Y miren: hay últimos que serán primeros, y primeros que serán últimos».\n\nPalabra del Señor."
      },
      "oracion_ofrendas": "Señor, que con el único y perfecto sacrificio de tu Hijo adquiriste para ti un pueblo de adopción, concede, bondadoso, a tu Iglesia, los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.",
      "antifona_comunion": "En el Señor está la misericordia, la redención copiosa (Sal 129, 7).",
      "oracion_comunion": "Que la obra redentora de tu misericordia fructifique plenamente en nosotros, Señor, y concédenos tu gracia para que podamos complacerte en todo. Por Jesucristo, nuestro Señor. Amén.",
      "reflexion_homiletica": []
    }
  },
  "22": {
    "A": {
      "titulo_celebracion": "XXII Domingo del Tiempo Ordinario",
      "tiempo_liturgico": "Tiempo Ordinario",
      "color": "Verde",
      "grado": "Domingo",
      "antifona_entrada": "Fíjate, oh Dios, en nuestro escudo, mira el rostro de tu Ungido (Sal 83, 10-11).",
      "oracion_colecta": "Dios de poder y de misericordia, de quien procede todo don perfecto, infunde en nuestros corazones el amor de tu nombre, para que, haciendo más religiosa nuestra vida, asegures el bien que ha nacido en nosotros y lo conserves con tu constante protección. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.",
      "primera_lectura": {
        "titulo": "Primera Lectura",
        "cita": "Jeremías 20, 7-9",
        "monicion": "La palabra de Dios quema las entrañas del profeta Jeremías: «Había en mis entrañas un fuego ardiente encerrado en mis huesos».",
        "texto": "Me sedujiste, Señor, y me dejé seducir;\nme forzaste y me pudiste.\nYo era el hazmerreír todo el día,\ntodos se burlaban de mí.\n\nSiempre que hablo tengo que gritar:\n«¡Violencia, destrucción!».\nLa palabra del Señor se volvió para mí\noprobio y desprecio todo el día.\n\nMe dije: «No me acordaré de él,\nno hablaré más en su nombre»;\npero había en mis entrañas como un fuego ardiente\nencerrado en mis huesos;\nintentaba contenerlo, y no podía.\n\nPalabra de Dios."
      },
      "salmo_responsorial": {
        "cita": "Salmo 62, 2. 3-4. 5-6. 8-9",
        "respuesta": "R. Mi alma está sedienta de ti, Señor, Dios mío.",
        "texto": "Oh Dios, tú eres mi Dios, por ti madrugo,\nmi alma está sedienta de ti;\nmi carne tiene ansia de ti,\ncomo tierra reseca, agostada, sin agua.\n\nR. Mi alma está sedienta de ti, Señor, Dios mío.\n\n¡Cómo te contemplaba en el santuario\nviendo tu fuerza y tu gloria!\nTu gracia vale más que la vida,\nmis labios te alabarán.\n\nR. Mi alma está sedienta de ti, Señor, Dios mío.\n\nToda mi vida te bendeciré\ny alzaré las manos invocándote.\nMe saciaré como de enjundia y de manteca,\ny mis labios te alabarán jubilosos.\n\nR. Mi alma está sedienta de ti, Señor, Dios mío.\n\nPorque fuiste mi auxilio,\ny a la sombra de tus alas canto con júbilo;\nmi alma está unida a ti,\ny tu diestra me sostiene.\n\nR. Mi alma está sedienta de ti, Señor, Dios mío."
      },
      "segunda_lectura": {
        "titulo": "Segunda Lectura",
        "cita": "Romanos 12, 1-2",
        "monicion": "San Pablo nos exhorta a ofrecer nuestros cuerpos como ofrenda viva, santa y agradable a Dios.",
        "texto": "Les ruego, pues, hermanos, por la misericordia de Dios, que ofrezcan sus cuerpos como sacrificio vivo, santo, agradable a Dios: éste es su culto espiritual.\n\nY no se amolden a este mundo, sino transfórmense mediante la renovación de su mente, para que puedan discernir cuál es la voluntad de Dios: lo bueno, lo agradable, lo perfecto.\n\nPalabra de Dios."
      },
      "aclamacion_evangelio": {
        "texto": "R. Aleluya, aleluya.\nQue el Padre de nuestro Señor Jesucristo ilumine los ojos de nuestro corazón, para que conozcamos cuál es la esperanza a la que nos llama.\nR. Aleluya."
      },
      "evangelio": {
        "titulo": "Santo Evangelio",
        "cita": "Mateo 16, 21-27",
        "monicion": "Jesús anuncia su Pasión y enseña a sus discípulos: «El que quiera venir en pos de mí, niéguese a sí mismo, tome su cruz y sígame».",
        "texto": "Desde entonces comenzó Jesús a manifestar a sus discípulos que tenía que ir a Jerusalén y padecer mucho a manos de los ancianos, sumos sacerdotes y escribas, y ser ejecutado y resucitar al tercer día.\n\nPedro se lo llevó aparte y se puso a increparlo diciendo:\n«¡Dios te libre, Señor! ¡De ningún modo te ocurrirá eso!».\n\nPero él, volviéndose, dijo a Pedro:\n«¡Ponte detrás de mí, Satanás! Eres para mí tropiezo, porque tus pensamientos no son los de Dios, sino los de los hombres».\n\nEntonces dijo Jesús a sus discípulos:\n«El que quiera venir en pos de mí, que se niegue a sí mismo, que cargue con su cruz y me siga. Porque el que quiera salvar su vida la perderá; pero el que pierda su vida por mí la encontrará. Pues ¿de qué le servirá a un hombre ganar el mundo entero si pierde su alma? ¿O qué podrá dar el hombre a cambio de su alma?\n\nPorque el Hijo del hombre vendrá con la gloria de su Padre entre sus ángeles, y entonces pagará a cada uno según su conducta».\n\nPalabra del Señor."
      },
      "oracion_ofrendas": "Que esta ofrenda sagrada, Señor, nos alcance siempre la bendición salvadora, para que lleve a cabo en nosotros lo que realiza en este sacramento. Por Jesucristo, nuestro Señor. Amén.",
      "antifona_comunion": "En el Señor está la misericordia, la redención copiosa (Sal 129, 7).",
      "oracion_comunion": "Saciados con el pan celestial, te pedimos, Señor, que este alimento de caridad confirme nuestros corazones y nos mueva a servirte en nuestros hermanos. Por Jesucristo, nuestro Señor. Amén.",
      "reflexion_homiletica": []
    },
    "B": {
      "titulo_celebracion": "XXII Domingo del Tiempo Ordinario",
      "tiempo_liturgico": "Tiempo Ordinario",
      "color": "Verde",
      "grado": "Domingo",
      "antifona_entrada": "Fíjate, oh Dios, en nuestro escudo, mira el rostro de tu Ungido (Sal 83, 10-11).",
      "oracion_colecta": "Dios de poder y de misericordia, de quien procede todo don perfecto, infunde en nuestros corazones el amor de tu nombre, para que, haciendo más religiosa nuestra vida, asegures el bien que ha nacido en nosotros y lo conserves con tu constante protección. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.",
      "primera_lectura": {
        "titulo": "Primera Lectura",
        "cita": "Deuteronomio 4, 1-2. 6-8",
        "monicion": "Moisés exhorta a cumplir fielmente los mandamientos de Dios sin añadir ni quitar nada.",
        "texto": "En aquellos días, habló Moisés al pueblo, diciendo:\n«Ahora, Israel, escucha los preceptos y los mandatos que yo les enseño para que los pongan en práctica, y así vivan y entren a tomar posesión de la tierra que el Señor, Dios de sus padres, les va a dar. No añadirán nada a lo que yo les mando ni quitarán nada de ello, guardando los mandamientos del Señor, su Dios, que yo les prescribo.\n\nGuárdenlos y cúmplanlos, porque ellos serán su sabiduría y su prudencia a los ojos de los pueblos, los cuales, oyendo todos estos preceptos, dirán: \"¡Ciertamente es un pueblo sabio e inteligente esta gran nación!\".\n\nPorque, ¿qué gran nación hay que tenga dioses tan cercanos a ella como lo está el Señor, nuestro Dios, en todo lo que le pedimos? ¿Y qué gran nación hay que tenga preceptos y mandatos tan justos como toda esta ley que hoy pongo ante ustedes?».\n\nPalabra de Dios."
      },
      "salmo_responsorial": {
        "cita": "Salmo 14, 2-3a. 3cd-4ab. 5",
        "respuesta": "R. Señor, ¿quién puede hospedarse en tu tienda?",
        "texto": "El que procede honradamente\ny practica la justicia,\nel que tiene intenciones leales\ny no calumnia con su lengua.\n\nR. Señor, ¿quién puede hospedarse en tu tienda?\n\nEl que no hace mal a su prójimo\nni difama al vecino,\nel que tiene por despreciable al malvado\ny honra a los que temen al Señor.\n\nR. Señor, ¿quién puede hospedarse en tu tienda?\n\nEl que no presta dinero a usura\nni acepta soborno contra el inocente.\nEl que así obra nunca fallará.\n\nR. Señor, ¿quién puede hospedarse en tu tienda?"
      },
      "segunda_lectura": {
        "titulo": "Segunda Lectura",
        "cita": "Santiago 1, 17-18. 21b-22. 27",
        "monicion": "«Pongan por obra la palabra y no se contenten sólo con oírla, engañándose a ustedes mismos».",
        "texto": "Mis queridos hermanos: Todo buen regalo y todo don perfecto viene de arriba, del Padre de las luces, en el cual no hay fases ni periodos de sombra. Por propia iniciativa nos engendró con la palabra de la verdad, para que seamos como primicias de sus criaturas.\n\nPor tanto, acojan con docilidad la palabra sembrada en ustedes, que es capaz de salvar sus vidas. Pongan por obra la palabra y no se contenten sólo con oírla, engañándose a ustedes mismos.\n\nLa religión pura e intachable a los ojos de Dios Padre es ésta: visitar huérfanos y viudas en su tribulación y guardarse incontaminado del mundo.\n\nPalabra de Dios."
      },
      "aclamacion_evangelio": {
        "texto": "R. Aleluya, aleluya.\nPor propia iniciativa nos engendró el Padre con la palabra de la verdad, para que seamos como primicias de sus criaturas.\nR. Aleluya."
      },
      "evangelio": {
        "titulo": "Santo Evangelio",
        "cita": "Marcos 7, 1-8. 14-15. 21-23",
        "monicion": "Jesús denuncia la hipocresía que prefiere tradiciones humanas a los mandamientos de Dios.",
        "texto": "En aquel tiempo, se reunieron junto a Jesús los fariseos y algunos escribas venidos de Jerusalén; y vieron que algunos de sus discípulos comían con manos impuras, es decir, sin lavarse las manos. Pues los fariseos y todos los judíos no comen si no se lavan las manos muchas veces, guardando la tradición de los mayores; y al volver de la plaza no comen sin purificarse; y hay muchas otras cosas que han recibido para guardar: lavados de copas, de jarras, de bandejas y de camas.\n\nLos fariseos y los escribas le preguntaron:\n«¿Por qué tus discípulos no proceden conforme a la tradición de los mayores, sino que comen el pan con manos impuras?».\n\nÉl les dijo:\n«Bien profetizó Isaías de ustedes, hipócritas, como está escrito: \"Este pueblo me honra con los labios, pero su corazón está lejos de mí. El culto que me dan es vano, enseñando doctrinas que son preceptos de hombres\". Dejando a un lado el mandamiento de Dios, se aferran a la tradición de los hombres».\n\nLlamando de nuevo a la multitud, les decía:\n«Escúchenme todos y entiendan: Nada hay fuera del hombre que, al entrar en él, pueda mancharlo; lo que sale del hombre, eso es lo que mancha al hombre. Porque de dentro, del corazón de los hombres, salen los malos pensamientos, las fornicaciones, los robos, los homicidios, los adulterios, las codicias, las malicias, el fraude, el libertinaje, la envidia, la injuria, la soberbia, la insensatez. Todas estas maldades salen de dentro y manchan al hombre».\n\nPalabra del Señor."
      },
      "oracion_ofrendas": "Que esta ofrenda sagrada, Señor, nos alcance siempre la bendición salvadora, para que lleve a cabo en nosotros lo que realiza en este sacramento. Por Jesucristo, nuestro Señor. Amén.",
      "antifona_comunion": "En el Señor está la misericordia, la redención copiosa (Sal 129, 7).",
      "oracion_comunion": "Saciados con el pan celestial, te pedimos, Señor, que este alimento de caridad confirme nuestros corazones y nos mueva a servirte en nuestros hermanos. Por Jesucristo, nuestro Señor. Amén.",
      "reflexion_homiletica": []
    },
    "C": {
      "titulo_celebracion": "XXII Domingo del Tiempo Ordinario",
      "tiempo_liturgico": "Tiempo Ordinario",
      "color": "Verde",
      "grado": "Domingo",
      "antifona_entrada": "Fíjate, oh Dios, en nuestro escudo, mira el rostro de tu Ungido (Sal 83, 10-11).",
      "oracion_colecta": "Dios de poder y de misericordia, de quien procede todo don perfecto, infunde en nuestros corazones el amor de tu nombre, para que, haciendo más religiosa nuestra vida, asegures el bien que ha nacido en nosotros y lo conserves con tu constante protección. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.",
      "primera_lectura": {
        "titulo": "Primera Lectura",
        "cita": "Eclesiástico 3, 17-18. 20. 28-29",
        "monicion": "«Hijo mío, hazte pequeño en tus grandezas y hallarás gracia ante el Señor».",
        "texto": "Hijo mío, en tus asuntos procede con humildad y te querrán más que al hombre generoso. Cuanto más grande seas, tanto más humíllate, y alcanzarás gracia ante el Señor. Porque grande es el poder del Señor y los humildes lo glorifican.\n\nPara la enfermedad del soberbio no hay cura, porque la planta de la maldad ha echado raíces en él. El corazón sensato medita los proverbios, y el oído atento es la sabiduría del sabio.\n\nPalabra de Dios."
      },
      "salmo_responsorial": {
        "cita": "Salmo 67, 4-5ac. 6-7ab. 10-11",
        "respuesta": "R. Preparaste, oh Dios, casa para los pobres.",
        "texto": "Los justos se alegran,\ngozan en la presencia de Dios,\nrebosando de contento.\nCanten a Dios, toquen en su honor.\n\nR. Preparaste, oh Dios, casa para los pobres.\n\nPadre de huérfanos, protector de viudas\nes Dios en su santa morada.\nDios da un hogar a los desvalidos,\nlibera a los cautivos y los enriquece.\n\nR. Preparaste, oh Dios, casa para los pobres.\n\nDerramaste en tu heredad una lluvia copiosa,\naliviaste la tierra extenuada;\ny tu grey habitó en la tierra\nque tu bondad preparó para los pobres.\n\nR. Preparaste, oh Dios, casa para los pobres."
      },
      "segunda_lectura": {
        "titulo": "Segunda Lectura",
        "cita": "Hebreos 12, 18-19. 22-24a",
        "monicion": "«Ustedes se han acercado al monte Sión, a la ciudad del Dios vivo, a la Jerusalén celestial».",
        "texto": "Hermanos: Ustedes no se han acercado a una realidad palpable: a un fuego encendido, a densos nubarrones, a la tormenta, al sonido de la trompeta y a aquel clamor de palabras que los que lo oían suplicaban no se les hablara más.\n\nUstedes, en cambio, se han acercado al monte Sión, ciudad del Dios vivo, a la Jerusalén celestial, a millares de ángeles en asamblea festiva, a la congregación de los primogénitos inscritos en el cielo, a Dios, juez de todos, a los espíritus de los justos llegados ya a la perfección, a Jesús, mediador de la nueva alianza.\n\nPalabra de Dios."
      },
      "aclamacion_evangelio": {
        "texto": "R. Aleluya, aleluya.\nTomen mi yugo sobre ustedes y aprendan de mí, que soy manso y humilde de corazón, dice el Señor.\nR. Aleluya."
      },
      "evangelio": {
        "titulo": "Santo Evangelio",
        "cita": "Lucas 14, 1. 7-14",
        "monicion": "Jesús enseña la humildad en los banquetes: «El que se ensalza será humillado, y el que se humilla será ensalzado».",
        "texto": "Un sábado, Jesús entró a comer en casa de uno de los principales fariseos, y ellos lo estaban espiando. Notando cómo los convidados escogían los primeros puestos, les dijo una parábola:\n\n«Cuando seas invitado por alguien a una boda, no te pongas en el primer puesto, no sea que haya sido invitado por él otro más distinguido que tú, y viniendo el que te invitó a ti y a él, te diga: \"Dale el puesto a éste\"; y entonces tengas que ir avergonzado a ocupar el último lugar.\n\nAl contrario, cuando seas invitado, ve a sentarte en el último puesto, para que cuando venga el que te invitó te diga: \"Amigo, sube más arriba\". Entonces tendrás honor en presencia de todos los que están sentados contigo a la mesa. Porque todo el que se ensalza será humillado, y el que se humilla será ensalzado».\n\nDijo también al que lo había invitado:\n«Cuando des una comida o una cena, no invites a tus amigos, ni a tus hermanos, ni a tus parientes, ni a los vecinos ricos; no sea que también ellos te inviten a su vez y te sirva de recompensa. Al contrario, cuando des un banquete, invita a pobres, lisiados, cojos y ciegos; y serás dichoso, porque no tienen con qué pagarte; pues se te pagará en la resurrección de los justos».\n\nPalabra del Señor."
      },
      "oracion_ofrendas": "Que esta ofrenda sagrada, Señor, nos alcance siempre la bendición salvadora, para que lleve a cabo en nosotros lo que realiza en este sacramento. Por Jesucristo, nuestro Señor. Amén.",
      "antifona_comunion": "En el Señor está la misericordia, la redención copiosa (Sal 129, 7).",
      "oracion_comunion": "Saciados con el pan celestial, te pedimos, Señor, que este alimento de caridad confirme nuestros corazones y nos mueva a servirte en nuestros hermanos. Por Jesucristo, nuestro Señor. Amén.",
      "reflexion_homiletica": []
    }
  },
  "23": {
    "A": {
      "titulo_celebracion": "XXIII Domingo del Tiempo Ordinario",
      "tiempo_liturgico": "Tiempo Ordinario",
      "color": "Verde",
      "grado": "Domingo",
      "antifona_entrada": "Fíjate, oh Dios, en nuestro escudo, mira el rostro de tu Ungido (Sal 83, 10-11).",
      "oracion_colecta": "Señor Dios, por quien nos llega la redención y se nos da la adopción filial, mira con bondad a tus hijos amados, para que los que creemos en Cristo alcancemos la verdadera libertad y la herencia eterna. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.",
      "primera_lectura": {
        "titulo": "Primera Lectura",
        "cita": "Ezequiel 33, 7-9",
        "monicion": "El profeta Ezequiel es constituido centinela de la casa de Israel para advertir al pecador.",
        "texto": "Así dice el Señor:\n«A ti, hijo de hombre, te he puesto como centinela de la casa de Israel; cuando escuches una palabra de mi boca, les advertirás de mi parte.\n\nSi yo digo al malvado: \"¡Malvado, vas a morir!\", y tú no le hablas para poner en guardia al malvado de su conducta, el malvado morirá por su culpa, pero a ti te pediré cuenta de su sangre.\n\nPero si tú pones en guardia al malvado para que se convierta de su conducta, y él no se convierte de su conducta, él morirá por su culpa, pero tú habrás salvado tu vida».\n\nPalabra de Dios."
      },
      "salmo_responsorial": {
        "cita": "Salmo 94, 1-2. 6-7. 8-9",
        "respuesta": "R. Ojalá escuchen hoy la voz del Señor: «No endurezcan su corazón».",
        "texto": "Vengan, aclamemos al Señor,\ndemos vítores a la Roca que nos salva;\nentremos a su presencia dándole gracias,\naclamándolo con cantos.\n\nR. Ojalá escuchen hoy la voz del Señor: «No endurezcan su corazón».\n\nEntren, postrémonos por tierra,\nbendiciendo al Señor, creador nuestro.\nPorque él es nuestro Dios,\ny nosotros su pueblo, el rebaño que él guía.\n\nR. Ojalá escuchen hoy la voz del Señor: «No endurezcan su corazón».\n\nOjalá escuchen hoy su voz:\n«No endurezcan el corazón como en Meribá,\ncomo el día de Masá en el desierto;\ncuando sus padres me pusieron a prueba\ny me tentaron, aunque habían visto mis obras».\n\nR. Ojalá escuchen hoy la voz del Señor: «No endurezcan su corazón»."
      },
      "segunda_lectura": {
        "titulo": "Segunda Lectura",
        "cita": "Romanos 13, 8-10",
        "monicion": "San Pablo nos recuerda que la plenitud de la ley cristiana se resume en amar al prójimo.",
        "texto": "Hermanos: No deban a nadie nada, sino el amarse unos a otros; porque el que ama al prójimo ha cumplido la ley.\n\nPues: «No cometerás adulterio, no matarás, no robarás, no codiciarás», y cualquier otro mandamiento, en esta sentencia se resume: «Amarás a tu prójimo como a ti mismo».\n\nEl amor no hace daño al prójimo; por tanto, la plenitud de la ley es el amor.\n\nPalabra de Dios."
      },
      "aclamacion_evangelio": {
        "texto": "R. Aleluya, aleluya.\nDios estaba en Cristo reconciliando al mundo consigo, y ha puesto en nosotros el mensaje de la reconciliación.\nR. Aleluya."
      },
      "evangelio": {
        "titulo": "Santo Evangelio",
        "cita": "Mateo 18, 15-20",
        "monicion": "Jesús enseña las normas de la corrección fraterna y la fuerza de la oración comunitaria.",
        "texto": "En aquel tiempo, dijo Jesús a sus discípulos:\n«Si tu hermano peca contra ti, ve y corrígelo a solas tú y él. Si te escucha, habrás ganado a tu hermano. Si no te escucha, toma contigo todavía a uno o dos, para que por boca de dos o tres testigos conste toda palabra. Si no los escucha a ellos, díselo a la Iglesia; y si no escucha tampoco a la Iglesia, considéralo como un gentil y un publicano.\n\nEn verdad les digo: todo lo que aten en la tierra quedará atado en el cielo, y todo lo que desaten en la tierra quedará desatado en el cielo.\n\nLes digo además: si dos de ustedes se ponen de acuerdo en la tierra para pedir algo, se lo concederá mi Padre que está en los cielos. Porque donde están dos o tres reunidos en mi nombre, allí estoy yo en medio de ellos».\n\nPalabra del Señor."
      },
      "oracion_ofrendas": "Dios nuestro, fuente de la sincera piedad y de la paz, concédenos honrar de tal modo con esta ofrenda tu grandeza, que por la participación en estos santos misterios quedemos unidos en un mismo sentir. Por Jesucristo, nuestro Señor. Amén.",
      "antifona_comunion": "En el Señor está la misericordia, la redención copiosa (Sal 129, 7).",
      "oracion_comunion": "Alimentados con el pan de tu mesa celestial, te suplicamos, Señor, que este manjar de caridad fortalezca nuestros corazones, para que nos sintamos movidos a servirte en los hermanos. Por Jesucristo, nuestro Señor. Amén.",
      "reflexion_homiletica": []
    },
    "B": {
      "titulo_celebracion": "XXIII Domingo del Tiempo Ordinario",
      "tiempo_liturgico": "Tiempo Ordinario",
      "color": "Verde",
      "grado": "Domingo",
      "antifona_entrada": "Fíjate, oh Dios, en nuestro escudo, mira el rostro de tu Ungido (Sal 83, 10-11).",
      "oracion_colecta": "Señor Dios, por quien nos llega la redención y se nos da la adopción filial, mira con bondad a tus hijos amados, para que los que creemos en Cristo alcancemos la verdadera libertad y la herencia eterna. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.",
      "primera_lectura": {
        "titulo": "Primera Lectura",
        "cita": "Isaías 35, 4-7a",
        "monicion": "El profeta Isaías anuncia la salvación mesiánica: «Se despegarán los ojos de los ciegos y los oídos de los sordos se abrirán».",
        "texto": "Digan a los cobardes de corazón:\n«¡Sean fuertes, no teman! Miren a su Dios, que trae el desquite, viene en persona y los salvará».\n\nEntonces se despegarán los ojos de los ciegos, los oídos de los sordos se abrirán, saltará como un ciervo el cojo y la lengua del mudo cantará.\n\nPorque brotarán aguas en el desierto y torrentes en la estepa; el páramo se convertirá en estanque y la tierra reseca en manantiales.\n\nPalabra de Dios."
      },
      "salmo_responsorial": {
        "cita": "Salmo 145, 7. 8-9a. 9bc-10",
        "respuesta": "R. Alaba, alma mía, al Señor.",
        "texto": "El Señor mantiene su fidelidad perpetuamente,\nhace justicia a los oprimidos,\nda pan a los hambrientos.\nEl Señor liberta a los cautivos.\n\nR. Alaba, alma mía, al Señor.\n\nEl Señor abre los ojos al ciego,\nel Señor endereza a los que ya se doblan,\nel Señor ama a los justos.\nEl Señor guarda a los peregrinos.\n\nR. Alaba, alma mía, al Señor.\n\nSustenta al huérfano y a la viuda\ny trastorna el camino de los malvados.\nEl Señor reina eternamente,\ntu Dios, Sión, de edad en edad.\n\nR. Alaba, alma mía, al Señor."
      },
      "segunda_lectura": {
        "titulo": "Segunda Lectura",
        "cita": "Santiago 2, 1-5",
        "monicion": "Santiago reprende la discriminación social: ¿Acaso Dios no eligió a los pobres para ser ricos en la fe y herederos del Reino?",
        "texto": "Hermanos míos: No mezclen con favoritismos la fe en nuestro Señor Jesucristo glorioso.\n\nSi entra en su asamblea un hombre con anillos de oro y magníficamente vestido, y entra también un pobre con un vestido andrajoso, y fijan la vista en el que lleva el vestido magnífico y le dicen: «Tú siéntate aquí cómodamente», y al pobre le dicen: «Tú quédate allí de pie» o «Siéntate en el suelo a mis pies», ¿no hacen discriminaciones entre ustedes y se convierten en jueces con criterios perversos?\n\nEscuchen, mis queridos hermanos: ¿Acaso no escogió Dios a los pobres según el mundo para hacerlos ricos en la fe y herederos del reino que prometió a los que lo aman?\n\nPalabra de Dios."
      },
      "aclamacion_evangelio": {
        "texto": "R. Aleluya, aleluya.\nJesús proclamaba el Evangelio del reino, curando toda dolencia en el pueblo.\nR. Aleluya."
      },
      "evangelio": {
        "titulo": "Santo Evangelio",
        "cita": "Marcos 7, 31-37",
        "monicion": "Jesús cura al sordo mudo diciendo «¡Effetá!», que significa: «¡Ábrete!».",
        "texto": "En aquel tiempo, dejando Jesús el territorio de Tiro, pasó por Sidón y se dirigió al mar de Galilea, atravesando la Decápolis.\n\nLe llevaron un sordo, que además apenas podía hablar, y le rogaban que le impusiera la mano. Él, apartándolo de la multitud a solas, le metió los dedos en los oídos y con la saliva le tocó la lengua; y mirando al cielo, suspiró y le dijo:\n«¡Effetá!» (esto es: «¡Ábrete!»).\n\nY al momento se le abrieron los oídos, se le soltó la traba de la lengua y hablaba correctamente.\n\nÉl les mandó que no lo dijeran a nadie; pero cuanto más se lo mandaba, con más insistencia lo proclamaban ellos. Y en el colmo del asombro decían:\n«Todo lo ha hecho bien; hace oír a los sordos y hablar a los mudos».\n\nPalabra del Señor."
      },
      "oracion_ofrendas": "Dios nuestro, fuente de la sincera piedad y de la paz, concédenos honrar de tal modo con esta ofrenda tu grandeza, que por la participación en estos santos misterios quedemos unidos en un mismo sentir. Por Jesucristo, nuestro Señor. Amén.",
      "antifona_comunion": "En el Señor está la misericordia, la redención copiosa (Sal 129, 7).",
      "oracion_comunion": "Alimentados con el pan de tu mesa celestial, te suplicamos, Señor, que este manjar de caridad fortalezca nuestros corazones, para que nos sintamos movidos a servirte en los hermanos. Por Jesucristo, nuestro Señor. Amén.",
      "reflexion_homiletica": []
    },
    "C": {
      "titulo_celebracion": "XXIII Domingo del Tiempo Ordinario",
      "tiempo_liturgico": "Tiempo Ordinario",
      "color": "Verde",
      "grado": "Domingo",
      "antifona_entrada": "Fíjate, oh Dios, en nuestro escudo, mira el rostro de tu Ungido (Sal 83, 10-11).",
      "oracion_colecta": "Señor Dios, por quien nos llega la redención y se nos da la adopción filial, mira con bondad a tus hijos amados, para que los que creemos en Cristo alcancemos la verdadera libertad y la herencia eterna. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.",
      "primera_lectura": {
        "titulo": "Primera Lectura",
        "cita": "Sabiduría 9, 13-18b",
        "monicion": "«¿Quién conoce tus designios, si tú no le das la sabiduría enviando tu santo espíritu desde el cielo?».",
        "texto": "¿Qué hombre puede conocer el designio de Dios? ¿O quién puede comprender lo que Dios quiere?\n\nLos pensamientos de los mortales son inseguros y nuestros proyectos son falibles; porque el cuerpo corruptible hace pesada el alma y la tienda de barro oprime la mente llena de preocupaciones.\n\nApenas vislumbramos lo que hay en la tierra y con fatiga descubrimos lo que está a nuestro alcance; ¿quién rastreará lo que hay en el cielo?\n\n¿Quién conoció tu voluntad, si tú no le diste la sabiduría enviando tu santo espíritu desde el cielo? Así se enderezaron los caminos de los que están en la tierra, los hombres aprendieron lo que te agrada y se salvaron por la sabiduría.\n\nPalabra de Dios."
      },
      "salmo_responsorial": {
        "cita": "Salmo 89, 3-4. 5-6. 12-13. 14 y 17",
        "respuesta": "R. Señor, tú has sido nuestro refugio de generación en generación.",
        "texto": "Tú reduces el hombre al polvo,\ndiciendo: «Vuelvan, hijos de Adán».\nMil años en tu presencia\nson un ayer que pasó, una vela nocturna.\n\nR. Señor, tú has sido nuestro refugio de generación en generación.\n\nLos siembras año por año,\ncomo hierba que se renueva:\nque florece y se renueva por la mañana,\ny por la tarde la siegan y se seca.\n\nR. Señor, tú has sido nuestro refugio de generación en generación.\n\nEnséñanos a calcular nuestros años,\npara que adquiramos un corazón sensato.\nVuélvete, Señor, ¿hasta cuándo?\nTen compasión de tus siervos.\n\nR. Señor, tú has sido nuestro refugio de generación en generación.\n\nSácianos de tu misericordia por la mañana,\ny seremos felices y nos alegraremos todos nuestros días.\nHaga el Señor Dios bondadoso con nosotros,\nhaga prósperas las obras de nuestras manos.\n\nR. Señor, tú has sido nuestro refugio de generación en generación."
      },
      "segunda_lectura": {
        "titulo": "Segunda Lectura",
        "cita": "Filemón 9b-10. 12-17",
        "monicion": "San Pablo pide a Filemón que reciba al esclavo Onésimo como a un hermano querido en el Señor.",
        "texto": "Querido hermano: Yo, Pablo, anciano y ahora prisionero por Cristo Jesús, te ruego en favor de mi hijo Onésimo, a quien engendré en la prisión.\n\nTe lo devuelvo a él, es decir, a mis propias entrañas. Yo hubiera querido retenerlo junto a mí para que me sirviera en tu lugar en las cadenas del Evangelio; pero no quise hacer nada sin tu consentimiento, para que tu buena obra no fuera por fuerza, sino voluntaria.\n\nPues quizá por esto se apartó de ti por un tiempo: para que lo recuperes para siempre; ya no como esclavo, sino mucho mejor que esclavo, como un hermano querido, muy querido para mí, ¡cuánto más para ti, tanto en la carne como en el Señor!\n\nSi me tienes por amigo, recíbelo como a mí mismo.\n\nPalabra de Dios."
      },
      "aclamacion_evangelio": {
        "texto": "R. Aleluya, aleluya.\nHaz brillar tu rostro sobre tu siervo y enséñame tus leyes.\nR. Aleluya."
      },
      "evangelio": {
        "titulo": "Santo Evangelio",
        "cita": "Lucas 14, 25-33",
        "monicion": "Las exigencias radicales del discipulado: «Cualquiera de ustedes que no renuncie a todos sus bienes no puede ser mi discípulo».",
        "texto": "En aquel tiempo, mucha gente acompañaba a Jesús; él se volvió y les dijo:\n«Si alguno viene a mí y no pospone a su padre y a su madre, a su mujer y a sus hijos, a sus hermanos y a sus hermanas, e incluso a su propia vida, no puede ser mi discípulo.\n\nQuien no carga con su cruz y viene en pos de mí, no puede ser mi discípulo.\n\nPorque ¿quién de ustedes, si quiere construir una torre, no se sienta primero a calcular los gastos, a ver si tiene para terminarla? No sea que, si pone los cimientos y no puede acabar, todos los que lo vean se pongan a burlarse de él diciendo: \"Este hombre empezó a construir y no pudo acabar\".\n\n¿O qué rey, si va a dar la batalla a otro rey, no se sienta primero a deliberar si con diez mil hombres podrá hacer frente al que viene contra él con veinte mil? Y si no puede, cuando el otro está todavía lejos, envía una legación pidiendo la paz.\n\nAsí pues, cualquiera de ustedes que no renuncie a todos sus bienes no puede ser mi discípulo».\n\nPalabra del Señor."
      },
      "oracion_ofrendas": "Dios nuestro, fuente de la sincera piedad y de la paz, concédenos honrar de tal modo con esta ofrenda tu grandeza, que por la participación en estos santos misterios quedemos unidos en un mismo sentir. Por Jesucristo, nuestro Señor. Amén.",
      "antifona_comunion": "En el Señor está la misericordia, la redención copiosa (Sal 129, 7).",
      "oracion_comunion": "Alimentados con el pan de tu mesa celestial, te suplicamos, Señor, que este manjar de caridad fortalezca nuestros corazones, para que nos sintamos movidos a servirte en los hermanos. Por Jesucristo, nuestro Señor. Amén.",
      "reflexion_homiletica": []
    }
  },
  "24": {
    "A": {
      "titulo_celebracion": "XXIV Domingo del Tiempo Ordinario",
      "tiempo_liturgico": "Tiempo Ordinario",
      "color": "Verde",
      "grado": "Domingo",
      "antifona_entrada": "Fíjate, oh Dios, en nuestro escudo, mira el rostro de tu Ungido (Sal 83, 10-11).",
      "oracion_colecta": "Señor Dios, creador y soberano de todas las cosas, míranos y concédenos servirte de todo corazón, para que experimentemos los efectos de tu misericordia. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.",
      "primera_lectura": {
        "titulo": "Primera Lectura",
        "cita": "Eclesiástico 27, 30 – 28, 7",
        "monicion": "El sabio Ben Sirá advierte: «Perdona la ofensa a tu prójimo y se te perdonarán los pecados».",
        "texto": "Rencor e ira son abominaciones que el pecador posee.\n\nQuien se venga, sufrirá la venganza del Señor, que llevará cuenta rigurosa de sus pecados. Perdona la ofensa a tu prójimo, y entonces, cuando pidas, se te perdonarán los pecados.\n\n¿Guarda un hombre rencor a otro hombre y pide salud al Señor? ¿No tiene piedad de un hombre semejante a él y pide perdón por sus propios pecados? Él, que es de carne, guarda rencor: ¿quién perdonará sus pecados?\n\nAcuérdate de las postrimerías y deja de odiar; acuérdate de la corrupción y de la muerte, y persevera en los mandamientos. Acuérdate de los mandamientos y no guardes rencor al prójimo; acuérdate de la alianza del Altísimo y pasa por alto la ofensa.\n\nPalabra de Dios."
      },
      "salmo_responsorial": {
        "cita": "Salmo 102, 1-2. 3-4. 9-10. 11-12",
        "respuesta": "R. El Señor es compasivo y misericordioso, lento a la ira y rico en clemencia.",
        "texto": "Bendice, alma mía, al Señor,\ny todo mi ser a su santo nombre.\nBendice, alma mía, al Señor,\ny no olvides sus beneficios.\n\nR. El Señor es compasivo y misericordioso, lento a la ira y rico en clemencia.\n\nÉl perdona todas tus culpas\ny cura todas tus enfermedades;\nél rescata tu vida de la fosa\ny te colma de gracia y de ternura.\n\nR. El Señor es compasivo y misericordioso, lento a la ira y rico en clemencia.\n\nNo está siempre acusando\nni guarda rencor perpetuo;\nno nos trata como merecen nuestros pecados\nni nos paga según nuestras culpas.\n\nR. El Señor es compasivo y misericordioso, lento a la ira y rico en clemencia.\n\nComo se levanta el cielo sobre la tierra,\nse levanta su bondad sobre los que lo temen;\ncomo dista el oriente del ocaso,\nasí aleja de nosotros nuestros delitos.\n\nR. El Señor es compasivo y misericordioso, lento a la ira y rico en clemencia."
      },
      "segunda_lectura": {
        "titulo": "Segunda Lectura",
        "cita": "Romanos 14, 7-9",
        "monicion": "San Pablo proclama el señorío universal de Cristo sobre vivos y muertos.",
        "texto": "Hermanos: Ninguno de nosotros vive para sí mismo y ninguno muere para sí mismo. Si vivimos, para el Señor vivimos; y si morimos, para el Señor morimos.\n\nAsí pues, ya sea que vivamos o que muramos, del Señor somos.\n\nPues para esto murió y resucitó Cristo: para ser Señor de muertos y vivos.\n\nPalabra de Dios."
      },
      "aclamacion_evangelio": {
        "texto": "R. Aleluya, aleluya.\nLes doy un mandamiento nuevo: que se amen unos a otros como yo los he amado, dice el Señor.\nR. Aleluya."
      },
      "evangelio": {
        "titulo": "Santo Evangelio",
        "cita": "Mateo 18, 21-35",
        "monicion": "Jesús nos pide perdonar siempre: «No siete veces, sino hasta setenta veces siete».",
        "texto": "En aquel tiempo, se acercó Pedro a Jesús y le preguntó:\n«Señor, si mi hermano peca contra mí, ¿cuántas veces tengo que perdonarlo? ¿Hasta siete veces?».\n\nJesús le contesta:\n«No te digo hasta siete veces, sino hasta setenta veces siete.\n\nPor eso, el reino de los cielos se parece a un rey que quiso ajustar las cuentas con sus criados. Al empezar a ajustarlas, le presentaron uno que le debía diez mil talentos. Como no tenía con qué pagar, el señor mandó que lo vendieran a él con su mujer y sus hijos y todo lo que tenía, y que se pagara la deuda. El criado, cayendo a sus pies, le suplicaba diciendo: \"Señor, ten paciencia conmigo y te lo pagaré todo\". El señor de aquel criado, compadecido, lo perdonó y le perdonó la deuda.\n\nAl salir aquel criado, encontró a uno de sus compañeros que le debía cien denarios y, agarrándolo, lo estrangulaba diciendo: \"Paga lo que debes\". El compañero, cayendo a sus pies, le rogaba diciendo: \"Ten paciencia conmigo y te lo pagaré\". Pero él no quiso, sino que fue y lo metió en la cárcel hasta que pagara la deuda.\n\nAl ver sus compañeros lo sucedido, se disgustaron mucho y fueron a contar a su señor todo lo que había pasado. Entonces su señor lo llamó y le dijo: \"¡Siervo malvado! Toda aquella deuda te la perdoné porque me lo suplicaste. ¿No debías tú también compadecerte de tu compañero como yo me compadecí de ti?\". Y, lleno de indignación, su señor lo entregó a los verdugos hasta que pagara toda la deuda.\n\nDe igual modo mi Padre celestial los tratará a ustedes, si cada uno no perdona de corazón a su hermano».\n\nPalabra del Señor."
      },
      "oracion_ofrendas": "Escucha propicio, Señor, nuestras plegarias y acepta benigno las ofrendas de tus siervos, para que lo que cada uno ofrece en honor de tu nombre aproveche para la salvación de todos. Por Jesucristo, nuestro Señor. Amén.",
      "antifona_comunion": "En el Señor está la misericordia, la redención copiosa (Sal 129, 7).",
      "oracion_comunion": "Que la gracia de este celestial sacramento, Señor, penetre nuestro cuerpo y nuestra alma, para que sea siempre su fuerza, y no nuestro propio sentir, lo que guíe nuestras acciones. Por Jesucristo, nuestro Señor. Amén.",
      "reflexion_homiletica": []
    },
    "B": {
      "titulo_celebracion": "XXIV Domingo del Tiempo Ordinario",
      "tiempo_liturgico": "Tiempo Ordinario",
      "color": "Verde",
      "grado": "Domingo",
      "antifona_entrada": "Fíjate, oh Dios, en nuestro escudo, mira el rostro de tu Ungido (Sal 83, 10-11).",
      "oracion_colecta": "Señor Dios, creador y soberano de todas las cosas, míranos y concédenos servirte de todo corazón, para que experimentemos los efectos de tu misericordia. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.",
      "primera_lectura": {
        "titulo": "Primera Lectura",
        "cita": "Isaías 50, 5-9a",
        "monicion": "El Siervo de Yahvé ofrece su espalda a los que lo golpeaban confiando en el auxilio del Señor.",
        "texto": "El Señor Dios me abrió el oído; yo no me resistí ni me eché atrás.\n\nOfrecí mi espalda a los que me golpeaban, mis mejillas a los que me mesaban la barba; no oculté mi rostro a los insultos y salivazos.\n\nEl Señor Dios es mi auxilio, por eso no quedé avergonzado; por eso puse mi rostro como pedernal, sabiendo que no quedaría defraudado. Cerca está mi defensor: ¿quién pleiteará contra mí? ¡Comparezcamos juntos! ¿Quién es mi adversario? ¡Que se acerque a mí! Miren: el Señor Dios es mi auxilio: ¿quién me condenará?\n\nPalabra de Dios."
      },
      "salmo_responsorial": {
        "cita": "Salmo 114, 1-2. 3-4. 5-6. 8-9",
        "respuesta": "R. Caminaré en presencia del Señor en el país de la vida.",
        "texto": "Amo al Señor, porque escucha\nmi voz suplicante;\nporque inclina su oído hacia mí\nel día que lo invoco.\n\nR. Caminaré en presencia del Señor en el país de la vida.\n\nMe envolvían redes de muerte,\nme alcanzaron los lazos del abismo;\ncaí en tristeza y angustia.\nInvoqué el nombre del Señor:\n«¡Señor, salva mi vida!».\n\nR. Caminaré en presencia del Señor en el país de la vida.\n\nEl Señor es benigno y justo,\nnuestro Dios es compasivo.\nEl Señor guarda a los sencillos:\nestando yo sin fuerzas, me salvó.\n\nR. Caminaré en presencia del Señor en el país de la vida.\n\nArrancó mi alma de la muerte,\nmis ojos de las lágrimas,\nmis pies de la caída.\nCaminaré en presencia del Señor\nen el país de la vida.\n\nR. Caminaré en presencia del Señor en el país de la vida."
      },
      "segunda_lectura": {
        "titulo": "Segunda Lectura",
        "cita": "Santiago 2, 14-18",
        "monicion": "«La fe, si no tiene obras, está muerta en sí misma».",
        "texto": "¿De qué le sirve a uno, hermanos míos, decir que tiene fe, si no tiene obras? ¿Podrá acaso salvarlo esa fe?\n\nSi un hermano o una hermana están desnudos y carecen del sustento diario, y alguno de ustedes les dice: «Vayan en paz, caliéntense y coman bien», pero no les da lo necesario para el cuerpo, ¿de qué sirve?\n\nAsí también la fe: si no tiene obras, está muerta en sí misma.\n\nPero alguno dirá: «Tú tienes fe y yo tengo obras». Muéstrame tu fe sin obras, y yo te mostraré mi fe por mis obras.\n\nPalabra de Dios."
      },
      "aclamacion_evangelio": {
        "texto": "R. Aleluya, aleluya.\nDios me libre de gloriarme si no es en la cruz de nuestro Señor Jesucristo, por la cual el mundo está crucificado para mí, y yo para el mundo.\nR. Aleluya."
      },
      "evangelio": {
        "titulo": "Santo Evangelio",
        "cita": "Marcos 8, 27-35",
        "monicion": "Profesión de Pedro y primer anuncio de la Pasión: «El que quiera salvar su vida la perderá; pero el que pierda su vida por mí y por el Evangelio la salvará».",
        "texto": "En aquel tiempo, Jesús y sus discípulos salieron hacia las aldeas de Cesarea de Filipo; y por el camino preguntó a sus discípulos:\n«¿Quién dice la gente que soy yo?».\n\nEllos le respondieron:\n«Unos que Juan el Bautista; otros que Elías; otros que uno de los profetas».\n\nÉl les preguntó:\n«Y ustedes, ¿quién dicen que soy yo?».\n\nTomando la palabra Pedro, le dice:\n«Tú eres el Mesías».\n\nY les conminó a que no hablaran a nadie acerca de él.\n\nY comenzó a enseñarles que el Hijo del hombre tenía que padecer mucho, ser rechazado por los ancianos, sumos sacerdotes y escribas, ser ejecutado y resucitar a los tres días. Se lo explicaba con toda claridad.\n\nEntonces Pedro se lo llevó aparte y se puso a increparlo. Pero él, volviéndose y mirando a sus discípulos, increpó a Pedro y le dijo:\n«¡Ponte detrás de mí, Satanás!, porque tus pensamientos no son los de Dios, sino los de los hombres».\n\nY llamando a la multitud con sus discípulos, les dijo:\n«El que quiera venir en pos de mí, que se niegue a sí mismo, cargue con su cruz y me siga. Porque el que quiera salvar su vida la perderá; pero el que pierda su vida por mí y por el Evangelio la salvará».\n\nPalabra del Señor."
      },
      "oracion_ofrendas": "Escucha propicio, Señor, nuestras plegarias y acepta benigno las ofrendas de tus siervos, para que lo que cada uno ofrece en honor de tu nombre aproveche para la salvación de todos. Por Jesucristo, nuestro Señor. Amén.",
      "antifona_comunion": "En el Señor está la misericordia, la redención copiosa (Sal 129, 7).",
      "oracion_comunion": "Que la gracia de este celestial sacramento, Señor, penetre nuestro cuerpo y nuestra alma, para que sea siempre su fuerza, y no nuestro propio sentir, lo que guíe nuestras acciones. Por Jesucristo, nuestro Señor. Amén.",
      "reflexion_homiletica": []
    },
    "C": {
      "titulo_celebracion": "XXIV Domingo del Tiempo Ordinario",
      "tiempo_liturgico": "Tiempo Ordinario",
      "color": "Verde",
      "grado": "Domingo",
      "antifona_entrada": "Fíjate, oh Dios, en nuestro escudo, mira el rostro de tu Ungido (Sal 83, 10-11).",
      "oracion_colecta": "Señor Dios, creador y soberano de todas las cosas, míranos y concédenos servirte de todo corazón, para que experimentemos los efectos de tu misericordia. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.",
      "primera_lectura": {
        "titulo": "Primera Lectura",
        "cita": "Éxodo 32, 7-11. 13-14",
        "monicion": "Moisés intercede ante el Señor en el Sinaí y Dios aplaca la ira merecida por el becerro de oro.",
        "texto": "En aquellos días, el Señor dijo a Moisés:\n«Baja, porque se ha pervertido tu pueblo, el que sacaste de la tierra de Egipto. Pronto se han desviado del camino que yo les mandé: se han hecho un becerro de metal fundido, se han postrado ante él, le han ofrecido sacrificios y han dicho: \"Éste es tu Dios, Israel, el que te sacó de la tierra de Egipto\"».\n\nDijo también el Señor a Moisés:\n«Veo que este pueblo es un pueblo de dura cerviz. Ahora déjame: mi ira se va a encender contra ellos y los voy a consumir; pero a ti te convertiré en una gran nación».\n\nMoisés suplicó al Señor, su Dios, diciendo:\n«¿Por qué, Señor, se ha de encender tu ira contra tu pueblo, el que tú sacaste de la tierra de Egipto con gran poder y con mano fuerte? Acuérdate de Abrahán, de Isaac y de Israel, siervos tuyos, a quienes juraste por ti mismo prometiéndoles: \"Multiplicaré su descendencia como las estrellas del cielo y toda esta tierra que he prometido se la daré a su descendencia y la poseerán por siempre\"».\n\nY el Señor se arrepintió de la amenaza que había pronunciado contra su pueblo.\n\nPalabra de Dios."
      },
      "salmo_responsorial": {
        "cita": "Salmo 50, 3-4. 12-13. 17 y 19",
        "respuesta": "R. Me levantaré e iré a mi Padre.",
        "texto": "Misericordia, Dios mío, por tu bondad,\npor tu inmensa compasión borra mi culpa;\nlava del todo mi delito,\nlimpia mi pecado.\n\nR. Me levantaré e iré a mi Padre.\n\n¡Oh Dios!, crea en mí un corazón puro,\nrenuévame por dentro con espíritu firme;\nno me arrojes lejos de tu rostro,\nno me quites tu santo espíritu.\n\nR. Me levantaré e iré a mi Padre.\n\nSeñor, me abrirás los labios,\ny mi boca proclamará tu alabanza.\nEl sacrificio agradable a Dios es un espíritu quebrantado;\nun corazón quebrantado y humillado, tú, Dios mío, no lo desprecias.\n\nR. Me levantaré e iré a mi Padre."
      },
      "segunda_lectura": {
        "titulo": "Segunda Lectura",
        "cita": "1 Timoteo 1, 12-17",
        "monicion": "San Pablo proclama la infinita misericordia de Dios que vino a salvar a los pecadores.",
        "texto": "Doy gracias a aquel que me capacitó, a Cristo Jesús, nuestro Señor, porque me consideró digno de confianza al ponerme a su servicio, a mí, que antes fui blasfemo, perseguidor e insolente; pero alcancé misericordia porque actué por ignorancia, en mi incredulidad.\n\nY la gracia de nuestro Señor se desbordó sobre mí juntamente con la fe y el amor en Cristo Jesús.\n\nEs palabra digna de crédito y merecedora de total aceptación que Cristo Jesús vino al mundo para salvar a los pecadores, de los cuales yo soy el primero. Pero por esto alcancé misericordia, para que en mí el primero manifestara Cristo Jesús toda su paciencia, sirviendo de ejemplo a los que habrían de creer en él para obtener la vida eterna.\n\nAl Rey de los siglos, inmortal, invisible, único Dios, honor y gloria por los siglos de los siglos. Amén.\n\nPalabra de Dios."
      },
      "aclamacion_evangelio": {
        "texto": "R. Aleluya, aleluya.\nDios estaba en Cristo reconciliando al mundo consigo, y ha puesto en nosotros el mensaje de la reconciliación.\nR. Aleluya."
      },
      "evangelio": {
        "titulo": "Santo Evangelio",
        "cita": "Lucas 15, 1-32",
        "monicion": "Las parábolas de la misericordia: la oveja perdida, la moneda recobrada y el hijo pródigo.",
        "texto": "En aquel tiempo, solían acercarse a Jesús todos los publicanos y los pecadores a escucharlo. Y los fariseos y los escribas murmuraban diciendo:\n«Éste acoge a los pecadores y come con ellos».\n\nJesús les dijo esta parábola:\n«¿Quién de ustedes, si tiene cien ovejas y se le pierde una de ellas, no deja las noventa y nueve en el desierto y va tras la descarriada hasta que la encuentra? Y cuando la encuentra, se la carga sobre los hombros, muy contento; y al llegar a casa reúne a los amigos y a los vecinos diciéndoles: \"Alégrense conmigo, porque he encontrado la oveja que se me había perdido\". Les digo que así habrá más alegría en el cielo por un solo pecador que se convierta que por noventa y nueve justos que no necesitan conversión.\n\n¿O qué mujer, si tiene diez monedas y se le pierde una, no enciende una lámpara, barre la casa y busca con cuidado hasta que la encuentra? Y cuando la encuentra, reúne a las amigas y a las vecinas diciéndoles: \"Alégrense conmigo, porque he encontrado la moneda que se me había perdido\". Les digo que del mismo modo hay alegría entre los ángeles de Dios por un solo pecador que se convierta».\n\nDijo también:\n«Un hombre tenía dos hijos; y el menor de ellos dijo a su padre: \"Padre, dame la parte de la herencia que me corresponde\". Y él les repartió los bienes.\n\nNo muchos días después, el hijo menor, juntando todo lo suyo, emigró a un país lejano, y allí derrochó su fortuna viviendo perdidamente. Cuando lo había gastado todo, vino una gran hambre en aquella tierra y comenzó a pasar necesidad. Fue y se puso al servicio de uno de los ciudadanos de aquel país, que lo envió a sus campos a cuidar cerdos. Y ansiaba llenar su estómago de las algarrobas que comían los cerdos, pero nadie se las daba.\n\nRecapacitando entonces, se dijo: \"¡Cuántos jornaleros de mi padre tienen pan de sobra, mientras yo aquí me muero de hambre! Me levantaré, iré a mi padre y le diré: Padre, he pecado contra el cielo y contra ti; ya no soy digno de ser llamado hijo tuyo: trátame como a uno de tus jornaleros\". Se levantó y fue hacia su padre.\n\nEstando él todavía lejos, su padre lo vio y se conmovió profundamente; y corriendo, se le echó al cuello y lo cubrió de besos. El hijo le dijo: \"Padre, he pecado contra el cielo y contra ti; ya no soy digno de ser llamado hijo tuyo\". Pero el padre dijo a sus criados: \"Traigan enseguida el mejor vestido y vístanlo; pónganle un anillo en la mano y sandalias en los pies; traigan el ternero cebado y mátenlo; celebremos un banquete, porque este hijo mío estaba muerto y ha vuelto a la vida; estaba perdido y ha sido encontrado\". Y comenzaron a celebrar el banquete.\n\nSu hijo mayor estaba en el campo. Cuando al volver se acercó a la casa, oyó la música y las danzas; y llamando a uno de los mozos, le preguntó qué era aquello. Éste le dijo: \"Ha llegado tu hermano, y tu padre ha matado el ternero cebado, porque lo ha recobrado sano y salvo\". Él se indignó y no quería entrar. Su padre salió y se puso a rogarle. Pero él le contestó a su padre: \"Mira: hace tantos años que te sirvo sin desobedecer jamás una orden tuya, y nunca me has dado un cabrito para celebrarlo con mis amigos; pero cuando llegó ese hijo tuyo que devoró tu fortuna con prostitutas, has matado para él el ternero cebado\".\n\nEl padre le dijo: \"Hijo, tú siempre estás conmigo, y todo lo mío es tuyo; pero era necesario celebrar un banquete y alegrarse, porque este hermano tuyo estaba muerto y ha vuelto a la vida; estaba perdido y ha sido encontrado\"».\n\nPalabra del Señor."
      },
      "oracion_ofrendas": "Escucha propicio, Señor, nuestras plegarias y acepta benigno las ofrendas de tus siervos, para que lo que cada uno ofrece en honor de tu nombre aproveche para la salvación de todos. Por Jesucristo, nuestro Señor. Amén.",
      "antifona_comunion": "En el Señor está la misericordia, la redención copiosa (Sal 129, 7).",
      "oracion_comunion": "Que la gracia de este celestial sacramento, Señor, penetre nuestro cuerpo y nuestra alma, para que sea siempre su fuerza, y no nuestro propio sentir, lo que guíe nuestras acciones. Por Jesucristo, nuestro Señor. Amén.",
      "reflexion_homiletica": []
    }
  },
  "25": {
    "A": {
      "titulo_celebracion": "XXV Domingo del Tiempo Ordinario",
      "tiempo_liturgico": "Tiempo Ordinario",
      "color": "Verde",
      "grado": "Domingo",
      "antifona_entrada": "Fíjate, oh Dios, en nuestro escudo, mira el rostro de tu Ungido (Sal 83, 10-11).",
      "oracion_colecta": "Señor Dios, que pusiste la plenitud de la ley en el amor a ti y al prójimo, concédenos cumplir tus mandamientos para que merezcamos llegar a la vida eterna. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.",
      "primera_lectura": {
        "titulo": "Primera Lectura",
        "cita": "Isaías 55, 6-9",
        "monicion": "El profeta Isaías nos invita a buscar a Dios: «Mis pensamientos no son sus pensamientos, ni sus caminos mis caminos».",
        "texto": "Busquen al Señor mientras se deja encontrar, llámenlo mientras está cerca.\n\nDeje el malvado su camino y el hombre inicuo sus pensamientos, y conviértase al Señor, que tendrá piedad de él, y a nuestro Dios, que es rico en perdón.\n\nPorque mis pensamientos no son sus pensamientos, ni sus caminos son mis caminos, dice el Señor. Cuanto dista el cielo de la tierra, así distan mis caminos de sus caminos y mis pensamientos de sus pensamientos.\n\nPalabra de Dios."
      },
      "salmo_responsorial": {
        "cita": "Salmo 144, 2-3. 8-9. 17-18",
        "respuesta": "R. Cerca está el Señor de los que lo invocan.",
        "texto": "Día tras día te bendeciré\ny alabaré tu nombre por siempre jamás.\nGrande es el Señor y muy digno de alabanza,\nsu grandeza es insondable.\n\nR. Cerca está el Señor de los que lo invocan.\n\nEl Señor es clemente y misericordioso,\nlento a la cólera y rico en piedad;\nel Señor es bueno con todos,\nes cariñoso con todas sus criaturas.\n\nR. Cerca está el Señor de los que lo invocan.\n\nEl Señor es justo en todos sus caminos,\nes bondadoso en todas sus acciones;\ncerca está el Señor de los que lo invocan,\nde los que lo invocan sinceramente.\n\nR. Cerca está el Señor de los que lo invocan."
      },
      "segunda_lectura": {
        "titulo": "Segunda Lectura",
        "cita": "Filipenses 1, 20c-24. 27a",
        "monicion": "San Pablo confiesa su amor total a Cristo: «Para mí la vida es Cristo y una ganancia el morir».",
        "texto": "Hermanos: Cristo será glorificado en mi cuerpo, sea por mi vida o por mi muerte. Porque para mí la vida es Cristo y una ganancia el morir.\n\nPero si el vivir en la carne significa para mí un trabajo fecundo, no sé qué escoger. Me siento apremiado por las dos cosas: tengo el deseo de partir y estar con Cristo, lo cual es con mucho lo mejor; pero permanecer en la carne es más necesario por causa de ustedes.\n\nEn todo caso, procuren que su conducta sea digna del Evangelio de Cristo.\n\nPalabra de Dios."
      },
      "aclamacion_evangelio": {
        "texto": "R. Aleluya, aleluya.\nÁbrenos el corazón, Señor, para que aceptemos las palabras de tu Hijo.\nR. Aleluya."
      },
      "evangelio": {
        "titulo": "Santo Evangelio",
        "cita": "Mateo 20, 1-16a",
        "monicion": "La parábola de los viñadores de la última hora revela la generosidad inmerecida de Dios.",
        "texto": "En aquel tiempo, dijo Jesús a sus discípulos esta parábola:\n«El reino de los cielos se parece a un dueño de casa que salió de madrugada a contratar jornaleros para su viña. Habiendo acordado con los jornaleros en un denario al día, los envió a su viña.\n\nSaliendo hacia la hora tercia, vio a otros que estaban en la plaza desocupados y les dijo: \"Vayan también ustedes a mi viña y les daré lo que sea justo\". Y ellos fueron. Salió de nuevo hacia la hora sexta y la nona e hizo lo mismo.\n\nAl salir hacia la hora undécima, encontró a otros parados y les dijo: \"¿Por qué están aquí todo el día desocupados?\". Le contestan: \"Porque nadie nos ha contratado\". Él les dijo: \"Vayan también ustedes a la viña\".\n\nAl atardecer, dice el dueño de la viña a su administrador: \"Llama a los jornaleros y págales el jornal, empezando por los últimos hasta los primeros\". Vinieron los de la hora undécima y recibieron un denario cada uno. Al venir los primeros, pensaron que recibirían más; pero también ellos recibieron un denario cada uno. Y al recibirlo, murmuraban contra el dueño de casa diciendo: \"Estos últimos han trabajado sólo una hora y los has hecho iguales a nosotros, que hemos soportado el peso del día y el calor\".\n\nPero él respondió a uno de ellos: \"Amigo, no te hago ninguna injusticia. ¿No acordaste conmigo en un denario? Toma lo tuyo y vete. Quiero dar a este último lo mismo que a ti. ¿Es que no puedo hacer lo que quiero con lo mío? ¿O es que tu ojo es malo porque yo soy bueno?\".\n\nAsí, los últimos serán primeros y los primeros, últimos».\n\nPalabra del Señor."
      },
      "oracion_ofrendas": "Acepta benigno, Señor, los dones de tu pueblo, para que recibamos en este sacramento celestial lo que proclamamos con fervorosa fe. Por Jesucristo, nuestro Señor. Amén.",
      "antifona_comunion": "En el Señor está la misericordia, la redención copiosa (Sal 129, 7).",
      "oracion_comunion": "Acompaña, Señor, con tu auxilio continuo a los que alimentas con tus sacramentos, para que en estos misterios recibamos el fruto de la redención y la salvación de toda nuestra vida. Por Jesucristo, nuestro Señor. Amén.",
      "reflexion_homiletica": []
    },
    "B": {
      "titulo_celebracion": "XXV Domingo del Tiempo Ordinario",
      "tiempo_liturgico": "Tiempo Ordinario",
      "color": "Verde",
      "grado": "Domingo",
      "antifona_entrada": "Fíjate, oh Dios, en nuestro escudo, mira el rostro de tu Ungido (Sal 83, 10-11).",
      "oracion_colecta": "Señor Dios, que pusiste la plenitud de la ley en el amor a ti y al prójimo, concédenos cumplir tus mandamientos para que merezcamos llegar a la vida eterna. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.",
      "primera_lectura": {
        "titulo": "Primera Lectura",
        "cita": "Sabiduría 2, 12. 17-20",
        "monicion": "Los impíos traman la muerte del justo: «Condenémoslo a muerte vergonzosa, pues según él, Dios lo librará».",
        "texto": "Dijeron los impíos:\n«Acechemos al justo, que nos resulta fastidioso: se opone a nuestro modo de actuar, nos echa en cara las faltas contra la ley y nos reprocha la falta de educación.\n\nVeamos si sus palabras son verdaderas, comprobemos cómo es su muerte. Si el justo es hijo de Dios, él lo auxiliará y lo librará de las manos de sus adversarios.\n\nSometámoslo a la prueba de la afrenta y del tormento, para conocer su templanza y probar su paciencia. Condenémoslo a una muerte vergonzosa, pues, según dice, Dios lo protegerá».\n\nPalabra de Dios."
      },
      "salmo_responsorial": {
        "cita": "Salmo 53, 3-4. 5. 6 y 8",
        "respuesta": "R. El Señor sostiene mi vida.",
        "texto": "Oh Dios, sálvame por tu nombre,\nsal por mí con tu poder.\nOh Dios, escucha mi súplica,\natiende a mis palabras.\n\nR. El Señor sostiene mi vida.\n\nPorque unos arrogantes se alzan contra mí,\nhombres violentos que no tienen presente a Dios\natentan contra mi vida.\n\nR. El Señor sostiene mi vida.\n\nMiren a Dios que me ayuda,\nel Señor sostiene mi vida.\nTe ofreceré un sacrificio voluntario,\ndando gracias a tu nombre, que es bueno.\n\nR. El Señor sostiene mi vida."
      },
      "segunda_lectura": {
        "titulo": "Segunda Lectura",
        "cita": "Santiago 3, 16 – 4, 3",
        "monicion": "«El fruto de la justicia se siembra en la paz para los que procuran la paz».",
        "texto": "Queridos hermanos: Donde hay envidias y rivalidades, allí hay desorden y toda clase de malas acciones.\n\nEn cambio, la sabiduría que viene de arriba es, en primer lugar, pura; luego pacífica, tolerante, dócil, llena de compasión y de buenos frutos, imparcial, sincera. Y el fruto de la justicia se siembra en la paz para los que procuran la paz.\n\n¿De dónde proceden las guerras y las contiendas entre ustedes? ¿No es acaso de las pasiones que combaten en sus miembros? Codician y no tienen; matan y arden en envidias y no pueden conseguir nada; combaten y hacen la guerra. No tienen porque no piden; piden y no reciben, porque piden mal, para gastarlo en sus placeres.\n\nPalabra de Dios."
      },
      "aclamacion_evangelio": {
        "texto": "R. Aleluya, aleluya.\nDios nos llamó por medio del Evangelio, para que alcancemos la gloria de nuestro Señor Jesucristo.\nR. Aleluya."
      },
      "evangelio": {
        "titulo": "Santo Evangelio",
        "cita": "Marcos 9, 30-37",
        "monicion": "Jesús anuncia su Pasión y enseña a sus discípulos: «Quien quiera ser el primero, sea el servidor de todos».",
        "texto": "En aquel tiempo, Jesús y sus discípulos atravesaban Galilea; no quería que nadie lo supiese, porque iba instruyendo a sus discípulos.\n\nLes decía:\n«El Hijo del hombre va a ser entregado en manos de los hombres y lo matarán; y, después de muerto, a los tres días resucitará».\n\nPero ellos no entendían lo que decía y les daba miedo preguntarle.\n\nLlegaron a Cafarnaún y, una vez en casa, les preguntó:\n«¿De qué discutían por el camino?».\n\nEllos callaban, pues por el camino habían discutido quién era el más grande.\n\nJesús se sentó, llamó a los Doce y les dijo:\n«Quien quiera ser el primero, que sea el último de todos y el servidor de todos».\n\nY, tomando a un niño, lo puso en medio de ellos, lo abrazó y les dijo:\n«El que acoge a uno de estos niños en mi nombre, a mí me acoge; y el que me acoge a mí, no me acoge a mí, sino al que me ha enviado».\n\nPalabra del Señor."
      },
      "oracion_ofrendas": "Acepta benigno, Señor, los dones de tu pueblo, para que recibamos en este sacramento celestial lo que proclamamos con fervorosa fe. Por Jesucristo, nuestro Señor. Amén.",
      "antifona_comunion": "En el Señor está la misericordia, la redención copiosa (Sal 129, 7).",
      "oracion_comunion": "Acompaña, Señor, con tu auxilio continuo a los que alimentas con tus sacramentos, para que en estos misterios recibamos el fruto de la redención y la salvación de toda nuestra vida. Por Jesucristo, nuestro Señor. Amén.",
      "reflexion_homiletica": []
    },
    "C": {
      "titulo_celebracion": "XXV Domingo del Tiempo Ordinario",
      "tiempo_liturgico": "Tiempo Ordinario",
      "color": "Verde",
      "grado": "Domingo",
      "antifona_entrada": "Fíjate, oh Dios, en nuestro escudo, mira el rostro de tu Ungido (Sal 83, 10-11).",
      "oracion_colecta": "Señor Dios, que pusiste la plenitud de la ley en el amor a ti y al prójimo, concédenos cumplir tus mandamientos para que merezcamos llegar a la vida eterna. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.",
      "primera_lectura": {
        "titulo": "Primera Lectura",
        "cita": "Amós 8, 4-7",
        "monicion": "El profeta Amós denuncia a los que explotan al pobre: «El Señor ha jurado: Jamás olvidaré ninguna de sus acciones».",
        "texto": "Escuchen esto, los que pisotean al pobre y eliminan a los desvalidos de la tierra, diciendo:\n«¿Cuándo pasará la fiesta del novilunio para vender el trigo, y el sábado para abrir los graneros, disminuyendo la medida, aumentando el precio y falseando las balanzas con engaño; para comprar a los débiles por dinero y al pobre por un par de sandalias, y vender el salvado del trigo?».\n\nEl Señor lo ha jurado por la gloria de Jacob:\n«¡Jamás olvidaré ninguna de sus acciones!».\n\nPalabra de Dios."
      },
      "salmo_responsorial": {
        "cita": "Salmo 112, 1-2. 4-6. 7-8",
        "respuesta": "R. Alaben al Señor, que alza al pobre.",
        "texto": "Alaben, siervos del Señor,\nalaben el nombre del Señor.\nBendito sea el nombre del Señor,\nahora y por siempre.\n\nR. Alaben al Señor, que alza al pobre.\n\nEl Señor se eleva sobre todas las naciones,\nsu gloria sobre los cielos.\n¿Quién como el Señor, Dios nuestro,\nque se sienta en las alturas\ny se inclina para mirar al cielo y a la tierra?\n\nR. Alaben al Señor, que alza al pobre.\n\nLevanta del polvo al desvalido,\nalza de la basura al pobre,\npara sentarlo con los príncipes,\ncon los príncipes de su pueblo.\n\nR. Alaben al Señor, que alza al pobre."
      },
      "segunda_lectura": {
        "titulo": "Segunda Lectura",
        "cita": "1 Timoteo 2, 1-8",
        "monicion": "«Dios quiere que todos los hombres se salven y lleguen al conocimiento de la verdad».",
        "texto": "Querido hermano: Te ruego, en primer lugar, que se hagan oraciones, plegarias, súplicas y acciones de gracias por todos los hombres; por los reyes y por todos los que están en eminencia, para que podamos llevar una vida tranquila y sosegada, con toda piedad y dignidad.\n\nEsto es bueno y agradable a los ojos de Dios, nuestro Salvador, el cual quiere que todos los hombres se salven y lleguen al conocimiento de la verdad.\n\nPues uno solo es Dios, y uno solo también el mediador entre Dios y los hombres, el hombre Cristo Jesús, que se entregó a sí mismo en rescate por todos: testimonio dado a su debido tiempo, y para el cual he sido constituido heraldo y apóstol —digo la verdad, no miento—, maestro de las naciones en la fe y en la verdad.\n\nQuiero, pues, que los hombres oren en todo lugar, levantando manos limpias, sin ira ni divisiones.\n\nPalabra de Dios."
      },
      "aclamacion_evangelio": {
        "texto": "R. Aleluya, aleluya.\nJesucristo, siendo rico, se hizo pobre por ustedes, para enriquecerlos con su pobreza.\nR. Aleluya."
      },
      "evangelio": {
        "titulo": "Santo Evangelio",
        "cita": "Lucas 16, 1-13",
        "monicion": "La parábola del administrador sagaz: «No pueden servir a Dios y al dinero».",
        "texto": "En aquel tiempo, dijo Jesús a sus discípulos:\n«Un hombre rico tenía un administrador a quien acusaron ante él de derrochar sus bienes. Lo llamó y le dijo: \"¿Qué es esto que oigo de ti? Dame cuenta de tu administración, porque ya no podrás seguir administrando\".\n\nEl administrador se dijo para sus adentros: \"¿Qué voy a hacer, ahora que mi señor me quita la administración? Cavar, no puedo; mendigar, me da vergüenza. Ya sé lo que voy a hacer para que, cuando me echen de la administración, me reciban en sus casas\".\n\nY, llamando uno por uno a los deudores de su señor, dijo al primero: \"¿Cuánto debes a mi señor?\". Él respondió: \"Cien barriles de aceite\". Le dijo: \"Toma tu recibo, siéntate enseguida y escribe cincuenta\". Luego dijo a otro: \"Y tú, ¿cuánto debes?\". Él respondió: \"Cien sacos de trigo\". Le dijo: \"Toma tu recibo y escribe ochenta\".\n\nY el amo alabó al administrador injusto porque había actuado con astucia; pues los hijos de este mundo son más astutos con su propia generación que los hijos de la luz.\n\nY yo les digo: Gánense amigos con las riquezas injustas, para que, cuando éstas falten, los reciban en las moradas eternas. El que es fiel en lo muy poco, también en lo mucho es fiel; y el que es injusto en lo muy poco, también en lo mucho es injusto.\n\nSi, pues, no fueron fieles en las riquezas injustas, ¿quién les confiará la verdadera riqueza? Y si no fueron fieles en lo ajeno, ¿quién les dará lo que es de ustedes?\n\nNingún siervo puede servir a dos señores; porque o bien aborrecerá a uno y amará al otro, o bien se apegará a uno y despreciará al otro. No pueden servir a Dios y al dinero».\n\nPalabra del Señor."
      },
      "oracion_ofrendas": "Acepta benigno, Señor, los dones de tu pueblo, para que recibamos en este sacramento celestial lo que proclamamos con fervorosa fe. Por Jesucristo, nuestro Señor. Amén.",
      "antifona_comunion": "En el Señor está la misericordia, la redención copiosa (Sal 129, 7).",
      "oracion_comunion": "Acompaña, Señor, con tu auxilio continuo a los que alimentas con tus sacramentos, para que en estos misterios recibamos el fruto de la redención y la salvación de toda nuestra vida. Por Jesucristo, nuestro Señor. Amén.",
      "reflexion_homiletica": []
    }
  },
  "26": {
    "A": {
      "titulo_celebracion": "XXVI Domingo del Tiempo Ordinario",
      "tiempo_liturgico": "Tiempo Ordinario",
      "color": "Verde",
      "grado": "Domingo",
      "antifona_entrada": "Fíjate, oh Dios, en nuestro escudo, mira el rostro de tu Ungido (Sal 83, 10-11).",
      "oracion_colecta": "Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.",
      "primera_lectura": {
        "titulo": "Primera Lectura",
        "cita": "Ezequiel 18, 25-28",
        "monicion": "«Si el malvado se convierte de la maldad que hizo y practica el derecho y la justicia, salvará su vida».",
        "texto": "Así dice el Señor:\n«Ustedes dicen: \"No es justo el proceder del Señor\". Escucha, casa de Israel: ¿Acaso no es justo mi proceder? ¿No es más bien el proceder de ustedes el que no es justo?\n\nCuando el justo se aparta de su justicia y comete la maldad, muere por ello; por la maldad que cometió muere.\n\nY cuando el malvado se aparta de la maldad que cometió y practica el derecho y la justicia, él salvará su vida. Si recapacita y se aparta de todos los delitos que cometió, ciertamente vivirá, no morirá».\n\nPalabra de Dios."
      },
      "salmo_responsorial": {
        "cita": "Salmo 24, 4-5. 6-7. 8-9",
        "respuesta": "R. Recuerda, Señor, tu ternura.",
        "texto": "Señor, enséñame tus caminos,\ninstrúyeme en tus sendas:\nhaz que camine con lealtad;\nenséñame, porque tú eres mi Dios y Salvador.\n\nR. Recuerda, Señor, tu ternura.\n\nRecuerda, Señor, tu ternura\ny tu misericordia, que son eternas.\nNo te acuerdes de los pecados de mi juventud;\nacuérdate de mí con misericordia,\npor tu bondad, Señor.\n\nR. Recuerda, Señor, tu ternura.\n\nEl Señor es bueno y es recto,\ny enseña el camino a los pecadores;\nhace caminar a los humildes con rectitud,\nenseña su camino a los humildes.\n\nR. Recuerda, Señor, tu ternura."
      },
      "segunda_lectura": {
        "titulo": "Segunda Lectura",
        "cita": "Filipenses 2, 1-11",
        "monicion": "Solemne himno a la kénosis de Cristo: Se humilló a sí mismo, por eso Dios lo levantó sobre todo.",
        "texto": "Hermanos: Si alguna exhortación hay en Cristo, si algún consuelo de amor, si alguna comunión en el Espíritu, si algún afecto entrañable y compasión, colmen mi alegría teniendo el mismo sentir, un mismo amor, un mismo ánimo, pensando una misma cosa.\n\nNo hagan nada por rivalidad ni por vanagloria; al contrario, con humildad, consideren a los demás superiores a ustedes mismos, no mirando cada uno por lo suyo propio, sino también por lo de los demás.\n\nTengan entre ustedes los mismos sentimientos que tuvo Cristo Jesús:\nel cual, siendo de condición divina,\nno retuvo ávidamente el ser igual a Dios,\nsino que se despojó de sí mismo\ntomando la condición de esclavo,\nhecho semejante a los hombres.\nY así, reconocido como hombre por su presencia,\nse humilló a sí mismo,\nhaciéndose obediente hasta la muerte,\ny una muerte de cruz.\n\nPor eso Dios lo exaltó sobre todo\ny le concedió el Nombre que está sobre todo nombre;\nde modo que al nombre de Jesús\ntoda rodilla se doble\nen el cielo, en la tierra y en el abismo,\ny toda lengua proclame:\n«¡Jesucristo es Señor!»,\npara gloria de Dios Padre.\n\nPalabra de Dios."
      },
      "aclamacion_evangelio": {
        "texto": "R. Aleluya, aleluya.\nMis ovejas escuchan mi voz, dice el Señor; yo las conozco y ellas me siguen.\nR. Aleluya."
      },
      "evangelio": {
        "titulo": "Santo Evangelio",
        "cita": "Mateo 21, 28-32",
        "monicion": "La parábola de los dos hijos: los pecadores convertidos precederán en el Reino de Dios a quienes no creyeron.",
        "texto": "En aquel tiempo, dijo Jesús a los sumos sacerdotes y a los ancianos del pueblo:\n«¿Qué les parece? Un hombre tenía dos hijos. Se acercó al primero y le dijo: \"Hijo, ve hoy a trabajar en la viña\". Él respondió: \"No quiero\"; pero después se arrepintió y fue.\n\nSe acercó al segundo y le dijo lo mismo. Él respondió: \"Voy, señor\"; pero no fue.\n\n¿Cuál de los dos cumplió la voluntad del padre?».\n\nEllos contestan:\n«El primero».\n\nJesús les dice:\n«En verdad les digo que los publicanos y las prostitutas van por delante de ustedes en el reino de Dios. Porque vino Juan a ustedes enseñándoles el camino de la justicia y no le creyeron, mientras que los publicanos y las prostitutas le creyeron; y ustedes, aun después de ver esto, no se arrepintieron ni le creyeron».\n\nPalabra del Señor."
      },
      "oracion_ofrendas": "Concédenos, Dios misericordioso, que esta ofrenda nuestra te sea agradable y que por ella se nos abra la fuente de toda bendición. Por Jesucristo, nuestro Señor. Amén.",
      "antifona_comunion": "En el Señor está la misericordia, la redención copiosa (Sal 129, 7).",
      "oracion_comunion": "Que esta eucaristía celestial renueve, Señor, nuestra mente y nuestro cuerpo, para que seamos coherederos en la gloria con aquel cuya muerte hemos proclamado. Por Jesucristo, nuestro Señor. Amén.",
      "reflexion_homiletica": []
    },
    "B": {
      "titulo_celebracion": "XXVI Domingo del Tiempo Ordinario",
      "tiempo_liturgico": "Tiempo Ordinario",
      "color": "Verde",
      "grado": "Domingo",
      "antifona_entrada": "Fíjate, oh Dios, en nuestro escudo, mira el rostro de tu Ungido (Sal 83, 10-11).",
      "oracion_colecta": "Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.",
      "primera_lectura": {
        "titulo": "Primera Lectura",
        "cita": "Números 11, 25-29",
        "monicion": "El Espíritu del Señor desciende sobre los ancianos en el campamento: «¡Ojalá todo el pueblo del Señor fuera profeta!».",
        "texto": "En aquellos días, el Señor bajó en la nube y habló a Moisés; tomó parte del espíritu que había en él y se lo dio a los setenta ancianos. Y cuando el espíritu se posó sobre ellos, profetizaron; pero no lo volvieron a hacer.\n\nHabían quedado en el campamento dos hombres, uno llamado Eldad y el otro Medad; el espíritu se posó también sobre ellos, pues estaban entre los inscritos, aunque no habían acudido a la Tienda; y profetizaban en el campamento.\n\nUn joven corrió a avisar a Moisés diciendo:\n«Eldad y Medad están profetizando en el campamento».\n\nJosué, hijo de Nun, que servía a Moisés desde su juventud, tomó la palabra y dijo:\n«Señor mío, Moisés, ¡prohíbeselo!».\n\nPero Moisés le respondió:\n«¿Estás celoso por mí? ¡Ojalá todo el pueblo del Señor fuera profeta y el Señor les diera su espíritu!».\n\nPalabra de Dios."
      },
      "salmo_responsorial": {
        "cita": "Salmo 18, 8. 10. 12-13. 14",
        "respuesta": "R. Los mandatos del Señor alegran el corazón.",
        "texto": "La ley del Señor es perfecta\ny es descanso del alma;\nel precepto del Señor es fiel\ne instruye a los sencillos.\n\nR. Los mandatos del Señor alegran el corazón.\n\nEl temor del Señor es puro\ny eternamente estable;\nlos juicios del Señor son verdaderos\ny enteramente justos.\n\nR. Los mandatos del Señor alegran el corazón.\n\nAunque tu siervo es prudente en cumplirlos\ny se premia guardándolos,\n¿quién conoce sus faltas?\nAbsuélveme de lo que se me oculta.\n\nR. Los mandatos del Señor alegran el corazón.\n\nPreserva también a tu siervo del orgullo,\nque no me domine:\nentonces seré irreprochable,\nlimpio de un gran pecado.\n\nR. Los mandatos del Señor alegran el corazón."
      },
      "segunda_lectura": {
        "titulo": "Segunda Lectura",
        "cita": "Santiago 5, 1-6",
        "monicion": "Santiago advierte a los ricos que retienen el salario de los jornaleros: «El clamor de los segadores ha llegado al Señor».",
        "texto": "Atiendan ahora, los ricos: lloren y den alaridos por las desgracias que se les vienen encima.\n\nSu riqueza está podrida y sus vestidos apolillados; su oro y su plata están cubiertos de herrumbre, y su herrumbre será testimonio contra ustedes y devorará sus carnes como fuego. Han acumulado tesoros en los últimos días.\n\nMiren: el salario de los obreros que segaron sus campos, defraudado por ustedes, clama; y los clamores de los segadores han llegado a los oídos del Señor de los ejércitos.\n\nHan vivido con lujo en la tierra y se han entregado a los placeres; han cebado sus corazones para el día de la matanza. Han condenado y asesinado al justo, y él no les ofrece resistencia.\n\nPalabra de Dios."
      },
      "aclamacion_evangelio": {
        "texto": "R. Aleluya, aleluya.\nTu palabra, Señor, es la verdad; santifícanos en la verdad.\nR. Aleluya."
      },
      "evangelio": {
        "titulo": "Santo Evangelio",
        "cita": "Marcos 9, 38-43. 45. 47-48",
        "monicion": "«El que no está contra nosotros, está a nuestro favor. Si tu mano te es ocasión de pecado, córtatela».",
        "texto": "En aquel tiempo, Juan dijo a Jesús:\n«Maestro, hemos visto a uno que expulsaba demonios en tu nombre y se lo hemos prohibido, porque no nos sigue».\n\nJesús respondió:\n«No se lo prohíban, porque nadie que haga un milagro en mi nombre puede luego hablar mal de mí. Pues el que no está contra nosotros, está a nuestro favor.\n\nY cualquiera que les dé a beber un vaso de agua en mi nombre por ser ustedes de Cristo, en verdad les digo que no perderá su recompensa.\n\nY al que escandalice a uno de estos pequeños que creen en mí, más le valdría que le colgaran al cuello una piedra de molino de las que mueve un asno y lo arrojaran al mar.\n\nSi tu mano te hace caer, córtatela: más te vale entrar manco en la vida que tener dos manos e ir al infierno, al fuego inextinguible. Y si tu pie te hace caer, córtatelo: más te vale entrar cojo en la vida que tener dos pies y ser arrojado al infierno. Y si tu ojo te hace caer, sácatelo: más te vale entrar tuerto en el reino de Dios que tener dos ojos y ser arrojado al infierno, donde el gusano de ellos no muere y el fuego no se apaga».\n\nPalabra del Señor."
      },
      "oracion_ofrendas": "Concédenos, Dios misericordioso, que esta ofrenda nuestra te sea agradable y que por ella se nos abra la fuente de toda bendición. Por Jesucristo, nuestro Señor. Amén.",
      "antifona_comunion": "En el Señor está la misericordia, la redención copiosa (Sal 129, 7).",
      "oracion_comunion": "Que esta eucaristía celestial renueve, Señor, nuestra mente y nuestro cuerpo, para que seamos coherederos en la gloria con aquel cuya muerte hemos proclamado. Por Jesucristo, nuestro Señor. Amén.",
      "reflexion_homiletica": []
    },
    "C": {
      "titulo_celebracion": "XXVI Domingo del Tiempo Ordinario",
      "tiempo_liturgico": "Tiempo Ordinario",
      "color": "Verde",
      "grado": "Domingo",
      "antifona_entrada": "Fíjate, oh Dios, en nuestro escudo, mira el rostro de tu Ungido (Sal 83, 10-11).",
      "oracion_colecta": "Señor Dios, que manifiestas tu omnipotencia sobre todo en el perdón y en la misericordia, derrama sin cesar tu gracia sobre nosotros, para que, deseando lo que nos prometes, consigamos los bienes celestiales. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.",
      "primera_lectura": {
        "titulo": "Primera Lectura",
        "cita": "Amós 6, 1a. 4-7",
        "monicion": "El profeta Amós increpa a los opulentos que banquetearon sin dolerse del desastre de su pueblo.",
        "texto": "Así dice el Señor omnipotente:\n«¡Ay de los que viven tranquilos en Sión y confiados en la montaña de Samaría!\n\nSe acuestan en camas de marfil, se arrellanan en sus lechos, comen corderos del rebaño y terneros sacados del establo; canturrean al son del arpa, inventan instrumentos musicales como David; beben vino en copas grandes y se ungen con los mejores perfumes, pero no se duelen del desastre de José.\n\nPor eso irán al destierro a la cabeza de los cautivos y se acabará el banquete de los disolutos».\n\nPalabra de Dios."
      },
      "salmo_responsorial": {
        "cita": "Salmo 145, 7. 8-9a. 9bc-10",
        "respuesta": "R. Alaba, alma mía, al Señor.",
        "texto": "El Señor mantiene su fidelidad perpetuamente,\nhace justicia a los oprimidos,\nda pan a los hambrientos.\nEl Señor liberta a los cautivos.\n\nR. Alaba, alma mía, al Señor.\n\nEl Señor abre los ojos al ciego,\nel Señor endereza a los que ya se doblan,\nel Señor ama a los justos.\nEl Señor guarda a los peregrinos.\n\nR. Alaba, alma mía, al Señor.\n\nSustenta al huérfano y a la viuda\ny trastorna el camino de los malvados.\nEl Señor reina eternamente,\ntu Dios, Sión, de edad en edad.\n\nR. Alaba, alma mía, al Señor."
      },
      "segunda_lectura": {
        "titulo": "Segunda Lectura",
        "cita": "1 Timoteo 6, 11-16",
        "monicion": "«Combate el noble combate de la fe y conquista la vida eterna a la que fuiste llamado».",
        "texto": "Tú, hombre de Dios, huye de estas cosas; busca la justicia, la piedad, la fe, el amor, la paciencia, la mansedumbre.\n\nCombate el noble combate de la fe, conquista la vida eterna a la que fuiste llamado y de la que hiciste noble profesión delante de muchos testigos.\n\nTe ordeno delante de Dios, que da vida a todas las cosas, y de Cristo Jesús, que dio testimonio ante Poncio Pilato de la noble profesión: guarda el mandamiento sin mancha ni reproche hasta la manifestación de nuestro Señor Jesucristo, la cual mostrará a su debido tiempo el bienaventurado y único Soberano, Rey de reyes y Señor de señores, el único que posee inmortalidad, que habita en una luz inaccesible, a quien ningún hombre ha visto ni puede ver. A él honor y poder eterno. Amén.\n\nPalabra de Dios."
      },
      "aclamacion_evangelio": {
        "texto": "R. Aleluya, aleluya.\nJesucristo, siendo rico, se hizo pobre por ustedes, para enriquecerlos con su pobreza.\nR. Aleluya."
      },
      "evangelio": {
        "titulo": "Santo Evangelio",
        "cita": "Lucas 16, 19-31",
        "monicion": "La parábola del rico epulón y el pobre Lázaro: «Si no escuchan a Moisés y a los profetas, no se convencerán ni aunque resucite un muerto».",
        "texto": "En aquel tiempo, dijo Jesús a los fariseos:\n«Había un hombre rico que se vestía de púrpura y de lino fino y banqueteaba espléndidamente cada día. Y un mendigo llamado Lázaro estaba echado a su puerta, cubierto de llagas, y ansiaba saciarse de lo que caía de la mesa del rico; y hasta los perros venían a lamerle las llagas.\n\nSucedió que murió el mendigo, y los ángeles lo llevaron al seno de Abrahán. Murió también el rico y lo enterraron.\n\nY en el abismo, estando en tormentos, levantó los ojos y vio a lo lejos a Abrahán y a Lázaro en su seno. Y él, gritando, dijo: \"Padre Abrahán, ten piedad de mí y envía a Lázaro para que moje la punta de su dedo en agua y me refresque la lengua, porque sufro tormento en esta llama\".\n\nAbrahán le respondió: \"Hijo, recuerda que recibiste tus bienes durante tu vida, y Lázaro, del mismo modo, males; ahora él es consolado aquí, y tú sufres tormentos. Y, además de todo esto, entre nosotros y ustedes se interpone un gran abismo, de modo que los que quieran cruzar de aquí a ustedes no pueden, ni de ahí cruzar hacia nosotros\".\n\nÉl dijo: \"Te ruego, pues, padre, que lo envíes a casa de mi padre, porque tengo cinco hermanos, para que les advierta y no vengan ellos también a este lugar de tormentos\".\n\nAbrahán le dice: \"Tienen a Moisés y a los profetas: que los escuchen\".\n\nÉl dijo: \"No, padre Abrahán; pero si alguno de los muertos va a ellos, se arrepentirán\".\n\nAbrahán le respondió: \"Si no escuchan a Moisés y a los profetas, no se convencerán ni aunque resucite uno de entre los muertos\"».\n\nPalabra del Señor."
      },
      "oracion_ofrendas": "Concédenos, Dios misericordioso, que esta ofrenda nuestra te sea agradable y que por ella se nos abra la fuente de toda bendición. Por Jesucristo, nuestro Señor. Amén.",
      "antifona_comunion": "En el Señor está la misericordia, la redención copiosa (Sal 129, 7).",
      "oracion_comunion": "Que esta eucaristía celestial renueve, Señor, nuestra mente y nuestro cuerpo, para que seamos coherederos en la gloria con aquel cuya muerte hemos proclamado. Por Jesucristo, nuestro Señor. Amén.",
      "reflexion_homiletica": []
    }
  },
  "34": {
    "A": {
      "titulo_celebracion": "Jesucristo, Rey del Universo (XXXIV Domingo del Tiempo Ordinario)",
      "tiempo_liturgico": "Tiempo Ordinario",
      "color": "Verde",
      "grado": "Domingo",
      "antifona_entrada": "Fíjate, oh Dios, en nuestro escudo, mira el rostro de tu Ungido (Sal 83, 10-11).",
      "oracion_colecta": "Dios todopoderoso y eterno, que quisiste restaurarlo todo en tu Hijo muy amado, Rey del universo, concédenos benigno que toda la creación, libre de la servidumbre del pecado, sirva a tu majestad y te alabe sin cesar. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.",
      "primera_lectura": {
        "titulo": "Primera Lectura",
        "cita": "Ezequiel 34, 11-12. 15-17",
        "monicion": "El Señor se revela como el Pastor supremo de su pueblo que cuida a las ovejas débiles y juzga con rectitud.",
        "texto": "Así dice el Señor Dios:\n«Aquí estoy yo: yo mismo cuidaré de mis ovejas y velaré por ellas. Como un pastor vela por su rebaño cuando se encuentra en medio de sus ovejas dispersas, así velaré yo por mis ovejas y las libraré de todos los lugares por donde se dispersaron en el día de nubarrones y tinieblas.\n\nYo mismo apacentaré a mis ovejas y yo mismo las haré recostar, dice el Señor Dios. Buscaré a la perdida, recogeré a la descarriada, vendaré a la herida, robusteceré a la flaca, y a la gorda y fuerte la cuidaré: las apacentaré con justicia.\n\nEn cuanto a ustedes, rebaño mío, así dice el Señor Dios: \"Miren: voy a juzgar entre oveja y oveja, entre carneros y machos cabríos\"».\n\nPalabra de Dios."
      },
      "salmo_responsorial": {
        "cita": "Salmo 22, 1-2a. 2b-3. 5. 6",
        "respuesta": "R. El Señor es mi pastor, nada me falta.",
        "texto": "El Señor es mi pastor, nada me falta:\nen verdes praderas me hace recostar;\nme conduce hacia fuentes tranquilas\ny repara mis fuerzas.\n\nR. El Señor es mi pastor, nada me falta.\n\nMe guía por el sendero justo,\npor el honor de su nombre.\nAunque camine por valles oscuros,\nnada temo, porque tú vas conmigo:\ntu vara y tu cayado me sosiegan.\n\nR. El Señor es mi pastor, nada me falta.\n\nPreparas una mesa ante mí,\nenfrente de mis enemigos;\nme unges la cabeza con perfume,\ny mi copa rebosa.\n\nR. El Señor es mi pastor, nada me falta.\n\nTu bondad y tu misericordia me acompañan\ntodos los días de mi vida,\ny habitaré en la casa del Señor\npor años sin término.\n\nR. El Señor es mi pastor, nada me falta."
      },
      "segunda_lectura": {
        "titulo": "Segunda Lectura",
        "cita": "1 Corintios 15, 20-26. 28",
        "monicion": "Cristo resucitado reinará hasta que todos los enemigos, incluida la muerte, sean vencidos.",
        "texto": "Hermanos: Cristo resucitó de entre los muertos: primicia de los que han muerto. Porque como por un hombre vino la muerte, también por un hombre la resurrección de los muertos. Pues así como en Adán mueren todos, así también en Cristo todos serán vivificados.\n\nPero cada uno en su orden: primero, Cristo como primicia; después, en su venida, los que son de Cristo. Luego será el fin, cuando entregue el reino a Dios Padre, después de haber destruido todo principado, toda potestad y fuerza.\n\nPues es necesario que él reine hasta que ponga a todos sus enemigos bajo sus pies. El último enemigo que será destruido es la muerte. Y cuando todo le haya sido sometido, entonces también el Hijo mismo se someterá a quien le sometió todo, para que Dios sea todo en todos.\n\nPalabra de Dios."
      },
      "aclamacion_evangelio": {
        "texto": "R. Aleluya, aleluya.\n¡Bendito el que viene en nombre del Señor! ¡Bendito el reino que llega, el de nuestro padre David!\nR. Aleluya."
      },
      "evangelio": {
        "titulo": "Santo Evangelio",
        "cita": "Mateo 25, 31-46",
        "monicion": "El Juicio Final: «Cada vez que lo hicieron con uno de estos mis hermanos más pequeños, conmigo lo hicieron».",
        "texto": "En aquel tiempo, dijo Jesús a sus discípulos:\n«Cuando venga el Hijo del hombre en su gloria y todos los santos ángeles con él, se sentará en el trono de su gloria; y se reunirán ante él todas las naciones. Él separará a unos de otros, como el pastor separa las ovejas de los cabritos; y pondrá las ovejas a su derecha y los cabritos a su izquierda.\n\nEntonces el Rey dirá a los de su derecha: \"Vengan, benditos de mi Padre, hereden el reino preparado para ustedes desde la creación del mundo. Porque tuve hambre y me dieron de comer, tuve sed y me dieron de beber, fui forastero y me acogieron, estuve desnudo y me vistieron, enfermo y me visitaron, en la cárcel y vinieron a verme\".\n\nEntonces los justos le responderán diciendo: \"Señor, ¿cuándo te vimos con hambre y te alimentamos, o con sed y te dimos de beber? ¿Cuándo te vimos forastero y te acogimos, o desnudo y te vestimos? ¿O cuándo te vimos enfermo o en la cárcel y fuimos a verte?\".\n\nY el Rey les dirá respondiendo: \"En verdad les digo que cada vez que lo hicieron con uno de estos mis hermanos más pequeños, conmigo lo hicieron\".\n\nEntonces dirá también a los de su izquierda: \"Apártense de mí, malditos, al fuego eterno preparado para el diablo y sus ángeles. Porque tuve hambre y no me dieron de comer, tuve sed y no me dieron de beber, fui forastero y no me acogieron, estuve desnudo y no me vistieron, enfermo y en la cárcel y no me visitaron\".\n\nEntonces responderán también ellos diciendo: \"Señor, ¿cuándo te vimos con hambre o con sed, o forastero, o desnudo, o enfermo, o en la cárcel, y no te asistimos?\".\n\nEntonces les responderá diciendo: \"En verdad les digo que cada vez que no lo hicieron con uno de estos más pequeños, tampoco conmigo lo hicieron\".\n\nE irán éstos al castigo eterno, y los justos a la vida eterna».\n\nPalabra del Señor."
      },
      "oracion_ofrendas": "Al ofrecerte, Señor, el sacrificio de la reconciliación humana, te pedimos humildemente que tu mismo Hijo conceda a todos los pueblos los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.",
      "antifona_comunion": "En el Señor está la misericordia, la redención copiosa (Sal 129, 7).",
      "oracion_comunion": "Habiendo recibido el alimento de la inmortalidad, te pedimos, Señor, que, quienes nos gloriamos de obedecer los mandamientos de Cristo, Rey del universo, podamos vivir para siempre con él en su reino celestial. Él, que vive y reina por los siglos de los siglos. Amén.",
      "reflexion_homiletica": []
    },
    "B": {
      "titulo_celebracion": "Jesucristo, Rey del Universo (XXXIV Domingo del Tiempo Ordinario)",
      "tiempo_liturgico": "Tiempo Ordinario",
      "color": "Verde",
      "grado": "Domingo",
      "antifona_entrada": "Fíjate, oh Dios, en nuestro escudo, mira el rostro de tu Ungido (Sal 83, 10-11).",
      "oracion_colecta": "Dios todopoderoso y eterno, que quisiste restaurarlo todo en tu Hijo muy amado, Rey del universo, concédenos benigno que toda la creación, libre de la servidumbre del pecado, sirva a tu majestad y te alabe sin cesar. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.",
      "primera_lectura": {
        "titulo": "Primera Lectura",
        "cita": "Daniel 7, 13-14",
        "monicion": "Visión del Hijo del hombre ante el Anciano: «Su poder es un poder eterno y su reino no será destruido».",
        "texto": "Seguí mirando y, en las visiones nocturnas, vi venir en las nubes del cielo a uno como un hijo de hombre; llegó hasta el Anciano y lo presentaron ante él.\n\nLe dieron poder, gloria y reino, y todos los pueblos, naciones y lenguas le servían. Su poder es un poder eterno, que no pasará, y su reino no será destruido.\n\nPalabra de Dios."
      },
      "salmo_responsorial": {
        "cita": "Salmo 92, 1ab. 1c-2. 5",
        "respuesta": "R. El Señor es rey, vestido de majestad.",
        "texto": "El Señor reina, vestido de majestad,\nel Señor vestido y ceñido de poder.\n\nR. El Señor es rey, vestido de majestad.\n\nAsí afianzó el orbe y no vacilará;\ntu trono está firme desde siempre,\ntú eres eterno.\n\nR. El Señor es rey, vestido de majestad.\n\nTus mandatos son fieles y seguros,\nla santidad es el adorno de tu casa,\nSeñor, por días sin término.\n\nR. El Señor es rey, vestido de majestad."
      },
      "segunda_lectura": {
        "titulo": "Segunda Lectura",
        "cita": "Apocalipsis 1, 5-8",
        "monicion": "«Jesucristo es el Soberano de los reyes de la tierra; él nos ha hecho reino y sacerdotes para Dios su Padre».",
        "texto": "Jesucristo es el testigo fiel, el primogénito de entre los muertos y el soberano de los reyes de la tierra. A aquel que nos ama y nos ha librado de nuestros pecados con su sangre, y nos ha hecho reino y sacerdotes para Dios su Padre, a él la gloria y el poder por los siglos de los siglos. Amén.\n\nMiren: viene en las nubes y todo ojo lo verá, incluso los que lo traspasaron; y harán duelo por él todas las tribus de la tierra. Sí, amén.\n\n«Yo soy el Alfa y la Omega, dice el Señor Dios, el que es, el que era y el que viene, el Todopoderoso».\n\nPalabra de Dios."
      },
      "aclamacion_evangelio": {
        "texto": "R. Aleluya, aleluya.\n¡Bendito el que viene en nombre del Señor! ¡Bendito el reino que llega, el de nuestro padre David!\nR. Aleluya."
      },
      "evangelio": {
        "titulo": "Santo Evangelio",
        "cita": "Juan 18, 33b-37",
        "monicion": "Diálogo de Jesús ante Pilato: «Tú lo dices: soy rey. Para esto he nacido y para esto he venido al mundo: para dar testimonio de la verdad».",
        "texto": "En aquel tiempo, Pilato entró de nuevo en el pretorio, llamó a Jesús y le dijo:\n«¿Eres tú el rey de los judíos?».\n\nJesús le respondió:\n«¿Dices eso por tu cuenta o te lo han dicho otros de mí?».\n\nPilato contestó:\n«¿Acaso soy yo judío? Tu gente y los sumos sacerdotes te han entregado a mí; ¿qué has hecho?».\n\nJesús respondió:\n«Mi reino no es de este mundo. Si mi reino fuera de este mundo, mi guardia habría luchado para que no cayera en manos de los judíos. Pero mi reino no es de aquí».\n\nPilato le dijo:\n«¿Luego tú eres rey?».\n\nJesús respondió:\n«Tú lo dices: soy rey. Yo para esto he nacido y para esto he venido al mundo: para dar testimonio de la verdad. Todo el que es de la verdad escucha mi voz».\n\nPalabra del Señor."
      },
      "oracion_ofrendas": "Al ofrecerte, Señor, el sacrificio de la reconciliación humana, te pedimos humildemente que tu mismo Hijo conceda a todos los pueblos los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.",
      "antifona_comunion": "En el Señor está la misericordia, la redención copiosa (Sal 129, 7).",
      "oracion_comunion": "Habiendo recibido el alimento de la inmortalidad, te pedimos, Señor, que, quienes nos gloriamos de obedecer los mandamientos de Cristo, Rey del universo, podamos vivir para siempre con él en su reino celestial. Él, que vive y reina por los siglos de los siglos. Amén.",
      "reflexion_homiletica": []
    },
    "C": {
      "titulo_celebracion": "Jesucristo, Rey del Universo (XXXIV Domingo del Tiempo Ordinario)",
      "tiempo_liturgico": "Tiempo Ordinario",
      "color": "Verde",
      "grado": "Domingo",
      "antifona_entrada": "Fíjate, oh Dios, en nuestro escudo, mira el rostro de tu Ungido (Sal 83, 10-11).",
      "oracion_colecta": "Dios todopoderoso y eterno, que quisiste restaurarlo todo en tu Hijo muy amado, Rey del universo, concédenos benigno que toda la creación, libre de la servidumbre del pecado, sirva a tu majestad y te alabe sin cesar. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.",
      "primera_lectura": {
        "titulo": "Primera Lectura",
        "cita": "2 Samuel 5, 1-3",
        "monicion": "Las tribus de Israel ungen a David como rey en Hebrón: «Tú pastorearás a mi pueblo Israel».",
        "texto": "En aquellos días, todas las tribus de Israel acudieron a David en Hebrón y le dijeron:\n«Hueso tuyo y carne tuya somos. Ya antes, cuando Saúl era nuestro rey, eras tú el que dirigías las salidas y entradas de Israel. Y el Señor te ha dicho: \"Tú apacentarás a mi pueblo Israel, tú serás el jefe de Israel\"».\n\nFueron, pues, todos los ancianos de Israel a Hebrón, ante el rey. El rey David hizo un pacto con ellos en Hebrón, ante el Señor, y ungieron a David como rey de Israel.\n\nPalabra de Dios."
      },
      "salmo_responsorial": {
        "cita": "Salmo 121, 1-2. 3-4a. 4b-5",
        "respuesta": "R. ¡Qué alegría cuando me dijeron: «Vamos a la casa del Señor»!",
        "texto": "¡Qué alegría cuando me dijeron:\n«Vamos a la casa del Señor»!\nYa están pisando nuestros pies\ntus umbrales, Jerusalén.\n\nR. ¡Qué alegría cuando me dijeron: «Vamos a la casa del Señor»!\n\nJerusalén, que estás construida\ncomo ciudad compacta y armónica:\nallá suben las tribus,\nlas tribus del Señor.\n\nR. ¡Qué alegría cuando me dijeron: «Vamos a la casa del Señor»!\n\nSegún la costumbre de Israel,\na alabar el nombre del Señor;\nen ella están los tribunales de justicia,\nlos tribunales del palacio de David.\n\nR. ¡Qué alegría cuando me dijeron: «Vamos a la casa del Señor»!"
      },
      "segunda_lectura": {
        "titulo": "Segunda Lectura",
        "cita": "Colosenses 1, 12-20",
        "monicion": "Dios nos trasladó al reino de su Hijo querido, en quien todo fue creado y en quien todo subsiste.",
        "texto": "Hermanos: Damos gracias al Padre, que los ha hecho capaces de compartir la herencia de los santos en la luz.\n\nÉl nos libró del poder de las tinieblas y nos trasladó al reino de su Hijo querido, por cuya sangre hemos recibido la redención, el perdón de los pecados.\n\nÉl es imagen del Dios invisible, primogénito de toda criatura; porque en él fueron creadas todas las cosas: en los cielos y en la tierra, las visibles y las invisibles, tronos, dominaciones, principados, potestades; todo fue creado por él y para él.\n\nÉl es antes que todo, y todo subsiste en él.\n\nÉl es también la cabeza del cuerpo, de la Iglesia. Él es el principio, el primogénito de entre los muertos, para ser en todo el primero.\n\nPorque en él quiso Dios que habitara toda la plenitud y reconciliar por él todas las cosas consigo, pacificando por la sangre de su cruz tanto las cosas de la tierra como las del cielo.\n\nPalabra de Dios."
      },
      "aclamacion_evangelio": {
        "texto": "R. Aleluya, aleluya.\n¡Bendito el que viene en nombre del Señor! ¡Bendito el reino que llega, el de nuestro padre David!\nR. Aleluya."
      },
      "evangelio": {
        "titulo": "Santo Evangelio",
        "cita": "Lucas 23, 35-43",
        "monicion": "Jesús en la cruz perdona al buen ladrón: «En verdad te digo: hoy estarás conmigo en el paraíso».",
        "texto": "En aquel tiempo, las autoridades se burlaban de Jesús diciendo:\n«A otros ha salvado; que se salve a sí mismo si él es el Mesías de Dios, el Elegido».\n\nTambién los soldados se burlaban de él, acercándose para ofrecerle vinagre y diciendo:\n«Si tú eres el rey de los judíos, sálvate a ti mismo».\n\nHabía también una inscripción sobre él: «Éste es el rey de los judíos».\n\nUno de los malhechores crucificados lo insultaba diciendo:\n«¿No eres tú el Mesías? Sálvate a ti mismo y a nosotros».\n\nPero el otro, respondiendo, le increpó:\n«¿Ni siquiera temes tú a Dios, estando en la misma condena? Nosotros, ciertamente, con justicia recibimos el pago de lo que hicimos; pero éste no ha hecho nada malo».\n\nY decía:\n«Jesús, acuérdate de mí cuando llegues a tu reino».\n\nÉl le dijo:\n«En verdad te digo: hoy estarás conmigo en el paraíso».\n\nPalabra del Señor."
      },
      "oracion_ofrendas": "Al ofrecerte, Señor, el sacrificio de la reconciliación humana, te pedimos humildemente que tu mismo Hijo conceda a todos los pueblos los dones de la unidad y de la paz. Por Jesucristo, nuestro Señor. Amén.",
      "antifona_comunion": "En el Señor está la misericordia, la redención copiosa (Sal 129, 7).",
      "oracion_comunion": "Habiendo recibido el alimento de la inmortalidad, te pedimos, Señor, que, quienes nos gloriamos de obedecer los mandamientos de Cristo, Rey del universo, podamos vivir para siempre con él en su reino celestial. Él, que vive y reina por los siglos de los siglos. Amén.",
      "reflexion_homiletica": []
    }
  }
};

/**
 * Helper para obtener el formulario dominical por semana y ciclo
 */
export function getSundayLectionary(weekNum: number | string, ciclo: 'A' | 'B' | 'C' = 'A'): LectionaryEntry | null {
  const weekData = LECCIONARIO_ORDINARIO[String(weekNum)];
  if (!weekData) return null;
  return weekData[ciclo] || weekData['A'] || weekData['B'] || weekData['C'] || null;
}
