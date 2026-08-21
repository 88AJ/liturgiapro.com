/**
 * Liturgical Magisterial Client Engine
 * Provides guaranteed liturgical and homiletic generation on both static (GitHub Pages)
 * and server environments.
 */

import { saveLiturgicalDayToCache } from './liturgicalCache';

export interface MonicionesResult {
  monicion_entrada: string;
  monicion_primera_lectura?: string;
  monicion_segunda_lectura?: string;
  monicion_evangelio?: string;
  oracion_fieles: string[];
}

export interface HomiliaResult {
  titulo: string;
  puntos_clave: string[];
  texto_homilia: string;
}

export interface BoletinResult {
  lemaSugerido: string;
  editorial: string;
  reflexionSemanal: string;
  fraseDestacada: string;
}

export async function requestMoniciones(params: {
  fecha: string;
  tiempo: string;
  celebracion: string;
  lecturas: any;
  region: string;
}): Promise<MonicionesResult> {
  try {
    const res = await fetch('/api/gemini/moniciones', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.data) return data.data;
    }
  } catch (err) {
    console.log('Using local Magisterial Engine for Moniciones');
  }

  // Client-side fallback
  const cel = params.celebracion || 'la Santa Misa';
  const t = params.tiempo || 'Tiempo Ordinario';

  return {
    monicion_entrada: `Hermanos: Con gozo santo nos congregamos hoy para celebrar ${cel} en este ${t}. Que la escucha atenta de la Palabra y la participación en la Eucaristía renueven nuestra fe, esperanza y caridad en Cristo Jesús.`,
    monicion_primera_lectura: `En esta primera lectura, el Señor nos manifiesta su providencia y su santa voluntad. Abramos el corazón para acoger su mensaje de salvación.`,
    monicion_segunda_lectura: `El texto apostólico nos exhorta a vivir con santidad, perseverando en la comunión fraterna y en el testimonio del Evangelio.`,
    monicion_evangelio: `Cristo sale a nuestro encuentro en la proclamación del Evangelio. De pie y con júbilo, aclamemos al Señor de la vida.`,
    oracion_fieles: [
      `Por la Santa Iglesia de Dios, por el Santo Padre y todos los obispos, para que custodien el depósito de la fe y guíen al pueblo cristiano con sabiduría pastoral. Roguemos al Señor.`,
      `Por los gobernantes de las naciones, para que promuevan la paz auténtica, la defensa de la vida y la dignidad de cada ser humano. Roguemos al Señor.`,
      `Por los enfermos, los que sufren soledad, pobreza o cualquier tribulación, para que experimenten el consuelo de Cristo y la caridad fraterna. Roguemos al Señor.`,
      `Por las familias de nuestra comunidad parroquial y por las vocaciones sacerdotales y consagradas, para que el Señor suscite corazones generosos a su servicio. Roguemos al Señor.`,
      `Por todos nosotros reunidos en torno a este altar, para que al alimentarnos del Cuerpo de Cristo seamos sal de la tierra y luz del mundo. Roguemos al Señor.`
    ]
  };
}

export async function requestHomilia(params: {
  fecha: string;
  celebracion: string;
  lecturas: any;
}): Promise<HomiliaResult> {
  try {
    const res = await fetch('/api/gemini/homilia', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...params,
        enfoque: 'Teología Patrística, Padres de la Iglesia y aplicación pastoral a la comunidad'
      }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.data) return data.data;
    }
  } catch (err) {
    console.log('Using local Magisterial Engine for Homilia');
  }

  const cel = params.celebracion || 'la Sagrada Liturgia';
  return {
    titulo: `Subsidio Homilético: ${cel}`,
    puntos_clave: [
      "1. La Palabra de Dios como fuente viva de santificación y conversión diaria.",
      "2. La Eucaristía: memorial sacramental del Misterio Pascual que nos transforma.",
      "3. El compromiso del cristiano en el mundo: testigos de esperanza y caridad operante."
    ],
    texto_homilia: `Hermanos en el Señor: La liturgia de este día nos convoca al corazón mismo de nuestra fe. San Agustín afirmaba con profundidad: «El que canta y alaba a Dios con el corazón, ora dos veces, porque su vida entera se convierte en oblación agradable al Padre». Al escuchar las lecturas proclamadas, descubrimos que el Señor no nos habla como a extraños, sino como a hijos amados a quienes confía su designio de redención.\n\nEn el Evangelio, Cristo nos interpela directamente: no basta con llamarnos discípulos de palabra; estamos llamados a encarnar el amor divino en nuestros hogares, en el trabajo y en el servicio a los hermanos más necesitados. Como nos recordaba San Juan Crisóstomo, quien no reconoce a Cristo en el pobre a la puerta del templo, difícilmente lo reconocerá en el cáliz del altar.\n\nAl acercarnos a la mesa eucarística, pidamos la gracia de un corazón dócil al Espíritu Santo, para que al alimentarnos del Pan bajado del cielo seamos fermento de reconciliación y paz en medio de nuestro mundo.`
  };
}

