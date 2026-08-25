import fs from 'fs';

function clean(str) {
  if (!str) return '';
  return str
    .replace(/<br\s*[\/]?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<\/div>/gi, '\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&laquo;/g, '«')
    .replace(/&raquo;/g, '»')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&aacute;/g, 'á')
    .replace(/&eacute;/g, 'é')
    .replace(/&iacute;/g, 'í')
    .replace(/&oacute;/g, 'ó')
    .replace(/&uacute;/g, 'ú')
    .replace(/&ntilde;/g, 'ñ')
    .replace(/&Aacute;/g, 'Á')
    .replace(/&Eacute;/g, 'É')
    .replace(/&Iacute;/g, 'Í')
    .replace(/&Oacute;/g, 'Ó')
    .replace(/&Uacute;/g, 'Ú')
    .replace(/&Ntilde;/g, 'Ñ')
    .replace(/\r/g, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

const dir = "/Users/fr.alansanchez/Antigravity/pascua-2026/";

function parseHtmlIntoSections(html) {
  const h2Splits = html.split(/(?=<h2[^>]*>)/i);
  const result = [];
  
  h2Splits.forEach((chunk, idx) => {
    if (!chunk.includes('<h2')) return;
    const h2Match = chunk.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
    const title = h2Match ? clean(h2Match[1]) : `Parte ${idx}`;
    
    const rawContent = chunk.replace(/<h2[\s\S]*?<\/h2>/i, '');
    const h3Splits = rawContent.split(/(?=<h3[^>]*>)/i);
    
    const secciones = [];
    h3Splits.forEach((subChunk) => {
      const h3Match = subChunk.match(/<h3[^>]*>([\s\S]*?)<\/h3>/i);
      const subTitle = h3Match ? clean(h3Match[1]) : undefined;
      const body = subChunk.replace(/<h3[\s\S]*?<\/h3>/i, '').trim();
      const cleanedBody = clean(body);
      
      if (cleanedBody.length > 0) {
        let tipo = 'sacerdote';
        const lower = (subTitle || '').toLowerCase();
        if (lower.includes('rubrica') || lower.includes('procesión') || subChunk.includes('class="rubrica"')) {
          tipo = 'rubrica';
        } else if (lower.includes('monición') || lower.includes('monicion')) {
          tipo = 'monicion';
        } else if (lower.includes('lectura') || lower.includes('evangelio') || lower.includes('pasión') || lower.includes('salmo') || lower.includes('epístola')) {
          tipo = 'lectura';
        } else if (lower.includes('antífona') || lower.includes('canto') || lower.includes('himno') || lower.includes('gloria') || lower.includes('secuencia') || lower.includes('pregón')) {
          tipo = 'canto';
        } else if (lower.includes('diálogo') || lower.includes('dialogo') || lower.includes('letanías') || lower.includes('preparación del cirio') || lower.includes('examen')) {
          tipo = 'dialogo';
        }
        
        secciones.push({
          tipo: tipo,
          titulo: subTitle,
          texto: cleanedBody
        });
      }
    });
    
    if (secciones.length > 0) {
      result.push({
        id: `sec_${idx}`,
        nombre: title,
        secciones: secciones
      });
    }
  });
  
  return result;
}

const ramosParts = parseHtmlIntoSections(fs.readFileSync(dir + 'misal-ramos.html', 'utf-8'));
const juevesParts = parseHtmlIntoSections(fs.readFileSync(dir + 'misal-jueves.html', 'utf-8'));
const viernesParts = parseHtmlIntoSections(fs.readFileSync(dir + 'misal-viernes.html', 'utf-8'));
const vigiliaParts = parseHtmlIntoSections(fs.readFileSync(dir + 'misal-vigilia.html', 'utf-8'));
const domingoParts = parseHtmlIntoSections(fs.readFileSync(dir + 'misal-domingo.html', 'utf-8'));

const ramosSacristia = {
  reglasOro: [
    'Las vestiduras son de color ROJO para el celebrante, concelebrantes y diácono.',
    'Tener agua bendita con hisopo y acetre preparado en el atrio o lugar exterior de bendición.',
    'Tener preparados 3 micrófonos o atriles si la Pasión se lee a tres voces (Cronista, Pueblo, Cristo).'
  ],
  vestiduras: [
    'Casulla roja y estola roja para el sacerdote celebrante.',
    'Capa pluvial roja (opcional pero muy recomendada para la procesión de entrada).',
    'Albas y cíngulos para acólitos y lectores.'
  ],
  altarYCredencia: [
    'Ramos de palma o laurel en la mesa de bendición.',
    'Misal Romano marcado en Domingo de Ramos y Leccionario de la Pasión.',
    'Cáliz con purificador, patena con hostia grande, copones con formas suficientes.',
    'Vinajeras con agua y vino, lavabo y manutergio.'
  ],
  elementosEspeciales: [
    'Acetre con agua bendita e hisopo.',
    'Incensario con carbón encendido y naveta con incienso para la procesión.',
    'Cruz alta engalanada con un ramo o velo rojo y ciriales para encabezar la procesión.'
  ],
  checklists: [
    {
      momento: 'Antes de la Misa (Preparación Atrio)',
      items: [
        { id: 'ramos_mesa', texto: 'Mesa exterior con mantel y ramos listos para bendecir.' },
        { id: 'ramos_agua', texto: 'Acetre y aspersorio con agua bendita en el punto de partida.' },
        { id: 'ramos_incienso', texto: 'Carbón encendido listo en el incensario.' },
        { id: 'ramos_pasion', texto: 'Libros de la Pasión colocados en los atriles de los tres lectores.' }
      ]
    },
    {
      momento: 'Durante la Procesión',
      items: [
        { id: 'ramos_cruz', texto: 'Cruz procesional al frente con ciriales a los lados.' },
        { id: 'ramos_turif', texto: 'Turiferario precediendo al sacerdote.' },
        { id: 'ramos_orden', texto: 'Ujieres guiando al pueblo hacia las naves del templo.' }
      ]
    }
  ]
};

const ramosCantoral = [
  {
    momento: 'Bendición y Procesión de Ramos',
    titulo: '¡Hosanna al Hijo de David!',
    tonalidad: 'Re Mayor',
    letra: '¡Hosanna al Hijo de David!\n¡Bendito el que viene en el nombre del Señor!\n¡El Rey de Israel!\n¡Hosanna, hosanna en el cielo!',
    acordes: 'D - A - G - D / G - D - A7 - D'
  },
  {
    momento: 'Procesión hacia el Altar',
    titulo: 'Los Niños Hebreos',
    tonalidad: 'Mi Menor',
    letra: 'Los niños hebreos, llevando ramos de olivo,\nsalieron al encuentro del Señor aclamando:\n¡Hosanna en el cielo! ¡Hosanna en las alturas!',
    acordes: 'Em - D - C - B7 / Em - Am - B7 - Em'
  },
  {
    momento: 'Comunión',
    titulo: 'Cuerpo de Cristo, Pan de Vida',
    tonalidad: 'Sol Mayor',
    letra: 'Tomad y comed, este es mi Cuerpo;\ntomad y bebed, esta es mi Sangre.\nHaced esto en memoria mía.',
    acordes: 'G - C - D - G / Em - C - D7 - G'
  }
];

const ramosMinisterios = {
  monaguillos: [
    'El incensario debe abrir la marcha de la procesión exterior.',
    'Dos acólitos con ciriales flanquean la Cruz procesional.',
    'Durante la lectura de la Pasión, los monaguillos permanecen sentados o de pie en reverente silencio; no se llevan ciriales ni incienso al ambón.'
  ],
  mec: [
    'Purificar los copones con sumo respeto tras la comunión multitudinaria.',
    'Distribuir con calma ante la alta afluencia de fieles con ramos.'
  ],
  lectores: [
    'Ensayar la lectura de la Pasión a tres voces previamente con el cronista y sacerdote.',
    'Respetar el momento solemne de ponerse de rodillas tras la muerte del Señor.'
  ],
  ujieres: [
    'Distribuir ramos a los fieles a la entrada del atrio.',
    'Cuidar el orden de acceso al templo al concluir la procesión.',
    'Hacer la colecta parroquial de forma ágil durante el ofertorio.'
  ]
};

const juevesSacristia = {
  reglasOro: [
    'Dejar el Sagrario completamente ABIERTO y VACÍO antes de la Misa.',
    'Consagrar copones suficientes con hostias para la comunión de Jueves y Viernes Santo.',
    'Tener listo el lebrillo, jarra con agua tibia, jabón suave y 12 toallas limpias para el lavatorio.',
    'Desnudar el altar completamente (despojo) al terminar la Misa en reverente silencio.'
  ],
  vestiduras: [
    'Casulla blanca/dorada festiva para el celebrante.',
    'Velo humeral blanco para el traslado del Santísimo.',
    'Toalla para ceñirse el sacerdote durante el lavatorio.'
  ],
  altarYCredencia: [
    'Copón principal y copones auxiliares con formas suficientes.',
    'Cáliz con purificador y corporal.',
    'Lebrillo y jarra con agua tibia.',
    '12 toallas blancas limpias.',
    'Matraca de madera para suplir las campanas.'
  ],
  elementosEspeciales: [
    'Monumento o capilla de reserva bellamente adornada con flores y cirios para la adoración.',
    'Dos incensarios con carbón abundante para el traslado.',
    'Velo humeral blanco/dorado.',
    'Cirio o lámparas de adoración.'
  ],
  checklists: [
    {
      momento: 'Antes de la Misa Vespertina',
      items: [
        { id: 'jueves_sagrario_vacio', texto: 'Verificar sagrario principal abierto y sin reserva.' },
        { id: 'jueves_formas', texto: 'Calcular hostias para Jueves y Viernes Santo en los copones.' },
        { id: 'jueves_lavatorio_kit', texto: 'Jarra con agua tibia, lebrillo y toallas colocadas junto a las sillas de los 12.' },
        { id: 'jueves_monumento', texto: 'Monumento de reserva preparado con corporal, llave y cirios.' }
      ]
    },
    {
      momento: 'Al terminar la Misa (Despojo del Altar)',
      items: [
        { id: 'jueves_despojo', texto: 'Retirar manteles, velas y flores del altar principal.' },
        { id: 'jueves_cruces', texto: 'Cubrir o retirar las cruces del templo si es costumbre.' },
        { id: 'jueves_adoracion', texto: 'Iniciar los turnos de guardia y Hora Santa ante el Monumento.' }
      ]
    }
  ]
};

const juevesCantoral = [
  {
    momento: 'Gloria',
    titulo: 'Gloria a Dios en el Cielo (Festivo)',
    tonalidad: 'Sol Mayor',
    letra: 'Gloria a Dios en el cielo, y en la tierra paz a los hombres que ama el Señor...\n(Repique jubiloso de campanas)',
    acordes: 'G - D - Em - C / G - D7 - G'
  },
  {
    momento: 'Lavatorio de los Pies',
    titulo: 'Un Mandamiento Nuevo',
    tonalidad: 'Re Mayor',
    letra: 'Un mandamiento nuevo nos da el Señor:\nque nos amemos todos como Él nos amó.\nLa señal de los cristianos es amarnos como hermanos.',
    acordes: 'D - A7 - D / G - D - A7 - D'
  },
  {
    momento: 'Traslado del Santísimo',
    titulo: 'Pange Lingua / Cantemos al Amor de los Amores',
    tonalidad: 'Re Menor / Fa Mayor',
    letra: 'Cantemos al Amor de los amores, cantemos al Señor.\n¡Dios está aquí! Venid adoradores, adoremos a Cristo Redentor.\n¡Gloria a Cristo Jesús! Cielos y tierra, bendecid al Señor.',
    acordes: 'F - C - Dm - Bb / F - C7 - F'
  }
];

const juevesMinisterios = {
  monaguillos: [
    'Tocar campanillas vigorosamente durante el himno del Gloria.',
    'Acompañar con jarra y toallas al sacerdote durante el lavatorio.',
    'Dos turiferarios con incensarios encendidos marchan delante del Santísimo en el traslado.'
  ],
  mec: [
    'Apoyar en la comunión del pueblo bajo las dos especies si está prescrito.',
    'Acompañar en la adoración eucarística nocturna por turnos.'
  ],
  lectores: [
    'Proclamar el texto de la Institución con unción y claridad.',
    'Animar los salmos de adoración en el Monumento.'
  ],
  ujieres: [
    'Coordinar el paso de los fieles hacia el Monumento al finalizar la Misa.',
    'Guardar el silencio sagrado en el templo durante la noche de adoración.'
  ]
};

const juevesSubsidios = [
  {
    titulo: 'Guion de la Hora Santa ante el Monumento',
    tipo: 'horasanta',
    contenido: `I. CANTO DE ENTRADA: Altísimo Señor o Cantemos al Amor de los Amores.

II. EXPOSICIÓN Y SILENCIO DE ADORACIÓN (10 min)
Sacerdote: «Alabado sea el Santísimo Sacramento del Altar»
Pueblo: «Sea por siempre bendito y alabado».

III. LECTURA DEL EVANGELIO DE GETSEMANÍ (Mt 26, 36-46):
«Llegó Jesús con ellos a un huerto llamado Getsemaní y dijo: "Quédense aquí y velen conmigo". Y cayendo rostro en tierra suplicaba: "Padre mío, si es posible, aparta de mí este cáliz; pero no se haga mi voluntad, sino la tuya"».

IV. MEDITACIÓN: La soledad de Jesús en el huerto, la agonía por los pecados de la humanidad y la llamada a consolar su Corazón Eucarístico.

V. PRECES POR LOS SACERDOTES Y POR LA IGLESIA.

VI. RESERVA EN SILENCIO (a medianoche concluye la adoración solemne y queda en intimidad).`
  }
];

const viernesSacristia = {
  reglasOro: [
    'El altar debe estar TOTALMENTE DESNUDO al inicio (sin manteles, sin velas, sin cruz).',
    'Tener preparada la Cruz velada para la ostensión y adoración.',
    'Tener listos dos ciriales para acompañar la Cruz y para el traslado del Santísimo desde el Monumento.',
    'Vestiduras ROJAS para el celebrante y diácono.'
  ],
  vestiduras: [
    'Casulla roja y estola roja para el celebrante.',
    'Albas y cíngulos para los acólitos.'
  ],
  altarYCredencia: [
    'Mantel de comunión doblado en la credencia (se coloca únicamente para el rito de comunión).',
    'Corporal, purificador y vaso con agua para purificar los dedos.',
    'Velo humeral rojo o blanco para traer el Santísimo del Monumento.'
  ],
  elementosEspeciales: [
    'Cruz grande de madera digna, cubierta con velo morado o rojo fácil de desvelar en tres partes.',
    'Cojín o paño para la base de la cruz durante la adoración.',
    'Matraca de madera para convocar al viacrucis y a la liturgia.'
  ],
  checklists: [
    {
      momento: 'Antes de la Celebración de la Pasión',
      items: [
        { id: 'viernes_cruz_velada', texto: 'Cruz procesional o de adoración cubierta con velo en sacristía.' },
        { id: 'viernes_altar_desnudo', texto: 'Confirmar altar sin ningún elemento decorativo.' },
        { id: 'viernes_leccionario_pasion', texto: 'Leccionario abierto en la Pasión según San Juan (Jn 18–19).' },
        { id: 'viernes_humeral', texto: 'Velo humeral listo para el traslado de comunión.' }
      ]
    }
  ]
};

const viernesCantoral = [
  {
    momento: 'Ostensión de la Cruz',
    titulo: 'Mirad el Árbol de la Cruz',
    tonalidad: 'La Menor',
    letra: 'V. Mirad el árbol de la cruz, donde estuvo clavada la salvación del mundo.\nR. ¡Venid a adorar! ¡Venid a adorar!',
    acordes: 'Am - G - F - E / Am - Dm - E7 - Am'
  },
  {
    momento: 'Adoración de la Cruz',
    titulo: 'Pueblo Mío (Los Improperios)',
    tonalidad: 'Re Menor',
    letra: 'Pueblo mío, ¿qué te he hecho? ¿En qué te he ofendido? ¡Respóndeme!\nYo te saqué de Egipto y te guié por el desierto,\ny tú has preparado una cruz para tu Salvador.\n¡Santo Dios, Santo y Fuerte, Santo e Inmortal, ten piedad de nosotros!',
    acordes: 'Dm - Gm - A7 - Dm / Gm - C - F - Bb - A7 - Dm'
  },
  {
    momento: 'Viacrucis / Comunión',
    titulo: 'Oh Rostro Lacerado',
    tonalidad: 'Mi Menor',
    letra: 'Oh Rostro Lacerado, bañado en sudor,\nde espinas coronado, herido por mi amor.\nJesús, Cordero manso, clavado en una cruz,\nenséñanos a amarte, divina eterna luz.',
    acordes: 'Em - B7 - Em / Am - Em - B7 - Em'
  }
];

const viernesMinisterios = {
  monaguillos: [
    'Postrarse junto con el sacerdote al entrar al presbiterio en silencio total.',
    'Dos acólitos con ciriales encendidos acompañan la entrada de la Cruz y la reserva eucarística.',
    'No se utiliza incensario ni campanillas en ningún momento de la liturgia del Viernes Santo.'
  ],
  mec: [
    'Distribuir la Eucaristía con suma devoción en la sobriedad del rito de comunión.',
    'Colaborar en el acompañamiento a enfermos con el viático si fuera necesario.'
  ],
  lectores: [
    'Proclamar las 10 intenciones solemnes con dicción clara y pausas reverentes para la oración comunitaria.',
    'Ensayar con esmero el relato de la Pasión de San Juan.'
  ],
  ujieres: [
    'Guiar la fila de veneración de la Santa Cruz para que los fieles puedan adorar con orden (beso o genuflexión).',
    'Colecta pontificia obligatoria por los Santos Lugares de Tierra Santa.'
  ]
};

const viernesSubsidios = [
  {
    titulo: 'Santo Viacrucis Parroquial (14 Estaciones)',
    tipo: 'viacrucis',
    contenido: `1ª Estación: Jesús es condenado a muerte.
«Te adoramos, oh Cristo, y te bendecimos, que por tu santa cruz redimiste al mundo».

2ª Estación: Jesús carga con la cruz.
3ª Estación: Jesús cae por primera vez.
4ª Estación: Jesús encuentra a su afligida Madre.
5ª Estación: Simón de Cirene ayuda a Jesús a llevar la cruz.
6ª Estación: La Verónica enjuga el rostro de Jesús.
7ª Estación: Jesús cae por segunda vez.
8ª Estación: Jesús consuela a las santas mujeres de Jerusalén.
9ª Estación: Jesús cae por tercera vez.
10ª Estación: Jesús es despojado de sus vestiduras.
11ª Estación: Jesús es clavado en la cruz.
12ª Estación: Jesús muere en la cruz.
13ª Estación: Jesús es bajado de la cruz y puesto en brazos de su Madre.
14ª Estación: Jesús es colocado en el sepulcro.

Oración final por la esperanza de la Resurrección.`
  },
  {
    titulo: 'Sermón de las Siete Palabras en la Cruz',
    tipo: 'sietepalabras',
    contenido: `1ª Palabra: «Padre, perdónalos, porque no saben lo que hacen» (Lc 23, 34).
2ª Palabra: «Hoy estarás conmigo en el paraíso» (Lc 23, 43).
3ª Palabra: «Mujer, ahí tienes a tu hijo. Hijo, ahí tienes a tu madre» (Jn 19, 26-27).
4ª Palabra: «Dios mío, Dios mío, ¿por qué me has abandonado?» (Mt 27, 46).
5ª Palabra: «Tengo sed» (Jn 19, 28).
6ª Palabra: «Todo está cumplido» (Jn 19, 30).
7ª Palabra: «Padre, en tus manos encomiendo mi espíritu» (Lc 23, 46).`
  }
];

const vigiliaSacristia = {
  reglasOro: [
    'La Vigilia DEBE comenzar en la noche, después de anochecer, y concluir antes del amanecer del domingo.',
    'Tener leña seca y encendedor listos en el atrio exterior para la fogata de fuego nuevo.',
    'Cirio Pascual nuevo del año 2026 con los 5 granos de incienso y punzón de marcar.',
    'Agua abundante en la pila bautismal para la bendición y aspersión.',
    'Velitas con cono protector para todos los fieles.'
  ],
  vestiduras: [
    'Casulla blanca/dorada más solemne y festiva del ajuar parroquial.',
    'Dalmaticas blancas para diáconos.',
    'Albas impecables para todos los ministros y acólitos.'
  ],
  altarYCredencia: [
    'Cirio Pascual con candelabro monumental junto al ambón.',
    'Campanas preparadas para el Gloria.',
    'Letanías de los Santos impresas para el coro y cantores.',
    'Hisopo grande y acetres para la aspersión general de los fieles.'
  ],
  elementosEspeciales: [
    'Hoguera exterior con carbones.',
    'Punzón y 5 clavos de incienso rojos/dorados para el Cirio.',
    'Santo Crisma y Óleo de los Catecúmenos si hay bautismos y confirmaciones.',
    'Velas para todos los fieles y servidores.'
  ],
  checklists: [
    {
      momento: 'Antes del Inicio (Atrio y Templo)',
      items: [
        { id: 'vigilia_luces_off', texto: 'Todas las luces interiores y exteriores del templo totalmente apagadas.' },
        { id: 'vigilia_fuego_listo', texto: 'Hoguera exterior con leña y brasas vivas.' },
        { id: 'vigilia_cirio_nuevo', texto: 'Cirio Pascual 2026 listo con estilete y 5 granos de incienso.' },
        { id: 'vigilia_velas_pueblo', texto: 'Ujieres con canastas de velas distribuidas a los fieles.' }
      ]
    },
    {
      momento: 'En el Gloria',
      items: [
        { id: 'vigilia_luces_on', texto: 'Encender iluminación festiva del templo.' },
        { id: 'vigilia_campanas', texto: 'Repique solemne de todas las campanas y campanillas.' },
        { id: 'vigilia_altar_velas', texto: 'Encender los cirios del altar.' }
      ]
    }
  ]
};

const vigiliaCantoral = [
  {
    momento: 'Procesión del Lucernario',
    titulo: 'Luz de Cristo (Lumen Christi)',
    tonalidad: 'Modo Gregoriano',
    letra: 'V. Luz de Cristo.\nR. Demos gracias a Dios.',
    acordes: 'Canto a capela solista / respuesta coral'
  },
  {
    momento: 'Pregón Pascual',
    titulo: 'Exsultet (Pregón Pascual Solemne)',
    tonalidad: 'Modo Pascual',
    letra: 'Alégrese la tierra inundada de tanta claridad,\ny que, radiante con el fulgor del Rey eterno,\nsienta que han desaparecido las tinieblas de todo el orbe.\n¡Cristo ha resucitado de entre los muertos!',
    acordes: 'Recitativo solemne con órgano suave de fondo'
  },
  {
    momento: 'Gloria Pascual',
    titulo: 'Gloria a Dios en el Cielo (Pascual Jubiloso)',
    tonalidad: 'Re Mayor',
    letra: '¡Gloria a Dios en el cielo y en la tierra paz!\nTe alabamos, te bendecimos, te adoramos, te glorificamos...\n(Repique general de campanas y luces plenas)',
    acordes: 'D - G - A - D / Bm - Em - A7 - D'
  },
  {
    momento: 'Aspersión Bautismal',
    titulo: 'Bautízame, Señor, con tu Espíritu / Agua Pura',
    tonalidad: 'Fa Mayor',
    letra: 'Vi que salía agua del lado derecho del templo, ¡Aleluya!\nY todos aquellos a quienes llegó esta agua fueron salvados,\ny cantarán: ¡Aleluya, aleluya!',
    acordes: 'F - C - Dm - Bb / F - C7 - F'
  },
  {
    momento: 'Salida / Resurrección',
    titulo: '¡Resucitó, Resucitó, Resucitó, Aleluya!',
    tonalidad: 'La Menor / Mi Menor',
    letra: '¡Resucitó, resucitó, resucitó, aleluya!\n¡Aleluya, aleluya, aleluya, resucitó!\nLa muerte, ¿dónde está la muerte?\n¿Dónde está mi muerte, dónde su victoria?',
    acordes: 'Am - G - F - E / Am - Dm - E7 - Am'
  }
];

const vigiliaMinisterios = {
  monaguillos: [
    'Acompañar la procesión a oscuras manteniendo la solemnidad del Cirio Pascual.',
    'Encender las velas del altar durante el Gloria con presteza.',
    'Asistir al sacerdote con los óleos y el agua durante los bautismos.'
  ],
  mec: [
    'Apoyar en la logística del bautismo de adultos o niños si los hay.',
    'Distribuir la Eucaristía en la fiesta más grande de la Iglesia.'
  ],
  lectores: [
    'Proclamar las lecturas veterotestamentarias con voz pausada y solemne.',
    'Guiar las respuestas de los salmos responsoriales.'
  ],
  ujieres: [
    'Distribuir las velitas con protectores a todos los asistentes en el atrio.',
    'Cuidar que no se enciendan las velas hasta que el Cirio Pascual ingrese al templo.',
    'Apoyar en el flujo de la aspersión bautismal por las naves.'
  ]
};

const domingoSacristia = {
  reglasOro: [
    'El Cirio Pascual encendido preside junto al ambón durante todas las Misas.',
    'Vestiduras blancas festivas.',
    'Tener agua bendecida en la Noche Santa para el rito de aspersión dominical.'
  ],
  vestiduras: [
    'Casulla blanca y estola festiva.',
    'Albas para todos los ministros.'
  ],
  altarYCredencia: [
    'Mantel blanco festivo con flores abundantes en el presbiterio.',
    'Acetre con hisopo para la aspersión.',
    'Subsidios de la Secuencia Pascual para el coro y los fieles.'
  ],
  elementosEspeciales: [
    'Flores pascuales (azucenas, lilis, orquídeas blancas).',
    'Icono de la Resurrección o imagen de Cristo Resucitado entronizada.'
  ],
  checklists: [
    {
      momento: 'Antes de las Misas del Domingo',
      items: [
        { id: 'pascua_cirio_on', texto: 'Encender el Cirio Pascual antes de iniciar la celebración.' },
        { id: 'pascua_secuencia_libreto', texto: 'Hojas de la Secuencia Victimae Paschali listas en el ambón y coro.' },
        { id: 'pascua_aspersorio', texto: 'Acetre con agua pascual preparado para el rito de entrada.' }
      ]
    }
  ]
};

const domingoCantoral = [
  {
    momento: 'Entrada',
    titulo: 'El Señor Resucitó, ¡Aleluya!',
    tonalidad: 'Sol Mayor',
    letra: 'El Señor resucitó, cantemos con alegría,\ndemos gracias al Señor, aleluya.\nJesucristo que moría en la cruz para salvarnos,\nha vencido a las tinieblas y nos da su vida eterna.',
    acordes: 'G - C - D - G / Em - Am - D7 - G'
  },
  {
    momento: 'Secuencia',
    titulo: 'Victimae Paschali Laudes (Secuencia de Pascua)',
    tonalidad: 'Re Mayor',
    letra: 'Victimae paschali laudes immolent Christiani...\n¡Lucharon vida y muerte en singular batalla y muerto el que es la Vida, triunfante se levanta!',
    acordes: 'D - A - G - D / Bm - F#m - G - A7 - D'
  },
  {
    momento: 'Comunión',
    titulo: 'Este es el Pan de los Hijos / Cristo Nuestra Pascua',
    tonalidad: 'Do Mayor',
    letra: 'Cristo nuestra Pascua ha sido inmolado, aleluya.\nCelebremos la fiesta con el pan de la sinceridad y de la verdad, aleluya.',
    acordes: 'C - G - Am - F / C - G7 - C'
  },
  {
    momento: 'Salida',
    titulo: 'Reina del Cielo, Alégrate (Regina Caeli)',
    tonalidad: 'Fa Mayor',
    letra: 'Reina del cielo, alégrate, aleluya.\nPorque el Señor a quien mereciste llevar, aleluya.\nHa resucitado según su palabra, aleluya.\nRuega al Señor por nosotros, aleluya.',
    acordes: 'F - Bb - C - F / Dm - Gm - C7 - F'
  }
];

const domingoMinisterios = {
  monaguillos: [
    'Portar la Cruz procesional y ciriales con alegría pascual.',
    'Acompañar al sacerdote durante la aspersión por los pasillos.'
  ],
  mec: [
    'Distribuir la Eucaristía a la gran asamblea pascual con reverencia y agilidad.'
  ],
  lectores: [
    'Cantar o recitar la Secuencia Pascual con entonación festiva.'
  ],
  ujieres: [
    'Acoger con felicitaciones pascuales a los fieles a la entrada.',
    'Distribuir los boletines conmemorativos de Pascua.'
  ]
};

const fullData = {
  ramos: {
    id: 'ramos',
    titulo: 'Domingo de Ramos en la Pasión del Señor',
    subtitulo: 'Conmemoración de la Entrada Triunfal del Señor en Jerusalén y Proclamación íntegra de la Pasión',
    tiempo: 'Semana Santa',
    color: 'Rojo',
    colorHex: '#800020',
    lema: '«¡Hosanna al Hijo de David! ¡Bendito el que viene en el nombre del Señor!»',
    descripcion: 'Abre la Semana Santa uniendo el triunfo mesiánico de Cristo en Jerusalén con el anuncio solemne de su Pasión y Muerte en la Cruz.',
    fechaSugerida: '2026-03-29',
    partesMisal: ramosParts,
    sacristia: ramosSacristia,
    cantoral: ramosCantoral,
    ministerios: ramosMinisterios
  },
  jueves: {
    id: 'jueves',
    titulo: 'Jueves Santo de la Cena del Señor',
    subtitulo: 'Misa Vespertina «In Coena Domini», Lavatorio de Pies, Plegaria Eucarística I y Traslado del Santísimo',
    tiempo: 'Triduo Pascual',
    color: 'Blanco',
    colorHex: '#FFFFFF',
    lema: '«Habiendo amado a los suyos que estaban en el mundo, los amó hasta el extremo» (Jn 13, 1)',
    descripcion: 'Inicia el Sacratísimo Triduo Pascual. Celebramos la institución de la Eucaristía, el Orden Sacerdotal y el mandamiento del amor fraterno.',
    fechaSugerida: '2026-04-02',
    partesMisal: juevesParts,
    sacristia: juevesSacristia,
    cantoral: juevesCantoral,
    ministerios: juevesMinisterios,
    subsidios: juevesSubsidios
  },
  viernes: {
    id: 'viernes',
    titulo: 'Viernes Santo de la Pasión del Señor',
    subtitulo: 'Celebración Litúrgica de la Pasión, Proclamación íntegra de San Juan, 10 Oraciones Universales y Adoración de la Cruz',
    tiempo: 'Triduo Pascual',
    color: 'Rojo',
    colorHex: '#800020',
    lema: '«Mirarán al que traspasaron» (Jn 19, 37)',
    descripcion: 'Día de ayuno y abstinencia. La Iglesia no celebra la Eucaristía, sino la solemne acción litúrgica de la Pasión, la Adoración del Árbol de la Cruz y la Sagrada Comunión.',
    fechaSugerida: '2026-04-03',
    partesMisal: viernesParts,
    sacristia: viernesSacristia,
    cantoral: viernesCantoral,
    ministerios: viernesMinisterios,
    subsidios: viernesSubsidios
  },
  vigilia: {
    id: 'vigilia',
    titulo: 'Solemne Vigilia Pascual en la Noche Santa',
    subtitulo: 'La Madre de Todas las Santas Vigilias: Lucernario, Pregón Pascual íntegro, 7 Lecturas del A.T., Bautismos y Eucaristía',
    tiempo: 'Triduo Pascual / Pascua',
    color: 'Blanco',
    colorHex: '#FFFFFF',
    lema: '«¿Por qué buscan entre los muertos al que vive? No está aquí, ¡ha resucitado!» (Lc 24, 5-6)',
    descripcion: 'Cumbre de todo el año cristiano. Celebramos el paso de las tinieblas a la luz mediante el Fuego Nuevo, el Cirio Pascual, la proclamación de las maravillas de la salvación, el Bautismo y la primera Misa de Resurrección.',
    fechaSugerida: '2026-04-04',
    partesMisal: vigiliaParts,
    sacristia: vigiliaSacristia,
    cantoral: vigiliaCantoral,
    ministerios: vigiliaMinisterios
  },
  domingo_pascua: {
    id: 'domingo_pascua',
    titulo: 'Domingo de Pascua de la Resurrección del Señor',
    subtitulo: 'Misa Solemne del Día de Pascua, Secuencia Pascual «Victimae Paschali Laudes» íntegra y Rito de Aspersión',
    tiempo: 'Tiempo Pascual',
    color: 'Blanco',
    colorHex: '#FFFFFF',
    lema: '«¡Este es el día en que actuó el Señor: sea nuestra alegría y nuestro gozo!» (Sal 117)',
    descripcion: 'Día de júbilo supremo. La Iglesia se viste de fiesta para celebrar el triunfo definitivo de Cristo sobre el pecado y la muerte. Se canta la Secuencia Pascual y se renueva la bendición.',
    fechaSugerida: '2026-04-05',
    partesMisal: domingoParts,
    sacristia: domingoSacristia,
    cantoral: domingoCantoral,
    ministerios: domingoMinisterios
  }
};

const output = `import { LiturgicalColor } from '../types/liturgia';

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

export const SEMANA_SANTA_DATA: Record<string, HolyWeekDay> = ${JSON.stringify(fullData, null, 2)};
`;

fs.writeFileSync('/Users/fr.alansanchez/Antigravity/Liturgia-PRO/src/data/semanaSantaData.ts', output);
console.log('Successfully written full in extenso dataset to semanaSantaData.ts!');
