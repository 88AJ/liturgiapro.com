import os
import time
import json
import pydantic
import google.generativeai as genai
from glob import glob
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))

class Eucologia(pydantic.BaseModel):
    oracion_colecta: str
    oracion_ofrendas: str
    antifona_comunion: str
    oracion_despues_comunion: str
    antifona_entrada: str

def upload_or_get_misal(pdf_filename):
    display_name = f"misal_{os.path.basename(pdf_filename).replace(' ', '_')}"
    print(f"Buscando {display_name} en Gemini...")
    for f in genai.list_files():
        if f.display_name == display_name:
            return f
            
    print(f"Subiendo {pdf_filename} a la nube...")
    f = genai.upload_file(path=pdf_filename, display_name=display_name)
    while f.state.name == 'PROCESSING':
        print('.', end='', flush=True)
        time.sleep(2)
        f = genai.get_file(f.name)
    return f

def extract_misal_prayers(fecha, ordo_instrucciones):
    misal_paginas = ordo_instrucciones.get('misal_paginas', '')
    if not misal_paginas:
        return None
        
    print(f"📖 Identificando qué Tomo del Misal usar para {fecha}...")
    # Heurística simple para escoger el archivo local del Misal
    file_path = "ritualesespa/Misales Romanos/Ordinario.pdf"
    t_lower = ordo_instrucciones.get('titulo', '').lower()
    
    if "pascua" in t_lower:
        file_path = "ritualesespa/Misales Romanos/Pascua.pdf"
    elif "cuaresma" in t_lower:
        file_path = "ritualesespa/Misales Romanos/Cuaresma.pdf"
    elif "adviento" in t_lower:
        file_path = "ritualesespa/Misales Romanos/Adviento.pdf"
    elif "navidad" in t_lower:
        file_path = "ritualesespa/Misales Romanos/Navidad.pdf"

    if not os.path.exists(file_path):
        print(f"⚠️ PDF no encontrado: {file_path}")
        return None
        
    uploaded_pdf = upload_or_get_misal(file_path)
    model = genai.GenerativeModel('gemini-2.5-pro')
    
    prompt = f"""
    Eres el Maestro de Ceremonias. Actúa basándote en el documento oficial del Misal Romano adjunto.
    Para el día {fecha} (Título: {ordo_instrucciones.get('titulo')}), el Ordo indica las siguientes referencias del misal:
    "{misal_paginas}"
    
    Por favor, busca las oraciones exactas para esta Misa en el PDF adjunto (usa la búsqueda de texto o sigue el índice ontológico) y extrae:
    - antifona_entrada: La antífona de entrada completa.
    - oracion_colecta: Oración colecta.
    - oracion_ofrendas: Oración sobre las ofrendas.
    - antifona_comunion: La antífona de comunión.
    - oracion_despues_comunion: Oración para después de la comunión.
    
    Las respuestas DEBEN SER COPIADAS LITERALMENTE DEL PDF. No inventes oraciones ni uses abreviaturas.
    """
    
    try:
        response = model.generate_content(
            [uploaded_pdf, prompt],
            generation_config=genai.GenerationConfig(
                response_mime_type="application/json",
                response_schema=Eucologia,
                temperature=0.1
            )
        )
        return json.loads(response.text)
    except Exception as e:
        print(f"❌ Error en Gemini Misal RAG: {e}")
        return None
