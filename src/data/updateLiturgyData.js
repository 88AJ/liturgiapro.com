import fs from 'fs';

let content = fs.readFileSync('/Users/fr.alansanchez/Antigravity/Liturgia-PRO/src/data/liturgyData.ts', 'utf-8');

// Ensure import of getFerialLectionary
if (!content.includes("getFerialLectionary")) {
  content = content.replace(
    "import { getSundayLectionary } from './leccionarioDominical';",
    "import { getSundayLectionary } from './leccionarioDominical';\nimport { getFerialLectionary } from './leccionarioFerial';"
  );
  content = content.replace(
    "export { getSundayLectionary } from './leccionarioDominical';",
    "export { getSundayLectionary } from './leccionarioDominical';\nexport { getFerialLectionary } from './leccionarioFerial';"
  );
}

// Find getLiturgicalDay implementation and replace with comprehensive resolution
const startMarker = 'export function getLiturgicalDay(isoDate: string): LiturgicalDay {';
const startIndex = content.indexOf(startMarker);

if (startIndex !== -1) {
  const newFunctionBody = `export function getLiturgicalDay(isoDate: string): LiturgicalDay {
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
      texto: 'R. Aleluya, aleluya.\\nLa palabra de Dios es viva y eficaz.\\nR. Aleluya.'
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
      texto: 'R. Aleluya, aleluya.\\nTus palabras, Señor, son espíritu y vida.\\nR. Aleluya.'
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
    monicion_entrada: santoralEntry?.primera_lectura?.monicion ? \`Hermanos: Sean bienvenidos a la celebración de \${titulo}. Que la escucha atenta de la Palabra y la comunión eucarística renueven nuestra vida en Cristo.\` : (sundayEntry?.monicion_entrada || \`Hermanos: Con gozo santo nos congregamos hoy para celebrar \${titulo}. Que el Señor ilumine nuestras vidas con la gracia de su Santo Espíritu.\`),
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
      \`La celebración de \${titulo} nos recuerda que la santidad es la vocación universal de todo bautizado. La Palabra de Dios proclamada hoy nos urge a vivir con coherencia evangélica en medio de las realidades cotidianas.\`,
      \`Al alimentarnos del Pan bajado del cielo, imploramos la fortaleza del Espíritu Santo para dar testimonio valiente de nuestra fe y ser constructores de comunión, verdad y esperanza en nuestras familias.\`
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
`;

  content = content.slice(0, startIndex) + newFunctionBody;
  fs.writeFileSync('/Users/fr.alansanchez/Antigravity/Liturgia-PRO/src/data/liturgyData.ts', content);
  console.log('Successfully updated liturgyData.ts!');
}
