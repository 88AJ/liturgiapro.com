import { Cantico, SchemaCantosMisa, LiturgiaPalabra } from '../types/liturgia';
import { CANTICOS_LIST } from '../data/liturgyData';

/**
 * Curated thematic catalog of hymns for every moment of the Catholic Mass
 */
const POOLS = {
  entrada: {
    pastores_vocacion: [
      'Vienen con alegría, Señor',
      'Pueblo Santo y Elegido',
      'El Señor es mi fuerza y mi cántico',
      'Acerquémonos todos al altar',
      'Alrededor de tu mesa'
    ],
    martires: [
      'Pueblo Santo y Elegido',
      'Somos un pueblo que camina',
      'Iglesia peregrina de Dios',
      'Testigos de tu amor'
    ],
    mariano: [
      'Junto a Ti, María',
      'Santa María del Camino',
      'Ave María de Lourdes',
      'La Guadalupana (Desde el cielo una hermosa mañana)',
      'Madre de los creyentes'
    ],
    cuaresma: [
      'Hacia ti, morada santa',
      'Caminaré en presencia del Señor',
      'Perdona a tu pueblo, Señor',
      'Sí, me levantaré',
      'A ti levanto mis ojos'
    ],
    pascua: [
      'Cantando la alegría de vivir',
      'El Señor resucitó, aleluya',
      'Resucitó, resucitó, resucitó, ¡aleluya!',
      'Pueblo de reyes, asamblea santa',
      'Acuérdate de Jesucristo'
    ],
    adviento: [
      'Ven, Señor, no tardes más',
      'Un pueblo que camina por el mundo',
      'Cerca está el Señor',
      'La Virgen sueña caminos',
      'Esperando con María'
    ],
    navidad: [
      'Vamos, pastores, vamos',
      'Campana sobre campana',
      'Adeste Fideles (Venid, fieles todos)',
      'Noche de Paz',
      'Los pastores a Belén'
    ],
    ordinario: [
      'Vienen con alegría, Señor',
      'Alrededor de tu mesa',
      'Alegre la mañana',
      'Alabaré, alabaré a mi Señor',
      'Juntos como hermanos',
      'Cantando la alegría de vivir',
      'Pueblo Santo y Elegido'
    ]
  },
  kyrie: {
    general: 'Señor, Ten Piedad (Mejía)',
    cuaresma: 'Señor, Ten Piedad (Kyrie Cuaresmal)',
    pascua: 'Señor, Ten Piedad (Misa Pascual)',
    solemne: 'Kyrie Eleison (Gregoriano)'
  },
  gloria: {
    general: 'Gloria a Dios en el Cielo (Palazón)',
    mejia: 'Gloria a Dios (Mejía)',
    solemne: 'Gloria in Excelsis Deo (Misa Solemne)',
    villancico: 'Gloria in Excelsis Deo (Tradicional Navideño)'
  },
  ofertorio: {
    pastores: [
      'Te Ofrecemos, Padre Nuestro',
      'Entre tus Manos',
      'Saber que Vendrás',
      'Te presentamos el vino y el pan'
    ],
    martires: [
      'Entre tus Manos',
      'Si el grano de trigo no muere',
      'Te ofrecemos, Señor, nuestras vidas'
    ],
    mariano: [
      'Te Ofrecemos, Padre Nuestro',
      'María, Madre del Sí',
      'Llevamos hacia tu altar con María',
      'Saber que Vendrás'
    ],
    cuaresma: [
      'Entre tus Manos',
      'Te ofrecemos, Señor, este pan y este vino',
      'Acepta, Señor, nuestros dones',
      'Por los niños que empiezan la vida'
    ],
    pascua: [
      'Saber que Vendrás',
      'Este es el pan que te ofrecemos',
      'Te ofrecemos, Padre Nuestro',
      'Bendito seas, Señor, por este pan'
    ],
    adviento: [
      'Te ofrecemos, Señor, este pan y este vino',
      'Saber que Vendrás',
      'En tus manos de Padre',
      'Con el vino y con el pan'
    ],
    navidad: [
      'Los pastores a Belén',
      'En un pobre pesebre',
      'Te ofrecemos, Niño Dios',
      'Te Ofrecemos, Padre Nuestro'
    ],
    ordinario: [
      'Te Ofrecemos, Padre Nuestro',
      'Saber que Vendrás',
      'Entre tus Manos',
      'Bendito seas, Señor, por este pan',
      'Llevamos hacia tu altar',
      'Con amor te presento, Señor'
    ]
  },
  santo: {
    general: 'Santo (Gen Rosso / Mejía)',
    palazon: 'Santo (Francisco Palazón)',
    solemne: 'Santo Solemne (Haugen)',
    querubines: 'Santo de los Querubines'
  },
  cordero: {
    general: 'Cordero de Dios (Rito de la Paz)',
    mejia: 'Cordero de Dios (Alejandro Mejía)',
    pascual: 'Cordero de Dios (Pascual)'
  },
  comunion: {
    pastor_guia: [
      'Pescador de Hombres (Tú has venido a la orilla)',
      'Yo soy el Pan de Vida',
      'El Señor es mi pastor, nada me falta',
      'Una Espiga Dorada por el Sol'
    ],
    martires: [
      'Nadie tiene mayor amor que el que da la vida',
      'Donde hay caridad y amor, allí está Dios',
      'Yo soy el Pan de Vida',
      'Una Espiga Dorada por el Sol'
    ],
    mariano: [
      'Yo soy el Pan de Vida',
      'Magníficat (Mi alma glorifica al Señor)',
      'Una Espiga Dorada por el Sol',
      'Altísimo Señor (Alabanza Eucarística)'
    ],
    cuaresma: [
      'No podemos caminar con hambre bajo el sol',
      'Hambre de Dios (Tú nos das la vida)',
      'Oh Buen Jesús (Alabanza)',
      'Yo soy el Pan de Vida'
    ],
    pascua: [
      'Yo soy el Pan de Vida',
      'Quédate con nosotros, la tarde está cayendo',
      'Una Espiga Dorada por el Sol',
      'Cantemos al Amor de los Amores'
    ],
    adviento: [
      'Oh Ven, Emmanuel',
      'Tú eres, Señor, el Pan de Vida',
      'Una Espiga Dorada por el Sol',
      'Pescador de Hombres'
    ],
    navidad: [
      'Noche de Paz, Noche de Amor',
      'Campana sobre campana',
      'Yo soy el Pan de Vida',
      'El Niño Dios ha nacido en Belén'
    ],
    ordinario: [
      'Pescador de Hombres (Tú has venido a la orilla)',
      'Yo soy el Pan de Vida',
      'Una Espiga Dorada por el Sol',
      'Altísimo Señor (Alabanza Eucarística)',
      'Cantemos al Amor de los Amores',
      'Donde hay caridad y amor',
      'Tomad y comed, éste es mi cuerpo'
    ]
  },
  salida: {
    martires: 'El testigo (Por ti mi Dios cantando voy)',
    pastores: 'Demos Gracias al Señor, Demos Gracias',
    mariano_guadalupe: 'La Guadalupana (Desde el cielo una hermosa mañana)',
    mariano_general: 'Santa María del Camino',
    mariano_intimo: 'Junto a Ti, María',
    cuaresma: 'Perdona a tu pueblo, Señor',
    pascua: 'Resucitó, Resucitó, Resucitó, ¡Aleluya!',
    adviento: 'La Virgen sueña caminos',
    navidad: 'El Niño del Tambor (El Tamborilero)',
    ordinario: [
      'Demos Gracias al Señor, Demos Gracias',
      'Alabaré, alabaré',
      'Santa María del Camino',
      'Junto a Ti, María',
      'Id y enseñad por el mundo',
      'Anunciaremos tu Reino, Señor'
    ]
  }
};

