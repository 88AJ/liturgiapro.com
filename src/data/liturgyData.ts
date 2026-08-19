import { LiturgicalDay, Cantico, LiturgicalColor } from '../types/liturgia';
import { getLiturgicalSeasonInfo, parseDateISO, formatDateISO } from '../utils/calendar';
import { SANTORAL_FIJO } from './liturgicalLectionary';
import liturgiaRawData from './liturgiaRaw.json';
import cantosRawData from './cantosRaw.json';
import ordinarioRawData from './ordinarioRaw.json';
import ritualesRawData from './ritualesRaw.json';

export const LITURGIA_DB: Record<string, any> = liturgiaRawData;
export const CANTOS_DB: Record<string, any> = cantosRawData;
export const ORDINARIO_DB: any = ordinarioRawData;
export const RITUALES_DB: any = ritualesRawData;

/**
 * Enhanced list of Liturgical Hymns with categories, keys, guitar chords and lyrics
 */
export const CANTICOS_LIST: Cantico[] = [
  {
    id: 'vienen-alegria',
    titulo: 'Vienen con alegría, Señor',
    momento: 'Entrada',
    tiempo: 'Tiempo Ordinario / Pascua',
    tonalidad: 'Re Mayor (D)',
    acordes: 'D - A7 - G - D',
    autor: 'Cesáreo Gabaráin',
    youtubeQuery: 'Vienen con alegria Señor Cesáreo Gabarain',
    letra: `CORO
(D) Vienen con alegría, Señor,
(A7) cantando vienen con alegría, Señor.
(G) Los que caminan por la (D) vida, Señor,
(A7) sembrando tu paz y (D) amor.

ESTROFA 1
(D) Vienen trayendo la esperanza,
(A7) a un mundo cargado de ansiedad,
(G) a un mundo que busca y que no (D) alcanza,
(A7) caminos de amor y de (D) amistad.`
  },
  {
    id: 'hacia-ti-morada-santa',
    titulo: 'Hacia ti, morada santa',
    momento: 'Entrada',
    tiempo: 'Cuaresma / Adviento / Tiempo Ordinario',
    tonalidad: 'Mi menor (Em)',
    acordes: 'Em - D - C - B7',
    autor: 'Kiko Argüello',
    youtubeQuery: 'Hacia ti morada santa canto de entrada',
    letra: `CORO
(Em) Hacia ti, morada (D) santa,
(C) hacia ti, tierra del Salva(B7)dor,
(Em) peregrinos, cami(D)nantes,
(C) vamos hacia (B7) ti.

ESTROFA 1
(Em) Venimos a tu mesa, sellaremos tu pacto,
(D) comeremos tu carne, tu sangre nos limpiará.
(C) Reinaremos contigo, en tu morada santa,
(B7) beberemos tu sangre, tu fe nos salvará.`
  },
  {
    id: 'gloria-palazon',
    titulo: 'Gloria a Dios en el Cielo (Palazón)',
    momento: 'Gloria',
    tiempo: 'Solemnidades y Fiestas',
    tonalidad: 'Do Mayor (C)',
    acordes: 'C - G - Am - F - G',
    autor: 'Francisco Palazón',
    youtubeQuery: 'Gloria a Dios en el cielo Francisco Palazon',
    letra: `CORO
(C) Gloria a Dios en el (G) cielo,
y en la (Am) tierra paz a los (F) hombres que (G) ama el Señor. (Bis)

ESTROFA 1
(C) Por tu inmensa gloria te ala(G)bamos,
(Am) te bendecimos, te adora(F)mos,
(C) te glorificamos, te damos (G) gracias,
(F) Señor Dios, Rey celestial, (G) Dios Padre todopoderoso.`
  },
  {
    id: 'te-ofrecemos-padre-nuestro',
    titulo: 'Te Ofrecemos, Padre Nuestro',
    momento: 'Ofertorio',
    tiempo: 'Tiempo Ordinario / Pascua',
    tonalidad: 'Sol Mayor (G)',
    acordes: 'G - C - D7 - G',
    autor: 'Tradicional Litúrgico',
    youtubeQuery: 'Te ofrecemos Padre nuestro con el vino y con el pan',
    letra: `CORO
(G) Te ofrecemos, Padre (C) nuestro,
(D7) con el vino y con el (G) pan,
nuestras penas y a(C)legrías,
(D7) el trabajo y nuestro a(G)mor.

ESTROFA 1
(G) Como el trigo de los (C) campos,
(D7) una vid se converti(G)rá,
en el cuerpo y en la (C) sangre,
(D7) de Jesús el Salva(G)dor.`
  },
  {
    id: 'santo-mejia',
    titulo: 'Santo (Gen Rosso / Mejía)',
    momento: 'Santo',
    tiempo: 'Todos los tiempos',
    tonalidad: 'Mi menor (Em)',
    acordes: 'Em - D - C - B7',
    autor: 'Gen Rosso / Tradicional',
    youtubeQuery: 'Santo Santo Santo Dios del universo',
    letra: `(Em) Santo, Santo, (D) Santo es el Señor,
(C) Dios del uni(B7)verso.
(Em) Llenos están el cielo y la (D) tierra
(C) de tu (B7) gloria.

(Em) Hosanna en el (D) cielo,
(C) hosanna en las al(B7)turas.
(Em) Bendito el que viene en el (D) nombre,
(C) en el nombre del Se(B7)ñor.`
  },
  {
    id: 'cordero-de-dios',
    titulo: 'Cordero de Dios (Rito de la Paz)',
    momento: 'Cordero',
    tiempo: 'Todos los tiempos',
    tonalidad: 'La menor (Am)',
    acordes: 'Am - Dm - G - C - E7',
    autor: 'Tradicional',
    youtubeQuery: 'Cordero de Dios que quitas el pecado del mundo ten piedad',
    letra: `(Am) Cordero de Dios, que quitas el pe(Dm)cado del mundo,
(G) ten piedad de no(C)sotros, (E7) ten piedad. (Bis)

(Am) Cordero de Dios, que quitas el pe(Dm)cado del mundo,
(G) danos la (C) paz, (E7) danos la (Am) paz.`
  },
  {
    id: 'pescador-de-hombres',
    titulo: 'Pescador de Hombres (Tú has venido a la orilla)',
    momento: 'Comunión',
    tiempo: 'Tiempo Ordinario / Vocacional',
    tonalidad: 'Do Mayor (C)',
    acordes: 'C - G - Am - F - G7',
    autor: 'Cesáreo Gabaráin',
    youtubeQuery: 'Pescador de hombres tu has venido a la orilla Cesáreo Gabarain',
    letra: `ESTROFA 1
(C) Tú has venido a la (G) orilla,
(Am) no has buscado ni a sabios ni a (F) ricos,
(C) tan sólo quieres (G) que yo te (C) siga.

CORO
(F) Señor, me has mirado a los (C) ojos,
(G) sonriendo has dicho mi (C) nombre.
(F) En la arena he dejado mi (C) barca,
(G) junto a ti buscaré otro (C) mar.`
  },
  {
    id: 'yo-soy-el-pan-de-vida',
    titulo: 'Yo soy el Pan de Vida',
    momento: 'Comunión',
    tiempo: 'Tiempo Ordinario / Pascua',
    tonalidad: 'La Mayor (A)',
    acordes: 'A - E - F#m - D',
    autor: 'Suzanne Toolan',
    youtubeQuery: 'Yo soy el pan de vida el que viene a mi no tendra hambre',
    letra: `ESTROFA 1
(A) Yo soy el Pan de (E) Vida,
(F#m) el que viene a Mí no tendrá (D) hambre,
(A) el que cree en Mí no tendrá (E) sed.
(F#m) Nadie viene a Mí, si mi Padre no lo (D) llama.

CORO
(A) Y Yo le resucita(E)ré,
(F#m) y Yo le resucita(D)ré,
(A) y Yo le resucita(E)ré en el día fi(A)nal.`
  },
  {
    id: 'resucito-aleluya',
    titulo: 'Resucitó, Resucitó, Resucitó, ¡Aleluya!',
    momento: 'Salida',
    tiempo: 'Tiempo de Pascua',
    tonalidad: 'Mi menor (Em)',
    acordes: 'Em - D - C - B7',
    autor: 'Kiko Argüello',
    youtubeQuery: 'Resucito Kiko Arguello Pascua',
    letra: `CORO
(Em) ¡Resucitó, resuci(D)tó,
resuci(C)tó, ale(B7)luya!
(Em) ¡Aleluya, ale(D)luya,
ale(C)luya, resuci(B7)tó!

ESTROFA 1
(Em) La muerte, ¿dónde está la muerte?
(D) ¿Dónde está mi muerte?
(C) ¿Dónde su vic(B7)toria?`
  },
  {
    id: 'junto-a-ti-maria',
    titulo: 'Junto a Ti, María',
    momento: 'Mariano',
    tiempo: 'Fiestas Marianas / Salida / XV Años',
    tonalidad: 'Re Mayor (D)',
    acordes: 'D - A - Bm - G',
    autor: 'Kairoi',
    youtubeQuery: 'Junto a ti Maria como un niño quiero estar Kairoi',
    letra: `ESTROFA 1
(D) Junto a ti, María,
(A) como un niño quiero estar,
(Bm) tómame en tus brazos,
(G) guíame en mi caminar.
(D) Quiero que me eduques,
(A) que me enseñes a rezar,
(Bm) hazme transparente,
(G) lléname de (A) paz.

CORO
(D) Madre, (A) Madre, (Bm) Madre, (G) Madre. (Bis)`
  }
];

