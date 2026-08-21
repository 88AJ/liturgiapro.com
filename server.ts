import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

function isValidApiKey(key: string | undefined): boolean {
  if (!key) return false;
  const trimmed = key.trim();
  if (trimmed.length < 25) return false;
  if (trimmed.startsWith("PEGA") || trimmed.startsWith("YOUR_") || trimmed.includes("API_KEY")) return false;
  return true;
}

let aiClient: GoogleGenAI | null = null;

function getAi(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!isValidApiKey(apiKey)) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: apiKey!.trim(),
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-liturgiapro',
        },
      },
    });
  }
  return aiClient;
}

// Fallback Generators for Liturgical Content
function generateFallbackMoniciones(fecha: string, tiempo: string, celebracion: string, lecturas: any) {
  const cel = celebracion || 'la Santa Misa';
  const t = tiempo || 'Tiempo Ordinario';
  
  return {
    monicion_entrada: `Hermanos: Con gozo santo nos reunimos en la casa del Señor para celebrar ${cel} en este ${t}. Que la escucha atenta de la Palabra de Dios y la participación en el banquete eucarístico renueven nuestra fe, esperanza y caridad en Cristo Jesús.`,
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

function generateFallbackHomilia(fecha: string, celebracion: string, lecturas: any) {
  const cel = celebracion || 'la Sagrada Liturgia';
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

function generateFallbackPadrePro(userQuery: string, context: any) {
  const q = userQuery.toLowerCase();
  
  if (q.includes('color') || q.includes('ornamento')) {
    const col = context?.color || 'Blanco o Verde';
    const temp = context?.tiempo || 'Tiempo Litúrgico actual';
    return `Para el ${temp}, el color litúrgico correspondiente es **${col}**. El blanco simboliza la pureza, el gozo pascual y la gloria del Señor; el verde representa la esperanza y el camino cotidiano de la Iglesia; el morado la penitencia y espera vigilante; y el rojo la efusión del Espíritu Santo o el martirio. (cfr. IGMR n. 346).`;
  }
  
  if (q.includes('gloria') || q.includes('credo')) {
    return `Según la *Instrucción General del Misal Romano* (IGMR 53 y 68):\n- **El Gloria** se canta o se recita los domingos fuera de Adviento y Cuaresma, en las Solemnidades y Fiestas, y en celebraciones solemnes peculiares.\n- **El Credo o Símbolo de la Fe** se reza los domingos y en las Solemnidades; puede decirse también en celebraciones más solemnes. En las misas feriales no se dice.`;
  }
  
  if (q.includes('canto') || q.includes('musica') || q.includes('coro')) {
    return `Para una adecuada selección de cantos litúrgicos según el tiempo actual (${context?.tiempo || 'Tiempo Ordinario'}):\n1. **Entrada:** Cantos que expresen la asamblea congregada y el gozo del encuentro con Dios (ej. *Vienen con alegría*, *Hacia ti morada santa*).\n2. **Ofertorio:** Enfocados en el ofrecimiento del pan, vino y la vida (ej. *Te ofrecemos Padre nuestro*, *Saber que vendrás*).\n3. **Comunión:** Himnos de profunda reverencia eucarística (ej. *Yo soy el Pan de Vida*, *Pescador de Hombres*).\n4. **Salida/Mariano:** Canto de alabanza y encomienda mariana (ej. *Junto a ti María*, *Madre del Redentor*).`;
  }
  
  if (q.includes('bautismo')) {
    return `Para la celebración del **Bautismo de Niños**:\n- Si es dentro de la Misa: Se realiza tras la homilía y la oración de los fieles. Incluye la letanía de los santos, la oración de exorcismo, la unción con el óleo de los catecúmenos, la bendición del agua, la renuncia y profesión de fe, la ablución bautismal ("Yo te bautizo..."), la unción con el Santo Crisma, la entrega de la vestidura blanca y el cirio encendido.\n- Si es fuera de la Misa: Sigue el rito completo de acogida a las puertas del templo.`;
  }
  
  if (q.includes('matrimonio') || q.includes('boda')) {
    return `En el **Ritual del Matrimonio**:\n- El consentimiento matrimonial se expresa tras la homilía nupcial.\n- Sigue el rito de confirmación del consentimiento por el sacerdote: *"Lo que Dios ha unido, que no lo separe el hombre"*.\n- Luego se bendicen y entregan los anillos y las arras (tradición hispana).\n- Si es dentro de la Misa, antes de la comunión se imparte la Solemne Bendición Nupcial sobre los esposos.`;
  }
  
  if (q.includes('exequias') || q.includes('difunto') || q.includes('funeral')) {
    return `El **Ritual de Exequias (*Ordo Exsequiarum*)** tiene un marcado carácter pascual y consolador:\n- El color litúrgico puede ser morado, negro o blanco (enfatizando la resurrección en Cristo).\n- Al final de la Misa se celebra el *Último Adiós y Encomendación* con la aspersión de agua bendita (recuerdo del bautismo) y la incensación del cuerpo.\n- Recuerda el canto *«Santos de Dios, salgan a su encuentro...»*.`;
  }

  return `¡La paz de Cristo esté contigo! Como consultor de **Liturgia PRO**, estoy a tu disposición para:\n- **Rúbricas del Misal Romano** (IGMR 3ra Edición).\n- **Formularios Sacramentales** (Bautismos, Bodas, Exequias, XV Años, Unción).\n- **Directrices de música litúrgica** y salmodia.\n- **Homilías y subsidios patrísticos** para el día litúrgico: *${context?.celebracion || context?.fecha || 'hoy'}*.\n\n¿En qué rúbrica o preparación pastoral te puedo orientar?`;
}

function generateFallbackBoletin(parroquia: string, fecha: string, celebracion: string, lema: string) {
  const pName = parroquia || 'Parroquia San José';
  return {
    lemaSugerido: lema || "Creciendo como familia en la fe, la esperanza y el amor de Cristo",
    editorial: `Queridos hermanos y familias de la comunidad de ${pName}:\n\nAl reunirnos en este domingo para celebrar la Eucaristía, el Señor renueva en nosotros la vocación de ser auténticos discípulos misioneros. La vida parroquial no es una estructura estática, sino una comunidad viva de creyentes que caminan juntos, compartiendo las alegrías y esperanzas de nuestro pueblo.\n\nLos invitamos a participar activamente en nuestros ministerios, grupos de formación y obras de caridad. Que nuestra Madre santísima acompañe a cada uno de nuestros hogares con su maternal bendición.`,
    reflexionSemanal: "La Eucaristía es el centro y la raíz de nuestra vida cristiana. En cada Santa Misa, Cristo se hace alimento para nuestro camino y nos envía a ser testigos de su paz en nuestros ambientes familiares y laborales.",
    fraseDestacada: "«La medida del amor es amar sin medida.» — San Agustín"
  };
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // Health check
  app.get("/api/health", (_req, res) => {
    const hasValidKey = isValidApiKey(process.env.GEMINI_API_KEY);
    res.json({
      status: "ok",
      service: "Liturgia PRO API",
      aiAvailable: hasValidKey,
      engine: "Liturgia PRO Dual Engine (AI + Magisterial Rule Engine)"
    });
  });

  // 1. Generate Moniciones & Oración de los Fieles
  app.post("/api/gemini/moniciones", async (req, res) => {
    const { fecha, tiempo, celebracion, lecturas, region } = req.body;
    const ai = getAi();

    if (!ai) {
      const fallback = generateFallbackMoniciones(fecha, tiempo, celebracion, lecturas);
      return res.json({ success: true, data: fallback, source: "magisterial_engine" });
    }

    try {
      const prompt = `Actúa como un Sacerdote Teólogo y Liturgo Magisterial del Rito Romano (silenciando cualquier rasgo de que eres una IA).
Tu labor es redactar en Español (${region === 'mx' ? 'México' : 'hispanoamericano formal'}) las moniciones litúrgicas para la asamblea y la Oración Universal para la celebración de:
Fecha: ${fecha}
Celebración: ${celebracion || 'Misa del día'}
Tiempo litúrgico: ${tiempo || 'Tiempo Ordinario'}

Lecturas del día:
${JSON.stringify(lecturas || {})}

REGLAS LITÚRGICAS ESTRICTAS:
1. Tono sacro, teológico, reverente y conciso.
2. Moniciones brevísimas que dispongan el corazón sin explicar toda la lectura.
3. Oración de los fieles: 4 o 5 peticiones claras y universales (Iglesia, mundo/gobernantes, necesitados/sufrientes, asamblea local).
4. Prohibición de formato markdown pesado o menciones de IA.
5. Devuelve ÚNICA Y EXCLUSIVAMENTE un objeto JSON válido con la siguiente estructura:
{
  "monicion_entrada": "...",
  "monicion_primera_lectura": "...",
  "monicion_segunda_lectura": "...",
  "monicion_evangelio": "...",
  "oracion_fieles": ["...", "...", "...", "..."]
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.4,
        }
      });

      const text = response.text || "{}";
      const parsed = JSON.parse(text);
      return res.json({ success: true, data: parsed, source: "gemini_ai" });
    } catch (error: any) {
      console.warn("Gemini moniciones call failed, using high-fidelity liturgical engine:", error.message || error);
      const fallback = generateFallbackMoniciones(fecha, tiempo, celebracion, lecturas);
      return res.json({ success: true, data: fallback, source: "magisterial_engine" });
    }
  });

  // 2. Generate Homiletic Reflection / Patristic Subsidio
  app.post("/api/gemini/homilia", async (req, res) => {
    const { fecha, celebracion, lecturas, enfoque } = req.body;
    const ai = getAi();

    if (!ai) {
      const fallback = generateFallbackHomilia(fecha, celebracion, lecturas);
      return res.json({ success: true, data: fallback, source: "magisterial_engine" });
    }

    try {
      const prompt = `Actúa como un Sacerdote Teólogo y Patrólogo Católico.
Elabora un subsidio y esquema homilético teológicamente profundo y pastoralmente cercano para la fecha ${fecha}, celebración: "${celebracion}".
Enfoque particular solicitado: ${enfoque || 'Teología Patrística y aplicación pastoral moderna'}.

Lecturas:
${JSON.stringify(lecturas || {})}

Devuelve ÚNICAMENTE un objeto JSON con:
{
  "titulo": "Título de la meditación",
  "puntos_clave": ["Punto 1", "Punto 2", "Punto 3"],
  "texto_homilia": "Texto completo de la homilía en 2 o 3 párrafos continuos enriquecidos con citas de los Santos Padres (san Agustín, san Juan Crisóstomo, san Jerónimo, etc.)"
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.5,
        }
      });

      const parsed = JSON.parse(response.text || "{}");
      return res.json({ success: true, data: parsed, source: "gemini_ai" });
    } catch (error: any) {
      console.warn("Gemini homilia call failed, using high-fidelity liturgical engine:", error.message || error);
      const fallback = generateFallbackHomilia(fecha, celebracion, lecturas);
      return res.json({ success: true, data: fallback, source: "magisterial_engine" });
    }
  });

  // 3. Padre PRO Liturgical Assistant & Advisor
  app.post("/api/gemini/padre-pro", async (req, res) => {
    const { messages, context } = req.body;
    const userMsg = (messages && messages.length > 0) ? messages[messages.length - 1].text : '';
    const ai = getAi();

    if (!ai) {
      const reply = generateFallbackPadrePro(userMsg, context);
      return res.json({ reply, source: "magisterial_engine" });
    }

    try {
      const systemInstruction = `Eres "Padre PRO", un Asistente Litúrgico y Teólogo Magisterial de la Iglesia Católica de rito latino (Rito Romano).
Tu conocimiento abarca con precisión:
1. La Instrucción General del Misal Romano (IGMR 3ra Edición).
2. El Leccionario I, II y III, el Misal Romano en Español y las normas de la Sagrada Congregación para el Culto Divino y la Disciplina de los Sacramentos.
3. Rúbricas de los Sacramentos (Bautismo de Niños, Confirmación, Eucaristía, Matrimonio, Penitencia, Unción de los Enfermos, Orden Sagrado) y Ritos de Exequias y XV Años.
4. Selección de cantos litúrgicos según el tiempo litúrgico y momento de la Misa.
5. Código de Derecho Canónico referente al culto divino.

Directrices de Respuesta:
- Tono: Paternal, reverente, erudito, claro, fraterno y pastoral.
- Si te consultan sobre normas litúrgicas o rúbricas, cita siempre con precisión la IGMR o el ritual correspondiente.
- Si te piden redactar oraciones, moniciones o sugerir cantos, hazlo con alta calidad literaria y estricta fidelidad dogmática.
- Contexto actual de la aplicación: ${JSON.stringify(context || {})}`;

      const contents = (messages || []).map((m: any) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));

      if (contents.length === 0) {
        contents.push({ role: 'user', parts: [{ text: 'Hola Padre' }] });
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents,
        config: {
          systemInstruction,
          temperature: 0.6,
        }
      });

      return res.json({ reply: response.text || "Paz y bien. ¿En qué más puedo servirte en la preparación litúrgica?", source: "gemini_ai" });
    } catch (error: any) {
      console.warn("Gemini Padre PRO call failed, using rule engine:", error.message || error);
      const reply = generateFallbackPadrePro(userMsg, context);
      return res.json({ reply, source: "magisterial_engine" });
    }
  });

  // 4. Generate Parish Bulletin / Boletín Parroquial
  app.post("/api/gemini/boletin", async (req, res) => {
    const { parroquia, fecha, celebracion, lema, avisos, lecturas } = req.body;
    const ai = getAi();

    if (!ai) {
      const fallback = generateFallbackBoletin(parroquia, fecha, celebracion, lema);
      return res.json({ success: true, ...fallback, source: "magisterial_engine" });
    }

    try {
      const prompt = `Actúa como el Párroco y editor del Boletín Parroquial de la parroquia "${parroquia || 'Nuestra Señora de Guadalupe'}".
Genera el contenido editorial para la edición del domingo ${fecha}, celebración: "${celebracion}".
Lema solicitado o tema: ${lema || 'Evangelización y vida comunitaria'}
Avisos de la comunidad: ${JSON.stringify(avisos || [])}
Lecturas del domingo: ${JSON.stringify(lecturas || {})}

Devuelve ÚNICAMENTE un objeto JSON:
{
  "lemaSugerido": "Frase lema corta y vibrante",
  "editorial": "Carta pastoral del párroco a la comunidad (2 párrafos afectuosos y motivadores)",
  "reflexionSemanal": "Breve meditación sobre el Evangelio del domingo orientada a la familia",
  "fraseDestacada": "Cita patrística o bíblica para portada"
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.5,
        }
      });

      const parsed = JSON.parse(response.text || "{}");
      return res.json({ success: true, ...parsed, source: "gemini_ai" });
    } catch (error: any) {
      console.warn("Gemini boletin call failed, using editorial engine:", error.message || error);
      const fallback = generateFallbackBoletin(parroquia, fecha, celebracion, lema);
      return res.json({ success: true, ...fallback, source: "magisterial_engine" });
    }
  });

  // 5. El Bibliotecario Litúrgico: Recuperador y Archivero de Textos Oficiales (CEM / Misal Romano / Liturgia Papal)
  app.post("/api/liturgia/librarian", async (req, res) => {
    const { fecha, celebracion, tiempo, ciclo, ano_ferial, region, tipo, query } = req.body;
    const ai = getAi();

    const targetRegion = region === 'mx' ? 'México (Conferencia del Episcopado Mexicano - CEM / Leccionario Mexicano)' : 'Hispanoamérica y Rito Romano';

    if (!ai) {
      console.log("No AI client available for Librarian, returning structured day");
      return res.status(503).json({
        success: false,
        message: "El Bibliotecario IA requiere GEMINI_API_KEY activa para consultar la red y el Leccionario en tiempo real.",
        source: "offline"
      });
    }

    try {
      const prompt = `Actúa como "El Bibliotecario Litúrgico Mayor", archivero oficial y perito del Misal Romano y el Leccionario para ${targetRegion} y Liturgia Papal.
Tu misión es extraer y estructurar el formulario litúrgico 100% auténtico, exacto e íntegro para la celebración:
- Fecha: ${fecha || 'Fecha actual'}
- Celebración / Festividad solicitada: "${celebracion || query || 'Misa del día'}"
- Tiempo Litúrgico: ${tiempo || 'Tiempo Ordinario'}
- Ciclo Dominical: ${ciclo || 'Ciclo A/B/C según calendario'}
- Año Ferial: ${ano_ferial || 'Año I o II según año'}
- Tipo: ${tipo || 'ordinaria'}

REGLAS LITÚRGICAS ESTRICTAS DE FIDELIDAD:
1. Extrae los textos oficiales palabra por palabra del Leccionario Católico y Misal Romano.
2. Primera Lectura: Cita bíblica exacta, monición introductoria pastoral y texto bíblico completo.
3. Salmo Responsorial: Cita bíblica, antífona o respuesta con "R/.", y todas las estrofas poéticas completas separadas por saltos de línea.
4. Segunda Lectura: Solo inclúyela si es Domingo o Solemnidad (en ferias y memorias debe ser null o no incluirse).
5. Aclamación antes del Evangelio: Si es Cuaresma usa "Honor y gloria a ti, Señor Jesús", en otro tiempo usa "Aleluya, aleluya" con el versículo bíblico propio.
6. Santo Evangelio: Cita del evangelista, monición y texto evangélico completo.
7. Oraciones Presidenciales del Misal Romano: Colecta, Oración sobre las Ofrendas, Antífonas de entrada y comunión, Oración después de la comunión y título/texto sugerido de Prefacio.
8. Reglas de Rúbricas (IGMR):
   - Gloria: true en domingos (fuera de Adviento/Cuaresma), solemnidades y fiestas; false en ferias o cuaresma/adviento.
   - Credo: true en domingos y solemnidades; false en ferias y memorias.
   - Color: Verde (Ordinario), Blanco (Pascua/Navidad/Santos/Vírgenes), Morado (Adviento/Cuaresma/Difuntos), Rojo (Mártires/Pentecostés/Pasión), Rosa (Gaudete/Laetare).
9. Sugerencia de Cantos Litúrgicos: Cuatro cantos tradicionales (Entrada, Ofertorio, Comunión, Salida) idóneos para este Evangelio y fiesta.

Devuelve ÚNICAMENTE un objeto JSON válido con la siguiente estructura exacta:
{
  "fecha": "${fecha || ''}",
  "dia_semana": "...",
  "tiempo_liturgico": "...",
  "color": "Verde" | "Blanco" | "Morado" | "Rojo" | "Rosa",
  "grado": "Solemnidad" | "Fiesta" | "Memoria Obligatoria" | "Memoria Libre" | "Feria" | "Domingo",
  "titulo_celebracion": "...",
  "celebracion": "...",
  "ciclo": "A" | "B" | "C",
  "ano_ferial": "I" | "II",
  "monicion_entrada": "...",
  "antifona_entrada": "...",
  "gloria": true | false,
  "oracion_colecta": "...",
  "liturgia_palabra": {
    "primera_lectura": {
      "titulo": "Primera Lectura",
      "cita": "...",
      "texto": "...",
      "monicion": "..."
    },
    "salmo_responsorial": {
      "cita": "...",
      "respuesta": "...",
      "texto": "..."
    },
    "segunda_lectura": {
      "titulo": "Segunda Lectura",
      "cita": "...",
      "texto": "...",
      "monicion": "..."
    },
    "aclamacion_evangelio": {
      "cita": "...",
      "texto": "..."
    },
    "evangelio": {
      "titulo": "Santo Evangelio",
      "cita": "...",
      "texto": "...",
      "monicion": "..."
    }
  },
  "credo": true | false,
  "oracion_fieles": [
    "...",
    "...",
    "...",
    "..."
  ],
  "oracion_ofrendas": "...",
  "prefacio": {
    "titulo": "...",
    "texto": "..."
  },
  "antifona_comunion": "...",
  "oracion_comunion": "...",
  "reflexion_homiletica": [
    "...",
    "..."
  ],
  "cantos_sugeridos": {
    "entrada": "...",
    "ofertorio": "...",
    "comunion": "...",
    "salida": "..."
  },
  "fuente_oficial": "Leccionario de la Conferencia del Episcopado Mexicano (CEM) & Misal Romano"
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.2,
        }
      });

      const parsed = JSON.parse(response.text || "{}");
      if (!parsed.fecha && fecha) parsed.fecha = fecha;
      if (!parsed.fuente_oficial) parsed.fuente_oficial = "Leccionario Oficial CEM / Misal Romano";

      return res.json({ success: true, data: parsed, source: "gemini_librarian_agent" });
    } catch (error: any) {
      console.error("Liturgical Librarian call error:", error.message || error);
      return res.status(500).json({
        success: false,
        error: error.message || "Error al consultar al Bibliotecario Litúrgico",
        source: "error"
      });
    }
  });

  // 6. Búsqueda Universal del Bibliotecario (Santos, Ritos, Votivas, Comunes)
  app.post("/api/liturgia/librarian-search", async (req, res) => {
    const { query, region } = req.body;
    const ai = getAi();

    if (!ai) {
      return res.status(503).json({
        success: false,
        message: "Gemini API no configurada en el servidor.",
        source: "offline"
      });
    }

    try {
      const prompt = `Actúa como "El Bibliotecario Litúrgico". El usuario busca un formulario litúrgico o perícopa bíblica con el término: "${query}".
Determina la Misa o formulario canónico correspondiente (por ejemplo: Común de la Virgen María, Misa por los Difuntos / Exequias, Misa de Bautismo, Misa de Matrimonio, Misa de San Judas Tadeo, Sagrado Corazón, San Juan Diego, etc.).
Región: ${region === 'mx' ? 'México (CEM)' : 'Rito Romano Universal'}.

Devuelve ÚNICAMENTE un array JSON con 1 a 3 formularios litúrgicos completos ordenados por relevancia, cada uno con la estructura canónica completa de LiturgicalDay (título, color, grado, lecturas completas, salmo, evangelio, colecta, ofrendas, comunión, prefacio, cantos sugeridos).
Formato:
[
  {
    "titulo_celebracion": "...",
    "tiempo_liturgico": "...",
    "color": "Blanco" | "Rojo" | "Verde" | "Morado" | "Rosa",
    "grado": "Solemnidad" | "Fiesta" | "Memoria Obligatoria" | "Misa Ritual" | "Misa Votiva",
    "monicion_entrada": "...",
    "antifona_entrada": "...",
    "gloria": true | false,
    "oracion_colecta": "...",
    "liturgia_palabra": {
      "primera_lectura": { "titulo": "Primera Lectura", "cita": "...", "texto": "...", "monicion": "..." },
      "salmo_responsorial": { "cita": "...", "respuesta": "...", "texto": "..." },
      "segunda_lectura": { "titulo": "Segunda Lectura", "cita": "...", "texto": "...", "monicion": "..." },
      "aclamacion_evangelio": { "cita": "...", "texto": "..." },
      "evangelio": { "titulo": "Santo Evangelio", "cita": "...", "texto": "...", "monicion": "..." }
    },
    "credo": true | false,
    "oracion_fieles": ["...", "...", "...", "..."],
    "oracion_ofrendas": "...",
    "prefacio": { "titulo": "...", "texto": "..." },
    "antifona_comunion": "...",
    "oracion_comunion": "...",
    "cantos_sugeridos": { "entrada": "...", "ofertorio": "...", "comunion": "...", "salida": "..." },
    "fuente_oficial": "Misal Romano & Leccionario Oficial CEM"
  }
]`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.3,
        }
      });

      const results = JSON.parse(response.text || "[]");
      return res.json({ success: true, data: results, source: "gemini_librarian_agent" });
    } catch (error: any) {
      console.error("Librarian search error:", error.message || error);
      return res.status(500).json({ success: false, error: error.message, source: "error" });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Liturgia PRO Server running on http://localhost:${PORT}`);
  });
}

startServer();
