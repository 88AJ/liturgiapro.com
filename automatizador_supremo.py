import sys
import json
import argparse
from datetime import datetime, timedelta
import re
import os

from scraper_motor import extract_usccb_data, extract_cem_data
from gemini_liturgo import init_gemini, prompt_gemini_for_day
from liturgia_pdf_parser import get_tomo_for_date, parse_with_gemini

def load_db():
    db_path = "data/liturgia_db.js"
    if not os.path.exists(db_path):
        return {}
    with open(db_path, "r", encoding="utf-8") as f:
        content = f.read()
    json_str = re.sub(r'^window\.liturgiaData\s*=\s*|;$', '', content.strip())
    try:
        return json.loads(json_str)
    except Exception as e:
        print(f"Error parsing DB: {e}")
        return {}

def save_db(db):
    db_path = "data/liturgia_db.js"
    new_js = "window.liturgiaData = " + json.dumps(db, indent=2, ensure_ascii=False) + ";"
    with open(db_path, 'w', encoding='utf-8') as f:
        f.write(new_js)

def compile_day(date_obj, client, db):
    date_key = date_obj.strftime("%Y-%m-%d")
    print(f"\n=============================================")
    print(f"🛠️  INICIANDO COMPILACIÓN: {date_key}")
    print(f"=============================================")
    
    if date_key not in db:
        db[date_key] = {"fecha": date_key, "liturgia_palabra": {}, "liturgia_eucaristica": {}}
    else:
        # Prevent erasing color and title
        if 'liturgia_palabra' not in db[date_key]:
            db[date_key]['liturgia_palabra'] = {}
        if 'liturgia_eucaristica' not in db[date_key]:
            db[date_key]['liturgia_eucaristica'] = {}

    # 1. Scrape CEM (ES)
    print("📡 Extrayendo México (CEM)...")
    data_es = extract_cem_data(date_obj)
    
    # 2. Scrape USCCB (EN)
    print("📡 Extrayendo USCCB (EN)...")
    data_en = extract_usccb_data(date_obj)
    
    # FUSION
    if 'oracion_colecta' in data_es: db[date_key]['oracion_colecta'] = data_es['oracion_colecta']
    if 'oracion_ofrendas' in data_es: db[date_key]['liturgia_eucaristica']['oracion_ofrendas'] = data_es['oracion_ofrendas']
        
    for key in ['primera_lectura', 'salmo_responsorial', 'segunda_lectura', 'evangelio']:
        if key not in db[date_key]['liturgia_palabra']:
            db[date_key]['liturgia_palabra'][key] = {}
        if key in data_es:
            db[date_key]['liturgia_palabra'][key].update(data_es[key])
        if key in data_en:
            db[date_key]['liturgia_palabra'][key].update(data_en[key])
            
    # 3. Scrape Liturgia Horas via PDF
    import json
    import os
    tomo = get_tomo_for_date(date_obj)
    uris_path = "data/tomos_uris.json"
    if os.path.exists(uris_path):
        with open(uris_path, "r") as f:
            uris = json.load(f)
        print(f"📖 Extrayendo Liturgia Horas nativa desde PDF ({tomo})...")
        horas_data = parse_with_gemini(client, date_obj, tomo, uris)
        
        if horas_data:
            if 'laudes' in horas_data: db[date_key]['laudes'] = horas_data['laudes']
            if 'visperas' in horas_data: db[date_key]['visperas'] = horas_data['visperas']
        else:
            print("⚠️ Advertencia: No se pudo reconstruir la Liturgia de las Horas desde el PDF.")
    else:
        print("⚠️ Error: Faltan las URIs de los PDFs. Ejecute upload_tomos_engine.py primero.")
    
    # 4. Gemini: Reflexión y Moniciones
    print("🧠 Magisterio IA: Generando Subsidio...")
    success = prompt_gemini_for_day(client, db, date_key)
    if not success:
        print("⚠️ Advertencia: No se pudo generar la homilética con IA.")
    else:
        print("✅ Generación teológica exitosa.")

    print(f"✅ Compilación de {date_key} completada.")

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Supreme Orchestrator")
    parser.add_argument('--start', type=str, required=True, help="YYYY-MM-DD")
    parser.add_argument('--end', type=str, required=True, help="YYYY-MM-DD")
    args = parser.parse_args()
    
    start_date = datetime.strptime(args.start, "%Y-%m-%d")
    end_date = datetime.strptime(args.end, "%Y-%m-%d")
    
    client = init_gemini()
    db = load_db()
    
    curr = start_date
    while curr <= end_date:
        compile_day(curr, client, db)
        save_db(db) # Auto save per day so we don't lose progress on crash
        curr += timedelta(days=1)
        
    print("\n🎉 MEGA COMPILACIÓN FINALIZADA Y GUARDADA. 🎉")
