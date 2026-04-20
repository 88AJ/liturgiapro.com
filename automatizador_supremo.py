import sys
import json
import argparse
from datetime import datetime, timedelta
import re
import os

from scraper_motor import extract_usccb_data, extract_cem_data
from gemini_liturgo import init_gemini, prompt_gemini_for_day
from liturgia_pdf_parser import get_tomo_for_date, parse_with_gemini
from ordo_parser import extract_ordo_for_date
from misal_rag import extract_misal_prayers

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

def compile_day(date_obj, db):
    date_key = date_obj.strftime("%Y-%m-%d")
    print(f"\n=============================================")
    print(f"🛠️  INICIANDO ORQUESTACIÓN SUPREMA: {date_key}")
    print(f"=============================================")
    
    # 1. PARSEO DEL ORDO
    print("📜 Leyendo el Calendario Litúrgico (Directorio)...")
    ordo = extract_ordo_for_date(date_key)
    
    if date_key not in db:
        db[date_key] = {"fecha": date_key, "liturgia_palabra": {}, "liturgia_eucaristica": {}}
    
    if ordo:
        db[date_key]["tiempo_liturgico"] = "Ordinario"
        t_low = ordo.get("titulo_primario", "").lower()
        if "pascua" in t_low: db[date_key]["tiempo_liturgico"] = "Pascua"
        elif "cuaresma" in t_low: db[date_key]["tiempo_liturgico"] = "Cuaresma"
        elif "adviento" in t_low: db[date_key]["tiempo_liturgico"] = "Adviento"
        
        db[date_key]["titulo_celebracion"] = ordo.get("titulo_primario", "")
        db[date_key]["color"] = ordo.get("color", "verde").lower()
        db[date_key]["grado"] = ordo.get("grado", "Feria")
        db[date_key]["gloria"] = "domingo" in db[date_key]["grado"].lower() or "fiesta" in db[date_key]["grado"].lower() or "solemnidad" in db[date_key]["grado"].lower()

    # 2. SCKRAPER WEB (LECTURAS)
    print("📡 Extrayendo México (CEM)...")
    data_es = extract_cem_data(date_obj)
    
    print("📡 Extrayendo USCCB (EN)...")
    data_en = extract_usccb_data(date_obj)
    
    # Fusión Lecturas
    for key in ['primera_lectura', 'salmo_responsorial', 'segunda_lectura', 'evangelio']:
        if key not in db[date_key]['liturgia_palabra']:
            db[date_key]['liturgia_palabra'][key] = {}
        if key in data_es:
            db[date_key]['liturgia_palabra'][key].update(data_es[key])
        if key in data_en:
            db[date_key]['liturgia_palabra'][key].update(data_en[key])
            
    # 3. EXTRACCIÓN DEL MISAL RAG
    if ordo and ordo.get('misal_paginas'):
        print("✝️ Buscando oraciones en el Misal Romano PDF...")
        eucologia = extract_misal_prayers(date_key, ordo)
        if eucologia:
            db[date_key]['oracion_colecta'] = eucologia.get('oracion_colecta')
            db[date_key]['antifona_entrada'] = eucologia.get('antifona_entrada')
            
            if 'liturgia_eucaristica' not in db[date_key]:
                db[date_key]['liturgia_eucaristica'] = {}
                
            db[date_key]['liturgia_eucaristica']['oracion_ofrendas'] = eucologia.get('oracion_ofrendas')
            db[date_key]['liturgia_eucaristica']['antifona_comunion'] = eucologia.get('antifona_comunion')
            db[date_key]['liturgia_eucaristica']['oracion_despues_comunion'] = eucologia.get('oracion_despues_comunion')

    # 4. EXTRACCIÓN LITURGIA DE LAS HORAS
    client = init_gemini()
    tomo = get_tomo_for_date(date_obj)
    if ordo and ordo.get('liturgia_horas_tomo'):
        t_tomo = ordo.get('liturgia_horas_tomo')
        if 'Tomo I' in t_tomo: tomo = 'Tomo I'
        if 'Tomo II' in t_tomo: tomo = 'Tomo II'
        if 'Tomo III' in t_tomo: tomo = 'Tomo III'
        if 'Tomo IV' in t_tomo: tomo = 'Tomo IV'
    
    uris_path = "data/tomos_uris.json"
    if os.path.exists(uris_path):
        with open(uris_path, "r") as f:
            uris = json.load(f)
        print(f"📖 Extrayendo Liturgia Horas desde {tomo}...")
        horas_data = parse_with_gemini(client, date_obj, tomo, uris)
        
        if horas_data:
            if 'laudes' in horas_data: db[date_key]['laudes'] = horas_data['laudes']
            if 'visperas' in horas_data: db[date_key]['visperas'] = horas_data['visperas']
        else:
            print("⚠️ Advertencia: No se pudo reconstruir la Liturgia de las Horas.")
            
    print(f"✅ Compilación de {date_key} completada.")

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Supreme Orchestrator Ordo")
    parser.add_argument('--start', type=str, required=True, help="YYYY-MM-DD")
    parser.add_argument('--end', type=str, required=True, help="YYYY-MM-DD")
    args = parser.parse_args()
    
    start_date = datetime.strptime(args.start, "%Y-%m-%d")
    end_date = datetime.strptime(args.end, "%Y-%m-%d")
    
    db = load_db()
    
    curr = start_date
    while curr <= end_date:
        compile_day(curr, db)
        save_db(db) # Auto save per day
        curr += timedelta(days=1)
        
    print("\n🎉 MEGA COMPILACIÓN MAGISTERIAL FINALIZADA Y GUARDADA. 🎉")
