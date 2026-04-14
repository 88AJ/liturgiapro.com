import os
import json
import time
import argparse
import pydantic
from datetime import datetime
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.environ["GEMINI_API_KEY"])

class OrdoDayInstructions(pydantic.BaseModel):
    fecha: str
    titulo_primario: str
    color: str
    grado: str
    rango_liturgico_num: int
    memoria_suprimida: str
    modificadores: list[str]
    misal_paginas: str
    leccionario_paginas: str
    liturgia_horas_tomo: str
    liturgia_horas_paginas: str
    texto_completo_ordo: str

def upload_or_get_file(file_path):
    display_name = "calendario_25_26"
    print(f"Buscando archivo en Gemini ({display_name})...")
    # Intentar rehusar si ya está arriba para ahorrar tokens/tiempo
    for f in genai.list_files():
        if f.display_name == display_name:
            print("Archivo encontrado en la nube.")
            return f
            
    print("Subiendo calendario a Gemini...")
    f = genai.upload_file(path=file_path, display_name=display_name)
    while f.state.name == 'PROCESSING':
        print('.', end='', flush=True)
        time.sleep(2)
        f = genai.get_file(f.name)
    print("\nArchivo listo para análisis.")
    return f

def extract_ordo_for_date(date_str):
    date_obj = datetime.strptime(date_str, "%Y-%m-%d")
    meses_es = ['ENER', 'FEBRER', 'MARZ', 'ABRIL', 'MAY', 'JUNI', 'JULI', 'AGOST', 'SEPTIEMBR', 'OCTUBR', 'NOVIEMBR', 'DICIEMBR']
    
    file_path = "ritualesespa/Calendario Liturgico 2025-2026/25-26.pdf"
    if not os.path.exists(file_path):
        print(f"❌ No se encontró el Calendario Litúrgico Oficial en {file_path}")
        return None
        
    uploaded_file = upload_or_get_file(file_path)
    model = genai.GenerativeModel('gemini-2.5-pro')
    
    prompt = f"""
    Eres el Liturgo Mayor y experto en Derecho Canónico (Normas Universales sobre el Año Litúrgico). He subido el Calendario Litúrgico / Directorio de 2025-2026.
    Por favor, busca la instrucción para el día exacto: {date_str} (Día {date_obj.day} del mes {meses_es[date_obj.month - 1]}).
    
    ESTRUCTURA Y PRECEDENCIA CANÓNICA (REGLAS DE ORO):
    1. Si es la Octava de Pascua (ej. Lunes de la Octava de Pascua), DEBES asignar Rango Litúrgico 1 (Solemnidad) y suprimir las memorias de cualquier santo registrado en esa fecha, colocándolos ÚNICAMENTE en `memoria_suprimida`.
    2. El título principal de celebración va en `titulo_primario` (ej. LUNES DE LA OCTAVA DE PASCUA).
    3. Determina el color litúrgico y escríbelo en `color` (Blanco, Rojo, Morado, Verde).
    4. El grado litúrgico va en `grado` (FERIA, MEMORIA, FIESTA, SOLEMNIDAD, DOMINGO).
    5. Modificadores obligatorios: Analiza el contexto. Si cae dentro de la Octava de Pascua, en el array `modificadores` DEBES incluir exactamente estos strings: "gloria_obligatorio", "secuencia_obligatoria", "aleluya_pascual".
    
    Debes devolver un JSON exacto sobre qué procede para este día, incluyendo:
    - fecha: YYYY-MM-DD
    - titulo_primario: Nombre principal de la celebración.
    - color: color litúrgico primario.
    - grado: Grado de celebración.
    - rango_liturgico_num: Número entero del 1 al 4 (1 = Solemnidad, 4 = Feria).
    - memoria_suprimida: Santo menor omitido por conflictos de grado (dejar vacío si no aplica).
    - modificadores: Lista de strings con triggers litúrgicos.
    - misal_paginas, leccionario_paginas, liturgia_horas_tomo, liturgia_horas_paginas: (No inventes los números de página, cópialos de lo que diga el PDF).
    - texto_completo_ordo: Todo el texto copiado literalmente que aparezca en la celda/párrafo de este día.
    """
    
    print(f"🧠 Consultando el Directorio para la fecha: {date_str}...")
    try:
        response = model.generate_content(
            [uploaded_file, prompt],
            generation_config=genai.GenerationConfig(
                response_mime_type="application/json",
                response_schema=OrdoDayInstructions,
                temperature=0.1
            )
        )
        data = json.loads(response.text)
        print("✅ Análisis Ontológico Exitoso.")
        return data
    except Exception as e:
        print(f"❌ Error durante el parsing con Gemini: {e}")
        return None

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('--date', required=True, help="YYYY-MM-DD")
    args = parser.parse_args()
    
    resultado = extract_ordo_for_date(args.date)
    if resultado:
        print("\n--- RESULTADO MAGISTERIAL ---")
        print(json.dumps(resultado, indent=2, ensure_ascii=False))