/**
 * Resolves or builds a full LiturgicalDay object for any given ISO date string (YYYY-MM-DD)
 */
export function getLiturgicalDay(isoDate: string): LiturgicalDay {
  const dateObj = parseDateISO(isoDate);
  const seasonInfo = getLiturgicalSeasonInfo(dateObj);

  // Check if we have pre-compiled missal data in database
  if (LITURGIA_DB[isoDate]) {
    const raw = LITURGIA_DB[isoDate];
    return {
      fecha: isoDate,
      dia_semana: raw.dia_semana || seasonInfo.diaSemana,
      tiempo_liturgico: raw.tiempo_liturgico || seasonInfo.tiempo,
      color: (raw.color as LiturgicalColor) || seasonInfo.color,
      grado: (raw.grado as any) || seasonInfo.grado,
      titulo_celebracion: raw.titulo_celebracion || seasonInfo.tituloCelebracion,
      celebracion: raw.celebracion || seasonInfo.tituloCelebracion,
      ciclo: seasonInfo.ciclo,
      ano_ferial: seasonInfo.anoFerial,
      monicion_entrada: raw.monicion_entrada,
      antifona_entrada: raw.antifona_entrada,
      rito_penitencial: raw.rito_penitencial,
      gloria: raw.gloria ?? (seasonInfo.color === 'Blanco' || seasonInfo.grado === 'Solemnidad' || seasonInfo.grado === 'Fiesta'),
      oracion_colecta: raw.oracion_colecta,
      liturgia_palabra: raw.liturgia_palabra,
      credo: raw.credo ?? (seasonInfo.grado === 'Solemnidad' || seasonInfo.grado === 'Domingo'),
      oracion_fieles: raw.oracion_fieles,
      oracion_ofrendas: raw.oracion_ofrendas,
      prefacio: raw.prefacio,
      plegaria_eucaristica: raw.plegaria_eucaristica,
      antifona_comunion: raw.antifona_comunion,
      oracion_comunion: raw.oracion_comunion,
      reflexion_homiletica: raw.reflexion_homiletica,
      santos_dia: raw.santos_dia,
    };
  }

  // Check Roman Santoral for fixed solemnities, feasts and memorials
  const monthDay = isoDate.substring(5); // "08-19"
  if (SANTORAL_FIJO[monthDay]) {
    const s = SANTORAL_FIJO[monthDay];
    return {
      fecha: isoDate,
      dia_semana: seasonInfo.diaSemana,
      tiempo_liturgico: s.tiempo_liturgico || seasonInfo.tiempo,
      color: s.color || seasonInfo.color,
      grado: s.grado || seasonInfo.grado,
      titulo_celebracion: s.titulo_celebracion || seasonInfo.tituloCelebracion,
      celebracion: s.titulo_celebracion || seasonInfo.tituloCelebracion,
      ciclo: seasonInfo.ciclo,
      ano_ferial: seasonInfo.anoFerial,
      monicion_entrada: s.primera_lectura?.monicion ? `Hermanos: Sean bienvenidos a la celebración de ${s.titulo_celebracion}. Que la Palabra y el Sacramento renueven nuestra fe y amor fraterno.` : `Hermanos: Con gozo nos reunimos para celebrar la memoria de ${s.titulo_celebracion}.`,
      antifona_entrada: s.antifona_entrada || `Cantemos al Señor, porque ha hecho maravillas.`,
      gloria: s.color === 'Blanco' || s.grado === 'Solemnidad' || s.grado === 'Fiesta',
      oracion_colecta: s.oracion_colecta || `Dios todopoderoso y eterno, concede a tu pueblo congregado en tu nombre gustar de la plenitud de tu gracia. Por nuestro Señor Jesucristo.`,
      liturgia_palabra: {
        primera_lectura: s.primera_lectura || {
          titulo: 'Primera Lectura',
          cita: 'Lectura bíblica',
          texto: 'Proclamación de la Palabra de Dios.'
        },
        salmo_responsorial: s.salmo_responsorial || {
          cita: 'Salmo Responsorial',
          respuesta: 'El Señor es mi pastor, nada me falta.',
          texto: 'El Señor es mi luz y mi salvación.'
        },
        segunda_lectura: s.segunda_lectura,
        aclamacion_evangelio: s.aclamacion_evangelio || {
          texto: 'R. Aleluya, aleluya.\nLa palabra de Dios es viva y eficaz.\nR. Aleluya.'
        },
        evangelio: s.evangelio || {
          titulo: 'Santo Evangelio',
          cita: 'Lectura del santo Evangelio',
          texto: 'En aquel tiempo...'
        }
      },
      credo: s.grado === 'Solemnidad' || seasonInfo.grado === 'Domingo',
      oracion_fieles: [
        'Por la Santa Iglesia universal, para que anuncie con fidelidad el Evangelio de Cristo a todos los pueblos. Roguemos al Señor.',
        'Por los gobernantes de las naciones, para que promuevan la paz auténtica, la justicia y el bien común. Roguemos al Señor.',
        'Por los enfermos, los pobres y los que sufren tribulación, para que sientan la consolación de Dios. Roguemos al Señor.',
        'Por nuestra comunidad reunida en torno al altar, para que el testimonio de los santos inspire nuestra entrega diaria. Roguemos al Señor.'
      ],
      oracion_ofrendas: s.oracion_ofrendas || `Acepta, Señor, estos dones que te presentamos en la fiesta de ${s.titulo_celebracion}.`,
      antifona_comunion: s.antifona_comunion || `El que come mi carne y bebe mi sangre permanece en mí y yo en él, dice el Señor.`,
      oracion_comunion: s.oracion_comunion || `Que este santo sacramento que hemos recibido, Señor, nos comunique la vida eterna. Por Jesucristo, nuestro Señor.`,
      reflexion_homiletica: s.reflexion_homiletica
    };
  }

  // Generate a faithful liturgical template for dates outside the seed slice
  return {
    fecha: isoDate,
    dia_semana: seasonInfo.diaSemana,
    tiempo_liturgico: seasonInfo.tiempo,
    color: seasonInfo.color,
    grado: seasonInfo.grado,
    titulo_celebracion: seasonInfo.tituloCelebracion,
    celebracion: seasonInfo.tituloCelebracion,
    ciclo: seasonInfo.ciclo,
    ano_ferial: seasonInfo.anoFerial,
    monicion_entrada: `Hermanos: Con alegría nos congregamos hoy para celebrar los sagrados misterios en este ${seasonInfo.tituloCelebracion}. Que la Palabra y el Sacramento renueven nuestra fe y esperanza.`,
    antifona_entrada: `Cantemos al Señor, porque ha hecho maravillas; aclamemos al Dios de nuestra salvación.`,
    gloria: seasonInfo.color === 'Blanco' || seasonInfo.grado === 'Solemnidad' || seasonInfo.grado === 'Fiesta' || (seasonInfo.tiempo === 'Tiempo Ordinario' && seasonInfo.grado === 'Domingo'),
    oracion_colecta: `Dios todopoderoso y eterno, concede a tu pueblo congregado en tu nombre caminar siempre según tus mandamientos y gustar de la plenitud de tu gracia. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.`,
    liturgia_palabra: {
      primera_lectura: {
        titulo: 'Primera Lectura',
        cita: 'Lectura bíblica del Leccionario',
        texto: `Hermanos: La gracia de Dios se ha manifestado para la salvación de todos los hombres, enseñándonos a renunciar a la impiedad y a los deseos mundanos, para vivir en este mundo con sobriedad, justicia y piedad, aguardando la bienaventurada esperanza y la manifestación gloriosa de nuestro gran Dios y Salvador Jesucristo.\n\nPalabra de Dios.`,
        monicion: `En esta lectura, la Sagrada Escritura nos exhorta a poner toda nuestra confianza en las promesas del Señor y caminar en fidelidad.`
      },
      salmo_responsorial: {
        cita: 'Salmo 23',
        respuesta: 'El Señor es mi pastor, nada me falta.',
        texto: `El Señor es mi pastor, nada me falta:\nen verdes praderas me hace recostar;\nme conduce hacia fuentes tranquilas\ny repara mis fuerzas.\n\nR. El Señor es mi pastor, nada me falta.\n\nMe guía por el sendero justo,\npor el honor de su nombre.\nAunque camine por cañadas oscuras,\nnada temo, porque tú vas conmigo:\ntu vara y tu cayado me sosiegan.\n\nR. El Señor es mi pastor, nada me falta.`
      },
      segunda_lectura: seasonInfo.grado === 'Domingo' || seasonInfo.grado === 'Solemnidad' ? {
        titulo: 'Segunda Lectura',
        cita: 'Lectura de la carta del apóstol san Pablo',
        texto: `Hermanos: Les ruego, por la misericordia de Dios, que se ofrezcan a sí mismos como hostia viva, santa y agradable a Dios: éste es su culto espiritual. No se amolden al mundo actual, sino transfórmense mediante la renovación de su mente, para que puedan discernir cuál es la voluntad de Dios: lo bueno, lo agradable y lo perfecto.\n\nPalabra de Dios.`,
        monicion: `El apóstol nos llama a ofrecer nuestras vidas como un culto agradable a Dios en el amor mutuo.`
      } : undefined,
      aclamacion_evangelio: {
        texto: 'R. Aleluya, aleluya.\nMis ovejas escuchan mi voz, dice el Señor; yo las conozco y ellas me siguen.\nR. Aleluya.'
      },
      evangelio: {
        titulo: 'Santo Evangelio',
        cita: 'Lectura del santo Evangelio según san Juan',
        texto: `En aquel tiempo, Jesús dijo a sus discípulos: «La paz les dejo, mi paz les doy; no se la doy como la da el mundo. No se turbe su corazón ni se acobarde. Si me amaran, se alegrarían de que vaya al Padre, porque el Padre es más grande que yo. Les he dicho esto ahora, antes de que suceda, para que cuando suceda, crean».\n\nPalabra del Señor.`,
        monicion: `Jesús nos promete su Espíritu Consolador y nos llena de la verdadera paz pascual. Escuchemos su Evangelio.`
      }
    },
    credo: seasonInfo.grado === 'Domingo' || seasonInfo.grado === 'Solemnidad',
    oracion_fieles: [
      'Por la Santa Iglesia universal, por el Papa, los Obispos, presbíteros y diáconos, para que apacienten al pueblo de Dios con amor y sabiduría. Roguemos al Señor.',
      'Por los gobernantes y líderes sociales, para que trabajen por la paz duradera, la justicia y el bienestar de los más desfavorecidos. Roguemos al Señor.',
      'Por los enfermos, los ancianos, los migrantes y cuantos sufren soledad o tribulación, para que sientan la presencia reconfortante de Cristo. Roguemos al Señor.',
      'Por los fieles de nuestra comunidad, para que fortalecidos con la Eucaristía seamos testigos vivos del amor del Padre en nuestras familias. Roguemos al Señor.'
    ],
    oracion_ofrendas: `Acepta, Señor, los dones que con gozo te presentamos en este altar, y por este santo sacrificio concédenos la salvación eterna. Por Jesucristo, nuestro Señor. Amén.`,
    antifona_comunion: `El que come mi carne y bebe mi sangre permanece en mí y yo en él, dice el Señor.`,
    oracion_comunion: `Te pedimos, Señor, que la comunión de este sacramento nos purifique de todo pecado y nos haga partícipes de tu vida inmortal. Por Jesucristo, nuestro Señor. Amén.`,
    reflexion_homiletica: [
      `El misterio que hoy celebramos nos convoca al centro mismo de la vida cristiana: el encuentro vivo con la Palabra encarnada y el banquete eucarístico. Los Santos Padres nos recuerdan que la Eucaristía es el memorial perenne del amor que vence toda muerte y desolación.`,
      `Al acercarnos a la mesa del Señor, renovamos nuestro compromiso de ser discípulos misioneros, llevando la luz del Evangelio a nuestras familias, centros de trabajo y ambientes cotidianos, viviendo la caridad fraterna como el signo distintivo de los hijos de Dios.`
    ]
  };
}