/**
 * Deterministic helper to pick an item from an array based on date hash
 */
function pickByDate<T>(list: T[], seedStr: string, offset: number = 0): T {
  if (!list || list.length === 0) return '' as any;
  let hash = 0;
  for (let i = 0; i < seedStr.length; i++) {
    hash = (hash * 31 + seedStr.charCodeAt(i) + offset) & 0xfffffff;
  }
  const idx = Math.abs(hash) % list.length;
  return list[idx];
}

/**
 * Intelligently suggests liturgical songs based on the day's readings,
 * feast, saints, liturgical color, season and date.
 */
export function getSuggestedChantsForDay(
  tiempoLiturgico: string,
  color: string,
  tituloCelebracion: string,
  lecturas?: LiturgiaPalabra,
  isoDate?: string
): SchemaCantosMisa {
  const t = (tiempoLiturgico || '').toLowerCase();
  const c = (color || '').toLowerCase();
  const cel = (tituloCelebracion || '').toLowerCase();
  const dateKey = isoDate || '2026-08-19';

  // Read biblical text cues from readings
  const lecturasText = lecturas ? [
    lecturas.primera_lectura?.cita || '',
    lecturas.primera_lectura?.texto || '',
    lecturas.salmo_responsorial?.respuesta || '',
    lecturas.evangelio?.cita || '',
    lecturas.evangelio?.texto || ''
  ].join(' ').toLowerCase() : '';

  // 1. Marian Feasts & Memorials
  if (cel.includes('maría') || cel.includes('virgen') || cel.includes('guadalupe') || cel.includes('asunción') || cel.includes('rosario') || cel.includes('carmen') || cel.includes('dolores') || cel.includes('reina')) {
    const isGuadalupe = cel.includes('guadalupe');
    return {
      entrada: isGuadalupe ? 'La Guadalupana (Desde el cielo una hermosa mañana)' : pickByDate(POOLS.entrada.mariano, dateKey, 1),
      kyrie: POOLS.kyrie.general,
      gloria: POOLS.gloria.general,
      salmo: lecturas?.salmo_responsorial ? `${lecturas.salmo_responsorial.cita} - ${lecturas.salmo_responsorial.respuesta}` : 'Salmo 44 - De pie a tu derecha está la reina',
      aleluya: 'Aleluya Tradicional Gregoriano',
      ofertorio: pickByDate(POOLS.ofertorio.mariano, dateKey, 2),
      santo: POOLS.santo.general,
      paz: 'Paz en la Tierra',
      cordero: POOLS.cordero.general,
      comunion: pickByDate(POOLS.comunion.mariano, dateKey, 3),
      salida: isGuadalupe ? 'La Guadalupana (Desde el cielo una hermosa mañana)' : POOLS.salida.mariano_general,
      mariano: 'Junto a Ti, María'
    };
  }

  // 2. Lent / Cuaresma / Holy Week
  if (t.includes('cuaresma') || t.includes('semana santa') || c === 'morado' && (t.includes('ceniza') || t.includes('cuaresma'))) {
    return {
      entrada: pickByDate(POOLS.entrada.cuaresma, dateKey, 1),
      kyrie: POOLS.kyrie.cuaresma,
      gloria: '', // Omitted in Lent
      salmo: lecturas?.salmo_responsorial ? `${lecturas.salmo_responsorial.cita} - ${lecturas.salmo_responsorial.respuesta}` : 'Salmo 50 - Misericordia, Señor, hemos pecado',
      aleluya: 'Honor y gloria a ti, Señor Jesús',
      ofertorio: pickByDate(POOLS.ofertorio.cuaresma, dateKey, 2),
      santo: POOLS.santo.general,
      paz: 'La paz esté con nosotros',
      cordero: POOLS.cordero.general,
      comunion: pickByDate(POOLS.comunion.cuaresma, dateKey, 3),
      salida: POOLS.salida.cuaresma,
      mariano: 'Dolorosa de pie junto a la Cruz'
    };
  }

  // 3. Easter / Pascua
  if (t.includes('pascua') || t.includes('octava') || t.includes('pentecostés')) {
    return {
      entrada: pickByDate(POOLS.entrada.pascua, dateKey, 1),
      kyrie: POOLS.kyrie.pascua,
      gloria: POOLS.gloria.general,
      salmo: lecturas?.salmo_responsorial ? `${lecturas.salmo_responsorial.cita} - ${lecturas.salmo_responsorial.respuesta}` : 'Salmo 117 - Éste es el día en que actuó el Señor',
      aleluya: 'Aleluya Pascual (El Señor resucitó)',
      ofertorio: pickByDate(POOLS.ofertorio.pascua, dateKey, 2),
      santo: POOLS.santo.solemne,
      paz: 'La paz esté con nosotros',
      cordero: POOLS.cordero.pascual,
      comunion: pickByDate(POOLS.comunion.pascua, dateKey, 3),
      salida: POOLS.salida.pascua,
      mariano: 'Reina del Cielo, alégrate (Regina Coeli)'
    };
  }

  // 4. Advent / Adviento
  if (t.includes('adviento')) {
    return {
      entrada: pickByDate(POOLS.entrada.adviento, dateKey, 1),
      kyrie: POOLS.kyrie.general,
      gloria: '', // Omitted in Advent
      salmo: lecturas?.salmo_responsorial ? `${lecturas.salmo_responsorial.cita} - ${lecturas.salmo_responsorial.respuesta}` : 'Salmo 24 - A ti, Señor, levanto mi alma',
      aleluya: 'Aleluya - Preparen el camino del Señor',
      ofertorio: pickByDate(POOLS.ofertorio.adviento, dateKey, 2),
      santo: POOLS.santo.general,
      paz: 'Paz en la Tierra',
      cordero: POOLS.cordero.general,
      comunion: pickByDate(POOLS.comunion.adviento, dateKey, 3),
      salida: POOLS.salida.adviento,
      mariano: 'Santa María de la Esperanza'
    };
  }

  // 5. Christmas / Navidad / Epifanía
  if (t.includes('navidad') || t.includes('epifanía') || cel.includes('navidad') || cel.includes('sagrada familia')) {
    return {
      entrada: pickByDate(POOLS.entrada.navidad, dateKey, 1),
      kyrie: POOLS.kyrie.general,
      gloria: POOLS.gloria.villancico,
      salmo: lecturas?.salmo_responsorial ? `${lecturas.salmo_responsorial.cita} - ${lecturas.salmo_responsorial.respuesta}` : 'Salmo 97 - Los confines de la tierra han visto la salvación',
      aleluya: 'Aleluya - Les anuncio una gran alegría',
      ofertorio: pickByDate(POOLS.ofertorio.navidad, dateKey, 2),
      santo: POOLS.santo.general,
      paz: 'Noche de Paz',
      cordero: POOLS.cordero.general,
      comunion: pickByDate(POOLS.comunion.navidad, dateKey, 3),
      salida: POOLS.salida.navidad,
      mariano: 'Madre del Redentor'
    };
  }

  // 6. Martyrs & Apostles (Red vestments)
  if (c === 'rojo' || cel.includes('mártir') || cel.includes('apóstol') || cel.includes('san bartolomé') || cel.includes('san lorenzo')) {
    return {
      entrada: pickByDate(POOLS.entrada.martires, dateKey, 1),
      kyrie: POOLS.kyrie.general,
      gloria: POOLS.gloria.mejia,
      salmo: lecturas?.salmo_responsorial ? `${lecturas.salmo_responsorial.cita} - ${lecturas.salmo_responsorial.respuesta}` : 'Salmo Responsorial del Leccionario',
      aleluya: 'Aleluya Tradicional Gregoriano',
      ofertorio: pickByDate(POOLS.ofertorio.martires, dateKey, 2),
      santo: POOLS.santo.general,
      paz: 'La paz esté con nosotros',
      cordero: POOLS.cordero.general,
      comunion: pickByDate(POOLS.comunion.martires, dateKey, 3),
      salida: POOLS.salida.martires,
      mariano: 'Junto a Ti, María'
    };
  }

  // 7. Good Shepherd / Pastors / Doctors (e.g. Ezequiel 34 / Salmo 22 / San Juan Eudes / San Bernardo / San Agustín / San Pío X)
  if (
    cel.includes('pastor') || cel.includes('obispo') || cel.includes('presbítero') || cel.includes('doctor') ||
    cel.includes('eudes') || cel.includes('bernardo') || cel.includes('agustín') || cel.includes('pío x') ||
    lecturasText.includes('pastor') || lecturasText.includes('oveja') || lecturasText.includes('rebaño')
  ) {
    return {
      entrada: pickByDate(POOLS.entrada.pastores_vocacion, dateKey, 1),
      kyrie: POOLS.kyrie.general,
      gloria: c === 'blanco' ? POOLS.gloria.general : '',
      salmo: lecturas?.salmo_responsorial ? `${lecturas.salmo_responsorial.cita} - ${lecturas.salmo_responsorial.respuesta}` : 'Salmo 22 - El Señor es mi pastor, nada me falta',
      aleluya: 'Aleluya Tradicional Gregoriano',
      ofertorio: pickByDate(POOLS.ofertorio.pastores, dateKey, 2),
      santo: POOLS.santo.general,
      paz: 'Paz en la Tierra',
      cordero: POOLS.cordero.general,
      comunion: pickByDate(POOLS.comunion.pastor_guia, dateKey, 3),
      salida: POOLS.salida.pastores,
      mariano: 'Junto a Ti, María'
    };
  }

  // 8. Ordinary Time (Dynamic Daily Rotation)
  const isWhite = c === 'blanco';
  return {
    entrada: pickByDate(POOLS.entrada.ordinario, dateKey, 1),
    kyrie: POOLS.kyrie.general,
    gloria: isWhite ? POOLS.gloria.general : '',
    salmo: lecturas?.salmo_responsorial ? `${lecturas.salmo_responsorial.cita} - ${lecturas.salmo_responsorial.respuesta}` : 'Salmo Responsorial del Día',
    aleluya: 'Aleluya Tradicional Gregoriano',
    ofertorio: pickByDate(POOLS.ofertorio.ordinario, dateKey, 2),
    santo: POOLS.santo.general,
    paz: 'Paz en la Tierra',
    cordero: POOLS.cordero.general,
    comunion: pickByDate(POOLS.comunion.ordinario, dateKey, 3),
    salida: pickByDate(POOLS.salida.ordinario, dateKey, 4),
    mariano: 'Santa María del Camino'
  };
}
