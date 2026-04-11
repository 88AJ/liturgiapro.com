import os
import json
import argparse
from datetime import datetime
from google import genai

from dotenv import load_dotenv
load_dotenv()

def init_gemini():
    return genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))

def get_tomo_for_date(target_date):
    """
    Very rough heuristic for 2026 Liturgical Year.
    A true implementation would use a liturgical calendar library.
    Cuaresma 2026 starts Feb 18. Pentecost is May 24.
    """
    y, m, d = target_date.year, target_date.month, target_date.day
    
    if m == 12 or (m == 11 and d > 25) or (m == 1 and d < 15):
        return "Tomo I"
    elif (m == 2 and d >= 18) or m in [3, 4] or (m == 5 and d <= 30):
        return "Tomo II"
    elif m in [1, 2, 6, 7]:
        return "Tomo III" # Early ordinary time and post pentecost
    else:
        return "Tomo IV" # August to November

def parse_with_gemini(client, target_date, tomo_name, uris):
    tomo_uri_list = uris.get(tomo_name)
    if not tomo_uri_list:
        print(f"❌ No URI found for {tomo_name}")
        return None

    # We must retrieve the file objects to pass to the API
    tomo_files = []
    for uri in tomo_uri_list:
        try:
            f_obj = client.files.get(name=uri.replace("https://generativelanguage.googleapis.com/v1beta/", ""))
            tomo_files.append(f_obj)
        except Exception as e:
            print(f"File URI lookup issue for {uri}: {e}. Trying to fetch by list...")
            # Fallback
            for f in client.files.list():
                if f.uri == uri:
                    tomo_files.append(f)
                    break
    
    if not tomo_files:
        print("Files not uploaded correctly.")
        return None

    prompt = f"""
Actúa como experto litúrgico del Rito Romano. Tienes adjunto el PDF del {tomo_name} de la Liturgia de las Horas.
Busca la Liturgia para la fecha exacta o el día litúrgico correspondiente a {target_date.strftime('%Y-%m-%d')}.
Debes extraer estrictamente las LAUDES y VÍSPERAS de ese día, usando el organigrama correcto (Salmos según la semana del Salterio que toque, y antífonas/lecturas del propio del tiempo o de los santos).

Construye la respuesta en JSON puro con la siguiente estructura (no uses tags markdown ni texto extra):
{{
  "laudes": {{
    "salmo1": {{"antifona": "...", "texto": "..."}},
    "cantico_at": {{"antifona": "...", "texto": "..."}},
    "salmo2": {{"antifona": "...", "texto": "..."}},
    "lectura_breve": {{"cita": "...", "texto": "..."}},
    "responsorio_breve": {{"antifona": "..."}},
    "cantico_evangelico": {{"antifona": "...", "texto": "..."}},
    "preces": "Peticion 1...\\n- Peticion 2...",
    "oracion": "..."
  }},
  "visperas": {{
    "salmo1": {{"antifona": "...", "texto": "..."}},
    "salmo2": {{"antifona": "...", "texto": "..."}},
    "cantico_nt": {{"antifona": "...", "texto": "..."}},
    "lectura_breve": {{"cita": "...", "texto": "..."}},
    "responsorio_breve": {{"antifona": "..."}},
    "cantico_evangelico": {{"antifona": "...", "texto": "..."}},
    "preces": "Peticion 1...\\n- Peticion 2...",
    "oracion": "..."
  }}
}}
Si no encuentras las oraciones, deja el campo vacío.
"""

    print(f"🧠 Consultando Gemini con {tomo_name} (secciones: {len(tomo_files)})...")
    response = client.models.generate_content(
        model='gemini-1.5-pro-002',
        contents=tomo_files + [prompt]
    )

    json_text = response.text
    import re
    match = re.search(r'\{.*\}', json_text, re.DOTALL)
    if match:
        json_text = match.group(0)
    else:
        json_text = json_text.replace("```json", "").replace("```", "").strip()
        
    try:
        data = json.loads(json_text)
        return data
    except Exception as e:
        print(f"❌ Error parseando JSON de Gemini: {e}")
        return None

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--date", type=str, required=True, help="YYYY-MM-DD")
    args = parser.parse_args()

    date_obj = datetime.strptime(args.date, "%Y-%m-%d")
    
    uris_path = "data/tomos_uris.json"
    if not os.path.exists(uris_path):
        print("Corre primero upload_tomos_engine.py para generar las URIs")
        exit(1)
        
    with open(uris_path, "r") as f:
        uris = json.load(f)

    tomo = get_tomo_for_date(date_obj)
    
    client = init_gemini()
    res = parse_with_gemini(client, date_obj, tomo, uris)
    
    if res:
        print("✅ Extracción exitosa:")
        print(json.dumps(res, indent=2, ensure_ascii=False))
