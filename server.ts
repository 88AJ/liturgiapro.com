import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

let aiClient: GoogleGenAI | null = null;

function getAi(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    }
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", service: "Liturgia PRO API" });
  });

  // 1. Generate Moniciones & Oración de los Fieles with Gemini
  app.post("/api/gemini/moniciones", async (req, res) => {
    try {
      const { fecha, tiempo, celebracion, lecturas, region } = req.body;
      const ai = getAi();

      if (!ai) {
        // Fallback if no API key provided
        return res.json({
          success: true,
          data: {
            monicion_entrada: `Hermanos: Con alegría nos congregamos hoy para celebrar ${celebracion || 'la Santa Misa'}. Que la Palabra de Dios que hoy escucharemos prepare nuestro espíritu para encontrarnos con el Señor en la Eucaristía.`,
            monicion_primera_lectura: `En esta lectura, la Palabra de Dios nos llama a renovar nuestra fidelidad y confianza en el Señor que nunca nos abandona.`,
            monicion_segunda_lectura: `El apóstol nos exhorta a vivir con santidad y amor fraterno en comunión con Cristo Resucitado.`,
            monicion_evangelio: `Aclamemos a Cristo que se hace presente en medio de nosotros para proclamar la Buena Nueva de la salvación.`,
            oracion_fieles: [
              "Por la Santa Iglesia de Dios y nuestro Obispo, para que custodien el depósito de la fe con celo apostólico. Roguemos al Señor.",
              "Por las autoridades civiles y los gobernantes, para que promuevan la justicia, la paz y el bien común. Roguemos al Señor.",
              "Por los enfermos, los pobres y los que sufren tribulación, para que sientan la caricia consoladora de Dios. Roguemos al Señor.",
              "Por nuestra asamblea parroquial, para que al participar de este altar seamos auténticos testigos del Evangelio. Roguemos al Señor."
            ]
          }
        });
      }

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
      res.json({ success: true, data: parsed });
    } catch (error: any) {
      console.error("Error generating moniciones:", error);
      res.status(500).json({ error: error.message || "Error al generar moniciones" });
    }
  });

  // 2. Generate Homiletic Reflection / Patristic Subsidio
  app.post("/api/gemini/homilia", async (req, res) => {
    try {
      const { fecha, celebracion, lecturas, enfoque } = req.body;
      const ai = getAi();

      if (!ai) {
        return res.json({
          success: true,
          data: {
            titulo: `Subsidio Homilético para ${celebracion || fecha}`,
            puntos_clave: [
              "La primacía de la gracia divina en la vida del cristiano.",
              "El llamado a la conversión continua y al testimonio de caridad.",
              "La Eucaristía como fuente y cumbre de toda la misión eclesial."
            ],
            texto_homilia: `Hermanos en Cristo: Al contemplar las lecturas sagradas proclamadas en este día, la liturgia nos invita a fijar nuestra mirada en el corazón mismo del misterio pascual. San Agustín enseñaba que la Sagrada Escritura es la carta de Dios a los hombres; en ella no encontramos meros preceptos morales, sino el testimonio vivo del amor del Padre.\n\nEl Santo Evangelio que acabamos de escuchar nos interpela de manera directa en nuestra vida diaria. Cristo no busca admiradores distantes, sino discípulos convencidos que estén dispuestos a cargar su cruz y seguirle con generosidad. En la mesa de la Eucaristía recibimos la fuerza que necesitamos para perseverar en medio de las pruebas del mundo.`
          }
        });
      }

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
      res.json({ success: true, data: parsed });
    } catch (error: any) {
      console.error("Error generating homilia:", error);
      res.status(500).json({ error: error.message || "Error al generar homilía" });
    }
  });

  // 3. Padre PRO Liturgical Assistant & Advisor
  app.post("/api/gemini/padre-pro", async (req, res) => {
    try {
      const { messages, context } = req.body;
      const ai = getAi();

      if (!ai) {
        return res.json({
          reply: "¡La paz esté con ustedes! Soy el asistente litúrgico Padre PRO. Para acceder a consultas teológicas y canónicas en tiempo real, puedes configurar tu GEMINI_API_KEY. Con mucho gusto te asisto en todo lo relativo al Misal Romano 3ra Edición, el Leccionario y las Rúbricas de los Sacramentos."
        });
      }

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

      res.json({ reply: response.text || "Paz y bien. ¿En qué más puedo servirte en la preparación litúrgica?" });
    } catch (error: any) {
      console.error("Error in Padre PRO:", error);
      res.status(500).json({ error: error.message || "Error en la consulta litúrgica" });
    }
  });

  // 4. Generate Parish Bulletin / Boletín Parroquial
  app.post("/api/gemini/boletin", async (req, res) => {
    try {
      const { parroquia, fecha, celebracion, lema, avisos, lecturas } = req.body;
      const ai = getAi();

      if (!ai) {
        return res.json({
          success: true,
          editorial: `Querida comunidad parroquial de ${parroquia || 'nuestra Parroquia'}: Al celebrar este domingo, renovamos nuestra vocación comunitaria de ser sal de la tierra y luz del mundo. Que las diversas actividades de nuestros grupos y apostolados sean testimonio vivo del amor de Cristo.`,
          lemaSugerido: lema || "Caminando juntos en comunión, participación y misión",
          reflexionSemanal: "La Eucaristía dominical es el corazón que bombea la vida espiritual a todas nuestras familias. No dejemos de alimentar nuestra fe con la oración y el servicio al prójimo."
        });
      }

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
      res.json({ success: true, data: parsed });
    } catch (error: any) {
      console.error("Error generating boletin:", error);
      res.status(500).json({ error: error.message || "Error al redactar boletín" });
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
