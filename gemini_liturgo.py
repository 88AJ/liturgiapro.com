import os
import sys
import json
import re
import argparse
from google import genai
from dotenv import load_dotenv

load_dotenv()

def init_gemini():
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("❌ Error: GEMINI_API_KEY no encontrada en las variables de entorno o archivo .env")
        sys.exit(1)
    
    # Initialize real GenAI client
    client = genai.Client(api_key=api_key)
    return client

def load_db():
    try:
        with open('data/liturgia_db.js', 'r', encoding='utf-8') as f:
            content = f.read()
            # Quitamos el window.liturgiaData = 
            json_str = re.sub(r'^window\.liturgiaData\s*=\s*', '', content.strip())
            json_str = re.sub(r';$', '', json_str)
            return json.loads(json_str)
    except Exception as e:
        print(f"❌ Error leyendo liturgia_db.js: {e}")
        return {}

def save_db(db):
    try:
        with open('data/liturgia_db.js', 'w', encoding='utf-8') as f:
            f.write("window.liturgiaData = ")
            json.dump(db, f, indent=2, ensure_ascii=False)
            f.write(";\n")
        print("✅ Base de datos actualizada con éxito.")
    except Exception as e:
        print(f"❌ Error guardando liturgia_db.js: {e}")

def prompt_gemini_for_day(client, db, target_date):
    if target_date not in db:
        print(f"❌ La fecha {target_date} no se encuentra en la base de datos local.")
        return False
        
    dia_data = db[target_date]
    palabra = dia_data.get('liturgia_palabra', {})
    
    # Extraer textos para contexto
    evangelio_texto = palabra.get('evangelio', {}).get('texto', '')
    primera_texto = palabra.get('primera_lectura', {}).get('texto', '')
    segunda_texto = palabra.get('segunda_lectura', {}).get('texto', '')
    salmo_texto = palabra.get('salmo_responsorial', {}).get('texto', '')
    
    # Generar prompt
    prompt = f"""
Actúa como un Liturgo Experto y Magisterial del Rito Romano, operando para la Conferencia del Episcopado Mexicano.
Necesito que redactes las MONICIONES (introducciones breves para leerse antes de las lecturas) y una REFLEXIÓN HOMILÉTICA concisa basada en las lecturas del día {target_date}.

Las lecturas proporcionadas de este día son:
[PRIMERA LECTURA]
{primera_texto}

[SALMO RESPONSORIAL]
{salmo_texto}

[SEGUNDA LECTURA]
{segunda_texto}

[EVANGELIO]
{evangelio_texto}

REGLAS DE GENERACIÓN:
1. Las moniciones deben ser breves, pastorales, e introducir al misterio que se va a escuchar, sin resumir la lectura literalmente. Deben estar dirigidas a la asamblea.
2. Si no hay Segunda Lectura, deja su monicion vacia.
3. La reflexión homilética debe ser una serie de 3 puntos claros y hermosos que un sacerdote podría usar como base para su sermón, teológicamente profunda.
4. Responde ÚNICA Y EXCLUSIVAMENTE con un bloque JSON bien estructurado, sin markdown, sin texto fuera del JSON.

El formato JSON estricto debe ser:
{{
  "monicion_entrada": "Hermanos, nos reunimos hoy para celebrar...",
  "monicion_primera_lectura": "...",
  "monicion_segunda_lectura": "...",
  "monicion_evangelio": "...",
  "reflexion_homiletica": "..."
}}
"""
    
    print(f"🧠 Consultando a Gemini para {target_date}...")
    import time
    max_retries = 3
    for attempt in range(max_retries):
        try:
            response = client.models.generate_content(
                model='gemini-2.5-flash-lite',
                contents=prompt
            )
            # Extraer JSON de la respuesta garantizando que funcione aunque haya texto extra
            json_text = response.text
            match = re.search(r'\{.*\}', json_text, re.DOTALL)
            if match:
                json_text = match.group(0)
            else:
                json_text = json_text.replace("```json", "").replace("```", "").strip()
                
            data_ia = json.loads(json_text)
            break
        except Exception as e:
            print(f"⚠️ Intento {attempt + 1}/{max_retries} falló: {e}")
            if attempt < max_retries - 1:
                print("⏳ Reintentando en 3 segundos...")
                time.sleep(3)
                continue
            else:
                print(f"❌ Error definitivo durante la generación con Gemini: {e}")
                return False
        
    # Inyectar en DB local
    if 'primera_lectura' in palabra and data_ia.get('monicion_primera_lectura'):
        palabra['primera_lectura']['monicion'] = data_ia['monicion_primera_lectura']
        
    if 'segunda_lectura' in palabra and data_ia.get('monicion_segunda_lectura'):
        palabra['segunda_lectura']['monicion'] = data_ia['monicion_segunda_lectura']
        
    if 'evangelio' in palabra and data_ia.get('monicion_evangelio'):
        palabra['evangelio']['monicion'] = data_ia['monicion_evangelio']
        
    # Para monicion entrada y reflexion, los pondremos bajo el nodo de ese dia.
    dia_data['monicion_entrada'] = data_ia.get('monicion_entrada')
    dia_data['reflexion_homiletica'] = data_ia.get('reflexion_homiletica')
    
    return True

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Generador Litúrgico de IA")
    parser.add_argument('--date', required=True, help="Fecha en formato YYYY-MM-DD")
    args = parser.parse_args()
    
    client = init_gemini()
    db = load_db()
    
    if prompt_gemini_for_day(client, db, args.date):
        save_db(db)
    else:
        sys.exit(1)
