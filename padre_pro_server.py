import os
import sys
import glob
from PyPDF2 import PdfReader, PdfWriter
from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

API_KEY = os.environ.get("GEMINI_API_KEY")
if not API_KEY:
    print("❌ Error: GEMINI_API_KEY no encontrada.")
    sys.exit(1)

client = genai.Client(api_key=API_KEY)

MASTER_PDF_PATH = "Magisterio_Completo.pdf"
MAGISTERIO_CACHE_ID = None
CACHED_UPLOAD = None
CHAT_SESSIONS = {} # user_session_id -> chat object

def compile_magisterium():
    """Consolida todos los PDFs canónicos en uno solo para optimizar Gemini File API"""
    if os.path.exists(MASTER_PDF_PATH):
        print(f"✅ {MASTER_PDF_PATH} ya existe. Usando versión compilada.")
        return MASTER_PDF_PATH

    print("📚 Compilando Magisterio Completo en un solo volumen...")
    writer = PdfWriter()
    
    # Fuentes base
    sources = [
        "ritualesespa/INSTRUCCIÓN GENERAL DEL MISAL ROMANO/IGMR1.pdf",
        "ritualesespa/MANUAL DE INDULGENCIAS/Indulgencias.pdf",
        "ritualesespa/CARTA APOSTÓLICA «MYSTERII PASCHALIS»/Nuevas Normas Universales Calendario.pdf",
        "ritualesespa/Directorio Homiletico/Directorio Homilietico.pdf",
        "ritualesespa/DIRECTORIO PARA LAS CELEBRACIONES DOMINICALES EN AUSENCIA DEL PRESBÍTERO /Directorio Ausencia Presbitero .pdf",
        "Sapient Fide/Liturgia/Liturgia.pdf"
    ]
    
    # Agregar carpetas particionadas
    carpetas = ["ritualesespa/Ceremonial de los Obispos", "ritualesespa/Bendicional"]
    for c in carpetas:
        for f in glob.glob(f"{c}/**/*.pdf", recursive=True):
            sources.append(f)
            
    added_files = 0
    for path in sources:
        if os.path.exists(path):
            try:
                reader = PdfReader(path)
                for page in reader.pages:
                    writer.add_page(page)
                added_files += 1
                print(f" + Agregado: {path}")
            except Exception as e:
                print(f" ⚠️ No se pudo leer {path}: {e}")
        else:
            print(f" ⚠️ No se encontró: {path}")

    with open(MASTER_PDF_PATH, "wb") as f:
        writer.write(f)
    print(f"✅ Compilación terminada: {added_files} documentos unidos.")
    return MASTER_PDF_PATH

def initialize_gemini():
    """Sube el gran Libro Magisterial a Google Gemini."""
    global CACHED_UPLOAD
    compile_magisterium()
    print("☁️ Subiendo Magisterio a Gemini...")
    try:
        CACHED_UPLOAD = client.files.upload(file=MASTER_PDF_PATH, config={'display_name': 'Corpus_Liturgico'})
        print(f"✅ Subida exitosa. URI: {CACHED_UPLOAD.uri}")
    except Exception as e:
        print(f"❌ Error subiendo a Gemini: {e}")

@app.route("/chat", methods=["POST"])
def chat():
    global CACHED_UPLOAD, CHAT_SESSIONS
    data = request.json
    mensaje_usuario = data.get("message", "")
    session_id = data.get("session_id", "default_user")

    if not mensaje_usuario:
        return jsonify({"error": "Mensaje vacío"}), 400

    # Inicializar chat si no existe en memoria
    if session_id not in CHAT_SESSIONS:
        # System instructions
        sys_prompt = """
Estando en comunión con la Iglesia Católica Romana, asumes el rol de 'Padre PRO'. Eres un experto e infalible liturgista y canonista de la Arquidiócesis.
Responde estrictamente basándote en el archivo Magisterial PDF adjunto (que contiene el Misal, Bendicional, Ceremonial, etc.).
No inventes costumbres ni devociones populares ajenas a los libros. Cita siempre el libro y el numeral si está disponible.
Tu tono es solemne, pastoral y directo. Utiliza sintaxis de markdown para formatear tu respuesta haciéndola legible.
Cuando saludes o concluyas, muestra paz crística.
"""
        
        # Enviar historial base incluyendo el archivo
        history = [
            types.Content(
                role="user",
                parts=[
                    types.Part.from_uri(file_uri=CACHED_UPLOAD.uri, mime_type="application/pdf"),
                    types.Part.from_text("Por favor, memoriza este Magisterio. Te haré preguntas basadas en él.")
                ]
            ),
            types.Content(
                role="model",
                parts=[types.Part.from_text("La paz de Cristo. He internalizado el Magisterio Católico. Estoy listo para asistirte, hijo mío.")]
            )
        ]
        
        chat_instance = client.chats.create(
            model="gemini-2.5-flash",
            config=types.GenerateContentConfig(
                system_instruction=sys_prompt,
                temperature=0.0
            ),
            history=history
        )
        CHAT_SESSIONS[session_id] = chat_instance

    chat_instance = CHAT_SESSIONS[session_id]
    
    try:
        response = chat_instance.send_message(mensaje_usuario)
        return jsonify({"response": response.text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    initialize_gemini()
    print("🕊️ Padre PRO Server escuchando en http://localhost:8085")
    app.run(host="0.0.0.0", port=8085, debug=False)