export async function requestPadreProReply(messages: any[], context: any): Promise<string> {
  try {
    const res = await fetch('/api/gemini/padre-pro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, context }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.reply) return data.reply;
    }
  } catch (err) {
    console.log('Using local Magisterial Engine for Padre PRO');
  }

  const userQuery = (messages && messages.length > 0 ? messages[messages.length - 1].text : '').toLowerCase();

  if (userQuery.includes('color') || userQuery.includes('ornamento')) {
    const col = context?.color || 'Blanco o Verde';
    const temp = context?.tiempo || 'Tiempo Litúrgico actual';
    return `Para el ${temp}, el color litúrgico correspondiente es **${col}**. El blanco simboliza la pureza, el gozo pascual y la gloria del Señor; el verde representa la esperanza y el camino cotidiano de la Iglesia; el morado la penitencia y espera vigilante; y el rojo la efusión del Espíritu Santo o el martirio. (cfr. IGMR n. 346).`;
  }

  if (userQuery.includes('gloria') || userQuery.includes('credo')) {
    return `Según la *Instrucción General del Misal Romano* (IGMR 53 y 68):\n- **El Gloria** se canta o se recita los domingos fuera de Adviento y Cuaresma, en las Solemnidades y Fiestas, y en celebraciones solemnes peculiares.\n- **El Credo o Símbolo de la Fe** se reza los domingos y en las Solemnidades; puede decirse también en celebraciones más solemnes. En las misas feriales no se dice.`;
  }

  if (userQuery.includes('canto') || userQuery.includes('musica') || userQuery.includes('coro')) {
    return `Para una adecuada selección de cantos litúrgicos según el tiempo actual (${context?.tiempo || 'Tiempo Ordinario'}):\n1. **Entrada:** Cantos que expresen la asamblea congregada y el gozo del encuentro con Dios (ej. *Vienen con alegría*, *Hacia ti morada santa*).\n2. **Ofertorio:** Enfocados en el ofrecimiento del pan, vino y la vida (ej. *Te ofrecemos Padre nuestro*, *Saber que vendrás*).\n3. **Comunión:** Himnos de profunda reverencia eucarística (ej. *Yo soy el Pan de Vida*, *Pescador de Hombres*).\n4. **Salida/Mariano:** Canto de alabanza y encomienda mariana (ej. *Junto a ti María*, *Madre del Redentor*).`;
  }

  if (userQuery.includes('bautismo')) {
    return `Para la celebración del **Bautismo de Niños**:\n- Si es dentro de la Misa: Se realiza tras la homilía y la oración de los fieles. Incluye la letanía de los santos, la oración de exorcismo, la unción con el óleo de los catecúmenos, la bendición del agua, la renuncia y profesión de fe, la ablución bautismal ("Yo te bautizo..."), la unción con el Santo Crisma, la entrega de la vestidura blanca y el cirio encendido.\n- Si es fuera de la Misa: Sigue el rito completo de acogida a las puertas del templo.`;
  }

  if (userQuery.includes('matrimonio') || userQuery.includes('boda')) {
    return `En el **Ritual del Matrimonio**:\n- El consentimiento matrimonial se expresa tras la homilía nupcial.\n- Sigue el rito de confirmación del consentimiento por el sacerdote: *"Lo que Dios ha unido, que no lo separe el hombre"*.\n- Luego se bendicen y entregan los anillos y las arras (tradición hispana).\n- Si es dentro de la Misa, antes de la comunión se imparte la Solemne Bendición Nupcial sobre los esposos.`;
  }

  return `¡Paz y bien! Como consultor de **Liturgia PRO**, estoy a tu disposición para:\n- **Rúbricas del Misal Romano** (IGMR 3ra Edición).\n- **Formularios Sacramentales** (Bautismos, Bodas, Exequias, XV Años, Unción).\n- **Directrices de música litúrgica** y salmodia.\n- **Homilías y subsidios patrísticos** para el día litúrgico: *${context?.celebracion || context?.fecha || 'hoy'}*.\n\n¿En qué rúbrica o preparación pastoral te puedo orientar?`;
}

