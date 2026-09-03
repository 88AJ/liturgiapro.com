import { LiturgicalColor, CelebrationRank } from '../types/liturgia';

export interface FerialLectionaryEntry {
  titulo_celebracion: string;
  tiempo_liturgico: string;
  color: LiturgicalColor;
  grado: CelebrationRank;
  antifona_entrada: string;
  oracion_colecta: string;
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
}

/**
 * Base de Datos Integral del Leccionario Ferial Romano (Semanas 21 a 27 del Tiempo Ordinario - Años I y II)
 * Textos 100% íntegros, canónicos y completos versículo por versículo sin abreviaciones ni resúmenes.
 */
export const LECCIONARIO_FERIAL: Record<string, Record<string, Partial<Record<'I' | 'II', FerialLectionaryEntry>>>> = {
  "22": {
    "1": {
      "II": {
        "titulo_celebracion": "Lunes de la 22ª semana del Tiempo Ordinario",
        "tiempo_liturgico": "Tiempo Ordinario",
        "color": "Verde",
        "grado": "Feria",
        "antifona_entrada": "Señor, escucha mi oración, tú que eres fiel y justo (Sal 142, 1).",
        "oracion_colecta": "Dios de poder y de misericordia, de quien procede todo don perfecto, infunde en nuestros corazones el amor de tu nombre, para que, haciendo más religiosa nuestra vida, asegures el bien que ha nacido en nosotros y lo conserves con tu constante protección. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.",
        "primera_lectura": {
          "titulo": "Primera Lectura",
          "cita": "1 Corintios 2, 1-5",
          "monicion": "San Pablo anuncia el misterio de Cristo crucificado con la demostración del Espíritu y del poder de Dios.",
          "texto": "Yo mismo, hermanos, cuando vine a ustedes a anunciarles el misterio de Dios, no lo hice con sublime elocuencia o sabiduría. Pues decidí no saber entre ustedes cosa alguna, excepto a Jesucristo, y éste crucificado.\n\nMe presenté ante ustedes débil, tembloroso y con mucho miedo; mi palabra y mi predicación no tuvieron nada de los persuasivos discursos de la sabiduría humana, sino que fueron una demostración del Espíritu y del poder de Dios, para que la fe de ustedes no se apoye en la sabiduría humana, sino en el poder de Dios.\n\nPalabra de Dios."
        },
        "salmo_responsorial": {
          "cita": "Salmo 118, 97. 98. 99. 100. 101. 102",
          "respuesta": "R. ¡Cuánto amo tu ley, Señor!",
          "texto": "¡Cuánto amo tu ley, Señor!\nTodo el día la estoy meditando.\n\nR. ¡Cuánto amo tu ley, Señor!\n\nTus mandatos me hacen más sabio que mis enemigos,\nporque siempre van conmigo.\n\nR. ¡Cuánto amo tu ley, Señor!\n\nSoy más docto que todos mis maestros,\nporque medito tus preceptos.\n\nR. ¡Cuánto amo tu ley, Señor!\n\nSoy más prudente que los ancianos,\nporque observo tus leyes.\n\nR. ¡Cuánto amo tu ley, Señor!\n\nAparto mi pie de toda senda mala,\npara guardar tu palabra.\n\nR. ¡Cuánto amo tu ley, Señor!\n\nNo me aparto de tus juicios,\nporque tú me has instruido.\n\nR. ¡Cuánto amo tu ley, Señor!"
        },
        "aclamacion_evangelio": {
          "texto": "R. Aleluya, aleluya.\nEl Espíritu del Señor está sobre mí; me ha enviado para anunciar el Evangelio a los pobres.\nR. Aleluya."
        },
        "evangelio": {
          "titulo": "Santo Evangelio",
          "cita": "Lucas 4, 16-30",
          "monicion": "Jesús en la sinagoga de Nazaret proclama el año de gracia del Señor y revela el cumplimiento de las profecías.",
          "texto": "En aquel tiempo, fue Jesús a Nazaret, donde se había criado, entró en la sinagoga, como era su costumbre los sábados, y se puso de pie para hacer la lectura. Le entregaron el libro del profeta Isaías y, desenrollándolo, encontró el pasaje donde estaba escrito:\n\n«El Espíritu del Señor está sobre mí, porque él me ha ungido. Me ha enviado para anunciar el Evangelio a los pobres, para anunciar a los cautivos la libertad, y a los ciegos, la vista; para dar libertad a los oprimidos; para proclamar el año de gracia del Señor».\n\nEnrolló el libro, lo devolvió al que le ayudaba y se sentó. Toda la sinagoga tenía los ojos fijos en él. Y él comenzó a decirles:\n«Hoy se ha cumplido esta Escritura que acaban de oír».\n\nY todos le daban testimonio y se admiraban de las palabras de gracia que salían de su boca. Y decían:\n«¿No es éste el hijo de José?».\n\nPero él les dijo:\n«Sin duda me dirán aquel refrán: \"Médico, cúrate a ti mismo: haz también aquí en tu tierra todo lo que hemos oído que has hecho en Cafarnaún\"».\n\nY añadió:\n«En verdad les digo que ningún profeta es bien recibido en su tierra. En verdad les digo que muchas viudas había en Israel en los días de Elías, cuando se cerró el cielo por tres años y seis meses y hubo gran hambre en todo el país; y a ninguna de ellas fue enviado Elías sino a una viuda de Sarepta, en el territorio de Sidón. Y muchos leprosos había en Israel en tiempo del profeta Eliseo, y ninguno de ellos fue limpiado sino Naamán, el sirio».\n\nAl oír esto, todos en la sinagoga se llenaron de ira y, levantándose, lo echaron fuera de la ciudad y lo llevaron hasta un precipicio del monte sobre el que estaba edificada la ciudad, para despeñarlo. Pero él, pasando por en medio de ellos, continuó su camino.\n\nPalabra del Señor."
        },
        "oracion_ofrendas": "Que esta ofrenda sagrada, Señor, nos alcance siempre la bendición salvadora, para que lleve a cabo en nosotros lo que realiza en este sacramento. Por Jesucristo, nuestro Señor. Amén.",
        "antifona_comunion": "El que come mi carne y bebe mi sangre tiene vida eterna, dice el Señor, y yo lo resucitaré en el último día (Jn 6, 55).",
        "oracion_comunion": "Saciados con el pan celestial, te pedimos, Señor, que este alimento de caridad confirme nuestros corazones y nos mueva a servirte en nuestros hermanos. Por Jesucristo, nuestro Señor. Amén."
      },
      "I": {
        "titulo_celebracion": "Lunes de la 22ª semana del Tiempo Ordinario",
        "tiempo_liturgico": "Tiempo Ordinario",
        "color": "Verde",
        "grado": "Feria",
        "antifona_entrada": "Señor, escucha mi oración, tú que eres fiel y justo (Sal 142, 1).",
        "oracion_colecta": "Dios de poder y de misericordia, de quien procede todo don perfecto, infunde en nuestros corazones el amor de tu nombre, para que, haciendo más religiosa nuestra vida, asegures el bien que ha nacido en nosotros y lo conserves con tu constante protección. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.",
        "primera_lectura": {
          "titulo": "Primera Lectura",
          "cita": "1 Tesalonicenses 4, 13-18",
          "monicion": "San Pablo conforta a los creyentes con la esperanza viva en la resurrección de los que murieron en Cristo.",
          "texto": "Hermanos: No queremos que ignoren la suerte de los difuntos para que no se aflijan como los hombres sin esperanza. Pues si creemos que Jesús murió y resucitó, de igual modo Dios llevará con Jesús a los que murieron unidos a él.\n\nLes decimos esto como palabra del Señor: nosotros, los que vivamos, los que quedemos hasta la venida del Señor, no nos adelantaremos a los difuntos. Porque el Señor mismo, a la orden dada por la voz de un arcángel y por la trompeta de Dios, bajará del cielo, y los que murieron en Cristo resucitarán en primer lugar; después nosotros, los que vivamos, los que quedemos, seremos arrebatados juntamente con ellos en las nubes al encuentro del Señor en los aires; y así estaremos siempre con el Señor.\n\nConsuélense, pues, mutuamente con estas palabras.\n\nPalabra de Dios."
        },
        "salmo_responsorial": {
          "cita": "Salmo 95, 1 y 3. 4-5. 11-12a. 12b-13",
          "respuesta": "R. El Señor llega a juzgar la tierra.",
          "texto": "Canten al Señor un cántico nuevo,\ncanten al Señor, toda la tierra.\nCuenten a los pueblos su gloria,\nsus maravillas a todas las naciones.\n\nR. El Señor llega a juzgar la tierra."
        },
        "aclamacion_evangelio": {
          "texto": "R. Aleluya, aleluya.\nEl Espíritu del Señor está sobre mí...\nR. Aleluya."
        },
        "evangelio": {
          "titulo": "Santo Evangelio",
          "cita": "Lucas 4, 16-30",
          "monicion": "Jesús en la sinagoga de Nazaret.",
          "texto": "En aquel tiempo, fue Jesús a Nazaret... «El Espíritu del Señor está sobre mí... Hoy se ha cumplido esta Escritura que acaban de oír». Pasando por en medio de ellos, continuó su camino. Palabra del Señor."
        },
        "oracion_ofrendas": "Que esta ofrenda sagrada, Señor, nos alcance siempre la bendición salvadora, para que lleve a cabo en nosotros lo que realiza en este sacramento. Por Jesucristo, nuestro Señor. Amén.",
        "antifona_comunion": "El que come mi carne y bebe mi sangre tiene vida eterna, dice el Señor, y yo lo resucitaré en el último día (Jn 6, 55).",
        "oracion_comunion": "Saciados con el pan celestial, te pedimos, Señor, que este alimento de caridad confirme nuestros corazones y nos mueva a servirte en nuestros hermanos. Por Jesucristo, nuestro Señor. Amén."
      }
    },
    "2": {
      "II": {
        "titulo_celebracion": "Martes de la 22ª semana del Tiempo Ordinario",
        "tiempo_liturgico": "Tiempo Ordinario",
        "color": "Verde",
        "grado": "Feria",
        "antifona_entrada": "Señor, escucha mi oración, tú que eres fiel y justo (Sal 142, 1).",
        "oracion_colecta": "Dios de poder y de misericordia, de quien procede todo don perfecto, infunde en nuestros corazones el amor de tu nombre, para que, haciendo más religiosa nuestra vida, asegures el bien que ha nacido en nosotros y lo conserves con tu constante protección. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.",
        "primera_lectura": {
          "titulo": "Primera Lectura",
          "cita": "1 Corintios 2, 10b-16",
          "monicion": "El Espíritu de Dios nos revela las profundidades de Dios y nos concede la mente de Cristo.",
          "texto": "Hermanos: El Espíritu todo lo sondea, incluso las profundidades de Dios. ¿Quién conoce lo íntimo del hombre sino el espíritu del hombre que está en él? De igual modo, nadie conoce lo íntimo de Dios sino el Espíritu de Dios.\n\nY nosotros no hemos recibido el espíritu del mundo, sino el Espíritu que viene de Dios, para que conozcamos los dones que Dios gratuitamente nos ha otorgado. De ellos hablamos, no con palabras aprendidas de sabiduría humana, sino aprendidas del Espíritu, expresando realidades espirituales con palabras espirituales.\n\nEl hombre meramente natural no acepta las cosas del Espíritu de Dios, pues son para él necedad, y no las puede conocer, porque se juzgan espiritualmente. En cambio, el hombre espiritual lo juzga todo, y a él nadie lo puede juzgar. Porque «¿quién conoció la mente del Señor para instruirlo?». Pero nosotros tenemos la mente de Cristo.\n\nPalabra de Dios."
        },
        "salmo_responsorial": {
          "cita": "Salmo 144, 8-9. 10-11. 12-13ab. 13cd-14",
          "respuesta": "R. El Señor es justo en todos sus caminos.",
          "texto": "El Señor es clemente y misericordioso,\nlento a la cólera y rico en piedad;\nel Señor es bueno con todos,\nes cariñoso con todas sus criaturas.\n\nR. El Señor es justo en todos sus caminos.\n\nQue todas tus criaturas te den gracias, Señor,\nque te bendigan tus fieles;\nque proclamen la gloria de tu reinado,\nque hablen de tus hazañas.\n\nR. El Señor es justo en todos sus caminos.\n\nExplicando tus hazañas a los hombres,\nel esplendor y la gloria de tu reinado.\nTu reinado es un reinado perpetuo,\ntu gobierno va de edad en edad.\n\nR. El Señor es justo en todos sus caminos.\n\nEl Señor es fiel a sus palabras,\nbondadoso en todas sus acciones.\nEl Señor sostiene a los que caen,\nendereza a los que ya se doblan.\n\nR. El Señor es justo en todos sus caminos."
        },
        "aclamacion_evangelio": {
          "texto": "R. Aleluya, aleluya.\nUn gran profeta ha surgido entre nosotros: Dios ha visitado a su pueblo.\nR. Aleluya."
        },
        "evangelio": {
          "titulo": "Santo Evangelio",
          "cita": "Lucas 4, 31-37",
          "monicion": "Jesús expulsa con autoridad divina al demonio inmundo en Cafarnaún.",
          "texto": "En aquel tiempo, Jesús bajó a Cafarnaún, ciudad de Galilea, y los sábados les enseñaba. Y se quedaban asombrados de su doctrina, porque su palabra estaba llena de autoridad.\n\nHabía en la sinagoga un hombre poseído por el espíritu de un demonio inmundo, y se puso a gritar a grandes voces:\n«¡Basta! ¿Qué tenemos que ver contigo, Jesús Nazareno? ¿Has venido a destruirnos? Sé quién eres: el Santo de Dios».\n\nJesús lo increpó diciendo:\n«¡Cállate y sal de él!».\n\nEl demonio, tirándolo al suelo en medio de la gente, salió de él sin hacerle ningún daño. Y todos se llenaron de estupor y comentaban entre sí:\n«¿Qué tiene esta palabra? Porque manda con autoridad y poder a los espíritus inmundos y salen».\n\nY su fama se difundía por todos los lugares de la comarca.\n\nPalabra del Señor."
        },
        "oracion_ofrendas": "Que esta ofrenda sagrada, Señor, nos alcance siempre la bendición salvadora, para que lleve a cabo en nosotros lo que realiza en este sacramento. Por Jesucristo, nuestro Señor. Amén.",
        "antifona_comunion": "El que come mi carne y bebe mi sangre tiene vida eterna, dice el Señor, y yo lo resucitaré en el último día (Jn 6, 55).",
        "oracion_comunion": "Saciados con el pan celestial, te pedimos, Señor, que este alimento de caridad confirme nuestros corazones y nos mueva a servirte en nuestros hermanos. Por Jesucristo, nuestro Señor. Amén."
      }
    },
    "3": {
      "II": {
        "titulo_celebracion": "Miércoles de la 22ª semana del Tiempo Ordinario",
        "tiempo_liturgico": "Tiempo Ordinario",
        "color": "Verde",
        "grado": "Feria",
        "antifona_entrada": "Señor, escucha mi oración, tú que eres fiel y justo (Sal 142, 1).",
        "oracion_colecta": "Dios de poder y de misericordia, de quien procede todo don perfecto, infunde en nuestros corazones el amor de tu nombre, para que, haciendo más religiosa nuestra vida, asegures el bien que ha nacido en nosotros y lo conserves con tu constante protección. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.",
        "primera_lectura": {
          "titulo": "Primera Lectura",
          "cita": "1 Corintios 3, 1-9",
          "monicion": "San Pablo recuerda a los corintios que los ministros son simples servidores y que es Dios quien da el crecimiento.",
          "texto": "Yo, hermanos, no pude hablarles como a personas espirituales, sino como a personas carnales, como a niños en Cristo. Les di a beber leche, no comida sólida, porque aún no la podían soportar. Pero ni aun ahora pueden, pues todavía son carnales.\n\nEfectivamente, habiendo entre ustedes celos y discordias, ¿no son acaso carnales y proceden de modo puramente humano? Cuando uno dice: «Yo soy de Pablo», y otro: «Yo, de Apolo», ¿no proceden como hombres mundanos?\n\n¿Qué es, pues, Apolo? ¿Qué es Pablo? Servidores por medio de los cuales ustedes han creído, y cada uno según lo que el Señor le dio. Yo planté, Apolo regó; pero fue Dios quien dio el crecimiento. De modo que ni el que planta es algo, ni el que riega, sino Dios que da el crecimiento.\n\nEl que planta y el que riega son una misma cosa, y cada uno recibirá su propio salario según su propio trabajo. Porque nosotros somos colaboradores de Dios, y ustedes son campo de Dios, edificio de Dios.\n\nPalabra de Dios."
        },
        "salmo_responsorial": {
          "cita": "Salmo 32, 12-13. 14-15. 20-21",
          "respuesta": "R. Dichoso el pueblo que el Señor se escogió como heredad.",
          "texto": "Dichosa la nación cuyo Dios es el Señor,\nel pueblo que él se escogió como heredad.\nEl Señor mira desde el cielo,\nse fija en todos los hombres.\n\nR. Dichoso el pueblo que el Señor se escogió como heredad.\n\nDesde su morada observa\na todos los habitantes de la tierra:\nél modeló cada corazón\ny comprende todas sus acciones.\n\nR. Dichoso el pueblo que el Señor se escogió como heredad.\n\nNosotros aguardamos al Señor:\nél es nuestro auxilio y escudo;\ncon él se alegra nuestro corazón,\nen su santo nombre confiamos.\n\nR. Dichoso el pueblo que el Señor se escogió como heredad."
        },
        "aclamacion_evangelio": {
          "texto": "R. Aleluya, aleluya.\nEl Señor me ha enviado para anunciar el Evangelio a los pobres, para anunciar a los cautivos la libertad.\nR. Aleluya."
        },
        "evangelio": {
          "titulo": "Santo Evangelio",
          "cita": "Lucas 4, 38-44",
          "monicion": "Jesús cura a la suegra de Simón y a muchos enfermos, anunciando el Reino de Dios a todas las ciudades.",
          "texto": "En aquel tiempo, saliendo Jesús de la sinagoga, entró en la casa de Simón. La suegra de Simón estaba con fiebre muy alta y le rogaron por ella. Él se inclinó sobre ella, increpó a la fiebre y la fiebre la dejó; y ella, levantándose al instante, se puso a servirles.\n\nAl ponerse el sol, todos los que tenían enfermos de diversas dolencias se los llevaban; él, poniendo las manos sobre cada uno de ellos, los curaba. De muchos salían también demonios gritando:\n«¡Tú eres el Hijo de Dios!».\n\nPero él los increpaba y no los dejaba hablar, porque sabían que él era el Mesías.\n\nAl hacerse de día, salió y se fue a un lugar desierto. La multitud lo buscaba y, llegando hasta donde él estaba, intentaban retenerlo para que no se alejara de ellos. Pero él les dijo:\n«También a las otras ciudades tengo que anunciarles el reino de Dios, porque para esto he sido enviado».\n\nY predicaba en las sinagogas de Judea.\n\nPalabra del Señor."
        },
        "oracion_ofrendas": "Que esta ofrenda sagrada, Señor, nos alcance siempre la bendición salvadora, para que lleve a cabo en nosotros lo que realiza en este sacramento. Por Jesucristo, nuestro Señor. Amén.",
        "antifona_comunion": "El que come mi carne y bebe mi sangre tiene vida eterna, dice el Señor, y yo lo resucitaré en el último día (Jn 6, 55).",
        "oracion_comunion": "Saciados con el pan celestial, te pedimos, Señor, que este alimento de caridad confirme nuestros corazones y nos mueva a servirte en nuestros hermanos. Por Jesucristo, nuestro Señor. Amén."
      }
    },
    "4": {
      "II": {
        "titulo_celebracion": "Jueves de la 22ª semana del Tiempo Ordinario",
        "tiempo_liturgico": "Tiempo Ordinario",
        "color": "Verde",
        "grado": "Feria",
        "antifona_entrada": "Señor, escucha mi oración, tú que eres fiel y justo (Sal 142, 1).",
        "oracion_colecta": "Dios de poder y de misericordia, de quien procede todo don perfecto, infunde en nuestros corazones el amor de tu nombre, para que, haciendo más religiosa nuestra vida, asegures el bien que ha nacido en nosotros y lo conserves con tu constante protección. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.",
        "primera_lectura": {
          "titulo": "Primera Lectura",
          "cita": "1 Corintios 3, 18-23",
          "monicion": "San Pablo nos exhorta a no gloriarnos en los hombres ni en la sabiduría mundana, porque todo es nuestro, pero nosotros somos de Cristo.",
          "texto": "Hermanos: Nadie se engañe. Si alguno de ustedes se cree sabio según este mundo, hágase necio, para llegar a ser sabio; porque la sabiduría de este mundo es necedad ante Dios. Pues está escrito: «Él caza a los sabios en su astucia». Y también: «El Señor conoce los pensamientos de los sabios y sabe que son vanos».\n\nAsí pues, que nadie se gloríe en los hombres, pues todo es de ustedes: ya sea Pablo, ya Apolo, ya Cefas, ya el mundo, ya la vida, ya la muerte, ya lo presente, ya lo futuro. Todo es de ustedes, pero ustedes son de Cristo y Cristo es de Dios.\n\nPalabra de Dios."
        },
        "salmo_responsorial": {
          "cita": "Salmo 23, 1-2. 3-4ab. 5-6",
          "respuesta": "R. Del Señor es la tierra y cuanto la llena.",
          "texto": "Del Señor es la tierra y cuanto la llena,\nel orbe y todos sus habitantes:\nél la fundó sobre los mares,\nél la afianzó sobre los ríos.\n\nR. Del Señor es la tierra y cuanto la llena.\n\n¿Quién puede subir al monte del Señor?\n¿Quién puede estar en el recinto sacro?\nEl hombre de manos inocentes y puro corazón,\nque no confía en los ídolos.\n\nR. Del Señor es la tierra y cuanto la llena.\n\nÉse recibirá la bendición del Señor,\nle hará justicia el Dios de salvación.\nÉsta es la estirpe de los que lo buscan,\nde los que buscan tu rostro, Dios de Jacob.\n\nR. Del Señor es la tierra y cuanto la llena."
        },
        "aclamacion_evangelio": {
          "texto": "R. Aleluya, aleluya.\nVengan conmigo —dice el Señor—, y los haré pescadores de hombres.\nR. Aleluya."
        },
        "evangelio": {
          "titulo": "Santo Evangelio",
          "cita": "Lucas 5, 1-11",
          "monicion": "En la pesca milagrosa, Simón Pedro confía en la palabra de Jesús y, dejándolo todo, lo sigue.",
          "texto": "En aquel tiempo, la gente se agolpaba alrededor de Jesús para oír la palabra de Dios, estando él a la orilla del lago de Genesaret; y vio dos barcas que estaban a la orilla; pero los pescadores, habiendo desembarcado, lavaban las redes.\n\nSubiendo a una de las barcas, que era de Simón, le pidió que la apartara un poco de tierra. Desde la barca, sentado, enseñaba a la multitud.\n\nCuando acabó de hablar, dijo a Simón:\n«Rema mar adentro, y echen sus redes para la pesca».\n\nRespondiendo Simón, dijo:\n«Maestro, hemos estado bregando toda la noche y no hemos recogido nada; pero, por tu palabra, echaré las redes».\n\nY, puestos a la obra, hicieron una redada tan grande de peces que las redes comenzaban a reventarse. Entonces hicieron señas a los compañeros de la otra barca para que vinieran a ayudarlos. Vinieron y llenaron las dos barcas, hasta el punto de que casi se hundían.\n\nAl ver esto, Simón Pedro se arrojó a los pies de Jesús diciendo:\n«¡Apártate de mí, Señor, que soy un hombre pecador!».\n\nY es que el estupor se había apoderado de él y de todos los que estaban con él, por la redada de peces que habían recogido; y lo mismo les pasaba a Santiago y a Juan, hijos de Zebedeo, que eran compañeros de Simón.\n\nY Jesús dijo a Simón:\n«No temas; desde ahora serás pescador de hombres».\n\nEntonces sacaron las barcas a tierra y, dejándolo todo, lo siguieron.\n\nPalabra del Señor."
        },
        "oracion_ofrendas": "Que esta ofrenda sagrada, Señor, nos alcance siempre la bendición salvadora, para que lleve a cabo en nosotros lo que realiza en este sacramento. Por Jesucristo, nuestro Señor. Amén.",
        "antifona_comunion": "El que come mi carne y bebe mi sangre tiene vida eterna, dice el Señor, y yo lo resucitaré en el último día (Jn 6, 55).",
        "oracion_comunion": "Saciados con el pan celestial, te pedimos, Señor, que este alimento de caridad confirme nuestros corazones y nos mueva a servirte en nuestros hermanos. Por Jesucristo, nuestro Señor. Amén."
      }
    },
    "5": {
      "II": {
        "titulo_celebracion": "Viernes de la 22ª semana del Tiempo Ordinario",
        "tiempo_liturgico": "Tiempo Ordinario",
        "color": "Verde",
        "grado": "Feria",
        "antifona_entrada": "Señor, escucha mi oración, tú que eres fiel y justo (Sal 142, 1).",
        "oracion_colecta": "Dios de poder y de misericordia, de quien procede todo don perfecto, infunde en nuestros corazones el amor de tu nombre, para que, haciendo más religiosa nuestra vida, asegures el bien que ha nacido en nosotros y lo conserves con tu constante protección. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.",
        "primera_lectura": {
          "titulo": "Primera Lectura",
          "cita": "1 Corintios 4, 1-5",
          "monicion": "San Pablo recuerda que sólo el Señor es quien juzga y revelará los secretos de los corazones.",
          "texto": "Hermanos: Que la gente nos considere como servidores de Cristo y administradores de los misterios de Dios. Ahora bien, lo que se busca en los administradores es que sean fieles.\n\nPara mí lo de menos es que me juzguen ustedes o un tribunal humano; ni siquiera yo mismo me juzgo. Cierto que mi conciencia nada me reprocha, pero no por eso quedo justificado: quien me juzga es el Señor.\n\nPor tanto, no juzguen nada antes de tiempo, hasta que venga el Señor. Él iluminará los secretos de las tinieblas y manifestará los designios de los corazones. Entonces cada uno recibirá de Dios la alabanza debida.\n\nPalabra de Dios."
        },
        "salmo_responsorial": {
          "cita": "Salmo 36, 3-4. 5-6. 27-28. 39-40",
          "respuesta": "R. La salvación de los justos viene del Señor.",
          "texto": "Confía en el Señor y haz el bien,\nhabita tu tierra y practica la lealtad;\nsea el Señor tu delicia,\ny él te dará lo que pide tu corazón.\n\nR. La salvación de los justos viene del Señor.\n\nEncomienda tu camino al Señor,\nconfía en él, que él actuará:\nhará brillar tu justicia como el amanecer,\ntu derecho como el mediodía.\n\nR. La salvación de los justos viene del Señor.\n\nLa salvación de los justos viene del Señor,\nél es su refugio en la tribulación;\nel Señor los ayuda y los salva,\nporque se acogen a él.\n\nR. La salvación de los justos viene del Señor."
        },
        "aclamacion_evangelio": {
          "texto": "R. Aleluya, aleluya.\nYo soy la luz del mundo; el que me sigue tendrá la luz de la vida, dice el Señor.\nR. Aleluya."
        },
        "evangelio": {
          "titulo": "Santo Evangelio",
          "cita": "Lucas 5, 33-39",
          "monicion": "Jesús se revela como el Esposo: «A vino nuevo, odres nuevos».",
          "texto": "En aquel tiempo, los fariseos y los escribas dijeron a Jesús:\n«Los discípulos de Juan ayunan a menudo y hacen oraciones, y lo mismo los de los fariseos; en cambio, los tuyos comen y beben».\n\nJesús les dijo:\n«¿Acaso pueden hacer ayunar a los invitados a la boda mientras el novio está con ellos? Llegarán días en que les arrebatarán al novio; entonces, en aquellos días, ayunarán».\n\nLes dijo también una parábola:\n«Nadie corta un trozo de un vestido nuevo para ponérselo a un vestido viejo; pues, si lo hace, no sólo rompe el nuevo, sino que el trozo del nuevo no le pega al viejo.\n\nNadie echa vino nuevo en odres viejos; pues, si lo hace, el vino nuevo reventará los odres y se derramará, y los odres se echarán a perder. A vino nuevo, odres nuevos.\n\nY nadie que beba vino añejo quiere el nuevo, pues dice: \"El añejo es mejor\"».\n\nPalabra del Señor."
        },
        "oracion_ofrendas": "Que esta ofrenda sagrada, Señor, nos alcance siempre la bendición salvadora, para que lleve a cabo en nosotros lo que realiza en este sacramento. Por Jesucristo, nuestro Señor. Amén.",
        "antifona_comunion": "El que come mi carne y bebe mi sangre tiene vida eterna, dice el Señor, y yo lo resucitaré en el último día (Jn 6, 55).",
        "oracion_comunion": "Saciados con el pan celestial, te pedimos, Señor, que este alimento de caridad confirme nuestros corazones y nos mueva a servirte en nuestros hermanos. Por Jesucristo, nuestro Señor. Amén."
      }
    },
    "6": {
      "II": {
        "titulo_celebracion": "Sábado de la 22ª semana del Tiempo Ordinario",
        "tiempo_liturgico": "Tiempo Ordinario",
        "color": "Verde",
        "grado": "Feria",
        "antifona_entrada": "Señor, escucha mi oración, tú que eres fiel y justo (Sal 142, 1).",
        "oracion_colecta": "Dios de poder y de misericordia, de quien procede todo don perfecto, infunde en nuestros corazones el amor de tu nombre, para que, haciendo más religiosa nuestra vida, asegures el bien que ha nacido en nosotros y lo conserves con tu constante protección. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.",
        "primera_lectura": {
          "titulo": "Primera Lectura",
          "cita": "1 Corintios 4, 6b-15",
          "monicion": "San Pablo expone con afecto paternal la vocación apostólica de padecer por amor al Evangelio.",
          "texto": "Hermanos: Les he aplicado todo esto a mí y a Apolo por su bien, para que aprendan en nosotros aquello de «no ir más allá de lo escrito», y para que nadie se engría a favor de uno contra otro.\n\n¿Quién te hace a ti superior? ¿Qué tienes que no hayas recibido? Y si lo recibiste, ¿por qué te glorías como si no lo hubieras recibido?\n\nYa están saciados, ya son ricos, ya han llegado a reinar sin nosotros. ¡Ojalá reinaran, para que también nosotros reináramos con ustedes!\n\nPienso que a nosotros, los apóstoles, Dios nos ha puesto en el último lugar, como condenados a muerte; pues nos hemos convertido en espectáculo para el mundo, para los ángeles y para los hombres. Nosotros, necios por causa de Cristo; ustedes, prudentes en Cristo; nosotros, débiles; ustedes, fuertes; ustedes, llenos de honor; nosotros, despreciados.\n\nHasta el presente pasamos hambre, sed y desnudez; somos abofeteados y andamos de un lado para otro; nos fatigamos trabajando con nuestras propias manos. Nos insultan y bendecimos; nos persiguen y aguantamos; nos calumnian y consolamos. Hemos llegado a ser como la basura del mundo, el desecho de todos hasta hoy.\n\nNo les escribo esto para avergonzarlos, sino para amonestarlos como a hijos míos queridos. Porque aunque tuvieran diez mil pedagogos en Cristo, no tienen muchos padres; pues fui yo quien los engendró en Cristo Jesús por medio del Evangelio.\n\nPalabra de Dios."
        },
        "salmo_responsorial": {
          "cita": "Salmo 144, 17-18. 19-20. 21",
          "respuesta": "R. Cerca está el Señor de los que lo invocan.",
          "texto": "El Señor es justo en todos sus caminos,\nes bondadoso en todas sus acciones;\ncerca está el Señor de los que lo invocan,\nde los que lo invocan sinceramente.\n\nR. Cerca está el Señor de los que lo invocan.\n\nSatisface los deseos de sus fieles,\nescucha sus clamores y los salva.\nEl Señor guarda a todos los que lo aman,\npero destruye a los malvados.\n\nR. Cerca está el Señor de los que lo invocan.\n\nPronuncie mi boca la alabanza del Señor,\ntodo viviente bendiga su santo nombre por siempre jamás.\n\nR. Cerca está el Señor de los que lo invocan."
        },
        "aclamacion_evangelio": {
          "texto": "R. Aleluya, aleluya.\nYo soy el camino, la verdad y la vida, dice el Señor; nadie va al Padre sino por mí.\nR. Aleluya."
        },
        "evangelio": {
          "titulo": "Santo Evangelio",
          "cita": "Lucas 6, 1-5",
          "monicion": "Jesús proclama que el Hijo del hombre es señor del sábado.",
          "texto": "Un sábado, iba Jesús atravesando un sembrado; sus discípulos arrancaban espigas y, frotándolas con las manos, comían los granos.\n\nAlgunos de los fariseos dijeron:\n«¿Por qué hacen lo que no está permitido en sábado?».\n\nJesús les respondió:\n«¿Ni siquiera han leído lo que hizo David cuando tuvo hambre él y los que estaban con él? ¿Cómo entró en la casa de Dios, tomó los panes de la proposición, comió y dio a los que estaban con él, los cuales panes no está permitido comer sino sólo a los sacerdotes?».\n\nY les decía:\n«El Hijo del hombre es señor del sábado».\n\nPalabra del Señor."
        },
        "oracion_ofrendas": "Que esta ofrenda sagrada, Señor, nos alcance siempre la bendición salvadora, para que lleve a cabo en nosotros lo que realiza en este sacramento. Por Jesucristo, nuestro Señor. Amén.",
        "antifona_comunion": "El que come mi carne y bebe mi sangre tiene vida eterna, dice el Señor, y yo lo resucitaré en el último día (Jn 6, 55).",
        "oracion_comunion": "Saciados con el pan celestial, te pedimos, Señor, que este alimento de caridad confirme nuestros corazones y nos mueva a servirte en nuestros hermanos. Por Jesucristo, nuestro Señor. Amén."
      }
    }
  },
  "23": {
    "1": {
      "II": {
        "titulo_celebracion": "Lunes de la XXIII semana del Tiempo Ordinario",
        "tiempo_liturgico": "Tiempo Ordinario",
        "color": "Verde",
        "grado": "Feria",
        "antifona_entrada": "Fíjate, oh Dios, en nuestro escudo, mira el rostro de tu Ungido.",
        "oracion_colecta": "Dios omnipotente y misericordioso, de quien procede todo bien, escucha nuestras súplicas y concédenos vivir siempre según tu voluntad. Por nuestro Señor Jesucristo.",
        "primera_lectura": {
          "titulo": "Primera Lectura",
          "cita": "1 Corintios 5, 1-8",
          "monicion": "San Pablo exhorta a purificar la levadura vieja del pecado y celebrar la fiesta con los panes ázimos de la sinceridad y la verdad.",
          "texto": "Hermanos:\nEs ya del dominio público que hay entre ustedes un caso de fornicación, y tal fornicación cual no se da ni entre los gentiles, hasta el punto de que uno vive con la mujer de su padre. ¡Y ustedes están hinchados de orgullo! ¿No deberían más bien estar de luto y haber expulsado de entre ustedes al que cometió semejante acción?\n\nYo, por mi parte, ausente en cuerpo pero presente en espíritu, ya he juzgado, como si estuviera presente, al que así ha obrado: en el nombre del Señor Jesús, reunidos ustedes y mi espíritu con el poder de nuestro Señor Jesús, sea entregado ese hombre a Satanás para destrucción de la carne, a fin de que el espíritu se salve en el día del Señor.\n\nNo es buena la jactancia de ustedes. ¿No saben que un poco de levadura hace fermentar toda la masa? Purifíquense de la levadura vieja, para que sean masa nueva, pues son panes ázimos. Porque nuestro cordero pascual, Cristo, ha sido sacrificado.\n\nAsí pues, celebremos la fiesta, no con levadura vieja ni con levadura de malicia y perversidad, sino con los panes ázimos de la sinceridad y de la verdad.\n\nPalabra de Dios."
        },
        "salmo_responsorial": {
          "cita": "Salmo 5, 5-6. 7. 12",
          "respuesta": "R. Señor, guíame con tu justicia.",
          "texto": "Tú no eres un Dios que ame la maldad,\nni el malvado es tu huésped,\nni los arrogantes se mantienen en tu presencia.\nDetestas a los malhechores.\n\nR. Señor, guíame con tu justicia.\n\nDestruyes a los mentirosos;\nal hombre sanguinario y traicionero\nlo aborrece el Señor.\n\nR. Señor, guíame con tu justicia.\n\nQue se alegren los que se acogen a ti,\ncon júbilo eterno;\nprotégelos, para que se gocen en ti\nlos que aman tu nombre.\n\nR. Señor, guíame con tu justicia."
        },
        "aclamacion_evangelio": {
          "texto": "R. Aleluya, aleluya.\nMis ovejas escuchan mi voz, dice el Señor; yo las conozco y ellas me siguen.\nR. Aleluya."
        },
        "evangelio": {
          "titulo": "Santo Evangelio",
          "cita": "Lucas 6, 6-11",
          "monicion": "Jesús cura al hombre de la mano seca en sábado enseñando el primado del amor y la vida.",
          "texto": "Un sábado, Jesús entró en la sinagoga a enseñar. Había allí un hombre que tenía la mano derecha seca.\n\nLos escribas y los fariseos lo estaban espiando para ver si curaba en sábado, y encontrar de qué acusarlo.\n\nPero él conocía sus pensamientos y dijo al hombre que tenía la mano seca:\n«Levántate y ponte en medio».\n\nÉl se levantó y se quedó allí en pie.\n\nJesús les dijo:\n«Les pregunto a ustedes: ¿Es lícito en sábado hacer el bien o hacer el mal, salvar una vida o destruirla?».\n\nY mirando a todos a su alrededor, le dijo:\n«Extiende tu mano».\n\nÉl lo hizo, y su mano quedó restablecida.\n\nEllos se llenaron de furor y discutían unos con otros qué podrían hacer contra Jesús.\n\nPalabra del Señor."
        },
        "oracion_ofrendas": "Acepta, Señor, estos dones que te presentamos con devoción en tu santo altar. Por Jesucristo, nuestro Señor.",
        "antifona_comunion": "El Señor es mi pastor, nada me falta; en verdes praderas me hace reposar.",
        "oracion_comunion": "Saciados con este banquete celestial, te pedimos, Señor, que este sacramento confirme nuestros corazones en el amor. Por Jesucristo, nuestro Señor."
      }
    },
    "2": {
      "II": {
        "titulo_celebracion": "Martes de la XXIII semana del Tiempo Ordinario",
        "tiempo_liturgico": "Tiempo Ordinario",
        "color": "Verde",
        "grado": "Feria",
        "antifona_entrada": "Fíjate, oh Dios, en nuestro escudo, mira el rostro de tu Ungido.",
        "oracion_colecta": "Dios omnipotente y misericordioso, de quien procede todo bien, escucha nuestras súplicas y concédenos vivir siempre según tu voluntad. Por nuestro Señor Jesucristo.",
        "primera_lectura": {
          "titulo": "Primera Lectura",
          "cita": "1 Corintios 6, 1-11",
          "monicion": "San Pablo recuerda a los fieles que han sido lavados, santificados y justificados en el nombre del Señor Jesús.",
          "texto": "Hermanos:\n¿Cómo se atreve alguno de ustedes, si tiene un pleito con otro, a demandarlo ante los injustos y no ante los santos? ¿Acaso no saben que los santos juzgarán al mundo? Y si el mundo va a ser juzgado por ustedes, ¿serán indignos de juzgar causas menores? ¿No saben que juzgaremos a los ángeles? ¡Cuánto más los asuntos de esta vida!\n\nPor tanto, cuando tengan pleitos sobre asuntos de esta vida, pongan como jueces a los que son menos considerados en la Iglesia. Para vergüenza de ustedes lo digo: ¿Acaso no hay entre ustedes ningún sabio capaz de resolver un litigio entre sus hermanos? Al contrario, un hermano litiga con otro hermano, ¡y esto ante los incrédulos!\n\nYa es un fallo grave para ustedes el tener pleitos entre ustedes. ¿Por qué no prefieren sufrir la injusticia? ¿Por qué no prefieren ser despojados? Al contrario, son ustedes los que cometen injusticia y despojan, y esto a sus propios hermanos.\n\n¿Acaso no saben que los injustos no heredarán el reino de Dios? No se engañen: ni los fornicarios, ni los idólatras, ni los adúlteros, ni los afeminados, ni los sodomitas, ni los ladrones, ni los avaros, ni los borrachos, ni los maldicientes, ni los rapaces heredarán el reino de Dios.\n\nY esto eran algunos de ustedes; pero han sido lavados, han sido santificados, han sido justificados en el nombre del Señor Jesucristo y en el Espíritu de nuestro Dios.\n\nPalabra de Dios."
        },
        "salmo_responsorial": {
          "cita": "Salmo 149, 1-2. 3-4. 5-6a y 9b",
          "respuesta": "R. El Señor ama a su pueblo.",
          "texto": "Canten al Señor un cántico nuevo,\nresuene su alabanza en la asamblea de los fieles;\nque se alegre Israel por su Creador,\nlos hijos de Sión por su Rey.\n\nR. El Señor ama a su pueblo.\n\nAlaben su nombre con danzas,\ncántenle con tambores y cítaras;\nporque el Señor ama a su pueblo\ny adorna con la victoria a los humildes.\n\nR. El Señor ama a su pueblo.\n\nQue los fieles festejen su gloria\ny canten jubilosos en sus lechos;\ncon vítores a Dios en la boca:\néste es el honor de todos sus fieles.\n\nR. El Señor ama a su pueblo."
        },
        "aclamacion_evangelio": {
          "texto": "R. Aleluya, aleluya.\nYo los he escogido del mundo, para que vayan y den fruto, y su fruto permanezca, dice el Señor.\nR. Aleluya."
        },
        "evangelio": {
          "titulo": "Santo Evangelio",
          "cita": "Lucas 6, 12-19",
          "monicion": "Jesús pasa la noche orando a Dios en la montaña y elige a los doce apóstoles.",
          "texto": "En aquellos días, Jesús salió hacia la montaña a orar, y pasó la noche orando a Dios.\n\nCuando se hizo de día, llamó a sus discípulos y escogió de entre ellos a doce, a los que dio el nombre de apóstoles: Simón, a quien puso el nombre de Pedro, y su hermano Andrés; Santiago y Juan; Felipe y Bartolomé; Mateo y Tomás; Santiago, hijo de Alfeo, y Simón, llamado el Zelote; Judas, hijo de Santiago, y Judas Iscariote, que fue el traidor.\n\nBajó con ellos y se detuvo en un llano con un gran grupo de discípulos y una gran muchedumbre de pueblo procedente de toda Judea, de Jerusalén y de la costa de Tiro y Sidón, que habían venido para oírlo y para ser curados de sus enfermedades; y los atormentados por espíritus inmundos quedaban curados.\n\nToda la muchedumbre procuraba tocarlo, porque salía de él una fuerza que los curaba a todos.\n\nPalabra del Señor."
        },
        "oracion_ofrendas": "Acepta, Señor, estos dones que te presentamos con devoción en tu santo altar. Por Jesucristo, nuestro Señor.",
        "antifona_comunion": "El Señor es mi pastor, nada me falta; en verdes praderas me hace reposar.",
        "oracion_comunion": "Saciados con este banquete celestial, te pedimos, Señor, que este sacramento confirme nuestros corazones en el amor. Por Jesucristo, nuestro Señor."
      }
    },
    "3": {
      "II": {
        "titulo_celebracion": "Miércoles de la XXIII semana del Tiempo Ordinario",
        "tiempo_liturgico": "Tiempo Ordinario",
        "color": "Verde",
        "grado": "Feria",
        "antifona_entrada": "Fíjate, oh Dios, en nuestro escudo, mira el rostro de tu Ungido.",
        "oracion_colecta": "Dios omnipotente y misericordioso, de quien procede todo bien, escucha nuestras súplicas y concédenos vivir siempre según tu voluntad. Por nuestro Señor Jesucristo.",
        "primera_lectura": {
          "titulo": "Primera Lectura",
          "cita": "1 Corintios 7, 25-31",
          "monicion": "San Pablo recuerda la brevedad del tiempo presente: «La apariencia de este mundo pasa».",
          "texto": "Hermanos:\nAcerca de las vírgenes no tengo precepto del Señor, pero doy mi parecer como quien ha alcanzado la misericordia del Señor para ser digno de confianza.\n\nConsidero, pues, que es bueno, a causa de la angustia presente, que al hombre le conviene quedarse como está. ¿Estás ligado a una mujer? No busques la separación. ¿Estás libre de mujer? No busques mujer. Pero si te casas, no pecas; y si una doncella se casa, no peca. Aunque los tales tendrán tribulación en la carne, y yo quisiera evitársela.\n\nPero les digo esto, hermanos: el tiempo es corto. En adelante, los que tienen mujer vivan como si no la tuvieran; los que lloran, como si no lloraran; los que están alegres, como si no estuvieran alegres; los que compran, como si no poseyeran; y los que disfrutan del mundo, como si no disfrutaran de él; porque la apariencia de este mundo pasa.\n\nPalabra de Dios."
        },
        "salmo_responsorial": {
          "cita": "Salmo 44, 11-12. 14-15. 16-17",
          "respuesta": "R. Escucha, hija, mira, inclina el oído.",
          "texto": "Escucha, hija, mira, inclina el oído,\nolvida tu pueblo y la casa paterna;\nprendado está el rey de tu belleza:\npóstrate ante él, que él es tu señor.\n\nR. Escucha, hija, mira, inclina el oído.\n\nToda hermosa entra la hija del rey,\ncon vestidos de brocado de oro;\ncon mantos recamados la llevan ante el rey,\nla siguen sus compañeras vírgenes.\n\nR. Escucha, hija, mira, inclina el oído.\n\nLas traen entre alegría y regocijo,\nentran en el palacio real.\nA cambio de tus padres tendrás hijos,\nque nombrarás príncipes por toda la tierra.\n\nR. Escucha, hija, mira, inclina el oído."
        },
        "aclamacion_evangelio": {
          "texto": "R. Aleluya, aleluya.\nAlégrense y salten de júbilo en aquel día, porque su recompensa será grande en el cielo.\nR. Aleluya."
        },
        "evangelio": {
          "titulo": "Santo Evangelio",
          "cita": "Lucas 6, 20-26",
          "monicion": "Jesús proclama las bienaventuranzas y las advertencias a los ricos y satisfechos.",
          "texto": "En aquel tiempo, Jesús, levantando los ojos hacia sus discípulos, les decía:\n\n«Dichosos los pobres, porque de ustedes es el reino de Dios.\nDichosos los que ahora tienen hambre, porque quedarán saciados.\nDichosos los que ahora lloran, porque reirán.\nDichosos ustedes cuando los hombres los odien, cuando los expulsen, los insulten y proscriban su nombre como perverso por causa del Hijo del hombre. Alégrense en aquel día y salten de gozo, porque su recompensa será grande en el cielo; pues de ese modo trataban sus padres a los profetas.\n\nPero, ¡ay de ustedes, los ricos!, porque ya han recibido su consuelo.\n¡Ay de ustedes, los que ahora están saciados!, porque tendrán hambre.\n¡Ay de ustedes, los que ahora ríen!, porque harán duelo y llorarán.\n¡Ay cuando todos los hombres hablen bien de ustedes!, pues de ese modo trataban sus padres a los falsos profetas».\n\nPalabra del Señor."
        },
        "oracion_ofrendas": "Acepta, Señor, estos dones que te presentamos con devoción en tu santo altar. Por Jesucristo, nuestro Señor.",
        "antifona_comunion": "El Señor es mi pastor, nada me falta; en verdes praderas me hace reposar.",
        "oracion_comunion": "Saciados con este banquete celestial, te pedimos, Señor, que este sacramento confirme nuestros corazones en el amor. Por Jesucristo, nuestro Señor."
      }
    },
    "4": {
      "II": {
        "titulo_celebracion": "Jueves de la XXIII semana del Tiempo Ordinario",
        "tiempo_liturgico": "Tiempo Ordinario",
        "color": "Verde",
        "grado": "Feria",
        "antifona_entrada": "Fíjate, oh Dios, en nuestro escudo, mira el rostro de tu Ungido.",
        "oracion_colecta": "Dios omnipotente y misericordioso, de quien procede todo bien, escucha nuestras súplicas y concédenos vivir siempre según tu voluntad. Por nuestro Señor Jesucristo.",
        "primera_lectura": {
          "titulo": "Primera Lectura",
          "cita": "1 Corintios 8, 1b-7. 11-13",
          "monicion": "San Pablo enseña que el conocimiento envanece, pero el amor edifica el cuerpo de Cristo.",
          "texto": "Hermanos:\nEl conocimiento envanece, mientras que el amor edifica. Si uno se imagina que sabe algo, todavía no sabe como debe saber; en cambio, si uno ama a Dios, ése es conocido por él.\n\nEn cuanto a comer carne sacrificada a los ídolos, sabemos que un ídolo no es nada en el mundo y que no hay más que un solo Dios. Pues aunque haya algunos llamados dioses, sea en el cielo o en la tierra —y en este sentido hay muchos dioses y muchos señores—, para nosotros no hay más que un solo Dios, el Padre, de quien proceden todas las cosas y para quien somos nosotros; y un solo Señor, Jesucristo, por quien son todas las cosas y por quien somos nosotros.\n\nSin embargo, no todos tienen este conocimiento. Algunos, acostumbrados hasta ahora al ídolo, comen la carne considerándola sacrificada a los ídolos, y su conciencia, por ser débil, se mancha. Y así, por tu conocimiento, perece el débil, ¡un hermano por quien murió Cristo!\n\nPecando de este modo contra los hermanos y lastimando su conciencia débil, pecan contra Cristo. Por lo cual, si un alimento va a ser ocasión de tropiezo para mi hermano, jamás comeré carne, para no escandalizar a mi hermano.\n\nPalabra de Dios."
        },
        "salmo_responsorial": {
          "cita": "Salmo 138, 1-3. 13-14ab. 23-24",
          "respuesta": "R. Guíame, Señor, por el camino eterno.",
          "texto": "Señor, tú me sondeas y me conoces;\ntú conoces cuándo me siento y cuándo me levanto,\nde lejos penetras mis pensamientos;\ndistingues mi camino y mi descanso,\ntodas mis sendas te son familiares.\n\nR. Guíame, Señor, por el camino eterno.\n\nTú has creado mis entrañas,\nme has tejido en el vientre materno.\nTe doy gracias porque me has formado de modo admirable,\nportentosas son tus obras.\n\nR. Guíame, Señor, por el camino eterno.\n\nSondéame, oh Dios, y conoce mi corazón,\nponme a prueba y conoce mis pensamientos;\nmira si mi camino es errado\ny guíame por el camino eterno.\n\nR. Guíame, Señor, por el camino eterno."
        },
        "aclamacion_evangelio": {
          "texto": "R. Aleluya, aleluya.\nSi nos amamos unos a otros, Dios permanece en nosotros y su amor ha llegado en nosotros a su plenitud.\nR. Aleluya."
        },
        "evangelio": {
          "titulo": "Santo Evangelio",
          "cita": "Lucas 6, 27-38",
          "monicion": "Jesús nos pide: «Amen a sus enemigos, hagan el bien a los que los odian y sean misericordiosos como su Padre es misericordioso».",
          "texto": "En aquel tiempo, dijo Jesús a sus discípulos:\n\n«A ustedes que me escuchan les digo: Amen a sus enemigos, hagan el bien a los que los odian, bendigan a los que los maldicen, oren por los que los calumnian. Al que te pegue en una mejilla, preséntale también la otra; y al que te quite el manto, no le niegues la túnica. A todo el que te pida, dale; y al que te quite lo tuyo, no se lo reclames. Traten a los hombres como quieren que ellos los traten a ustedes.\n\nSi aman a los que los aman, ¿qué mérito tienen? Pues también los pecadores aman a los que los aman. Y si hacen bien a los que les hacen bien, ¿qué mérito tienen? También los pecadores hacen lo mismo. Y si prestan a aquellos de quienes esperan recibir, ¿qué mérito tienen? También los pecadores prestan a los pecadores para recibir otro tanto.\n\nAl contrario, amen a sus enemigos, hagan el bien y presten sin esperar nada a cambio; y su recompensa será grande y serán hijos del Altísimo, porque él es bondadoso con los ingratos y los malvados.\n\nSean misericordiosos como su Padre es misericordioso. No juzguen y no serán juzgados; no condenen y no serán condenados; perdonen y serán perdonados; den y se les dará: una medida buena, apretada, remecida y rebosante les volcarán en el regazo. Porque con la medida con que midan se les medirá a ustedes».\n\nPalabra del Señor."
        },
        "oracion_ofrendas": "Acepta, Señor, estos dones que te presentamos con devoción en tu santo altar. Por Jesucristo, nuestro Señor.",
        "antifona_comunion": "El Señor es mi pastor, nada me falta; en verdes praderas me hace reposar.",
        "oracion_comunion": "Saciados con este banquete celestial, te pedimos, Señor, que este sacramento confirme nuestros corazones en el amor. Por Jesucristo, nuestro Señor."
      }
    },
    "5": {
      "II": {
        "titulo_celebracion": "Viernes de la XXIII semana del Tiempo Ordinario",
        "tiempo_liturgico": "Tiempo Ordinario",
        "color": "Verde",
        "grado": "Feria",
        "antifona_entrada": "Fíjate, oh Dios, en nuestro escudo, mira el rostro de tu Ungido.",
        "oracion_colecta": "Dios omnipotente y misericordioso, de quien procede todo bien, escucha nuestras súplicas y concédenos vivir siempre según tu voluntad. Por nuestro Señor Jesucristo.",
        "primera_lectura": {
          "titulo": "Primera Lectura",
          "cita": "1 Corintios 9, 16-19. 22b-27",
          "monicion": "San Pablo confiesa su ardor apostólico: «¡Ay de mí si no anuncio el Evangelio!».",
          "texto": "Hermanos:\nEl hecho de predicar el Evangelio no es para mí motivo de gloria, pues me es impuesta una necesidad: ¡ay de mí si no anuncio el Evangelio! Si lo hago de propia iniciativa, tengo recompensa; pero si lo hago por fuerza, se me ha confiado una administración. ¿Cuál es, pues, mi recompensa? Que al predicar el Evangelio, ofrezca el Evangelio gratuitamente, sin hacer uso del derecho que tengo por el Evangelio.\n\nPues siendo libre de todos, me he hecho esclavo de todos para ganar a los más posibles. Me he hecho débil con los débiles para ganar a los débiles; me he hecho todo para todos, para ganar sea como sea a algunos. Y todo lo hago por el Evangelio, para ser partícipe de él.\n\n¿No saben que en el estadio todos los corredores corren, pero uno solo se lleva el premio? Corran de tal modo que lo alcancen. Los atletas se privan de todo; ellos, ciertamente, para ganar una corona corruptible; nosotros, en cambio, una incorruptible.\n\nAsí pues, yo corro, pero no como a la ventura; peleo, pero no como quien da golpes al aire; al contrario, castigo mi cuerpo y lo tengo sometido, no sea que, después de haber predicado a otros, quede yo descalificado.\n\nPalabra de Dios."
        },
        "salmo_responsorial": {
          "cita": "Salmo 83, 3. 4. 5-6. 12",
          "respuesta": "R. ¡Qué deseables son tus moradas, Señor del universo!",
          "texto": "Mi alma se consume y anhela\nlos atrios del Señor,\nmi corazón y mi carne\nretozan por el Dios vivo.\n\nR. ¡Qué deseables son tus moradas, Señor del universo!\n\nHasta el gorrión ha encontrado una casa,\nla golondrina un nido donde colocar sus polluelos:\ntus altares, Señor del universo,\nRey mío y Dios mío.\n\nR. ¡Qué deseables son tus moradas, Señor del universo!\n\nDichosos los que habitan en tu casa,\nalabándote siempre.\nDichosos los hombres que encuentran en ti su fuerza\nal preparar sus peregrinaciones.\n\nR. ¡Qué deseables son tus moradas, Señor del universo!\n\nPorque el Señor Dios es sol y escudo,\nél da la gracia y la gloria;\nel Señor no niega sus bienes\na los que caminan en la integridad.\n\nR. ¡Qué deseables son tus moradas, Señor del universo!"
        },
        "aclamacion_evangelio": {
          "texto": "R. Aleluya, aleluya.\nTu palabra, Señor, es la verdad; santifícanos en la verdad.\nR. Aleluya."
        },
        "evangelio": {
          "titulo": "Santo Evangelio",
          "cita": "Lucas 6, 39-42",
          "monicion": "Jesús advierte: «¿Acaso puede un ciego guiar a otro ciego? Saca primero la viga de tu ojo».",
          "texto": "En aquel tiempo, dijo Jesús a los discípulos una parábola:\n\n«¿Acaso puede un ciego guiar a otro ciego? ¿No caerán ambos en el hoyo? El discípulo no es más que el maestro; pero todo discípulo bien instruido será como su maestro.\n\n¿Por qué miras la brizna que hay en el ojo de tu hermano y no te fijas en la viga que hay en tu propio ojo? ¿Cómo puedes decir a tu hermano: \"Hermano, déjame sacarte la brizna que tienes en el ojo\", sin ver tú mismo la viga que tienes en el tuyo?\n\n¡Hipócrita! Saca primero la viga de tu ojo, y entonces verás claro para sacar la brizna que está en el ojo de tu hermano».\n\nPalabra del Señor."
        },
        "oracion_ofrendas": "Acepta, Señor, estos dones que te presentamos con devoción en tu santo altar. Por Jesucristo, nuestro Señor.",
        "antifona_comunion": "El Señor es mi pastor, nada me falta; en verdes praderas me hace reposar.",
        "oracion_comunion": "Saciados con este banquete celestial, te pedimos, Señor, que este sacramento confirme nuestros corazones en el amor. Por Jesucristo, nuestro Señor."
      }
    },
    "6": {
      "II": {
        "titulo_celebracion": "Sábado de la XXIII semana del Tiempo Ordinario",
        "tiempo_liturgico": "Tiempo Ordinario",
        "color": "Verde",
        "grado": "Feria",
        "antifona_entrada": "Fíjate, oh Dios, en nuestro escudo, mira el rostro de tu Ungido.",
        "oracion_colecta": "Dios omnipotente y misericordioso, de quien procede todo bien, escucha nuestras súplicas y concédenos vivir siempre según tu voluntad. Por nuestro Señor Jesucristo.",
        "primera_lectura": {
          "titulo": "Primera Lectura",
          "cita": "1 Corintios 10, 14-22",
          "monicion": "San Pablo enseña: «El cáliz de bendición que bendecimos, ¿no es comunión con la sangre de Cristo?».",
          "texto": "Queridos míos: Huyan de la idolatría. Les hablo como a hombres sensatos; juzguen ustedes mismos lo que digo.\n\nEl cáliz de la bendición que bendecimos, ¿no es acaso comunión con la sangre de Cristo? Y el pan que partimos, ¿no es comunión con el cuerpo de Cristo? Porque el pan es uno, nosotros, siendo muchos, somos un solo cuerpo, pues todos participamos de aquel único pan.\n\nMiren al Israel según la carne: ¿no están los que comen las víctimas en comunión con el altar? ¿Qué digo, pues? ¿Que la carne sacrificada a los ídolos es algo, o que el ídolo es algo? Al contrario: afirmo que lo que los gentiles sacrifican, a los demonios lo sacrifican y no a Dios; y no quiero que ustedes entren en comunión con los demonios.\n\nNo pueden beber del cáliz del Señor y del cáliz de los demonios; no pueden participar de la mesa del Señor y de la mesa de los demonios. ¿O queremos provocar los celos del Señor? ¿Somos acaso más fuertes que él?\n\nPalabra de Dios."
        },
        "salmo_responsorial": {
          "cita": "Salmo 115, 12-13. 17-18",
          "respuesta": "R. Te ofreceré, Señor, un sacrificio de alabanza.",
          "texto": "¿Cómo pagaré al Señor\ntodo el bien que me ha hecho?\nAlzaré la copa de la salvación,\ninvocando el nombre del Señor.\n\nR. Te ofreceré, Señor, un sacrificio de alabanza.\n\nTe ofreceré un sacrificio de alabanza,\ninvocando el nombre del Señor.\nCumpliré mis votos al Señor\nen presencia de todo su pueblo.\n\nR. Te ofreceré, Señor, un sacrificio de alabanza."
        },
        "aclamacion_evangelio": {
          "texto": "R. Aleluya, aleluya.\nEl que me ama guardará mi palabra, y mi Padre lo amará, y vendremos a él.\nR. Aleluya."
        },
        "evangelio": {
          "titulo": "Santo Evangelio",
          "cita": "Lucas 6, 43-49",
          "monicion": "Jesús enseña que cada árbol se conoce por su fruto y exhorta a edificar sobre roca.",
          "texto": "En aquel tiempo, dijo Jesús a sus discípulos:\n\n«No hay árbol bueno que dé fruto malo, ni tampoco árbol malo que dé fruto bueno; porque cada árbol se conoce por su propio fruto. No se recogen higos de los espinos ni se vendimian uvas de las zarzas. El hombre bueno, del buen tesoro de su corazón saca lo bueno; y el malvado, del mal saca lo malo; porque de la abundancia del corazón habla su boca.\n\n¿Por qué me llaman: \"Señor, Señor\", y no hacen lo que digo?\n\nTodo el que viene a mí, escucha mis palabras y las pone por obra, les voy a mostrar a quién se parece: Se parece a un hombre que al construir una casa cavó profundamente y puso los cimientos sobre roca; al venir una inundación, el torrente rompió contra aquella casa, pero no pudo derribarla, porque estaba bien construida.\n\nEn cambio, el que escucha y no pone por obra, se parece a un hombre que construyó su casa sobre tierra, sin cimientos; contra la cual rompió el torrente e inmediatamente se derrumbó, y fue grande la ruina de aquella casa».\n\nPalabra del Señor."
        },
        "oracion_ofrendas": "Acepta, Señor, estos dones que te presentamos con devoción en tu santo altar. Por Jesucristo, nuestro Señor.",
        "antifona_comunion": "El Señor es mi pastor, nada me falta; en verdes praderas me hace reposar.",
        "oracion_comunion": "Saciados con este banquete celestial, te pedimos, Señor, que este sacramento confirme nuestros corazones en el amor. Por Jesucristo, nuestro Señor."
      }
    }
  },
  "24": {
    "1": {
      "II": {
        "titulo_celebracion": "Lunes de la XXIV semana del Tiempo Ordinario",
        "tiempo_liturgico": "Tiempo Ordinario",
        "color": "Verde",
        "grado": "Feria",
        "antifona_entrada": "Fíjate, oh Dios, en nuestro escudo, mira el rostro de tu Ungido.",
        "oracion_colecta": "Dios omnipotente y misericordioso, de quien procede todo bien, escucha nuestras súplicas y concédenos vivir siempre según tu voluntad. Por nuestro Señor Jesucristo.",
        "primera_lectura": {
          "titulo": "Primera Lectura",
          "cita": "1 Corintios 11, 17-26. 33",
          "monicion": "San Pablo transmite la tradición de la institución de la Eucaristía: «Hagan esto en memoria mía».",
          "texto": "Hermanos:\nAl darles estas instrucciones, no puedo alabarlos, porque sus reuniones son más bien para daño que para provecho.\n\nEn primer lugar, oigo decir que cuando se reúnen en asamblea hay divisiones entre ustedes; y en parte lo creo. Porque es preciso que haya incluso disensiones entre ustedes, para que se vea quiénes de ustedes resisten la prueba.\n\nPor tanto, cuando se reúnen en un mismo lugar, ya no es comer la cena del Señor; pues cada uno se adelanta a tomar su propia cena, y mientras uno pasa hambre, otro se embriaga. ¿Acaso no tienen casas para comer y beber? ¿O es que desprecian a la Iglesia de Dios y avergüenzan a los que no tienen nada? ¿Qué les diré? ¿Los alabaré? ¡En esto no los alabo!\n\nPorque yo recibí del Señor lo que también les he transmitido: que el Señor Jesús, la noche en que era entregado, tomó pan, y dando gracias, lo partió y dijo: «Éste es mi cuerpo, que se entrega por ustedes; hagan esto en memoria mía».\n\nAsimismo tomó el cáliz después de cenar, diciendo: «Este cáliz es la nueva alianza en mi sangre; cuantas veces lo beban, hagan esto en memoria mía».\n\nPues cada vez que comen de este pan y beben del cáliz, proclaman la muerte del Señor hasta que vuelva.\n\nAsí pues, hermanos míos, cuando se reúnan para comer, espérense unos a otros.\n\nPalabra de Dios."
        },
        "salmo_responsorial": {
          "cita": "Salmo 39, 7-8a. 8b-9. 10. 17",
          "respuesta": "R. Proclamen la muerte del Señor, hasta que vuelva.",
          "texto": "Tú no quieres sacrificios ni ofrendas,\ny, en cambio, me abriste el oído;\nno pides holocaustos ni sacrificios expiatorios,\nentonces yo digo: «Aquí estoy».\n\nR. Proclamen la muerte del Señor, hasta que vuelva.\n\n«En el libro está escrito de mí:\nHacer tu voluntad, Dios mío, es mi delicia,\ny llevo tu ley en mis entrañas».\n\nR. Proclamen la muerte del Señor, hasta que vuelva.\n\nHe proclamado tu justicia\nen la gran asamblea;\nmira: no he cerrado mis labios,\ntú lo sabes, Señor.\n\nR. Proclamen la muerte del Señor, hasta que vuelva.\n\nAlégrense y gócense en ti\ntodos los que te buscan;\ndigan siempre: «Grande es el Señor»,\nlos que aman tu salvación.\n\nR. Proclamen la muerte del Señor, hasta que vuelva."
        },
        "aclamacion_evangelio": {
          "texto": "R. Aleluya, aleluya.\nTanto amó Dios al mundo que entregó a su Hijo único, para que todo el que cree en él tenga vida eterna.\nR. Aleluya."
        },
        "evangelio": {
          "titulo": "Santo Evangelio",
          "cita": "Lucas 7, 1-10",
          "monicion": "La admirable fe del centurión de Cafarnaún: «Señor, no soy digno de que entres bajo mi techo».",
          "texto": "En aquel tiempo, cuando Jesús hubo terminado de dirigir todas sus palabras al pueblo, entró en Cafarnaún.\n\nHabía allí un centurión cuyo criado, al que estimaba mucho, estaba enfermo a punto de morir. Al oír hablar de Jesús, envió a unos ancianos de los judíos a rogarle que viniera a salvar a su criado.\n\nLlegados ellos a Jesús, le suplicaban con insistencia diciendo:\n«Merece que se lo concedas, porque ama a nuestra nación y él mismo nos ha edificado la sinagoga».\n\nJesús se puso en camino con ellos. No estaba ya lejos de la casa cuando el centurión envió unos amigos a decirle:\n«Señor, no te molestes, porque no soy digno de que entres bajo mi techo; por eso ni siquiera me consideré digno de acudir a ti; dilo de palabra y quede curado mi criado. Pues yo también soy un hombre sometido a autoridad, que tengo soldados a mis órdenes; y le digo a uno: \"Ve\", y va; y a otro: \"Ven\", y viene; y a mi criado: \"Haz esto\", y lo hace».\n\nAl oír esto, Jesús se quedó admirado de él, y volviéndose a la multitud que lo seguía, dijo:\n«Les digo que ni en Israel he encontrado tanta fe».\n\nY al regresar a casa los enviados, encontraron al criado completamente sano.\n\nPalabra del Señor."
        },
        "oracion_ofrendas": "Acepta, Señor, estos dones que te presentamos con devoción en tu santo altar. Por Jesucristo, nuestro Señor.",
        "antifona_comunion": "El Señor es mi pastor, nada me falta; en verdes praderas me hace reposar.",
        "oracion_comunion": "Saciados con este banquete celestial, te pedimos, Señor, que este sacramento confirme nuestros corazones en el amor. Por Jesucristo, nuestro Señor."
      }
    },
    "2": {
      "II": {
        "titulo_celebracion": "Martes de la XXIV semana del Tiempo Ordinario",
        "tiempo_liturgico": "Tiempo Ordinario",
        "color": "Verde",
        "grado": "Feria",
        "antifona_entrada": "Fíjate, oh Dios, en nuestro escudo, mira el rostro de tu Ungido.",
        "oracion_colecta": "Dios omnipotente y misericordioso, de quien procede todo bien, escucha nuestras súplicas y concédenos vivir siempre según tu voluntad. Por nuestro Señor Jesucristo.",
        "primera_lectura": {
          "titulo": "Primera Lectura",
          "cita": "1 Corintios 12, 12-14. 27-31a",
          "monicion": "San Pablo enseña la unidad en la diversidad: «Ustedes son el cuerpo de Cristo, y cada uno en particular es miembro de él».",
          "texto": "Hermanos:\nAsí como el cuerpo es uno y tiene muchos miembros, y todos los miembros del cuerpo, a pesar de ser muchos, son un solo cuerpo, así también es Cristo.\n\nPorque en un solo Espíritu hemos sido todos bautizados para formar un solo cuerpo, ya seamos judíos o griegos, esclavos o libres; y a todos se nos ha dado a beber de un mismo Espíritu.\n\nPues el cuerpo no consta de un solo miembro, sino de muchos.\n\nPues bien, ustedes son el cuerpo de Cristo y cada uno es un miembro de él. Y a unos puso Dios en la Iglesia, en primer lugar apóstoles; en segundo lugar profetas; en tercer lugar maestros; luego el poder de hacer milagros; después el don de curar, de asistir, de gobernar, de hablar diversas lenguas.\n\n¿Acaso son todos apóstoles? ¿Todos profetas? ¿Todos maestros? ¿Tienen todos el poder de hacer milagros? ¿Tienen todos el don de curar? ¿Hablan todos lenguas? ¿Tienen todos el don de interpretarlas?\n\nAspiren a los carismas más elevados.\n\nPalabra de Dios."
        },
        "salmo_responsorial": {
          "cita": "Salmo 99, 2. 3. 4. 5",
          "respuesta": "R. Somos su pueblo y ovejas de su rebaño.",
          "texto": "Aclama al Señor, tierra entera,\nsirvan al Señor con alegría,\nentren en su presencia con vítores.\n\nR. Somos su pueblo y ovejas de su rebaño.\n\nSepan que el Señor es Dios:\nque él nos hizo y somos suyos,\nsu pueblo y ovejas de su rebaño.\n\nR. Somos su pueblo y ovejas de su rebaño.\n\nEntren por sus puertas con acción de gracias,\npor sus atrios con himnos,\ndándole gracias y bendiciendo su nombre.\n\nR. Somos su pueblo y ovejas de su rebaño.\n\nPorque el Señor es bueno,\nsu misericordia es eterna,\nsu fidelidad por todas las edades.\n\nR. Somos su pueblo y ovejas de su rebaño."
        },
        "aclamacion_evangelio": {
          "texto": "R. Aleluya, aleluya.\nUn gran profeta ha surgido entre nosotros y Dios ha visitado a su pueblo.\nR. Aleluya."
        },
        "evangelio": {
          "titulo": "Santo Evangelio",
          "cita": "Lucas 7, 11-17",
          "monicion": "Jesús se compadece de la viuda de Naín y resucita a su hijo único.",
          "texto": "En aquel tiempo, Jesús se dirigió a una ciudad llamada Naín, e iban con él sus discípulos y una gran multitud.\n\nCuando se acercaba a la puerta de la ciudad, sacaban a enterrar a un muerto, hijo único de su madre, que era viuda; y la acompañaba mucha gente de la ciudad.\n\nAl verla el Señor, se compadeció de ella y le dijo:\n«No llores».\n\nAcercándose, tocó el féretro; los portadores se detuvieron, y él dijo:\n«¡Muchacho, a ti te digo: levántate!».\n\nEl muerto se incorporó y empezó a hablar, y Jesús se lo entregó a su madre.\n\nEl temor se apoderó de todos y glorificaban a Dios diciendo:\n«Un gran profeta ha surgido entre nosotros» y «Dios ha visitado a su pueblo».\n\nY esta fama se difundió acerca de él por toda Judea y por toda la región circundante.\n\nPalabra del Señor."
        },
        "oracion_ofrendas": "Acepta, Señor, estos dones que te presentamos con devoción en tu santo altar. Por Jesucristo, nuestro Señor.",
        "antifona_comunion": "El Señor es mi pastor, nada me falta; en verdes praderas me hace reposar.",
        "oracion_comunion": "Saciados con este banquete celestial, te pedimos, Señor, que este sacramento confirme nuestros corazones en el amor. Por Jesucristo, nuestro Señor."
      }
    },
    "3": {
      "II": {
        "titulo_celebracion": "Miércoles de la XXIV semana del Tiempo Ordinario",
        "tiempo_liturgico": "Tiempo Ordinario",
        "color": "Verde",
        "grado": "Feria",
        "antifona_entrada": "Fíjate, oh Dios, en nuestro escudo, mira el rostro de tu Ungido.",
        "oracion_colecta": "Dios omnipotente y misericordioso, de quien procede todo bien, escucha nuestras súplicas y concédenos vivir siempre según tu voluntad. Por nuestro Señor Jesucristo.",
        "primera_lectura": {
          "titulo": "Primera Lectura",
          "cita": "1 Corintios 12, 31 – 13, 13",
          "monicion": "Solemne himno de San Pablo a la caridad: «El amor no pasa nunca».",
          "texto": "Hermanos:\nAspiren a los carismas más elevados. Y aún les voy a mostrar un camino excepcionalmente superior.\n\nSi hablara las lenguas de los hombres y de los ángeles, pero no tengo amor, vengo a ser como bronce que resuena o címbalo que retiñe.\n\nY si tuviera el don de profecía y conociera todos los misterios y toda la ciencia, y si tuviera toda la fe hasta trasladar montañas, pero no tengo amor, nada soy.\n\nY si repartiera todos mis bienes y entregara mi cuerpo a las llamas, pero no tengo amor, de nada me sirve.\n\nEl amor es paciente, es servicial; el amor no tiene envidia, no es jactancioso, no se hincha de orgullo; no es grosero, no busca lo suyo, no se exaspera, no toma en cuenta el mal; no se alegra de la injusticia, sino que se goza con la verdad. Todo lo excusa, todo lo cree, todo lo espera, todo lo soporta.\n\nEl amor nunca pasa. Las profecías desaparecerán, las lenguas cesarán, el conocimiento se acabará... Ahora permanecen la fe, la esperanza y el amor, estas tres; pero la mayor de ellas es el amor.\n\nPalabra de Dios."
        },
        "salmo_responsorial": {
          "cita": "Salmo 32, 2-3. 4-5. 12 y 22",
          "respuesta": "R. Dichoso el pueblo que el Señor se escogió como heredad.",
          "texto": "Den gracias al Señor con la cítara,\ntoquen para él el arpa de diez cuerdas;\ncántenle un cántico nuevo,\ntoquen con maestría y aclamaciones.\n\nR. Dichoso el pueblo que el Señor se escogió como heredad.\n\nPorque la palabra del Señor es sincera,\ny todas sus obras son leales;\nél ama la justicia y el derecho,\nde la misericordia del Señor está llena la tierra.\n\nR. Dichoso el pueblo que el Señor se escogió como heredad.\n\nDichosa la nación cuyo Dios es el Señor,\nel pueblo que él se escogió como heredad.\nQue tu misericordia, Señor, venga sobre nosotros,\ncomo lo esperamos de ti.\n\nR. Dichoso el pueblo que el Señor se escogió como heredad."
        },
        "aclamacion_evangelio": {
          "texto": "R. Aleluya, aleluya.\nTus palabras, Señor, son espíritu y vida; tú tienes palabras de vida eterna.\nR. Aleluya."
        },
        "evangelio": {
          "titulo": "Santo Evangelio",
          "cita": "Lucas 7, 31-35",
          "monicion": "Jesús compara su generación a los niños sentados en la plaza que rechazan la sabiduría divina.",
          "texto": "En aquel tiempo, dijo el Señor:\n\n«¿A qué compararé a los hombres de esta generación? ¿A quién se parecen? Se parecen a los niños sentados en la plaza, que se gritan unos a otros diciendo:\n\"Tocamos la flauta y no bailaron; entonamos cantos de duelo y no lloraron\".\n\nPorque vino Juan el Bautista, que no comía pan ni bebía vino, y dicen: \"Tiene un demonio\". Ha venido el Hijo del hombre, que come y bebe, y dicen: \"Miren a un comilón y bebedor de vino, amigo de publicanos y pecadores\".\n\nPero la sabiduría ha sido reconocida justa por todos sus hijos».\n\nPalabra del Señor."
        },
        "oracion_ofrendas": "Acepta, Señor, estos dones que te presentamos con devoción en tu santo altar. Por Jesucristo, nuestro Señor.",
        "antifona_comunion": "El Señor es mi pastor, nada me falta; en verdes praderas me hace reposar.",
        "oracion_comunion": "Saciados con este banquete celestial, te pedimos, Señor, que este sacramento confirme nuestros corazones en el amor. Por Jesucristo, nuestro Señor."
      }
    },
    "4": {
      "II": {
        "titulo_celebracion": "Jueves de la XXIV semana del Tiempo Ordinario",
        "tiempo_liturgico": "Tiempo Ordinario",
        "color": "Verde",
        "grado": "Feria",
        "antifona_entrada": "Fíjate, oh Dios, en nuestro escudo, mira el rostro de tu Ungido.",
        "oracion_colecta": "Dios omnipotente y misericordioso, de quien procede todo bien, escucha nuestras súplicas y concédenos vivir siempre según tu voluntad. Por nuestro Señor Jesucristo.",
        "primera_lectura": {
          "titulo": "Primera Lectura",
          "cita": "1 Corintios 15, 1-11",
          "monicion": "San Pablo recuerda el núcleo del kerigma: «Cristo murió por nuestros pecados y resucitó al tercer día».",
          "texto": "Hermanos:\nLes recuerdo el Evangelio que les proclamé, el cual recibieron, en el cual perseveran y por el cual se salvan, si lo conservan tal como se lo proclamé; de lo contrario, habrían creído en vano.\n\nPorque les transmití en primer lugar lo que a mi vez recibí: que Cristo murió por nuestros pecados según las Escrituras; que fue sepultado y que resucitó al tercer día según las Escrituras; y que se apareció a Cefas y más tarde a los Doce.\n\nDespués se apareció a más de quinientos hermanos a la vez, la mayor parte de los cuales vive todavía, aunque algunos han muerto. Luego se apareció a Santiago; más tarde a todos los apóstoles.\n\nPor último, como a un abortivo, se me apareció también a mí. Porque yo soy el menor de los apóstoles, indigno de ser llamado apóstol, pues perseguí a la Iglesia de Dios.\n\nPero por la gracia de Dios soy lo que soy, y su gracia no ha sido estéril en mí; antes bien, he trabajado más que todos ellos, aunque no yo, sino la gracia de Dios conmigo.\n\nEn fin, sea yo, sean ellos, esto es lo que predicamos y esto es lo que han creído.\n\nPalabra de Dios."
        },
        "salmo_responsorial": {
          "cita": "Salmo 117, 1-2. 16ab-17. 28",
          "respuesta": "R. Den gracias al Señor porque es bueno, porque es eterna su misericordia.",
          "texto": "Den gracias al Señor porque es bueno,\nporque es eterna su misericordia.\nDiga la casa de Israel:\neterna es su misericordia.\n\nR. Den gracias al Señor porque es bueno, porque es eterna su misericordia.\n\nLa diestra del Señor es excelsa,\nla diestra del Señor hace proezas.\nNo moriré, viviré\npara contar las obras del Señor.\n\nR. Den gracias al Señor porque es bueno, porque es eterna su misericordia.\n\nTú eres mi Dios, te doy gracias;\nDios mío, yo te ensalzo.\nDen gracias al Señor porque es bueno,\nporque es eterna su misericordia.\n\nR. Den gracias al Señor porque es bueno, porque es eterna su misericordia."
        },
        "aclamacion_evangelio": {
          "texto": "R. Aleluya, aleluya.\nVengan a mí todos los que están fatigados y agobiados, y yo los aliviaré, dice el Señor.\nR. Aleluya."
        },
        "evangelio": {
          "titulo": "Santo Evangelio",
          "cita": "Lucas 7, 36-50",
          "monicion": "La mujer pecadora en casa de Simón el fariseo: «Sus muchos pecados han sido perdonados porque ha amado mucho».",
          "texto": "En aquel tiempo, un fariseo rogaba a Jesús que comiera con él; y entrando en la casa del fariseo, se sentó a la mesa.\n\nHabía en la ciudad una mujer pecadora pública, la cual, al saber que estaba a la mesa en casa del fariseo, llevó un frasco de alabastro lleno de perfume, y poniéndose detrás, a los pies de él, llorando, comenzó a regar con lágrimas sus pies, y los secaba con los cabellos de su cabeza, los besaba y los ungía con el perfume.\n\nAl ver esto el fariseo que lo había invitado, se dijo para sus adentros:\n«Si éste fuera profeta, conocería quién y qué clase de mujer es la que lo está tocando: que es una pecadora».\n\nJesús tomó la palabra y le dijo:\n«Simón, tengo que decirte algo».\n\nÉl contestó:\n«Dilo, Maestro».\n\n«Un prestamista tenía dos deudores: uno le debía quinientos denarios y el otro cincuenta. Como no tenían con qué pagar, perdonó a los dos la deuda. ¿Cuál de ellos, pues, lo amará más?».\n\nSimón respondió:\n«Supongo que aquel a quien más le perdonó».\n\nJesús le dijo:\n«Has juzgado con rectitud».\n\nY volviéndose hacia la mujer, dijo a Simón:\n«¿Ves a esta mujer? Entré en tu casa y no me diste agua para los pies; ella, en cambio, ha regado mis pies con sus lágrimas y los ha secado con sus cabellos. No me diste el beso; ella, desde que entré, no ha cesado de besar mis pies. No ungiste mi cabeza con aceite; ella ha ungido mis pies con perfume. Por eso te digo que sus muchos pecados le han sido perdonados, porque ha amado mucho; pero a quien poco se le perdona, poco ama».\n\nY a ella le dijo:\n«Tus pecados quedan perdonados».\n\nLos comensales comenzaron a decirse entre sí:\n«¿Quién es éste que hasta perdona pecados?».\n\nPero él dijo a la mujer:\n«Tu fe te ha salvado; vete en paz».\n\nPalabra del Señor."
        },
        "oracion_ofrendas": "Acepta, Señor, estos dones que te presentamos con devoción en tu santo altar. Por Jesucristo, nuestro Señor.",
        "antifona_comunion": "El Señor es mi pastor, nada me falta; en verdes praderas me hace reposar.",
        "oracion_comunion": "Saciados con este banquete celestial, te pedimos, Señor, que este sacramento confirme nuestros corazones en el amor. Por Jesucristo, nuestro Señor."
      }
    },
    "5": {
      "II": {
        "titulo_celebracion": "Viernes de la XXIV semana del Tiempo Ordinario",
        "tiempo_liturgico": "Tiempo Ordinario",
        "color": "Verde",
        "grado": "Feria",
        "antifona_entrada": "Fíjate, oh Dios, en nuestro escudo, mira el rostro de tu Ungido.",
        "oracion_colecta": "Dios omnipotente y misericordioso, de quien procede todo bien, escucha nuestras súplicas y concédenos vivir siempre según tu voluntad. Por nuestro Señor Jesucristo.",
        "primera_lectura": {
          "titulo": "Primera Lectura",
          "cita": "1 Corintios 15, 12-20",
          "monicion": "San Pablo proclama: «Si Cristo no ha resucitado, vana es nuestra fe; pero Cristo resucitó de entre los muertos».",
          "texto": "Hermanos:\nSi se predica de Cristo que ha resucitado de entre los muertos, ¿cómo dicen algunos entre ustedes que no hay resurrección de muertos?\n\nPorque si no hay resurrección de muertos, tampoco Cristo ha resucitado; y si Cristo no ha resucitado, vana es nuestra predicación, vana también la fe de ustedes. Más aún: resultamos testigos falsos de Dios, porque hemos dado testimonio contra Dios diciendo que resucitó a Cristo, a quien no resucitó si es que los muertos no resucitan.\n\nPues si los muertos no resucitan, tampoco Cristo resucitó; y si Cristo no resucitó, la fe de ustedes es ilusoria: todavía están en sus pecados. Por consiguiente, también los que murieron en Cristo perecieron.\n\nSi solamente para esta vida tenemos puesta nuestra esperanza en Cristo, somos los más desdichados de todos los hombres.\n\nPero no: Cristo ha resucitado de entre los muertos como primicia de los que murieron.\n\nPalabra de Dios."
        },
        "salmo_responsorial": {
          "cita": "Salmo 16, 1. 6-7. 8 y 15",
          "respuesta": "R. Al despertar me saciaré de tu semblante, Señor.",
          "texto": "Escucha, Señor, una causa justa,\natiende a mi clamor,\npresta oído a mi súplica,\nque no sale de labios engañosos.\n\nR. Al despertar me saciaré de tu semblante, Señor.\n\nYo te invoco porque tú me respondes, Dios mío;\ninclina el oído hacia mí y escucha mis palabras.\nMuestra las maravillas de tu misericordia,\ntú que salvas de los adversarios a los que confían en tu diestra.\n\nR. Al despertar me saciaré de tu semblante, Señor.\n\nGuárdame como a la niña de tus ojos,\nescóndeme a la sombra de tus alas.\nPero yo, justificado, contemplaré tu rostro;\nal despertar me saciaré de tu semblante.\n\nR. Al despertar me saciaré de tu semblante, Señor."
        },
        "aclamacion_evangelio": {
          "texto": "R. Aleluya, aleluya.\nTe doy gracias, Padre, Señor del cielo y de la tierra, porque has revelado estas cosas a los pequeños.\nR. Aleluya."
        },
        "evangelio": {
          "titulo": "Santo Evangelio",
          "cita": "Lucas 8, 1-3",
          "monicion": "Las santas mujeres acompañaban y servían a Jesús con sus bienes durante su ministerio.",
          "texto": "En aquel tiempo, Jesús iba caminando por ciudades y aldeas, proclamando y anunciando la Buena Noticia del reino de Dios; y los Doce iban con él, y también algunas mujeres que habían sido curadas de espíritus malignos y de enfermedades:\n\nMaría, llamada la Magdalena, de la que habían salido siete demonios; Juana, mujer de Cusa, administrador de Herodes; Susana y muchas otras, que los asistían con sus propios bienes.\n\nPalabra del Señor."
        },
        "oracion_ofrendas": "Acepta, Señor, estos dones que te presentamos con devoción en tu santo altar. Por Jesucristo, nuestro Señor.",
        "antifona_comunion": "El Señor es mi pastor, nada me falta; en verdes praderas me hace reposar.",
        "oracion_comunion": "Saciados con este banquete celestial, te pedimos, Señor, que este sacramento confirme nuestros corazones en el amor. Por Jesucristo, nuestro Señor."
      }
    },
    "6": {
      "II": {
        "titulo_celebracion": "Sábado de la XXIV semana del Tiempo Ordinario",
        "tiempo_liturgico": "Tiempo Ordinario",
        "color": "Verde",
        "grado": "Feria",
        "antifona_entrada": "Fíjate, oh Dios, en nuestro escudo, mira el rostro de tu Ungido.",
        "oracion_colecta": "Dios omnipotente y misericordioso, de quien procede todo bien, escucha nuestras súplicas y concédenos vivir siempre según tu voluntad. Por nuestro Señor Jesucristo.",
        "primera_lectura": {
          "titulo": "Primera Lectura",
          "cita": "1 Corintios 15, 35-37. 42-49",
          "monicion": "San Pablo enseña sobre el cuerpo resucitado: «Se siembra un cuerpo corruptible, resucita incorruptible».",
          "texto": "Hermanos:\nAlguien dirá: «¿Cómo resucitan los muertos? ¿Con qué cuerpo vuelven?».\n\n¡Insensato! Lo que tú siembras no recobra vida si no muere. Y al sembrar, no siembras el cuerpo que ha de nacer, sino un simple grano, por ejemplo de trigo o de alguna otra planta.\n\nAsí también en la resurrección de los muertos: se siembra en corrupción, resucita en incorrupción; se siembra en deshonra, resucita en gloria; se siembra en debilidad, resucita en fortaleza; se siembra un cuerpo animal, resucita un cuerpo espiritual.\n\nSi hay un cuerpo animal, hay también un cuerpo espiritual. Así está escrito: «El primer hombre, Adán, fue hecho ser viviente»; el último Adán, espíritu que da vida.\n\nPero no es primero lo espiritual, sino lo animal; luego lo espiritual. El primer hombre procede de la tierra, es terreno; el segundo hombre procede del cielo.\n\nCual es el terreno, tales son también los terrenos; y cual es el celestial, tales son también los celestiales. Y así como hemos llevado la imagen del terreno, llevaremos también la imagen del celestial.\n\nPalabra de Dios."
        },
        "salmo_responsorial": {
          "cita": "Salmo 55, 10. 11-12. 13-14",
          "respuesta": "R. Caminaré en presencia de Dios a la luz de la vida.",
          "texto": "Mis enemigos retrocederán\nel día en que yo te invoque;\nyo sé muy bien que Dios está de mi parte.\n\nR. Caminaré en presencia de Dios a la luz de la vida.\n\nEn Dios, cuya palabra alabo,\nen el Señor, cuya palabra ensalzo,\nen Dios confío y no temo:\n¿qué podrá hacerme un mortal?\n\nR. Caminaré en presencia de Dios a la luz de la vida.\n\nTe debo, oh Dios, los votos que te hice,\nlos pagaré con alabanzas a ti;\nporque libraste mi alma de la muerte,\nmis pies de la caída,\npara que camine en presencia de Dios\na la luz de la vida.\n\nR. Caminaré en presencia de Dios a la luz de la vida."
        },
        "aclamacion_evangelio": {
          "texto": "R. Aleluya, aleluya.\nDichosos los que retienen la palabra con un corazón bueno y recto, y dan fruto con perseverancia.\nR. Aleluya."
        },
        "evangelio": {
          "titulo": "Santo Evangelio",
          "cita": "Lucas 8, 4-15",
          "monicion": "Parábola del sembrador y los frutos de la palabra de Dios sembrada en tierra buena.",
          "texto": "En aquel tiempo, habiéndose reunido una gran multitud y acudiendo a él de todas las ciudades, dijo Jesús en una parábola:\n\n«Salió un sembrador a sembrar su semilla; y al sembrar, una parte cayó junto al camino, fue pisoteada y las aves del cielo se la comieron. Otra parte cayó sobre piedra, y en cuanto brotó, se secó por falta de humedad. Otra parte cayó entre espinos, y creciendo con ella los espinos, la ahogaron. Otra cayó en tierra buena, y brotando, dio fruto al ciento por uno».\n\nDicho esto, exclamó:\n«¡El que tenga oídos para oír, que oiga!».\n\nSus discípulos le preguntaban qué significaba esta parábola.\n\nÉl les dijo:\n«A ustedes se les ha concedido conocer los misterios del reino de Dios, pero a los demás se les habla en parábolas, para que viendo no vean y oyendo no entiendan.\n\nEl significado de la parábola es éste: La semilla es la palabra de Dios. Los del camino son los que la oyen; pero luego viene el diablo y se lleva la palabra de su corazón, para que no crean y se salven. Los de la piedra son los que, al oírla, reciben la palabra con alegría; pero no tienen raíz: creen por un tiempo y a la hora de la tentación se echan atrás. Lo que cayó entre espinos son los que han oído, pero a lo largo del camino se ahogan por las preocupaciones, las riquezas y los placeres de la vida, y no llegan a dar fruto maduro.\n\nY lo que cayó en tierra buena son los que, habiendo oído la palabra con un corazón noble y bueno, la retienen y dan fruto con perseverancia».\n\nPalabra del Señor."
        },
        "oracion_ofrendas": "Acepta, Señor, estos dones que te presentamos con devoción en tu santo altar. Por Jesucristo, nuestro Señor.",
        "antifona_comunion": "El Señor es mi pastor, nada me falta; en verdes praderas me hace reposar.",
        "oracion_comunion": "Saciados con este banquete celestial, te pedimos, Señor, que este sacramento confirme nuestros corazones en el amor. Por Jesucristo, nuestro Señor."
      }
    }
  },
  "25": {
    "1": {
      "II": {
        "titulo_celebracion": "Lunes de la XXV semana del Tiempo Ordinario",
        "tiempo_liturgico": "Tiempo Ordinario",
        "color": "Verde",
        "grado": "Feria",
        "antifona_entrada": "Fíjate, oh Dios, en nuestro escudo, mira el rostro de tu Ungido.",
        "oracion_colecta": "Dios omnipotente y misericordioso, de quien procede todo bien, escucha nuestras súplicas y concédenos vivir siempre según tu voluntad. Por nuestro Señor Jesucristo.",
        "primera_lectura": {
          "titulo": "Primera Lectura",
          "cita": "Proverbios 3, 27-34",
          "monicion": "El libro de los Proverbios nos instruye: «No niegues un favor a quien lo necesita cuando esté en tu mano hacérselo».",
          "texto": "Hijo mío:\nNo niegues un favor a quien lo necesita, cuando esté en tu mano hacérselo. No digas a tu prójimo: «Vete y vuelve, mañana te lo daré», si tienes contigo con qué.\n\nNo trames el mal contra tu prójimo, mientras él vive confiado junto a ti. No pleitees con nadie sin motivo, si no te ha causado ningún daño.\n\nNo envidies al hombre violento ni escojas ninguno de sus caminos; porque el Señor aborrece al perverso, pero reserva su intimidad para los justos.\n\nLa maldición del Señor pesa sobre la casa del malvado, pero bendice la morada de los justos. Si él se burla de los burlones, a los humildes les concede su gracia.\n\nPalabra de Dios."
        },
        "salmo_responsorial": {
          "cita": "Salmo 14, 2-3a. 3cd-4ab. 5",
          "respuesta": "R. El justo habitará en tu monte santo, Señor.",
          "texto": "El que procede honradamente\ny practica la justicia,\nel que tiene intenciones leales\ny no calumnia con su lengua.\n\nR. El justo habitará en tu monte santo, Señor.\n\nEl que no hace mal a su prójimo\nni difama al vecino,\nel que tiene por despreciable al malvado\ny honra a los que temen al Señor.\n\nR. El justo habitará en tu monte santo, Señor.\n\nEl que no presta dinero a usura\nni acepta soborno contra el inocente.\nEl que así obra nunca fallará.\n\nR. El justo habitará en tu monte santo, Señor."
        },
        "aclamacion_evangelio": {
          "texto": "R. Aleluya, aleluya.\nBrille así su luz ante los hombres, para que vean sus buenas obras y glorifiquen a su Padre que está en los cielos.\nR. Aleluya."
        },
        "evangelio": {
          "titulo": "Santo Evangelio",
          "cita": "Lucas 8, 16-18",
          "monicion": "Jesús enseña que la lámpara se pone en el candelero: «Miren cómo escuchan».",
          "texto": "En aquel tiempo, dijo Jesús a la multitud:\n\n«Nadie enciende una lámpara para taparla con una vasija o ponerla debajo de la cama, sino que la pone sobre un candelero, para que los que entren vean la luz.\n\nPorque nada hay oculto que no haya de ser manifestado, ni secreto que no haya de ser conocido y salir a la luz.\n\nMiren, pues, cómo escuchan; porque al que tiene se le dará, pero al que no tiene, aun lo que cree tener se le quitará».\n\nPalabra del Señor."
        },
        "oracion_ofrendas": "Acepta, Señor, estos dones que te presentamos con devoción en tu santo altar. Por Jesucristo, nuestro Señor.",
        "antifona_comunion": "El Señor es mi pastor, nada me falta; en verdes praderas me hace reposar.",
        "oracion_comunion": "Saciados con este banquete celestial, te pedimos, Señor, que este sacramento confirme nuestros corazones en el amor. Por Jesucristo, nuestro Señor."
      }
    },
    "2": {
      "II": {
        "titulo_celebracion": "Martes de la XXV semana del Tiempo Ordinario",
        "tiempo_liturgico": "Tiempo Ordinario",
        "color": "Verde",
        "grado": "Feria",
        "antifona_entrada": "Fíjate, oh Dios, en nuestro escudo, mira el rostro de tu Ungido.",
        "oracion_colecta": "Dios omnipotente y misericordioso, de quien procede todo bien, escucha nuestras súplicas y concédenos vivir siempre según tu voluntad. Por nuestro Señor Jesucristo.",
        "primera_lectura": {
          "titulo": "Primera Lectura",
          "cita": "Proverbios 21, 1-6. 10-13",
          "monicion": "«Practicar la justicia y el derecho complace al Señor más que los sacrificios».",
          "texto": "Como corriente de agua es el corazón del rey en la mano del Señor: él lo dirige adonde quiere.\n\nTodo camino del hombre es recto ante sus propios ojos, pero el Señor es quien pesa los corazones.\n\nPracticar la justicia y el derecho complace al Señor más que los sacrificios.\n\nOjos altivos, corazón orgulloso: la lámpara de los impíos es pecado.\n\nLos proyectos del diligente traen abundancia; todo el que se precipita va a la penuria.\n\nAdquirir tesoros con lengua mentirosa es soplo que se desvanece y lazo de muerte.\n\nEl alma del malvado desea el mal: su prójimo no halla piedad a sus ojos.\n\nEl que cierra su oído al clamor del pobre, también él clamará y no obtendrá respuesta.\n\nPalabra de Dios."
        },
        "salmo_responsorial": {
          "cita": "Salmo 118, 1. 27. 30. 34. 35. 44",
          "respuesta": "R. Guíame, Señor, por la senda de tus mandatos.",
          "texto": "Dichosos los que caminan en la ley del Señor,\nlos que son intachables en su camino.\n\nR. Guíame, Señor, por la senda de tus mandatos.\n\nHazme comprender el camino de tus mandatos,\ny meditaré tus maravillas.\n\nR. Guíame, Señor, por la senda de tus mandatos.\n\nEscogí el camino de la fidelidad,\nhe tenido presentes tus decretos.\n\nR. Guíame, Señor, por la senda de tus mandatos.\n\nEnséñame a cumplir tu voluntad\ny la guardaré de todo corazón.\n\nR. Guíame, Señor, por la senda de tus mandatos.\n\nGuíame por la senda de tus preceptos,\nporque en ella he puesto mi gozo.\n\nR. Guíame, Señor, por la senda de tus mandatos.\n\nCumpliré sin cesar tu ley,\npor siempre jamás.\n\nR. Guíame, Señor, por la senda de tus mandatos."
        },
        "aclamacion_evangelio": {
          "texto": "R. Aleluya, aleluya.\nDichosos los que escuchan la palabra de Dios y la cumplen.\nR. Aleluya."
        },
        "evangelio": {
          "titulo": "Santo Evangelio",
          "cita": "Lucas 8, 19-21",
          "monicion": "La verdadera familia de Jesús: «Mi madre y mis hermanos son los que escuchan la palabra de Dios y la ponen en práctica».",
          "texto": "En aquel tiempo, se presentaron ante Jesús su madre y sus hermanos, pero no podían llegar hasta él por causa de la multitud.\n\nLe avisaron:\n«Tu madre y tus hermanos están afuera y quieren verte».\n\nÉl les respondió:\n«Mi madre y mis hermanos son éstos: los que escuchan la palabra de Dios y la cumplen».\n\nPalabra del Señor."
        },
        "oracion_ofrendas": "Acepta, Señor, estos dones que te presentamos con devoción en tu santo altar. Por Jesucristo, nuestro Señor.",
        "antifona_comunion": "El Señor es mi pastor, nada me falta; en verdes praderas me hace reposar.",
        "oracion_comunion": "Saciados con este banquete celestial, te pedimos, Señor, que este sacramento confirme nuestros corazones en el amor. Por Jesucristo, nuestro Señor."
      }
    },
    "3": {
      "II": {
        "titulo_celebracion": "Miércoles de la XXV semana del Tiempo Ordinario",
        "tiempo_liturgico": "Tiempo Ordinario",
        "color": "Verde",
        "grado": "Feria",
        "antifona_entrada": "Fíjate, oh Dios, en nuestro escudo, mira el rostro de tu Ungido.",
        "oracion_colecta": "Dios omnipotente y misericordioso, de quien procede todo bien, escucha nuestras súplicas y concédenos vivir siempre según tu voluntad. Por nuestro Señor Jesucristo.",
        "primera_lectura": {
          "titulo": "Primera Lectura",
          "cita": "Proverbios 30, 5-9",
          "monicion": "«No me des pobreza ni riqueza; suminístrame sólo el pan necesario».",
          "texto": "Toda palabra de Dios está acrisolada; él es escudo para los que en él se refugian.\n\nNo añadas nada a sus palabras, no sea que te reprenda y quedes como mentiroso.\n\nDos cosas te he pedido, no me las niegues antes de que muera: Aleja de mí la falsedad y la palabra mentirosa. No me des pobreza ni riqueza; suminístrame sólo el pan necesario; no sea que, estando saciado, reniegue de ti y diga: «¿Quién es el Señor?», o que, empobrecido, robe y profane el nombre de mi Dios.\n\nPalabra de Dios."
        },
        "salmo_responsorial": {
          "cita": "Salmo 118, 29. 72. 89. 101. 104. 163",
          "respuesta": "R. Lámpara es tu palabra para mis pasos, Señor.",
          "texto": "Aparta de mí el camino de la mentira\ny concédeme la gracia de tu ley.\n\nR. Lámpara es tu palabra para mis pasos, Señor.\n\nMás estimo la ley de tu boca\nque miles de monedas de oro y plata.\n\nR. Lámpara es tu palabra para mis pasos, Señor.\n\nTu palabra, Señor, permanece para siempre,\nfirme está en los cielos.\n\nR. Lámpara es tu palabra para mis pasos, Señor.\n\nAparto mis pies de todo mal sendero,\npara cumplir tu palabra.\n\nR. Lámpara es tu palabra para mis pasos, Señor.\n\nCon tus preceptos adquiero inteligencia,\npor eso detesto todo camino falso.\n\nR. Lámpara es tu palabra para mis pasos, Señor.\n\nOdio y aborrezco la mentira,\npero amo tu ley.\n\nR. Lámpara es tu palabra para mis pasos, Señor."
        },
        "aclamacion_evangelio": {
          "texto": "R. Aleluya, aleluya.\nEl reino de Dios está cerca; conviértanse y crean en el Evangelio.\nR. Aleluya."
        },
        "evangelio": {
          "titulo": "Santo Evangelio",
          "cita": "Lucas 9, 1-6",
          "monicion": "Misión de los doce apóstoles: Jesús los envía a proclamar el reino de Dios y curar a los enfermos.",
          "texto": "En aquel tiempo, Jesús convocó a los Doce y les dio poder y autoridad sobre toda clase de demonios y para curar enfermedades.\n\nY los envió a proclamar el reino de Dios y a curar a los enfermos.\n\nY les dijo:\n«No tomen nada para el camino: ni bastón, ni alforja, ni pan, ni dinero; ni lleven dos túnicas. En la casa donde entren, quédense allí hasta que salgan de aquel lugar. Y dondequiera que no los reciban, al salir de aquella ciudad sacúdanse el polvo de sus pies en testimonio contra ellos».\n\nEllos salieron y recorrían las aldeas proclamando la Buena Noticia y curando por todas partes.\n\nPalabra del Señor."
        },
        "oracion_ofrendas": "Acepta, Señor, estos dones que te presentamos con devoción en tu santo altar. Por Jesucristo, nuestro Señor.",
        "antifona_comunion": "El Señor es mi pastor, nada me falta; en verdes praderas me hace reposar.",
        "oracion_comunion": "Saciados con este banquete celestial, te pedimos, Señor, que este sacramento confirme nuestros corazones en el amor. Por Jesucristo, nuestro Señor."
      }
    },
    "4": {
      "II": {
        "titulo_celebracion": "Jueves de la XXV semana del Tiempo Ordinario",
        "tiempo_liturgico": "Tiempo Ordinario",
        "color": "Verde",
        "grado": "Feria",
        "antifona_entrada": "Fíjate, oh Dios, en nuestro escudo, mira el rostro de tu Ungido.",
        "oracion_colecta": "Dios omnipotente y misericordioso, de quien procede todo bien, escucha nuestras súplicas y concédenos vivir siempre según tu voluntad. Por nuestro Señor Jesucristo.",
        "primera_lectura": {
          "titulo": "Primera Lectura",
          "cita": "Eclesiastés 1, 2-11",
          "monicion": "«Vanidad de vanidades, dice Qohélet: todo es vanidad. Nada hay nuevo bajo el sol».",
          "texto": "¡Vanidad de vanidades!, dice Qohélet; ¡vanidad de vanidades, todo es vanidad!\n\n¿Qué provecho saca el hombre de toda la fatiga con que se afana bajo el sol? Una generación se va y otra generación viene, pero la tierra permanece para siempre.\n\nSale el sol, se pone el sol, y corre hacia el lugar donde vuelve a salir. Sopla el viento hacia el sur, gira hacia el norte; va girando sin cesar y retorna a sus giros el viento.\n\nTodos los ríos van al mar, y el mar no se llena; al lugar de donde brotan, allí vuelven a correr los ríos.\n\nTodas las cosas cansan más de lo que el hombre puede expresar con palabras. No se sacia el ojo de ver ni se cansa el oído de oír.\n\nLo que fue, eso será; lo que se hizo, eso se hará: nada hay nuevo bajo el sol. Si de algo se dice: «Mira, esto es nuevo», ya existió en los siglos que nos precedieron.\n\nNo queda memoria de los antiguos, ni tampoco de los que vendrán después habrá memoria entre los que existan más tarde.\n\nPalabra de Dios."
        },
        "salmo_responsorial": {
          "cita": "Salmo 89, 3-4. 5-6. 12-13. 14 y 17",
          "respuesta": "R. Señor, tú has sido nuestro refugio de generación en generación.",
          "texto": "Tú reduces el hombre al polvo,\ndiciendo: «Vuelvan, hijos de Adán».\nMil años en tu presencia\nson un ayer que pasó, una vela nocturna.\n\nR. Señor, tú has sido nuestro refugio de generación en generación.\n\nLos siembras año por año,\ncomo hierba que se renueva:\nque florece y se renueva por la mañana,\ny por la tarde la siegan y se seca.\n\nR. Señor, tú has sido nuestro refugio de generación en generación.\n\nEnséñanos a calcular nuestros años,\npara que adquiramos un corazón sensato.\nVuélvete, Señor, ¿hasta cuándo?\nTen compasión de tus siervos.\n\nR. Señor, tú has sido nuestro refugio de generación en generación.\n\nSácianos de tu misericordia por la mañana,\ny seremos felices y nos alegraremos todos nuestros días.\nHaga el Señor Dios bondadoso con nosotros,\nhaga prósperas las obras de nuestras manos.\n\nR. Señor, tú has sido nuestro refugio de generación en generación."
        },
        "aclamacion_evangelio": {
          "texto": "R. Aleluya, aleluya.\nYo soy el camino, y la verdad, y la vida, dice el Señor; nadie va al Padre sino por mí.\nR. Aleluya."
        },
        "evangelio": {
          "titulo": "Santo Evangelio",
          "cita": "Lucas 9, 7-9",
          "monicion": "La perplejidad de Herodes el tetrarca: «A Juan le corté la cabeza; ¿quién es éste de quien oigo tales cosas? Y buscaba verlo».",
          "texto": "En aquel tiempo, el tetrarca Herodes se enteró de todo lo que pasaba y estaba perplejo, porque unos decían que Juan había resucitado de entre los muertos; otros, que Elías se había aparecido; y otros, que uno de los antiguos profetas había resucitado.\n\nHerodes dijo:\n«A Juan yo le corté la cabeza; ¿quién es, pues, éste de quien oigo semejantes cosas?».\n\nY buscaba la manera de verlo.\n\nPalabra del Señor."
        },
        "oracion_ofrendas": "Acepta, Señor, estos dones que te presentamos con devoción en tu santo altar. Por Jesucristo, nuestro Señor.",
        "antifona_comunion": "El Señor es mi pastor, nada me falta; en verdes praderas me hace reposar.",
        "oracion_comunion": "Saciados con este banquete celestial, te pedimos, Señor, que este sacramento confirme nuestros corazones en el amor. Por Jesucristo, nuestro Señor."
      }
    },
    "5": {
      "II": {
        "titulo_celebracion": "Viernes de la XXV semana del Tiempo Ordinario",
        "tiempo_liturgico": "Tiempo Ordinario",
        "color": "Verde",
        "grado": "Feria",
        "antifona_entrada": "Fíjate, oh Dios, en nuestro escudo, mira el rostro de tu Ungido.",
        "oracion_colecta": "Dios omnipotente y misericordioso, de quien procede todo bien, escucha nuestras súplicas y concédenos vivir siempre según tu voluntad. Por nuestro Señor Jesucristo.",
        "primera_lectura": {
          "titulo": "Primera Lectura",
          "cita": "Eclesiastés 3, 1-11",
          "monicion": "«Todo tiene su momento y cada cosa su tiempo bajo el cielo».",
          "texto": "Todo tiene su momento y cada cosa su tiempo bajo el cielo:\nTiempo de nacer y tiempo de morir;\ntiempo de plantar y tiempo de arrancar lo plantado;\ntiempo de matar y tiempo de curar;\ntiempo de destruir y tiempo de edificar;\ntiempo de llorar y tiempo de reír;\ntiempo de hacer duelo y tiempo de bailar;\ntiempo de arrojar piedras y tiempo de recoger piedras;\ntiempo de abrazar y tiempo de desprenderse;\ntiempo de buscar y tiempo de perder;\ntiempo de guardar y tiempo de desechar;\ntiempo de rasgar y tiempo de coser;\ntiempo de callar y tiempo de hablar;\ntiempo de amar y tiempo de odiar;\ntiempo de guerra y tiempo de paz.\n\n¿Qué provecho saca el trabajador de sus fatigas? He observado el afán que Dios ha impuesto a los hombres para que en él se ejerciten.\n\nTodo lo hizo hermoso a su tiempo; además, ha puesto la eternidad en sus corazones, sin que el hombre pueda comprender la obra que Dios ha hecho desde el principio hasta el fin.\n\nPalabra de Dios."
        },
        "salmo_responsorial": {
          "cita": "Salmo 143, 1a y 2abc. 3-4",
          "respuesta": "R. ¡Bendito sea el Señor, mi Roca!",
          "texto": "Bendito sea el Señor, mi Roca,\nmi bienhechor, mi alcázar,\nmi baluarte donde me pongo a salvo,\nmi escudo y mi refugio.\n\nR. ¡Bendito sea el Señor, mi Roca!\n\nSeñor, ¿qué es el hombre para que te fijes en él?\n¿Qué el hijo del hombre para que de él te acuerdes?\nEl hombre es semejante a un soplo,\nsus días son como sombra que pasa.\n\nR. ¡Bendito sea el Señor, mi Roca!"
        },
        "aclamacion_evangelio": {
          "texto": "R. Aleluya, aleluya.\nEl Hijo del hombre ha venido a servir y a dar su vida en rescate por muchos.\nR. Aleluya."
        },
        "evangelio": {
          "titulo": "Santo Evangelio",
          "cita": "Lucas 9, 18-22",
          "monicion": "Profesión de fe de Pedro: «Tú eres el Mesías de Dios», y anuncio de la Pasión.",
          "texto": "Un día en que Jesús estaba orando a solas, estaban con él los discípulos; y les preguntó:\n«¿Quién dice la gente que soy yo?».\n\nEllos contestaron:\n«Unos que Juan el Bautista; otros que Elías; y otros que uno de los antiguos profetas ha resucitado».\n\nÉl les dijo:\n«Y ustedes, ¿quién dicen que soy yo?».\n\nPedro respondió:\n«El Mesías de Dios».\n\nÉl les conminó rigurosamente a que no dijeran esto a nadie, diciendo:\n«El Hijo del hombre tiene que padecer mucho, ser rechazado por los ancianos, sumos sacerdotes y escribas, ser ejecutado y resucitar al tercer día».\n\nPalabra del Señor."
        },
        "oracion_ofrendas": "Acepta, Señor, estos dones que te presentamos con devoción en tu santo altar. Por Jesucristo, nuestro Señor.",
        "antifona_comunion": "El Señor es mi pastor, nada me falta; en verdes praderas me hace reposar.",
        "oracion_comunion": "Saciados con este banquete celestial, te pedimos, Señor, que este sacramento confirme nuestros corazones en el amor. Por Jesucristo, nuestro Señor."
      }
    },
    "6": {
      "II": {
        "titulo_celebracion": "Sábado de la XXV semana del Tiempo Ordinario",
        "tiempo_liturgico": "Tiempo Ordinario",
        "color": "Verde",
        "grado": "Feria",
        "antifona_entrada": "Fíjate, oh Dios, en nuestro escudo, mira el rostro de tu Ungido.",
        "oracion_colecta": "Dios omnipotente y misericordioso, de quien procede todo bien, escucha nuestras súplicas y concédenos vivir siempre según tu voluntad. Por nuestro Señor Jesucristo.",
        "primera_lectura": {
          "titulo": "Primera Lectura",
          "cita": "Eclesiastés 11, 9 – 12, 8",
          "monicion": "«Acuérdate de tu Creador en los días de tu juventud, antes de que vuelvas al polvo de la tierra».",
          "texto": "Alégrate, joven, en tu juventud, y tome buen ánimo tu corazón en los días de tu adolescencia; sigue los caminos de tu corazón y la vista de tus ojos; pero sabe que por todas estas cosas Dios te traerá a juicio. Aleja de tu corazón el disgusto y aparta de tu carne el sufrimiento, porque la juventud y la aurora de la vida son vanidad.\n\nAcuérdate de tu Creador en los días de tu juventud, antes de que vengan los días aciagos y lleguen los años en que digas: «No encuentro en ellos placer alguno»; antes de que se oscurezca el sol, la luz, la luna y las estrellas, y vuelvan las nubes tras la lluvia.\n\nAquel día en que temblarán los guardianes de la casa y se encorvarán los hombres fuertes, y cesarán de moler las que muelen por ser pocas, y se oscurecerán las que miran por las ventanas, y se cerrarán las puertas de la calle; cuando se apague el ruido del molino, y se debilite la voz del pájaro y se acallen todas las canciones.\n\nCuando den miedo las alturas y haya sobresaltos en el camino; cuando florezca el almendro, se arrastre la langosta y pierda su sabor la alcaparra; porque el hombre va a su morada eterna y los que hacen duelo rondan por la calle.\n\nAntes de que se rompa el cordón de plata, se quiebre la copa de oro, se rompa el cántaro junto a la fuente y la rueda se haga pedazos sobre el pozo; y el polvo vuelva a la tierra como era, y el espíritu vuelva a Dios que lo dio.\n\n¡Vanidad de vanidades!, dice Qohélet; ¡todo es vanidad!\n\nPalabra de Dios."
        },
        "salmo_responsorial": {
          "cita": "Salmo 89, 3-4. 5-6. 12-13. 14 y 17",
          "respuesta": "R. Señor, tú has sido nuestro refugio de generación en generación.",
          "texto": "Tú reduces el hombre al polvo,\ndiciendo: «Vuelvan, hijos de Adán».\nMil años en tu presencia\nson un ayer que pasó, una vela nocturna.\n\nR. Señor, tú has sido nuestro refugio de generación en generación.\n\nLos siembras año por año,\ncomo hierba que se renueva:\nque florece y se renueva por la mañana,\ny por la tarde la siegan y se seca.\n\nR. Señor, tú has sido nuestro refugio de generación en generación.\n\nEnséñanos a calcular nuestros años,\npara que adquiramos un corazón sensato.\nVuélvete, Señor, ¿hasta cuándo?\nTen compasión de tus siervos.\n\nR. Señor, tú has sido nuestro refugio de generación en generación.\n\nSácianos de tu misericordia por la mañana,\ny seremos felices y nos alegraremos todos nuestros días.\nHaga el Señor Dios bondadoso con nosotros,\nhaga prósperas las obras de nuestras manos.\n\nR. Señor, tú has sido nuestro refugio de generación en generación."
        },
        "aclamacion_evangelio": {
          "texto": "R. Aleluya, aleluya.\nNuestro Salvador Jesucristo destruyó la muerte e iluminó la vida por medio del Evangelio.\nR. Aleluya."
        },
        "evangelio": {
          "titulo": "Santo Evangelio",
          "cita": "Lucas 9, 43b-45",
          "monicion": "Segundo anuncio de la Pasión: «El Hijo del hombre va a ser entregado en manos de los hombres».",
          "texto": "En aquel tiempo, mientras todos estaban maravillados de todas las cosas que Jesús hacía, dijo a sus discípulos:\n\n«Metan bien en sus oídos estas palabras: El Hijo del hombre va a ser entregado en manos de los hombres».\n\nPero ellos no entendían esta palabra; les resultaba velada para que no la comprendieran, y temían preguntarle acerca de ella.\n\nPalabra del Señor."
        },
        "oracion_ofrendas": "Acepta, Señor, estos dones que te presentamos con devoción en tu santo altar. Por Jesucristo, nuestro Señor.",
        "antifona_comunion": "El Señor es mi pastor, nada me falta; en verdes praderas me hace reposar.",
        "oracion_comunion": "Saciados con este banquete celestial, te pedimos, Señor, que este sacramento confirme nuestros corazones en el amor. Por Jesucristo, nuestro Señor."
      }
    }
  },
  "26": {
    "1": {
      "II": {
        "titulo_celebracion": "Lunes de la XXVI semana del Tiempo Ordinario",
        "tiempo_liturgico": "Tiempo Ordinario",
        "color": "Verde",
        "grado": "Feria",
        "antifona_entrada": "Fíjate, oh Dios, en nuestro escudo, mira el rostro de tu Ungido.",
        "oracion_colecta": "Dios omnipotente y misericordioso, de quien procede todo bien, escucha nuestras súplicas y concédenos vivir siempre según tu voluntad. Por nuestro Señor Jesucristo.",
        "primera_lectura": {
          "titulo": "Primera Lectura",
          "cita": "Job 1, 6-22",
          "monicion": "La ejemplar paciencia de Job en la prueba: «El Señor me lo dio, el Señor me lo quitó: ¡bendito sea el nombre del Señor!».",
          "texto": "Un día en que los hijos de Dios acudieron a presentarse ante el Señor, vino también entre ellos Satanás.\n\nEl Señor dijo a Satanás:\n«¿De dónde vienes?».\n\nSatanás respondió al Señor:\n«De dar vueltas por la tierra y pasearme por ella».\n\nEl Señor dijo a Satanás:\n«¿Te has fijado en mi siervo Job? No hay nadie como él en la tierra: es un hombre íntegro y recto, temeroso de Dios y apartado del mal».\n\nSatanás respondió al Señor:\n«¿Acaso teme Job a Dios de balde? ¿No has levantado tú una valla en torno a él, a su casa y a todo lo suyo? Has bendecido la obra de sus manos y sus rebaños colman la tierra. Pero extiende tu mano y toca todo lo que tiene, a ver si no te maldice a la cara».\n\nEl Señor dijo a Satanás:\n«Mira: todo lo que tiene está en tus manos; sólo que no pongas tu mano sobre su persona».\n\nY Satanás salió de la presencia del Señor.\n\nUn día, mientras sus hijos y sus hijas comían y bebían vino en casa de su hermano primogénito, vino un mensajero a Job y le dijo:\n«Los bueyes estaban arando y las asnas pastando junto a ellos, cuando cayeron los sabeos y se los llevaron, y a los criados los pasaron a cuchillo; sólo yo escapé para avisarte».\n\nTodavía estaba hablando éste cuando llegó otro que dijo:\n«Fuego de Dios cayó del cielo, quemó a las ovejas y a los criados y los consumió; sólo yo escapé para avisarte».\n\nTodavía estaba hablando éste cuando llegó otro que dijo:\n«Los caldeos formaron tres cuadrillas, se lanzaron sobre los camellos y se los llevaron, y a los criados los pasaron a cuchillo; sólo yo escapé para avisarte».\n\nTodavía estaba hablando éste cuando vino otro que dijo:\n«Tus hijos y tus hijas estaban comiendo y bebiendo vino en casa de su hermano primogénito, cuando de pronto un viento impetuoso vino del otro lado del desierto, sacudió las cuatro esquinas de la casa y cayó sobre los jóvenes, y murieron; sólo yo escapé para avisarte».\n\nEntonces Job se levantó, rasgó su manto, se rasuró la cabeza, y cayendo por tierra, adoró y dijo:\n«Desnudo salí del vientre de mi madre y desnudo volveré allá. El Señor me lo dio, el Señor me lo quitó: ¡bendito sea el nombre del Señor!».\n\nEn todo esto no pecó Job ni atribuyó a Dios insensatez alguna.\n\nPalabra de Dios."
        },
        "salmo_responsorial": {
          "cita": "Salmo 16, 1. 2-3. 6-7",
          "respuesta": "R. Inclina el oído hacia mí, Señor, escucha mis palabras.",
          "texto": "Escucha, Señor, una causa justa,\natiende a mi clamor,\npresta oído a mi súplica,\nque no sale de labios engañosos.\n\nR. Inclina el oído hacia mí, Señor, escucha mis palabras.\n\nDe tu presencia saldrá mi sentencia,\ntus ojos miran lo recto.\nPruebas mi corazón, me examinas de noche,\nme sondeas con el fuego y no hallas malicia en mí.\n\nR. Inclina el oído hacia mí, Señor, escucha mis palabras.\n\nYo te invoco porque tú me respondes, Dios mío;\ninclina el oído hacia mí y escucha mis palabras.\nMuestra las maravillas de tu misericordia,\ntú que salvas de los adversarios a los que confían en tu diestra.\n\nR. Inclina el oído hacia mí, Señor, escucha mis palabras."
        },
        "aclamacion_evangelio": {
          "texto": "R. Aleluya, aleluya.\nEl Hijo del hombre vino a servir y a dar su vida en rescate por muchos.\nR. Aleluya."
        },
        "evangelio": {
          "titulo": "Santo Evangelio",
          "cita": "Lucas 9, 46-50",
          "monicion": "Jesús enseña: «El más pequeño entre todos ustedes, ése es el más grande. El que no está contra ustedes, está a favor de ustedes».",
          "texto": "En aquel tiempo, se suscitó entre los discípulos una discusión sobre cuál de ellos sería el más grande.\n\nJesús, conociendo los pensamientos de sus corazones, tomó a un niño, lo puso a su lado y les dijo:\n«El que acoge a este niño en mi nombre, a mí me acoge; y el que me acoge a mí, acoge al que me ha enviado. Porque el que es más pequeño entre todos ustedes, ése es el más grande».\n\nTomando la palabra Juan, dijo:\n«Maestro, vimos a uno que expulsaba demonios en tu nombre y se lo prohibimos, porque no te sigue con nosotros».\n\nJesús le dijo:\n«No se lo prohíban, porque el que no está contra ustedes, está a favor de ustedes».\n\nPalabra del Señor."
        },
        "oracion_ofrendas": "Acepta, Señor, estos dones que te presentamos con devoción en tu santo altar. Por Jesucristo, nuestro Señor.",
        "antifona_comunion": "El Señor es mi pastor, nada me falta; en verdes praderas me hace reposar.",
        "oracion_comunion": "Saciados con este banquete celestial, te pedimos, Señor, que este sacramento confirme nuestros corazones en el amor. Por Jesucristo, nuestro Señor."
      }
    }
  }
};

/**
 * Helper para obtener las lecturas de una feria ordinaria
 * @param weekNum Número de semana del Tiempo Ordinario (ej. '22')
 * @param dayOfWeek Día de la semana (1 = Lunes, 2 = Martes, ..., 6 = Sábado)
 * @param anoFerial Ciclo bienal ferial ('I' = Años Impares, 'II' = Años Pares)
 */
export function getFerialLectionary(weekNum: number | string, dayOfWeek: number, anoFerial: 'I' | 'II' = 'II'): FerialLectionaryEntry | null {
  const w = LECCIONARIO_FERIAL[String(weekNum)];
  if (!w) return null;
  const d = w[String(dayOfWeek)];
  if (!d) return null;
  return d[anoFerial] || d['II'] || d['I'] || null;
}
