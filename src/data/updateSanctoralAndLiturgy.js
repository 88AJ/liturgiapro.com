import fs from 'fs';

// Read existing liturgicalLectionary.ts
let lectionaryContent = fs.readFileSync('/Users/fr.alansanchez/Antigravity/Liturgia-PRO/src/data/liturgicalLectionary.ts', 'utf-8');

const newSanctoralEntries = `
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
      texto: \`Hermanos: Por lo que se refiere a la venida de nuestro Señor Jesucristo y a nuestra reunión con él, les rogamos que no pierdan fácilmente la cabeza ni se alarmen por revelaciones, declaraciones o cartas atribuidas a nosotros, como si el día del Señor fuera ya inminente. Que nadie los engañe de ninguna manera.

Dios los llamó por medio de nuestro Evangelio para que alcancen la gloria de nuestro Señor Jesucristo. Así pues, hermanos, manténganse firmes y conserven las tradiciones que han aprendido de nosotros, sea de palabra, sea por carta.

Que el mismo Señor nuestro Jesucristo y Dios nuestro Padre, que nos ha amado y nos ha dado un consuelo eterno y una esperanza dichosa por su gracia, consuele sus corazones y los afiance en toda obra y palabra buena.

Palabra de Dios.\`
    },
    salmo_responsorial: {
      cita: 'Salmo 95',
      respuesta: 'R. El Señor llega a regir la tierra.',
      texto: \`Digan a los pueblos: «El Señor es rey, él afianzó el orbe y no se moverá; él gobierna a los pueblos rectamente».

R. El Señor llega a regir la tierra.

Alégrese el cielo, goce la tierra, retumbe el mar y cuanto lo llena; gocen los campos y cuanto en ellos hay, aclamen los árboles del bosque.

R. El Señor llega a regir la tierra.\`
    },
    aclamacion_evangelio: {
      texto: 'R. Aleluya, aleluya.\\nLa palabra de Dios es viva y eficaz; discierne los pensamientos y las intenciones del corazón.\\nR. Aleluya.'
    },
    evangelio: {
      titulo: 'Santo Evangelio',
      cita: 'Mateo 23, 23-26',
      monicion: 'Jesús nos enseña que el culto a Dios debe acompañarse de la justicia, la misericordia y la fe sincera.',
      texto: \`En aquel tiempo, Jesús habló diciendo:
«¡Ay de ustedes, escribas y fariseos hipócritas, que pagan el diezmo de la menta, del anís y del comino, y descuidan lo más importante de la Ley: la justicia, la misericordia y la fidelidad! Esto es lo que había que practicar, aunque sin descuidar aquello. ¡Guías ciegos, que cuelan el mosquito y se tragan el camello!

¡Ay de ustedes, escribas y fariseos hipócritas, que limpian por fuera la copa y el plato, mientras por dentro están llenos de robo y desenfreno! Fariseo ciego: limpia primero por dentro la copa y el plato, para que también por fuera queden limpios».

Palabra del Señor.\`
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
      texto: \`Pablo, llamado a ser apóstol de Jesucristo por voluntad de Dios, y Sóstenes, el hermano, a la Iglesia de Dios que está en Corinto, a los santificados en Cristo Jesús, llamados a ser santos, con todos los que en cualquier lugar invocan el nombre de nuestro Señor Jesucristo, Señor de ellos y nuestro: gracia y paz a ustedes de parte de Dios nuestro Padre y del Señor Jesucristo.

Doy continuas gracias a mi Dios por ustedes, por la gracia de Dios que les ha sido dada en Cristo Jesús; pues en él han sido enriquecidos en todo, en toda palabra y en todo conocimiento, conforme se ha consolidado entre ustedes el testimonio de Cristo, de modo que no carecen de ningún don de gracia a los que esperan la manifestación de nuestro Señor Jesucristo.

Él los mantendrá firmes hasta el final, para que resulten irreprochables en el día de nuestro Señor Jesucristo. Fiel es Dios, por quien fueron llamados a la comunión con su Hijo Jesucristo, Señor nuestro.

Palabra de Dios.\`
    },
    salmo_responsorial: {
      cita: 'Salmo 144',
      respuesta: 'R. Alabaré tu nombre para siempre, Señor.',
      texto: \`Día tras día te bendeciré
y alabaré tu nombre por siempre jamás.
Grande es el Señor y muy digno de alabanza,
su grandeza es insondable.

R. Alabaré tu nombre para siempre, Señor.

Una generación pondera tus obras a la otra,
y le cuenta tus hazañas.
Alaban ellos la gloria de tu majestad,
y yo proclamo tus maravillas.

R. Alabaré tu nombre para siempre, Señor.\`
    },
    aclamacion_evangelio: {
      texto: 'R. Aleluya, aleluya.\\nEstén en vela, porque no saben a qué hora vendrá el Hijo del hombre.\\nR. Aleluya.'
    },
    evangelio: {
      titulo: 'Santo Evangelio',
      cita: 'Mateo 24, 42-51 (o Lucas 7, 11-17)',
      monicion: 'Jesús nos exhorta a la vigilancia activa, sirviendo con fidelidad y constancia.',
      texto: \`En aquel tiempo, dijo Jesús a sus discípulos:
«Estén en vela, porque no saben qué día vendrá su Señor. Comprendan que si el dueño de casa supiera a qué hora de la noche viene el ladrón, estaría en vela y no dejaría abrir una brecha en su casa. Por eso, estén también ustedes preparados, porque a la hora que menos piensen viene el Hijo del hombre.

¿Dónde hay un siervo fiel y prudente, a quien el señor puso al frente de su servidumbre para darles la comida a su tiempo? ¡Dichoso el siervo a quien su señor, al llegar, lo encuentre haciéndolo así! En verdad les digo que lo pondrá al frente de todos sus bienes.

Pero si el siervo malvado dice para sus adentros: "Mi señor tarda en llegar", y empieza a pegar a sus compañeros, y come y bebe con los borrachos, vendrá el señor de ese siervo el día que no espera y a la hora que no sabe, y lo castigará con rigor y le asignará su lugar con los hipócritas. Allí será el llanto y el crujir de dientes».

Palabra del Señor.\`
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
      texto: \`Queridos hermanos: Amémonos unos a otros, ya que el amor es de Dios, y todo el que ama ha nacido de Dios y conoce a Dios. Quien no ama no ha conocido a Dios, porque Dios es amor.

En esto se manifestó el amor que Dios nos tiene: en que Dios envió al mundo a su Unigénito, para que vivamos por medio de él. En esto consiste el amor: no en que nosotros hayamos amado a Dios, sino en que él nos amó y nos envió a su Hijo como víctima de expiación por nuestros pecados.

Queridos hermanos, si Dios nos amó de esta manera, también nosotros debemos amarnos unos a otros. A Dios nadie lo ha visto nunca. Si nos amamos unos a otros, Dios permanece en nosotros y su amor ha llegado en nosotros a su plenitud.

Palabra de Dios.\`
    },
    salmo_responsorial: {
      cita: 'Salmo 118',
      respuesta: 'R. Enséñame, Señor, tus decretos.',
      texto: \`Dichoso el que con vida intachable
camina en la ley del Señor;
dichoso el que guardando sus preceptos
lo busca de todo corazón.

R. Enséñame, Señor, tus decretos.

Tú promulgas tus decretos
para que se observen exactamente.
Ojalá esté firme mi conducta
en cumplir tus leyes.

R. Enséñame, Señor, tus decretos.\`
    },
    aclamacion_evangelio: {
      texto: 'R. Aleluya, aleluya.\\nUno solo es su Maestro, el Cristo, dice el Señor.\\nR. Aleluya.'
    },
    evangelio: {
      titulo: 'Santo Evangelio',
      cita: 'Mateo 23, 8-12 (o Mateo 25, 1-13)',
      monicion: 'Jesús nos enseña el valor de la humildad sincera y el servicio fraterno.',
      texto: \`En aquel tiempo, dijo Jesús a la multitud y a sus discípulos:
«Ustedes no se hagan llamar "rabbí", porque uno solo es su Maestro, y todos ustedes son hermanos. Y no llamen padre suyo a nadie en la tierra, porque uno solo es su Padre, el del cielo. Ni se dejen llamar maestros, porque uno solo es su Maestro, el Cristo.

El mayor entre ustedes será su servidor. El que se enaltece será humillado, y el que se humilla será enaltecido».

Palabra del Señor.\`
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
      texto: \`En aquellos días, recibí esta palabra del Señor:
«Tú cíñete la cintura, ponte en pie y diles todo lo que yo te mande. No les tengas miedo, que si no, yo te haré temblar ante ellos.

Mira, yo te convierto hoy en plaza fuerte, en columna de hierro, en muralla de bronce frente a todo el país: frente a los reyes de Judá y a sus príncipes, a sus sacerdotes y al pueblo de la tierra.

Lucharán contra ti, pero no te vencerán, porque yo estoy contigo para librarte —oráculo del Señor—».

Palabra de Dios.\`
    },
    salmo_responsorial: {
      cita: 'Salmo 70',
      respuesta: 'R. Mi boca contará tu salvación, Señor.',
      texto: \`A ti, Señor, me acojo,
no quede yo derrotado para siempre;
tú que eres justo, líbrame y ponme a salvo,
inclina tu oído y sálvame.

R. Mi boca contará tu salvación, Señor.

Sé tú mi roca de refugio,
el alcázar donde me salve,
porque mi peña y mi alcázar eres tú.
Dios mío, líbrame de la mano del perverso.

R. Mi boca contará tu salvación, Señor.\`
    },
    aclamacion_evangelio: {
      texto: 'R. Aleluya, aleluya.\\nDichosos los perseguidos por causa de la justicia, porque de ellos es el reino de los cielos.\\nR. Aleluya.'
    },
    evangelio: {
      titulo: 'Santo Evangelio',
      cita: 'Marcos 6, 17-29',
      monicion: 'Juan el Bautista entrega su vida como mártir intrépido de la verdad y la justicia de Dios.',
      texto: \`En aquel tiempo, Herodes había mandado prender a Juan y lo había metido en la cárcel, encadenado, por causa de Herodías, mujer de su hermano Filipo, con quien se había casado. Porque Juan le decía a Herodes: «No te está permitido tener la mujer de tu hermano».

Herodías lo aborrecía y quería matarlo, pero no podía, porque Herodes respetaba a Juan, sabiendo que era un hombre justo y santo, y lo protegía; al oírlo, quedaba muy perplejo, pero lo escuchaba con gusto.

Llegó un día oportuno, cuando Herodes, por su cumpleaños, dio un banquete a sus magnates, a sus tribunos y a los principales de Galilea. La hija de Herodías entró y danzó, gustando mucho a Herodes y a los convidados. El rey le dijo a la joven: «Pídeme lo que quieras y te lo daré»...

Ella salió y dijo a su madre: «¿Qué pido?». La madre le contestó: «La cabeza de Juan el Bautista». Entró enseguida, a toda prisa, donde estaba el rey, y le pidió diciendo: «Quiero que ahora mismo me des en una bandeja la cabeza de Juan el Bautista». El rey se llenó de tristeza; pero por el juramento y los convidados, no quiso desairarla.

Enseguida mandó a un verdugo que trajese la cabeza de Juan. Éste fue, lo decapitó en la cárcel, trajo la cabeza en una bandeja y se la dio a la joven, y la joven se la dio a su madre. Al enterarse sus discípulos, fueron a recoger el cadáver y lo pusieron en un sepulcro.

Palabra del Señor.\`
    },
    oracion_ofrendas: 'Por estos dones que te presentamos, Señor, concédenos caminar por las sendas de la verdad que san Juan Bautista proclamó con su palabra y selló con su martirio. Por Jesucristo, nuestro Señor.',
    antifona_comunion: 'Juan decía: «Es necesario que él crezca y que yo disminuya».',
    oracion_comunion: 'Al celebrar el martirio de san Juan Bautista, te pedimos, Señor, que el sacramento celestial que hemos recibido confirme en nosotros el amor a tu santa Ley. Por Jesucristo, nuestro Señor.'
  },
`;

// Insert before the closing `};` of SANTORAL_FIJO
const lastBraceIndex = lectionaryContent.lastIndexOf('};');
if (lastBraceIndex !== -1) {
  lectionaryContent = lectionaryContent.slice(0, lastBraceIndex) + newSanctoralEntries + '\n};\n';
  fs.writeFileSync('/Users/fr.alansanchez/Antigravity/Liturgia-PRO/src/data/liturgicalLectionary.ts', lectionaryContent);
  console.log('Successfully updated liturgicalLectionary.ts with August Sanctoral!');
}
