import { LiturgicalDay, LiturgicalColor, CelebrationRank } from '../types/liturgia';

export interface LectionaryDayData {
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
  reflexion_homiletica?: string | string[];
}

/**
 * Santoral Romano: Solemnidades, Fiestas y Memorias fijas
 */
export const SANTORAL_FIJO: Record<string, Partial<LectionaryDayData>> = {
  // ENERO
  '01-01': {
    titulo_celebracion: 'Santa María, Madre de Dios',
    tiempo_liturgico: 'Navidad',
    color: 'Blanco',
    grado: 'Solemnidad',
    antifona_entrada: 'Salve, Madre santa, Virgen, Madre del Rey que gobierna cielo y tierra por los siglos de los siglos.',
    oracion_colecta: 'Señor Dios, que por la maternidad virginal de la bienaventurada María entregaste a los hombres los bienes de la salvación eterna, concédenos experimentar la intercesión de aquella por quien recibimos al Autor de la vida, Jesucristo, tu Hijo, Señor nuestro.',
    primera_lectura: {
      titulo: 'Primera Lectura',
      cita: 'Números 6, 22-27',
      texto: 'El Señor dijo a Moisés: «Di a Aarón y a sus hijos: Así bendecirán a los israelitas: "El Señor te bendiga y te proteja, ilumine su rostro sobre ti y te conceda su favor; el Señor se fije en ti y te conceda la paz". Así invocarán mi nombre sobre los israelitas y yo los bendeciré». Palabra de Dios.',
      monicion: 'Comenzamos el año recibiendo la solemne bendición sacerdotal de la paz.'
    },
    salmo_responsorial: {
      cita: 'Salmo 66',
      respuesta: 'El Señor tenga piedad y nos bendiga.',
      texto: 'El Señor tenga piedad y nos bendiga,\nilumine su rostro sobre nosotros;\nconozca la tierra tus caminos,\ntodos los pueblos tu salvación.\n\nR. El Señor tenga piedad y nos bendiga.'
    },
    segunda_lectura: {
      titulo: 'Segunda Lectura',
      cita: 'Gálatas 4, 4-7',
      texto: 'Hermanos: Cuando llegó la plenitud del tiempo, envió Dios a su Hijo, nacido de mujer, nacido bajo la ley, para rescatar a los que estaban bajo la ley, para que recibiéramos la adopción filial. De modo que ya no eres esclavo, sino hijo; y si eres hijo, eres también heredero por voluntad de Dios. Palabra de Dios.',
      monicion: 'San Pablo nos revela la dignidad excelsa de ser hijos adoptivos de Dios por el sí de María.'
    },
    aclamacion_evangelio: {
      texto: 'R. Aleluya, aleluya.\nEn distintas ocasiones y de muchas maneras habló Dios antiguamente a nuestros padres por los profetas. Ahora, en esta etapa final, nos ha hablado por el Hijo.\nR. Aleluya.'
    },
    evangelio: {
      titulo: 'Santo Evangelio',
      cita: 'Lucas 2, 16-21',
      texto: 'En aquel tiempo, los pastores fueron corriendo y encontraron a María y a José, y al niño acostado en el pesebre. Al verlo, contaron lo que se les había dicho de aquel niño. Y María guardaba todas estas cosas, meditándolas en su corazón. Cuando se cumplieron los ocho días para circuncidar al niño, le pusieron por nombre Jesús, como lo había llamado el ángel antes de su concepción. Palabra del Señor.',
      monicion: 'Los pastores contemplan al Niño en brazos de María, quien guarda y medita todo en su corazón.'
    },
    oracion_ofrendas: 'Dios nuestro, que con bondad comienzas y llevas a término todo bien, concédenos que, al alegrarnos en la fiesta de la Santa Madre de Dios, gocemos de la plenitud de tu gracia. Por Jesucristo, nuestro Señor.',
    antifona_comunion: 'Jesucristo es el mismo ayer, hoy y siempre.',
    oracion_comunion: 'Hemos recibido con alegría los sacramentos celestiales; te pedimos, Señor, que nos ayuden para la vida eterna a cuantos proclamamos a la bienaventurada siempre Virgen María Madre de Dios y Madre de la Iglesia. Por Jesucristo, nuestro Señor.'
  },

  '01-06': {
    titulo_celebracion: 'La Epifanía del Señor',
    tiempo_liturgico: 'Navidad',
    color: 'Blanco',
    grado: 'Solemnidad',
    antifona_entrada: 'Miren que llega el Señor soberano; en su mano está el reino, la potestad y el imperio.',
    oracion_colecta: 'Señor Dios, que en este día revelaste a tu Unigénito a las naciones por medio de una estrella, concede a los que ya te conocemos por la fe llegar a contemplar la hermosura de tu gloria. Por nuestro Señor Jesucristo.',
    primera_lectura: {
      titulo: 'Primera Lectura',
      cita: 'Isaías 60, 1-6',
      texto: '¡Levántate, brilla, Jerusalén, que llega tu luz; la gloria del Señor amanece sobre ti!... Caminarán los pueblos a tu luz, los reyes al resplandor de tu aurora... Vienen todos de Saba trayendo oro e incienso y proclamando las alabanzas del Señor. Palabra de Dios.',
      monicion: 'La gloria de Dios resplandece y convoca a todos los pueblos a la luz de Cristo.'
    },
    salmo_responsorial: {
      cita: 'Salmo 71',
      respuesta: 'Se postrarán ante ti, Señor, todos los pueblos de la tierra.',
      texto: 'Dios mío, confía tu juicio al rey, tu justicia al hijo de reyes,\npara que rija a tu pueblo con justicia,\na tus humildes con rectitud.\n\nR. Se postrarán ante ti, Señor, todos los pueblos de la tierra.'
    },
    segunda_lectura: {
      titulo: 'Segunda Lectura',
      cita: 'Efesios 3, 2-3a. 5-6',
      texto: 'Hermanos: Han oído hablar de la distribución de la gracia de Dios que se me ha dado en favor de ustedes... que también los gentiles son coherederos, miembros del mismo cuerpo y partícipes de la misma promesa en Jesucristo, por medio del Evangelio. Palabra de Dios.',
      monicion: 'Cristo derriba toda frontera e incluye a todas las naciones en la promesa salvadora.'
    },
    aclamacion_evangelio: {
      texto: 'R. Aleluya, aleluya.\nHemos visto su estrella en el oriente y venimos a adorar al Señor.\nR. Aleluya.'
    },
    evangelio: {
      titulo: 'Santo Evangelio',
      cita: 'Mateo 2, 1-12',
      texto: 'Jesús nació en Belén de Judea en tiempos del rey Herodes. Entonces unos magos de oriente se presentaron en Jerusalén preguntando: «¿Dónde está el Rey de los judíos que ha nacido? Porque hemos visto salir su estrella y venimos a adorarlo»... Entraron en la casa, vieron al niño con María, su madre, y cayendo de rodillas lo adoraron; abrieron sus cofres y le ofrecieron regalos: oro, incienso y mirra. Y habiendo recibido en sueños un oráculo para que no volvieran a Herodes, se marcharon a su tierra por otro camino. Palabra del Señor.',
      monicion: 'Los Reyes Magos adoran al Niño Dios y le ofrecen los tesoros de su fe.'
    },
    oracion_ofrendas: 'Mira con bondad, Señor, los dones de tu Iglesia, que no son oro, incienso ni mirra, sino el mismo Jesucristo a quien en ellos proclamamos y ofrecemos. Por Jesucristo, nuestro Señor.',
    antifona_comunion: 'Hemos visto su estrella en el oriente y venimos con dones a adorar al Señor.',
    oracion_comunion: 'Que tu luz celestial, Señor, nos preceda siempre y en todo lugar, para que contemplemos con ojos limpios y recibamos con amor sincero el misterio de que nos has hecho partícipes. Por Jesucristo, nuestro Señor.'
  },

  // MARZO
  '03-19': {
    titulo_celebracion: 'San José, Esposo de la Santísima Virgen María',
    tiempo_liturgico: 'Cuaresma',
    color: 'Blanco',
    grado: 'Solemnidad',
    antifona_entrada: 'Este es el siervo fiel y prudente a quien el Señor puso al frente de su familia.',
    oracion_colecta: 'Dios todopoderoso, que confiaste los primeros misterios de la salvación de los hombres a la fiel custodia de san José, concede a tu Iglesia que, por su intercesión, los conserve y los lleve a plenitud con constante fidelidad. Por nuestro Señor Jesucristo.',
    primera_lectura: {
      titulo: 'Primera Lectura',
      cita: '2 Samuel 7, 4-5a. 12-14a. 16',
      texto: 'En aquellos días, el Señor habló al profeta Natán diciendo: «Ve y dile a mi siervo David: Cuando tus días se hayan cumplido y descanses con tus padres, suscitaré a tu descendencia después de ti, y consolidaré su reino. Yo seré para él un padre y él será para mí un hijo. Tu casa y tu reino permanecerán para siempre ante mí». Palabra de Dios.',
      monicion: 'Dios promete a David un reino eterno que se cumple en Jesús, de la estirpe de José.'
    },
    salmo_responsorial: {
      cita: 'Salmo 88',
      respuesta: 'Su descendencia durará por siempre.',
      texto: 'Cantaré eternamente las misericordias del Señor,\nanunciaré tu fidelidad por todas las edades.\n\nR. Su descendencia durará por siempre.'
    },
    segunda_lectura: {
      titulo: 'Segunda Lectura',
      cita: 'Romanos 4, 13. 16-18. 22',
      texto: 'Hermanos: La promesa hecha a Abraham y a su descendencia no le fue hecha en virtud de la ley, sino en virtud de la justicia de la fe. Apoyado en la esperanza, creyó contra toda esperanza. Por eso su fe le fue contada como justicia. Palabra de Dios.',
      monicion: 'San José, hombre justo, creyó y obedeció a Dios con fidelidad inquebrantable.'
    },
    aclamacion_evangelio: {
      texto: 'R. Gloria y honor a ti, Señor Jesús.\nDichosos los que habitan en tu casa, Señor, te alabarán por siempre.\nR. Gloria y honor a ti, Señor Jesús.'
    },
    evangelio: {
      titulo: 'Santo Evangelio',
      cita: 'Mateo 1, 16. 18-21. 24a',
      texto: 'Jacob engendró a José, el esposo de María, de la cual nació Jesús, llamado Cristo... El ángel del Señor le dijo: «José, hijo de David, no temas acoger a María, tu mujer, porque la criatura que hay en ella viene del Espíritu Santo. Dará a luz un hijo y tú le pondrás por nombre Jesús, porque él salvará a su pueblo de sus pecados». Cuando José despertó del sueño, hizo lo que el ángel del Señor le había mandado. Palabra del Señor.',
      monicion: 'San José acoge la voluntad divina y custodia con amor paternal al Redentor.'
    },
    oracion_ofrendas: 'Te pedimos, Señor, que así como san José sirvió con devoción virginal a tu Hijo único, así también nosotros merezcamos servir a tu altar con corazón puro. Por Jesucristo, nuestro Señor.',
    antifona_comunion: '¡Siervo bueno y fiel, entra en el gozo de tu Señor!',
    oracion_comunion: 'Protege, Señor, a esta familia tuya que has alimentado en la mesa de este altar, al celebrar gozosos la fiesta de san José. Por Jesucristo, nuestro Señor.'
  },

  '03-25': {
    titulo_celebracion: 'La Anunciación del Señor',
    tiempo_liturgico: 'Cuaresma',
    color: 'Blanco',
    grado: 'Solemnidad',
    antifona_entrada: 'Al entrar Cristo en el mundo, dice: «Aquí estoy, oh Dios, para hacer tu voluntad».',
    oracion_colecta: 'Señor Dios, que quisiste que tu Verbo se encarnara en el seno de la Virgen María por el anuncio del ángel, concédenos a quienes confesamos que nuestro Redentor es Dios y hombre verdadero, llegar a participar de su naturaleza divina. Por nuestro Señor Jesucristo.',
    primera_lectura: {
      titulo: 'Primera Lectura',
      cita: 'Isaías 7, 10-14; 8, 10',
      texto: 'En aquellos días, el Señor habló a Ajaz diciendo: «Pide una señal al Señor tu Dios»... El Señor mismo les dará una señal: «Miren: la virgen está encinta y da a luz un hijo, y le pondrá por nombre Emmanuel (que significa "Dios con nosotros")». Palabra de Dios.',
      monicion: 'La profecía de Isaías anuncia la encarnación del Emmanuel en el seno virginal de María.'
    },
    salmo_responsorial: {
      cita: 'Salmo 39',
      respuesta: 'Aquí estoy, Señor, para hacer tu voluntad.',
      texto: 'Tú no quieres sacrificios ni ofrendas,\ny en cambio me abriste el oído;\nno pides holocaustos ni sacrificios expiatorios,\nentonces yo digo: «Aquí estoy».\n\nR. Aquí estoy, Señor, para hacer tu voluntad.'
    },
    segunda_lectura: {
      titulo: 'Segunda Lectura',
      cita: 'Hebreos 10, 4-10',
      texto: 'Hermanos: Es imposible que la sangre de toros y machos cabríos quite los pecados. Por eso, al entrar Cristo en el mundo, dice: «Tú no quisiste sacrificios ni ofrendas, pero me formaste un cuerpo... Aquí estoy para hacer tu voluntad». Y conforme a esa voluntad quedamos santificados por la oblación del cuerpo de Jesucristo, hecha una vez para siempre. Palabra de Dios.',
      monicion: 'Cristo se hace hombre para entregarse en oblación redentora por la salvación del mundo.'
    },
    aclamacion_evangelio: {
      texto: 'R. Gloria y honor a ti, Señor Jesús.\nEl Verbo se hizo carne y habitó entre nosotros, y hemos contemplado su gloria.\nR. Gloria y honor a ti, Señor Jesús.'
    },
    evangelio: {
      titulo: 'Santo Evangelio',
      cita: 'Lucas 1, 26-38',
      texto: 'En aquel tiempo, el ángel Gabriel fue enviado por Dios a una ciudad de Galilea llamada Nazaret, a una virgen desposada con un hombre llamado José, de la casa de David; el nombre de la virgen era María. El ángel entró en su presencia y dijo: «Alégrate, llena de gracia, el Señor está contigo»... «Concebirás en tu vientre y darás a luz un hijo, y le pondrás por nombre Jesús»... María contestó: «Aquí está la esclava del Señor; hágase en mí según tu palabra». Y el ángel se retiró. Palabra del Señor.',
      monicion: 'María pronuncia su fiat humilde y generoso, abriendo la historia a la redención.'
    },
    oracion_ofrendas: 'Dígnate aceptar, Dios todopoderoso, las ofrendas de tu Iglesia, para que, al reconocer la encarnación de tu Unigénito, celebre con gozo este misterio de salvación. Por Jesucristo, nuestro Señor.',
    antifona_comunion: 'Miren: la Virgen concebirá y dará a luz un hijo, y se llamará Emmanuel.',
    oracion_comunion: 'Te pedimos, Señor, que confirmes en nuestros corazones los misterios de la verdadera fe, para que, confesando que el concebido en la Virgen María es verdadero Dios y verdadero hombre, merezcamos llegar a la alegría eterna. Por Jesucristo, nuestro Señor.'
  },

  // AGOSTO
  '08-06': {
    titulo_celebracion: 'La Transfiguración del Señor',
    tiempo_liturgico: 'Tiempo Ordinario',
    color: 'Blanco',
    grado: 'Fiesta',
    antifona_entrada: 'En una nube luminosa apareció el Espíritu Santo y se oyó la voz del Padre: «Este es mi Hijo amado, en quien me complazco; escúchenlo».',
    oracion_colecta: 'Señor Dios, que en la gloriosa Transfiguración de tu Unigénito confirmaste los misterios de la fe con el testimonio de los profetas, y prefiguraste maravillosamente nuestra perfecta adopción filial, concédenos escuchar la voz de tu Hijo amado para llegar a ser coherederos de su gloria. Por nuestro Señor Jesucristo.',
    primera_lectura: {
      titulo: 'Primera Lectura',
      cita: 'Daniel 7, 9-10. 13-14',
      texto: 'Durante la visión vi que colocaban unos tronos y un anciano se sentó... Miles y miles le servían, millones estaban a sus órdenes... Y vi venir en las nubes del cielo a uno como un hijo de hombre; se acercó al anciano y fue presentado ante él. Le dieron poder, gloria y reino, y todos los pueblos, naciones y lenguas le servían. Su poder es eterno, no cesará. Palabra de Dios.',
      monicion: 'El profeta Daniel contempla en visión la gloria eterna del Hijo del hombre.'
    },
    salmo_responsorial: {
      cita: 'Salmo 96',
      respuesta: 'El Señor reina, altísimo sobre toda la tierra.',
      texto: 'El Señor reina, la tierra goza, se alegran los archipiélagos sin fin.\nTiniebla y nube lo rodean,\njusticia y derecho sostienen su trono.\n\nR. El Señor reina, altísimo sobre toda la tierra.'
    },
    aclamacion_evangelio: {
      texto: 'R. Aleluya, aleluya.\nEste es mi Hijo amado, en quien tengo mis complacencias; escúchenlo.\nR. Aleluya.'
    },
    evangelio: {
      titulo: 'Santo Evangelio',
      cita: 'Mateo 17, 1-9',
      texto: 'En aquel tiempo, Jesús tomó consigo a Pedro, a Santiago y a su hermano Juan, y los llevó aparte a un monte alto. Se transfiguró delante de ellos, y su rostro resplandeció como el sol, y sus vestidos se volvieron blancos como la luz. Y se les aparecieron Moisés y Elías conversando con él... Y una voz desde la nube decía: «Este es mi Hijo amado, en quien me complazco; escúchenlo». Al oírlo, los discípulos cayeron de bruces, llenos de espanto. Jesús se acercó y, tocándolos, les dijo: «Levántense, no teman». Al alzar los ojos, no vieron a nadie más que a Jesús, solo. Palabra del Señor.',
      monicion: 'En el monte Tabor, Cristo revela su gloria para fortalecer la fe de sus discípulos ante la Cruz.'
    },
    oracion_ofrendas: 'Santifica, Señor, los dones que te presentamos en la gloriosa Transfiguración de tu Unigénito, y purifícanos de las manchas del pecado con los resplandores de su luz. Por Jesucristo, nuestro Señor.',
    antifona_comunion: 'Cuando se manifieste Cristo, seremos semejantes a él, porque lo veremos tal cual es.',
    oracion_comunion: 'Te pedimos, Señor, que el alimento celestial que hemos recibido nos transforme a imagen de aquel cuya gloria quisiste manifestar en la cima del monte santo. Por Jesucristo, nuestro Señor.'
  },

  '08-10': {
    titulo_celebracion: 'San Lorenzo, diácono y mártir',
    tiempo_liturgico: 'Tiempo Ordinario',
    color: 'Rojo',
    grado: 'Fiesta',
    antifona_entrada: 'Este es el diácono san Lorenzo, que dio su vida por la Iglesia; mereció la corona del martirio y subió triunfante al encuentro del Señor.',
    oracion_colecta: 'Señor Dios, por cuyo amor ardiente san Lorenzo resplandeció como servidor fiel en tu Iglesia y fue glorificado en el martirio, concédenos amar lo que él amó y poner por obra lo que enseñó. Por nuestro Señor Jesucristo.',
    primera_lectura: {
      titulo: 'Primera Lectura',
      cita: '2 Corintios 9, 6-10',
      texto: 'Hermanos: El que siembra tacañamente, tacañamente cosechará; el que siembra generosamente, generosamente cosechará. Cada uno dé como ha decidido en su corazón: no de mala gana ni por compromiso, porque Dios ama al que da con alegría. Dios tiene poder para colmarlos de toda clase de gracias. Palabra de Dios.',
      monicion: 'San Pablo nos exhorta a la generosidad y al desprendimiento hacia los necesitados.'
    },
    salmo_responsorial: {
      cita: 'Salmo 111',
      respuesta: 'Dichoso el que se apiada y presta.',
      texto: 'Dichoso quien teme al Señor\ny ama de corazón sus mandatos.\nSu linaje será poderoso en la tierra,\nla descendencia del justo será bendita.\n\nR. Dichoso el que se apiada y presta.'
    },
    aclamacion_evangelio: {
      texto: 'R. Aleluya, aleluya.\nEl que me sigue no camina en tinieblas, sino que tendrá la luz de la vida, dice el Señor.\nR. Aleluya.'
    },
    evangelio: {
      titulo: 'Santo Evangelio',
      cita: 'Juan 12, 24-26',
      texto: 'En aquel tiempo, dijo Jesús a sus discípulos: «En verdad, en verdad les digo: si el grano de trigo no cae en tierra y muere, queda infecundo; pero si muere, da mucho fruto. El que se ama a sí mismo, se pierde, y el que se aborrece a sí mismo en este mundo, se guardará para la vida eterna. El que quiera servirme, que me siga, y donde esté yo, allí también estará mi servidor; a quien me sirva, el Padre lo honrará». Palabra del Señor.',
      monicion: 'Como el grano de trigo, el mártir entrega su vida terrena para florecer en la gloria eterna.'
    },
    oracion_ofrendas: 'Acepta propicio, Señor, las ofrendas que con gozo te presentamos en la fiesta de san Lorenzo, y haz que nos sirvan de provecho para la salvación. Por Jesucristo, nuestro Señor.',
    antifona_comunion: 'El que quiera servirme, que me siga, y donde esté yo, allí también estará mi servidor, dice el Señor.',
    oracion_comunion: 'Saciados con este sagrado don, te suplicamos humildemente, Señor, que el homenaje de nuestra servidumbre, ofrecido en la fiesta de san Lorenzo, nos haga crecer en la gracia de tu salvación. Por Jesucristo, nuestro Señor.'
  },

  '08-15': {
    titulo_celebracion: 'La Asunción de la Santísima Virgen María',
    tiempo_liturgico: 'Tiempo Ordinario',
    color: 'Blanco',
    grado: 'Solemnidad',
    antifona_entrada: 'Una gran señal apareció en el cielo: una mujer vestida del sol, con la luna bajo sus pies y una corona de doce estrellas sobre su cabeza.',
    oracion_colecta: 'Dios todopoderoso y eterno, que has elevado en cuerpo y alma a la gloria del cielo a la Inmaculada Virgen María, Madre de tu Hijo, concédenos que, aspirando siempre a las realidades celestiales, lleguemos a participar de su misma gloria. Por nuestro Señor Jesucristo.',
    primera_lectura: {
      titulo: 'Primera Lectura',
      cita: 'Apocalipsis 11, 19a; 12, 1-6a. 10ab',
      texto: 'Se abrió en el cielo el santuario de Dios y apareció en su santuario el arca de su alianza. Un gran signo apareció en el cielo: una mujer vestida del sol, y la luna bajo sus pies y una corona de doce estrellas sobre su cabeza... Y dio a luz un hijo varón, el que ha de pastorear a todas las naciones... Y oí una gran voz en el cielo que decía: «Ahora se ha establecido la salvación y el poder y el reinado de nuestro Dios y la potestad de su Cristo». Palabra de Dios.',
      monicion: 'La Virgen María es el Arca de la Alianza y la mujer victoriosa coronada en el cielo.'
    },
    salmo_responsorial: {
      cita: 'Salmo 44',
      respuesta: 'De pie a tu derecha está la reina, enjoyada con oro.',
      texto: 'Hijas de reyes hay entre tus preferidas,\nde pie a tu derecha está la reina,\nenjoyada con oro de Ofir.\n\nR. De pie a tu derecha está la reina, enjoyada con oro.'
    },
    segunda_lectura: {
      titulo: 'Segunda Lectura',
      cita: '1 Corintios 15, 20-27a',
      texto: 'Hermanos: Cristo ha resucitado de entre los muertos: primicia de todos los que han muerto. Si por un hombre vino la muerte, por un hombre ha venido la resurrección. Pues lo mismo que en Adán mueren todos, así en Cristo todos serán vivificados... Palabra de Dios.',
      monicion: 'María participa en plenitud de la victoria pascual de Cristo sobre la muerte.'
    },
    aclamacion_evangelio: {
      texto: 'R. Aleluya, aleluya.\nMaría ha sido llevada al cielo; se alegra el ejército de los ángeles.\nR. Aleluya.'
    },
    evangelio: {
      titulo: 'Santo Evangelio',
      cita: 'Lucas 1, 39-56',
      texto: 'En aquellos días, María se levantó y se puso en camino de prisa hacia la montaña... Entró en casa de Zacarías y saludó a Isabel... María dijo: «Proclama mi alma la grandeza del Señor, se alegra mi espíritu en Dios, mi salvador; porque ha mirado la humillación de su esclava. Desde ahora me felicitarán todas las generaciones, porque el Poderoso ha hecho obras grandes por mí: su nombre es santo». Palabra del Señor.',
      monicion: 'La Virgen canta el Magníficat alabando las maravillas que el Todopoderoso ha hecho en ella.'
    },
    oracion_ofrendas: 'Suba hasta ti, Señor, nuestra ferviente ofrenda, y por la intercesión de la santísima Virgen María, llevada al cielo, encienda nuestros corazones en el fuego de tu amor. Por Jesucristo, nuestro Señor.',
    antifona_comunion: 'Todas las generaciones me llamarán bienaventurada, porque el Todopoderoso ha hecho en mí grandes cosas.',
    oracion_comunion: 'Habiendo recibido este sacramento de salvación, te pedimos, Señor, que por la intercesión de la bienaventurada Virgen María elevada al cielo, alcancemos la gloria de la resurrección. Por Jesucristo, nuestro Señor.'
  },

  // 19 DE AGOSTO: San Juan Eudes / Miércoles XX Ordinario
  '08-19': {
    titulo_celebracion: 'San Juan Eudes, presbítero (o Miércoles de la XX semana del Tiempo Ordinario)',
    tiempo_liturgico: 'Tiempo Ordinario',
    color: 'Verde',
    grado: 'Memoria',
    antifona_entrada: 'Protector nuestro, mira, oh Dios, y contempla el rostro de tu Ungido; pues un solo día en tus atrios vale más que mil fuera de ellos. (Sal 83, 10-11)',
    oracion_colecta: 'Señor Dios, que has preparado bienes invisibles para los que te aman, infunde en nuestros corazones el afecto de tu amor, para que, amándote en todo y sobre todo, consigamos tus promesas, que superan todo deseo. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos.',
    primera_lectura: {
      titulo: 'Primera Lectura',
      cita: 'Ezequiel 34, 1-11',
      texto: `En aquel tiempo, me fue dirigida la palabra del Señor en estos términos:

«Hijo de hombre, profetiza contra los pastores de Israel; profetiza diciéndoles: "Pastores, esto dice el Señor Dios: ¡Ay de los pastores de Israel que se apacientan a sí mismos! ¿No es a las ovejas a quienes deben apacentar los pastores? Ustedes se comen su leche, se visten con su lana y sacrifican a las ovejas gordas, pero no apacientan a mi rebaño. No fortalecen a las débiles, no curan a las enfermas, no vendan a las heridas, no traen a las descarriadas ni buscan a las perdidas, sino que las dominan con crueldad y violencia.

Por falta de pastor se han dispersado mis ovejas y han sido presa fácil de todas las fieras del campo. Mi rebaño anda errante por todos los montes y colinas; mis ovejas se han dispersado por toda la superficie de la tierra, sin que nadie las busque ni pregunte por ellas.

Por eso, pastores, escuchen la palabra del Señor: ¡Juro por mi vida —oráculo del Señor Dios— que por haber dejado a mi rebaño expuesto a la rapiña, yo me enfrentaré a los pastores! Les reclamaré mis ovejas, no les dejaré apacentar mi rebaño y libraré a mis ovejas de sus fauces.

Porque esto dice el Señor Dios: Yo mismo buscaré a mis ovejas y cuidaré de ellas"».

Palabra de Dios.`,
      monicion: 'Dios denuncia a los malos pastores y promete cuidar Él mismo de su pueblo con ternura y justicia.'
    },
    salmo_responsorial: {
      cita: 'Salmo 22',
      respuesta: 'El Señor es mi pastor, nada me falta.',
      texto: `El Señor es mi pastor, nada me falta:
en verdes praderas me hace recostar;
me conduce hacia fuentes tranquilas
y repara mis fuerzas.

R. El Señor es mi pastor, nada me falta.

Me guía por el sendero justo,
por el honor de su nombre.
Aunque camine por cañadas oscuras,
nada temo, porque tú vas conmigo:
tu vara y tu cayado me sosiegan.

R. El Señor es mi pastor, nada me falta.

Preparas una mesa ante mí,
enfrente de mis enemigos;
me unges la cabeza con perfume,
y mi copa rebosa.

R. El Señor es mi pastor, nada me falta.

Tu bondad y tu misericordia me acompañan
todos los días de mi vida,
y habitaré en la casa del Señor
por años sin término.

R. El Señor es mi pastor, nada me falta.`
    },
    aclamacion_evangelio: {
      texto: 'R. Aleluya, aleluya.\nLa palabra de Dios es viva y eficaz; discierne los pensamientos y las intenciones del corazón.\nR. Aleluya.'
    },
    evangelio: {
      titulo: 'Santo Evangelio',
      cita: 'Mateo 20, 1-16',
      texto: `En aquel tiempo, Jesús dijo a sus discípulos esta parábola:

«El reino de los cielos se parece a un propietario que salió de madrugada a contratar obreros para su viña. Habiendo convenido con ellos en un denario por jornada, los envió a su viña.

Salió luego hacia las nueve de la mañana, vio a otros que estaban en la plaza desocupados y les dijo: "Vayan también ustedes a mi viña y les daré lo que sea justo". Y ellos fueron. Salió de nuevo hacia el mediodía y hacia las tres de la tarde e hizo lo mismo.

Salió también hacia las cinco de la tarde, encontró a otros parados y les dijo: "¿Por qué se han quedado aquí todo el día desocupados?". Le contestaron: "Porque nadie nos ha contratado". Él les dijo: "Vayan también ustedes a mi viña".

Al atardecer, dijo el dueño de la viña a su administrador: "Llama a los obreros y págales el jornal, empezando por los últimos hasta los primeros". Vinieron los de las cinco de la tarde y recibieron un denario cada uno. Cuando llegaron los primeros, pensaban que recibirían más, pero también ellos recibieron un denario cada uno. Al recibirlo, protestaban contra el propietario diciendo: "Estos últimos han trabajado sólo una hora y los has tratado igual que a nosotros, que hemos soportado el peso del día y el bochorno".

Pero el dueño respondió a uno de ellos: "Amigo, no te hago ninguna injusticia. ¿No quedamos en un denario? Toma lo tuyo y vete. Quiero darle a este último lo mismo que a ti. ¿Es que no tengo derecho a hacer lo que quiero con mis bienes? ¿O vas a tener envidia porque yo soy bueno?".

Así, los últimos serán los primeros y los primeros, los últimos».

Palabra del Señor.`,
      monicion: 'Jesús nos enseña en la parábola de los obreros de la viña que la gracia de Dios es un don generoso y gratuito.'
    },
    oracion_ofrendas: 'Acepta, Señor, estos dones en los que se realiza un admirable intercambio, para que, al ofrecerte lo que tú mismo nos diste, merezcamos recibirte a ti mismo. Por Jesucristo, nuestro Señor.',
    antifona_comunion: 'En el Señor está la misericordia, abundante en él la redención. (Sal 129, 7)',
    oracion_comunion: 'Unidos a Cristo por este sacramento, imploramos, Señor, tu misericordia, para que, configurados a él en la tierra, merezcamos ser sus coherederos en el cielo. Él, que vive y reina por los siglos de los siglos.',
    reflexion_homiletica: [
      `En la primera lectura, el profeta Ezequiel eleva una advertencia solemne a los pastores que descuidan el rebaño, recordándonos que el verdadero Pastor es Dios mismo, quien busca con celo a la oveja perdida y cura a la enferma. San Juan Eudes, gran apóstol de los Sagrados Corazones de Jesús y María, fundó seminarios para que los sacerdotes fueran auténticos reflejos del amor del Buen Pastor.`,
      `En el Evangelio, la parábola de los trabajadores de la viña desafía la lógica humana del mérito. Dios no mide con nuestra estrechez calculadora: su generosidad es infinita y llama a todos, incluso a la última hora, a participar de la alegría de su Reino. Nuestra respuesta no debe ser la envidia o la queja, sino el agradecimiento reverente ante un Padre que es infinitamente bueno.`
    ]
  },

  // 20 DE AGOSTO: San Bernardo, abad y doctor
  '08-20': {
    titulo_celebracion: 'San Bernardo, abad y doctor de la Iglesia',
    tiempo_liturgico: 'Tiempo Ordinario',
    color: 'Blanco',
    grado: 'Memoria',
    antifona_entrada: 'El Señor lo llenó del espíritu de sabiduría e inteligencia, y lo vistió con un manto de gloria.',
    oracion_colecta: 'Señor Dios, que hiciste del abad san Bernardo un hombre lleno de celo por tu casa y una lumbrera ardiente en tu Iglesia, concédenos, por su intercesión, estar animados del mismo espíritu de amor para caminar siempre como hijos de la luz. Por nuestro Señor Jesucristo.',
    primera_lectura: {
      titulo: 'Primera Lectura',
      cita: 'Ezequiel 36, 23-28',
      texto: 'Esto dice el Señor Dios: «Mostraré la santidad de mi nombre grande, profanado entre las naciones... Los sacaré de entre las naciones, los reuniré de todos los países y los llevaré a su tierra. Los rociaré con agua pura y quedarán purificados; los purificaré de todas sus inmundicias e idolatrías. Les daré un corazón nuevo y les infundiré un espíritu nuevo; arrancaré de ustedes el corazón de piedra y les daré un corazón de carne. Les infundiré mi espíritu y los haré vivir según mis preceptos. Habitarán en la tierra que di a sus padres; ustedes serán mi pueblo y yo seré su Dios». Palabra de Dios.',
      monicion: 'El Señor promete renovar nuestro ser interior dándonos un corazón dócil y lleno de su Espíritu.'
    },
    salmo_responsorial: {
      cita: 'Salmo 50',
      respuesta: 'Crea en mí, Señor, un corazón puro.',
      texto: 'Oh Dios, crea en mí un corazón puro,\nrenuévame por dentro con espíritu firme;\nno me arrojes lejos de tu rostro,\nno me quites tu santo espíritu.\n\nR. Crea en mí, Señor, un corazón puro.'
    },
    aclamacion_evangelio: {
      texto: 'R. Aleluya, aleluya.\nSi hoy escuchan la voz del Señor, no endurezcan su corazón.\nR. Aleluya.'
    },
    evangelio: {
      titulo: 'Santo Evangelio',
      cita: 'Mateo 22, 1-14',
      texto: 'En aquel tiempo, Jesús volvió a hablar en parábolas a los sumos sacerdotes y a los ancianos del pueblo, diciendo: «El reino de los cielos se parece a un rey que celebraba la boda de su hijo. Envió a sus criados para llamar a los convidados a la boda, pero estos no quisieron ir... Entonces dijo a sus criados: "La boda está preparada, pero los convidados no eran dignos. Vayan a los cruces de los caminos y a cuantos encuentren, invítenlos a la boda". Los criados salieron a los caminos y reunieron a todos los que encontraron, malos y buenos. La sala del banquete se llenó de comensales». Palabra del Señor.',
      monicion: 'El Señor nos convoca al banquete celestial de su amor; respondamos vistiendo el traje de la caridad y la gracia.'
    },
    oracion_ofrendas: 'Te ofrecemos, Señor, este sacrificio de alabanza en la fiesta de san Bernardo, pidiéndote que sus enseñanzas y ejemplos nos inflamen en el deseo de tu amor. Por Jesucristo, nuestro Señor.',
    antifona_comunion: 'Como el Padre me ha amado, así los he amado yo; permanezcan en mi amor, dice el Señor.',
    oracion_comunion: 'Que el sacramento que hemos recibido, Señor, al conmemorar a san Bernardo, produzca en nosotros el fruto de su eficacia vivificante. Por Jesucristo, nuestro Señor.'
  },

  // 21 DE AGOSTO: San Pío X, papa
  '08-21': {
    titulo_celebracion: 'San Pío X, papa',
    tiempo_liturgico: 'Tiempo Ordinario',
    color: 'Blanco',
    grado: 'Memoria',
    antifona_entrada: 'El Señor lo eligió sumo sacerdote y, abriéndole sus tesoros, lo colmó de toda bendición.',
    oracion_colecta: 'Dios nuestro, que para defender la fe católica y restaurar todas las cosas en Cristo llenaste al papa san Pío Décimo de sabiduría celestial y de fortaleza apostólica, concédenos que, siguiendo sus enseñanzas y ejemplos, alcancemos la recompensa eterna. Por nuestro Señor Jesucristo.',
    primera_lectura: {
      titulo: 'Primera Lectura',
      cita: 'Ezequiel 37, 1-14',
      texto: 'En aquellos días, la mano del Señor se posó sobre mí y me llevó por su espíritu a un valle lleno de huesos secos... Y me dijo: «Hijo de hombre, profetiza sobre estos huesos: Huesos secos, escuchen la palabra del Señor: Yo infundiré sobre ustedes espíritu y vivirán». Y profeticé como se me había mandado, y entró en ellos el espíritu, revivieron y se pusieron de pie: una multitud inmensa. Y me dijo: «Hijo de hombre, estos huesos son la casa de Israel. Yo abriré sus sepulcros, los sacaré de sus tumbas y sabrán que yo soy el Señor». Palabra de Dios.',
      monicion: 'La visión de los huesos secos nos anuncia la fuerza vivificadora del Espíritu de Dios sobre su pueblo.'
    },
    salmo_responsorial: {
      cita: 'Salmo 106',
      respuesta: 'Den gracias al Señor porque es bueno, porque es eterna su misericordia.',
      texto: 'Que lo confiesen los redimidos por el Señor,\nlos que él libró de la mano del enemigo,\nlos que congregó de todas las tierras:\ndel oriente y del occidente, del norte y del sur.\n\nR. Den gracias al Señor porque es bueno.'
    },
    aclamacion_evangelio: {
      texto: 'R. Aleluya, aleluya.\nMuéstrame, Señor, tus caminos; guíame por el camino de tu verdad.\nR. Aleluya.'
    },
    evangelio: {
      titulo: 'Santo Evangelio',
      cita: 'Mateo 22, 34-40',
      texto: 'En aquel tiempo, los fariseos, al oír que Jesús había hecho callar a los saduceos, se reunieron en grupo. Uno de ellos, doctor de la ley, le preguntó para ponerlo a prueba: «Maestro, ¿cuál es el mandamiento principal de la ley?». Jesús le dijo: «"Amarás al Señor tu Dios con todo tu corazón, con toda tu alma y con toda tu mente". Este es el primer y principal mandamiento. El segundo es semejante a este: "Amarás a tu prójimo como a ti mismo". En estos dos mandamientos se sostienen toda la Ley y los Profetas». Palabra del Señor.',
      monicion: 'Jesús resume toda la ley divina en dos pilares inseparables: el amor absoluto a Dios y el amor al prójimo.'
    },
    oracion_ofrendas: 'Acepta con bondad, Señor, nuestras ofrendas, y concédenos que, dóciles a las enseñanzas del papa san Pío Décimo, celebremos con dignidad estos sagrados misterios. Por Jesucristo, nuestro Señor.',
    antifona_comunion: 'El buen pastor da su vida por sus ovejas.',
    oracion_comunion: 'Al celebrar la memoria del papa san Pío Décimo, te pedimos, Señor Dios nuestro, que por la eficacia de este banquete celestial nos mantengamos firmes en la fe y unánimes en tu caridad. Por Jesucristo, nuestro Señor.'
  },

  // 24 DE AGOSTO: San Bartolomé, apóstol
  '08-24': {
    titulo_celebracion: 'San Bartolomé, apóstol',
    tiempo_liturgico: 'Tiempo Ordinario',
    color: 'Rojo',
    grado: 'Fiesta',
    antifona_entrada: 'Proclamen día tras día la salvación de Dios; cuenten a los pueblos su gloria, sus maravillas a todas las naciones.',
    oracion_colecta: 'Fortalece en nosotros, Señor, aquella fe con la que san Bartolomé, apóstol, se unió sinceramente a tu Hijo, y haz que, por sus ruegos, tu Iglesia sea para todas las gentes sacramento de salvación. Por nuestro Señor Jesucristo.',
    primera_lectura: {
      titulo: 'Primera Lectura',
      cita: 'Apocalipsis 21, 9b-14',
      texto: 'El ángel me habló diciendo: «Ven, te mostraré a la novia, a la esposa del Cordero». Me transportó en espíritu a una montaña grande y alta, y me mostró la ciudad santa de Jerusalén, que bajaba del cielo, de parte de Dios, resplandeciente con la gloria de Dios. Tenía una muralla grande y alta con doce puertas, y sobre las puertas doce ángeles... La muralla de la ciudad tenía doce cimientos, y sobre ellos estaban los doce nombres de los doce apóstoles del Cordero. Palabra de Dios.',
      monicion: 'La Iglesia celestial está fundada sobre el testimonio apostólico de quienes entregaron su vida por el Evangelio.'
    },
    salmo_responsorial: {
      cita: 'Salmo 144',
      respuesta: 'Que tus fieles proclamen la gloria de tu reino, Señor.',
      texto: 'Que todas tus criaturas te den gracias, Señor,\nque te bendigan tus fieles;\nque proclamen la gloria de tu reinado,\nque hablen de tus hazañas.\n\nR. Que tus fieles proclamen la gloria de tu reino, Señor.'
    },
    aclamacion_evangelio: {
      texto: 'R. Aleluya, aleluya.\nRabbí, tú eres el Hijo de Dios, tú eres el Rey de Israel.\nR. Aleluya.'
    },
    evangelio: {
      titulo: 'Santo Evangelio',
      cita: 'Juan 1, 45-51',
      texto: 'En aquel tiempo, Felipe encuentra a Natanael (Bartolomé) y le dice: «Aquel de quien escribieron Moisés en la Ley y los profetas, lo hemos encontrado: Jesús, hijo de José, de Nazaret». Natanael le replicó: «¿De Nazaret puede salir algo bueno?». Felipe le contestó: «Ven y verás». Vio Jesús que se acercaba Natanael y dijo de él: «Ahí tienen a un israelita de verdad, en quien no hay engaño». Natanael le contesta: «¿De qué me conoces?». Jesús le responde: «Antes de que Felipe te llamara, cuando estabas debajo de la higuera, te vi». Natanael exclamó: «Rabbí, ¡tú eres el Hijo de Dios, tú eres el Rey de Israel!». Jesús le contestó: «¿Crees porque te he dicho que te vi debajo de la higuera? Cosas mayores que estas verás. En verdad, en verdad les digo: verán el cielo abierto y a los ángeles de Dios subir y bajar sobre el Hijo del hombre». Palabra del Señor.',
      monicion: 'Natanael reconoce a Jesús como Mesías e Hijo de Dios ante la mirada traspasante del Maestro.'
    },
    oracion_ofrendas: 'Al celebrar la fiesta del apóstol san Bartolomé, te presentamos, Señor, este sacrificio de alabanza, suplicándote nos conceda tu auxilio perenne. Por Jesucristo, nuestro Señor.',
    antifona_comunion: 'Yo les confiero el reino, como mi Padre me lo confirió a mí, para que coman y beban a mi mesa en mi reino, dice el Señor.',
    oracion_comunion: 'Al recibir la prenda de la salvación eterna en la fiesta del apóstol san Bartolomé, te pedimos, Señor, que este sacramento sea para nosotros auxilio en la vida presente y futura. Por Jesucristo, nuestro Señor.'
  },

  // 12 DE DICIEMBRE: Nuestra Señora de Guadalupe
  '12-12': {
    titulo_celebracion: 'Nuestra Señora de Guadalupe, Patrona de América',
    tiempo_liturgico: 'Adviento',
    color: 'Blanco',
    grado: 'Solemnidad',
    antifona_entrada: 'Una gran señal apareció en el cielo: una mujer vestida del sol, con la luna bajo sus pies y una corona de doce estrellas.',
    oracion_colecta: 'Dios de misericordia, que has puesto a este pueblo tuyo bajo la especial protección de la siempre Virgen María de Guadalupe, Madre de tu Hijo, concédenos, por su intercesión, profundizar en nuestra fe y buscar el progreso de nuestra patria por caminos de justicia y de paz. Por nuestro Señor Jesucristo.',
    primera_lectura: {
      titulo: 'Primera Lectura',
      cita: 'Zacarías 2, 14-17 (o Apocalipsis 11, 19a; 12, 1-6a)',
      texto: '«Canta y gózate, hija de Sión, porque yo vengo a habitar en medio de ti —oráculo del Señor—. Muchas naciones se unirán al Señor en aquel día y serán mi pueblo, y yo habitaré en medio de ti. Y sabrás que el Señor de los ejércitos me ha enviado a ti». Palabra de Dios.',
      monicion: 'El profeta invita a la alegría porque el Señor viene a morar en medio de su pueblo.'
    },
    salmo_responsorial: {
      cita: 'Judit 13',
      respuesta: 'Tú eres el orgullo de nuestro pueblo.',
      texto: 'El Señor te ha bendecido, hija,\nmás que a todas las mujeres de la tierra.\nBendito sea el Señor, creador de cielo y tierra.\n\nR. Tú eres el orgullo de nuestro pueblo.'
    },
    aclamacion_evangelio: {
      texto: 'R. Aleluya, aleluya.\nDichosa tú, santa Virgen María, que has creído, porque lo que te ha dicho el Señor se cumplirá.\nR. Aleluya.'
    },
    evangelio: {
      titulo: 'Santo Evangelio',
      cita: 'Lucas 1, 39-48',
      texto: 'En aquellos días, María se levantó y se puso en camino de prisa hacia la montaña, a una ciudad de Judá; entró en casa de Zacarías y saludó a Isabel. En cuanto Isabel oyó el saludo de María, saltó la criatura en su vientre. Se llenó Isabel de Espíritu Santo y exclamó: «¡Bendita tú entre las mujeres y bendito el fruto de tu vientre!». Y María dijo: «¿No estoy yo aquí que soy tu Madre? Proclama mi alma la grandeza del Señor». Palabra del Señor.',
      monicion: 'María visita a Isabel llevando en su seno al Salvador, derramando bendición y gozo en las familias.'
    },
    oracion_ofrendas: 'Acepta, Señor, los dones que te presentamos en la fiesta de Nuestra Señora de Guadalupe, y haz que este sacrificio nos ayude a cumplir tus mandamientos con amor filial. Por Jesucristo, nuestro Señor.',
    antifona_comunion: 'No hizo nada igual con ninguna otra nación, ni les manifestó tan claramente sus designios.',
    oracion_comunion: 'El Señor Dios renueve en nosotros, por este sacramento de vida, el amor a su Evangelio, para que, al proclamar a la Virgen de Guadalupe Madre nuestra, vivamos siempre como hermanos en la fe. Por Jesucristo, nuestro Señor.'
  }
};
