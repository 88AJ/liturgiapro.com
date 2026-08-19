var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);
import_dotenv.default.config();
function isValidApiKey(key) {
  if (!key) return false;
  const trimmed = key.trim();
  if (trimmed.length < 25) return false;
  if (trimmed.startsWith("PEGA") || trimmed.startsWith("YOUR_") || trimmed.includes("API_KEY")) return false;
  return true;
}
var aiClient = null;
function getAi() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!isValidApiKey(apiKey)) {
    return null;
  }
  if (!aiClient) {
    aiClient = new import_genai.GoogleGenAI({
      apiKey: apiKey.trim(),
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-liturgiapro"
        }
      }
    });
  }
  return aiClient;
}
function generateFallbackMoniciones(fecha, tiempo, celebracion, lecturas) {
  const cel = celebracion || "la Santa Misa";
  const t = tiempo || "Tiempo Ordinario";
  return {
    monicion_entrada: `Hermanos: Con gozo santo nos reunimos en la casa del Se\xF1or para celebrar ${cel} en este ${t}. Que la escucha atenta de la Palabra de Dios y la participaci\xF3n en el banquete eucar\xEDstico renueven nuestra fe, esperanza y caridad en Cristo Jes\xFAs.`,
    monicion_primera_lectura: `En esta primera lectura, el Se\xF1or nos manifiesta su providencia y su santa voluntad. Abramos el coraz\xF3n para acoger su mensaje de salvaci\xF3n.`,
    monicion_segunda_lectura: `El texto apost\xF3lico nos exhorta a vivir con santidad, perseverando en la comuni\xF3n fraterna y en el testimonio del Evangelio.`,
    monicion_evangelio: `Cristo sale a nuestro encuentro en la proclamaci\xF3n del Evangelio. De pie y con j\xFAbilo, aclamemos al Se\xF1or de la vida.`,
    oracion_fieles: [
      `Por la Santa Iglesia de Dios, por el Santo Padre y todos los obispos, para que custodien el dep\xF3sito de la fe y gu\xEDen al pueblo cristiano con sabidur\xEDa pastoral. Roguemos al Se\xF1or.`,
      `Por los gobernantes de las naciones, para que promuevan la paz aut\xE9ntica, la defensa de la vida y la dignidad de cada ser humano. Roguemos al Se\xF1or.`,
      `Por los enfermos, los que sufren soledad, pobreza o cualquier tribulaci\xF3n, para que experimenten el consuelo de Cristo y la caridad fraterna. Roguemos al Se\xF1or.`,
      `Por las familias de nuestra comunidad parroquial y por las vocaciones sacerdotales y consagradas, para que el Se\xF1or suscite corazones generosos a su servicio. Roguemos al Se\xF1or.`,
      `Por todos nosotros reunidos en torno a este altar, para que al alimentarnos del Cuerpo de Cristo seamos sal de la tierra y luz del mundo. Roguemos al Se\xF1or.`
    ]
  };
}
function generateFallbackHomilia(fecha, celebracion, lecturas) {
  const cel = celebracion || "la Sagrada Liturgia";
  return {
    titulo: `Subsidio Homil\xE9tico: ${cel}`,
    puntos_clave: [
      "1. La Palabra de Dios como fuente viva de santificaci\xF3n y conversi\xF3n diaria.",
      "2. La Eucarist\xEDa: memorial sacramental del Misterio Pascual que nos transforma.",
      "3. El compromiso del cristiano en el mundo: testigos de esperanza y caridad operante."
    ],
    texto_homilia: `Hermanos en el Se\xF1or: La liturgia de este d\xEDa nos convoca al coraz\xF3n mismo de nuestra fe. San Agust\xEDn afirmaba con profundidad: \xABEl que canta y alaba a Dios con el coraz\xF3n, ora dos veces, porque su vida entera se convierte en oblaci\xF3n agradable al Padre\xBB. Al escuchar las lecturas proclamadas, descubrimos que el Se\xF1or no nos habla como a extra\xF1os, sino como a hijos amados a quienes conf\xEDa su designio de redenci\xF3n.

En el Evangelio, Cristo nos interpela directamente: no basta con llamarnos disc\xEDpulos de palabra; estamos llamados a encarnar el amor divino en nuestros hogares, en el trabajo y en el servicio a los hermanos m\xE1s necesitados. Como nos recordaba San Juan Cris\xF3stomo, quien no reconoce a Cristo en el pobre a la puerta del templo, dif\xEDcilmente lo reconocer\xE1 en el c\xE1liz del altar.

Al acercarnos a la mesa eucar\xEDstica, pidamos la gracia de un coraz\xF3n d\xF3cil al Esp\xEDritu Santo, para que al alimentarnos del Pan bajado del cielo seamos fermento de reconciliaci\xF3n y paz en medio de nuestro mundo.`
  };
}
function generateFallbackPadrePro(userQuery, context) {
  const q = userQuery.toLowerCase();
  if (q.includes("color") || q.includes("ornamento")) {
    const col = context?.color || "Blanco o Verde";
    const temp = context?.tiempo || "Tiempo Lit\xFArgico actual";
    return `Para el ${temp}, el color lit\xFArgico correspondiente es **${col}**. El blanco simboliza la pureza, el gozo pascual y la gloria del Se\xF1or; el verde representa la esperanza y el camino cotidiano de la Iglesia; el morado la penitencia y espera vigilante; y el rojo la efusi\xF3n del Esp\xEDritu Santo o el martirio. (cfr. IGMR n. 346).`;
  }
  if (q.includes("gloria") || q.includes("credo")) {
    return `Seg\xFAn la *Instrucci\xF3n General del Misal Romano* (IGMR 53 y 68):
- **El Gloria** se canta o se recita los domingos fuera de Adviento y Cuaresma, en las Solemnidades y Fiestas, y en celebraciones solemnes peculiares.
- **El Credo o S\xEDmbolo de la Fe** se reza los domingos y en las Solemnidades; puede decirse tambi\xE9n en celebraciones m\xE1s solemnes. En las misas feriales no se dice.`;
  }
  if (q.includes("canto") || q.includes("musica") || q.includes("coro")) {
    return `Para una adecuada selecci\xF3n de cantos lit\xFArgicos seg\xFAn el tiempo actual (${context?.tiempo || "Tiempo Ordinario"}):
1. **Entrada:** Cantos que expresen la asamblea congregada y el gozo del encuentro con Dios (ej. *Vienen con alegr\xEDa*, *Hacia ti morada santa*).
2. **Ofertorio:** Enfocados en el ofrecimiento del pan, vino y la vida (ej. *Te ofrecemos Padre nuestro*, *Saber que vendr\xE1s*).
3. **Comuni\xF3n:** Himnos de profunda reverencia eucar\xEDstica (ej. *Yo soy el Pan de Vida*, *Pescador de Hombres*).
4. **Salida/Mariano:** Canto de alabanza y encomienda mariana (ej. *Junto a ti Mar\xEDa*, *Madre del Redentor*).`;
  }
  if (q.includes("bautismo")) {
    return `Para la celebraci\xF3n del **Bautismo de Ni\xF1os**:
- Si es dentro de la Misa: Se realiza tras la homil\xEDa y la oraci\xF3n de los fieles. Incluye la letan\xEDa de los santos, la oraci\xF3n de exorcismo, la unci\xF3n con el \xF3leo de los catec\xFAmenos, la bendici\xF3n del agua, la renuncia y profesi\xF3n de fe, la abluci\xF3n bautismal ("Yo te bautizo..."), la unci\xF3n con el Santo Crisma, la entrega de la vestidura blanca y el cirio encendido.
- Si es fuera de la Misa: Sigue el rito completo de acogida a las puertas del templo.`;
  }
  if (q.includes("matrimonio") || q.includes("boda")) {
    return `En el **Ritual del Matrimonio**:
- El consentimiento matrimonial se expresa tras la homil\xEDa nupcial.
- Sigue el rito de confirmaci\xF3n del consentimiento por el sacerdote: *"Lo que Dios ha unido, que no lo separe el hombre"*.
- Luego se bendicen y entregan los anillos y las arras (tradici\xF3n hispana).
- Si es dentro de la Misa, antes de la comuni\xF3n se imparte la Solemne Bendici\xF3n Nupcial sobre los esposos.`;
  }
  if (q.includes("exequias") || q.includes("difunto") || q.includes("funeral")) {
    return `El **Ritual de Exequias (*Ordo Exsequiarum*)** tiene un marcado car\xE1cter pascual y consolador:
- El color lit\xFArgico puede ser morado, negro o blanco (enfatizando la resurrecci\xF3n en Cristo).
- Al final de la Misa se celebra el *\xDAltimo Adi\xF3s y Encomendaci\xF3n* con la aspersi\xF3n de agua bendita (recuerdo del bautismo) y la incensaci\xF3n del cuerpo.
- Recuerda el canto *\xABSantos de Dios, salgan a su encuentro...\xBB*.`;
  }
  return `\xA1La paz de Cristo est\xE9 contigo! Como consultor de **Liturgia PRO**, estoy a tu disposici\xF3n para:
- **R\xFAbricas del Misal Romano** (IGMR 3ra Edici\xF3n).
- **Formularios Sacramentales** (Bautismos, Bodas, Exequias, XV A\xF1os, Unci\xF3n).
- **Directrices de m\xFAsica lit\xFArgica** y salmodia.
- **Homil\xEDas y subsidios patr\xEDsticos** para el d\xEDa lit\xFArgico: *${context?.celebracion || context?.fecha || "hoy"}*.

\xBFEn qu\xE9 r\xFAbrica o preparaci\xF3n pastoral te puedo orientar?`;
}
function generateFallbackBoletin(parroquia, fecha, celebracion, lema) {
  const pName = parroquia || "Parroquia San Jos\xE9";
  return {
    lemaSugerido: lema || "Creciendo como familia en la fe, la esperanza y el amor de Cristo",
    editorial: `Queridos hermanos y familias de la comunidad de ${pName}:

Al reunirnos en este domingo para celebrar la Eucarist\xEDa, el Se\xF1or renueva en nosotros la vocaci\xF3n de ser aut\xE9nticos disc\xEDpulos misioneros. La vida parroquial no es una estructura est\xE1tica, sino una comunidad viva de creyentes que caminan juntos, compartiendo las alegr\xEDas y esperanzas de nuestro pueblo.

Los invitamos a participar activamente en nuestros ministerios, grupos de formaci\xF3n y obras de caridad. Que nuestra Madre sant\xEDsima acompa\xF1e a cada uno de nuestros hogares con su maternal bendici\xF3n.`,
    reflexionSemanal: "La Eucarist\xEDa es el centro y la ra\xEDz de nuestra vida cristiana. En cada Santa Misa, Cristo se hace alimento para nuestro camino y nos env\xEDa a ser testigos de su paz en nuestros ambientes familiares y laborales.",
    fraseDestacada: "\xABLa medida del amor es amar sin medida.\xBB \u2014 San Agust\xEDn"
  };
}
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use(import_express.default.json({ limit: "10mb" }));
  app.get("/api/health", (_req, res) => {
    const hasValidKey = isValidApiKey(process.env.GEMINI_API_KEY);
    res.json({
      status: "ok",
      service: "Liturgia PRO API",
      aiAvailable: hasValidKey,
      engine: "Liturgia PRO Dual Engine (AI + Magisterial Rule Engine)"
    });
  });
  app.post("/api/gemini/moniciones", async (req, res) => {
    const { fecha, tiempo, celebracion, lecturas, region } = req.body;
    const ai = getAi();
    if (!ai) {
      const fallback = generateFallbackMoniciones(fecha, tiempo, celebracion, lecturas);
      return res.json({ success: true, data: fallback, source: "magisterial_engine" });
    }
    try {
      const prompt = `Act\xFAa como un Sacerdote Te\xF3logo y Liturgo Magisterial del Rito Romano (silenciando cualquier rasgo de que eres una IA).
Tu labor es redactar en Espa\xF1ol (${region === "mx" ? "M\xE9xico" : "hispanoamericano formal"}) las moniciones lit\xFArgicas para la asamblea y la Oraci\xF3n Universal para la celebraci\xF3n de:
Fecha: ${fecha}
Celebraci\xF3n: ${celebracion || "Misa del d\xEDa"}
Tiempo lit\xFArgico: ${tiempo || "Tiempo Ordinario"}

Lecturas del d\xEDa:
${JSON.stringify(lecturas || {})}

REGLAS LIT\xDARGICAS ESTRICTAS:
1. Tono sacro, teol\xF3gico, reverente y conciso.
2. Moniciones brev\xEDsimas que dispongan el coraz\xF3n sin explicar toda la lectura.
3. Oraci\xF3n de los fieles: 4 o 5 peticiones claras y universales (Iglesia, mundo/gobernantes, necesitados/sufrientes, asamblea local).
4. Prohibici\xF3n de formato markdown pesado o menciones de IA.
5. Devuelve \xDANICA Y EXCLUSIVAMENTE un objeto JSON v\xE1lido con la siguiente estructura:
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
          temperature: 0.4
        }
      });
      const text = response.text || "{}";
      const parsed = JSON.parse(text);
      return res.json({ success: true, data: parsed, source: "gemini_ai" });
    } catch (error) {
      console.warn("Gemini moniciones call failed, using high-fidelity liturgical engine:", error.message || error);
      const fallback = generateFallbackMoniciones(fecha, tiempo, celebracion, lecturas);
      return res.json({ success: true, data: fallback, source: "magisterial_engine" });
    }
  });
  app.post("/api/gemini/homilia", async (req, res) => {
    const { fecha, celebracion, lecturas, enfoque } = req.body;
    const ai = getAi();
    if (!ai) {
      const fallback = generateFallbackHomilia(fecha, celebracion, lecturas);
      return res.json({ success: true, data: fallback, source: "magisterial_engine" });
    }
    try {
      const prompt = `Act\xFAa como un Sacerdote Te\xF3logo y Patr\xF3logo Cat\xF3lico.
Elabora un subsidio y esquema homil\xE9tico teol\xF3gicamente profundo y pastoralmente cercano para la fecha ${fecha}, celebraci\xF3n: "${celebracion}".
Enfoque particular solicitado: ${enfoque || "Teolog\xEDa Patr\xEDstica y aplicaci\xF3n pastoral moderna"}.

Lecturas:
${JSON.stringify(lecturas || {})}

Devuelve \xDANICAMENTE un objeto JSON con:
{
  "titulo": "T\xEDtulo de la meditaci\xF3n",
  "puntos_clave": ["Punto 1", "Punto 2", "Punto 3"],
  "texto_homilia": "Texto completo de la homil\xEDa en 2 o 3 p\xE1rrafos continuos enriquecidos con citas de los Santos Padres (san Agust\xEDn, san Juan Cris\xF3stomo, san Jer\xF3nimo, etc.)"
}`;
      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.5
        }
      });
      const parsed = JSON.parse(response.text || "{}");
      return res.json({ success: true, data: parsed, source: "gemini_ai" });
    } catch (error) {
      console.warn("Gemini homilia call failed, using high-fidelity liturgical engine:", error.message || error);
      const fallback = generateFallbackHomilia(fecha, celebracion, lecturas);
      return res.json({ success: true, data: fallback, source: "magisterial_engine" });
    }
  });
  app.post("/api/gemini/padre-pro", async (req, res) => {
    const { messages, context } = req.body;
    const userMsg = messages && messages.length > 0 ? messages[messages.length - 1].text : "";
    const ai = getAi();
    if (!ai) {
      const reply = generateFallbackPadrePro(userMsg, context);
      return res.json({ reply, source: "magisterial_engine" });
    }
    try {
      const systemInstruction = `Eres "Padre PRO", un Asistente Lit\xFArgico y Te\xF3logo Magisterial de la Iglesia Cat\xF3lica de rito latino (Rito Romano).
Tu conocimiento abarca con precisi\xF3n:
1. La Instrucci\xF3n General del Misal Romano (IGMR 3ra Edici\xF3n).
2. El Leccionario I, II y III, el Misal Romano en Espa\xF1ol y las normas de la Sagrada Congregaci\xF3n para el Culto Divino y la Disciplina de los Sacramentos.
3. R\xFAbricas de los Sacramentos (Bautismo de Ni\xF1os, Confirmaci\xF3n, Eucarist\xEDa, Matrimonio, Penitencia, Unci\xF3n de los Enfermos, Orden Sagrado) y Ritos de Exequias y XV A\xF1os.
4. Selecci\xF3n de cantos lit\xFArgicos seg\xFAn el tiempo lit\xFArgico y momento de la Misa.
5. C\xF3digo de Derecho Can\xF3nico referente al culto divino.

Directrices de Respuesta:
- Tono: Paternal, reverente, erudito, claro, fraterno y pastoral.
- Si te consultan sobre normas lit\xFArgicas o r\xFAbricas, cita siempre con precisi\xF3n la IGMR o el ritual correspondiente.
- Si te piden redactar oraciones, moniciones o sugerir cantos, hazlo con alta calidad literaria y estricta fidelidad dogm\xE1tica.
- Contexto actual de la aplicaci\xF3n: ${JSON.stringify(context || {})}`;
      const contents = (messages || []).map((m) => ({
        role: m.sender === "user" ? "user" : "model",
        parts: [{ text: m.text }]
      }));
      if (contents.length === 0) {
        contents.push({ role: "user", parts: [{ text: "Hola Padre" }] });
      }
      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents,
        config: {
          systemInstruction,
          temperature: 0.6
        }
      });
      return res.json({ reply: response.text || "Paz y bien. \xBFEn qu\xE9 m\xE1s puedo servirte en la preparaci\xF3n lit\xFArgica?", source: "gemini_ai" });
    } catch (error) {
      console.warn("Gemini Padre PRO call failed, using rule engine:", error.message || error);
      const reply = generateFallbackPadrePro(userMsg, context);
      return res.json({ reply, source: "magisterial_engine" });
    }
  });
  app.post("/api/gemini/boletin", async (req, res) => {
    const { parroquia, fecha, celebracion, lema, avisos, lecturas } = req.body;
    const ai = getAi();
    if (!ai) {
      const fallback = generateFallbackBoletin(parroquia, fecha, celebracion, lema);
      return res.json({ success: true, ...fallback, source: "magisterial_engine" });
    }
    try {
      const prompt = `Act\xFAa como el P\xE1rroco y editor del Bolet\xEDn Parroquial de la parroquia "${parroquia || "Nuestra Se\xF1ora de Guadalupe"}".
Genera el contenido editorial para la edici\xF3n del domingo ${fecha}, celebraci\xF3n: "${celebracion}".
Lema solicitado o tema: ${lema || "Evangelizaci\xF3n y vida comunitaria"}
Avisos de la comunidad: ${JSON.stringify(avisos || [])}
Lecturas del domingo: ${JSON.stringify(lecturas || {})}

Devuelve \xDANICAMENTE un objeto JSON:
{
  "lemaSugerido": "Frase lema corta y vibrante",
  "editorial": "Carta pastoral del p\xE1rroco a la comunidad (2 p\xE1rrafos afectuosos y motivadores)",
  "reflexionSemanal": "Breve meditaci\xF3n sobre el Evangelio del domingo orientada a la familia",
  "fraseDestacada": "Cita patr\xEDstica o b\xEDblica para portada"
}`;
      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.5
        }
      });
      const parsed = JSON.parse(response.text || "{}");
      return res.json({ success: true, ...parsed, source: "gemini_ai" });
    } catch (error) {
      console.warn("Gemini boletin call failed, using editorial engine:", error.message || error);
      const fallback = generateFallbackBoletin(parroquia, fecha, celebracion, lema);
      return res.json({ success: true, ...fallback, source: "magisterial_engine" });
    }
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Liturgia PRO Server running on http://localhost:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