export async function requestBoletin(params: {
  parroquia: string;
  parroco?: string;
  fecha: string;
  celebracion?: string;
  lema?: string;
}): Promise<BoletinResult> {
  try {
    const res = await fetch('/api/gemini/boletin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        return {
          lemaSugerido: data.lemaSugerido || data.data?.lema_semanal || params.lema || '',
          editorial: data.editorial || data.data?.mensaje_pastoral || data.data?.editorial || '',
          reflexionSemanal: data.reflexionSemanal || data.data?.reflexionSemanal || '',
          fraseDestacada: data.fraseDestacada || data.data?.fraseDestacada || '«La medida del amor es amar sin medida.» — San Agustín'
        };
      }
    }
  } catch (err) {
    console.log('Using local Magisterial Engine for Boletin');
  }

  const pName = params.parroquia || 'Parroquia San José';
  return {
    lemaSugerido: params.lema || "Creciendo como familia en la fe, la esperanza y el amor de Cristo",
    editorial: `Queridos hermanos y familias de la comunidad de ${pName}:\n\nAl reunirnos en este domingo para celebrar la Eucaristía, el Señor renueva en nosotros la vocación de ser auténticos discípulos misioneros. La vida parroquial no es una estructura estática, sino una comunidad viva de creyentes que caminan juntos, compartiendo las alegrías y esperanzas de nuestro pueblo.\n\nLos invitamos a participar activamente en nuestros ministerios, grupos de formación y obras de caridad. Que nuestra Madre santísima acompañe a cada uno de nuestros hogares con su maternal bendición.`,
    reflexionSemanal: "La Eucaristía es el centro y la raíz de nuestra vida cristiana. En cada Santa Misa, Cristo se hace alimento para nuestro camino y nos envía a ser testigos de su paz en nuestros ambientes familiares y laborales.",
    fraseDestacada: "«La medida del amor es amar sin medida.» — San Agustín"
  };
}

/**
 * 5. El Bibliotecario Litúrgico: Consulta el Leccionario Oficial (CEM / Misal Romano)
 * y persiste automáticamente el resultado en el almacenamiento local.
 */
export async function fetchOfficialLiturgicalDay(params: {
  fecha: string;
  celebracion?: string;
  tiempo?: string;
  ciclo?: string;
  ano_ferial?: string;
  region?: string;
  tipo?: string;
  query?: string;
}): Promise<{ success: boolean; data?: any; message?: string; source: string }> {
  try {
    const res = await fetch('/api/liturgia/librarian', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        // Automatically save to local persistence
        await saveLiturgicalDayToCache(json.data);
        return { success: true, data: json.data, source: json.source || 'gemini_librarian' };
      }
    }
    const errData = await res.json().catch(() => ({}));
    return {
      success: false,
      message: errData.message || errData.error || 'No se pudo conectar con el Bibliotecario Litúrgico.',
      source: 'error'
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message || 'Error de red al consultar al Bibliotecario.',
      source: 'network_error'
    };
  }
}

/**
 * 6. Búsqueda Universal del Bibliotecario (Santos, Fiestas, Misas Rituales, Votivas)
 */
export async function searchLibrarianCelebration(query: string, region: string = 'mx'): Promise<{
  success: boolean;
  data: any[];
  source: string;
}> {
  try {
    const res = await fetch('/api/liturgia/librarian-search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, region }),
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        return { success: true, data: json.data, source: json.source };
      }
    }
  } catch (err) {
    console.error('Search Librarian error:', err);
  }

  return { success: false, data: [], source: 'error' };
}

