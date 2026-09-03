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
  },

  // 25 DE AGOSTO: San Luis Rey de Francia / San José de Calasanz
  '08-25': {
    titulo_celebracion: 'San Luis Rey de Francia / San José de Calasanz, presbítero',
    tiempo_liturgico: 'Tiempo Ordinario',
    color: 'Blanco',
    grado: 'Memoria Libre',
    antifona_entrada: 'Dichoso el hombre que teme al Señor y ama de corazón sus mandatos; su linaje será poderoso en la tierra.',
    oracion_colecta: 'Dios todopoderoso, que trasladaste a san Luis de los cuidados del gobierno temporal a la gloria del reino celestial, concédenos, por su intercesión, buscar ante todo tu reino eterno. Por nuestro Señor Jesucristo.',
    primera_lectura: {
      titulo: 'Primera Lectura',
      cita: '2 Tesalonicenses 2, 1-3a. 14-17',
      monicion: 'San Pablo exhorta a no dejarse confundir y mantenerse firmes en la tradición apostólica.',
      texto: `Hermanos: Por lo que se refiere a la venida de nuestro Señor Jesucristo y a nuestra reunión con él, les rogamos que no pierdan fácilmente la cabeza ni se alarmen por revelaciones, declaraciones o cartas atribuidas a nosotros, como si el día del Señor fuera ya inminente. Que nadie los engañe de ninguna manera.

Dios los llamó por medio de nuestro Evangelio para que alcancen la gloria de nuestro Señor Jesucristo. Así pues, hermanos, manténganse firmes y conserven las tradiciones que han aprendido de nosotros, sea de palabra, sea por carta.

Que el mismo Señor nuestro Jesucristo y Dios nuestro Padre, que nos ha amado y nos ha dado un consuelo eterno y una esperanza dichosa por su gracia, consuele sus corazones y los afiance en toda obra y palabra buena.

Palabra de Dios.`
    },
    salmo_responsorial: {
      cita: 'Salmo 95',
      respuesta: 'R. El Señor llega a regir la tierra.',
      texto: `Digan a los pueblos: «El Señor es rey, él afianzó el orbe y no se moverá; él gobierna a los pueblos rectamente».

R. El Señor llega a regir la tierra.

Alégrese el cielo, goce la tierra, retumbe el mar y cuanto lo llena; gocen los campos y cuanto en ellos hay, aclamen los árboles del bosque.

R. El Señor llega a regir la tierra.`
    },
    aclamacion_evangelio: {
      texto: 'R. Aleluya, aleluya.\nLa palabra de Dios es viva y eficaz; discierne los pensamientos y las intenciones del corazón.\nR. Aleluya.'
    },
    evangelio: {
      titulo: 'Santo Evangelio',
      cita: 'Mateo 23, 23-26',
      monicion: 'Jesús nos enseña que el culto a Dios debe acompañarse de la justicia, la misericordia y la fe sincera.',
      texto: `En aquel tiempo, Jesús habló diciendo:
«¡Ay de ustedes, escribas y fariseos hipócritas, que pagan el diezmo de la menta, del anís y del comino, y descuidan lo más importante de la Ley: la justicia, la misericordia y la fidelidad! Esto es lo que había que practicar, aunque sin descuidar aquello. ¡Guías ciegos, que cuelan el mosquito y se tragan el camello!

¡Ay de ustedes, escribas y fariseos hipócritas, que limpian por fuera la copa y el plato, mientras por dentro están llenos de robo y desenfreno! Fariseo ciego: limpia primero por dentro la copa y el plato, para que también por fuera queden limpios».

Palabra del Señor.`
    },
    oracion_ofrendas: 'Acepta, Señor, los dones que te presentamos en la conmemoración de san Luis, y haz que fructifique en nosotros el fruto de este santo sacrificio. Por Jesucristo, nuestro Señor.',
    antifona_comunion: 'El que quiera venir en pos de mí, niéguese a sí mismo, tome su cruz y sígame, dice el Señor.',
    oracion_comunion: 'Alimentados con el pan celestial, te rogamos humildemente, Señor, que a ejemplo de tus santos te sirvamos con pureza de corazón. Por Jesucristo, nuestro Señor.'
  },

  // 27 DE AGOSTO: Santa Mónica
  '08-27': {
    titulo_celebracion: 'Santa Mónica',
    tiempo_liturgico: 'Tiempo Ordinario',
    color: 'Blanco',
    grado: 'Memoria Obligatoria',
    antifona_entrada: 'La mujer que teme al Señor, esa será alabada; sus hijos se levantan para proclamarla dichosa y su marido la elogia.',
    oracion_colecta: 'Dios nuestro, consuelo de los afligidos, que acogiste piadosamente las lágrimas de santa Mónica por la conversión de su hijo Agustín, concédenos, por la intercesión de ambos, llorar nuestros pecados y alcanzar la gracia de tu perdón. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos.',
    primera_lectura: {
      titulo: 'Primera Lectura',
      cita: '1 Corintios 1, 1-9 (o Eclesiástico 26, 1-4. 13-16)',
      monicion: 'San Pablo da gracias a Dios por los abundantes dones y carismas derramados en la comunidad.',
      texto: `Pablo, llamado a ser apóstol de Jesucristo por voluntad de Dios, y Sóstenes, el hermano, a la Iglesia de Dios que está en Corinto, a los santificados en Cristo Jesús, llamados a ser santos, con todos los que en cualquier lugar invocan el nombre de nuestro Señor Jesucristo, Señor de ellos y nuestro: gracia y paz a ustedes de parte de Dios nuestro Padre y del Señor Jesucristo.

Doy continuas gracias a mi Dios por ustedes, por la gracia de Dios que les ha sido dada en Cristo Jesús; pues en él han sido enriquecidos en todo, en toda palabra y en todo conocimiento, conforme se ha consolidado entre ustedes el testimonio de Cristo, de modo que no carecen de ningún don de gracia a los que esperan la manifestación de nuestro Señor Jesucristo.

Él los mantendrá firmes hasta el final, para que resulten irreprochables en el día de nuestro Señor Jesucristo. Fiel es Dios, por quien fueron llamados a la comunión con su Hijo Jesucristo, Señor nuestro.

Palabra de Dios.`
    },
    salmo_responsorial: {
      cita: 'Salmo 144',
      respuesta: 'R. Alabaré tu nombre para siempre, Señor.',
      texto: `Día tras día te bendeciré
y alabaré tu nombre por siempre jamás.
Grande es el Señor y muy digno de alabanza,
su grandeza es insondable.

R. Alabaré tu nombre para siempre, Señor.

Una generación pondera tus obras a la otra,
y le cuenta tus hazañas.
Alaban ellos la gloria de tu majestad,
y yo proclamo tus maravillas.

R. Alabaré tu nombre para siempre, Señor.`
    },
    aclamacion_evangelio: {
      texto: 'R. Aleluya, aleluya.\nEstén en vela, porque no saben a qué hora vendrá el Hijo del hombre.\nR. Aleluya.'
    },
    evangelio: {
      titulo: 'Santo Evangelio',
      cita: 'Mateo 24, 42-51 (o Lucas 7, 11-17)',
      monicion: 'Jesús nos exhorta a la vigilancia activa, sirviendo con fidelidad y constancia.',
      texto: `En aquel tiempo, dijo Jesús a sus discípulos:
«Estén en vela, porque no saben qué día vendrá su Señor. Comprendan que si el dueño de casa supiera a qué hora de la noche viene el ladrón, estaría en vela y no dejaría abrir una brecha en su casa. Por eso, estén también ustedes preparados, porque a la hora que menos piensen viene el Hijo del hombre.

¿Dónde hay un siervo fiel y prudente, a quien el señor puso al frente de su servidumbre para darles la comida a su tiempo? ¡Dichoso el siervo a quien su señor, al llegar, lo encuentre haciéndolo así! En verdad les digo que lo pondrá al frente de todos sus bienes.

Pero si el siervo malvado dice para sus adentros: "Mi señor tarda en llegar", y empieza a pegar a sus compañeros, y come y bebe con los borrachos, vendrá el señor de ese siervo el día que no espera y a la hora que no sabe, y lo castigará con rigor y le asignará su lugar con los hipócritas. Allí será el llanto y el crujir de dientes».

Palabra del Señor.`
    },
    oracion_ofrendas: 'Acepta, Señor, las ofrendas que te presentamos al conmemorar a santa Mónica, y haz que nuestro corazón se mantenga firme en la fe y la oración perseverante. Por Jesucristo, nuestro Señor.',
    antifona_comunion: 'El reino de los cielos se parece a un comerciante que busca perlas finas; al encontrar una de gran valor, vende todo lo que tiene y la compra.',
    oracion_comunion: 'Alimentados con el sacramento del Cuerpo y de la Sangre de tu Hijo, te pedimos, Señor, que, a ejemplo de santa Mónica, proclamemos tu amor con obras de vida eterna. Por Jesucristo, nuestro Señor.'
  },

  // 28 DE AGOSTO: San Agustín, obispo y doctor de la Iglesia
  '08-28': {
    titulo_celebracion: 'San Agustín, obispo y doctor de la Iglesia',
    tiempo_liturgico: 'Tiempo Ordinario',
    color: 'Blanco',
    grado: 'Memoria Obligatoria',
    antifona_entrada: 'En medio de la Iglesia abrió su boca, y el Señor lo llenó del espíritu de sabiduría y de inteligencia, y lo revistió con manto de gloria.',
    oracion_colecta: 'Renueva en tu Iglesia, Señor, aquel espíritu con el que colmaste a tu obispo san Agustín, para que, sedientos de ti, única fuente de la verdadera sabiduría, no descansemos hasta encontrarte, único fin de nuestros corazones. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos.',
    primera_lectura: {
      titulo: 'Primera Lectura',
      cita: '1 Juan 4, 7-16 (o 1 Corintios 1, 17-25)',
      monicion: 'San Juan nos revela que Dios es Amor y que quien permanece en el amor, permanece en Dios.',
      texto: `Queridos hermanos: Amémonos unos a otros, ya que el amor es de Dios, y todo el que ama ha nacido de Dios y conoce a Dios. Quien no ama no ha conocido a Dios, porque Dios es amor.

En esto se manifestó el amor que Dios nos tiene: en que Dios envió al mundo a su Unigénito, para que vivamos por medio de él. En esto consiste el amor: no en que nosotros hayamos amado a Dios, sino en que él nos amó y nos envió a su Hijo como víctima de expiación por nuestros pecados.

Queridos hermanos, si Dios nos amó de esta manera, también nosotros debemos amarnos unos a otros. A Dios nadie lo ha visto nunca. Si nos amamos unos a otros, Dios permanece en nosotros y su amor ha llegado en nosotros a su plenitud.

Palabra de Dios.`
    },
    salmo_responsorial: {
      cita: 'Salmo 118',
      respuesta: 'R. Enséñame, Señor, tus decretos.',
      texto: `Dichoso el que con vida intachable
camina en la ley del Señor;
dichoso el que guardando sus preceptos
lo busca de todo corazón.

R. Enséñame, Señor, tus decretos.

Tú promulgas tus decretos
para que se observen exactamente.
Ojalá esté firme mi conducta
en cumplir tus leyes.

R. Enséñame, Señor, tus decretos.`
    },
    aclamacion_evangelio: {
      texto: 'R. Aleluya, aleluya.\nUno solo es su Maestro, el Cristo, dice el Señor.\nR. Aleluya.'
    },
    evangelio: {
      titulo: 'Santo Evangelio',
      cita: 'Mateo 23, 8-12 (o Mateo 25, 1-13)',
      monicion: 'Jesús nos enseña el valor de la humildad sincera y el servicio fraterno.',
      texto: `En aquel tiempo, dijo Jesús a la multitud y a sus discípulos:
«Ustedes no se hagan llamar "rabbí", porque uno solo es su Maestro, y todos ustedes son hermanos. Y no llamen padre suyo a nadie en la tierra, porque uno solo es su Padre, el del cielo. Ni se dejen llamar maestros, porque uno solo es su Maestro, el Cristo.

El mayor entre ustedes será su servidor. El que se enaltece será humillado, y el que se humilla será enaltecido».

Palabra del Señor.`
    },
    oracion_ofrendas: 'Al celebrar la memoria de nuestra salvación, suplicamos humildemente tu clemencia, Señor, para que este sacramento de amor sea para nosotros signo de unidad y vínculo de caridad. Por Jesucristo, nuestro Señor.',
    antifona_comunion: 'Uno solo es su Maestro, el Cristo, y todos ustedes son hermanos, dice el Señor.',
    oracion_comunion: 'Que la participación en la mesa de Cristo nos santifique, Señor, para que, hechos miembros de su Cuerpo, nos transformemos en aquello mismo que hemos recibido. Por Jesucristo, nuestro Señor.'
  },

  // 29 DE AGOSTO: El Martirio de San Juan Bautista
  '08-29': {
    titulo_celebracion: 'El Martirio de San Juan Bautista',
    tiempo_liturgico: 'Tiempo Ordinario',
    color: 'Rojo',
    grado: 'Memoria Obligatoria',
    antifona_entrada: 'Hablaba de tus preceptos, Señor, ante los reyes, y no me avergonzaba; meditaba con gozo tus mandamientos, que tanto amo.',
    oracion_colecta: 'Dios nuestro, que quisiste que san Juan Bautista fuera el precursor de tu Hijo tanto en su nacimiento como en su muerte, concédenos que, así como él murió mártir por la verdad y la justicia, nosotros luchemos valerosamente por confesar tu Evangelio. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos.',
    primera_lectura: {
      titulo: 'Primera Lectura',
      cita: 'Jeremías 1, 17-19',
      monicion: 'El profeta es constituido por Dios como columna invencible para proclamar la verdad sin temor.',
      texto: `En aquellos días, recibí esta palabra del Señor:
«Tú cíñete la cintura, ponte en pie y diles todo lo que yo te mande. No les tengas miedo, que si no, yo te haré temblar ante ellos.

Mira, yo te convierto hoy en plaza fuerte, en columna de hierro, en muralla de bronce frente a todo el país: frente a los reyes de Judá y a sus príncipes, a sus sacerdotes y al pueblo de la tierra.

Lucharán contra ti, pero no te vencerán, porque yo estoy contigo para librarte —oráculo del Señor—».

Palabra de Dios.`
    },
    salmo_responsorial: {
      cita: 'Salmo 70',
      respuesta: 'R. Mi boca contará tu salvación, Señor.',
      texto: `A ti, Señor, me acojo,
no quede yo derrotado para siempre;
tú que eres justo, líbrame y ponme a salvo,
inclina tu oído y sálvame.

R. Mi boca contará tu salvación, Señor.

Sé tú mi roca de refugio,
el alcázar donde me salve,
porque mi peña y mi alcázar eres tú.
Dios mío, líbrame de la mano del perverso.

R. Mi boca contará tu salvación, Señor.`
    },
    aclamacion_evangelio: {
      texto: 'R. Aleluya, aleluya.\nDichosos los perseguidos por causa de la justicia, porque de ellos es el reino de los cielos.\nR. Aleluya.'
    },
    evangelio: {
      titulo: 'Santo Evangelio',
      cita: 'Marcos 6, 17-29',
      monicion: 'Juan el Bautista entrega su vida como mártir intrépido de la verdad y la justicia de Dios.',
      texto: `En aquel tiempo, Herodes había mandado prender a Juan y lo había metido en la cárcel, encadenado, por causa de Herodías, mujer de su hermano Filipo, con quien se había casado. Porque Juan le decía a Herodes: «No te está permitido tener la mujer de tu hermano».

Herodías lo aborrecía y quería matarlo, pero no podía, porque Herodes respetaba a Juan, sabiendo que era un hombre justo y santo, y lo protegía; al oírlo, quedaba muy perplejo, pero lo escuchaba con gusto.

Llegó un día oportuno, cuando Herodes, por su cumpleaños, dio un banquete a sus magnates, a sus tribunos y a los principales de Galilea. La hija de Herodías entró y danzó, gustando mucho a Herodes y a los convidados. El rey le dijo a la joven: «Pídeme lo que quieras y te lo daré»...

Ella salió y dijo a su madre: «¿Qué pido?». La madre le contestó: «La cabeza de Juan el Bautista». Entró enseguida, a toda prisa, donde estaba el rey, y le pidió diciendo: «Quiero que ahora mismo me des en una bandeja la cabeza de Juan el Bautista». El rey se llenó de tristeza; pero por el juramento y los convidados, no quiso desairarla.

Enseguida mandó a un verdugo que trajese la cabeza de Juan. Éste fue, lo decapitó en la cárcel, trajo la cabeza en una bandeja y se la dio a la joven, y la joven se la dio a su madre. Al enterarse sus discípulos, fueron a recoger el cadáver y lo pusieron en un sepulcro.

Palabra del Señor.`
    },
    oracion_ofrendas: 'Por estos dones que te presentamos, Señor, concédenos caminar por las sendas de la verdad que san Juan Bautista proclamó con su palabra y selló con su martirio. Por Jesucristo, nuestro Señor.',
    antifona_comunion: 'Juan decía: «Es necesario que él crezca y que yo disminuya».',
    oracion_comunion: 'Al celebrar el martirio de san Juan Bautista, te pedimos, Señor, que el sacramento celestial que hemos recibido confirme en nosotros el amor a tu santa Ley. Por Jesucristo, nuestro Señor.'
  },


  // ==========================================
  // SANTORAL DE SEPTIEMBRE
  // ==========================================
  // ==========================================
  // SANTORAL DE SEPTIEMBRE (TEXTOS 100% ÍNTEGROS E INABREVADOS)
  // ==========================================
  '09-03': {
    titulo_celebracion: 'San Gregorio Magno, papa y doctor de la Iglesia',
    tiempo_liturgico: 'Tiempo Ordinario',
    color: 'Blanco',
    grado: 'Memoria',
    antifona_entrada: 'El Señor lo eligió sumo sacerdote, abrió sus tesoros y lo colmó de toda bendición.',
    oracion_colecta: 'Dios nuestro, que cuidas a tu pueblo con ternura y lo gobiernas con amor, concede el espíritu de sabiduría a aquellos a quienes has confiado el gobierno de tu Iglesia, para que el progreso de las ovejas sea el gozo eterno de sus pastores. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
    primera_lectura: {
      titulo: 'Primera Lectura',
      cita: '2 Corintios 4, 1-2. 5-7',
      monicion: 'San Pablo predica a Jesucristo Señor y reconoce que llevamos este tesoro en vasijas de barro.',
      texto: `Hermanos: Teniendo este ministerio por la misericordia de Dios, no nos desanimamos; antes bien, hemos renunciado a la clandestinidad vergonzosa, no procediendo con astucia ni falseando la palabra de Dios, sino manifestando la verdad y recomendándonos a nosotros mismos a toda conciencia humana delante de Dios.

Pues no nos predicamos a nosotros mismos, sino a Jesucristo como Señor, y a nosotros como siervos de ustedes por Jesús.

Porque el Dios que dijo: «Brille la luz del seno de las tinieblas», es quien ha hecho brillar la luz en nuestros corazones, para que resplandezca el conocimiento de la gloria de Dios en el rostro de Cristo.

Pero llevamos este tesoro en vasijas de barro, para que se vea que una fuerza tan extraordinaria es de Dios y no proviene de nosotros.

Palabra de Dios.`
    },
    salmo_responsorial: {
      cita: 'Salmo 95, 1-2a. 2b-3. 7-8a. 10',
      respuesta: 'R. Cuenten las maravillas del Señor a todas las naciones.',
      texto: `Canten al Señor un cántico nuevo,
canten al Señor, toda la tierra;
canten al Señor, bendigan su nombre.

R. Cuenten las maravillas del Señor a todas las naciones.

Proclamen día tras día su salvación.
Cuenten a los pueblos su gloria,
sus maravillas a todas las naciones.

R. Cuenten las maravillas del Señor a todas las naciones.

Familias de los pueblos, aclamad al Señor,
aclamad la gloria y el poder del Señor,
aclamad la gloria del nombre del Señor.

R. Cuenten las maravillas del Señor a todas las naciones.

Digan a los pueblos: «El Señor es rey,
él afianzó el orbe y no vacilará;
él gobierna a los pueblos con rectitud».

R. Cuenten las maravillas del Señor a todas las naciones.`
    },
    aclamacion_evangelio: {
      texto: `R. Aleluya, aleluya.
Yo soy el buen pastor —dice el Señor—; conozco a mis ovejas y las mías me conocen.
R. Aleluya.`
    },
    evangelio: {
      titulo: 'Santo Evangelio',
      cita: 'Lucas 22, 24-30',
      monicion: 'Jesús enseña a sus apóstoles que la verdadera grandeza en el Reino consiste en servir a los hermanos.',
      texto: `En aquel tiempo, surgió entre los discípulos una discusión sobre cuál de ellos parecía ser el mayor.

Jesús les dijo:
«Los reyes de las naciones las dominan, y los que ejercen la autoridad sobre ellas se hacen llamar bienhechores; pero entre ustedes no ha de ser así; al contrario, el más grande entre ustedes sea como el más joven, y el que manda como el que sirve. Porque, ¿quién es mayor: el que está a la mesa o el que sirve? ¿No es el que está a la mesa? Pues yo estoy en medio de ustedes como el que sirve.

Ustedes son los que han perseverado conmigo en mis pruebas; y yo les transmito el reino, como mi Padre me lo transmitió a mí, para que coman y beban a mi mesa en mi reino, y se sienten en tronos para juzgar a las doce tribus de Israel».

Palabra del Señor.`
    },
    oracion_ofrendas: 'Acepta, Señor, estos dones que te presentamos en la fiesta de san Gregorio Magno, para que la oblación que le mereció la gloria eterna nos sirva a nosotros de salvación. Por Jesucristo, nuestro Señor. Amén.',
    antifona_comunion: 'Éste es el siervo fiel y prudente a quien el Señor puso al frente de su familia para darles a su tiempo la ración de trigo (Lc 12, 42).',
    oracion_comunion: 'Alimentados con Cristo, pan de vida, te pedimos, Señor, que san Gregorio nos enseñe la verdad evangélica y nos impulse a practicarla con obras de caridad. Por Jesucristo, nuestro Señor. Amén.'
  },

  '09-08': {
    titulo_celebracion: 'La Natividad de la Santísima Virgen María',
    tiempo_liturgico: 'Tiempo Ordinario',
    color: 'Blanco',
    grado: 'Fiesta',
    antifona_entrada: 'Celebremos con júbilo la Natividad de la Virgen María; de ella nació el Sol de justicia, Cristo nuestro Dios.',
    oracion_colecta: 'Concede, Señor, a tus siervos el don de tu gracia celestial, para que, así como la maternidad de la Santísima Virgen fue el comienzo de nuestra salvación, la fiesta de su Natividad nos traiga un aumento de paz. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
    primera_lectura: {
      titulo: 'Primera Lectura',
      cita: 'Miqueas 5, 1-4a',
      monicion: 'El profeta Miqueas anuncia el nacimiento del Pastor y Libertador en Belén de Judá.',
      texto: `Así dice el Señor:
«Y tú, Belén Efratá, pequeña entre las aldeas de Judá, de ti me saldrá el que ha de ser jefe de Israel; su origen es desde lo antiguo, desde tiempos remotos.

Por eso Dios los abandonará hasta el tiempo en que dé a luz la que ha de dar a luz; entonces el resto de sus hermanos volverá a los israelitas.

Se mantendrá firme y apacentará con la fuerza del Señor, con la majestad del nombre del Señor, su Dios. Y habitarán tranquilos, porque entonces él será grande hasta los confines de la tierra, y él mismo será la paz».

Palabra de Dios.`
    },
    salmo_responsorial: {
      cita: 'Salmo 12, 6ab. 6cd',
      respuesta: 'R. Desbordo de gozo con el Señor.',
      texto: `Yo confío en tu misericordia,
mi corazón se alegra con tu salvación.

R. Desbordo de gozo con el Señor.

Cantaré al Señor por el bien que me ha hecho,
tocaré para el nombre del Señor Altísimo.

R. Desbordo de gozo con el Señor.`
    },
    aclamacion_evangelio: {
      texto: `R. Aleluya, aleluya.
Dichosa eres tú, Santa Virgen María, y digna de toda alabanza: porque de ti nació el Sol de justicia, Cristo nuestro Dios.
R. Aleluya.`
    },
    evangelio: {
      titulo: 'Santo Evangelio',
      cita: 'Mateo 1, 18-23',
      monicion: 'San Mateo relata el misterio de la concepción virginal de Jesús en el seno de María por obra del Espíritu Santo.',
      texto: `La generación de Jesucristo fue de esta manera:

María, su madre, estaba desposada con José y, antes de vivir juntos, resultó que ella esperaba un hijo por obra del Espíritu Santo. José, su esposo, que era justo y no quería denunciarla, decidió repudiarla en secreto.

Pero, apenas había tomado esta resolución, se le apareció en sueños un ángel del Señor que le dijo:
«José, hijo de David, no temas acoger a María, tu mujer, porque la criatura que hay en ella viene del Espíritu Santo. Dará a luz un hijo y tú le pondrás por nombre Jesús, porque él salvará a su pueblo de sus pecados».

Todo esto sucedió para que se cumpliese lo que había dicho el Señor por medio del profeta:
«Miren: la virgen concebirá y dará a luz un hijo y le pondrán por nombre Emmanuel, que significa: "Dios con nosotros"».

Palabra del Señor.`
    },
    oracion_ofrendas: 'Que el amor entrañable de tu Unigénito venga en nuestra ayuda, Señor, y el que al nacer de la Virgen no menoscabó la integridad de su Madre sino que la consagró, borre nuestros pecados y haga agradable a ti nuestra oblación. Por Jesucristo, nuestro Señor. Amén.',
    antifona_comunion: 'Miren: la Virgen dará a luz un hijo, que salvará a su pueblo de sus pecados (Mt 1, 21. 23).',
    oracion_comunion: 'Que tu Iglesia se llene de júbilo, Señor, fortalecida con estos santos misterios, y se alegre en la Natividad de la Virgen María, que fue para todo el mundo aurora de esperanza y principio de salvación. Por Jesucristo, nuestro Señor. Amén.'
  },

  '09-12': {
    titulo_celebracion: 'El Dulce Nombre de la Bienaventurada Virgen María',
    tiempo_liturgico: 'Tiempo Ordinario',
    color: 'Blanco',
    grado: 'Memoria',
    antifona_entrada: 'Dichosa eres, Santa Virgen María, y digna de toda alabanza; de ti nació el Sol de justicia, Cristo nuestro Dios.',
    oracion_colecta: 'Concede, Dios todopoderoso, a cuantos celebramos el Nombre glorioso de la Santísima Virgen María, experimentar los beneficios de su maternal protección. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
    primera_lectura: {
      titulo: 'Primera Lectura',
      cita: 'Gálatas 4, 4-7',
      monicion: 'Al llegar la plenitud de los tiempos, Dios envió a su Hijo nacido de mujer para hacernos hijos suyos.',
      texto: `Hermanos: Cuando llegó la plenitud del tiempo, envió Dios a su Hijo, nacido de mujer, nacido bajo la ley, para rescatar a los que estaban bajo la ley, para que recibiéramos la adopción filial.

Y, como son hijos, Dios envió a nuestros corazones el Espíritu de su Hijo, que clama: «¡Abbá, Padre!». Así que ya no eres esclavo, sino hijo; y si eres hijo, eres también heredero por voluntad de Dios.

Palabra de Dios.`
    },
    salmo_responsorial: {
      cita: 'Lucas 1, 46-48. 49-50. 53-54',
      respuesta: 'R. El Poderoso ha hecho obras grandes por mí: su nombre es santo.',
      texto: `Proclama mi alma la grandeza del Señor,
se alegra mi espíritu en Dios, mi salvador;
porque ha mirado la humildad de su esclava.
Desde ahora me felicitarán todas las generaciones.

R. El Poderoso ha hecho obras grandes por mí: su nombre es santo.

Porque el Poderoso ha hecho obras grandes por mí:
su nombre es santo,
y su misericordia llega a sus fieles
de generación en generación.

R. El Poderoso ha hecho obras grandes por mí: su nombre es santo.

A los hambrientos los colma de bienes
y a los ricos los despide vacíos.
Auxilia a Israel, su siervo,
acordándose de la misericordia.

R. El Poderoso ha hecho obras grandes por mí: su nombre es santo.`
    },
    aclamacion_evangelio: {
      texto: `R. Aleluya, aleluya.
Dichosa tú, Virgen María, que creíste que se cumpliría lo que te fue dicho de parte del Señor.
R. Aleluya.`
    },
    evangelio: {
      titulo: 'Santo Evangelio',
      cita: 'Lucas 1, 39-56',
      monicion: 'María visita a su parienta Isabel y entona el himno del Magníficat proclamando las maravillas de Dios.',
      texto: `En aquellos días, María se levantó y se puso en camino de prisa hacia la montaña, a una ciudad de Judá; entró en casa de Zacarías y saludó a Isabel.

Aconteció que, en cuanto Isabel oyó el saludo de María, saltó la criatura en su vientre. Se llenó Isabel del Espíritu Santo y, levantando la voz, exclamó:
«¡Bendita tú entre las mujeres y bendito el fruto de tu vientre! ¿Quién soy yo para que me visite la madre de mi Señor? Pues, en cuanto tu saludo llegó a mis oídos, la criatura saltó de alegría en mi vientre. Bienaventurada la que ha creído, porque lo que le ha dicho el Señor se cumplirá».

María dijo:
«Proclama mi alma la grandeza del Señor,
se alegra mi espíritu en Dios, mi salvador;
porque ha mirado la humildad de su esclava.
Desde ahora me felicitarán todas las generaciones,
porque el Poderoso ha hecho obras grandes por mí:
su nombre es santo,
y su misericordia llega a sus fieles
de generación en generación.
Él hace proezas con su brazo:
dispersa a los soberbios de corazón,
derriba del trono a los poderosos
y enaltece a los humildes,
a los hambrientos los colma de bienes
y a los ricos los despide vacíos.
Auxilia a Israel, su siervo,
acordándose de la misericordia
—como lo había prometido a nuestros padres—
en favor de Abrahán y su descendencia por siempre».

María se quedó con Isabel unos tres meses y después volvió a su casa.

Palabra del Señor.`
    },
    oracion_ofrendas: 'Acepta, Señor, las ofrendas que te presentamos, y haz que la intercesión de la Santísima Virgen María nos libre de todo peligro y nos alcance la salvación eterna. Por Jesucristo, nuestro Señor. Amén.',
    antifona_comunion: 'Todas las generaciones me llamarán bienaventurada, porque el Señor ha hecho grandes cosas en mí (Lc 1, 48-49).',
    oracion_comunion: 'Alimentados con el Cuerpo y la Sangre de tu Hijo, concédenos, Señor, invocar siempre con devoción el nombre de María, para que experimentemos sin cesar el auxilio de su maternal intercesión. Por Jesucristo, nuestro Señor. Amén.'
  },

  '09-14': {
    titulo_celebracion: 'La Exaltación de la Santa Cruz',
    tiempo_liturgico: 'Tiempo Ordinario',
    color: 'Rojo',
    grado: 'Fiesta',
    antifona_entrada: 'Nosotros debemos gloriarnos en la cruz de nuestro Señor Jesucristo: en él está nuestra salvación, vida y resurrección; por él hemos sido salvados y redimidos (Gal 6, 14).',
    oracion_colecta: 'Señor Dios, que quisiste que tu Unigénito sufriera la cruz para salvar al género humano, concédenos que, habiendo conocido su misterio en la tierra, alcancemos los premios de su redención en el cielo. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
    primera_lectura: {
      titulo: 'Primera Lectura',
      cita: 'Números 21, 4b-9',
      monicion: 'Moisés alza la serpiente de bronce en el desierto para sanar a los que la miren con fe.',
      texto: `En aquellos días, el pueblo de Israel se impacientó por el camino y habló contra Dios y contra Moisés:
«¿Por qué nos han sacado de Egipto para morir en este desierto? No tenemos pan ni agua, y estamos hastiados de este manjar sin sustancia».

Entonces el Señor envió contra el pueblo serpientes abrasadoras, que mordían al pueblo; y murieron muchos israelitas.

El pueblo acudió a Moisés y le dijo:
«Hemos pecado al hablar contra el Señor y contra ti. Ruega al Señor que aparte de nosotros estas serpientes».

Y Moisés rezó por el pueblo. El Señor dijo a Moisés:
«Haz una serpiente de bronce y colócala sobre un mástil. El que haya sido mordido y la mire, vivirá».

Moisés hizo una serpiente de bronce y la colocó sobre un mástil; y cuando una serpiente mordía a uno, éste miraba a la serpiente de bronce y quedaba con vida.

Palabra de Dios.`
    },
    salmo_responsorial: {
      cita: 'Salmo 77, 1-2. 34-35. 36-37. 38',
      respuesta: 'R. No olviden las acciones del Señor.',
      texto: `Escucha, pueblo mío, mi enseñanza;
inclina tu oído a las palabras de mi boca.
Abriré mi boca a las parábolas,
evocaré los misterios del pasado.

R. No olviden las acciones del Señor.

Cuando los hacía morir, lo buscaban,
se convertían y madrugaban hacia Dios;
se acordaban de que Dios era su Roca,
el Dios Altísimo su Redentor.

R. No olviden las acciones del Señor.

Lo engañaban con sus bocas,
le mentían con su lengua;
su corazón no era fiel para con él,
ni eran constantes en su alianza.

R. No olviden las acciones del Señor.

Pero él, compasivo, perdonaba la culpa
y no los destruía;
muchas veces contuvo su cólera
y no despertó toda su ira.

R. No olviden las acciones del Señor.`
    },
    segunda_lectura: {
      titulo: 'Segunda Lectura',
      cita: 'Filipenses 2, 6-11',
      monicion: 'Cristo se humilló hasta la muerte de cruz; por eso Dios lo exaltó con el Nombre sobre todo nombre.',
      texto: `Cristo Jesús, siendo de condición divina, no retuvo ávidamente el ser igual a Dios, sino que se despojó de sí mismo tomando la condición de esclavo, hecho semejante a los hombres. Y así, reconocido como hombre por su presencia, se humilló a sí mismo, haciéndose obediente hasta la muerte, y una muerte de cruz.

Por eso Dios lo exaltó sobre todo y le concedió el Nombre que está sobre todo nombre; de modo que al nombre de Jesús toda rodilla se doble en el cielo, en la tierra y en el abismo, y toda lengua proclame: «¡Jesucristo es Señor!», para gloria de Dios Padre.

Palabra de Dios.`
    },
    aclamacion_evangelio: {
      texto: `R. Aleluya, aleluya.
Te adoramos, oh Cristo, y te bendecimos, porque con tu santa cruz redimiste al mundo.
R. Aleluya.`
    },
    evangelio: {
      titulo: 'Santo Evangelio',
      cita: 'Juan 3, 13-17',
      monicion: 'El Hijo del hombre tiene que ser elevado en la cruz para que todo el que crea en él tenga vida eterna.',
      texto: `En aquel tiempo, dijo Jesús a Nicodemo:
«Nadie ha subido al cielo sino el que bajó del cielo, el Hijo del hombre.

Y como Moisés elevó la serpiente en el desierto, así tiene que ser elevado el Hijo del hombre, para que todo el que cree en él tenga vida eterna.

Porque tanto amó Dios al mundo que entregó a su Unigénito, para que todo el que cree en él no perezca, sino que tenga vida eterna. Porque Dios no envió a su Hijo al mundo para juzgar al mundo, sino para que el mundo se salve por él».

Palabra del Señor.`
    },
    oracion_ofrendas: 'Que este sacrificio, Señor, que en el altar de la cruz borró los pecados del mundo entero, nos purifique de todas nuestras culpas. Por Jesucristo, nuestro Señor. Amén.',
    antifona_comunion: 'Cuando yo sea elevado sobre la tierra, atraeré a todos hacia mí, dice el Señor (Jn 12, 32).',
    oracion_comunion: 'Fortalecidos con este celestial banquete, te pedimos, Señor Jesucristo, que conduzcas a la gloria de la resurrección a quienes has redimido por el madero santísimo de la cruz vivificante. Tú que vives y reinas por los siglos de los siglos. Amén.'
  },

  '09-15': {
    titulo_celebracion: 'Nuestra Señora de los Dolores',
    tiempo_liturgico: 'Tiempo Ordinario',
    color: 'Blanco',
    grado: 'Memoria',
    antifona_entrada: 'Estaba de pie junto a la cruz de Jesús su Madre, la cual, traspasada por la espada del dolor, contemplaba el sacrificio de su Hijo.',
    oracion_colecta: 'Señor Dios, que quisiste que la Madre de tu Hijo estuviera de pie junto a la cruz, compartiendo sus dolores, concede a tu Iglesia que, asociada con María a la pasión de Cristo, merezca participar también de su resurrección. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
    primera_lectura: {
      titulo: 'Primera Lectura',
      cita: 'Hebreos 5, 7-9',
      monicion: 'Cristo aprendió sufriendo a obedecer y se ha convertido para todos en autor de salvación eterna.',
      texto: `Cristo, en los días de su vida mortal, a gritos y con lágrimas, presentó oraciones y súplicas al que podía salvarlo de la muerte, siendo escuchado por su piedad filial. Y, aun siendo Hijo, aprendió sufriendo a obedecer; y, llevado a la consumación, se ha convertido para todos los que le obedecen en autor de salvación eterna.

Palabra de Dios.`
    },
    salmo_responsorial: {
      cita: 'Salmo 30, 2-3a. 3b-4. 5-6. 15-16. 20',
      respuesta: 'R. Sálvame, Señor, por tu misericordia.',
      texto: `A ti, Señor, me acojo, no quede yo nunca defraudado;
tú, que eres justo, ponme a salvo,
inclina tu oído hacia mí, ven aprisa a librarme.

R. Sálvame, Señor, por tu misericordia.

Sé la roca de mi refugio, un baluarte donde me salve,
tú que eres mi roca y mi fortaleza;
por tu nombre dirígeme y guíame.

R. Sálvame, Señor, por tu misericordia.

Sácame de la red que me han tendido,
porque tú eres mi amparo.
A tus manos encomiendo mi espíritu:
tú, el Dios leal, me librarás.

R. Sálvame, Señor, por tu misericordia.

Pero yo confío en ti, Señor,
te digo: «Tú eres mi Dios».
En tus manos están mis azares,
líbrame de los enemigos que me persiguen.

R. Sálvame, Señor, por tu misericordia.`
    },
    aclamacion_evangelio: {
      texto: `R. Aleluya, aleluya.
Dichosa la Virgen María que, sin morir, mereció la palma del martirio junto a la cruz del Señor.
R. Aleluya.`
    },
    evangelio: {
      titulo: 'Santo Evangelio',
      cita: 'Juan 19, 25-27',
      monicion: 'Jesús desde la cruz entrega a su Madre como Madre del discípulo amado y de toda la Iglesia.',
      texto: `En aquel tiempo, junto a la cruz de Jesús estaban su madre, la hermana de su madre, María, la de Cleofás, y María, la Magdalena.

Jesús, al ver a su madre y junto a ella al discípulo que amaba, dijo a su madre:
«Mujer, ahí tienes a tu hijo».

Luego, dijo al discípulo:
«Ahí tienes a tu madre».

Y desde aquella hora, el discípulo la recibió en su casa.

Palabra del Señor.`
    },
    oracion_ofrendas: 'Dios misericordioso, acepta las oraciones y ofrendas que te presentamos en honor de la Santísima Virgen María, que al pie de la cruz se asoció al sacrificio de su Hijo. Por Jesucristo, nuestro Señor. Amén.',
    antifona_comunion: 'Alégrense en la medida en que participan de los sufrimientos de Cristo, para que también se llenen de gozo al revelarse su gloria (1 Pe 4, 13).',
    oracion_comunion: 'Alimentados con el sacramento de la redención eterna, te pedimos, Señor, que al conmemorar los dolores de la Santísima Virgen María, completemos en nosotros, en favor de la Iglesia, lo que falta a los padecimientos de Cristo. Por Jesucristo, nuestro Señor. Amén.'
  },

  '09-16': {
    titulo_celebracion: 'Santos Cornelio, papa, y Cipriano, obispo, mártires',
    tiempo_liturgico: 'Tiempo Ordinario',
    color: 'Rojo',
    grado: 'Memoria',
    antifona_entrada: 'Los santos mártires derramaron su sangre por Cristo en la tierra; por eso han obtenido el premio eterno.',
    oracion_colecta: 'Señor Dios, que diste a tu pueblo en los santos Cornelio y Cipriano unos pastores valerosos e insignes mártires, concédenos, por su intercesión, ser fortalecidos en la fe y en la constancia, para trabajar sin descanso por la unidad de la Iglesia. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
    primera_lectura: {
      titulo: 'Primera Lectura',
      cita: '2 Corintios 4, 7-15',
      monicion: 'Llevamos la muerte de Jesús en el cuerpo, para que también la vida de Jesús se manifieste en nosotros.',
      texto: `Hermanos: Llevamos este tesoro en vasijas de barro, para que se vea que una fuerza tan extraordinaria es de Dios y no proviene de nosotros.

Nos apremian por todos lados, pero no nos aplastan; estamos en apuros, pero no desesperados; acosados, pero no abandonados; derribados, pero no aniquilados. Siempre y en todo lugar llevamos en el cuerpo la muerte de Jesús, para que también la vida de Jesús se manifieste en nuestro cuerpo.

Pues nosotros, mientras vivimos, continuamente nos entregan a la muerte por causa de Jesús, para que también la vida de Jesús se manifieste en nuestra carne mortal. De modo que en nosotros actúa la muerte, y en ustedes la vida.

Teniendo el mismo espíritu de fe, según lo que está escrito: «Creí, por eso hablé», también nosotros creemos y por eso hablamos; sabiendo que quien resucitó al Señor Jesús también con Jesús nos resucitará a nosotros y nos colocará a su lado con ustedes. Pues todo esto es para su bien, a fin de que la gracia se multiplique y haga abundar la acción de gracias de muchos para gloria de Dios.

Palabra de Dios.`
    },
    salmo_responsorial: {
      cita: 'Salmo 125, 1-2ab. 2cd-3. 4-5. 6',
      respuesta: 'R. Los que sembraban con lágrimas cosechan entre cantares.',
      texto: `Cuando el Señor hizo volver a los cautivos de Sión,
nos parecía soñar:
la boca se nos llenaba de risas,
la lengua de cantares.

R. Los que sembraban con lágrimas cosechan entre cantares.

Hasta los gentiles decían:
«El Señor ha estado grande con ellos».
El Señor ha estado grande con nosotros,
y estamos alegres.

R. Los que sembraban con lágrimas cosechan entre cantares.

Recoge, Señor, a nuestros cautivos,
como los torrentes del Negueb.
Los que sembraban con lágrimas
cosechan entre cantares.

R. Los que sembraban con lágrimas cosechan entre cantares.

Al ir, iban llorando,
llevando la semilla;
al volver, vuelven cantando,
trayendo sus gavillas.

R. Los que sembraban con lágrimas cosechan entre cantares.`
    },
    aclamacion_evangelio: {
      texto: `R. Aleluya, aleluya.
Dichosos los perseguidos por causa de la justicia, porque de ellos es el reino de los cielos.
R. Aleluya.`
    },
    evangelio: {
      titulo: 'Santo Evangelio',
      cita: 'Juan 17, 11b-19',
      monicion: 'Jesús ora al Padre para que guarde a sus discípulos en la verdad y en la unidad fraterna.',
      texto: `En aquel tiempo, levantando los ojos al cielo, Jesús oró diciendo:
«Padre santo, guarda en tu nombre a los que me has dado, para que sean uno, así como nosotros. Cuando estaba con ellos, yo los guardaba en tu nombre; a los que me diste, yo los custodié y ninguno de ellos se perdió, sino el hijo de la perdición, para que la Escritura se cumpliese.

Pero ahora voy a ti, y digo esto en el mundo para que tengan en sí mismos mi alegría colmada. Yo les he dado tu palabra, y el mundo los ha odiado porque no son del mundo, como tampoco yo soy del mundo.

No ruego que los retires del mundo, sino que los guardes del mal. No son del mundo, como tampoco yo soy del mundo.

Santifícalos en la verdad: tu palabra es verdad. Como tú me enviaste al mundo, así yo los he enviado al mundo. Y por ellos yo me santifico a mí mismo, para que también ellos sean santificados en la verdad».

Palabra del Señor.`
    },
    oracion_ofrendas: 'Acepta, Señor, los dones que te presentamos en la conmemoración de tus santos mártires Cornelio y Cipriano, y concédenos que este sacrificio nos alcance fortaleza y paz. Por Jesucristo, nuestro Señor. Amén.',
    antifona_comunion: 'No hay amor más grande que dar la vida por los amigos, dice el Señor (Jn 15, 13).',
    oracion_comunion: 'Saciados con este sacramento celestial, te pedimos, Señor, que el ejemplo admirable y la intercesión de los santos mártires Cornelio y Cipriano nos impulsen a dar testimonio valiente de la verdad del Evangelio. Por Jesucristo, nuestro Señor. Amén.'
  },

  '09-21': {
    titulo_celebracion: 'San Mateo, apóstol y evangelista',
    tiempo_liturgico: 'Tiempo Ordinario',
    color: 'Rojo',
    grado: 'Fiesta',
    antifona_entrada: 'Vayan y hagan discípulos a todos los pueblos, bautizándolos y enseñándoles a guardar todo lo que les he mandado, dice el Señor (Mt 28, 19-20).',
    oracion_colecta: 'Señor Dios, que en tu inefable misericordia te dignaste elegir a san Mateo para convertirlo de publicano en apóstol, concédenos que, fortalecidos con su ejemplo y su intercesión, te sigamos fielmente y permanezcamos siempre unidos a ti. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
    primera_lectura: {
      titulo: 'Primera Lectura',
      cita: 'Efesios 4, 1-7. 11-13',
      monicion: 'San Pablo nos exhorta a vivir conforme a la vocación recibida, construyendo el Cuerpo de Cristo en la unidad de la fe.',
      texto: `Hermanos: Yo, el prisionero por el Señor, les ruego que anden como es digno de la vocación a la que han sido llamados: con toda humildad y mansedumbre, con paciencia, sobrellevándose mutuamente con amor, esforzándose por mantener la unidad del Espíritu con el vínculo de la paz.

Un solo cuerpo y un solo Espíritu, como una sola es la esperanza de la vocación a la que han sido llamados. Un Señor, una fe, un bautismo. Un Dios y Padre de todos, que está sobre todos, actúa por medio de todos y está en todos.

A cada uno de nosotros se le ha dado la gracia según la medida del don de Cristo.

Y él ha constituido a unos apóstoles, a otros profetas, a otros evangelistas, a otros pastores y doctores, para la perfección de los santos, para la obra del ministerio, para la edificación del cuerpo de Cristo; hasta que lleguemos todos a la unidad de la fe y del conocimiento del Hijo de Dios, al hombre perfecto, a la medida de la talla de la plenitud de Cristo.

Palabra de Dios.`
    },
    salmo_responsorial: {
      cita: 'Salmo 18, 2-3. 4-5',
      respuesta: 'R. A toda la tierra alcanza su pregón.',
      texto: `El cielo proclama la gloria de Dios,
el firmamento pregona la obra de sus manos:
el día al día le pasa el mensaje,
la noche a la noche se lo susurra.

R. A toda la tierra alcanza su pregón.

Sin que hablen, sin que pronuncien,
sin que resuene su voz,
a toda la tierra alcanza su pregón,
y hasta los límites del orbe su lenguaje.

R. A toda la tierra alcanza su pregón.`
    },
    aclamacion_evangelio: {
      texto: `R. Aleluya, aleluya.
A ti, oh Dios, te alabamos, a ti, Señor, te reconocemos; el coro glorioso de los apóstoles te alaba.
R. Aleluya.`
    },
    evangelio: {
      titulo: 'Santo Evangelio',
      cita: 'Mateo 9, 9-13',
      monicion: 'Jesús llama a Mateo el publicano para ser su discípulo y recuerda que ha venido a llamar a los pecadores.',
      texto: `En aquel tiempo, vio Jesús al pasar a un hombre llamado Mateo, sentado al mostrador de los impuestos, y le dijo:
«Sígueme».

Él se levantó y lo siguió.

Y estando en la casa, sentado a la mesa, muchos publicanos y pecadores que habían acudido se sentaban a la mesa con Jesús y sus discípulos.

Los fariseos, al ver esto, decían a los discípulos:
«¿Cómo es que su Maestro come con publicanos y pecadores?».

Jesús lo oyó y dijo:
«No tienen necesidad de médico los sanos, sino los enfermos. Vayan, pues, y aprendan qué significa: "Misericordia quiero y no sacrificios"; porque no he venido a llamar a justos, sino a pecadores».

Palabra del Señor.`
    },
    oracion_ofrendas: 'Al celebrar la memoria dichosa de san Mateo, te presentamos, Señor, nuestras súplicas y ofrendas, y te rogamos mires con bondad a tu Iglesia, cuya fe nutriste con la predicación apostólica. Por Jesucristo, nuestro Señor. Amén.',
    antifona_comunion: 'No he venido a llamar a justos, sino a pecadores, dice el Señor (Mt 9, 13).',
    oracion_comunion: 'Alimentados con el gozo de la salvación que san Mateo anunció en su Evangelio, te pedimos, Señor, que este sacrificio eucarístico fortalezca nuestra vida cristiana. Por Jesucristo, nuestro Señor. Amén.'
  },

  '09-23': {
    titulo_celebracion: 'San Pío de Pietrelcina, presbítero',
    tiempo_liturgico: 'Tiempo Ordinario',
    color: 'Blanco',
    grado: 'Memoria',
    antifona_entrada: 'Los sacerdotes del Señor se visten de santidad y los fieles prorrumpen en aclamaciones (Sal 131, 9).',
    oracion_colecta: 'Dios todopoderoso y eterno, que por una gracia singular concediste a san Pío, presbítero, participar de la cruz de tu Hijo y renovar por su ministerio las maravillas de tu misericordia, concédenos, por su intercesión, unirnos fielmente a los padecimientos de Cristo para alcanzar la gloria de la resurrección. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
    primera_lectura: {
      titulo: 'Primera Lectura',
      cita: 'Gálatas 6, 14-18',
      monicion: 'San Pablo se gloría únicamente en la cruz de nuestro Señor Jesucristo, llevando en su cuerpo las marcas de Jesús.',
      texto: `Hermanos: Dios me libre de gloriarme si no es en la cruz de nuestro Señor Jesucristo, por quien el mundo está crucificado para mí, y yo para el mundo.

Pues lo que cuenta no es la circuncisión ni la incircuncisión, sino la nueva criatura. Y a todos los que sigan esta norma, paz y misericordia para ellos y para el Israel de Dios.

En adelante, que nadie me cause molestias, pues yo llevo en mi cuerpo las marcas de Jesús.

La gracia de nuestro Señor Jesucristo esté con su espíritu, hermanos. Amén.

Palabra de Dios.`
    },
    salmo_responsorial: {
      cita: 'Salmo 15, 1-2a y 5. 7-8. 11',
      respuesta: 'R. Tú eres, Señor, el lote de mi heredad.',
      texto: `Protégeme, Dios mío, que me refugio en ti.
Yo digo al Señor: «Tú eres mi Dios».
El Señor es el lote de mi heredad y mi copa,
mi suerte está en tus manos.

R. Tú eres, Señor, el lote de mi heredad.

Bendeciré al Señor, que me aconseja,
hasta de noche me instruye internamente.
Tengo siempre presente al Señor,
con él a mi derecha no vacilaré.

R. Tú eres, Señor, el lote de mi heredad.

Me enseñarás el sendero de la vida,
plenitud de gozo en tu presencia,
delicias a tu derecha siempre.

R. Tú eres, Señor, el lote de mi heredad.`
    },
    aclamacion_evangelio: {
      texto: `R. Aleluya, aleluya.
Vengan a mí todos los que están cansados y agobiados, y yo los aliviaré, dice el Señor.
R. Aleluya.`
    },
    evangelio: {
      titulo: 'Santo Evangelio',
      cita: 'Mateo 11, 25-30',
      monicion: 'Jesús bendice al Padre porque ha revelado los misterios del Reino a los sencillos y humildes.',
      texto: `En aquel tiempo, tomó Jesús la palabra y dijo:
«Te doy gracias, Padre, Señor del cielo y de la tierra, porque has escondido estas cosas a los sabios y entendidos, y las has revelado a los pequeños. Sí, Padre, así te ha parecido bien.

Todo me ha sido entregado por mi Padre, y nadie conoce al Hijo sino el Padre, y nadie conoce al Padre sino el Hijo y aquel a quien el Hijo se lo quiera revelar.

Vengan a mí todos los que están cansados y agobiados, y yo los aliviaré. Tomen mi yugo sobre ustedes y aprendan de mí, que soy manso y humilde de corazón, y encontrarán descanso para sus almas. Porque mi yugo es llevadero y mi carga ligera».

Palabra del Señor.`
    },
    oracion_ofrendas: 'Acepta, Señor, los dones que te presentamos en la fiesta de san Pío de Pietrelcina, y concédenos que, libres de las ataduras del pecado, te ofrezcamos un corazón puro y consagrado a tu servicio. Por Jesucristo, nuestro Señor. Amén.',
    antifona_comunion: 'El que quiera venir en pos de mí, niéguese a sí mismo, tome su cruz y sígame, dice el Señor (Mt 16, 24).',
    oracion_comunion: 'Que esta mesa celestial, Señor, renueve nuestras fuerzas espirituales, para que, siguiendo el ejemplo de san Pío, permanezcamos fieles a la cruz y seamos testigos de tu infinita misericordia. Por Jesucristo, nuestro Señor. Amén.'
  },

  '09-27': {
    titulo_celebracion: 'San Vicente de Paúl, presbítero',
    tiempo_liturgico: 'Tiempo Ordinario',
    color: 'Blanco',
    grado: 'Memoria',
    antifona_entrada: 'El Espíritu del Señor está sobre mí; me ha enviado a evangelizar a los pobres y a sanar a los de corazón quebrantado (Lc 4, 18).',
    oracion_colecta: 'Señor Dios, que para el socorro de los pobres y la formación del clero dotaste a san Vicente de Paúl, presbítero, de virtudes apostólicas, concédenos que, inflamados por el mismo celo pastoral, amemos lo que él amó y practiquemos lo que él enseñó. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
    primera_lectura: {
      titulo: 'Primera Lectura',
      cita: '1 Corintios 1, 26-31',
      monicion: 'Dios eligió a los débiles del mundo para confundir a los fuertes, para que nadie se vanaglorie fuera del Señor.',
      texto: `Fíjense en su asamblea, hermanos: no hay entre ustedes muchos sabios según la carne, ni muchos poderosos, ni muchos nobles.

Al contrario, lo necio del mundo lo ha escogido Dios para humillar a los sabios; y lo débil del mundo lo ha escogido Dios para humillar a lo fuerte. Lo vil del mundo y lo despreciable lo ha escogido Dios; lo que no es, para anular a lo que es; de modo que nadie pueda gloriarse en la presencia de Dios.

De él les viene que ustedes estén en Cristo Jesús, el cual se ha hecho para nosotros sabiduría de Dios, justicia, santificación y redención; de modo que, como está escrito: «El que se gloríe, que se gloríe en el Señor».

Palabra de Dios.`
    },
    salmo_responsorial: {
      cita: 'Salmo 111, 1-2. 3-4. 5-7a. 7b-8. 9',
      respuesta: 'R. Dichoso el que se apiada y presta.',
      texto: `Dichoso quien teme al Señor
y ama de corazón sus mandatos.
Su linaje será poderoso en la tierra,
la descendencia del justo será bendita.

R. Dichoso el que se apiada y presta.

En su casa habrá riquezas y abundancia,
su caridad dura por siempre.
En las tinieblas brilla como una luz el que es justo,
clemente y compasivo.

R. Dichoso el que se apiada y presta.

Dichoso el que se apiada y presta,
y administra rectamente sus asuntos.
El justo jamás vacilará,
su recuerdo será perpetuo.

R. Dichoso el que se apiada y presta.

Reparte limosna a los pobres;
su caridad es constante, sin falta,
y alzará la frente con dignidad.

R. Dichoso el que se apiada y presta.`
    },
    aclamacion_evangelio: {
      texto: `R. Aleluya, aleluya.
El Señor me ha enviado para dar la Buena Noticia a los pobres, para anunciar a los cautivos la libertad.
R. Aleluya.`
    },
    evangelio: {
      titulo: 'Santo Evangelio',
      cita: 'Mateo 9, 35-38',
      monicion: 'Jesús se compadece de las multitudes desamparadas y pide rogar al dueño de la mies que envíe obreros.',
      texto: `En aquel tiempo, Jesús recorría todas las ciudades y aldeas, enseñando en sus sinagogas, proclamando el evangelio del reino y curando toda enfermedad y toda dolencia.

Al ver a las muchedumbres, se compadeció de ellas, porque estaban extenuadas y abandonadas, «como ovejas que no tienen pastor».

Entonces dice a sus discípulos:
«La mies es abundante, pero los trabajadores son pocos; rueguen, pues, al Señor de la mies que mande trabajadores a su mies».

Palabra del Señor.`
    },
    oracion_ofrendas: 'Señor Dios, que diste a san Vicente de Paúl la gracia de imitar los santos misterios que celebraba, concédenos, por la eficacia de este sacrificio, transformarnos en una ofrenda agradable a ti. Por Jesucristo, nuestro Señor. Amén.',
    antifona_comunion: 'Den gracias al Señor por su misericordia, por las maravillas que hace con los hijos de los hombres; porque sacia al sediento y colma de bienes al hambriento (Sal 106, 8-9).',
    oracion_comunion: 'Renovados con estos sacramentos celestiales, te suplicamos humildemente, Señor, que, a ejemplo de san Vicente y sostenidos por su intercesión, nos consagremos con celo al servicio de los pobres y a la propagación de tu Evangelio. Por Jesucristo, nuestro Señor. Amén.'
  },

  '09-29': {
    titulo_celebracion: 'Los Santos Arcángeles Miguel, Gabriel y Rafael',
    tiempo_liturgico: 'Tiempo Ordinario',
    color: 'Blanco',
    grado: 'Fiesta',
    antifona_entrada: 'Bendigan al Señor todos sus ángeles, poderosos ejecutores de sus órdenes, prontos a la voz de su palabra (Sal 102, 20).',
    oracion_colecta: 'Señor Dios, que con admirable providencia distribuyes las funciones de los ángeles y de los hombres, concede bondadoso que nuestra vida terrena sea protegida por aquellos que te asisten continuamente en el cielo. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
    primera_lectura: {
      titulo: 'Primera Lectura',
      cita: 'Daniel 7, 9-10. 13-14',
      monicion: 'Visión profética del trono celestial y de la multitud innumerable de ángeles que sirven a Dios.',
      texto: `Durante la visión vi que colocaban unos tronos y un Anciano se sentó. Su vestido era blanco como la nieve, su cabellera como lana limpia; su trono, llamas de fuego; sus ruedas, llamaradas. Un río impetuoso de fuego brotaba y corría ante él. Miles y miles le servían, millones estaban de pie en su presencia. Comenzó la sesión y se abrieron los libros.

Seguí mirando y, en las visiones nocturnas, vi venir en las nubes del cielo a uno como un hijo de hombre; llegó hasta el Anciano y lo presentaron ante él. Le dieron poder, gloria y reino, y todos los pueblos, naciones y lenguas le servían. Su poder es un poder eterno, que no pasará, y su reino no será destruido.

Palabra de Dios.`
    },
    salmo_responsorial: {
      cita: 'Salmo 137, 1-2a. 2bc-3. 4-5',
      respuesta: 'R. Delante de los ángeles tocaré para ti, Señor.',
      texto: `Te doy gracias, Señor, de todo corazón,
delante de los ángeles tocaré para ti;
me postraré hacia tu santuario,
daré gracias a tu nombre por tu misericordia y tu lealtad.

R. Delante de los ángeles tocaré para ti, Señor.

Cuando te invoqué, me escuchaste,
acreciste el valor en mi alma.
Que te den gracias, Señor, los reyes de la tierra,
al escuchar las palabras de tu boca.

R. Delante de los ángeles tocaré para ti, Señor.

Canten los caminos del Señor,
porque la gloria del Señor es grande.
El Señor es sublime, se fija en el humilde,
y de lejos conoce al soberbio.

R. Delante de los ángeles tocaré para ti, Señor.`
    },
    aclamacion_evangelio: {
      texto: `R. Aleluya, aleluya.
Bendigan al Señor todos sus ejércitos, servidores suyos que cumplen su voluntad.
R. Aleluya.`
    },
    evangelio: {
      titulo: 'Santo Evangelio',
      cita: 'Juan 1, 47-51',
      monicion: 'Jesús promete a Natanael que verá abrirse el cielo y a los ángeles de Dios subir y bajar sobre el Hijo del hombre.',
      texto: `En aquel tiempo, vio Jesús que se acercaba Natanael y dijo de él:
«Ahí tienen a un israelita de verdad, en quien no hay engaño».

Natanael le contesta:
«¿De qué me conoces?».

Jesús le respondió:
«Antes de que Felipe te llamara, cuando estabas debajo de la higuera, te vi».

Natanael respondió:
«Rabbí, tú eres el Hijo de Dios, tú eres el Rey de Israel».

Jesús le contestó:
«¿Por haberte dicho que te vi debajo de la higuera, crees? Has de ver cosas mayores».

Y le añadió:
«En verdad, en verdad les digo: verán el cielo abierto y a los ángeles de Dios subir y bajar sobre el Hijo del hombre».

Palabra del Señor.`
    },
    oracion_ofrendas: 'Te ofrecemos, Señor, este sacrificio de alabanza, suplicándote humildemente que sea llevado a tu presencia divina por manos de los santos ángeles y nos alcance tu bendición y salvación. Por Jesucristo, nuestro Señor. Amén.',
    antifona_comunion: 'Te daré gracias, Señor, de todo corazón; delante de los ángeles cantaré para ti (Sal 137, 1).',
    oracion_comunion: 'Fortalecidos con el pan celestial, te pedimos, Señor, que, caminando bajo la fiel custodia de tus santos ángeles, avancemos con valentía por el camino de la salvación. Por Jesucristo, nuestro Señor. Amén.'
  },

  '09-30': {
    titulo_celebracion: 'San Jerónimo, presbítero y doctor de la Iglesia',
    tiempo_liturgico: 'Tiempo Ordinario',
    color: 'Blanco',
    grado: 'Memoria',
    antifona_entrada: 'Dichoso el hombre que medita la ley del Señor día y noche; dará fruto a su tiempo (Sal 1, 2-3).',
    oracion_colecta: 'Señor Dios, que diste a san Jerónimo, presbítero, un amor entrañable y vivo a la Sagrada Escritura, concede a tu pueblo alimentarse de tu palabra con mayor abundancia y encontrar en ella la fuente de la verdadera vida. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.',
    primera_lectura: {
      titulo: 'Primera Lectura',
      cita: '2 Timoteo 3, 14 – 4, 2',
      monicion: 'San Pablo exhorta a Timoteo a permanecer firme en la Sagrada Escritura inspirada por Dios.',
      texto: `Querido hermano: Tú permanece en lo que has aprendido y se te ha confiado, sabiendo de quiénes lo aprendiste y que desde la infancia conoces las Sagradas Letras, que pueden darte la sabiduría que conduce a la salvación mediante la fe en Cristo Jesús.

Toda la Escritura es inspirada por Dios y útil para enseñar, para reprender, para corregir, para educar en la justicia, a fin de que el hombre de Dios sea perfecto, equipado para toda obra buena.

Te conjuro delante de Dios y de Cristo Jesús, que ha de juzgar a vivos y muertos, por su manifestación y por su reino: proclama la palabra, insiste a tiempo y a destiempo, reprende, reprocha, exhorta con toda paciencia y doctrina.

Palabra de Dios.`
    },
    salmo_responsorial: {
      cita: 'Salmo 118, 9. 10. 11. 12. 13. 14',
      respuesta: 'R. Enséñame, Señor, tus decretos.',
      texto: `¿Cómo purificará el joven su conducta?
Cumpliendo tus palabras.
Te busco de todo corazón,
no me desvíes de tus mandatos.

R. Enséñame, Señor, tus decretos.

En mi corazón escondo tus consignas,
para no pecar contra ti.
Bendito eres, Señor,
enséñame tus leyes.

R. Enséñame, Señor, tus decretos.

Mis labios van enumerando
todos los mandamientos de tu boca.
Mi alegría es el camino de tus preceptos,
más que todas las riquezas.

R. Enséñame, Señor, tus decretos.`
    },
    aclamacion_evangelio: {
      texto: `R. Aleluya, aleluya.
Ábrenos, Señor, el corazón para que aceptemos las palabras de tu Hijo.
R. Aleluya.`
    },
    evangelio: {
      titulo: 'Santo Evangelio',
      cita: 'Mateo 13, 47-52',
      monicion: 'El discípulo del Reino de Dios saca de su tesoro lo nuevo y lo antiguo de la Sagrada Escritura.',
      texto: `En aquel tiempo, dijo Jesús a la multitud:
«El reino de los cielos se parece también a la red que echan en el mar y recoge toda clase de peces: cuando está llena, la arrastran a la orilla, se sientan y reúnen los buenos en cestas y los malos los tiran.

Así será al final del mundo: saldrán los ángeles, separarán a los malos de los buenos y los echarán al horno de fuego. Allí será el llanto y el crujido de dientes.

¿Han entendido todo esto?».

Ellos le responden:
«Sí».

Él les dijo:
«Pues bien, un escriba que se ha hecho discípulo del reino de los cielos es como un padre de familia que va sacando de su tesoro lo nuevo y lo antiguo».

Palabra del Señor.`
    },
    oracion_ofrendas: 'Concédenos, Señor, que, al meditar en tu palabra a ejemplo de san Jerónimo, nos preparemos con mayor devoción para ofrecerte el sacrificio de la salvación. Por Jesucristo, nuestro Señor. Amén.',
    antifona_comunion: 'Señor, cuando encontraba tus palabras, las devoraba; tus palabras eran mi gozo y la alegría de mi corazón (Jer 15, 16).',
    oracion_comunion: 'Alimentados con el manjar celestial, te pedimos, Señor, que, siguiendo las enseñanzas de san Jerónimo, escuchemos con gozo tu santa palabra y la pongamos por obra en nuestra vida diaria. Por Jesucristo, nuestro Señor. Amén.'
  }
};
