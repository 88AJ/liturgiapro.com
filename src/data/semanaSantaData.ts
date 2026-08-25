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
  fechaSugerida: string;
  partesMisal: {
    id: string;
    nombre: string;
    secciones: HolyWeekSection[];
  }[];
  sacristia: {
    reglasOro: string[];
    vestiduras: string[];
    altarYCredencia: string[];
    elementosEspeciales: string[];
    checklists: HolyWeekRoleChecklist[];
  };
  cantoral: HolyWeekChant[];
  ministerios: {
    monaguillos: string[];
    mec: string[];
    lectores: string[];
    ujieres: string[];
  };
  subsidios?: {
    titulo: string;
    tipo: 'viacrucis' | 'horasanta' | 'sietepalabras' | 'retiro' | 'exsultet';
    contenido: string;
  }[];
}

export const SEMANA_SANTA_DATA: Record<string, HolyWeekDay> = {
  "ramos": {
    "id": "ramos",
    "titulo": "Domingo de Ramos en la Pasión del Señor",
    "subtitulo": "Conmemoración de la Entrada Triunfal del Señor en Jerusalén y Proclamación íntegra de la Pasión",
    "tiempo": "Semana Santa",
    "color": "Rojo",
    "colorHex": "#800020",
    "lema": "«¡Hosanna al Hijo de David! ¡Bendito el que viene en el nombre del Señor!»",
    "descripcion": "Abre la Semana Santa uniendo el triunfo mesiánico de Cristo en Jerusalén con el anuncio solemne de su Pasión y Muerte en la Cruz.",
    "fechaSugerida": "2026-03-29",
    "partesMisal": [
      {
        "id": "sec_1",
        "nombre": "I. Conmemoración de la Entrada del Señor en Jerusalén",
        "secciones": [
          {
            "tipo": "rubrica",
            "titulo": "Monición",
            "texto": "Hermanos, en este año nos alegramos de haber sido convocados por Dios como Asamblea (Ecclesia) para iniciar la Semana Santa, la razón de esto es recordar y manifestar que Cristo no sólo es nuestro salvador, sino también nuestro Dios y Señor. Nosotros también le aclamamos como lo hiciera Jerusalén hace poco más de 2,000 años. Sin embargo, nosotros queremos serle fiel y no darle la espalda como lo hiciera aquella muchedumbre que primero gritaba \"Hosanna al Hijo de David\" y pocos días después gritaran \"¡Crucifícalo!\"\n\n                Hoy queremos con estas palmas, que devotamente conservaremos, garantizar que le seguiremos hoy, mañana y hasta el último día de nuestras vidas. Hoy queremos manifestar que nuestro Dios está en medio de nosotros, que tiene una Asamblea de puertas abiertas y en salida que se enorgullece de pertenecerle y que luchará incansablemente hasta que este mundo se le rinda y le reconozca también como Salvador, como Dios y como Señor. Dispongámonos a participar fervorosamente.\n\n         El Coro inicia con una estrofa del canto inicial."
          },
          {
            "tipo": "rubrica",
            "titulo": "Antífona (Mt 21, 9)",
            "texto": "\"Hosanna al Hijo de David. Bendito el que viene en nombre del Señor, el Rey de Israel. Hosanna en el cielo.\"\n\n        El que preside saluda a la Asamblea de la manera acostumbrada y hace una breve exhortación.\n\n            Sacerdote: Queridos hermanos: Después de haber preparado nuestros corazones desde el principio de la Cuaresma con nuestra penitencia y nuestras obras de caridad, hoy nos reunimos para iniciar, unidos con toda la Iglesia, la celebración anual del Misterio Pascual, es decir, de la pasión y resurrección de nuestro Señor Jesucristo, misterios que empezaron con su entrada en Jerusalén, su ciudad. Por eso, recordando con toda fe y devoción esta entrada salvadora, sigamos al Señor para que participando de su cruz, tengamos parte con Él en su resurrección y su vida."
          },
          {
            "tipo": "rubrica",
            "titulo": "Bendición de los Ramos",
            "texto": "Sacerdote: Oremos: Dios todopoderoso y eterno, santifica con tu bendición + estos ramos, para que, quienes acompañamos jubilosos a Cristo Rey, podamos llegar, por Él, a la Jerusalén del cielo. Él que vive y reina por los siglos de los siglos.\n\n            R. Amén.\n\n        Turiferario y naveta se acercan al que preside para que prepare el incensario. Los ciriales se colocan a los lados del Ambón. Se usa incienso."
          },
          {
            "tipo": "lectura",
            "titulo": "Evangelio (Mateo 21, 1-11)",
            "texto": "Bendito el que viene en nombre del Señor.\n\n            Cuando se aproximaban ya a Jerusalén, al llegar a Betfagé, junto al monte de los Olivos, envió Jesús a dos de sus discípulos, diciéndoles: \"Vayan al pueblo que ven allí enfrente; al entrar, encontrarán amarrada una burra y un burrito con ella; desátenlos y tráiganmelos. Si alguien les pregunta algo, díganle que el Señor los necesita y enseguida los devolverá\".\n\n            Esto sucedió para que se cumplieran las palabras del profeta: Díganle a la hija de Sión: He aquí que tu rey viene a ti, apacible y montado en un burro, en un burrito, hijo de animal de yugo.\n\n            Fueron, pues, los discípulos e hicieron lo que Jesús les había encargado y trajeron consigo la burra y el burrito. Luego pusieron sobre ellos sus mantos y Jesús se sentó encima. La gente, muy numerosa, extendía sus mantos por el camino; algunos cortaban ramas de los árboles y las tendían a su paso. Los que iban delante de él y los que lo seguían gritaban: \"!Hosanna! ¡Viva el Hijo de David! ¡Bendito el que viene en nombre del Señor! ¡Hosanna en el cielo!\"\n\n            Al entrar Jesús en Jerusalén, toda la ciudad se conmovió. Unos decían: \"¿Quién es éste?\". Y la gente respondía: \"Este es el profeta Jesús, de Nazaret de Galilea\".\n\n            Palabra del Señor.\nR. Gloria a ti, Señor Jesús."
          },
          {
            "tipo": "rubrica",
            "titulo": "Procesión",
            "texto": "Sacerdote: Queridos hermanos: Imitando a la multitud que aclamaba al Señor, avancemos en paz.\n\n        Se inicia la procesión hacia la Nave. El que preside rocía con agua bendita los ramos.\n\n            Himno a Cristo Rey:\n\n            ¡Que viva mi Cristo, Que viva mi Rey, Que impere doquiera triunfante su ley! (2) ¡Viva Cristo Rey, viva Cristo Rey!\n\n            Mexicanos, un Padre tenemos que nos dio de la Patria la unión, a ese Padre gozosos cantemos empuñando con fe su pendón. Demos gracias al Padre que ha hecho que tengamos de herencia la luz y podamos vivir en el reino que su Hijo nos dio por la cruz. Dios le dio el poder, la victoria; pueblos todos, venid y alabad a este Rey de los cielos y tierra en quien sólo tenemos la paz. Rey eterno, Rey universal, en quien todo ya se restauró, te rogamos que todos los pueblos sean unidos en un solo amor.\n\n        El que preside, al llegar al Presbiterio, hace la debida reverencia al Altar y lo inciensa. Luego se dirige a la Sede y dice la Oración Colecta."
          },
          {
            "tipo": "sacerdote",
            "titulo": "Oración Colecta",
            "texto": "Dios todopoderoso y eterno, que quisiste que nuestro Salvador, se hiciera hombre y padeciera en la cruz, para dar al género humano ejemplo de humildad, concédenos benigno, seguir las enseñanzas de su pasión y que merezcamos participar de su gloriosa resurrección. Él que vive y reina contigo en la unidad del Espíritu Santo y es Dios, por los siglos de los siglos.\n\n            R. Amén."
          }
        ]
      },
      {
        "id": "sec_2",
        "nombre": "II. Liturgia de la Palabra",
        "secciones": [
          {
            "tipo": "lectura",
            "titulo": "Primera Lectura",
            "texto": "No aparté mi rostro de los insultos, y sé que no quedaré avergonzado.\n\n            Del libro del profeta Isaías (50, 4-7): El Señor me ha dado una lengua experta, para que pueda confortar al abatido con palabras de aliento. Mañana tras mañana, el Señor despierta mi oído, para que escuche yo, como discípulo. El Señor Dios me ha hecho oír sus palabras y yo no he opuesto resistencia ni me he echado para atrás. Ofrecí la espalda a los que me golpeaban, la mejilla a los que me tiraban de la barba. No aparté mi rostro de los insultos y salivazos. Pero el Señor me ayuda, por eso no quedaré confundido, por eso endureció mi rostro como roca y sé que no quedaré avergonzado.\n\n            Palabra de Dios.\nR. Te alabamos, Señor."
          },
          {
            "tipo": "lectura",
            "titulo": "Salmo Responsorial (Salmo 21)",
            "texto": "R. Dios mío, Dios mío, ¿por qué me has abandonado?\n\n            Todos los que me ven, de mí se burlan; me hacen gestos y dicen: \"Confiaba en el Señor, pues que él lo salve; si de veras lo ama, que lo libre\". R.\n\n            Los malvados me cercan por doquiera como rabiosos perros. Mis manos y mis pies han taladrado y se pueden contar todos mis huesos. R.\n\n            Reparten entre sí mis vestiduras y se juegan mi túnica a los dados. Señor, auxilio mío, ven y ayúdame, no te quedes de mí tan alejado. R.\n\n            Contaré tu fama a mis hermanos, en medio de la Asamblea te alabaré. Fieles del Señor, alábenlo; glorifícalo, linaje de Jacob; témelo, estirpe de Israel. R."
          },
          {
            "tipo": "rubrica",
            "titulo": "Segunda Lectura",
            "texto": "Cristo se humilló a sí mismo; por eso Dios lo exaltó.\n\n            De la carta del apóstol san Pablo a los filipenses (2, 6-11): Cristo, siendo Dios, no consideró que debía aferrarse a las prerrogativas de su condición divina, sino que, por el contrario, se anonadó a sí mismo, tomando la condición de siervo, y se hizo semejante a los hombres. Así, hecho uno de ellos, se humilló a sí mismo y por obediencia aceptó incluso la muerte, y una muerte de cruz. Por eso Dios lo exaltó sobre todas las cosas y le otorgó el nombre que está sobre todo nombre, para que, al nombre de Jesús, todos doblen la rodilla en el cielo, en la tierra y en los abismos, y todos reconozcan públicamente que Jesucristo es el Señor, para gloria de Dios Padre.\n\n            Palabra de Dios.\nR. Te alabamos, Señor.\n\n        No se lleva incienso. Dos lectores acompañarán al que preside para la lectura de la Pasión en el Ambón."
          },
          {
            "tipo": "lectura",
            "titulo": "Aclamación antes del Evangelio (Flp 2, 8-9)",
            "texto": "R. Honor y gloria a ti, Señor Jesús.\n\n            Cristo se humilló por nosotros y por obediencia aceptó incluso la muerte y una muerte de cruz. Por eso Dios lo exaltó sobre todas las cosas y le otorgó el nombre que está sobre todo nombre.\n\n            R. Honor y gloria a ti, Señor Jesús."
          }
        ]
      },
      {
        "id": "sec_3",
        "nombre": "Pasión de Nuestro Señor Jesucristo",
        "secciones": [
          {
            "tipo": "sacerdote",
            "texto": "Según San Mateo (26, 14-27, 66)\n\n        C. Cronista | S. Sinagoga / Asamblea | +. Jesús\n\n            C. En aquel tiempo, uno de los Doce, llamado Judas Iscariote, fue a ver a los sumos sacerdotes y les dijo:\n\n            S. \"¿Cuánto dan si les entrego a Jesús?\"\n\n            C. Ellos quedaron en darle treinta monedas de plata. Y desde ese momento andaba buscando una oportunidad para entregárselo. El primer día de la fiesta de los panes Ázimos, los discípulos se acercaron a Jesús y le preguntaron:\n\n            S. \"¿Dónde quieres que te preparemos la cena de Pascua?\"\n\n            C. Él respondió:\n\n            +. \"Vayan a la ciudad, a casa de fulano y díganle: El maestro dice: Mi hora está ya cerca. Voy a celebrar la Pascua con mis discípulos en tu casa\".\n\n            C. Ellos hicieron lo que Jesús les había ordenado y prepararon la cena de Pascua. Al atardecer, se sentó a la mesa de los Doce, y mientras cenaban, les dijo:\n\n            +. \"Yo les aseguro que uno de ustedes va a entregarme\".\n\n            C. Ellos se pusieron tristes y comenzaron a preguntarle uno por uno:\n\n            S. \"¿Acaso soy yo, Señor?\"\n\n            C. Él respondió:\n\n            +. \"El que moja su pan en el mismo plato que yo ése va a entregarme. Porque el Hijo del hombre va a morir, como está escrito de él; pero ¡ay de aquel por quien el Hijo del hombre va a ser entregado! Más le valiera a ese hombre no haber nacido\".\n\n            C. Entonces preguntó Judas, el que lo iba a entregar:\n\n            S. \"¿Acaso soy yo, Maestro?\"\n\n            C. Jesús le respondió:\n\n            +. \"Tú lo has dicho\".\n\n            C. Durante la cena, Jesús tomó pan y, pronunciando la bendición, lo partió y lo dio a sus discípulos, diciendo:\n\n            +. \"Tomen y coman. Éste es mi Cuerpo\".\n\n            C. Luego tomó en sus manos una copa de vino y, pronunciando la acción de gracias la pasó a sus discípulos, diciendo:\n\n            +. \"Beban todos de ella, porque ésta es mi sangre, sangre de la nueva alianza, que será derramada por todos, para el perdón de los pecados. Les digo que ya no beberé más del fruto de la vid, hasta el día en que beba con ustedes el vino en el Reino de mi Padre\".\n\n            C. Después de haber cantado el himno, salieron hacia el monte de los Olivos. Entonces Jesús les dijo:\n\n            +. \"Todos ustedes se van a escandalizar de mí esta noche, porque está escrito: Heriré al pastor y se dispersarán las ovejas del rebaño. Pero después de que yo resucite, iré delante de ustedes a Galilea\".\n\n            C. Pedro replicó:\n\n            S. \"Aunque todos se escandalicen de ti, yo nunca me escandalizaré\".\n\n            C. Jesús les dijo:\n\n            +. \"Yo te aseguro que esta misma noche antes de que el gallo cante, me habrás negado tres veces\".\n\n            C. Pedro le replicó:\n\n            S. \"Aunque tenga que morir contigo, no te negaré\".\n\n            C. Y lo mismo dijeron todos los discípulos. Entonces Jesús fue con ellos a un lugar llamado Getsemaní y dijo a los discípulos:\n\n            +. \"Quédense aquí mientras yo voy a orar más allá”.\n\n            C. Se llevó consigo a Pedro y a los dos hijos de Zebedeo y comenzó a sentir tristeza y angustia. Entonces les dijo:\n\n            +. \"Mi alma está llena de tristeza mortal. Quédense aquí y velen conmigo\".\n\n            C. Avanzó unos pasos más, se postró en tierra y comenzó a orar, diciendo:\n\n            +. \"Padre mío, si es posible que pase de mí este cáliz; pero que no se haga como yo quiero, sino como quieras tú\".\n\n            C. Volvió entonces a donde estaban los discípulos y los encontró dormidos. Dijo a Pedro:\n\n            +. \"¿No han podido velar conmigo ni una hora? Velen y oren, para no caer en la tentación, porque el espíritu está pronto pero la carne es débil\".\n\n            C. Y alejándose de nuevo, se puso a orar, diciendo:\n\n            +. \"Padre mío, si este cáliz no puede pasar sin que yo lo beba, hágase tu voluntad\".\n\n            C. Después volvió y encontró a sus discípulos otra vez dormidos, porque tenían los ojos cargados de sueño. Los dejó y se fue a orar de nuevo, por tercera vez, repitiendo las mismas palabras. Después de esto, volvió a donde estaban los discípulos y les dijo:\n\n            +. \"Duerman ya y descansen. He aquí que llega la hora y el Hijo del hombre va a ser entregado en manos de los pecadores. ¡Levántense! ¡Vamos! Ya está aquí el que me va a entregar\".\n\n            C. Todavía estaba hablando Jesús, cuando llegó Judas, uno de los Doce, seguido de una chusma numerosa con espadas y palos, enviada por los sumos sacerdotes y los ancianos del pueblo. El que lo iba a entregar había dado esta señal:\n\n            S. \"Aquel a quien yo le dé un beso, ese es. Aprehéndanlo\".\n\n            C. Al instante se acercó a Jesús y le dijo:\n\n            S. \"Buenas noches, Maestro\".\n\n            C. Y lo besó. Jesús le dijo:\n\n            +. \"Amigo, ¿es esto a lo que has venido?\".\n\n            C. Entonces se acercaron a Jesús, le echaron mano y lo apresaron. Uno de los que estaba con Jesús, sacó la espada, hirió a un criado del sumo sacerdote y le cortó una oreja. Le dijo Jesús:\n\n            +. \"Vuelve la espada a su lugar, pues quien usa la espada, a espada morirá. ¿No crees que si yo se lo pidiera a mi Padre, él pondría ahora mismo a mi disposición más de doce legiones de ángeles? Pero ¿cómo se cumplirían entonces las Escrituras, que dicen que así debe suceder?\".\n\n            C. Enseguida dijo Jesús a la chusma:\n\n            +. \"¿Han salido ustedes a apresarme como a un bandido, con espadas y palos? Todos los días yo enseñaba, sentado en el templo, y no me aprehendieron. Pero todo esto ha sucedido para que se cumplieran las predicciones de los profetas\".\n\n            C. Entonces todos los discípulos lo abandonaron y huyeron. Los que aprehendieron a Jesús lo llevaron a la casa del sumo sacerdote Caifás, donde los escribas y los ancianos estaban reunidos. Pedro lo fue siguiendo desde lejos hasta el palacio del sumo sacerdote. Entró y se sentó con los criados para ver en qué paraba aquello.\n\n            C. Los sumos sacerdotes y todo el sanedrín andaban buscando un falso testimonio contra Jesús, con ánimo de darle muerte; pero no lo encontraron. Aunque se presentaron muchos testigos falsos. Al fin llegaron dos que dijeron:\n\n            S. \"Éste dijo: Puedo derribar el templo de Dios y reconstruirlo en tres días\".\n\n            C. Entonces el sumo sacerdote se levantó y le dijo:\n\n            S. \"¿No respondes nada a lo que éstos atestiguan en contra tuya?\"\n\n            C. Como Jesús callaba, el sumo sacerdote le dijo:\n\n            S. \"Te conjuro por el Dios vivo a que nos digas si tú eres el Mesías, el Hijo de Dios\".\n\n            C. Jesús le respondió:\n\n            +. \"Tú lo has dicho. Además, yo les declaro que pronto verán al Hijo del hombre, sentado a la derecha de Dios, venir sobre las nubes del cielo\".\n\n            C. Entonces el sumo sacerdote rasgó sus vestiduras y exclamó:\n\n            S. \"!Ha blasfemado!, ¿Qué necesidad tenemos ya de testigos? Ustedes mismos han oído la blasfemia. ¿Qué les parece?\"\n\n            C. Ellos respondieron:\n\n            S. \"Es reo de muerte\".\n\n            C. Luego comenzaron a escupirle en la cara y a darle bofetadas. Otros lo golpeaban, diciendo:\n\n            S. \"Adivina quién es el que te ha pegado\".\n\n            C. Entretanto, Pedro estaba afuera, sentado en el patio, una criada se le acercó y le dijo:\n\n            S. \"Tú también estabas con Jesús, el galileo\".\n\n            C. Pero él lo negó ante todos, diciendo:\n\n            S. \"No sé de qué me estás hablando\".\n\n            C. Ya se iba hacia el zaguán, cuando lo vio otra criada y dijo a los que estaban ahí:\n\n            S. \"También ése andaba con Jesús, el nazareno”.\n\n            C. Él de nuevo lo negó con juramento:\n\n            S. \"No conozco a ese hombre\".\n\n            C. Poco después se acercaron a Pedro los que estaban ahí y le dijeron:\n\n            S. \"No cabe duda de que tú también eres uno de ellos, pues hasta tu modo de hablar te delata\".\n\n            C. Entonces él comenzó a echar maldiciones y a jurar que no conocía a aquel hombre. Y en aquel momento cantó el gallo. Entonces se acordó Pedro de que Jesús había dicho: Antes de que cante el gallo, me habrás negado tres veces. Y saliendo de ahí se soltó a llorar amargamente.\n\n            C. Llegada la mañana, todos los sumos sacerdotes y los ancianos del pueblo celebraron consejo contra Jesús para darle muerte. Después de atarlo, lo llevaron ante el procurador, Poncio Pilato, y se lo entregaron.\n\n            C. Entonces Judas, el que lo había entregado viendo que Jesús había sido condenado a muerte, devolvió arrepentido las treinta monedas de plata a los sumos sacerdotes y a los ancianos diciendo:\n\n            S. \"Pequé, entregando la sangre de un inocente\".\n\n            C. Ellos dijeron:\n\n            S. \"¿Y a nosotros qué nos importa? Allá tú\".\n\n            C. Entonces Judas arrojó las monedas de plata en el templo, se fue y se ahorcó. Los sumos sacerdotes tomaron las monedas de plata y dijeron:\n\n            S. \"No es lícito juntarlas con el dinero de las limosnas, porque son precio de sangre\".\n\n            C. Después de deliberar compraron con ellas el Campo del alfarero para sepultar ahí a los extranjeros. Por eso ese campo se llama hasta el día de hoy \"Campo de sangre\". Así se cumplió lo que dijo el profeta Jeremías: Tomaron las treinta monedas de plata en que fue tasado aquel a quien pusieron precio algunos hijos de Israel, y las dieron por el Campo del alfarero, según lo que me ordenó el Señor.\n\n                 Comienza la lectura breve\n\n            C. Jesús compareció ante el procurador, Poncio Pilato, quien le preguntó:\n\n            S. \"¿Eres tú el rey de los judíos?\"\n\n            C. Jesús respondió:\n\n            +. \"Tú lo has dicho\".\n\n            C. Pero nada respondió a las acusaciones que le hacían los sumos sacerdotes y los ancianos. Entonces le dijo Pilato:\n\n            S. \"¿No oyes todo lo que dicen contra ti?\"\n\n            C. Pero él nada respondió, hasta el punto que el procurador se quedó muy extrañado. Con ocasión de la fiesta de la Pascua, el procurador solía conceder a la multitud la libertad del preso que quisieran. Tenían entonces un preso famoso, llamado Barrabás. Dijo, pues, Pilato a los ahí reunidos:\n\n            S. \"¿A quién quieren que les deje en libertad: a Barrabás o a Jesús, que se dice el Mesías?\"\n\n            C. Pilato sabía que se lo habían entregado por envidia. Estando él sentado en el tribunal su mujer le mandó decirle:\n\n            S. \"No te metas con ese hombre justo, porque hoy he sufrido mucho en sueños por su causa\".\n\n            C. Mientras tanto, los sumos sacerdotes y los ancianos convencieron a la muchedumbre de que pidieran la libertad de Barrabás y la muerte de Jesús. Así, cuando el procurador les preguntó:\n\n            S. \"¿A cuál de los dos quieren que les suelte?\"\n\n            C. Ellos respondieron:\n\n            S. \"A Barrabás\".\n\n            C. Pilato les dijo:\n\n            S. \"¿Y qué voy a hacer con Jesús, que se dice el Mesías?\"\n\n            C. Respondieron todos:\n\n            S. \"Crucifícalo\".\n\n            C. Pilato preguntó:\n\n            S. \"Pero, ¿qué mal ha hecho?\"\n\n            C. Mas ellos seguían gritando cada vez con más fuerza:\n\n            S. \"Crucifícalo\".\n\n            C. Entonces Pilato, viendo que nada conseguía y que crecía el tumulto, pidió agua y se lavó las manos ante el pueblo, diciendo:\n\n            S. \"Yo no me hago responsable de la muerte de este hombre justo. Allá ustedes\".\n\n            C. Todo el pueblo respondió:\n\n            S. \"¡Que su sangre caiga sobre nosotros y sobre nuestros hijos!\".\n\n            C. Entonces Pilato puso en libertad a Barrabás. En cambio a Jesús lo hizo azotar y lo entregó para que lo crucificaran. Los soldados del procurador llevaron a Jesús al pretorio y reunieron alrededor de él a todo el batallón. Lo desnudaron, le echaron encima un manto de púrpura, trenzaron una corona de espinas y se la pusieron en la cabeza le pusieron una caña en su mano derecha y, arrodillándose ante él, se burlaban diciendo:\n\n            S. \"¡Viva el rey de los judíos!\".\n\n            C. Y le escupían. Luego, quitándole la caña, lo golpeaban con ella en la cabeza. Después de que se burlaron de él, le quitaron el manto, le pusieron sus ropas y lo llevaron a crucificar.\n\n            C. Al salir, encontraron a un hombre de Cirene, llamado Simón, y lo obligaron a llevar la cruz. Al llegar a un lugar llamado Gólgota, es decir, \"Lugar de la Calavera\", le dieron a beber a Jesús vino mezclado con hiel; él lo probó, pero no lo quiso beber. Los que lo crucificaron se repartieron sus vestidos, echando suertes, y se quedaron sentados ahí para custodiarlo. Sobre su cabeza pusieron por escrito la causa de su condena: \"Este es Jesús, el rey de los judíos\". Juntamente con él, crucificaron a dos ladrones uno a su derecha y el otro a su izquierda.\n\n            C. Los que pasaban por ahí lo insultaban moviendo la cabeza y gritándole:\n\n            S. \"Tú, que destruyes el templo y en tres días lo reedificas, sálvate a ti mismo; si eres el Hijo de Dios, baja de la cruz\".\n\n            C. También se burlaban de él los sumos sacerdotes, los escribas y los ancianos, diciendo:\n\n            S. \"Ha salvado a otros y no puede salvarse a sí mismo. Si es el rey de Israel, que baje de la cruz y creeremos en él. Ha puesto su confianza en Dios, que Dios lo salve ahora, si es que en verdad lo ama. Pues él ha dicho: 'Soy el Hijo de Dios'\".\n\n            C. Hasta los ladrones que estaban crucificados a su lado lo injuriaban. Desde el mediodía hasta las tres de la tarde, se oscureció toda aquella tierra. Y alrededor de las tres, Jesús exclamó con fuerte voz:\n\n            +. \"Elí, Elí ¿lemá sabactaní?\".\n\n            C. Que quiere decir, \"Dios mío, Dios mío, ¿Por qué me has abandonado?\". Algunos de los presentes, al oírlo, decían:\n\n            S. \"Está llamando a Elías\".\n\n            C. Enseguida uno de ellos fue corriendo a tomar una esponja, la empapó en vinagre y sujetándola a una caña, le ofreció de beber. Pero los otros le dijeron:\n\n            S. \"Déjalo vamos a ver si viene Elías a salvarlo\".\n\n            C. Entonces Jesús dando de nuevo un fuerte grito, expiró.\n\n                Aquí todos se arrodillan y guardan silencio por unos instantes.\n\n            C. Entonces el velo del templo se rasgó en dos partes, de arriba abajo, la tierra tembló y las rocas se partieron. Se abrieron los sepulcros y resucitaron muchos justos que habían muerto, y después de la resurrección de Jesús, entraron en la ciudad santa y se aparecieron a mucha gente. Por su parte, el oficial y los que estaban con él custodiando a Jesús, al ver el terremoto y las cosas que ocurrían, se llenaron de gran temor y dijeron:\n\n            S. \"Verdaderamente éste era Hijo de Dios\".\n\n                Fin de la lectura breve\n\n            C. Estaban también allí, mirando desde lejos, muchas de las mujeres que habían seguido a Jesús desde Galilea para servirlo. Entre ellas estaba María Magdalena, María, la madre de Santiago y de José y la madre de los hijos de Zebedeo.\n\n            C. Al atardecer, vino un hombre rico de Arimatea, llamado José, que se había hecho también discípulo de Jesús. Se presentó a Pilato y le pidió el cuerpo de Jesús, y Pilato dio orden de que se lo entregaran. José tomó el cuerpo, lo envolvió en una sábana limpia y lo depositó en un sepulcro nuevo, que había hecho excavar en la roca para sí mismo. Hizo rodar una gran piedra hasta la entrada del sepulcro y se retiró. Estaban ahí María Magdalena y la otra María sentadas frente al sepulcro.\n\n            C. Al otro día, el siguiente de la preparación de la Pascua, los sumos sacerdotes y los fariseos, se reunieron ante Pilato y le dijeron:\n\n            S. \"Señor, nos hemos acordado de que ese impostor, estando aún en vida, dijo: A los tres días resucitaré. Manda, pues, asegurar el sepulcro hasta el tercer día; no sea que vengan sus discípulos, lo roben y digan luego al pueblo: Resucitó de entre los muertos, porque esta última impostura sería peor que la primera\".\n\n            C. Pilato les dijo:\n\n            S. \"Tomen un pelotón de soldados, vayan y aseguren el sepulcro como ustedes quieran\".\n\n            C. Ellos fueron y aseguraron el sepulcro, poniendo un sello sobre la puerta y dejaron ahí la guardia.\n\n            Palabra del Señor.\nR. Gloria a ti, Señor Jesús."
          }
        ]
      },
      {
        "id": "sec_4",
        "nombre": "IV. Oración Universal de los Fieles",
        "secciones": [
          {
            "tipo": "rubrica",
            "texto": "Uno de los lectores se dirige al Ambón con una copia de la Oración Universal.\n\n            Sacerdote: Imploremos, hermanos, con fe y confianza a Jesús nuestro Sumo Sacerdote, que desde la cruz nos obtuvo la redención y digamos:\n\n            R. Jesús, Hijo de Dios vivo, ten piedad de nosotros.\n\n                Lector: Para que nos conceda ser misericordiosos como Él para poder disculpar a los hermanos que nos ofenden, aun cuando ellos no tengan la razón, oremos. R.\n\n                Lector: Para que respetemos la sangre que Jesús derramó por nosotros en la cruz y nos esforcemos por ser misericordiosos como Él con los que conviven con nosotros, oremos. R.\n\n                Lector: Para que apoyados en la infinita misericordia de nuestro Redentor nadie más experimente la soledad, la traición y la burla en su dolor, oremos. R.\n\n                Lector: Para que siguiendo el ejemplo de Cristo que abrió las puertas del cielo al ladrón arrepentido, nosotros salgamos al encuentro del necesitado, oremos. R.\n\n                Lector: Para que nuestra Iglesia que hoy reconoce a Cristo como a su Señor misericordioso, jamás le dé la espalda a los que viven momentos de dolor, oremos. R.\n\n                Lector: Para que valoremos la vida y la sabiduría de nuestros hermanos ancianos y más necesitados y salgamos misericordiosamente a su encuentro, oremos. R.\n\n                Lector: Para que seamos una Iglesia de puertas abiertas y en búsqueda de las ovejas perdidas, oremos. R.\n\n            Sacerdote: Señor Jesús, Dios y hombre verdadero enséñanos a cumplir con la voluntad del Padre, rico en misericordia, y ofrecer vida a los más necesitados para mantenernos dignamente en tu santo servicio. Tú que vives y reinas por los siglos de los siglos.\nR. Amén."
          }
        ]
      },
      {
        "id": "sec_5",
        "nombre": "V. Liturgia Eucarística y Rito de Conclusión",
        "secciones": [
          {
            "tipo": "sacerdote",
            "titulo": "Oración sobre las Ofrendas",
            "texto": "Que la pasión de tu Unigénito, Señor, nos atraiga tu perdón, y aunque no lo merecemos por nuestras obras, por la mediación de este sacrificio único, lo recibamos de tu misericordia en esta Credencia de salvación. Por Jesucristo, nuestro Señor.\nR. Amén."
          },
          {
            "tipo": "lectura",
            "titulo": "Prefacio de la pasión del Señor",
            "texto": "\"En verdad es justo y necesario, es nuestro deber y salvación darte gracias siempre y en todo lugar, Señor, Padre Santo, Dios todopoderoso y eterno, por Cristo nuestro Señor. El cual siendo inocente, se dignó padecer por los pecadores y fue injustamente condenado por salvar a los culpables; con su muerte borró nuestros delitos y, resucitando, conquistó nuestra justificación. Por eso, te alabamos con todos los ángeles y te aclamamos con voces de júbilo, diciendo: Santo, Santo, Santo...\""
          },
          {
            "tipo": "sacerdote",
            "titulo": "Rito de la Comunión",
            "texto": "Antífona de la Comunión (Mt 26, 42):\n\n            \"Padre mío, si no es posible evitar que yo beba de este cáliz, hágase tu voluntad.\""
          },
          {
            "tipo": "sacerdote",
            "titulo": "Rito de Conclusión",
            "texto": "Sacerdote: Dios y Padre nuestro, mira con bondad a esta familia tuya, por la cual nuestro Señor Jesucristo no dudó en entregarse a sus verdugos y padecer el tormento de la cruz. Por Jesucristo, nuestro Señor.\nR. Amén.\n\n            Sacerdote: La bendición de Dios todopoderoso, Padre, Hijo + y Espíritu Santo esté con todos ustedes y permanezca siempre.\nR. Amén.\n\n            Sacerdote: Nos podemos ir en paz a servir a Dios y a nuestros hermanos.\nR. Demos gracias a Dios.\n\n    Parroquia de San Pedro Apóstol | Monterrey, N.L., México | Camino hacia la Pascua 2026"
          }
        ]
      }
    ],
    "sacristia": {
      "reglasOro": [
        "Las vestiduras son de color ROJO para el celebrante, concelebrantes y diácono.",
        "Tener agua bendita con hisopo y acetre preparado en el atrio o lugar exterior de bendición.",
        "Tener preparados 3 micrófonos o atriles si la Pasión se lee a tres voces (Cronista, Pueblo, Cristo)."
      ],
      "vestiduras": [
        "Casulla roja y estola roja para el sacerdote celebrante.",
        "Capa pluvial roja (opcional pero muy recomendada para la procesión de entrada).",
        "Albas y cíngulos para acólitos y lectores."
      ],
      "altarYCredencia": [
        "Ramos de palma o laurel en la mesa de bendición.",
        "Misal Romano marcado en Domingo de Ramos y Leccionario de la Pasión.",
        "Cáliz con purificador, patena con hostia grande, copones con formas suficientes.",
        "Vinajeras con agua y vino, lavabo y manutergio."
      ],
      "elementosEspeciales": [
        "Acetre con agua bendita e hisopo.",
        "Incensario con carbón encendido y naveta con incienso para la procesión.",
        "Cruz alta engalanada con un ramo o velo rojo y ciriales para encabezar la procesión."
      ],
      "checklists": [
        {
          "momento": "Antes de la Misa (Preparación Atrio)",
          "items": [
            {
              "id": "ramos_mesa",
              "texto": "Mesa exterior con mantel y ramos listos para bendecir."
            },
            {
              "id": "ramos_agua",
              "texto": "Acetre y aspersorio con agua bendita en el punto de partida."
            },
            {
              "id": "ramos_incienso",
              "texto": "Carbón encendido listo en el incensario."
            },
            {
              "id": "ramos_pasion",
              "texto": "Libros de la Pasión colocados en los atriles de los tres lectores."
            }
          ]
        },
        {
          "momento": "Durante la Procesión",
          "items": [
            {
              "id": "ramos_cruz",
              "texto": "Cruz procesional al frente con ciriales a los lados."
            },
            {
              "id": "ramos_turif",
              "texto": "Turiferario precediendo al sacerdote."
            },
            {
              "id": "ramos_orden",
              "texto": "Ujieres guiando al pueblo hacia las naves del templo."
            }
          ]
        }
      ]
    },
    "cantoral": [
      {
        "momento": "Bendición y Procesión de Ramos",
        "titulo": "¡Hosanna al Hijo de David!",
        "tonalidad": "Re Mayor",
        "letra": "¡Hosanna al Hijo de David!\n¡Bendito el que viene en el nombre del Señor!\n¡El Rey de Israel!\n¡Hosanna, hosanna en el cielo!",
        "acordes": "D - A - G - D / G - D - A7 - D"
      },
      {
        "momento": "Procesión hacia el Altar",
        "titulo": "Los Niños Hebreos",
        "tonalidad": "Mi Menor",
        "letra": "Los niños hebreos, llevando ramos de olivo,\nsalieron al encuentro del Señor aclamando:\n¡Hosanna en el cielo! ¡Hosanna en las alturas!",
        "acordes": "Em - D - C - B7 / Em - Am - B7 - Em"
      },
      {
        "momento": "Comunión",
        "titulo": "Cuerpo de Cristo, Pan de Vida",
        "tonalidad": "Sol Mayor",
        "letra": "Tomad y comed, este es mi Cuerpo;\ntomad y bebed, esta es mi Sangre.\nHaced esto en memoria mía.",
        "acordes": "G - C - D - G / Em - C - D7 - G"
      }
    ],
    "ministerios": {
      "monaguillos": [
        "El incensario debe abrir la marcha de la procesión exterior.",
        "Dos acólitos con ciriales flanquean la Cruz procesional.",
        "Durante la lectura de la Pasión, los monaguillos permanecen sentados o de pie en reverente silencio; no se llevan ciriales ni incienso al ambón."
      ],
      "mec": [
        "Purificar los copones con sumo respeto tras la comunión multitudinaria.",
        "Distribuir con calma ante la alta afluencia de fieles con ramos."
      ],
      "lectores": [
        "Ensayar la lectura de la Pasión a tres voces previamente con el cronista y sacerdote.",
        "Respetar el momento solemne de ponerse de rodillas tras la muerte del Señor."
      ],
      "ujieres": [
        "Distribuir ramos a los fieles a la entrada del atrio.",
        "Cuidar el orden de acceso al templo al concluir la procesión.",
        "Hacer la colecta parroquial de forma ágil durante el ofertorio."
      ]
    }
  },
  "jueves": {
    "id": "jueves",
    "titulo": "Jueves Santo de la Cena del Señor",
    "subtitulo": "Misa Vespertina «In Coena Domini», Lavatorio de Pies, Plegaria Eucarística I y Traslado del Santísimo",
    "tiempo": "Triduo Pascual",
    "color": "Blanco",
    "colorHex": "#FFFFFF",
    "lema": "«Habiendo amado a los suyos que estaban en el mundo, los amó hasta el extremo» (Jn 13, 1)",
    "descripcion": "Inicia el Sacratísimo Triduo Pascual. Celebramos la institución de la Eucaristía, el Orden Sacerdotal y el mandamiento del amor fraterno.",
    "fechaSugerida": "2026-04-02",
    "partesMisal": [
      {
        "id": "sec_1",
        "nombre": "I. Ritos Iniciales",
        "secciones": [
          {
            "tipo": "canto",
            "titulo": "Antífona de Entrada (Gál 6, 14)",
            "texto": "\"Debemos gloriarnos en la cruz de nuestro Señor Jesucristo, porque en él esta nuestra salvación, nuestra vida y nuestra resurrección, y por él fuimos salvados y redimidos.\""
          },
          {
            "tipo": "sacerdote",
            "titulo": "Saludo",
            "texto": "Sacerdote: En el nombre del Padre, y del Hijo, y del Espíritu Santo.\n\n            R. Amén.\n\n            Sacerdote: La paz, la caridad y la fe, de parte de Dios Padre, y de Jesucristo, el Señor, estén con todos ustedes.\n\n            R. Y con tu espíritu."
          },
          {
            "tipo": "rubrica",
            "titulo": "Acto Penitencial",
            "texto": "Sacerdote: El Señor Jesús, que nos invita a la mesa de la Palabra y de la Eucaristía, nos llama ahora a la conversión. Reconozcamos, pues, que somos pecadores e invoquemos con esperanza la misericordia de Dios.\n\n            Sacerdote: Apiádate de nosotros, Señor.\n\n            R. Porque hemos pecado contra Ti.\n\n            Se hace un momento de silencio.\n\n            Sacerdote: Muéstranos, Señor tu misericordia.\n\n            R. Y danos tu Salvación.\n\n            Sacerdote: Dios, todopoderoso, tenga misericordia de nosotros perdone nuestros pecados y nos lleve a la vida eterna.\n\n            R. Amén.\n\n            Kyrie Eleison"
          },
          {
            "tipo": "canto",
            "titulo": "Gloria",
            "texto": "Gloria a Dios en el cielo...\n\n            Se tocan las campanas del templo y de la iglesia (a partir de este momento no se volverán a tocar hasta el Gloria de la Vigilia Pascual)."
          },
          {
            "tipo": "sacerdote",
            "titulo": "Oración Colecta",
            "texto": "Sacerdote: Oremos. Dios nuestro, reunidos para celebrar la santísima Cena en la que tu Hijo unigénito, antes de entregarse a la muerte, confió a la Iglesia el nuevo y eterno sacrificio, banquete pascual de su amor, concédenos que, de tan sublime misterio, brote para nosotros la plenitud del amor y de la vida. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios, por los siglos de los siglos.\n\n            R. Amén."
          }
        ]
      },
      {
        "id": "sec_2",
        "nombre": "II. Liturgia de la Palabra",
        "secciones": [
          {
            "tipo": "lectura",
            "titulo": "Primera Lectura",
            "texto": "Del libro del Éxodo (12, 1-8. 11-14)\n\n        Prescripciones sobre la cena pascual.\n\n            En aquellos días, el Señor les dijo a Moisés y a Aarón en tierra de Egipto: \"Este mes será para ustedes el primero de todos los meses y el principio del año. Díganle a toda la comunidad de Israel: 'El día diez de este mes, tomará cada uno un cordero por familia, uno por casa. Si la familia es demasiado pequeña para comérselo, que se junte con los vecinos y elija un cordero adecuado al número de personas y a la cantidad que cada cual pueda comer. Será un animal sin defecto, macho, de un año, cordero o cabrito.\n\n            Lo guardarán hasta el día catorce del mes, cuando toda la comunidad de los hijos de Israel lo inmolará al atardecer. Tomarán la sangre y rociarán las dos jambas y el dintel de la puerta de la casa donde vayan a comer el cordero. Esa noche comerán la carne, asada a fuego; comerán panes sin levadura y hierbas amargas.\n\n            Comerán así: con la cintura ceñida, las sandalias en los pies, un bastón en la mano y a toda prisa, porque es la Pascua, es decir, el paso del Señor. Yo pasaré esa noche por la tierra de Egipto y heriré a todos los primogénitos del país de Egipto, desde los hombres hasta los ganados. Castigaré a todos los dioses de Egipto, yo, el Señor.\n\n            La sangre les servirá de señal en las casas donde habitan ustedes. Cuando yo vea la sangre, pasaré de largo y no habrá entre ustedes plaga exterminadora, cuando hiera yo la tierra de Egipto. Ese día será para ustedes un memorial y lo celebrarán como fiesta en honor del Señor. De generación en generación celebrarán esta festividad, como institución perpetua\".\n\n            Palabra de Dios.\nR. Te alabamos, Señor."
          },
          {
            "tipo": "lectura",
            "titulo": "Salmo Responsorial",
            "texto": "Del salmo 115\n\n            R. Gracias, Señor, por tu sangre que nos lava.\n\n            ¿Cómo le pagaré al Señor todo el bien que me ha hecho? Levantaré el cáliz de salvación e invocaré el nombre del Señor. R.\n\n            A los ojos del Señor es muy penoso que mueran sus amigos. De la muerte, Señor, me has librado, a mí, tu esclavo e hijo de tu esclava. R.\n\n            Te ofreceré con gratitud un sacrificio e invocaré tu nombre. Cumpliré mis promesas al Señor ante todo su pueblo. R."
          },
          {
            "tipo": "lectura",
            "titulo": "Segunda Lectura",
            "texto": "De la primera carta del apóstol san Pablo a los corintios (11, 23-26)\n\n        Cada vez que ustedes comen de este pan y beben de este cáliz, proclaman la muerte del Señor.\n\n            Hermanos: Yo recibí del Señor lo mismo que les he trasmitido: que el Señor Jesús, la noche en que iba a ser entregado, tomó pan en sus manos, y pronunciando la acción de gracias, lo partió y dijo: \"Esto es mi cuerpo, que se entrega por ustedes. Hagan esto en memoria mía\".\n\n            Lo mismo hizo con el cáliz después de cenar, diciendo: \"Este cáliz es la nueva alianza que se sella con mi sangre. Hagan esto en memoria mía siempre que beban de él\".\n\n            Por eso, cada vez que ustedes comen de este pan y beben de este cáliz, proclaman la muerte del Señor, hasta que vuelva.\n\n            Palabra de Dios.\nR. Te alabamos, Señor."
          },
          {
            "tipo": "lectura",
            "titulo": "Aclamación antes del Evangelio",
            "texto": "Jn 13, 34\n\n            R. Honor y gloria a ti, Señor Jesús.\n\n            Les doy un mandamiento nuevo, dice el Señor, que se amen los unos a los otros, como yo los he amado.\n\n            R. Honor y gloria a ti, Señor Jesús."
          },
          {
            "tipo": "lectura",
            "titulo": "Evangelio",
            "texto": "Del santo Evangelio según san Juan (13, 1-15)\n\n        Los amó hasta el extremo.\n\n            Antes de la fiesta de la Pascua, sabiendo Jesús que había llegado la hora de pasar de este mundo al Padre y habiendo amado a los suyos, que estaban en el mundo, los amó hasta el extremo.\n\n            En el transcurso de la cena, cuando ya el diablo había puesto en el corazón de Judas Iscariote, hijo de Simón, la idea de entregarlo, Jesús, consciente de que el Padre había puesto en sus manos todas las cosas y sabiendo que había salido de Dios y a Dios volvía, se levantó de la mesa, se quitó el manto y tomando una toalla, se la ciñó; luego echó agua en una jofaina y se puso a lavarles los pies a los discípulos y a secárselos con la toalla que se había ceñido.\n\n            Cuando llegó a Simón Pedro, éste le dijo: \"Señor, ¿me vas a lavar tú a mí los pies?\" Jesús le replicó: \"Lo que estoy haciendo tú no lo entiendes ahora, pero lo comprenderás más tarde\". Pedro le dijo: \"Tú no me lavarás los pies jamás\". Jesús le contestó: \"Si no te lavo, no tendrás parte conmigo\".\n\n            Entonces le dijo Simón Pedro: \"En ese caso, Señor, no sólo los pies, sino también las manos y la cabeza\". Jesús le dijo: \"El que se ha bañado no necesita lavarse más que los pies, porque todo él está limpio. Y ustedes están limpios, aunque no todos\". Como sabía quién lo iba a entregar, por eso dijo: 'No todos están limpios'.\n\n            Cuando acabó de lavarles los pies, se puso otra vez el manto, volvió a la mesa y les dijo: \"¿Comprenden lo que acabo de hacer con ustedes? Ustedes me llaman Maestro y Señor, y dicen bien, porque lo soy. Pues si yo, que soy el Maestro y el Señor, les he lavado los pies, también ustedes deben lavarse los pies los unos a los otros. Les he dado ejemplo, para que lo que yo he hecho con ustedes, también ustedes lo hagan\".\n\n            Palabra del Señor.\nR. Gloria a ti, Señor Jesús."
          }
        ]
      },
      {
        "id": "sec_3",
        "nombre": "III. Homilía y Lavatorio de los Pies",
        "secciones": [
          {
            "tipo": "rubrica",
            "texto": "Después de la homilía, donde lo aconseje el bien pastoral, se lleva a cabo el lavatorio de los pies.\n\n        NO se dice Credo."
          }
        ]
      },
      {
        "id": "sec_4",
        "nombre": "IV. Oración Universal de los Fieles",
        "secciones": [
          {
            "tipo": "sacerdote",
            "texto": "Sacerdote: Oremos, hermanos a Dios nuestro Padre en este día en que celebramos la institución de la Eucaristía, del Sacerdocio y del mandamiento del amor y digámosle con fe:\n\n            R. Solo en Ti, confiamos y esperamos, Señor.\n\n            Lector: Porque queremos un mundo donde las palabras y las enseñanzas de Cristo sean el pilar de toda conducta, oremos. R.\n\n            Lector: Porque queremos celebrar la fe en la familia, oremos. R.\n\n            Lector: Porque queremos celebrar el amor con todos y vivir así el Evangelio como el Señor quiere, oremos. R.\n\n            Lector: Porque servir con amor y desinterés es la expresión más visible de que Dios está con nosotros, oremos. R.\n\n            Lector: Porque en la vivencia sincera de la humildad puede ser visible la grandeza del espíritu cristiano, oremos. R.\n\n            Lector: Porque deseamos vivir todos como la única y gran familia de Dios, oremos. R.\n\n            Lector: Porque queremos permanecer fieles al Señor y aún en medio de las dificultades alabarle y bendecirle por siempre, oremos. R.\n\n            Lector: Porque queremos ser una iglesia más amable y sensible al sufrimiento de los más pobres, enfermos y alejados, oremos. R.\n\n            Sacerdote: Padre, permítenos no poner resistencia a tu gracia para que podamos cumplir en todo con tu santa voluntad. Por el que tanto amas, tu Hijo Jesucristo que vive y reina contigo en la unidad del Espíritu Santo, por los siglos de los siglos.\nR. Amén."
          }
        ]
      },
      {
        "id": "sec_5",
        "nombre": "V. Liturgia Eucarística",
        "secciones": [
          {
            "tipo": "sacerdote",
            "titulo": "Oración sobre las Ofrendas",
            "texto": "Sacerdote: Concédenos, Señor, participar dignamente de estos misterios, porque cada vez que se celebra el memorial de este sacrificio, se realiza la obra de nuestra redención. Por Jesucristo, nuestro Señor.\nR. Amén."
          },
          {
            "tipo": "sacerdote",
            "titulo": "Prefacio: El sacrificio y el sacramento de Cristo",
            "texto": "V. El Señor esté con ustedes. R. Y con tu espíritu.\n\n            V. Levantemos el corazón. R. Lo tenemos levantado hacia el Señor.\n\n            V. Demos gracias al Señor, nuestro Dios. R. Es justo y necesario.\n\n            En verdad es justo y necesario, es nuestro deber y salvación darte gracias siempre y en todo lugar, Señor, Padre santo, Dios todopoderoso y eterno, por Cristo nuestro Señor.\n\n            El cual, verdadero y eterno Sacerdote, al instituir el sacrificio de la eterna alianza, se ofreció primero a ti como víctima salvadora, y nos mandó que lo ofreciéramos como memorial suyo. Cuando comemos su carne, inmolada por nosotros, quedamos fortalecidos; y cuando bebemos su Sangre, derramada por nosotros, quedamos limpios de nuestros pecados.\n\n            Por eso, con los ángeles y los arcángeles y con todos los coros celestiales, cantamos sin cesar el himno de tu gloria:\n\n            Santo, Santo, Santo..."
          },
          {
            "tipo": "rubrica",
            "titulo": "Plegaria Eucarística I (Canon Romano)",
            "texto": "CP: Padre misericordioso, te pedimos humildemente por Jesucristo, tu Hijo, nuestro Señor, que aceptes y bendigas estos + dones, este sacrificio santo y puro que te ofrecemos, ante todo, por tu Iglesia santa y católica, para que le concedas la paz, la protejas, la congregues en la unidad y la gobiernes en el mundo entero, con tu servidor el Papa Francisco, nuestro obispo Rogelio y todos los demás obispos que, fieles a la verdad, promueven la fe católica y apostólica.\n\n            C1: Acuérdate, Señor, de tus hijos (N.N.) y de todos los aquí reunidos, cuya fe y entrega bien conoces; por ellos y todos los suyos, por el perdón de sus pecados y la salvación que esperan, te ofrecemos, y ellos mismos te ofrecen, este sacrificio de alabanza, a ti, eterno Dios, vivo y verdadero.\n\n            C2: Reunidos en comunión con toda la Iglesia, para celebrar el día santo en que nuestro Señor Jesucristo fue entregado por nosotros, veneramos la memoria, ante todo, de la gloriosa siempre Virgen María, Madre de Jesucristo, nuestro Dios y Señor; la de su esposo, san José; la de los santos apóstoles y mártires Pedro y Pablo, Andrés, y la de todos los santos; por sus méritos y oraciones concédenos en todo tu protección.\n\n            CP: Acepta, Señor, en tu bondad, esta ofrenda de tus siervos y de toda tu familia santa, que te presentamos en el día mismo en que nuestro Señor Jesucristo encomendó a sus discípulos la celebración del sacramento de su Cuerpo y de su Sangre; ordena en tu paz nuestros días, líbranos de la condenación eterna y cuéntanos entre tus elegidos.\n\n            CC: Bendice y santifica, oh Padre, esta ofrenda, haciéndola perfecta, espiritual y digna de ti, de manera que se convierta para nosotros en el Cuerpo y la Sangre de tu Hijo amado, Jesucristo, nuestro Señor.\n\n            Junta las manos.\n\n            El cual, la víspera de su Pasión, tomó pan en sus santas y venerables manos, y, elevando los ojos al cielo, hacia ti, Dios, Padre suyo todopoderoso, dando gracias te bendijo, lo partió, y lo dio a sus discípulos, diciendo:\n\n            \"Tomen y coman todos de él, porque esto es mi Cuerpo, que será entregado por ustedes.\"\n\n            Del mismo modo, acabada la cena, tomó este cáliz glorioso en sus santas y venerables manos, dando gracias te bendijo, y lo dio a sus discípulos, diciendo:\n\n            \"Tomen y beban todos de él, porque éste es el cáliz de mi Sangre, Sangre de la alianza nueva y eterna, que será derramada por ustedes y por muchos para el perdón de los pecados. Hagan esto en conmemoración mía.\"\n\n            CP: Éste es el Sacramento de nuestra fe.\n\n            R. Anunciamos tu muerte, proclamamos tu resurrección. ¡Ven, Señor Jesús!\n\n            CC: Por eso, Padre, nosotros, tus siervos, y todo tu pueblo santo, al celebrar este memorial de la muerte gloriosa de Jesucristo, tu Hijo, nuestro Señor; de su santa resurrección del lugar de los muertos y de su admirable ascensión a los cielos, te ofrecemos, Dios de gloria y majestad, de los mismos bienes que nos has dado, el sacrificio puro, inmaculado y santo: pan de vida eterna y cáliz de eterna salvación.\n\n            Mira con ojos de bondad esta ofrenda y acéptala, como aceptaste los dones del justo Abel, el sacrificio de Abrahán, nuestro padre en la fe, y la oblación pura de tu sumo sacerdote Melquisedec.\n\n            Inclinado, con las manos juntas, prosigue:\n\n            Te pedimos humildemente, Dios todopoderoso, que esta ofrenda sea llevada a tu presencia, hasta el altar del cielo, por manos de tu ángel, para que cuantos recibimos el Cuerpo y la Sangre de tu Hijo al participar aquí de este altar\n\n            Se endereza y se signa, diciendo:\n\n            seamos colmados de gracia y bendición.\n\n            C3: Acuérdate también, Señor, de tus hijos miembros de esta comunidad que nos han precedido con el signo de la fe y duermen ya el sueño de la paz.\n\n            Junta las manos y ora unos momentos por los difuntos por quienes tiene intención de orar. Después, con las manos extendidas, prosigue:\n\n            A ellos, Señor, y a cuantos descansan en Cristo, concédeles el lugar del consuelo, de la luz y de la paz.\n\n            C4: Y a nosotros, pecadores, siervos tuyos, que confiamos en tu infinita misericordia, admítenos en la asamblea de los santos apóstoles y mártires Juan el Bautista, Esteban, Matías y Bernabé, y de todos los santos; y acéptanos en su compañía, no por nuestros méritos, sino conforme a tu bondad.\n\n            CP: Por Cristo, Señor nuestro, por quien sigues creando todos los bienes, los santificas, los llenas de vida, los bendices y los repartes entre nosotros.\n\n            Por Cristo, con él y en él, a ti, Dios Padre omnipotente, en la unidad del Espíritu Santo, todo honor y toda gloria por los siglos de los siglos.\n\n            R. Amén."
          },
          {
            "tipo": "rubrica",
            "titulo": "Rito de la Comunión",
            "texto": "Padre Nuestro\n\n            Llenos de la gracia por ser hijos de Dios, digamos confiadamente la oración que Cristo nos enseñó: Padre nuestro...\n\n            Embolismo\n\n            Líbranos de todos los males, Señor, y concédenos la paz en nuestros días, para que, ayudados por tu misericordia, vivamos siempre libres de pecado y protegidos de toda perturbación, mientras esperamos la gloriosa venida de nuestro Salvador Jesucristo.\n\n            R. Tuyo es el reino, tuyo el poder y la gloria, por siempre, Señor.\n\n            Rito de la Paz\n\n            Señor Jesucristo, que dijiste a tus apóstoles: \"La paz les dejo, mi paz les doy\", no tengas en cuenta nuestros pecados, sino la fe de tu Iglesia y, conforme a tu palabra, concédele la paz y la unidad. Tú que vives y reinas por los siglos de los siglos. R. Amén.\n\n            La paz del Señor esté siempre con ustedes. R. Y con tu espíritu.\n\n            En Cristo que nos ha hecho hermanos con su cruz, dense la paz como signo de reconciliación.\n\n            Fracción del Pan y Conmixtión\n\n            Depositando una fracción de la Hostia en el cáliz dice en secreto:\n\n            El Cuerpo y la Sangre de nuestro Señor Jesucristo, unidos en este cáliz, sean para nosotros alimento de vida eterna.\n\n            Cordero de Dios\n\n            Cordero de Dios, que quitas el pecado del mundo, ten piedad de nosotros.\n\n            Cordero de Dios, que quitas el pecado del mundo, ten piedad de nosotros.\n\n            Cordero de Dios, que quitas el pecado del mundo, danos la paz.\n\n            Mientras la Asamblea canta el Cordero de Dios, el que preside con las manos juntas y en secreto dice:\n\n            Señor Jesucristo, Hijo de Dios vivo, que por voluntad del Padre, cooperando el Espíritu Santo, diste con tu muerte la vida al mundo, líbrame, por la recepción de tu Cuerpo y de tu Sangre, de todas mis culpas y de todo mal. Concédeme cumplir siempre tus mandamientos y jamás permitas que me separe de ti.\n\n            El que preside hace genuflexión, toma el pan consagrado y, sosteniéndolo un poco elevado sobre la patena, lo muestra al pueblo, diciendo:\n\n            Éste es el Cordero de Dios, que quita el pecado del mundo. Dichosos los invitados a la cena del Señor.\n\n            R. Señor, no soy digno de que entres en mi casa, pero una palabra tuya bastará para sanarme.\n\n            Antífona de la Comunión (1 Cor 11, 24. 25)\n\n            Esto es mi Cuerpo, que se entrega por ustedes. Este cáliz es la nueva alianza establecida por mi Sangre; cuantas veces lo beban, háganlo en memoria mía, dice el Señor.\n\n            Después de distribuir la comunión, se deja sobre el altar un copón con hostias para la comunión del día siguiente, y se termina la misa con esta oración.\n\n            Oración después de la Comunión\n\n            Concédenos, Dios todopoderoso, que así como somos alimentados en esta vida con la Cena Pascual de tu Hijo, así también merezcamos ser saciados en el banquete eterno. Por Jesucristo, nuestro Señor.\nR. Amén."
          }
        ]
      },
      {
        "id": "sec_6",
        "nombre": "VII. Bendición de los Alimentos y el Pan",
        "secciones": [
          {
            "tipo": "sacerdote",
            "texto": "Señor, tú eres quien provee de alimento a todas las criaturas de la tierra, y que nos has hecho saber que siempre hay más felicidad en dar que en recibir.\n\n            Te pedimos, nos ayudes a imitarte y que nos mantengas con salud y gracia para que podamos compartir con nuestros hermanos, lo que sólo de tu generosidad recibimos.\n\n            Bendice, pues los alimentos que hoy tomamos, danos fuerzas para amarte y servirte. Por Cristo, tu Hijo, nuestro Señor. Amén."
          }
        ]
      },
      {
        "id": "sec_7",
        "nombre": "VIII. Traslado y Adoración ante el Santísimo Sacramento",
        "secciones": [
          {
            "tipo": "sacerdote",
            "texto": "Terminada la Misa, el sacerdote lleva en procesión el Santísimo Sacramento, mientras se entona un canto eucarístico, al sitio donde será guardado (Altar de Reposo).\n\n            Ya en ese lugar, después de algunos momentos de adoración al Santísimo Sacramento en silencio, el sacerdote se retira.\n\n            Todos los fieles estamos invitados a dedicar alguna parte de nuestro tiempo para adorar al Santísimo durante la noche."
          },
          {
            "tipo": "sacerdote",
            "titulo": "Guía para la Adoración Eucarística",
            "texto": "Oraciones Iniciales\n\n            Hacemos un acto de Fe.\n\n            Adoremos y demos gracias en cada instante y momento.\n\n            R. Al Santísimo y Divinísimo Sacramento.\n\n            Padre Nuestro, Ave María, Gloria al Padre, al Hijo...\n\n            Adoremos y demos gracias en cada instante y momento.\n\n            R. Al Santísimo y Divinísimo Sacramento.\n\n            Hacemos un acto de Esperanza.\n\n            Padre Nuestro, Ave María, Gloria al Padre, al Hijo...\n\n            Adoremos y demos gracias en cada instante y momento.\n\n            R. Al Santísimo y Divinísimo Sacramento.\n\n            Hacemos un acto de Caridad.\n\n            Padre Nuestro, Ave María, Gloria al Padre, al Hijo...\n\n        Lectura de la Palabra de Dios\n\n            Mi carne es verdadera comida y mi sangre es verdadera bebida.\n\n            Lectura del santo Evangelio según san Juan (6, 52-59)\n\n            En aquel tiempo, los judíos se pusieron a discutir entre sí: \"¿Cómo puede éste darnos a comer su carne?\"\n\n            Jesús les dijo: \"Yo les aseguro: Si no comen la carne del Hijo del hombre y no beben su sangre, no podrán tener vida en ustedes. El que come mi carne y bebe mi sangre, tiene vida eterna y yo lo resucitaré el último día. Mi carne es verdadera comida y mi sangre es verdadera bebida. El que come mi carne y bebe mi sangre, permanece en mí y yo en él. Como el Padre, que me ha enviado, posee la vida y yo vivo por él, así también el que me come vivirá por mí.\n\n            Este es el pan que ha bajado del cielo; no es como el maná que comieron sus padres, pues murieron. El que come de este pan vivirá para siempre\".\n\n            Esto lo dijo Jesús enseñando en la sinagoga de Cafarnaúm.\n\n            Palabra del Señor.\nR. Gloria a ti, Señor, Jesús.\n\n        Preces\n\n            Adoremos a nuestro Salvador, que en la última cena, la noche misma en que iba a ser entregado, confió a su Iglesia la celebración perenne del memorial de su muerte y resurrección; oremos, diciendo:\n\n            R. Que tu gracia nos ayude, Señor.\n\n            Para que incrementemos la comunicación y la unidad entre nosotros, oremos. R.\n\n            Para que unidos por un mismo Pan bajado del cielo, así nuestras realidades familiares y sociales suban a cielo, oremos. R.\n\n            Para que la vida en nosotros sea plena, sin fingimiento, oremos. R.\n\n            Para que nuestra vida comunique más vida a los demás, oremos. R.\n\n            Señor nuestro Jesucristo que en este admirable sacramento nos dejaste memorial de tu pasión, concédenos venerar de tal modo los sagrados misterios de tu cuerpo y de tu sangre, que experimentemos constantemente en nosotros el fruto de tu redención. Tú que vives y reinas con el Padre, en unidad con el Espíritu Santo por los siglos de los siglos. Amén.\n\n        Alabanzas de Desagravio\n\n            Bendito sea Dios.\n\n            Bendito sea su santo Nombre.\n\n            Bendito sea Jesucristo, Dios y hombre verdadero.\n\n            Bendito sea el Nombre de Jesús.\n\n            Bendito sea su Sacratísimo Corazón.\n\n            Bendita sea su Preciosísima Sangre.\n\n            Bendito sea Jesús en el Santísimo Sacramento del Altar.\n\n            Bendito sea el Espíritu Santo Paráclito.\n\n            Bendita sea la Excelsa Madre de Dios, María Santísima.\n\n            Bendita sea su Santa e Inmaculada Concepción.\n\n            Bendita su Gloriosa Asunción.\n\n            Bendito sea el nombre de María Virgen y Madre.\n\n            Bendito sea san José su castísimo Esposo.\n\n            Bendito sea Dios en sus Ángeles y en sus Santos.\n\n        Oración Final\n        Todos a una voz:\n\n            Señor mío Jesucristo, que por amor a los hombres estás noche y día en este sacramento, lleno de piedad y de amor, esperando, llamando y recibiendo a cuantos vienen a visitarte: creo que estás presente en el Sacramento del Altar.\n\n            Te adoro desde mi poquedad y te doy gracias por todos los dones que me has concedido, y especialmente por haberte dado Tú mismo en este Sacramento, por haberme concedido por abogada a tu amantísima madre y haberme llamado a visitarte en esta capilla.\n\n            Adoro tu santísimo Corazón por tres motivos: en acción de gracias por este insigne beneficio; para resarcirte de todas las injurias que sufres en este sacramento; y, finalmente, deseando adorarte con esta visita en todos los lugares de la tierra donde se te trate con menos culto y más abandono.\n\n            Me pesa el haber ofendido tantas veces a tu divina bondad en mi vida pasada. Propongo con gracia, no ofenderte más en adelante, y por miserable que sea me consagro enteramente a Ti, renuncio a tu voluntad y te la entrego por completo, con mis afectos, deseos y todas mis cosas.\n\n            De hoy en adelante haz de mí, Señor, todo lo que te agrade. Yo solamente quiero y te pido tu santo amor, la perseverancia final y el perfecto cumplimiento de tu santa voluntad.\n\n            Te encomiendo las almas del Purgatorio, especialmente las más devotas del Santísimo Sacramento y de María santísima. Te pido también por todos los pecadores.\n\n            Finalmente, amadísimo Salvador mío, uno todos mis afectos y deseos a los de tu corazón amorosísimo, y así unidos, los ofrezco a tu Eterno Padre y le suplico, en nombre tuyo, que, por tu amor, los acepte y escuche. Amén."
          }
        ]
      },
      {
        "id": "sec_8",
        "nombre": "IX. Visita de los Siete Templos",
        "secciones": [
          {
            "tipo": "sacerdote",
            "texto": "Oración Inicial\n\n            Nos persignamos: (+) Por la señal de la santa Cruz, de nuestros enemigos líbranos Señor, Dios nuestro, en el nombre del Padre y del Hijo y del Espíritu Santo. Amén.\n\n            Rezamos: Padre, al recordar las injusticias que padeció Jesús ante las autoridades civiles y religiosas, concédenos identificar a ese mismo Jesús en cada uno de nuestros hermanos que siguen padeciendo injusticias y danos el valor para proclamar su dignidad. Por Jesucristo nuestro Señor. Amén.\n\n                Visita al primer templo\n                “Del huerto de Getsemaní a la casa de Anás”\n\n                Leemos: \"... pasó Jesús con sus discípulos al otro lado del torrente Cedrón, donde había un huerto, en el que entraron él y sus discípulos... Entonces la cohorte, el tribuno y los guardias de los judíos prendieron a Jesús, le ataron y le llevaron primero a casa de Anás, pues era suegro de Caifás, el Sumo Sacerdote de aquel año.\" (Jn. 18, 1.12-13)\n\n                Rezamos: Padrenuestro... Dios te salve María....\n\n                Caminamos al segundo templo...\n\n                Visita al segundo templo\n                “De la casa de Anás a la casa de Caifás”\n\n                Leemos: \"Anás interrogó a Jesús sobre sus discípulos y su doctrina... Entonces le envió atado al Sumo sacerdote Caifás.\" (Jn. 18,19.24)\n\n                Rezamos: Padrenuestro... Dios te salve María...\n\n                Caminamos al tercer templo...\n\n                Visita al tercer templo\n                “De la casa de Caifás a Pilato”\n\n                Leemos: \"De la casa de Caifás llevan a Jesús al pretorio. Era de madrugada... Entonces Pilato entró al pretorio y llamó a Jesús y le dijo:..¿Luego tú eres Rey? Respondió Jesús: Sí, como dices, soy Rey...\" (Jn.18, 28.33.37)\n\n                Rezamos: Padrenuestro... Dios te salve María...\n\n                Caminamos al cuarto templo...\n\n                Visita al cuarto templo\n                “De Pilato a Herodes”\n\n                Leemos: \"Pilato dijo a los Sumos sacerdotes y a la gente: ningún delito encuentro en este Hombre. Pero ellos insistían diciendo: solivianta al pueblo, enseñando por toda Judea, desde Galilea, donde comenzó, hasta aquí. Al oír esto, Pilato preguntó si este hombre era galileo. Y, al saber que era de la jurisdicción de Herodes, le remitió a Herodes, que por aquellos días estaba también en Jerusalén.\" (Lc. 23,4-7)\n\n                Rezamos: Padrenuestro... Dios te salve María...\n\n                Caminamos al quinto templo...\n\n                Visita al quinto templo\n                “De Herodes a Pilato”\n\n                Leemos: \"Cuando Herodes vio a Jesús se alegró mucho, pues hacia largo tiempo que deseaba verle, por las cosas que oía de él, y esperaba presenciar alguna señal que él hiciera. Le preguntó con mucha palabrería, pero él no respondió nada. Estaban allí los sumos sacerdotes y los escribas acusándole con insistencia. Pero Herodes, con su guardia, después de despreciarle y burlarse de él, le puso un espléndido vestido y le remitió a Pilato.\" (Lc. 23,8-11)\n\n                Rezamos: Padrenuestro... Dios te salve María...\n\n                Caminamos al sexto templo...\n\n                Visita al sexto templo\n                “De Pilato al cadalso para ser condenado a muerte”\n\n                Leemos: \"Cada Fiesta Pilato les concedía la libertad de un preso, el que pidieran. Había uno, llamado Barrabás, que estaba encarcelado con aquellos sediciosos que en el motín habían cometido un asesinato. Subió la gente y se puso a pedir lo que les solía conceder... entonces, queriendo complacer a la gente les soltó a Barrabás y entregó a Jesús, después de azotarle, para que fuera crucificado.\" (Mc.15, 6-8.15)\n\n                Rezamos: Padrenuestro... Dios te salve María...\n\n                Caminamos al séptimo templo...\n\n                Visita al séptimo templo\n                “Del cadalso al Gólgota para ser crucificado”\n\n                Leemos: \"Los soldados llevaron a Jesús dentro del palacio, es decir, al pretorio y llaman a toda la cohorte. Le visten de púrpura y, trenzando una corona de espinas, se la ciñen. Y se pusieron a saludarle: ¡Salve, Rey de los judíos! y le golpeaban en la cabeza con una caña, le escupían y, doblando las rodillas se postraban ante él. Cuando se hubieron burlado de él, le quitaron la púrpura, le pusieron sus ropas y le sacan fuera para crucificarle... Le condujeron entonces al lugar del Gólgota, que quiere decir: Calvario.\" (Mc. 15,16-20)\n\n                Rezamos: Padrenuestro... Dios te salve María...\n\n        Oración Final\n\n            Dios nuestro, que haces resplandecer tu justicia en aquellos que acogen tu Palabra, ayúdanos a perseverar en el camino de salvación descubriendo a Jesús que se hace presente en cada uno de nuestros hermanos.\n\n            Por el mismo Jesucristo nuestro Señor. Amén."
          }
        ]
      },
      {
        "id": "sec_9",
        "nombre": "4. Oración por los Sacerdotes",
        "secciones": [
          {
            "tipo": "sacerdote",
            "texto": "Acudiendo al Monumento (Piedad Popular)\n\n            Mandamiento del amor + Sacerdocio + Eucaristía\n\n            Esta es una oración que puedes realizar en la noche de Jueves Santo por tus sacerdotes.\n\n                Amado Jesús, Señor mío y Dios mío. Yo [Tu Nombre] en esta noche en la cual conmemoramos el don de tu sacerdocio único y eterno, te pido por tus sacerdotes, a quienes has hecho partícipes de tu ministerio de salvación.\n\n                Recuerdo a quien me administró el sacramento del Bautismo, el padre [recuerda o busca su nombre].\n\n                Yo participo de su paternidad espiritual, sostenlo con tu gracia, permíteme vivir el don que se me regaló ese día: el ser tr mi Hermano mayor. Señor mío y Dios mío.\nPadre nuestro...\n\n                Recuerdo a quien me administró el sacramento de la Confirmación, el padre/el obispo [recuerda o busca su nombre].\n\n                Me ungió con aceite de suave perfume, sostenlo con tu gracia y concédele tu paz, permíteme vivir el don que se me regaló ese día: ser por mis acciones buen aroma de Cristo. Señor mío y Dios mío.\nPadre nuestro...\n\n                Recuerdo a quien me administró el sacramento de la Reconciliación, quien escuchó aquella primera confesión sacramental, el padre [recuerda o busca su nombre].\n\n                Yo recibí la absolución de mis fallas por medio de él, sostenlo con tu gracia y asísteme como a mí, permíteme vivir el don que se me regaló ese día: recorrer toda mi vida contigo. Señor mío y Dios mío.\nPadre nuestro...\n\n                Recuerdo a quien celebró la Misa, el sacramento de la Eucaristía, donde participé y por primera vez comulgué de tu Cuerpo y tu Sangre, el padre [recuerda o busca su nombre].\n\n                Yo te recibí a Ti en la Hostia consagrada por medio de sus manos, sostenlo con tu gracia y permite que se siga entregando en el servicio a los demás, permíteme vivir el don que se me regaló ese día: experimentarte tan cercano a mí y a mis hermanos. Señor mío y Dios mío.\nPadre nuestro...\n\n                Recuerdo a quien asistió el sacramento del Matrimonio (si aplica), quien fue testigo ante Dios de mi amor por alguien, el padre [recuerda o busca su nombre].\n\n                Yo recibí la bendición nupcial de él, sostenlo con tu gracia y muéstrale tu Amor como a mí, permíteme vivir el don que se me regaló ese día: saber que Tú amas tanto a tu Iglesia. Señor mío y Dios mío.\nPadre nuestro...\n\n                Señor, desconozco qué sacerdote escuchará mi última confesión sacramental...\n\n                Te pido por él hoy, permíteme ver tu misericordia en la absolución sacerdotal ese día, hazlo no desfallecer, tú lo conoces Señor. Tampoco conozco quien me administrará por última vez el sacramento de la Unción de los enfermos, te pido por él hoy, le agradezco desde hoy este gesto de piedad y caridad hacía mí. Por último, desconozco quien dará mi última comunión, te pido por ese sacerdote, no conozco su nombre ni su rostro, pero tú sí mi Señor, tú sí conoces a tus sacerdotes, sostenlo con tu gracia y concédele manifestar tu unción, y a mí, permíteme confiar encontrarte a Ti contigo Juez y Amigo, Señor mío y Dios mío.\nPadre nuestro..."
          },
          {
            "tipo": "sacerdote",
            "titulo": "Sagrado Corazón de Jesús, asiste a tus sacerdotes.",
            "texto": "Parroquia de San Pedro Apóstol | Camino hacia la Pascua"
          }
        ]
      }
    ],
    "sacristia": {
      "reglasOro": [
        "Dejar el Sagrario completamente ABIERTO y VACÍO antes de la Misa.",
        "Consagrar copones suficientes con hostias para la comunión de Jueves y Viernes Santo.",
        "Tener listo el lebrillo, jarra con agua tibia, jabón suave y 12 toallas limpias para el lavatorio.",
        "Desnudar el altar completamente (despojo) al terminar la Misa en reverente silencio."
      ],
      "vestiduras": [
        "Casulla blanca/dorada festiva para el celebrante.",
        "Velo humeral blanco para el traslado del Santísimo.",
        "Toalla para ceñirse el sacerdote durante el lavatorio."
      ],
      "altarYCredencia": [
        "Copón principal y copones auxiliares con formas suficientes.",
        "Cáliz con purificador y corporal.",
        "Lebrillo y jarra con agua tibia.",
        "12 toallas blancas limpias.",
        "Matraca de madera para suplir las campanas."
      ],
      "elementosEspeciales": [
        "Monumento o capilla de reserva bellamente adornada con flores y cirios para la adoración.",
        "Dos incensarios con carbón abundante para el traslado.",
        "Velo humeral blanco/dorado.",
        "Cirio o lámparas de adoración."
      ],
      "checklists": [
        {
          "momento": "Antes de la Misa Vespertina",
          "items": [
            {
              "id": "jueves_sagrario_vacio",
              "texto": "Verificar sagrario principal abierto y sin reserva."
            },
            {
              "id": "jueves_formas",
              "texto": "Calcular hostias para Jueves y Viernes Santo en los copones."
            },
            {
              "id": "jueves_lavatorio_kit",
              "texto": "Jarra con agua tibia, lebrillo y toallas colocadas junto a las sillas de los 12."
            },
            {
              "id": "jueves_monumento",
              "texto": "Monumento de reserva preparado con corporal, llave y cirios."
            }
          ]
        },
        {
          "momento": "Al terminar la Misa (Despojo del Altar)",
          "items": [
            {
              "id": "jueves_despojo",
              "texto": "Retirar manteles, velas y flores del altar principal."
            },
            {
              "id": "jueves_cruces",
              "texto": "Cubrir o retirar las cruces del templo si es costumbre."
            },
            {
              "id": "jueves_adoracion",
              "texto": "Iniciar los turnos de guardia y Hora Santa ante el Monumento."
            }
          ]
        }
      ]
    },
    "cantoral": [
      {
        "momento": "Gloria",
        "titulo": "Gloria a Dios en el Cielo (Festivo)",
        "tonalidad": "Sol Mayor",
        "letra": "Gloria a Dios en el cielo, y en la tierra paz a los hombres que ama el Señor...\n(Repique jubiloso de campanas)",
        "acordes": "G - D - Em - C / G - D7 - G"
      },
      {
        "momento": "Lavatorio de los Pies",
        "titulo": "Un Mandamiento Nuevo",
        "tonalidad": "Re Mayor",
        "letra": "Un mandamiento nuevo nos da el Señor:\nque nos amemos todos como Él nos amó.\nLa señal de los cristianos es amarnos como hermanos.",
        "acordes": "D - A7 - D / G - D - A7 - D"
      },
      {
        "momento": "Traslado del Santísimo",
        "titulo": "Pange Lingua / Cantemos al Amor de los Amores",
        "tonalidad": "Re Menor / Fa Mayor",
        "letra": "Cantemos al Amor de los amores, cantemos al Señor.\n¡Dios está aquí! Venid adoradores, adoremos a Cristo Redentor.\n¡Gloria a Cristo Jesús! Cielos y tierra, bendecid al Señor.",
        "acordes": "F - C - Dm - Bb / F - C7 - F"
      }
    ],
    "ministerios": {
      "monaguillos": [
        "Tocar campanillas vigorosamente durante el himno del Gloria.",
        "Acompañar con jarra y toallas al sacerdote durante el lavatorio.",
        "Dos turiferarios con incensarios encendidos marchan delante del Santísimo en el traslado."
      ],
      "mec": [
        "Apoyar en la comunión del pueblo bajo las dos especies si está prescrito.",
        "Acompañar en la adoración eucarística nocturna por turnos."
      ],
      "lectores": [
        "Proclamar el texto de la Institución con unción y claridad.",
        "Animar los salmos de adoración en el Monumento."
      ],
      "ujieres": [
        "Coordinar el paso de los fieles hacia el Monumento al finalizar la Misa.",
        "Guardar el silencio sagrado en el templo durante la noche de adoración."
      ]
    },
    "subsidios": [
      {
        "titulo": "Guion de la Hora Santa ante el Monumento",
        "tipo": "horasanta",
        "contenido": "I. CANTO DE ENTRADA: Altísimo Señor o Cantemos al Amor de los Amores.\n\nII. EXPOSICIÓN Y SILENCIO DE ADORACIÓN (10 min)\nSacerdote: «Alabado sea el Santísimo Sacramento del Altar»\nPueblo: «Sea por siempre bendito y alabado».\n\nIII. LECTURA DEL EVANGELIO DE GETSEMANÍ (Mt 26, 36-46):\n«Llegó Jesús con ellos a un huerto llamado Getsemaní y dijo: \"Quédense aquí y velen conmigo\". Y cayendo rostro en tierra suplicaba: \"Padre mío, si es posible, aparta de mí este cáliz; pero no se haga mi voluntad, sino la tuya\"».\n\nIV. MEDITACIÓN: La soledad de Jesús en el huerto, la agonía por los pecados de la humanidad y la llamada a consolar su Corazón Eucarístico.\n\nV. PRECES POR LOS SACERDOTES Y POR LA IGLESIA.\n\nVI. RESERVA EN SILENCIO (a medianoche concluye la adoración solemne y queda en intimidad)."
      }
    ]
  },
  "viernes": {
    "id": "viernes",
    "titulo": "Viernes Santo de la Pasión del Señor",
    "subtitulo": "Celebración Litúrgica de la Pasión, Proclamación íntegra de San Juan, 10 Oraciones Universales y Adoración de la Cruz",
    "tiempo": "Triduo Pascual",
    "color": "Rojo",
    "colorHex": "#800020",
    "lema": "«Mirarán al que traspasaron» (Jn 19, 37)",
    "descripcion": "Día de ayuno y abstinencia. La Iglesia no celebra la Eucaristía, sino la solemne acción litúrgica de la Pasión, la Adoración del Árbol de la Cruz y la Sagrada Comunión.",
    "fechaSugerida": "2026-04-03",
    "partesMisal": [
      {
        "id": "sec_1",
        "nombre": "1. Santo Viacrucis",
        "secciones": [
          {
            "tipo": "sacerdote",
            "texto": "10:00 AM | Toca para abrir"
          },
          {
            "tipo": "sacerdote",
            "titulo": "¡Toma tu cruz y sígueme!",
            "texto": "\"Si alguno quiere venir en pos de mí, niéguese a sí mismo, tome su cruz y sígame.\" (Mt 16, 24)"
          },
          {
            "tipo": "monicion",
            "titulo": "Monición y Oración Inicial",
            "texto": "Q: En el nombre del Padre, del Hijo y del Espíritu Santo.\nTodos: Amén.\n\n            Q: Padre providente, que enviaste tu Hijo eterno para salvar al mundo y escogiste hombres y mujeres para que, por Él, con Él y en Él, proclamasen la Buena Nueva a todas las naciones. Concede las gracias necesarias para que, en el rostro de todos tus discípulos, brille la alegría de ser, por la fuerza del Espíritu Santo, los constructores de la paz en la sociedad actual.\nTodos: Amén."
          },
          {
            "tipo": "sacerdote",
            "titulo": "1ª Estación: Jesús es condenado a muerte",
            "texto": "Un inocente fue condenado.\n\n                    Lector: Cada vez que he aceptado un pecado, por pequeño que sea, he gritado junto con ellos: \"¡Crucifíquenlo!\". Quiero que esté crucificado para pecar libremente. Me \"conviene\" condenarlo.\n\n                    Q: Te adoramos Cristo, y te bendecimos.\nTodos: que por tu Santa Cruz redimiste al mundo y a mí, pecador. Amén.\n\n                    Padre Nuestro... Ave María... Gloria...\n\n                    Q: Señor pequé. Ten piedad y misericordia de mí.\nTodos: Pecamos y nos pesa, ten misericordia de nosotros que por nosotros padeciste."
          },
          {
            "tipo": "sacerdote",
            "titulo": "2ª Estación: Jesús carga con la cruz",
            "texto": "Nuestro Señor asumió una cruz que no era suya.\n\n                    Lector: Señor, pocas han sido las veces que he aceptado las cruces que me mandas. Son muy pocas mis fuerzas y muy poca mi buena voluntad para aceptar los dolores, visicitudes, dificultades, cruces de mi vida diaria. ¡Ayúdame Jesús a sobrellevarlas, si no puede ser con alegría, al menos con mucha paciencia!\n\n                    Q: Te adoramos Cristo, y te bendecimos.\nTodos: que por tu Santa Cruz redimiste al mundo y a mí, pecador. Amén.\n\n                    Padre Nuestro... Ave María... Gloria...\n\n                    Q: Señor pequé. Ten piedad y misericordia de mí.\nTodos: Pecamos y nos pesa, ten misericordia de nosotros que por nosotros padeciste."
          },
          {
            "tipo": "sacerdote",
            "titulo": "3ª Estación: Jesús cae por primera vez",
            "texto": "La cruz se hacía cada vez más pesada.\n\n                    Lector: En esta estación te pedimos Señor, por todos los niños y los adolescentes. Ayúdanos a los adultos a enseñarles a vivir plenamente y combatir el mal. Perdona también nuestras faltas cometidas en la niñez y la adolescencia.\n\n                    Q: Te adoramos Cristo, y te bendecimos.\nTodos: que por tu Santa Cruz redimiste al mundo y a mí, pecador. Amén.\n\n                    Padre Nuestro... Ave María... Gloria...\n\n                    Q: Señor pequé. Ten piedad y misericordia de mí.\nTodos: Pecamos y nos pesa, ten misericordia de nosotros que por nosotros padeciste."
          },
          {
            "tipo": "sacerdote",
            "titulo": "4ª Estación: Jesús encuentra a su madre afligida",
            "texto": "¡Dolor del Hijo, dolor de la madre!\n\n                    Lector: Dios, todopoderoso, mira a tu humilde esclava María Santísima y en ella contempla a todas las madres del mundo que rezan por sus hijos. Mira a tu Divino Hijo y escucha en Él los ruegos de todos los hijos por los problemas que viven sus padres.\n\n                    Q: Te adoramos Cristo, y te bendecimos.\nTodos: que por tu Santa Cruz redimiste al mundo y a mí, pecador. Amén.\n\n                    Padre Nuestro... Ave María... Gloria...\n\n                    Q: Señor pequé. Ten piedad y misericordia de mí.\nTodos: Pecamos y nos pesa, ten misericordia de nosotros que por nosotros padeciste."
          },
          {
            "tipo": "sacerdote",
            "titulo": "5ª Estación: Simón de Cirene ayuda a cargar la cruz de Jesús",
            "texto": "Quien procedía de Cirene tuvo la oportunidad de convertirse mientras ayudaba a Jesús.\n\n                    Lector: Tu doctrina nos aconseja que nos ayudemos unos a otros. ¡Qué grande ha sido mi egoísmo, puesto que siempre he querido y exigido que todos me ayuden, pero qué poco he ayudado a los demás! Al encontrarme contigo, me doy cuenta de tantas cosas de mi vida.\n\n                    Q: Te adoramos Cristo, y te bendecimos.\nTodos: que por tu Santa Cruz redimiste al mundo y a mí, pecador. Amén.\n\n                    Padre Nuestro... Ave María... Gloria...\n\n                    Q: Señor pequé. Ten piedad y misericordia de mí.\nTodos: Pecamos y nos pesa, ten misericordia de nosotros que por nosotros padeciste."
          },
          {
            "tipo": "sacerdote",
            "titulo": "6ª Estación: Verónica enjuga el rostro de Jesús",
            "texto": "La mujer que no se calló.\n\n                    Lector: Ante esta estación me siento avergonzado porque en ocasiones he sido cobarde para cumplir con tus mandatos, bien, lo he hecho a mi conveniencia. Señor, concédeme la valentía de la Verónica para nunca negarte y avergonzarme de servirte.\n\n                    Q: Te adoramos Cristo, y te bendecimos.\nTodos: que por tu Santa Cruz redimiste al mundo y a mí, pecador. Amén.\n\n                    Padre Nuestro... Ave María... Gloria...\n\n                    Q: Señor pequé. Ten piedad y misericordia de mí.\nTodos: Pecamos y nos pesa, ten misericordia de nosotros que por nosotros padeciste."
          },
          {
            "tipo": "sacerdote",
            "titulo": "7ª Estación: Jesús cae por segunda vez",
            "texto": "Quien cae subiendo, cae hacia lo alto.\n\n                    Lector: Recuerdo los errores que cometí en mi juventud, quizá por mi falta de experiencia. Por esta segunda caída, te pido Señor, por todos los jóvenes. Ayúdalos, y a todos los que han caído, a controlar sus emociones y a encausarlas para bien de todos.\n\n                    Q: Te adoramos Cristo, y te bendecimos.\nTodos: que por tu Santa Cruz redimiste al mundo y a mí, pecador. Amén.\n\n                    Padre Nuestro... Ave María... Gloria...\n\n                    Q: Señor pequé. Ten piedad y misericordia de mí.\nTodos: Pecamos y nos pesa, ten misericordia de nosotros que por nosotros padeciste."
          },
          {
            "tipo": "sacerdote",
            "titulo": "8ª Estación: Jesús consuela a las mujeres de Jerusalén",
            "texto": "Muchas veces, solo la mujer, puede estar: desde la cuna hasta la cruz.\n\n                    Lector: No puedo olvidarme que la redención se realizó por tu cruz Señor, es decir, por el sacrificio. Eso me enseña que el dolor es parte de la condición humana y es enteramente tocado por tu amor que salva. Eso no me lleva a una alienada resignación, sino que me hace consciente de que algunos dolores son oportunidades para unirme a tu cruz. Es un misterio que solamente los que sufren unidos a ti pueden discernir en la medida cierta. Ayúdame a estar atento al profundo sufrimiento de los demás.\n\n                    Q: Te adoramos Cristo, y te bendecimos.\nTodos: que por tu Santa Cruz redimiste al mundo y a mí, pecador. Amén.\n\n                    Padre Nuestro... Ave María... Gloria...\n\n                    Q: Señor pequé. Ten piedad y misericordia de mí.\nTodos: Pecamos y nos pesa, ten misericordia de nosotros que por nosotros padeciste."
          },
          {
            "tipo": "sacerdote",
            "titulo": "9ª Estación: Jesús cae por tercera vez",
            "texto": "¡Después de eso no volvió a caer!\n\n                    Lector: No hay duda que en esta caída quisiste expiar los pecados de los adultos, que quizá, son los más graves. Perdóname, y ayúdame a conseguir el cielo.\n\n                    Q: Te adoramos Cristo, y te bendecimos.\nTodos: que por tu Santa Cruz redimiste al mundo y a mí, pecador. Amén.\n\n                    Padre Nuestro... Ave María... Gloria...\n\n                    Q: Señor pequé. Ten piedad y misericordia de mí.\nTodos: Pecamos y nos pesa, ten misericordia de nosotros que por nosotros padeciste."
          },
          {
            "tipo": "sacerdote",
            "titulo": "10ª Estación: Jesús es despojado de sus vestiduras",
            "texto": "¡Era pobre y murió más pobre!\n\n                    Lector: Ayúdame a desprenderme de mí mismo y de todo lo que poseo. Ayúdame a ponerlo al servicio de mis hermanos.\n\n                    Q: Te adoramos Cristo, y te bendecimos.\nTodos: que por tu Santa Cruz redimiste al mundo y a mí, pecador. Amén.\n\n                    Padre Nuestro... Ave María... Gloria...\n\n                    Q: Señor pequé. Ten piedad y misericordia de mí.\nTodos: Pecamos y nos pesa, ten misericordia de nosotros que por nosotros padeciste."
          },
          {
            "tipo": "sacerdote",
            "titulo": "11ª Estación: Jesús es clavado en la Cruz",
            "texto": "Dos trazos formaron Su Cruz.\n\n                    Lector: Teniendo dos ladrones a su lado, fue clavado en la Cruz que cargó. Crucificado, agredido, insultado, Jesús perdonó al verdugo que le hirió y mató.\n\n                    Q: Te adoramos Cristo, y te bendecimos.\nTodos: que por tu Santa Cruz redimiste al mundo y a mí, pecador. Amén.\n\n                    Padre Nuestro... Ave María... Gloria...\n\n                    Q: Señor pequé. Ten piedad y misericordia de mí.\nTodos: Pecamos y nos pesa, ten misericordia de nosotros que por nosotros padeciste."
          },
          {
            "tipo": "sacerdote",
            "titulo": "12ª Estación: Jesús muere en la Cruz",
            "texto": "El autor de la Vida, aceptó morir.\n\n                    Lector: \"¡Padre, perdónalos porque no saben lo que hacen!\" Sí. Perdóname porque realmente no tengo conciencia de lo que te ofendo cuando te fallo, cuando me fallo, cuando lo que hago, lo hago en contra de un semejante. Ilumíname para conocer la gravedad de los pecados y la majestad de tu redención.\n\n                    Q: Te adoramos Cristo, y te bendecimos.\nTodos: que por tu Santa Cruz redimiste al mundo y a mí, pecador. Amén.\n\n                    Padre Nuestro... Ave María... Gloria...\n\n                    Q: Señor pequé. Ten piedad y misericordia de mí.\nTodos: Pecamos y nos pesa, ten misericordia de nosotros que por nosotros padeciste."
          },
          {
            "tipo": "sacerdote",
            "titulo": "13ª Estación: Jesús es bajado de la Cruz",
            "texto": "María, las mujeres y algunos discípulos estaban al bajarlo de la Cruz.\n\n                    Lector: Parecía estar todo acabado. Muerto y sin vida María lo recibe Señor, te pido perdón por las veces en que no he sabido anunciarte ante el mundo. Que, con la intercesión de María Santísima, permanezca fiel a tí, aprenda de ti, aun cuando parezca estar todo acabado.\n\n                    Q: Te adoramos Cristo, y te bendecimos.\nTodos: que por tu Santa Cruz redimiste al mundo y a mí, pecador. Amén.\n\n                    Padre Nuestro... Ave María... Gloria...\n\n                    Q: Señor pequé. Ten piedad y misericordia de mí.\nTodos: Pecamos y nos pesa, ten misericordia de nosotros que por nosotros padeciste."
          },
          {
            "tipo": "sacerdote",
            "titulo": "14ª Estación: Jesús es colocado en el sepulcro",
            "texto": "Sembrado en el fecundo silencio.\n\n                    Lector: Sepultado en la roca más fría. Que así como ahora has sido llevado al sepulcro, entierre para siempre todos los aspectos negativos de mi vida, que me impiden ser feliz y hacer felices a los que me rodean.\n\n                    Q: Te adoramos Cristo, y te bendecimos.\nTodos: que por tu Santa Cruz redimiste al mundo y a mí, pecador. Amén.\n\n                    Padre Nuestro... Ave María... Gloria...\n\n                    Q: Señor pequé. Ten piedad y misericordia de mí.\nTodos: Pecamos y nos pesa, ten misericordia de nosotros que por nosotros padeciste."
          },
          {
            "tipo": "rubrica",
            "titulo": "Oración final",
            "texto": "Nos ponemos de rodillas.\n\n            Q: Jesús, me arrodillo ante ti y te pido: llena mi corazón de fe, esperanza y caridad, con verdadero arrepentimiento por mis pecados y un firme deseo de corregirlos.\nTodos: Amén.\n\n            (Nos ponemos de pie)\n\n            Q: En el nombre del Padre, del Hijo y del Espíritu Santo.\nTodos: Amén.\n\n                \"Ante las dificultades del mundo contemporáneo, muchos se preguntan con frecuencia: ¿Qué puedo hacer? La luz de la fe ilumina esta oscuridad, nos hace comprender que cada existencia tiene un valor inestimable, porque es fruto del amor de Dios. ¡El ama también a quien se ha alejado de Él! tiene paciencia y espera, es más, él ha entregado a su Hijo, muerto y resucitado, para que nos libere radicalmente del mal. Y Cristo ha enviado a sus discípulos para que lleven a todos los pueblos este gozoso anuncio de salvación y de vida nueva.\"\n                Benedicto XVI (Mensaje para la JMJ RÍO 2013)"
          }
        ]
      },
      {
        "id": "sec_2",
        "nombre": "2. Oficios de la Pasión",
        "secciones": [
          {
            "tipo": "sacerdote",
            "texto": "5:00 PM | Toca para abrir"
          },
          {
            "tipo": "rubrica",
            "titulo": "Monición",
            "texto": "Hoy, hermanos, no tendremos celebración de la Eucaristía. La Iglesia quiere que nos centremos en el misterio de la Pasión del Señor. Para fomentar una fructuosa participación y centrarnos en el Misterio, coloquemos nuestros celulares en modo avión o en silencio.\n\n                    Por ser este un día de especial recogimiento en la Iglesia, no tendremos canto de entrada, nuestro sacerdote, en nombre de toda la comunidad, se postrará frente al altar en señal del total inmerecimiento de nuestra parte, del sacrificio que Cristo hizo por nosotros en la cruz.\n\n                    No tendremos el habitual saludo inicial, sino que dicha la oración pasaremos inmediatamente a la proclamación de la Palabra del Señor. Le daremos especial relieve a la Oración Universal, a la adoración del misterio de la Cruz y concluiremos con la Sagrada Comunión.\n\n                    Dispongámonos con mucho respeto y silencio a iniciar nuestra celebración.\n\n            La procesión sale de sacristía al altar, no hay ciriales, no hay incienso, no hay manteles, etc. Al llegar se hace una postración y se pasa inmediatamente a la sede para rezar la Oración Colecta. No se dice \"Oremos\".\n\n            Sacerdote: Acuérdate, Señor, de tu gran misericordia, y santifica a tus siervos con tu constante protección, ya que por ellos Cristo, tu Hijo, derramando su Sangre, instituyó el misterio pascual. El que vive y reina por los siglos de los siglos.\nR. Amén."
          },
          {
            "tipo": "monicion",
            "titulo": "Monición",
            "texto": "El profeta Isaías nos dibuja con total claridad la misión del siervo en la persona de Jesús, llevado como oveja al sacrificio, imagen que nos deja a todos atónitos y avergonzados por el tan alto precio de nuestra redención, todo debido a la dureza de nuestro corazón. Así el tema central de la Liturgia de este día lo ofrece la carta a los Hebreos que nos revela el hilo conductor de la Pasión y que no es otro que la Obediencia al Padre, llevada hasta las últimas consecuencias, como era abrazar tan infame suplicio que san Juan en el Evangelio nos lo plasma con profunda devoción.\n\n            PRIMERA LECTURA\n\n            Del libro del profeta Isaías 52, 13-53, 12.\nEl fue traspasado por nuestros crímenes.\n\n            He aquí que mi siervo prosperará, será engrandecido y exaltado, será puesto en alto. Muchos se horrorizaron al verlo, porque estaba desfigurado su semblante, que no tenía ya aspecto de hombre; pero muchos pueblos se llenaron de asombro. Ante él los reyes cerrarán la boca, porque verán lo que nunca se les había contado y comprenderán lo que nunca se habían imaginado. ¿Quién habrá de creer lo que hemos anunciado? ¿A quién se le revelará el poder del Señor?. Creció en su presencia como planta débil, como una raíz en el desierto. No tenía gracia ni belleza. No vimos en él ningún aspecto atrayente; despreciado y rechazado por los hombres, varón de dolores, habituado al sufrimiento; como uno del cual se aparta la mirada, despreciado y desestimado. El soportó nuestros sufrimientos y aguantó nuestros dolores; nosotros lo tuvimos por leproso, herido por Dios y humillado, traspasado por nuestras rebeliones, triturado por nuestros crímenes. El soportó el castigo que nos trae la paz. Por sus llagas hemos sido curados. Todos andábamos errantes como ovejas, cada uno siguiendo su camino, y el Señor cargó sobre él todos nuestros crímenes. Cuando lo maltrataban, se humillaba y no abría la boca, como un cordero llevado a degollar; como oveja ante el esquilador, enmudecía y no abría la boca. Inicuamente y contra toda justicia se lo llevaron. ¿Quién se preocupó de su suerte?. Lo arrancaron de la tierra de los vivos, lo hirieron de muerte por los pecados de mi pueblo, le dieron sepultura con los malhechores a la hora de su muerte, aunque no había cometido crímenes, ni hubo engaño en su boca. El Señor quiso triturarlo con el sufrimiento. Cuando entregue su vida como expiación, verá a sus descendientes, prolongará sus años y por medio de él prosperarán los designios del Señor. Por las fatigas de su alma, verá la luz y se saciará; con sus sufrimientos justificará mi siervo a muchos, cargando con los crímenes de ellos. Por eso le daré una parte entre los grandes, y con los fuertes repartirá despojos, ya que indefenso se entregó a la muerte y fue contado entre los malhechores, cuando tomó sobre sí las culpas de todos e intercedió por los pecadores.\nPalabra de Dios. R. Te alabamos, Señor.\n\n            SALMO RESPONSORIAL\n\n            Del Salmo 30.\nR. Padre, en tus manos encomiendo mi espíritu.\n\n            A ti, Señor, me acojo, que no quede yo nunca defraudado. En tus manos encomiendo mi espíritu y tú, mi Dios leal, me librarás. R.\n\n            Se burlan de mí mis enemigos, mis vecinos y parientes de mí se espantan, los que me ven pasar huyen de mí. Estoy en el olvido, como un muerto, como un objeto tirado en la basura. R.\n\n            Pero yo, Señor, en ti confío. Tú eres mi Dios, y en tus manos está mi destino. Líbrame de los enemigos que me persiguen. R.\n\n            Vuelve, Señor, tus ojos a tu siervo y sálvame, por tu misericordia. Sean fuertes y valientes de corazón, ustedes, los que esperan en el Señor. R.\n\n            SEGUNDA LECTURA\n\n            De la carta a los hebreos 4, 14-16; 5, 7-9.\nAprendió a obedecer y se convirtió en la causa de la salvación eterna para todos los que lo obedecen.\n\n            Hermanos: Jesús, el Hijo de Dios, es nuestro sumo sacerdote, que ha entrado en el cielo. Mantengamos firme la profesión de nuestra fe. En efecto, no tenemos un sumo sacerdote que no sea capaz de compadecerse de nuestros sufrimientos, puesto que él mismo ha pasado por las mismas pruebas que nosotros, excepto el pecado. Acerquémonos, por tanto, con plena confianza al trono de la gracia, para recibir misericordia, hallar la gracia y obtener ayuda en el momento oportuno. Precisamente por eso, Cristo, durante su vida mortal, ofreció oraciones y súplicas, con fuertes voces y lágrimas, a aquel que podía librarlo de la muerte, y fue escuchado por su piedad. A pesar de que era el Hijo, aprendió a obedecer padeciendo, y llegado a su perfección, se convirtió en la causa de la salvación eterna para todos los que lo obedecen.\nPalabra de Dios. R. Te alabamos, Señor.\n\n            ACLAMACION ANTES DEL EVANGELIO\n\n            Flp 2, 8-9.\nR. Honor y gloria a ti, Señor Jesús.\nCristo se humilló por nosotros y por obediencia aceptó incluso la muerte y una muerte de cruz. Por eso Dios lo exaltó sobre todas las cosas y le otorgó el nombre que está sobre todo nombre.\nR. Honor y gloria a ti, Señor Jesús.\n\n            EVANGELIO: PASION DE NUESTRO SEÑOR JESUCRISTO SEGUN SAN JUAN (18, 1-19, 42)\n\n            La asamblea no responde ni se signa. (C: Cronista, S: Sinagoga, +: Jesús).\n\n                C: En aquel tiempo, Jesús fue con sus discípulos al otro lado del torrente Cedrón, donde había un huerto, y entraron allí él y sus discípulos. Judas, el traidor, conocía también el sitio, porque Jesús se reunía a menudo allí con sus discípulos. Entonces Judas tomó un batallón de soldados y guardias de los sumos sacerdotes y de los fariseos y entró en el huerto con linternas, antorchas y armas. Jesús, sabiendo todo lo que iba a suceder, se adelantó y les dijo:\n\n                + \"¿A quién buscan?\"\n\n                C: Le contestaron:\n\n                S: \"A Jesús, el nazareno\".\n\n                C: Les dijo Jesús:\n\n                + \"Yo soy\".\n\n                C: Estaba también con ellos Judas, el traidor. Al decirles 'Yo soy', retrocedieron y cayeron a tierra. Jesús les volvió a preguntar:\n\n                + \"¿A quién buscan?\"\n\n                C: Ellos dijeron:\n\n                S: \"A Jesús, el nazareno\".\n\n                C: Jesús contestó:\n\n                + \"Les he dicho que soy yo. Si me buscan a mí, dejen que éstos se vayan\".\n\n                C: Así se cumplió lo que Jesús había dicho: 'No he perdido a ninguno de los que me diste'. Entonces Simón Pedro, que llevaba una espada, la sacó e hirió a un criado del sumo sacerdote y le cortó la oreja derecha. Este criado se llamaba Malco. Dijo entonces Jesús a Pedro:\n\n                + \"Mete la espada en la vaina. ¿No voy a beber el cáliz que me ha dado mi Padre?\"\n\n                C: El batallón, su comandante y los criados de los judíos apresaron a Jesús, lo ataron y lo llevaron primero ante Anás, porque era suegro de Caifás, sumo sacerdote aquel año. Caifás era el que había dado a los judíos este consejo: 'Conviene que muera un solo hombre por el pueblo'. Simón Pedro y otro discípulo iban siguiendo a Jesús. Este discípulo era conocido del sumo sacerdote y entró con Jesús en el palacio del sumo sacerdote, mientras Pedro se quedaba fuera, junto a la puerta. Salió el otro discípulo, el conocido del sumo sacerdote, habló con la portera e hizo entrar a Pedro. La portera dijo entonces a Pedro:\n\n                S: \"¿No eres tú también uno de los discípulos de ese hombre?\"\n\n                C: Él dijo:\nS: \"No lo soy\".\n\n                C: Los criados y los guardias habían encendido un brasero, porque hacía frío, y se calentaban. También Pedro estaba con ellos de pie, calentándose. El sumo sacerdote interrogó a Jesús acerca de sus discípulos y de su doctrina. Jesús le contestó:\n\n                + \"Yo he hablado abiertamente al mundo y he enseñado continuamente en la sinagoga y en el templo, donde se reúnen todos los judíos, y no he dicho nada a escondidas. ¿Por qué me interrogas a mí? Interroga a los que me han oído, sobre lo que les he hablado. Ellos saben lo que he dicho\".\n\n                C: Apenas dijo esto, uno de los guardias le dio una bofetada a Jesús, diciéndole:\n\n                S: \"¿Así contestas al sumo sacerdote?\"\n\n                C: Jesús le respondió:\n\n                + \"Si he faltado al hablar, demuestra en qué he faltado; pero si he hablado como se debe, ¿por qué me pegas?\"\n\n                C: Entonces Anás lo envió atado a Caifás, el sumo sacerdote. Simón Pedro estaba de pie, calentándose, y le dijeron:\n\n                + \"¿No eres tú también uno de sus discípulos?\"\n\n                C: Él lo negó diciendo:\n\n                S: \"No lo soy\".\n\n                C: Uno de los criados del sumo sacerdote, pariente de aquel a quien Pedro le había cortado la oreja, le dijo:\n\n                + \"¿Qué no te vi yo con él en el huerto?\"\n\n                C: Pedro volvió a negarlo y en seguida cantó un gallo. Llevaron a Jesús de casa de Caifás al pretorio. Era muy de mañana y ellos no entraron en el palacio para no incurrir en impureza y poder así comer la cena de Pascua. Salió entonces Pilato a donde estaban ellos y les dijo:\n\n                S: \"¿De qué acusan a este hombre?\"\n\n                C: Le contestaron:\n\n                S: \"Si éste no fuera un malhechor, no te lo hubiéramos traído\".\n\n                C: Pilato les dijo:\n\n                S: \"Pues llévenselo y júzguenlo según su ley\".\n\n                C: Los judíos le respondieron:\n\n                S: \"No estamos autorizados para dar muerte a nadie\".\n\n                C: Así se cumplió lo que había dicho Jesús, indicando de qué muerte iba a morir. Entró otra vez Pilato en el pretorio, llamó a Jesús y le dijo:\n\n                S: \"¿Eres tú el rey de los judíos?\"\n\n                C: Jesús le contestó:\n\n                + \"¿Eso lo preguntas por tu cuenta o te lo han dicho otros?\"\n\n                C: Pilato le respondió:\n\n                S: \"¿Acaso soy yo judío? Tu pueblo y los sumos sacerdotes te han entregado a mí. ¿Qué es lo que has hecho?\"\n\n                C: Jesús le contestó:\n\n                + \"Mi Reino no es de este mundo. Si mi Reino fuera de este mundo, mis servidores habrían luchado para que no cayera yo en manos de los judíos. Pero mi Reino no es de aquí\".\n\n                C: Pilato le dijo:\n\n                S: \"¿Conque tú eres rey?\"\n\n                C: Jesús le contestó:\n\n                + \"Tú lo has dicho. Soy rey. Yo nací y vine al mundo para ser testigo de la verdad. Todo el que es de la verdad, escucha mi voz\".\n\n                C: Pilato le dijo:\n\n                S: \"¿Y qué es la verdad?\"\n\n                C: Dicho esto, salió otra vez a donde estaban los judíos y les dijo:\n\n                S: \"No encuentro en él ninguna culpa. Entre ustedes es costumbre que por Pascua ponga en libertad a un preso. ¿Quieren que les suelte al rey de los judíos?\"\n\n                C: Pero todos ellos gritaron:\n\n                S: \"¡No, a ése no! ¡A Barrabás!\"\n\n                C: (El tal Barrabás era un bandido). Entonces Pilato tomó a Jesús y lo mandó azotar. Los soldados trenzaron una corona de espinas, se la pusieron en la cabeza, le echaron encima un manto color púrpura, y acercándose a él, le decían:\n\n                S: \"¡Viva el rey de los judíos!\",\n\n                C: y le daban de bofetadas. Pilato salió otra vez afuera y les dijo:\n\n                S: \"Aquí lo traigo para que sepan que no encuentro en él ninguna culpa\".\n\n                C: Salió, pues, Jesús, llevando la corona de espinas y el manto color púrpura. Pilato les dijo:\n\n                S: \"Aquí está el hombre\".\n\n                C: Cuando lo vieron los sumos sacerdotes y sus servidores, gritaron:\n\n                S: \"¡Crucificalo, crucificalo!\"\n\n                C: Pilato les dijo:\n\n                S: \"Llévenselo ustedes y crucifiquenlo, porque yo no encuentro culpa en él\".\n\n                C: Los judíos le contestaron:\n\n                S: \"Nosotros tenemos una ley y según esa ley tiene que morir, porque se ha declarado Hijo de Dios\".\n\n                C: Cuando Pilato oyó estas palabras, se asustó aún más, y entrando otra vez en el pretorio, dijo a Jesús:\n\n                S: \"¿De dónde eres tú?\"\n\n                C: Pero Jesús no le respondió. Pilato le dijo entonces:\n\n                S: \"¿A mí no me hablas? ¿No sabes que tengo autoridad para soltarte y autoridad para crucificarte?\"\n\n                C: Jesús le contestó:\n\n                + \"No tendrías ninguna autoridad sobre mí, si no te la hubieran dado de lo alto. Por eso, el que me ha entregado a ti tiene un pecado mayor\".\n\n                C: Desde ese momento Pilato trataba de soltarlo, pero los judíos gritaban:\n\n                S: \"¡Si sueltas a ése, no eres amigo del César!\"\n\n                C: Al oír estas palabras, Pilato sacó a Jesús y lo sentó en el tribunal, en el sitio que llaman \"el Enlosado\" (en hebreo Gábbata). Era el día de la preparación de la Pascua, hacia el mediodía. Y dijo Pilato a los judíos:\n\n                S: \"Aquí tienen a su rey\".\n\n                C: Ellos gritaron:\n\n                S: \"¡Fuera, fuera! ¡Crucificalo!\"\n\n                C: Pilato les dijo:\n\n                S: \"¿A su rey voy a crucificar?\"\n\n                C: Contestaron los sumos sacerdotes:\n\n                S: \"No tenemos más rey que el César\".\n\n                C: Entonces se lo entregó para que lo crucificaran. Tomaron a Jesús y él, cargando con la cruz, se dirigió hacia el sitio llamado \"la Calavera\" (que en hebreo se dice Gólgota), donde lo crucificaron, y con él a otros dos, uno de cada lado, y en medio Jesús. Pilato mandó escribir un letrero y ponerlo encima de la cruz; en él estaba escrito: 'Jesús el nazareno, el rey de los judíos'. Leyeron el letrero muchos judíos, porque estaba cerca el lugar donde Crucificaron a Jesús y estaba escrito en hebreo, latín y griego. Entonces los sumos sacerdotes de los judíos le dijeron a Pilato:\n\n                S: \"No escribas: 'El rey de los judíos', sino: 'Este ha dicho: Soy rey de los judíos'\".\n\n                C: Pilato les contestó:\n\n                S: \"Lo escrito, escrito está\".\n\n                C: Cuando crucificaron a Jesús, los soldados cogieron su ropa e hicieron cuatro partes, una para cada soldado, y apartaron la túnica. Era una túnica sin costura, tejida toda de una pieza de arriba a abajo. Por eso se dijeron:\n\n                S: \"No la rasguemos, sino echemos suertes para ver a quién le toca\".\n\n                C: Así se cumplió lo que dice la Escritura: \"Se repartieron mi ropa y echaron a suerte mi túnica\". Y eso hicieron los soldados. Junto a la cruz de Jesús estaban su madre, la hermana de su madre, María la de Cleofás, y María Magdalena. Al ver a su madre y junto a ella al discípulo que tanto quería, Jesús dijo a su madre:\n\n                + \"Mujer, ahí está tu hijo\".\n\n                C: Luego dijo al discípulo:\n\n                + \"Ahí está tu madre\".\n\n                C: Y desde entonces el discípulo se la llevó a vivir con él. Después de esto, sabiendo Jesús que todo había llegado a su término, para que se cumpliera la Escritura dijo:\n\n                + \"Tengo sed\".\n\n                C: Había allí un jarro lleno de vinagre. Los soldados sujetaron una esponja empapada en vinagre a una caña de hisopo y se la acercaron a la boca. Jesús probó el vinagre y dijo:\n\n                + \"Todo está cumplido\",\n\n                C: e inclinando la cabeza, entregó el espíritu.\n\n                    Aquí se arrodillan todos y se hace una breve pausa.\n\n                C: Entonces, los judíos, como era el día de la preparación de la Pascua, para que los cuerpos de los ajusticiados no se quedaran en la cruz el sábado, porque aquel sábado era un día muy solemne, pidieron a Pilato que les quebraran las piernas y los quitaran de la cruz. Fueron los soldados, le quebraron las piernas a uno y luego al otro de los que habían sido crucificados con él. Pero al llegar a Jesús, viendo que ya había muerto, no le quebraron las piernas, sino que uno de los soldados le traspasó el costado con una lanza e inmediatamente salió sangre y agua. El que vio da testimonio de esto y su testimonio es verdadero y él sabe que dice la verdad, para que también ustedes crean. Esto sucedió para que se cumpliera lo que dice la Escritura: \"No le quebrarán ningún hueso\"; y en otro lugar la Escritura dice: \"Mirarán al que traspasaron\". Después de esto, José de Arimatea, que era discípulo de Jesús, pero oculto por miedo a los judíos, pidió a Pilato que lo dejara llevarse el cuerpo de Jesús. Y Pilato lo autorizó. El fue entonces y se llevó el cuerpo. Llegó también Nicodemo, el que había ido a verlo de noche, y trajo unas cien libras de una mezcla de mirra y áloe. Tomaron el cuerpo de Jesús y lo envolvieron en lienzos con esos aromas, según se acostumbra enterrar entre los judíos. Había un huerto en el sitio donde lo crucificaron, y en el huerto, un sepulcro nuevo, donde nadie había sido enterrado todavía. Y como para los judíos era el día de la preparación de la Pascua y el sepulcro estaba cerca, allí pusieron a Jesús.\n\nPalabra del Señor."
          },
          {
            "tipo": "monicion",
            "titulo": "Monición",
            "texto": "A continuación, elevaremos nuestras súplicas en la Oración Universal de los Fieles de la misma manera que se hacía al menos hace más 1,700 años, donde el diácono o ayudante nos sugiere el motivo de la oración y son los fieles quienes, en silencio, elevan la verdadera oración, misma que el Padre concluye. Por tanto, los invitamos a verdaderamente orar en los momentos de silencio propuestos.\n\n                1. Por la santa Iglesia: Dice el Lector: Oremos, queridos hermanos, por la santa Iglesia de Dios, para que nuestro Dios y Señor le conceda la paz y la unidad, se digne protegerla en toda la tierra y nos conceda glorificarlo, como Dios Padre omnipotente, con una vida pacífica y serena. Se ora un momento en silencio. Luego prosigue el Sacerdote: Dios todopoderoso y eterno, que en Cristo revelaste tu gloria a todas las naciones, conserva la obra de tu misericordia, para que tu Iglesia, extendida por toda la tierra, persevere con fe inquebrantable en la confesión de tu nombre. Por Jesucristo, nuestro Señor. R. Amén.\n\n                2. Por el Papa: Oremos también por nuestro santo padre el Papa Francisco para que Dios nuestro Señor, que lo escogió para el Orden de los obispos, lo conserve a salvo y sin daño para bien de su santa Iglesia, a fin de que pueda gobernar al santo pueblo de Dios. Se ora un momento en silencio. Luego prosigue el Sacerdote: Dios todopoderoso y eterno, cuya sabiduría gobierna el universo, atiende favorable a nuestras súplicas y protege con tu amor al Papa que nos diste, para que el pueblo cristiano, que tú mismo pastoreas, progrese bajo su cuidado en la firmeza de su fe. Por Jesucristo, nuestro Señor. R. Amén.\n\n                3. Por el pueblo de Dios y sus ministros: Oremos también por nuestro obispo Rogelio, por todos los obispos, presbíteros y diáconos de la Iglesia, y por todo el pueblo santo de Dios. Se ora un momento en silencio. Luego prosigue el Sacerdote: Dios todopoderoso y eterno, que con tu Espíritu santificas y gobiernas a toda la Iglesia, escucha nuestras súplicas por tus ministros, para que con la ayuda de tu gracia, te sirvan con fidelidad. Por Jesucristo, nuestro Señor. R. Amén.\n\n                4. Por los catecúmenos: Oremos también por los (nuestros) catecúmenos, para que Dios nuestro Señor abra los oídos de sus corazones les manifieste su misericordia, y para que, mediante el bautismo, se les perdonen todos sus pecados y queden incorporados a Cristo Señor nuestro. Se ora un momento en silencio. Luego prosigue el Sacerdote: Dios todopoderoso y eterno, que sin cesar concedes nuevos hijos a tu Iglesia, acrecienta la fe y el conocimiento a los (nuestros) catecúmenos, para que renacidos en la fuente bautismal, los cuentes entre tus hijos de adopción. Por Jesucristo, nuestro Señor. R. Amén.\n\n                5. Por la unidad de los cristianos: Oremos también por todos los hermanos que creen en Cristo, para que Dios nuestro Señor se digne congregar y custodiar en la única Iglesia a quienes procuran vivir en la verdad. Se ora un momento en silencio. Luego prosigue el Sacerdote: Dios todopoderoso y eterno, que reúnes a los que están dispersos y los mantienes en la unidad, mira benignamente la grey de tu Hijo, para que, a cuantos están consagrados por el único bautismo, también los una la integridad de la fe y los asocie el vínculo de la caridad. Por Jesucristo, nuestro Señor. R. Amén.\n\n                6. Por los judíos: Oremos también los judíos, para que a quién Dios nuestro Señor habló primero les conceda progresar continuamente en el amor de su nombre y en la fidelidad a su alianza. Se ora un momento en silencio. Luego prosigue el Sacerdote: Dios todopoderoso y eterno, que confiaste tus promesas a Abraham y a su descendencia, oye compasivo los ruegos de tu Iglesia, para que el pueblo que adquiriste primero como tuyo merezca llegar a la plenitud de la redención. Por Jesucristo, nuestro Señor. R. Amén.\n\n                7. Por los que no creen en Cristo: Oremos también por los que no creen en Cristo, para que, iluminados por el Espíritu Santo, puedan ellos encontrar el camino de la salvación. Se ora un momento en silencio. Luego prosigue el Sacerdote: Dios todopoderoso y eterno, concede a quienes no creen en Cristo, que, caminando en tu presencia con sinceridad de corazón, encuentren la verdad; y a nosotros concédenos crecer en el amor mutuo y en el deseo de comprender mejor los misterios de tu vida, a fin de que seamos testigos cada vez más auténticos de tu amor en el mundo. Por Jesucristo, nuestro Señor. R. Amén.\n\n                8. Por los que no creen en Dios: Oremos también por los que no conocen a Dios, para que buscando con sinceridad lo que es recto merezcan llegar hasta él. Se ora un momento en silencio. Luego prosigue el Sacerdote: Dios todopoderoso y eterno, que creaste a todos hombres para que deseándote te busquen, y para que al encontrarte descansen en ti; concédenos que, en medio de las dificultades de este mundo, al ver los signos de tu amor y el testimonio de las buenas obras de los creyentes, todos los hombres se alegren al confesarte como único Dios verdadero y Padre de todos. Por Jesucristo, nuestro Señor. R. Amén.\n\n                9. Por los gobernantes: Oremos también por todos los gobernantes de las naciones, para que Dios nuestro Señor guie sus mentes y corazones, según su voluntad providente, hacia la paz, verdadera y la libertad de todos. Se ora un momento en silencio. Luego prosigue el Sacerdote: Dios todopoderoso y eterno, en cuya mano están los corazón de los hombres y los derechos de las naciones, mira con bondad a nuestros gobernantes, para que, con tu ayuda, se afiance en toda la tierra un auténtico progreso social, una paz duradera y una verdadera libertad religiosa. Por Jesucristo, nuestro Señor. R. Amén.\n\n                10. Por los que se encuentran en alguna tribulación: Oremos, hermanos, muy queridos a Dios Padre todopoderoso, para que libre al mundo de todos sus errores, aleje las enfermedades, alimente a los que tienen hambre, libere a los encarcelados y haga justicia a los oprimidos, conceda seguridad a los que viajan, un buen retorno a los que se hallan lejos del hogar, la salud a los enfermos y la salvación a los moribundos. Se ora un momento en silencio. Luego prosigue el Sacerdote: Dios todopoderoso y eterno, consuelo de los afligidos y fortaleza de los que sufren, escucha a los que te invocan en su tribulación, para que todos experimenten en sus necesidades la alegría de tu misericordia. Por Jesucristo, nuestro Señor. R. Amén.\n\n                11. Por quienes sufren en tiempo de pandemia: Oremos también por todos los que sufren las consecuencias de la pandemia actual: para que Dios Padre conceda la salud a los enfermos, fortaleza al personal sanitario, consuelo a las familias y la salvación a todas las víctimas que han muerto. Se ora un momento en silencio. Luego prosigue el Sacerdote: Dios todopoderoso y eterno, singular protector de la enfermedad humana, mira compasivo la aflicción de tus hijos que padecen esta pandemia; alivia el dolor de los enfermos, da fuerza a quienes los cuidan, acoge en tu paz a los que han muerto y, mientras dura esta tribulación, haz que todos puedan encontrar alivio en tu misericordia. Por Jesucristo, nuestro Señor. R. Amén."
          },
          {
            "tipo": "rubrica",
            "titulo": "Monición",
            "texto": "Este gesto de la adoración de la cruz tiene muchísimos años de celebrarse en la Iglesia, pero no es precisamente a la cruz en sí a la que adoramos, sino al misterio que ella encierra. Adoramos el gesto de nuestro Salvador de abrazar libremente este suplicio solo para que entendiéramos cuánto nos ama Dios. Al acercarnos a la cruz, hagámoslo también como un signo de aceptar, hasta las últimas consecuencias, la voluntad de Dios nuestro Padre.\n\n            Un acólito acompañado por varios ministros trae por el pasillo central la imagen del crucificado y en tres momentos va develando la cruz, diciendo:\n\n                Miren el árbol de la Cruz donde estuvo clavado Cristo, el Salvador del mundo.\nR. Vengan y adoremos.\n\n            Al llegar la cruz al santuario el Sacerdote dice:\n\n            Tu Cruz adoramos, Señor, y tu santa resurrección alabamos y glorificamos, pues del árbol de la Cruz ha venido la alegría al mundo entero.\n\n            Luego, baja y arrodillándose la venera. Inmediatamente hacen los mismo los demás sacerdotes concelebrantes. Mientras el coro canta, este u otro canto apropiado.\n\n                SALMO 66, 2\n\n                Que el Señor se apiade de nosotros y nos bendiga, que nos muestre su rostro radiante y misericordioso.\n\n                ANTÍFONA:\n\n                Tu Cruz adoramos, Señor, y tu santa resurrección alabamos y glorificamos: pues del árbol de la Cruz ha venido la alegría al mundo entero.\n\n                IMPROPERIOS I\n\n                R. Pueblo mío, ¿qué mal te he causado, o en qué cosa te he ofendido? Respóndeme.\n\n                ¿Porque yo te saqué de Egipto, tú le has preparado una cruz a tu Salvador? R.\n\n                Hágios o Theós. R. Santo Dios.\n\n                Hágios Ischyrós. R. Santo, fuerte.\n\n                Hágios Athánatos, eleison himás. R. Santo inmortal, ten piedad de nosotros.\n\n                ¿Porque yo te guié cuarenta años por el desierto, te alimenté con el maná y te introduje en una tierra fértil, tú le preparaste una cruz a tu Salvador? R. Hágios o Theós.\n\n                ¿Qué más pude hacer, o qué dejé sin hacer por ti? Yo mismo te elegí y te planté, hermosa viña mía, pero tú te has vuelto áspera y amarga conmigo, porque en mi sed me diste de beber vinagre y has plantado una lanza en el costado a tu Salvador. R.\n\n                IMPROPERIOS II\n\n                Por ti yo azoté a Egipto y a sus primogénitos y tú me has entregado para que me azoten. R. Pueblo mío, ¿qué mal te he causado, o en qué cosa te he ofendido? Respóndeme.\n\n                Yo te saqué de Egipto y te libré del faraón en el Mar Rojo, y tú me has entregado a los sumos sacerdotes. R.\n\n                Yo te abrí camino por el mar y tú me has abierto el costado con tu lanza. R.\n\n                Yo te serví de guía con una columna de nubes y tú me has conducido al pretorio de Pilato. R.\n\n                Yo te di de comer maná en el desierto y tú me has dado de bofetadas y de azotes. R.\n\n                Yo te di a beber el agua salvadera que brotó de la peña y tú me has dado a beber hiel y vinagre. R.\n\n                Por ti yo herí a los reyes cananeos y tú, con una caña, me has herido en la cabeza. R.\n\n                Yo puse en tus manos un cetro real y tú me has puesto en la cabeza una corona de espinas. R.\n\n                Yo te exalté con mi omnipotencia y tú me has hecho subir a la deshonra de la Cruz. R.\n\n                HIMNO\n\n                Antífona: R. Cruz amable y redentora, árbol noble, espléndido. Ningún árbol fue tan rico, ni en sus frutos ni en su flor. Dulce leño, dulces clavos. Dulce el fruto que nos dio.\n\n                Canta, oh lengua jubilosa, el combate singular en que el Salvador del mundo, inmolado en una cruz, con su sangre redentora a los hombres rescató. R.\n\n                Cuando Adán, movido a engaño comió el fruto del Edén, el Creador, compadecido, desde entonces decretó que un árbol nos devolviera lo que un árbol nos quitó. R.\n\n                Quiso, con sus propias armas, vencer Dios al seductor, la sabiduría a la astucia fiero duelo le aceptó, para hacer surgir la vida donde la muerte brotó. R.\n\n                Cruz amable y redentora, árbol noble, espléndido. Ningún árbol fue tan rico, ni en sus frutos ni en su flor. R.\n\n                Cuando el tiempo hubo llegado, el Eterno nos envió a su Hijo desde el cielo, Dios eterno como él, que en el seno de una Virgen carne humana revistió. R.\n\n                Hecho un niño está llorando, de un pesebre en la estrechez. En Belén, la Virgen madre en pañales lo envolvió. He allí al Dios potente, pobre, débil, párvulo. R.\n\n                Cuando el cuerpo del Dios-Hombre alcanzó su plenitud, al tormento, libremente, cual cordero, se entregó, pues a ello vino al mundo a morir en una cruz. R.\n\n                Ya se enfrenta a las injurias, a los golpes y al rencor, ya la sangre está brotando de la fuente de salud. En qué río tan divino se ha lavado la creación. R.\n\n                Árbol santo, cruz excelsa, tu dureza ablanda ya, que tus ramas se dobleguen al morir el Redentor y en tu tronco suavizado, lo sostenga con piedad. R.\n\n                Feliz puerto preparaste para el mundo náufrago y el rescate presentaste para nuestra redención, pues la Sangre del Cordero en tus brazos se ofrendó. R.\n\n                Conclusión que nunca debe omitirse: Elevemos jubilosos a la augusta Trinidad nuestra gratitud inmensa por su amor y redención, al eterno Padre, al Hijo, y al Espíritu de amor. Amén."
          },
          {
            "tipo": "rubrica",
            "titulo": "Monición",
            "texto": "Nuestra celebración concluye con el rito de la Comunión a la cual nos acercaremos con el firme propósito de cumplir con la voluntad de Dios nuestro Padre y hacernos disponibles a su gracia.\n\n            Después de que el acólito ha depositado el Santísimo Sacramento sobre el altar y ha descubierto el copón, se acerca el Sacerdote y, previa genuflexión, sube al altar. Ahí, teniendo las manos juntas, dice con voz clara:\n\n            El amor de Dios ha sido derramado en nuestros corazones con el Espíritu Santo que se nos ha dado; digamos con fe y esperanza:\n\n            El Sacerdote, con las manos extendidas, dice junto con el pueblo:\n\n            Padre nuestro...\n\n            El Sacerdote, con las manos extendidas, prosigue él solo en voz alta:\n\n            Líbranos de todos los males, Señor, y concédenos la paz en nuestros días, para que, ayudados por tu misericordia, vivamos siempre libres de pecado y protegidos de toda perturbación, mientras esperamos la gloriosa venida de nuestro Salvador Jesucristo.\nR. Tuyo es el reino, tuyo el poder y la gloria por siempre, Señor.\n\n            A continuación el Sacerdote, con las manos juntas, dice en secreto:\n\n            Señor Jesucristo, la comunión de tu Cuerpo no sea para mí un motivo de juicio y condenación, sino que, por tu piedad, me aproveche para defensa de alma y cuerpo y como remedio saludable.\n\n            Seguidamente hace genuflexión, toma una partícula, la mantiene un poco elevada sobre el pixis y dice en voz alta, de cara al pueblo:\n\n            Este es el Cordero de Dios, que quita el pecado del mundo. Dichosos los invitados a la cena del Señor.\n\n            Y, juntamente con el pueblo, añade una sola vez:\n\n            Señor, no soy digno de que entres en mi casa, pero una palabra tuya bastará para sanarme."
          },
          {
            "tipo": "sacerdote",
            "titulo": "ORACION DESPUES DE LA COMUNION",
            "texto": "Dios todopoderoso y eterno, que nos has redimido con la gloriosa muerte y resurrección de tu Hijo Jesucristo, prosigue en nosotros la obra de tu misericordia, para que mediante nuestra participación en este misterio, permanezcamos dedicados a tu servicio. Por Jesucristo, nuestro Señor.\nR. Amén."
          },
          {
            "tipo": "rubrica",
            "titulo": "ORACION SOBRE EL PUEBLO",
            "texto": "Como despedida, el Sacerdote, de pie y vuelto hacia el pueblo, extendiendo las manos sobre él, dice la siguiente oración:\n\n            Envía, Señor, sobre este pueblo tuyo, que ha conmemorado la muerte de tu Hijo, en espera de su resurrección, la abundancia de tu bendición; llegue a él tu perdón, reciba tu consuelo, se acreciente su fe santa y se consolide su eterna redención. Por Jesucristo, nuestro Señor.\nR. Amén."
          },
          {
            "tipo": "monicion",
            "titulo": "Monición",
            "texto": "Permanecemos en silencio.\n\n                    En unos momentos más, los fieles que quieran venerar la cruz del Señor se podrán acercar.\n\n                Y todos se retiran en silencio. A su debido tiempo se desviste el altar."
          }
        ]
      },
      {
        "id": "sec_3",
        "nombre": "3. Las Siete Palabras",
        "secciones": [
          {
            "tipo": "sacerdote",
            "texto": "6:00 PM | Toca para abrir\n\n            Celebrar las siete palabras es meditar el testamento que Cristo, nuestro Salvador, nos dejó en la Cruz, dándonos ejemplo de confiar en el amor misericordioso de nuestro Padre Celestial."
          },
          {
            "tipo": "monicion",
            "titulo": "Monición y Oración Inicial",
            "texto": "Al final de la celebración de la Pasión, antes de regresar al monumento, dirigimos a Cristo, pendiente de la Cruz, estas últimas 7 Palabras.\n\n            Q: En el nombre del Padre y del Hijo y del Espíritu Santo.\nTodos: Amén.\n\n            Q: Padre de Misericordia, estamos reunidos...\nTodos: Amén."
          },
          {
            "tipo": "sacerdote",
            "titulo": "1ª Palabra: \"Padre, perdónalos porque no saben lo que hacen\" (Lc 23, 34)",
            "texto": "Lector: No es fácil el perdón Señor. Es más fácil el desquite, guardar en el corazón resentimientos, no perdonar. A nosotros nos cuesta mucho perdonar de corazón, pero nos agrada mucho ser perdonados. Danos paciencia y capacidad de perdón.\n\n                    Q: Por los méritos de tu dolorosa pasión...\nTodos: Te pedimos, escúchanos, Señor."
          },
          {
            "tipo": "sacerdote",
            "titulo": "2ª Palabra: \"Te aseguro que hoy estarás conmigo en el paraíso\" (Lc 23, 43)",
            "texto": "Lector: Siempre me he considerado digno de la salvación solo si antes expiara abundantemente sobre las cosas pasadas, los malos juicios, la poca sinceridad para conmigo. Nunca había considerado la posibilidad de la salvación en el \"hoy\". ¿Estaré posponiendo mi salvación para un después, cuando tenga oportunidad, o cuando realmente no tenga otra cosa que hacer?\n\n                    Q: Por los méritos de tu dolorosa pasión...\nTodos: Te pedimos, escúchanos, Señor."
          },
          {
            "tipo": "sacerdote",
            "titulo": "3ª Palabra: \"Mujer, ahí tienes a tu hijo [...] Ahí tienes a tu madre\" (Jn 19, 26-27)",
            "texto": "Lector: Señor, no te guardaste nada para Ti, lo entregaste todo. Nos heredaste lo mejor que tenías, nos entregaste el consuelo en las horas difíciles, a tu Madre, la Virgen María. ¡Una Madre para el mundo entero! Ayudanos a valorar más a nuestra madre terrena y a consolar a las que sufren y guardan el infinito dolor en su corazón.\n\n                    Q: Por los méritos de tu dolorosa pasión...\nTodos: Te pedimos, escúchanos, Señor."
          },
          {
            "tipo": "sacerdote",
            "titulo": "4ª Palabra: \"¡Dios mío, Dios mío! ¿Por qué me has abandonado?\" (Mt 27, 46)",
            "texto": "Lector: De ninguna manera dabas muestras de desesperación, sino dabas cumplimiento a las palabras de la Escritura en el salmo 22. Ante el dolor nos sumergimos, olvidando levantar nuestras miradas a tu cruz, o acudiendo a tu auxilio cuando las cosas no han saildo como queremos y te sentimos que estás lejano. Sabemos que el silencio no significa lejanía tuya. Todo encaja contigo, mi dolor se une a tu dolor de cruz.\n\n                    Q: Por los méritos de tu dolorosa pasión...\nTodos: Te pedimos, escúchanos, Señor."
          },
          {
            "tipo": "sacerdote",
            "titulo": "5ª Palabra: \"Tengo sed\" (Jn 19, 28)",
            "texto": "Lector: Tu sed no era tanto material, tú tenías sed de mí, sed de las almas que andábamos perdidos en mundo de oscuridades, de injusticia, de violencias. Tú eres la fuente de agua viva, tú dijiste que el que de Ti tomase nunca jamás volvería a tener sed.\n\n                    Q: Por los méritos de tu dolorosa pasión...\nTodos: Te pedimos, escúchanos, Señor."
          },
          {
            "tipo": "sacerdote",
            "titulo": "6ª Palabra: \"Todo se ha cumplido\" (Jn 19, 30)",
            "texto": "Lector: Todo se ha llevado a término por el inmenso amor que le tenías a la humanidad. Las Escrituras se han cumplido en Ti de una manera perfecta. Y yo, que he sentido que he invertido todo en un mundo que a veces paga mal, me quedo paralizado y siento que no he logrado nada, pero viéndote a Ti todo toma sentido, mi vida es valiosa y mis obras, si van unidas con tu amor, sí son trascendentes. Ayúdame a no quejarme ante lo que no ha servido nada y a luchar por aquello que no entiendo, a saber que en Tí todo es posible y perfecto.\n\n                    Q: Por los méritos de tu dolorosa pasión...\nTodos: Te pedimos, escúchanos, Señor."
          },
          {
            "tipo": "sacerdote",
            "titulo": "7ª Palabra: \"Padre, en tus manos encomiendo mi espíritu\" (Lc 23, 46)",
            "texto": "Lector: En tus manos confío todo, te entrego mi ser, mi existir, que tus manos modelen mi fragilidad para ser en tu Iglesia, una arcilla en las manos del alfarero. Señor Jesús, te entrego también todos los proyectos en los que he fracasado y en los que tengo puesto un futuro, todo lo pongo ante tus manos para que se haga solamente tu voluntad.\n\n                    Q: Por los méritos de tu dolorosa pasión...\nTodos: Te pedimos, escúchanos, Señor."
          },
          {
            "tipo": "sacerdote",
            "titulo": "Oración final",
            "texto": "Q: Señor Jesús, con el deseo de cumplir siempre tu voluntad y confiando en tu misericordia, te pedimos que atiendas nuestras necesidades...\nTodos: Amén.\n\n            Q: En el nombre del Padre y del Hijo y del Espíritu Santo.\nTodos: Amén."
          }
        ]
      },
      {
        "id": "sec_4",
        "nombre": "4. Procesión del Silencio",
        "secciones": [
          {
            "tipo": "sacerdote",
            "texto": "7:00 PM | Toca para abrir"
          },
          {
            "tipo": "monicion",
            "titulo": "Monición Ambiental",
            "texto": "(Antes de iniciar la procesión)\n\n            Queridos hermanos: hemos vivido a lo largo de este día, la pasión poderosa de nuestro salvador. Su condena a muerte, el dolor en el camino hacia el Calvario, su agonía en la Cruz y su muerte por nuestra salvación. Ahora, como comunidad, nos preparamos para acompañar en silencio a la Santísima Virgen María desde el sepulcro donde reposa el cuerpo de Jesús, porque en ella, la Madre transida de dolor, reconocemos la figura de la Iglesia que fielmente aguarda la promesa de la Resurrección.\n\n            Nuestra procesión será en profunda calma, meditando en cada paso el sufrimiento de Cristo y la desolación de su Madre. A cada invocación responderemos: \"Ruega por Él y por nosotros a tu hijo, María\".\n\n            Comencemos nuestro camino, unidos en la fe y en el dolor."
          },
          {
            "tipo": "dialogo",
            "titulo": "Letanías a la Santísima Virgen María",
            "texto": "Madre de los dolores.\nR. Ruega por Él y por nosotros a tu hijo, María.\n\n                Madre herida en tu Corazón Inmaculado.\nR. Ruega por Él y por nosotros a tu hijo, María.\n\n                Refugio de los pecadores.\nR. Ruega por Él y por nosotros a tu hijo, María.\n\n                Consuelo de los afligidos.\nR. Ruega por Él y por nosotros a tu hijo, María.\n\n                Madre de los crucificados de nuestro tiempo.\nR. Ruega por Él y por nosotros a tu hijo, María.\n\n                Esperanza de los que lloran.\nR. Ruega por Él y por nosotros a tu hijo, María.\n\n                Fuerza de los abandonados.\nR. Ruega por Él y por nosotros a tu hijo, María."
          },
          {
            "tipo": "sacerdote",
            "titulo": "En el templo",
            "texto": "(Al llegar la procesión)\n\n            Hermanos: En este silencio hemos acompañado a la Virgen Dolorosa en la desolación y en la esperanza. Frente a la cruz desnuda, renovamos nuestra fe en la victoria de Cristo, sabiendo que del dolor ha nacido la salvación para el mundo. Dirijamos ahora nuestro ruego a la Madre del Salvador con la antigua y entrañable oración de la Iglesia."
          },
          {
            "tipo": "sacerdote",
            "titulo": "Estabat Mater",
            "texto": "La Madre piadosa estaba / junto a la Cruz y lloraba / mientras el Hijo pendía.\n\n                Cuya alma, triste y llorosa, / traspasada y dolorosa / fiero cuchillo tenía.\n\n                Oh, cuán triste y cuán aflicta / se vio la Madre bendita / de tantos tormentos llena.\n\n                Cuando triste contemplaba / y dolorosa miraba / del Hijo amado la pena.\n\n                Y ¿cuál hombre no llorara / si a la Madre contemplara / de Cristo en tanto dolor?\n\n                Y ¿quién no se entristeciera, / Madre piadosa, si os viera / recular a tal rigor?\n\n                Por los pecados del mundo / vio a Jesús en tan profundo / tormento la dulce Madre.\n\n                Vio morir al Hijo amado, / que rindió desamparado / el espíritu a su Padre.\n\n                Oh, Madre, fuente de amor, / hazme sentir tu dolor / para que llore contigo.\n\n                Y que, por mi Cristo amado, / mi corazón abrasado / más viva en Él que conmigo.\n\n                Y porque a amarle me anime, / en mi corazón imprime / las llagas que tuvo en sí.\n\n                Y de tu Hijo, Señora, / divide conmigo ahora / las que padeció por mí.\n\n                Hazme contigo llorar / y de veras lastimar / de sus penas mientras vivo.\n\n                Porque acompañar deseo / en la Cruz, donde le veo, / tu corazón compasivo.\n\n                Virgen de vírgenes santas, / llore yo con ansias tantas / que el llanto dulce me sea.\n\n                Porque su pasión y muerte / tenga en mi alma de suerte / que siempre sus penas vea.\n\n                Haz que su Cruz me enamore / y que en eLla viva y more / de mi fe y amor indicio.\n\n                Porque me inflame y encienda, / y contigo me defienda / en el día del juicio.\n\n                Haz que me ampare la muerte / de Cristo, cuando en tan fuerte / trance vida y alma estén.\n\n                Porque, cuando quede en calma / el cuerpo, vaya mi alma / a su eterna gloria. Amén.\n\n                Oración Final\n\n                Q: Oh Dios, tú has querido que la Virgen, Santa María, tuviera una vida atravesada por la espada del dolor y caminara como tu Hijo Jesucristo al monte de la crucifixión; concede a los que acudimos a Ella que sepamos caminar en la fe y unir nuestros sufrimientos a la pasión de Cristo, para que sean ocasión de gracia e instrumento de salvación para todos los hombres. Por Jesucristo nuestro Señor.\nTodos: Amén.\n\n    Parroquia de San Pedro Apóstol | Camino hacia la Pascua"
          }
        ]
      }
    ],
    "sacristia": {
      "reglasOro": [
        "El altar debe estar TOTALMENTE DESNUDO al inicio (sin manteles, sin velas, sin cruz).",
        "Tener preparada la Cruz velada para la ostensión y adoración.",
        "Tener listos dos ciriales para acompañar la Cruz y para el traslado del Santísimo desde el Monumento.",
        "Vestiduras ROJAS para el celebrante y diácono."
      ],
      "vestiduras": [
        "Casulla roja y estola roja para el celebrante.",
        "Albas y cíngulos para los acólitos."
      ],
      "altarYCredencia": [
        "Mantel de comunión doblado en la credencia (se coloca únicamente para el rito de comunión).",
        "Corporal, purificador y vaso con agua para purificar los dedos.",
        "Velo humeral rojo o blanco para traer el Santísimo del Monumento."
      ],
      "elementosEspeciales": [
        "Cruz grande de madera digna, cubierta con velo morado o rojo fácil de desvelar en tres partes.",
        "Cojín o paño para la base de la cruz durante la adoración.",
        "Matraca de madera para convocar al viacrucis y a la liturgia."
      ],
      "checklists": [
        {
          "momento": "Antes de la Celebración de la Pasión",
          "items": [
            {
              "id": "viernes_cruz_velada",
              "texto": "Cruz procesional o de adoración cubierta con velo en sacristía."
            },
            {
              "id": "viernes_altar_desnudo",
              "texto": "Confirmar altar sin ningún elemento decorativo."
            },
            {
              "id": "viernes_leccionario_pasion",
              "texto": "Leccionario abierto en la Pasión según San Juan (Jn 18–19)."
            },
            {
              "id": "viernes_humeral",
              "texto": "Velo humeral listo para el traslado de comunión."
            }
          ]
        }
      ]
    },
    "cantoral": [
      {
        "momento": "Ostensión de la Cruz",
        "titulo": "Mirad el Árbol de la Cruz",
        "tonalidad": "La Menor",
        "letra": "V. Mirad el árbol de la cruz, donde estuvo clavada la salvación del mundo.\nR. ¡Venid a adorar! ¡Venid a adorar!",
        "acordes": "Am - G - F - E / Am - Dm - E7 - Am"
      },
      {
        "momento": "Adoración de la Cruz",
        "titulo": "Pueblo Mío (Los Improperios)",
        "tonalidad": "Re Menor",
        "letra": "Pueblo mío, ¿qué te he hecho? ¿En qué te he ofendido? ¡Respóndeme!\nYo te saqué de Egipto y te guié por el desierto,\ny tú has preparado una cruz para tu Salvador.\n¡Santo Dios, Santo y Fuerte, Santo e Inmortal, ten piedad de nosotros!",
        "acordes": "Dm - Gm - A7 - Dm / Gm - C - F - Bb - A7 - Dm"
      },
      {
        "momento": "Viacrucis / Comunión",
        "titulo": "Oh Rostro Lacerado",
        "tonalidad": "Mi Menor",
        "letra": "Oh Rostro Lacerado, bañado en sudor,\nde espinas coronado, herido por mi amor.\nJesús, Cordero manso, clavado en una cruz,\nenséñanos a amarte, divina eterna luz.",
        "acordes": "Em - B7 - Em / Am - Em - B7 - Em"
      }
    ],
    "ministerios": {
      "monaguillos": [
        "Postrarse junto con el sacerdote al entrar al presbiterio en silencio total.",
        "Dos acólitos con ciriales encendidos acompañan la entrada de la Cruz y la reserva eucarística.",
        "No se utiliza incensario ni campanillas en ningún momento de la liturgia del Viernes Santo."
      ],
      "mec": [
        "Distribuir la Eucaristía con suma devoción en la sobriedad del rito de comunión.",
        "Colaborar en el acompañamiento a enfermos con el viático si fuera necesario."
      ],
      "lectores": [
        "Proclamar las 10 intenciones solemnes con dicción clara y pausas reverentes para la oración comunitaria.",
        "Ensayar con esmero el relato de la Pasión de San Juan."
      ],
      "ujieres": [
        "Guiar la fila de veneración de la Santa Cruz para que los fieles puedan adorar con orden (beso o genuflexión).",
        "Colecta pontificia obligatoria por los Santos Lugares de Tierra Santa."
      ]
    },
    "subsidios": [
      {
        "titulo": "Santo Viacrucis Parroquial (14 Estaciones)",
        "tipo": "viacrucis",
        "contenido": "1ª Estación: Jesús es condenado a muerte.\n«Te adoramos, oh Cristo, y te bendecimos, que por tu santa cruz redimiste al mundo».\n\n2ª Estación: Jesús carga con la cruz.\n3ª Estación: Jesús cae por primera vez.\n4ª Estación: Jesús encuentra a su afligida Madre.\n5ª Estación: Simón de Cirene ayuda a Jesús a llevar la cruz.\n6ª Estación: La Verónica enjuga el rostro de Jesús.\n7ª Estación: Jesús cae por segunda vez.\n8ª Estación: Jesús consuela a las santas mujeres de Jerusalén.\n9ª Estación: Jesús cae por tercera vez.\n10ª Estación: Jesús es despojado de sus vestiduras.\n11ª Estación: Jesús es clavado en la cruz.\n12ª Estación: Jesús muere en la cruz.\n13ª Estación: Jesús es bajado de la cruz y puesto en brazos de su Madre.\n14ª Estación: Jesús es colocado en el sepulcro.\n\nOración final por la esperanza de la Resurrección."
      },
      {
        "titulo": "Sermón de las Siete Palabras en la Cruz",
        "tipo": "sietepalabras",
        "contenido": "1ª Palabra: «Padre, perdónalos, porque no saben lo que hacen» (Lc 23, 34).\n2ª Palabra: «Hoy estarás conmigo en el paraíso» (Lc 23, 43).\n3ª Palabra: «Mujer, ahí tienes a tu hijo. Hijo, ahí tienes a tu madre» (Jn 19, 26-27).\n4ª Palabra: «Dios mío, Dios mío, ¿por qué me has abandonado?» (Mt 27, 46).\n5ª Palabra: «Tengo sed» (Jn 19, 28).\n6ª Palabra: «Todo está cumplido» (Jn 19, 30).\n7ª Palabra: «Padre, en tus manos encomiendo mi espíritu» (Lc 23, 46)."
      }
    ]
  },
  "vigilia": {
    "id": "vigilia",
    "titulo": "Solemne Vigilia Pascual en la Noche Santa",
    "subtitulo": "La Madre de Todas las Santas Vigilias: Lucernario, Pregón Pascual íntegro, 7 Lecturas del A.T., Bautismos y Eucaristía",
    "tiempo": "Triduo Pascual / Pascua",
    "color": "Blanco",
    "colorHex": "#FFFFFF",
    "lema": "«¿Por qué buscan entre los muertos al que vive? No está aquí, ¡ha resucitado!» (Lc 24, 5-6)",
    "descripcion": "Cumbre de todo el año cristiano. Celebramos el paso de las tinieblas a la luz mediante el Fuego Nuevo, el Cirio Pascual, la proclamación de las maravillas de la salvación, el Bautismo y la primera Misa de Resurrección.",
    "fechaSugerida": "2026-04-04",
    "partesMisal": [
      {
        "id": "sec_1",
        "nombre": "I. Lucernario",
        "secciones": [
          {
            "tipo": "sacerdote",
            "texto": "Fuego Nuevo y Pregón Pascual"
          },
          {
            "tipo": "rubrica",
            "titulo": "BENDICIÓN DEL FUEGO",
            "texto": "El que preside saluda como de costumbre al pueblo congregado y le hace una breve exhortación, con estas palabras u otras semejantes:\n\n            Hermanos: En esta noche santa, en que nuestro Señor Jesucristo pasó de la muerte a la vida, la Iglesia invita a todos sus hijos, diseminados por el mundo, a que se reúnan para velar en oración. Conmemoremos, pues, juntos, la Pascua del Señor, escuchando su palabra y participando en sus sacramentos, con la esperanza cierta de participar también en su triunfo sobre la muerte y de vivir con él para siempre en Dios.\n\n            Enseguida bendice el fuego.\n\n            Sacerdote: Oremos. Dios nuestro, que por medio de tu Hijo comunicaste a tus fieles el fuego de tu luz, santifica + este fuego nuevo y concédenos que, al celebrar estas fiestas pascuales se encienda en nosotros el deseo de las cosas celestiales, para que podamos llegar con un espíritu renovado a las fiestas de la eterna claridad. Por Jesucristo, nuestro Señor.\n\n            R. Amén.\n\n            Luego traza sobre el cirio pascual lo siguiente:\n\n                Cristo ayer y hoy,\n\n                Principio y fin,\n\n                Alfa\n\n                y Omega.\n\n                Suyo es el tiempo\n\n                y la eternidad.\n\n                A él la gloria y el poder,\n\n                por los siglos de los siglos. Amén.\n\n            Después de haber trazado la cruz, y los demás signos, el que preside puede incrustar en el cirio cinco granos de incienso, en forma de cruz, diciendo al mismo tiempo:\n\n                1. Por sus santas llagas (arriba superior)\n\n                2. gloriosas, (en el centro)\n\n                3. nos proteja (abajo inferior)\n\n                4. y nos guarde (centro izquierda)\n\n                5. Jesucristo nuestro Señor. Amén. (centro derecha)\n\n            El que preside enciende el cirio pascual diciendo:\n\n            Que la luz de Cristo, resucitado y glorioso, disipe las tinieblas de nuestro corazón y de nuestro espíritu."
          },
          {
            "tipo": "rubrica",
            "titulo": "PROCESIÓN",
            "texto": "A continuación el que preside toma el cirio pascual y, manteniéndolo elevado, canta él solo:\n\n            Luz de Cristo.\n\n            R. Demos gracias a Dios."
          },
          {
            "tipo": "rubrica",
            "titulo": "PREGÓN PASCUAL",
            "texto": "Se inciensa antes de proclamarse.\n\n            Alégrense, por fin, los coros de los ángeles, alégrense las jerarquías del cielo y por la victoria de Rey tan poderoso que las trompetas anuncien la salvación.\n\n            Goce también la tierra, inundada de tanta claridad y que, radiante con el fulgor del rey eterno, se sienta libre de la tiniebla que cubría el orbe entero.\n\n            Alégrese también nuestra madre la Iglesia, revestida de luz tan brillante; resuene este templo con las aclamaciones del pueblo.\n\n            Solo si es diácono el que proclama el pregón:\n\n            (Por eso queridos hermanos, que asisten a la admirable claridad de esta luz santa, invoquen conmigo la misericordia de Dios omnipotente, para que aquel que, sin mérito mío, me agregó al número de los ministros, complete mi alabanza en este cirio, infundiendo el resplandor de su luz).\n\n                El Señor esté con ustedes.\nR. Y con tu espíritu.\n\n                Levantemos el corazón.\nR. Lo tenemos levantado hacia el Señor.\n\n                Demos gracias al Señor, nuestro Dios.\nR. Es justo y necesario.\n\n            En verdad es justo y necesario aclamar con nuestras voces y con todo el afecto del corazón, a Dios invisible, el Padre todopoderoso, y a su único Hijo, nuestro Señor Jesucristo.\n\n            Porque él ha pagado por nosotros al eterno Padre la deuda de Adán y ha borrado con su sangre inmaculada, la condena del antiguo pecado.\n\n            Porque éstas son las fiestas de Pascua, en las que se inmola el verdadero Cordero, cuya sangre consagra las puertas de los fieles.\n\n            Esta es la noche en que sacaste de Egipto a los israelitas, nuestros padres, y los hiciste pasar a pie el mar Rojo.\n\n            Esta es la noche en que la columna de fuego esclareció las tinieblas del pecado.\n\n            Esta es la noche que a todos los que creen en Cristo, por toda la tierra, los arranca de los vicios del mundo y de la oscuridad del pecado, los restituye a la gracia y los agrega a los santos.\n\n            Esta es la noche en que, rotas las cadenas de la muerte, Cristo asciende victorioso del abismo.\n\n            ¡Qué asombroso beneficio de tu amor por nosotros! ¡Qué incomparable ternura y caridad! ¡Para rescatar al esclavo entregaste al Hijo!\n\n            Necesario fue el pecado de Adán, que ha sido borrado por la muerte de Cristo.\n\n            ¡Feliz la culpa que mereció tal Redentor!\n\n            Y así, esta noche santa ahuyenta los pecados, lava las culpas, devuelve la inocencia a los caídos, la alegría a los tristes.\n\n            ¡Qué noche tan dichosa, en que se une el cielo con la tierra, lo humano con lo divino!\n\n            En esta noche de gracia, acepta, Padre santo, el sacrificio vespertino de alabanza que la santa Iglesia te ofrece en la solemne ofrenda de este cirio, obra de las abejas.\n\n            Te rogamos, Señor, que este cirio, consagrado a tu nombre para destruir la oscuridad de esta noche, arda sin apagarse y, aceptado como perfume, se asocie a las lumbreras del cielo.\n\n            Que el lucero matinal lo encuentre ardiendo, ese lucero que no conoce ocaso, Jesucristo, tu Hijo, que volviendo del abismo, brilla sereno para el linaje humano y vive y reina por los siglos de los siglos.\n\n            R. Amén."
          }
        ]
      },
      {
        "id": "sec_2",
        "nombre": "II. Liturgia de la Palabra",
        "secciones": [
          {
            "tipo": "rubrica",
            "texto": "Antiguo Testamento\n\n            Terminado el pregón, todos apagan sus velas y se sientan. Antes de comenzar las lecturas, el que preside exhorta a la asamblea con estas palabras u otras semejantes.\n\n            Sacerdote: Hermanos, habiendo iniciado solemnemente la Vigilia Pascual, escuchemos con recogimiento la Palabra de Dios. Meditemos cómo, en la antigua alianza, Dios salvó a su pueblo y en la plenitud de los tiempos, envió al mundo a su Hijo para que nos redimiera. Oremos para que Dios, lleve a su plenitud esta obra de la redención, realizada por el misterio pascual.\n\n                PRIMERA LECTURA\n\n                Vio Dios todo lo que había hecho y lo encontró muy bueno.\n\n                Del libro del Génesis 1, 1. 26-31\n\n                En el principio creó Dios el cielo y la tierra. Y dijo Dios: \"Hagamos al hombre a nuestra imagen y semejanza; que domine a los peces del mar, a las aves del cielo, a los animales domésticos y a todo animal que se arrastra sobre la tierra\".\n\n                Y creó Dios al hombre a su imagen; a imagen suya lo creó; hombre y mujer los creó. Y los bendijo Dios y les dijo: \"Sean fecundos y multiplíquense, llenen la tierra y sométanla; dominen a los peces del mar, a las aves del cielo y a todo ser viviente que se mueve sobre la tierra\".\n\n                Y dijo Dios \"He aquí que les entrego todas las plantas de semilla que hay sobre la faz de la tierra, y todos los árboles que producen fruto y semilla, para que les sirvan de alimento. Y a todas la fieras de la tierra, a todas las aves del cielo, a todos los reptiles de la tierra, a todos los seres que respiran, también les doy por alimento las verdes plantas\". Y así fue. Vio Dios todo lo que había hecho y lo encontró muy bueno.\n\n                Palabra de Dios.\nR. Te alabamos, Señor.\n\n                SALMO RESPONSORIAL (Salmo 103)\n\n                R. Bendice al Señor, alma mía.\n\n                Bendice al Señor, alma mía; Señor y Dios mío, inmensa es tu grandeza. Te vistes de belleza y majestad, la luz te envuelve como un manto. R.\n\n                Sobre bases inconmovibles asentaste la tierra para siempre. Con un vestido de mares la cubriste y las aguas en los montes concentraste. R.\n\n                En los valles haces brotar las fuentes, que van corriendo entre montañas; junto al arroyo vienen a vivir las aves, que cantan entre las ramas. R.\n\n                Desde tu cielo riegas los montes y sacias la tierra del fruto de tus manos; haces brotar hierba para los ganados y pasto para los que sirven al hombre. R.\n\n                ¡Qué numerosas son tus obras, Señor, y todas las hiciste con maestría! La tierra está llena de tus creaturas. Bendice al Señor, alma mía. R.\n\n                ORACIÓN DESPUÉS DE LA LECTURA\n\n                Sacerdote: Oremos. Dios todopoderoso y eterno, que en todas las obras de tu amor te muestras admirable, concede a quienes has redimido, comprender que el sacrificio de Cristo, nuestra Pascua, en la plenitud de los tiempos, es una obra más maravillosa todavía que la misma creación del mundo. Por Jesucristo, nuestro Señor.\nR. Amén.\n\n                SEGUNDA LECTURA\n\n                El sacrificio de nuestro patriarca Abraham.\n\n                Del libro del Génesis 22, 1-18\n\n                En aquel tiempo, Dios le puso una prueba a Abraham y le dijo: ¡Abraham, Abraham!\" El respondió: “Aquí estoy\". Y Dios le dijo: \"Toma a tu hijo único, Isaac, a quien tanto amas; vete a la región de Moria y ofrécemelo en sacrificio, en el monte que yo te indicaré\".\n\n                Abraham madrugó, aparejó su burro, tomó consigo a dos de sus criados y a su hijo Isaac; cortó leña para el sacrificio y se encaminó al lugar que Dios le había indicado. Al tercer día divisó a lo lejos el lugar. Les dijo entonces a sus criados: \"Quédense aquí con el burro; yo iré con el muchacho hasta allá, para adorar a Dios y después regresaremos\".\n\n                Abraham tomó la leña para el sacrificio, se la cargó a su hijo Isaac y tomó en su mano el fuego y el cuchillo. Los dos caminaban juntos. Isaac dijo a su padre Abraham: \"¡Padre!\" El respondió: \"¿Qué quieres, hijo?\" El muchacho contestó: \"Ya tenemos fuego y leña, pero, ¿dónde está el cordero para el sacrificio?\" Abraham le contestó: \"Dios nos dará el cordero para el sacrificio, hijo mío\". Y siguieron caminando juntos.\n\n                Cuando llegaron al sitio que Dios le había señalado, Abraham levantó un altar y acomodó la leña. Luego ató a su hijo Isaac, lo puso sobre el altar, encima de la leña, y tomó el cuchillo para degollarlo. Pero el ángel del Señor lo llamó desde el cielo y le dijo: \"¡Abraham, Abraham!\" El contestó: \"Aquí estoy\". El ángel le dijo: \"No descargues la mano contra tu hijo, ni le hagas daño. Ya veo que temes a Dios, porque no le has negado a tu hijo único\".\n\n                Abraham levantó los ojos y vio un carnero, enredado por los cuernos en la maleza. Atrapó el carnero y lo ofreció en sacrificio, en lugar de su hijo. Abraham puso por nombre a aquel sitio \"el Señor provee\", por lo que aun el día de hoy se dice: \"el monte donde el Señor provee\".\n\n                El ángel del Señor volvió a llamar a Abraham desde el cielo y le dijo: \"Juro por mí mismo, dice el Señor, que por haber hecho esto y no haberme negado a tu hijo único, yo te bendeciré y multiplicaré tu descendencia como las estrellas del cielo y las arenas del mar. Tus descendientes conquistarán las ciudades enemigas. En tu descendencia serán bendecidos todos los pueblos de la tierra, porque obedeciste a mis palabras\".\n\n                Palabra de Dios.\nR. Te alabamos, Señor.\n\n                SALMO RESPONSORIAL (Salmo 15)\n\n                R. Protégeme, Dios mío, porque me refugio en ti.\n\n                El Señor es la parte que me ha tocado en herencia: mi vida está en sus manos. Tengo siempre presente al Señor y con él a mi lado, jamás tropezaré. R.\n\n                Por eso se me alegran el corazón y el alma y mi cuerpo vivirá tranquilo, porque tú no me abandonarás a la muerte, ni dejarás que sufra yo la corrupción. R.\n\n                Enséñame el camino de la vida, sáciame de gozo en tu presencia y de alegría perpetua junto a ti. R.\n\n                ORACIÓN DESPUÉS DE LA LECTURA\n\n                Sacerdote: Oremos. Dios nuestro, excelso Padre de los creyentes, que por medio de la gracia de la adopción y por el misterio pascual sigues cumpliendo la promesa hecha a Abraham de multiplicar su descendencia por toda la tierra y de hacerlo el padre de todas las naciones, concede a tu pueblo responder dignamente a la gracia de tu llamada. Por Jesucristo, nuestro Señor.\nR. Amén.\n\n                TERCERA LECTURA\n\n                Los israelitas entraron en el mar sin mojarse.\n\n                Del libro del Éxodo 14, 15-15, 1\n\n                En aquellos días, dijo el Señor a Moisés: \"¿Por qué sigues clamando a mí? Diles a los israelitas que se pongan en marcha. Y tú, alza tu bastón, extiende tu mano sobre el mar y divídelo, para que los israelitas entren en el mar sin mojarse. Yo voy a endurecer el corazón de los egipcios para que los persigan, y me cubriré de gloria a expensas del faraón y de todo su ejército, de sus carros y jinetes. Cuando me haya cubierto de gloria a expensas del faraón, de sus carros y jinetes, los egipcios sabrán que yo soy el Señor\".\n\n                El ángel del Señor, que iba al frente de las huestes de Israel, se colocó tras ellas. Y la columna de nubes que iba adelante, también se desplazó y se puso a sus espaldas, entre el campamento de los israelitas y el campamento de los egipcios. La nube era tinieblas para unos y claridad para otros, y así los ejércitos no trabaron contacto durante toda la noche.\n\n                Moisés extendió la mano sobre el mar, y el Señor hizo soplar durante toda la noche un fuerte viento del este, que secó el mar, y dividió las aguas. Los israelitas entraron en el mar y no se mojaban, mientras las aguas formaban una muralla a su derecha y a su izquierda. Los egipcios se lanzaron en su persecución y toda la caballería del faraón, sus carros y jinetes, entraron tras ellos en el mar.\n\n                Hacia el amanecer, el Señor miró desde la columna de fuego y humo al ejército de los egipcios y sembró entre ellos el pánico. Trabó las ruedas de sus carros, de suerte que no avanzaban sino pesadamente. Dijeron entonces los egipcios: \"Huyamos de Israel, porque el Señor lucha en su favor contra Egipto\".\n\n                Entonces el Señor le dijo a Moisés: \"Extiende tu mano sobre el mar, para que vuelvan las aguas sobre los egipcios, sus carros y sus jinetes\". Y extendió Moisés su mano sobre el mar, y al amanecer, las aguas volvieron a su sitio, de suerte que al huir, los egipcios se encontraron con ellas, y el Señor los derribó en medio del mar. Volvieron las aguas y cubrieron los carros, a los jinetes y a todo el ejército del faraón, que se había metido en el mar para perseguir a Israel. Ni uno solo se salvó.\n\n                Pero los hijos de Israel caminaban por lo seco en medio del mar. Las aguas les hacían muralla a derecha e izquierda. Aquel día salvó el Señor a Israel de las manos de Egipto. Israel vio a los egipcios, muertos en la orilla del mar. Israel vio la mano fuerte del Señor sobre los egipcios, y el pueblo temió al Señor y creyó en el Señor y en Moisés, su siervo. Entonces Moisés y los hijos de Israel cantaron este cántico al Señor:\n\n                SALMO RESPONSORIAL (Ex 15)\n\n                R. Alabemos al Señor por su victoria.\n\n                Cantemos al Señor, sublime es su victoria: caballos y jinetes arrojó en el mar. Mi fortaleza y mi canto es el Señor, él es mi salvación; él es mi Dios, y yo lo alabaré, es el Dios de mis padres, y yo le cantaré. R.\n\n                El Señor es un guerrero, su nombre es el Señor. Precipitó en el mar los carros del faraón y a sus guerreros; ahogó en el mar Rojo a sus mejores capitanes. R.\n\n                Las olas los cubrieron, cayeron hasta el fondo, como piedras. Señor, tu diestra brilla por su fuerza, tu diestra, Señor, tritura al enemigo. R.\n\n                Tú llevas a tu pueblo para plantarlo en el monte que le diste en herencia, en el lugar que convertiste en tu morada, en el santuario que construyeron tus manos. Tú, Señor, reinarás para siempre. R.\n\n                ORACIÓN DESPUÉS DE LA LECTURA\n\n                Sacerdote: Oremos. Señor Dios, cuyos antiguos prodigios los recibimos resplandeciendo también en nuestros tiempos, puesto que aquello mismo que realizó la diestra de tu poder para librar a un solo pueblo de la esclavitud del faraón, lo sigues realizando también ahora, por medio del agua del bautismo, para salvar a todas las naciones, concede que todos los hombres del mundo lleguen a contarse entre los hijos de Abraham y participen de la dignidad del pueblo elegido. Por Jesucristo, nuestro Señor.\nR. Amén.\n\n                CUARTA LECTURA\n\n                Con amor eterno se ha apiadado de ti tu redentor.\n\n                Del libro del profeta Isaías 54, 5-14\n\n                El que te creó, te tomará por esposa; su nombre es 'Señor de los ejércitos'. Tu redentor es el Santo de Israel; será llamado 'Dios de toda la tierra'.\n\n                Como a una mujer abandonada y abatida te vuelve a llamar el Señor. ¿Acaso repudia uno a la esposa de la juventud?, dice tu Dios. Por un instante te abandoné, pero con inmensa misericordia te volveré a tomar. En un arrebato de ira te oculté un instante mi rostro, pero con amor eterno me he apiadado de ti, dice el Señor, tu redentor.\n\n                Me pasa ahora como en los días de Noé: entonces juré que las aguas del diluvio no volverían a cubrir la tierra; ahora juro no enojarme ya contra ti ni volver a amenazarte. Podrán desaparecer los montes y hundirse las colinas, pero mi amor por ti no desaparecerá y mi alianza de paz quedará firme para siempre. Lo dice el Señor, el que se apiada de ti.\n\n                Tú, la afligida, la zarandeada por la tempestad, la no consolada: He aquí que yo mismo coloco tus piedras sobre piedras finas, tus cimientos sobre zafiros; te pondré almenas de rubí y puertas de esmeralda y murallas de piedras preciosas. Todos tus hijos serán discípulos del Señor, y será grande su prosperidad. Serás consolidada en la justicia. Destierra la angustia, pues ya nada tienes que temer; olvida tu miedo, porque ya no se acercará a ti\".\n\n                Palabra de Dios.\nR. Te alabamos, Señor.\n\n                SALMO RESPONSORIAL (Salmo 29)\n\n                R. Te alabaré, Señor, eternamente.\n\n                Te alabaré, Señor, pues no dejaste que se rieran de mí mis enemigos. Tú, Señor, me salvaste de la muerte y a punto de morir, me reviviste. R.\n\n                Alaben al Señor quienes lo aman, den gracias a su nombre, porque su ira dura un solo instante y su bondad, toda la vida. El llanto nos visita por la tarde; por la mañana, el júbilo. R.\n\n                Escúchame, Señor, y compadécete; Señor, ven en mi ayuda. Convertiste mi duelo en alegría, te alabaré por eso eternamente. R.\n\n                ORACIÓN DESPUÉS DE LA LECTURA\n\n                Sacerdote: Oremos. Dios todopoderoso y eterno, multiplica en honor a tu nombre, cuanto prometiste a nuestros padres en la fe y acrecienta la descendencia por ti prometida mediante la santa adopción filial, para que aquello que los antiguos patriarcas no dudaron de que habría de acontecer, tu Iglesia advierta que ya está en gran parte cumplido. Por Jesucristo, nuestro Señor.\nR. Amén.\n\n                QUINTA LECTURA\n\n                Vengan a mí y vivirán. Sellaré con ustedes una alianza perpetua.\n\n                Del libro del profeta Isaías 55, 1-11\n\n                Esto dice el Señor: \"Todos ustedes, los que tienen sed, vengan por agua; y los que no tienen dinero, vengan, tomen trigo y coman; tomen vino y leche sin pagar. ¿Por qué gastar el dinero en lo que no es pan y el salario, en lo que no alimenta? Escúchenme atentos y comerán bien, saborearán platillos sustanciosos. Préstenme atención, vengan a mí, escúchenme y vivirán.\n\n                Sellaré con ustedes una alianza perpetua, cumpliré las promesas que hice a David. Como a él lo puse por testigo ante los pueblos, como príncipe y soberano de las naciones, así tú reunirás a un pueblo desconocido, y las naciones que no te conocían acudirán a ti, por amor del Señor, tu Dios, por el Santo de Israel, que te ha honrado.\n\n                Busquen al Señor mientras lo pueden encontrar, invóquenlo mientras está cerca; que el malvado abandone su camino, y el criminal, sus planes; que regrese al Señor, y él tendrá piedad; a nuestro Dios, que es rico en perdón.\n\n                Mis pensamientos no son los pensamientos de ustedes, sus caminos no son mis caminos. Porque así como aventajan los cielos a la tierra, así aventajan mis caminos a los de ustedes y mis pensamientos a sus pensamientos.\n\n                Como bajan del cielo la lluvia y la nieve y no vuelven allá, sino después de empapar la tierra, de fecundarla y hacerla germinar, a fin de que dé semilla para sembrar y pan para comer, así será la palabra que sale de mi boca: no volverá a mí sin resultado, sino que hará mi voluntad y cumplirá su misión\".\n\n                Palabra de Dios.\nR. Te alabamos, Señor.\n\n                SALMO RESPONSORIAL (Isaías 12)\n\n                R. El Señor es mi Dios y salvador.\n\n                El Señor es mi Dios y salvador: con él estoy seguro y nada temo. El Señor es mi protección y mi fuerza, y ha sido mi salvación. Sacarán agua con gozo de la fuente de salvación. R.\n\n                Den gracias al Señor, invoquen su nombre, cuenten a los pueblos sus hazañas, proclamen que su nombre es sublime. R.\n\n                Alaben al Señor por sus proezas, anúncienlas a toda la tierra. Griten jubilosos, habitantes de Sión, porque el Dios de Israel ha sido grande con ustedes. R.\n\n                ORACIÓN DESPUÉS DE LA LECTURA\n\n                Sacerdote: Oremos. Dios todopoderoso y eterno, única esperanza del mundo, tú que anunciaste por la voz de tus profetas, los misterios que estamos celebrando esta noche, multiplica en el corazón de tu pueblo los santos propósitos porque no podría ningún santo anhelo alcanzar crecimiento sin el impulso que procede de ti. Por Jesucristo, nuestro Señor.\nR. Amén.\n\n                SEXTA LECTURA\n\n                Sigue el camino que te conduce a la luz del Señor.\n\n                Del libro del profeta Baruc 3, 9-15. 32-4, 4\n\n                Escucha, Israel, los mandatos de vida, presta oído para que adquieras prudencia. ¿A qué se debe, Israel, que estés aún en país enemigo, que envejezcas en tierra extranjera, que te hayas contaminado por el trato con los muertos, que te veas contado entre los que descienden al abismo?\n\n                Es que abandonaste la fuente de la sabiduría. Si hubieras seguido los senderos de Dios, habitarías en paz eternamente. Aprende dónde están la prudencia, la inteligencia y la energía, así aprenderás dónde se encuentra el secreto de vivir larga vida, y dónde la luz de los ojos y la paz.\n\n                ¿Quién es el que halló el lugar de la sabiduría y tuvo acceso a sus tesoros? El que todo lo sabe, la conoce; con su inteligencia la ha escudriñado. El que cimentó la tierra para todos los tiempos, y la pobló de animales cuadrúpedos; el que envía la luz, y ella va, la llama, y temblorosa le obedece; llama a los astros, que brillan jubilosos en sus puestos de guardia, y ellos le responden: \"Aquí estamos\", y refulgen gozosos para aquel que los hizo.\n\n                Él es nuestro Dios y no hay otro como él; él ha escudriñado los caminos de la sabiduría y se la dio a su hijo Jacob, a Israel, su predilecto. Después de esto, ella apareció en el mundo y convivió con los hombres. La sabiduría es el libro de los mandatos de Dios, la ley de validez eterna; los que la guardan, vivirán, los que la abandonan, morirán.\n\n                Vuélvete a ella, Jacob, y abrázala; camina hacia la claridad de su luz; no entregues a otros tu gloria, ni tu dignidad a un pueblo extranjero. Bienaventurados nosotros, Israel, porque lo que agrada al Señor nos ha sido revelado.\n\n                Palabra de Dios.\nR. Te alabamos, Señor.\n\n                SALMO RESPONSORIAL (Salmo 18)\n\n                R. Tú tienes, Señor, palabras de vida eterna.\n\n                La ley del Señor es perfecta del todo y reconforta el alma; inmutables son las palabras del Señor y hacen sabio al sencillo. R.\n\n                En los mandamientos del Señor hay rectitud y alegría para el corazón; son luz los preceptos del Señor para alumbrar el camino. R.\n\n                La voluntad de Dios es santa y para siempre estable; los mandatos del Señor son verdaderos y enteramente justos. R.\n\n                Más deseables que el oro y las piedras preciosas las normas del Señor, y más dulces que la miel de un panal que gotea. R.\n\n                ORACIÓN DESPUÉS DE LA LECTURA\n\n                Sacerdote: Oremos. Dios nuestro, que haces crecer continuamente a tu Iglesia con hijos llamados de todos los pueblos, dígnate proteger siempre con tu gracia a quienes has purificado con el agua del bautismo. Por Jesucristo, nuestro Señor.\nR. Amén.\n\n                SÉPTIMA LECTURA\n\n                Los rociaré con agua pura y les daré un corazón nuevo.\n\n                Del libro del profeta Ezequiel 36, 16-28\n\n                En aquel tiempo, me fue dirigida la palabra del Señor en estos términos: \"Hijo de hombre, cuando los de la casa de Israel habitaban en su tierra, la mancharon con su conducta y con sus obras; como inmundicia fue su proceder ante mis ojos. Entonces descargué mi furor contra ellos, por la sangre que habían derramado en el país y por haberlo profanado con sus idolatrías. Los dispersé entre las naciones y anduvieron errantes por todas las tierras. Los juzgué según su conducta, según sus acciones los sentencié. Y en las naciones a las que se fueron, desacreditaron mi santo nombre, haciendo que de ellos se dijera: 'Este es el pueblo del Señor, y ha tenido que salir de su tierra'.\n\n                Pero, por mi santo nombre, que la casa de Israel profanó entre las naciones a donde llegó, me he compadecido. Por eso, dile a la casa de Israel: 'Esto dice el Señor: no lo hago por ustedes, casa de Israel. Yo mismo mostraré la santidad de mi nombre excelso, que ustedes profanaron entre las naciones. Entonces, ellas reconocerán que yo soy el Señor, cuando, por medio de ustedes les haga ver mi santidad.\n\n                Los sacaré a ustedes de entre las naciones, los reuniré de todos los países y los llevaré a su tierra. Los rociaré con agua pura y quedarán purificados; los purificaré de todas sus inmundicias e idolatrías. Les daré un corazón nuevo y les infundiré un espíritu nuevo; arrancaré de ustedes el corazón de piedra y les daré un corazón de carne. Les infundiré mi espíritu y los haré vivir según mis preceptos y guardar y cumplir mis mandamientos. Habitarán en la tierra que di a sus padres; ustedes serán mi pueblo y yo seré su Dios'\".\n\n                Palabra de Dios.\nR. Te alabamos, Señor.\n\n                SALMO RESPONSORIAL (Salmos 41 y 42)\n\n                R. Estoy sediento del Dios que da la vida.\n\n                Como el venado busca el agua de los ríos, así, cansada, mi alma te busca a ti, Dios mío. R.\n\n                Del Dios que da la vida está mi ser sediento. ¿Cuándo será posible ver de nuevo su templo? R.\n\n                Recuerdo cuando íbamos a casa del Señor, cantando, jubilosos, alabanzas a Dios. R.\n\n                Envíame, Señor, tu luz y tu verdad; que ellas se conviertan en mi guía y hasta tu monte santo me conduzcan, allí donde tú habitas. R.\n\n                Al altar del Señor me acercaré, al Dios que es mi alegría, y a mi Dios, el Señor, le daré gracias al compás de la cítara. R.\n\n                ORACIÓN DESPUÉS DE LA LECTURA\n\n                Sacerdote: Oremos. Dios de inmutable poder y eterna luz, mira propicio el admirable misterio de la Iglesia entera y realiza serenamente, en virtud de tu eterno designio, la obra de la humana salvación; que todo el mundo vea y reconozca que los caídos se levantan, que se renueva lo que había envejecido y que por obra de Jesucristo todas las cosas concurren hacia la unidad que tuvieron en el origen. Él que vive y reina por los siglos de los siglos.\nR. Amén."
          }
        ]
      },
      {
        "id": "sec_3",
        "nombre": "III. Epístola y Evangelio",
        "secciones": [
          {
            "tipo": "sacerdote",
            "texto": "El Regreso del Gloria y Aleluya\n\n            Terminada la oración de la última lectura del Antiguo Testamento, con el responsorio y la oración correspondiente, se encienden las velas del altar. El que preside entona solemnemente el Gloria, que todos prosiguen y se tocan las campanas.\n\n            Gloria a Dios en el cielo..."
          },
          {
            "tipo": "rubrica",
            "titulo": "ORACIÓN COLECTA",
            "texto": "Después del Gloria, el que preside dice la Oración Colecta, como de ordinario.\n\n            Sacerdote: Oremos. Dios nuestro, que haces resplandecer esta noche con la gloria de la resurrección del Señor, aviva en tu Iglesia el espíritu de la adopción filial, para que, renovados en cuerpo y alma, nos entreguemos fielmente a tu servicio. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos.\n\n            R. Amén."
          },
          {
            "tipo": "lectura",
            "titulo": "EPÍSTOLA",
            "texto": "Cristo, una vez resucitado de entre los muertos, ya nunca morirá.\n\n            De la carta del apóstol san Pablo a los romanos 6, 3-11\n\n            Hermanos: Todos los que hemos sido incorporados a Cristo Jesús por medio del bautismo, hemos sido incorporados a su muerte. En efecto, por el bautismo fuimos sepultados con él en su muerte, para que, así como Cristo resucitó de entre los muertos por la gloria del Padre, así también nosotros llevemos una vida nueva.\n\n            Porque, si hemos estado íntimamente unidos a él por una muerte semejante a la suya, también lo estaremos en su resurrección. Sabemos que nuestro viejo yo fue crucificado con Cristo, para que el cuerpo del pecado quedara destruido, a fin de que ya no sirvamos al pecado, pues el que ha muerto queda libre del pecado.\n\n            Por lo tanto, si hemos muerto con Cristo, estamos seguros de que también viviremos con él; pues sabemos que Cristo, una vez resucitado de entre los muertos, ya nunca morirá. La muerte ya no tiene dominio sobre él, porque al morir, murió al pecado de una vez para siempre; y al resucitar, vive ahora para Dios. Lo mismo ustedes, considérense muertos al pecado y vivos para Dios en Cristo Jesús, Señor nuestro.\n\n            Palabra de Dios.\nR. Te alabamos, Señor."
          },
          {
            "tipo": "lectura",
            "titulo": "SALMO RESPONSORIAL (Salmo 117)",
            "texto": "R. Aleluya, aleluya.\n\n            Te damos gracias, Señor, porque eres bueno, porque tu misericordia es eterna. Diga la casa de Israel: \"Su misericordia es eterna\". R.\n\n            La diestra del Señor es poderosa, la diestra del Señor es nuestro orgullo. No moriré, continuaré viviendo, para contar lo que el Señor ha hecho. R.\n\n            La piedra que desecharon los constructores, es ahora la piedra angular. Esto es obra de la mano del Señor, es un milagro patente. R."
          },
          {
            "tipo": "lectura",
            "titulo": "EVANGELIO",
            "texto": "Ha resucitado e irá delante de ustedes a Galilea.\n\n            Lectura del santo Evangelio según san Mateo 28, 1-10\n\n            Transcurrido el sábado, al amanecer del primer día de la semana, María Magdalena y la otra María fueron a ver el sepulcro. De pronto se produjo un gran temblor, porque el ángel del Señor bajó del cielo y acercándose al sepulcro, hizo rodar la piedra que lo tapaba y se sentó encima de ella.\n\n            Su rostro brillaba como el relámpago y sus vestiduras eran blancas como la nieve. Los guardias, atemorizados ante él, se pusieron a temblar y se quedaron como muertos.\n\n            El ángel se dirigió a las mujeres y les dijo: \"No teman. Ya sé que buscan a Jesús, el crucificado. No está aquí; ha resucitado, como lo había dicho. Vengan a ver el lugar donde lo habían puesto. Y ahora, vayan de prisa a decir a sus discípulos: 'Ha resucitado de entre los muertos e irá delante de ustedes a Galilea; allá lo verán'. Eso es todo\".\n\n            Ellas se alejaron a toda prisa del sepulcro, y llenas de temor y de gran alegría, corrieron a dar la noticia a los discípulos. Pero de repente Jesús les salió al encuentro y las saludó. Ellas se le acercaron, le abrazaron los pies y lo adoraron. Entonces les dijo Jesús: \"No tengan miedo. Vayan a decir a mis hermanos que se dirijan a Galilea. Allá me verán\".\n\n            Palabra del Señor.\nR. Gloria a ti, Señor Jesús.\n\n            HOMILÍA"
          }
        ]
      },
      {
        "id": "sec_4",
        "nombre": "IV. Liturgia Bautismal",
        "secciones": [
          {
            "tipo": "rubrica",
            "texto": "Agua y Renovación de Promesas\n\n            El que preside exhorta a los presentes, con estas u otras palabras semejantes.\n\n            Sacerdote: Hermanos, acompañemos con nuestra oración a estos catecúmenos que anhelan renacer a nueva vida en la fuente del bautismo, para que Dios, nuestro Padre, les otorgue su protección y su amor."
          },
          {
            "tipo": "dialogo",
            "titulo": "LETANÍAS DE LOS SANTOS",
            "texto": "Señor, ten piedad de nosotros\nR. Señor, ten piedad de nosotros.\n\n                    Cristo, ten piedad de nosotros\nR. Cristo, ten piedad de nosotros.\n\n                    Señor, ten piedad de nosotros\nR. Señor, ten piedad de nosotros.\n\n                    Santa María, Madre de Dios\nR. Ruega por nosotros.\n\n                    San Miguel\nR. Ruega por nosotros.\n\n                    Santos Ángeles de Dios\nR. Rueguen por nosotros.\n\n                    San Juan Bautista\nR. Ruega por nosotros.\n\n                    San José\nR. Ruega por nosotros.\n\n                    Santos Pedro y Pablo\nR. Rueguen por nosotros.\n\n                    San Andrés\nR. Ruega por nosotros.\n\n                    San Juan\nR. Ruega por nosotros.\n\n                    Santa María Magdalena\nR. Ruega por nosotros.\n\n                    San Esteban\nR. Ruega por nosotros.\n\n                    San Ignacio de Antioquia\nR. Ruega por nosotros.\n\n                    San Lorenzo\nR. Ruega por nosotros.\n\n                    Santas Perpetua y Felicitas\nR. Rueguen por nosotros.\n\n                    Santa Inés\nR. Ruega por nosotros.\n\n                    San Gregorio\nR. Ruega por nosotros.\n\n                    San Agustín\nR. Ruega por nosotros.\n\n                    San Atanasio\nR. Ruega por nosotros.\n\n                    San Basilio\nR. Ruega por nosotros.\n\n                    San Martín\nR. Ruega por nosotros.\n\n                    San Benito\nR. Ruega por nosotros.\n\n                    Santos Francisco y Domingo\nR. Rueguen por nosotros.\n\n                    San Francisco Javier\nR. Ruega por nosotros.\n\n                    San Juan María Vianney\nR. Ruega por nosotros.\n\n                    Santa Catalina de Siena\nR. Ruega por nosotros.\n\n                    Santa Teresa de Jesús\nR. Ruega por nosotros.\n\n                    Santos y Santas de Dios\nR. Rueguen por nosotros.\n\n                Muéstrate propicio\nR. Líbranos, Señor.\n\n                De todo mal\nR. Líbranos, Señor.\n\n                De todo pecado\nR. Líbranos, Señor.\n\n                De la muerte eterna\nR. Líbranos, Señor.\n\n                Por tu encarnación\nR. Líbranos, Señor.\n\n                Por tu muerte y resurrección\nR. Líbranos, Señor.\n\n                Por el don del Espíritu Santo\nR. Líbranos, Señor.\n\n                Nosotros, que somos pecadores\nR. Te rogamos, óyenos.\n\n                Para que te dignes comunicar tu propia vida a quienes has llamado al bautismo.\nR. Te rogamos, óyenos.\n\n                Jesús, Hijo de Dios vivo.\nR. Te rogamos, óyenos.\n\n                Cristo, óyenos.\nR. Cristo, óyenos.\n\n                Cristo, escúchanos.\nR. Cristo, escúchanos.\n\n            El que preside, con las manos juntas, dice la siguiente oración:\n\n            Derrama, Señor, tu infinita bondad en este sacramento del bautismo y envía a tu santo Espíritu, para que haga renacer de la fuente bautismal a estos nuevos hijos tuyos, que van a ser santificados por tu gracia, mediante nuestra humilde colaboración de este ministerio. Por Jesucristo, nuestro Señor.\n\n            R. Amén."
          },
          {
            "tipo": "rubrica",
            "titulo": "BENDICIÓN DEL AGUA BAUTISMAL",
            "texto": "Enseguida el que preside bendice el agua bautismal, diciendo con las manos juntas, la siguiente oración:\n\n            Dios nuestro, que con tu poder invisible realizas obras admirables por medio de los signos sacramentales y has hecho que tu creatura, el agua, signifique de muchas maneras la gracia del bautismo.\n\n            Dios nuestro, cuyo Espíritu aleteaba sobre la superficie de las aguas en los mismos principios del mundo, para que ya desde entonces el agua recibiera el poder de dar la vida;\n\n            Dios nuestro, que incluso en las aguas torrenciales del diluvio prefiguraste el nuevo nacimiento de los hombres, al hacer que de una manera misteriosa, un mismo elemento diera fin al pecado y origen a la virtud.\n\n            Dios nuestro, que hiciste pasar a pie, sin mojarse, el mar Rojo a los hijos de Abraham, a fin de que el pueblo liberado de la esclavitud del faraón, prefigurara al pueblo de los bautizados.\n\n            Dios nuestro, cuyo Hijo, al ser bautizado por el Precursor en el agua del Jordán, fue ungido por el Espíritu Santo; suspendido en la cruz, quiso que brotaran de su costado sangre y agua; y después de su resurrección mandó a sus apóstoles: \"Vayan y enseñen a todas las naciones bautizándolas en el nombre del Padre, y del Hijo y del Espíritu Santo\": Mira ahora a tu Iglesia en oración y abre para ella la fuente del bautismo.\n\n            Que por la obra del Espíritu Santo esta agua adquiera la gracia de tu Unigénito, para que el hombre, creado a tu imagen, limpio de su antiguo pecado por el sacramento del bautismo, renazca a la vida nueva por el agua y el Espíritu Santo.\n\n            Si lo cree oportuno, introduce el cirio pascual en el agua una o tres veces, diciendo:\n\n            Te pedimos, Señor, que por tu Hijo, descienda sobre el agua de esta fuente, el poder del Espíritu Santo.\n\n            Manteniendo el cirio dentro del agua, prosigue:\n\n            para que todos, sepultados con Cristo en su muerte por el bautismo, resuciten también con él a la vida nueva. Él que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos.\n\n            Enseguida saca el cirio del agua y el pueblo dice la siguiente aclamación o alguna otra adecuada:\n\n            Fuentes del Señor, bendigan al Señor, alábenlo y glorifíquenlo por los siglos."
          },
          {
            "tipo": "rubrica",
            "titulo": "EXAMEN Y PROFESIÓN DE FE",
            "texto": "Sacerdote: Queridos papás y padrinos. En el sacramento del bautismo, el amor de Dios va infundir, por el agua y el Espíritu Santo, la vida nueva a estos niños, que ustedes han presentado a la Iglesia. Procuren educarlos de tal modo en la fe, que esa vida divina se vea preservada del pecado y pueda desarrollarse en ellos de día en día. Así pues, movidos por la fe, si están ustedes dispuestos a aceptar este privilegio y obligación, recordando el compromiso de su propio bautismo, renuncien al pecado y proclamen su fe en Jesucristo, que es la fe de la Iglesia, en la cual estos niños van a ser bautizados.\n\n            ¿Renuncian ustedes a Satanás?\nR. Sí, renuncio.\n\n            ¿Renuncian a todas sus obras?\nR. Sí, renuncio.\n\n            ¿Renuncian a todas sus seducciones?\nR. Sí, renuncio.\n\n            Luego, prosigue:\n\n            ¿Creen ustedes en Dios, Padre todopoderoso, creador del cielo y de la tierra?\nR. Sí, creo.\n\n            ¿Creen en Jesucristo, su Hijo único y Señor nuestro, que nació de la Virgen María, padeció y murió por nosotros, resucitó y está sentado a la derecha del Padre?\nR. Sí, creo.\n\n            ¿Creen en el Espíritu Santo, en la santa Iglesia católica, en la comunión de los santos, en el perdón de los pecados, en la resurrección de los muertos y en la vida eterna?\nR. Sí, creo.\n\n            Esta es nuestra fe, la fe de la Iglesia que nos gloriamos de profesar en Jesucristo nuestro Señor.\nR. Amén.\n\n            Se acercan los papás y sus padrinos a la pila bautismal llevando a los bautizandos y el que preside les pregunta:\n\n            Sacerdote: Papás de N., quieren que su hijo(a) sea bautizado en esta fe de la Iglesia que acabamos de profesar.\n\n            Papás: Sí queremos.\n\n            Sacerdote: N., Yo te bautizo en el nombre del Padre, y del Hijo, y del Espíritu Santo."
          },
          {
            "tipo": "rubrica",
            "titulo": "RITOS ILUSTRATIVOS DEL BAUTISMO",
            "texto": "Sacerdote: Dios todopoderoso, Padre de nuestro Señor Jesucristo, que los ha librado del pecado y les ha dado la nueva vida por el agua y el Espíritu Santo, los unja con el crisma de la salvación, para que, incorporados a su pueblo, sean para siempre miembros de Cristo Sacerdote, de Cristo profeta y de Cristo rey.\n\n            Luego le impone la vestidura blanca, diciendo:\n\n            N. y N. Ustedes ya han sido transformados en nuevas creaturas y se han revestido de Cristo, que esta vestidura blanca sea para ustedes símbolo de su nueva dignidad de hijos de Dios. Con la ayuda y ejemplo de sus familiares consérvala sin mancha hasta la vida eterna.\n\n            Ahora con la vela encendida, el que preside se dirige a los recién bautizados y luego a los papás y padrinos de los mismos:\n\n            Reciban la luz de Cristo. A ustedes papás y padrinos, se les confía el cuidado de esta luz, a fin de que estos niños que han sido iluminados por Cristo, caminen siempre como hijos de la luz y, perseverando en la fe, puedan salir al encuentro del Señor, con todos los santos, cuando venga al final de los tiempos.\n\n            Luego, los bendice con estas palabras.\n\n            El Señor que hizo oír a los sordos y hablar a los mudos, te conceda a su tiempo escuchar su Palabra y profesar la fe, para alabanza y gloria de Dios Padre."
          },
          {
            "tipo": "rubrica",
            "titulo": "RENOVACIÓN COMUNITARIA DE LAS PROMESAS DEL BAUTISMO",
            "texto": "Terminada la ceremonia del bautismo, todos, de pie y teniendo en sus manos las velas encendidas hacen la renovación de las promesas del bautismo.\n\n            Hermanos, por medio del bautismo, hemos sido hechos partícipes del misterio pascual de Cristo; es decir, por medio del bautismo, hemos sido sepultados con él en su muerte para resucitar con él a una vida nueva.\n\n            Por eso, culminado nuestro camino cuaresmal, es muy conveniente que renovemos las promesas de nuestro bautismo, con las cuales un día renunciamos a Satanás y a sus obras y nos comprometimos a servir a Dios, en la santa Iglesia católica.\n\n            Por consiguiente:\n\n            ¿Renuncian ustedes al pecado para vivir en la libertad de los hijos de Dios?\nR. Sí, renuncio.\n\n            ¿Renuncian a todas las seducciones del mal para que el pecado no los esclavice?\nR. Sí, renuncio.\n\n            ¿Renuncian a Satanás, padre y autor de todo pecado?\nR. Sí, renuncio.\n\n            Prosigue:\n\n            ¿Creen ustedes en Dios, Padre todopoderoso, creador del cielo y de la tierra?\nR. Sí, creo.\n\n            ¿Creen en Jesucristo, su Hijo único y Señor nuestro, que nació de la Virgen María, padeció y murió por nosotros, resucitó y está sentado a la derecha del Padre?\nR. Sí, creo.\n\n            ¿Creen en el Espíritu Santo, en la Santa Iglesia católica, en la comunión de los santos, en el perdón de los pecados, en la resurrección de los muertos y en la vida eterna?\nR. Sí, creo.\n\n            Y el que preside concluye:\n\n            Que Dios todopoderoso, Padre de nuestro Señor Jesucristo, que nos liberó del pecado y nos ha hecho renacer por el agua y el Espíritu Santo, nos conserve con su gracia unidos a Jesucristo nuestro Señor, hasta la vida eterna.\nR. Amén.\n\n            El que preside rocía al pueblo con el agua bendita, mientras todos cantan la siguiente antífona o algún otro canto bautismal.\n\n                Vi brotar agua del lado derecho del templo, aleluya.\n\n                Vi que en todos aquellos que recibían el agua, surgía una vida nueva y cantaban con gozo: Aleluya, aleluya."
          },
          {
            "tipo": "rubrica",
            "titulo": "ORACIÓN UNIVERSAL DE LOS FIELES",
            "texto": "Hecha la aspersión, el que preside vuelve a la sede, en donde dirige la Oración Universal, en la cual se orará especialmente por los neófitos.\n\n            Sacerdote: Oremos hermanos en esta noche santa a Dios Padre todopoderoso que en Cristo resucitado nos ha hecho sus hijos y, pidámosle que también nos conceda, en virtud de la gracia, llegar a ser auténticos discípulos y misioneros de Cristo. Digamos con fe y esperanza:\n\n            R. Tu Luz, Señor nos haga ver la luz.\n\n                Para que en esta noche santa podamos, con la gracia de Dios, dar vida a nuestras familias y las contagiemos con la luz del Señor, oremos. R.\n\n                Para que los niños que hoy han recibido en el mundo entero la gracia bautismal, puedan recibir de nosotros una Iglesia joven y comprometida con las exigencias del Evangelio, oremos. R.\n\n                Para que la triple misión: real, profética y litúrgica, que todos recibimos con la gracia de esta noche, nos permita ser auténticos discípulos y misioneros de Cristo, oremos. R.\n\n                Para que no pongamos resistencia a la gracia de Dios con la cual bendice, por medio de nosotros a toda la humanidad, oremos. R.\n\n                Para que con la alegría y testimonio que se desprenden de esta noche santa, sean muchos los que regresen a la Iglesia, oremos. R.\n\n                Para que abramos nuestros oídos y corazones al llamado constante de Dios para donarle a Jesucristo, su Hijo, muchos y muy santos sacerdotes, oremos. R.\n\n            Sacerdote: Padre, que en esta noche santa, has transformado con la fuerza del Espíritu Santo a tu Iglesia que ha nacido del misterio pascual de tu Hijo, concédenos, te lo pedimos, que el mundo entero se alegre y regocije con la salvación que en nuestras manos has puesto para ellos. Por el que tanto amas, Jesucristo, nuestro Señor.\nR. Amén.\n\n            No se dice Credo."
          }
        ]
      },
      {
        "id": "sec_5",
        "nombre": "V. Liturgia Eucarística",
        "secciones": [
          {
            "tipo": "sacerdote",
            "texto": "El Sacrificio de la Nueva Alianza"
          },
          {
            "tipo": "sacerdote",
            "titulo": "ORACIÓN SOBRE LAS OFRENDAS",
            "texto": "Recibe, Señor, las súplicas de tu pueblo, junto con los dones que te presentamos para que los misterios de la Pascua que hemos comenzado a celebrar, nos obtengan con tu ayuda, el remedio para conseguir la vida eterna. Por Jesucristo, nuestro Señor.\nR. Amén."
          },
          {
            "tipo": "sacerdote",
            "titulo": "PREFACIO (El misterio pascual)",
            "texto": "V. El Señor este con vosotros.\nR. Y con tu espíritu.\n\n            V. Levantemos el corazón.\nR. Lo tenemos levantado hacia el Señor.\n\n            V. Demos gracias al Señor, nuestro Dios.\nR. Es justo y necesario.\n\n            En verdad es justo y necesario, es nuestro deber y salvación, glorificarte siempre, Señor, pero más que nunca en esta noche en que Cristo, nuestra Pascua, fue inmolado. Porque él es el verdadero Cordero de Dios que quitó el pecado del mundo: muriendo, destruyó nuestra muerte, y resucitando, restauró la vida. Por eso, con esta efusión de gozo pascual, el mundo entero se desborda de alegría y también los coros celestiales, los ángeles y los arcángeles, cantan sin cesar el himno de tu gloria:\n\n            Santo, Santo, Santo..."
          },
          {
            "tipo": "rubrica",
            "titulo": "PLEGARIA EUCARÍSTICA",
            "texto": "CP Padre misericordioso, te pedimos humildemente por Jesucristo, tu Hijo, nuestro Señor, que aceptes y bendigas estos + dones, este sacrificio santo y puro que te ofrecemos, ante todo, por tu Iglesia santa y católica, para que le concedas la paz, la protejas, la, congregues en la unidad y la gobiernes en el mundo entero, con tu servidor el Papa Francisco, con nuestro obispo Rogelio y todos los demás Obispos que, fieles a la verdad, promueven la fe católica y apostólica.\n\n            C1 Acuérdate, Señor, de tus hijos (N.N.) y de todos los aquí reunidos, cuya fe y entrega bien conoces; por ellos y todos los suyos, por el perdón de sus pecados y la salvación que esperan, te ofrecemos, y ellos mismos te ofrecen, este sacrificio de alabanza, a ti, eterno Dios, vivo y verdadero.\n\n            C2 Reunidos en comunión con toda la Iglesia, para celebrar la noche santísima de la resurrección de nuestro Señor Jesucristo, según la carne, veneramos la memoria, ante todo, de la gloriosa siempre Virgen María, Madre de Jesucristo, nuestro Dios y Señor; la de su esposo, san José; la de los santos apóstoles y mártires Pedro y Pablo, Andrés, y la de todos los santos; por sus méritos y oraciones concédenos en toda tu protección.\n\n            CP Acepta, Señor, en tu bondad, esta ofrenda de tus siervos y de toda tu familia santa, que hoy te ofrecemos especialmente por aquellos que has hecho renacer del agua y del Espíritu Santo, perdonándoles todos sus pecados; ordena en tu paz nuestros días, líbranos de la condenación eterna y cuéntanos entre tus elegidos.\n\n            CC Bendice y santifica, oh Padre, esta ofrenda, haciéndola perfecta, espiritual y digna de ti, de manera que se convierta para nosotros en el Cuerpo y la Sangre de tu Hijo amado, Jesucristo, nuestro Señor.\n\n            El cual, la víspera de su Pasión, tomó pan en sus santas y venerables manos, y, elevando los ojos al cielo, hacia ti, Dios, Padre suyo todopoderoso, dando gracias te bendijo, lo partió, y lo dio a sus discípulos, diciendo:\n\n            «Tomen y coman todos de él,\nporque esto es mi Cuerpo,\nque será entregado por ustedes.»\n\n            Del mismo modo, acabada la cena, tomó este cáliz glorioso en sus santas y venerables manos, dando gracias te bendijo, y lo dio a sus discípulos, diciendo:\n\n            «Tomen y beban todos de él,\nporque éste es el cáliz de mi Sangre,\nSangre de la alianza nueva y eterna,\nque será derramada por ustedes y por muchos\npara el perdón de los pecados.\nHagan esto en conmemoración mía.»\n\n            CP Éste es el Misterio de la fe.\n\n            R. Anunciamos tu muerte, proclamamos tu resurrección. ¡Ven, Señor Jesús!\n\n            CC Por eso, Padre, nosotros, tus siervos, y todo tu pueblo santo, al celebrar este memorial de la muerte gloriosa de Jesucristo, tu Hijo, nuestro Señor; de su santa resurrección del lugar de los muertos y de su admirable ascensión a los cielos, te ofrecemos, Dios de gloria y majestad, de los mismos bienes que nos has dado, el sacrificio puro, inmaculado y santo: pan de vida eterna y cáliz de eterna salvación.\n\n            Mira con ojos de bondad esta ofrenda y acéptala, como aceptaste los dones del justo Abel, el sacrificio de Abrahán, nuestro padre en la fe, y la oblación pura de tu sumo sacerdote Melquisedec.\n\n            Inclinado, con las manos juntas, prosigue:\n\n            Te pedimos humildemente, Dios todopoderoso, que esta ofrenda sea llevada a tu presencia, hasta el altar del cielo, por manos de tu ángel, para que cuantos recibimos el Cuerpo y la Sangre de tu Hijo al participar aquí de este altar, seamos colmados de gracia y bendición.\n\n            C3 Acuérdate también, Señor, de tus hijos (N.N.) que nos han precedido con el signo de la fe y duermen ya el sueño de la paz.\n\n            Junta las manos y ora unos momentos por los difuntos por quienes tiene intención de orar. Después, con las manos extendidas, prosigue:\n\n            A ellos, Señor, y a cuantos descansan en Cristo, concédeles el lugar del consuelo, de la luz y de la paz.\n\n            C4 Y a nosotros, pecadores, siervos tuyos, que confiamos en tu infinita misericordia, admítenos en la asamblea de los santos apóstoles y mártires Juan el Bautista, Esteban, Matías y Bernabé, y de todos los santos; y acéptanos en su compañía, no por nuestros méritos, sino conforme a tu bondad.\n\n            CP Por Cristo, Señor nuestro, por quien sigues creando todos los bienes, los santificas, los llenas de vida, los bendices y los repartes entre nosotros.\n\n            Por Cristo, con él y en él, a ti, Dios Padre omnipotente, en la unidad del Espíritu Santo, todo honor y toda gloria por los siglos de los siglos.\nR. Amén."
          },
          {
            "tipo": "rubrica",
            "titulo": "RITO DE LA COMUNIÓN",
            "texto": "Fieles a la recomendación del Salvador y siguiendo su divina enseñanza, nos atrevemos a decir: Padre nuestro...\n\n            Líbranos de todos los males, Señor, y concédenos la paz en nuestros días, para que, ayudados por tu misericordia, vivamos siempre libres de pecado y protegidos de toda perturbación, mientras esperamos la gloriosa venida de nuestro Salvador Jesucristo.\nR. Tuyo es el reino, tuyo el poder y la gloria, por siempre, Señor.\n\n            Señor Jesucristo, que dijiste a tus apóstoles: \"La paz os dejo, mi paz os doy\", no tengas en cuenta nuestros pecados, sino la fe de tu Iglesia y, conforme a tu palabra, concédele la paz y la unidad. Tú que vives y reinas por los siglos de los siglos.\nR. Amén.\n\n            La paz del Señor esté siempre con ustedes.\nR. Y con tu espíritu.\n\n            En el espíritu de Cristo resucitado, dense fraternalmente la paz.\n\n            Depositando una fracción de la Hostia en el cáliz dice en secreto: El Cuerpo y la Sangre de nuestro Señor Jesucristo, unidos en este cáliz, sean para nosotros alimento de vida eterna.\n\n                Cordero de Dios, que quitas el pecado del mundo, ten piedad de nosotros.\n\n                Cordero de Dios, que quitas el pecado del mundo, ten piedad de nosotros.\n\n                Cordero de Dios, que quitas el pecado del mundo, danos la paz.\n\n            El que preside hace genuflexión, toma el pan consagrado y, sosteniéndolo un poco elevado sobre la patena, lo muestra al pueblo, diciendo:\n\n            Éste es el Cordero de Dios, que quita el pecado del mundo. Dichosos los invitados a la cena del Señor.\nR. Señor, no soy digno de que entres en mi casa, pero una palabra tuya bastará para sanarme."
          },
          {
            "tipo": "canto",
            "titulo": "ANTÍFONA DE LA COMUNIÓN (1 Cor 5, 7-8)",
            "texto": "Cristo, nuestro Cordero pascual, ha sido inmolado. Aleluya. Celebremos, pues, la Pascua, con el pan sin levadura, que es de sinceridad y verdad. Aleluya."
          },
          {
            "tipo": "sacerdote",
            "titulo": "ORACIÓN DESPUÉS DE LA COMUNIÓN",
            "texto": "Infúndenos, Señor, tu espíritu de caridad, para que saciados con los sacramentos pascuales, vivamos siempre unidos en tu amor. Por Jesucristo, nuestro Señor.\nR. Amén."
          },
          {
            "tipo": "sacerdote",
            "titulo": "BENDICIÓN FINAL",
            "texto": "El Señor esté con ustedes.\nR. Y con tu espíritu.\n\n            Que Dios todopoderoso los bendiga en este día solemnísimo de Pascua y, compadecido de ustedes, los guarde de todo pecado.\nR. Amén.\n\n            Que les conceda el premio de la inmortalidad aquel que los ha redimido para la vida eterna con la resurrección de su Unigénito.\nR. Amén.\n\n            Que ustedes, que una vez terminados los días de la Pasión, celebran con gozo la fiesta de la Pascua del Señor, puedan participar, con su gracia, del júbilo de la Pascua eterna.\nR. Amén.\n\n            Y la bendición de Dios todopoderoso, Padre, Hijo + y Espíritu Santo, descienda sobre ustedes y permanezca para siempre.\nR. Amén.\n\n                Nos vamos a servir a Dios y a los hermanos, aleluya, aleluya.\n\n                R. Demos gracias a Dios, aleluya, aleluya.\n\n    Parroquia de San Pedro Apóstol | Camino hacia la Pascua"
          }
        ]
      }
    ],
    "sacristia": {
      "reglasOro": [
        "La Vigilia DEBE comenzar en la noche, después de anochecer, y concluir antes del amanecer del domingo.",
        "Tener leña seca y encendedor listos en el atrio exterior para la fogata de fuego nuevo.",
        "Cirio Pascual nuevo del año 2026 con los 5 granos de incienso y punzón de marcar.",
        "Agua abundante en la pila bautismal para la bendición y aspersión.",
        "Velitas con cono protector para todos los fieles."
      ],
      "vestiduras": [
        "Casulla blanca/dorada más solemne y festiva del ajuar parroquial.",
        "Dalmaticas blancas para diáconos.",
        "Albas impecables para todos los ministros y acólitos."
      ],
      "altarYCredencia": [
        "Cirio Pascual con candelabro monumental junto al ambón.",
        "Campanas preparadas para el Gloria.",
        "Letanías de los Santos impresas para el coro y cantores.",
        "Hisopo grande y acetres para la aspersión general de los fieles."
      ],
      "elementosEspeciales": [
        "Hoguera exterior con carbones.",
        "Punzón y 5 clavos de incienso rojos/dorados para el Cirio.",
        "Santo Crisma y Óleo de los Catecúmenos si hay bautismos y confirmaciones.",
        "Velas para todos los fieles y servidores."
      ],
      "checklists": [
        {
          "momento": "Antes del Inicio (Atrio y Templo)",
          "items": [
            {
              "id": "vigilia_luces_off",
              "texto": "Todas las luces interiores y exteriores del templo totalmente apagadas."
            },
            {
              "id": "vigilia_fuego_listo",
              "texto": "Hoguera exterior con leña y brasas vivas."
            },
            {
              "id": "vigilia_cirio_nuevo",
              "texto": "Cirio Pascual 2026 listo con estilete y 5 granos de incienso."
            },
            {
              "id": "vigilia_velas_pueblo",
              "texto": "Ujieres con canastas de velas distribuidas a los fieles."
            }
          ]
        },
        {
          "momento": "En el Gloria",
          "items": [
            {
              "id": "vigilia_luces_on",
              "texto": "Encender iluminación festiva del templo."
            },
            {
              "id": "vigilia_campanas",
              "texto": "Repique solemne de todas las campanas y campanillas."
            },
            {
              "id": "vigilia_altar_velas",
              "texto": "Encender los cirios del altar."
            }
          ]
        }
      ]
    },
    "cantoral": [
      {
        "momento": "Procesión del Lucernario",
        "titulo": "Luz de Cristo (Lumen Christi)",
        "tonalidad": "Modo Gregoriano",
        "letra": "V. Luz de Cristo.\nR. Demos gracias a Dios.",
        "acordes": "Canto a capela solista / respuesta coral"
      },
      {
        "momento": "Pregón Pascual",
        "titulo": "Exsultet (Pregón Pascual Solemne)",
        "tonalidad": "Modo Pascual",
        "letra": "Alégrese la tierra inundada de tanta claridad,\ny que, radiante con el fulgor del Rey eterno,\nsienta que han desaparecido las tinieblas de todo el orbe.\n¡Cristo ha resucitado de entre los muertos!",
        "acordes": "Recitativo solemne con órgano suave de fondo"
      },
      {
        "momento": "Gloria Pascual",
        "titulo": "Gloria a Dios en el Cielo (Pascual Jubiloso)",
        "tonalidad": "Re Mayor",
        "letra": "¡Gloria a Dios en el cielo y en la tierra paz!\nTe alabamos, te bendecimos, te adoramos, te glorificamos...\n(Repique general de campanas y luces plenas)",
        "acordes": "D - G - A - D / Bm - Em - A7 - D"
      },
      {
        "momento": "Aspersión Bautismal",
        "titulo": "Bautízame, Señor, con tu Espíritu / Agua Pura",
        "tonalidad": "Fa Mayor",
        "letra": "Vi que salía agua del lado derecho del templo, ¡Aleluya!\nY todos aquellos a quienes llegó esta agua fueron salvados,\ny cantarán: ¡Aleluya, aleluya!",
        "acordes": "F - C - Dm - Bb / F - C7 - F"
      },
      {
        "momento": "Salida / Resurrección",
        "titulo": "¡Resucitó, Resucitó, Resucitó, Aleluya!",
        "tonalidad": "La Menor / Mi Menor",
        "letra": "¡Resucitó, resucitó, resucitó, aleluya!\n¡Aleluya, aleluya, aleluya, resucitó!\nLa muerte, ¿dónde está la muerte?\n¿Dónde está mi muerte, dónde su victoria?",
        "acordes": "Am - G - F - E / Am - Dm - E7 - Am"
      }
    ],
    "ministerios": {
      "monaguillos": [
        "Acompañar la procesión a oscuras manteniendo la solemnidad del Cirio Pascual.",
        "Encender las velas del altar durante el Gloria con presteza.",
        "Asistir al sacerdote con los óleos y el agua durante los bautismos."
      ],
      "mec": [
        "Apoyar en la logística del bautismo de adultos o niños si los hay.",
        "Distribuir la Eucaristía en la fiesta más grande de la Iglesia."
      ],
      "lectores": [
        "Proclamar las lecturas veterotestamentarias con voz pausada y solemne.",
        "Guiar las respuestas de los salmos responsoriales."
      ],
      "ujieres": [
        "Distribuir las velitas con protectores a todos los asistentes en el atrio.",
        "Cuidar que no se enciendan las velas hasta que el Cirio Pascual ingrese al templo.",
        "Apoyar en el flujo de la aspersión bautismal por las naves."
      ]
    }
  },
  "domingo_pascua": {
    "id": "domingo_pascua",
    "titulo": "Domingo de Pascua de la Resurrección del Señor",
    "subtitulo": "Misa Solemne del Día de Pascua, Secuencia Pascual «Victimae Paschali Laudes» íntegra y Rito de Aspersión",
    "tiempo": "Tiempo Pascual",
    "color": "Blanco",
    "colorHex": "#FFFFFF",
    "lema": "«¡Este es el día en que actuó el Señor: sea nuestra alegría y nuestro gozo!» (Sal 117)",
    "descripcion": "Día de júbilo supremo. La Iglesia se viste de fiesta para celebrar el triunfo definitivo de Cristo sobre el pecado y la muerte. Se canta la Secuencia Pascual y se renueva la bendición.",
    "fechaSugerida": "2026-04-05",
    "partesMisal": [
      {
        "id": "sec_1",
        "nombre": "Primera Lectura y Salmo",
        "secciones": [
          {
            "tipo": "sacerdote",
            "texto": "Lectura del libro de los Hechos de los Apóstoles 10, 34. 37-43\n\n            Hemos comido y bebido con Cristo resucitado.\n\n            En aquellos días, Pedro tomó la palabra y dijo: \"Ya saben ustedes lo sucedido en toda Judea, que tuvo principio en Galilea, después del bautismo predicado por Juan: cómo Dios ungió con el poder del Espíritu Santo a Jesús de Nazaret y cómo éste pasó haciendo el bien, sanando a todos los oprimidos por el diablo, porque Dios estaba con él.\n\n            Nosotros somos testigos de cuanto él hizo en Judea y en Jerusalén. Lo mataron colgándolo de la cruz, pero Dios lo resucitó al tercer día y concedió verlo, no a todo el pueblo, sino únicamente a los testigos que él, de antemano, había escogido: a nosotros, que hemos comido y bebido con él después de que resucitó de entre los muertos.\n\n            El nos mandó predicar al pueblo y dar testimonio de que Dios lo ha constituido juez de vivos y muertos. El testimonio de los profetas es unánime: que cuantos creen en él reciben, por su medio, el perdón de los pecados\".\n\n            Palabra de Dios.\n\n                SALMO RESPONSORIAL (Del salmo 117)\n\n                R. Este es el día del triunfo del Señor. Aleluya.\n\n                Te damos gracias, Señor, porque eres bueno, porque tu misericordia es eterna. Diga la casa de Israel: \"Su misericordia es eterna\". R.\n\n                La diestra del Señor es poderosa, la diestra del Señor es nuestro orgullo. No moriré, continuaré viviendo para contar lo que el Señor ha hecho. R.\n\n                La piedra que desecharon los constructores, es ahora la piedra angular. Esto es obra de la mano del Señor, es un milagro patente. R.\n\n                2"
          }
        ]
      },
      {
        "id": "sec_2",
        "nombre": "Segunda Lectura",
        "secciones": [
          {
            "tipo": "sacerdote",
            "texto": "Colosenses o Corintios\n\n            OPCIÓN 1\n\n            Lectura de la carta del apóstol san Pablo a los colosenses 3, 1-4\n\n            Busquen los bienes del cielo, donde está Cristo.\n\n            Hermanos: Puesto que ustedes han resucitado con Cristo, busquen los bienes de arriba, donde está Cristo, sentado a la derecha de Dios. Pongan todo el corazón en los bienes del cielo, no en los de la tierra, porque han muerto y su vida está escondida con Cristo en Dios. Cuando se manifieste Cristo, vida de ustedes, entonces también ustedes se manifestarán gloriosos, juntamente con él.\n\n            Palabra de Dios.\n\n            O BIEN (OPCIÓN 2)\n\n            Lectura de la primera carta del apóstol san Pablo a los corintios 5, 6-8\n\n            Tiren la antigua levadura, pues Cristo, nuestro cordero pascual, ha sido inmolado.\n\n            Hermanos: ¿No saben ustedes que un poco de levadura hace fermentar toda la masa? Tiren la antigua levadura, para que sean ustedes una masa nueva, ya que son pan sin levadura, pues Cristo, nuestro cordero pascual, ha sido inmolado.\n\n            Celebremos, pues, la fiesta de la Pascua, no con la antigua levadura, que es de vicio y maldad, sino con el pan sin levadura, que es de sinceridad y verdad.\n\n            Palabra de Dios."
          }
        ]
      },
      {
        "id": "sec_3",
        "nombre": "Secuencia Pascual",
        "secciones": [
          {
            "tipo": "sacerdote",
            "texto": "Obligatoria el Domingo de Resurrección\n\n                    Ofrezcan los cristianos\nofrendas de alabanza\na gloria de la víctima\npropicia de la Pascua.\n\n                    Cordero sin pecado,\nque a las ovejas salva,\na Dios y a los culpables\nunió con nueva alianza.\n\n                    Lucharon vida y muerte\nen singular batalla,\ny, muerto el que es la vida,\ntriunfante se levanta.\n\n                    \"¿Qué has visto de camino,\nMaría, en la mañana?\"\n\n                    \"A mi Señor glorioso,\nla tumba abandonada,\n\n                    los ángeles testigos,\nsudarios y mortaja.\n¡Resucitó de veras\nmi amor y mi esperanza!\n\n                    Venid a Galilea,\nallí el Señor aguarda;\nallí veréis los suyos\nla gloria de la Pascua\".\n\n                    Primicia de los muertos,\nsabemos por tu gracia\nque estás resucitado;\nla muerte en ti no manda.\n\n                    Rey vencedor, apiádate\nde la miseria humana\ny da a tus fieles parte\nen tu victoria santa.\n\n            Amén. Aleluya."
          }
        ]
      },
      {
        "id": "sec_4",
        "nombre": "Evangelio",
        "secciones": [
          {
            "tipo": "sacerdote",
            "texto": "Juan, Mateo o Lucas\n\n            ACLAMACIÓN ANTES DEL EVANGELIO (Cfr 1 Cor 5, 7-8)\n\n            R. Aleluya, aleluya.\n\n            Cristo, nuestro cordero pascual, ha sido inmolado; celebremos, pues, la Pascua.\n\n            R. Aleluya.\n\n            EVANGELIO (OPCIÓN 1)\n\n            Lectura del santo Evangelio según san Juan 20, 1-9\n\n            El debía resucitar de entre los muertos.\n\n            El primer día después del sábado, estando todavía oscuro, fue María Magdalena al sepulcro y vio removida la piedra que lo cerraba. Echó a correr, llegó a la casa donde estaban Simón Pedro y el otro discípulo, a quien Jesús amaba, y les dijo: \"Se han llevado del sepulcro al Señor y no sabemos dónde lo habrán puesto\".\n\n            Salieron Pedro y el otro discípulo camino del sepulcro. Los dos iban corriendo juntos, pero el otro discípulo corrió más aprisa que Pedro y llegó primero al sepulcro, e inclinándose, miró los lienzos puestos en el suelo, pero no entró.\n\n            En eso llegó también Simón Pedro, que lo venía siguiendo, y entró en el sepulcro. Contempló los lienzos puestos en el suelo y el sudario, que había estado sobre la cabeza de Jesús, puesto no con los lienzos en el suelo, sino doblado en sitio aparte. Entonces entró también el otro discípulo, el que había llegado primero al sepulcro, y vio y creyó, porque hasta entonces no habían entendido las Escrituras, según las cuales Jesús debía resucitar de entre los muertos.\n\n            Palabra del Señor.\n\n            O BIEN (OPCIÓN 2)\n\n            Lectura del santo Evangelio según san Mateo 28, 1-10\n\n            Ha resucitado e irá delante de ustedes a Galilea.\n\n            Transcurrido el sábado, al amanecer del primer día de la semana, María Magdalena y la otra María fueron a ver el sepulcro. De pronto se produjo un gran temblor, porque el ángel del Señor bajó del cielo y acercándose al sepulcro, hizo rodar la piedra que lo tapaba y se sentó encima de ella. Su rostro brillaba como el relámpago y sus vestiduras eran blancas como la nieve. Los guardias, atemorizados ante él, se pusieron a temblar y se quedaron como muertos. El ángel se dirigió a las mujeres y les dijo: \"No teman. Ya sé que buscan a Jesús, el crucificado. No está aquí; ha resucitado, como lo había dicho. Vengan a ver el lugar donde lo habían puesto. Y ahora, vayan de prisa a decir a sus discípulos: ‘Ha resucitado de entre los muertos e irá delante de ustedes a Galilea; allá lo verán’. Eso es todo”.\n\n            Ellas se alejaron a toda prisa del sepulcro, y llenas de temor y de gran alegría, corrieron a dar la noticia a los discípulos. Pero de repente Jesús les salió al encuentro y las saludó. Ellas se le acercaron, le abrazaron los pies y lo adoraron. Entonces les dijo Jesús: “No tengan miedo. Vayan a decir a mis hermanos que se dirijan a Galilea. Allá me verán”.\n\n            Palabra del Señor.\n\n            O BIEN (OPCIÓN 3 - MISAS VESPERTINAS)\n\n            Lectura del santo Evangelio según san Lucas 24, 13-35\n\n            Quédate con nosotros, porque ya es tarde.\n\n            El mismo día de la resurrección, iban dos de los discípulos hacia un pueblo llamado Emaús, situado a unos once kilómetros de Jerusalén, y comentaban todo lo que había sucedido.\n\n            Mientras conversaban y discutían, Jesús se les acercó y comenzó a caminar con ellos; pero los ojos de los dos discípulos estaban velados y no lo reconocieron. Él les preguntó: “¿De qué cosas vienen hablando, tan llenos de tristeza?”\n\n            Uno de ellos, llamado Cleofás, le respondió: “¿Eres tú el único forastero que no sabe lo que ha sucedido estos días en Jerusalén?” Él les preguntó: “¿Qué cosa?” Ellos le respondieron: “Lo de Jesús el nazareno, que era un profeta poderoso en obras y palabras, ante Dios y ante todo el pueblo. Cómo los sumos sacerdotes y nuestros jefes lo entregaron para que lo condenaran a muerte, y lo crucificaron. Nosotros esperábamos que él sería el libertador de Israel, y sin embargo, han pasado ya tres días desde que estas cosas sucedieron. Es cierto que algunas mujeres de nuestro grupo nos han desconcertado, pues fueron de madrugada al sepulcro, no encontraron el cuerpo y llegaron contando que se les habían aparecido unos ángeles, que les dijeron que estaba vivo. Algunos de nuestros compañeros fueron al sepulcro y hallaron todo como habían dicho las mujeres, pero a él no lo vieron”.\n\n            Entonces Jesús les dijo: “¡Qué insensatos son ustedes y qué duros de corazón para creer todo lo anunciado por los profetas! ¿Acaso no era necesario que el Mesías padeciera todo esto y así entrara en su gloria?” Y comenzando por Moisés y siguiendo con todos los profetas, les explicó todos los pasajes de la Escritura que se referían a él.\n\n            Ya cerca del pueblo a donde se dirigían, él hizo como que iba más lejos; pero ellos le insistieron, diciendo: “Quédate con nosotros, porque ya es tarde y pronto va a oscurecer”. Y entró para quedarse con ellos. Cuando estaban a la mesa, tomó un pan, pronunció la bendición, lo partió y se lo dio. Entonces se les abrieron los ojos y lo reconocieron, pero él se les desapareció. Y ellos se decían el uno al otro: “¡Con razón nuestro corazón ardía, mientras nos hablaba por el camino y nos explicaba las Escrituras!”\n\n            Se levantaron inmediatamente y regresaron a Jerusalén, donde encontraron reunidos a los Once con sus compañeros, los cuales les dijeron: “De veras ha resucitado el Señor y se le ha aparecido a Simón”. Entonces ellos contaron lo que les había pasado por el camino y cómo lo habían reconocido al partir el pan.\n\n            Palabra del Señor.\n\n    Parroquia de San Pedro Apóstol | Camino hacia la Pascua"
          }
        ]
      }
    ],
    "sacristia": {
      "reglasOro": [
        "El Cirio Pascual encendido preside junto al ambón durante todas las Misas.",
        "Vestiduras blancas festivas.",
        "Tener agua bendecida en la Noche Santa para el rito de aspersión dominical."
      ],
      "vestiduras": [
        "Casulla blanca y estola festiva.",
        "Albas para todos los ministros."
      ],
      "altarYCredencia": [
        "Mantel blanco festivo con flores abundantes en el presbiterio.",
        "Acetre con hisopo para la aspersión.",
        "Subsidios de la Secuencia Pascual para el coro y los fieles."
      ],
      "elementosEspeciales": [
        "Flores pascuales (azucenas, lilis, orquídeas blancas).",
        "Icono de la Resurrección o imagen de Cristo Resucitado entronizada."
      ],
      "checklists": [
        {
          "momento": "Antes de las Misas del Domingo",
          "items": [
            {
              "id": "pascua_cirio_on",
              "texto": "Encender el Cirio Pascual antes de iniciar la celebración."
            },
            {
              "id": "pascua_secuencia_libreto",
              "texto": "Hojas de la Secuencia Victimae Paschali listas en el ambón y coro."
            },
            {
              "id": "pascua_aspersorio",
              "texto": "Acetre con agua pascual preparado para el rito de entrada."
            }
          ]
        }
      ]
    },
    "cantoral": [
      {
        "momento": "Entrada",
        "titulo": "El Señor Resucitó, ¡Aleluya!",
        "tonalidad": "Sol Mayor",
        "letra": "El Señor resucitó, cantemos con alegría,\ndemos gracias al Señor, aleluya.\nJesucristo que moría en la cruz para salvarnos,\nha vencido a las tinieblas y nos da su vida eterna.",
        "acordes": "G - C - D - G / Em - Am - D7 - G"
      },
      {
        "momento": "Secuencia",
        "titulo": "Victimae Paschali Laudes (Secuencia de Pascua)",
        "tonalidad": "Re Mayor",
        "letra": "Victimae paschali laudes immolent Christiani...\n¡Lucharon vida y muerte en singular batalla y muerto el que es la Vida, triunfante se levanta!",
        "acordes": "D - A - G - D / Bm - F#m - G - A7 - D"
      },
      {
        "momento": "Comunión",
        "titulo": "Este es el Pan de los Hijos / Cristo Nuestra Pascua",
        "tonalidad": "Do Mayor",
        "letra": "Cristo nuestra Pascua ha sido inmolado, aleluya.\nCelebremos la fiesta con el pan de la sinceridad y de la verdad, aleluya.",
        "acordes": "C - G - Am - F / C - G7 - C"
      },
      {
        "momento": "Salida",
        "titulo": "Reina del Cielo, Alégrate (Regina Caeli)",
        "tonalidad": "Fa Mayor",
        "letra": "Reina del cielo, alégrate, aleluya.\nPorque el Señor a quien mereciste llevar, aleluya.\nHa resucitado según su palabra, aleluya.\nRuega al Señor por nosotros, aleluya.",
        "acordes": "F - Bb - C - F / Dm - Gm - C7 - F"
      }
    ],
    "ministerios": {
      "monaguillos": [
        "Portar la Cruz procesional y ciriales con alegría pascual.",
        "Acompañar al sacerdote durante la aspersión por los pasillos."
      ],
      "mec": [
        "Distribuir la Eucaristía a la gran asamblea pascual con reverencia y agilidad."
      ],
      "lectores": [
        "Cantar o recitar la Secuencia Pascual con entonación festiva."
      ],
      "ujieres": [
        "Acoger con felicitaciones pascuales a los fieles a la entrada.",
        "Distribuir los boletines conmemorativos de Pascua."
      ]
    }
  }
};
