import json
import os
import re
import argparse
import cloudscraper
from bs4 import BeautifulSoup
from datetime import datetime, timedelta

def get_usccb_url(target_date):
    # USCCB URL format: MMDDYY.cfm
    date_str = target_date.strftime('%m%d%y')
    return f"https://bible.usccb.org/bible/readings/{date_str}.cfm"

def get_misalmx_url(target_date):
    # misal.mx URL format: YYYY-MM-DD
    date_str = target_date.strftime('%Y-%m-%d')
    return f"https://misal.mx/{date_str}"

def extract_usccb_data(target_date):
    url = get_usccb_url(target_date)
    print(f"[USCCB] Extrayendo {url}...")
    scraper = cloudscraper.create_scraper()
    response = scraper.get(url)
    
    data_en = {}
    if response.status_code != 200:
        print("[USCCB] Lectura no disponible o aún no publicada.")
        return data_en
        
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Mapeo simple: el primer bloque suele ser Reading 1, luego Responsorial Psalm, luego Gospel
    blocks = soup.find_all('div', class_='b-lectionary')
    
    for block in blocks:
        title_el = block.find('h3', class_='name')
        if not title_el:
            title_el = block.find('h2', class_='name')
            
        if not title_el: continue
        title = title_el.get_text(strip=True).upper()
        
        cita_el = block.find('div', class_='address')
        cita = cita_el.get_text(strip=True) if cita_el else ""
        
        content_el = block.find('div', class_='b-verse')
        texto = content_el.get_text(separator="\n").strip() if content_el else ""
        
        if "READING 1" in title or "READING I" in title:
            data_en['primera_lectura'] = {'cita_en': cita, 'texto_en': texto}
        elif "READING 2" in title or "READING II" in title:
            data_en['segunda_lectura'] = {'cita_en': cita, 'texto_en': texto}
        elif "RESPONSORIAL PSALM" in title:
            # Separar respuesta del texto del salmo
            lines = texto.split('\n')
            res = lines[0].replace('R.', '').strip() if lines else "Response pending"
            txt = '\n'.join(lines[1:]).strip() if len(lines) > 1 else texto
            data_en['salmo_responsorial'] = {'cita_en': cita, 'respuesta_en': res, 'texto_en': txt}
        elif "GOSPEL" in title:
            data_en['evangelio'] = {'cita_en': cita, 'texto_en': texto}
            
    return data_en

def extract_cem_data(target_date):
    url = get_misalmx_url(target_date)
    print(f"[CEM] Extrayendo {url}...")
    
    # cloudscraper elude Mod_Security (Devuelve 200 en lugar de 406)
    scraper = cloudscraper.create_scraper(browser={'browser': 'chrome', 'platform': 'windows', 'desktop': True})
    response = scraper.get(url)
    
    data_es = {}
    if response.status_code != 200:
        print("[CEM] La fecha aún no ha sido publicada por Misal.mx o URL incorrecta.")
        return data_es
        
    soup = BeautifulSoup(response.text, 'html.parser')
    content_div = soup.find('div', class_='entry-content')
    if not content_div: return data_es
    
    texto_p = [p.get_text().strip() for p in content_div.find_all('p') if len(p.get_text().strip()) > 3]
    
    # Extracción heurística rudimentaria
    for i, linea in enumerate(texto_p):
        if "ORACIÓN COLECTA" in linea.upper():
            if (i+1) < len(texto_p): data_es['oracion_colecta'] = texto_p[i+1]
        elif "ORACIÓN SOBRE LAS OFRENDAS" in linea.upper():
            if (i+1) < len(texto_p): data_es['oracion_ofrendas'] = texto_p[i+1]
        elif "ORACIÓN DESPUÉS DE LA COMUNIÓN" in linea.upper():
            if (i+1) < len(texto_p): data_es['oracion_comunion'] = texto_p[i+1]
            
    return data_es

def execute_scraper(start_date_str, end_date_str):
    start = datetime.strptime(start_date_str, "%Y-%m-%d")
    end = datetime.strptime(end_date_str, "%Y-%m-%d")
    
    db_path = 'data/liturgia_db.js'
    print(f">> Cargando liturgia_db.js...")
    
    # Leer archivo local JS y convertir temporalmente a JSON
    with open(db_path, 'r', encoding='utf-8') as f:
        file_content = f.read()
    
    # Extracción del bloque JSON real quitando "window.liturgiaData = "
    json_str = re.sub(r'^window\.liturgiaData\s*=\s*', '', file_content.strip())
    json_str = re.sub(r';$', '', json_str)
    
    try:
        db = json.loads(json_str)
    except Exception as e:
        print("Error parseando liturgia_db.js actual. Verifique que no haya comas colgantes.", e)
        return

    current = start
    while current <= end:
        date_key = current.strftime('%Y-%m-%d')
        print(f"\n--- Procesando Liturgia para {date_key} ---")
        
        if date_key not in db:
            db[date_key] = {"fecha": date_key, "liturgia_palabra": {}, "liturgia_eucaristica": {}}
            
        data_es = extract_cem_data(current)
        data_en = extract_usccb_data(current)
        
        # FUSION
        if 'oracion_colecta' in data_es: db[date_key]['oracion_colecta'] = data_es['oracion_colecta']
        if 'oracion_ofrendas' in data_es: 
            if 'liturgia_eucaristica' not in db[date_key]: db[date_key]['liturgia_eucaristica'] = {}
            db[date_key]['liturgia_eucaristica']['oracion_ofrendas'] = data_es['oracion_ofrendas']
            
        if 'liturgia_palabra' not in db[date_key]:
            db[date_key]['liturgia_palabra'] = {}
            
        for key in ['primera_lectura', 'salmo_responsorial', 'segunda_lectura', 'evangelio']:
            if key in data_en:
                if key not in db[date_key]['liturgia_palabra']:
                    db[date_key]['liturgia_palabra'][key] = {}
                db[date_key]['liturgia_palabra'][key].update(data_en[key])
                
        current += timedelta(days=1)
        
    print(f"\n>> Escribiendo cambios en {db_path}...")
    new_js = "window.liturgiaData = " + json.dumps(db, indent=2, ensure_ascii=False) + ";"
    with open(db_path, 'w', encoding='utf-8') as f:
        f.write(new_js)
    print(">> ¡ÉXITO! Base de Datos Actualizada.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Motor Liturgia PRO - Scraper masivo bilingüe (CEM/USCCB)')
    parser.add_argument('--start', type=str, help='Fecha de inicio YYYY-MM-DD', required=True)
    parser.add_argument('--end', type=str, help='Fecha de fin YYYY-MM-DD', required=True)
    
    args = parser.parse_args()
    execute_scraper(args.start, args.end)
