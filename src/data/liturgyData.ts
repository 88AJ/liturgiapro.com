import { LiturgicalDay, Cantico, LiturgicalColor } from '../types/liturgia';
import { getLiturgicalSeasonInfo, parseDateISO, formatDateISO } from '../utils/calendar';
import { SANTORAL_FIJO } from './liturgicalLectionary';
import { getSundayLectionary } from './leccionarioDominical';
import { getFerialLectionary } from './leccionarioFerial';
import { getSuggestedChantsForDay } from '../utils/musicSelector';
import liturgiaRawData from './liturgiaRaw.json';
import cantosRawData from './cantosRaw.json';
import ordinarioRawData from './ordinarioRaw.json';
import ritualesRawData from './ritualesRaw.json';
import calendarioMexicanoData from './calendarioMexicano2025_2026.json';

export const LITURGIA_DB: Record<string, any> = liturgiaRawData;
export const CANTOS_DB: Record<string, any> = cantosRawData;
export const ORDINARIO_DB: any = ordinarioRawData;
export const RITUALES_DB: any = ritualesRawData;
export const CALENDARIO_MEXICANO_DB: Record<string, any> = calendarioMexicanoData;
export { SANTORAL_FIJO } from './liturgicalLectionary';
export { getSundayLectionary } from './leccionarioDominical';
export { getFerialLectionary } from './leccionarioFerial';

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
  },
  {
    id: 'santa-maria-del-camino',
    titulo: 'Santa María del Camino',
    momento: 'Mariano',
    tiempo: 'Tiempo Ordinario / Mariano',
    tonalidad: 'Do Mayor (C)',
    acordes: 'C - F - C - G7 - C',
    autor: 'Juan Antonio Espinosa',
    youtubeQuery: 'Santa Maria del Camino Juan Antonio Espinosa',
    letra: `ESTROFA 1
(C) Mientras recorres la (F) vida,
tú nunca (C) solo estás;
(F) contigo por el ca(C)mino,
(G7) Santa María (C) va.

CORO
(F) Ven con nosotros a ca(C)minar,
(G7) Santa María, (C) ven. (Bis)`
  },
  {
    id: 'la-guadalupana',
    titulo: 'La Guadalupana (Desde el cielo una hermosa mañana)',
    momento: 'Mariano',
    tiempo: 'Solemnidad de Ntra. Sra. de Guadalupe / Fiestas Patronales',
    tonalidad: 'Sol Mayor (G)',
    acordes: 'G - D7 - C - G',
    autor: 'Tradicional Mexicano',
    youtubeQuery: 'Desde el cielo una hermosa mañana la Guadalupana',
    letra: `CORO
(G) Desde el cielo una hermosa ma(D7)ñana, (Bis)
la Guadalupana, (G) la Guadalupana,
la Guadalu(D7)pana bajó al Tepe(G)yac. (Bis)

ESTROFA 1
(G) Suplicante juntaba sus (D7) manos, (Bis)
y eran mexicanos, (G) y eran mexicanos,
y eran mexi(D7)canos su porte y su (G) faz. (Bis)`
  },
  {
    id: 'entre-tus-manos',
    titulo: 'Entre tus Manos',
    momento: 'Ofertorio',
    tiempo: 'Tiempo Ordinario / Cuaresma / Exequias',
    tonalidad: 'Re Mayor (D)',
    acordes: 'D - Em - A7 - D - D7 - G',
    autor: 'Ray Repp',
    youtubeQuery: 'Entre tus manos pongo mi existir',
    letra: `CORO
(D) Entre tus (Em) manos (A7) está mi vi(D)da, Señor.
(D) Entre tus (Em) manos (A7) pongo mi exis(D)tir.
(D7) Hay que mo(G)rir, (A7) para vi(D)vir.
(D) Entre tus (Em) manos (A7) confío mi ser.`
  },
  {
    id: 'saber-que-vendras',
    titulo: 'Saber que Vendrás',
    momento: 'Ofertorio',
    tiempo: 'Tiempo Ordinario / Adviento / Pascua',
    tonalidad: 'Do Mayor (C)',
    acordes: 'C - G - Am - Em - F - G',
    autor: 'Bob Dufford / Adaptación Litúrgica',
    youtubeQuery: 'En este mundo que Cristo nos da saber que vendras',
    letra: `ESTROFA 1
(C) En este mundo que (G) Cristo nos da,
(Am) hacemos la ofrenda del (Em) pan,
(F) el pan de nuestro tra(C)bajo sin fin,
(F) y el vino de nuestro can(G)tar.

CORO
(F) Saber que ven(G)drás, (Em) saber que esta(Am)rás,
(F) partiendo a los (G) pobres tu (C) pan. (Bis)`
  },
  {
    id: 'una-espiga',
    titulo: 'Una Espiga Dorada por el Sol',
    momento: 'Comunión',
    tiempo: 'Tiempo Ordinario / Eucaristía',
    tonalidad: 'Re Mayor (D)',
    acordes: 'D - A7 - G - D',
    autor: 'Cesáreo Gabaráin',
    youtubeQuery: 'Una espiga dorada por el sol Cesáreo Gabarain',
    letra: `ESTROFA 1
(D) Una espiga do(A7)rada por el (D) sol,
el racimo que corta el viña(A7)dor,
(G) se convierten a(D)hora en Pan y (A7) Vino de a(D)mor,
(G) en el Cuerpo y la (D) Sangre del Se(A7)ñor. (Bis)`
  },
  {
    id: 'altisimo-senor',
    titulo: 'Altísimo Señor (Alabanza Eucarística)',
    momento: 'Comunión',
    tiempo: 'Solemnidad del Corpus Christi / Hora Santa',
    tonalidad: 'Fa Mayor (F)',
    acordes: 'F - C7 - Bb - F',
    autor: 'Tradicional Mexicano S. XVIII',
    youtubeQuery: 'Altisimo Señor que supiste juntar',
    letra: `CORO
(F) ¡Altísimo Señor, que su(C7)piste jun(F)tar,
a un tiempo en el altar, ser cor(C7)dero y pas(F)tor!
(Bb) Quisiera con fer(F)vor a(C7)mar y recibir
(F) a quien por mí quiso mo(C7)rir. (Bis)`
  },
  {
    id: 'demos-gracias',
    titulo: 'Demos Gracias al Señor, Demos Gracias',
    momento: 'Salida',
    tiempo: 'Tiempo Ordinario / Acción de Gracias',
    tonalidad: 'Sol Mayor (G)',
    acordes: 'G - C - D7 - G',
    autor: 'Cesáreo Gabaráin',
    youtubeQuery: 'Demos gracias al Señor demos gracias Cesáreo Gabarain',
    letra: `CORO
(G) Demos gracias al Se(C)ñor, demos (G) gracias,
(D7) demos gracias al Se(G)ñor. (Bis)

ESTROFA 1
(G) Por las mañanas las aves cantan,
las ala(C)banzas a Cristo Salva(D7)dor;
y por las (G) tardes las flores cantan,
las ala(D7)banzas a Cristo Salva(G)dor.`
  },
  {
    id: 'alrededor-de-tu-mesa',
    titulo: 'Alrededor de tu Mesa',
    momento: 'Entrada',
    tiempo: 'Tiempo Ordinario',
    tonalidad: 'Do Mayor (C)',
    acordes: 'C - F - G - C - Am - Dm',
    autor: 'Francisco Palazón',
    youtubeQuery: 'Alrededor de tu mesa venimos a recordar Francisco Palazón',
    letra: `CORO
(C) Alrededor de tu (F) mesa,
(G) venimos a recor(C)dar,
(Am) que tu palabra es ca(Dm)mino,
(G) tu cuerpo fraterno (C) pan. (Bis)`
  },
  {
    id: 'senor-ten-piedad-mejia',
    titulo: 'Señor, Ten Piedad (Mejía)',
    momento: 'Kyrie',
    tiempo: 'Todos los tiempos',
    tonalidad: 'Re menor (Dm)',
    acordes: 'Dm - Gm - A7 - Dm',
    autor: 'Alejandro Mejía',
    youtubeQuery: 'Señor ten piedad Alejandro Mejia Misa Melodica',
    letra: `(Dm) Señor, ten pie(Gm)dad de no(A7)sotros. (Bis)
(Gm) Cristo, ten pie(C)dad de no(F)sotros. (Bis)
(Dm) Señor, ten pie(Gm)dad de no(A7)sotros. (Bis)`
  }
];

