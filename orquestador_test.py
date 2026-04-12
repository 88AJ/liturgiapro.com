import os
import json
from google import genai
from google.genai import types
from dotenv import load_dotenv

# 1. Cargar variables de entorno (Tu API Key)
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

# 2. Cargar la "Ley" (Gramática Estática)
ruta_reglas = "liturgyofthetime/reglas_ordinario.json"
try:
    with open(ruta_reglas, 'r', encoding='utf-8') as f:
        reglas_liturgicas = json.load(f)
except FileNotFoundError:
    print(f"❌ Error: No se encontró el archivo {ruta_reglas}")
    exit(1)

# 3. Configurar el Orquestador Gemini
client = genai.Client(api_key=api_key)
config = types.GenerateContentConfig(
    response_mime_type="application/json",
    temperature=0.0 # Determinismo absoluto, no queremos creatividad
)

# 4. Definir el Caso de Prueba (El "Dasein" litúrgico)
contexto_celebracion = {
    "fecha": "2026-04-12",
    "dia_liturgico": "Domingo de la Octava de Pascua",
    "tipo_misa": "solemnidad",
    "modificadores_activos": ["rito_aspersion_activo"] # Simulamos que el usuario marcó aspersión
}

# 5. Prompt de Ingeniería (El Contrato)
prompt_orquestador = f"""
Eres el 'Orquestador Litúrgico' de Liturgia Pro.
Tu único objetivo es leer el CONTEXTO DE LA CELEBRACIÓN y cruzarlo con las REGLAS LITÚRGICAS (Ley Canónica) para determinar qué bloques del Ordinario de la Misa deben imprimirse y cuáles deben omitirse.

CONTEXTO DE LA CELEBRACIÓN:
{json.dumps(contexto_celebracion, indent=2)}

REGLAS LITÚRGICAS (Lógica de supresión/activación):
{json.dumps(reglas_liturgicas, indent=2)}

INSTRUCCIONES:
1. Evalúa cada bloque en 'ritos_iniciales' y 'liturgia_palabra'.
2. Si el contexto cumple una 'condicion_supresion', el bloque DEBE ser omitido. (Revisa si en modificadores_activos hay algo que suprima el bloque).
3. Si el contexto cumple una 'condicion_activacion' o el bloque es 'obligatorio', DEBE ser incluido.
4. Devuelve ESTRICTAMENTE un objeto JSON con un array llamado 'esqueleto_ensamblaje'. Cada elemento del array debe contener el 'id_bloque', la 'accion' ("incluir" o "omitir"), y el 'motivo' lógico de tu decisión.

Estructura esperada:
{{
  "esqueleto_ensamblaje": [
    {{ "id_bloque": "saludo_inicial", "accion": "incluir", "motivo": "Bloque obligatorio" }},
    ...
  ]
}}
"""

print(f"🧠 Consultando al Orquestador Gemini para: {contexto_celebracion['dia_liturgico']}...")

# 6. Ejecución
respuesta = client.models.generate_content(
    model='gemini-2.5-flash',
    contents=prompt_orquestador,
    config=config
)

# 7. Imprimir el Mapa de Ensamblaje
print("\n=== ESQUELETO DE ENSAMBLAJE GENERADO ===")
print(respuesta.text)