/**
 * Resolves or builds a full LiturgicalDay object for any given ISO date string (YYYY-MM-DD)
 */
export function getLiturgicalDay(isoDate: string): LiturgicalDay {
  const dateObj = parseDateISO(isoDate);
  const seasonInfo = getLiturgicalSeasonInfo(dateObj);
  const dayOfWeek = dateObj.getUTCDay(); // 0=Dom, 1=Lun, 2=Mar, 3=Mie, 4=Jue, 5=Vie, 6=Sab

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
      cantos_sugeridos: raw.cantos_sugeridos || getSuggestedChantsForDay(
        raw.tiempo_liturgico || seasonInfo.tiempo,
        (raw.color as LiturgicalColor) || seasonInfo.color,
        raw.titulo_celebracion || seasonInfo.tituloCelebracion,
        raw.liturgia_palabra,
        isoDate
      )
    };
  }

  // Check Official Mexican Episcopal Calendar (CEM 2025-2026) and Santoral Romano
  const monthDay = isoDate.substring(5); // "08-26"
  const mexEntry = CALENDARIO_MEXICANO_DB[isoDate];
  const santoralEntry = SANTORAL_FIJO[monthDay];

  const color = (mexEntry?.color as LiturgicalColor) || (santoralEntry?.color as LiturgicalColor) || seasonInfo.color;
  const grado = (mexEntry?.grado as any) || (santoralEntry?.grado as any) || seasonInfo.grado;
  const titulo = mexEntry?.titulo_celebracion || santoralEntry?.titulo_celebracion || seasonInfo.tituloCelebracion;
  const tiempo = mexEntry?.tiempo_liturgico || santoralEntry?.tiempo_liturgico || seasonInfo.tiempo;

  // Resolve Sunday, Sanctoral or Ferial Lectionary
  const isSundayCelebration = grado === 'Domingo' || seasonInfo.grado === 'Domingo' || dayOfWeek === 0;
  const sundayEntry = isSundayCelebration ? getSundayLectionary(seasonInfo.semanaNumero || 21, seasonInfo.ciclo) : null;
  const ferialEntry = (!isSundayCelebration && dayOfWeek >= 1 && dayOfWeek <= 6)
    ? getFerialLectionary(seasonInfo.semanaNumero || 21, dayOfWeek, seasonInfo.anoFerial)
    : null;

  const hasProperSanctoralReadings = santoralEntry && santoralEntry.primera_lectura && santoralEntry.primera_lectura.texto && santoralEntry.primera_lectura.texto.length > 40;

  const liturgiaPalabra = hasProperSanctoralReadings ? {
    primera_lectura: santoralEntry.primera_lectura!,
    salmo_responsorial: santoralEntry.salmo_responsorial || {
      cita: 'Salmo Responsorial',
      respuesta: 'El Señor es mi luz y mi salvación.',
      texto: 'El Señor es la defensa de mi vida.'
    },
    segunda_lectura: santoralEntry.segunda_lectura,
    aclamacion_evangelio: santoralEntry.aclamacion_evangelio || {
      texto: 'R. Aleluya, aleluya.\nLa palabra de Dios es viva y eficaz.\nR. Aleluya.'
    },
    evangelio: santoralEntry.evangelio || {
      titulo: 'Santo Evangelio',
      cita: 'Lectura del santo Evangelio',
      texto: 'En aquel tiempo...'
    }
  } : sundayEntry ? {
    primera_lectura: sundayEntry.primera_lectura,
    salmo_responsorial: sundayEntry.salmo_responsorial,
    segunda_lectura: sundayEntry.segunda_lectura,
    aclamacion_evangelio: sundayEntry.aclamacion_evangelio,
    evangelio: sundayEntry.evangelio,
  } : ferialEntry ? {
    primera_lectura: ferialEntry.primera_lectura,
    salmo_responsorial: ferialEntry.salmo_responsorial,
    aclamacion_evangelio: ferialEntry.aclamacion_evangelio,
    evangelio: ferialEntry.evangelio
  } : {
    primera_lectura: {
      titulo: 'Primera Lectura',
      cita: 'Lectura bíblica de la feria',
      texto: 'Proclamación de la Palabra de Dios según el Leccionario Romano.',
      monicion: 'Escuchemos con fe la Palabra salvadora del Señor.'
    },
    salmo_responsorial: {
      cita: 'Salmo Responsorial',
      respuesta: 'Dichoso el que confía en el Señor.',
      texto: 'Dichoso el hombre que no sigue el consejo de los impíos, sino que en la ley del Señor se deleita.'
    },
    aclamacion_evangelio: {
      texto: 'R. Aleluya, aleluya.\nTus palabras, Señor, son espíritu y vida.\nR. Aleluya.'
    },
    evangelio: {
      titulo: 'Santo Evangelio',
      cita: 'Lectura del santo Evangelio',
      texto: 'En aquel tiempo, Jesús enseñaba a sus discípulos...',
      monicion: 'De pie, con devoción y alegría, aclamemos el santo Evangelio.'
    }
  };

  const antifonaEntrada = santoralEntry?.antifona_entrada || sundayEntry?.antifona_entrada || ferialEntry?.antifona_entrada || 'El Señor es la fuerza de su pueblo, el baluarte de salvación para su Ungido.';
  const oracionColecta = santoralEntry?.oracion_colecta || sundayEntry?.oracion_colecta || ferialEntry?.oracion_colecta || 'Dios todopoderoso y eterno, que unes en un solo querer los corazones de tus fieles, concédenos amar lo que mandas y desear lo que prometes, para que, en medio de las vicisitudes del mundo, nuestros corazones estén firmes donde se encuentran los verdaderos gozos. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos. Amén.';
  const oracionOfrendas = santoralEntry?.oracion_ofrendas || sundayEntry?.oracion_ofrendas || ferialEntry?.oracion_ofrendas || 'Acepta con bondad, Señor, los dones que con reverencia te presentamos, y transforma este sacrificio en prenda de salvación eterna. Por Jesucristo, nuestro Señor. Amén.';
  const antifonaComunion = santoralEntry?.antifona_comunion || sundayEntry?.antifona_comunion || ferialEntry?.antifona_comunion || 'El que come mi carne y bebe mi sangre tiene vida eterna, y yo lo resucitaré en el último día, dice el Señor.';
  const oracionComunion = santoralEntry?.oracion_comunion || sundayEntry?.oracion_comunion || ferialEntry?.oracion_comunion || 'Te pedimos, Señor, que los sagrados misterios que hemos recibido nos purifiquen de todo mal y nos unan en el vínculo de tu divino amor. Por Jesucristo, nuestro Señor. Amén.';

  const isGloria = color === 'Blanco' || grado === 'Solemnidad' || grado === 'Fiesta' || (tiempo.includes('Ordinario') && isSundayCelebration);
  const isCredo = grado === 'Solemnidad' || isSundayCelebration;

  return {
    fecha: isoDate,
    dia_semana: seasonInfo.diaSemana,
    tiempo_liturgico: tiempo,
    color: color,
    grado: grado,
    titulo_celebracion: titulo,
    celebracion: titulo,
    ciclo: seasonInfo.ciclo,
    ano_ferial: seasonInfo.anoFerial,
    fuente_oficial: 'Ordo Litúrgico de la Conferencia del Episcopado Mexicano (CEM) y Misal Romano',
    monicion_entrada: santoralEntry?.primera_lectura?.monicion ? `Hermanos: Sean bienvenidos a la celebración de ${titulo}. Que la escucha atenta de la Palabra y la comunión eucarística renueven nuestra vida en Cristo.` : (sundayEntry?.monicion_entrada || `Hermanos: Con gozo santo nos congregamos hoy para celebrar ${titulo}. Que el Señor ilumine nuestras vidas con la gracia de su Santo Espíritu.`),
    antifona_entrada: antifonaEntrada,
    gloria: isGloria,
    oracion_colecta: oracionColecta,
    liturgia_palabra: liturgiaPalabra,
    credo: isCredo,
    oracion_fieles: [
      'Por la Santa Iglesia de Dios y por el Santo Padre, para que continúe guiando al Pueblo de Dios con fidelidad evangélica. Roguemos al Señor.',
      'Por la paz en México y en el mundo entero, para que cesen las discordias y florezca la justicia y la fraternidad. Roguemos al Señor.',
      'Por los enfermos, los migrantes y todos los que sufren, para que encuentren fortaleza en la cruz redentora de Cristo. Roguemos al Señor.',
      'Por nuestra comunidad parroquial, para que fructifiquemos en santidad, obras de misericordia y vocaciones consagradas. Roguemos al Señor.'
    ],
    oracion_ofrendas: oracionOfrendas,
    antifona_comunion: antifonaComunion,
    oracion_comunion: oracionComunion,
    reflexion_homiletica: (sundayEntry?.reflexion_homiletica) || (santoralEntry?.reflexion_homiletica) || [
      `La celebración de ${titulo} nos recuerda que la santidad es la vocación universal de todo bautizado. La Palabra de Dios proclamada hoy nos urge a vivir con coherencia evangélica en medio de las realidades cotidianas.`,
      `Al alimentarnos del Pan bajado del cielo, imploramos la fortaleza del Espíritu Santo para dar testimonio valiente de nuestra fe y ser constructores de comunión, verdad y esperanza en nuestras familias.`
    ],
    cantos_sugeridos: getSuggestedChantsForDay(
      tiempo,
      color,
      titulo,
      liturgiaPalabra,
      isoDate
    )
  };
}
