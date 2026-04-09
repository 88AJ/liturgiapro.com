import json
import re
from docx import Document
import os
import glob

def parse_docx_to_dict(filepath):
    print(f"Buscando: {filepath}")
    if not os.path.exists(filepath):
        print(f"Archivo no encontrado: {filepath}")
        return None

    doc = Document(filepath)
    text_content = "\n".join([p.text.strip() for p in doc.paragraphs if p.text.strip()])
    
    # Very basic regex scraping from the structured text
    # This will simulate extracting core components:
    
    data = {
        "color": "Múltiple",
        "tiempo_liturgico": "TRIDUO PASCUAL",
        "antifona_entrada": "",
        "rito_penitencial": "",
        "gloria": True,
        "oracion_colecta": "",
        "liturgia_palabra": {
            "primera_lectura": { "cita": "1a Lectura", "texto": "" },
            "salmo_responsorial": { "cita": "Salmo", "respuesta": "" },
            "evangelio": { "cita": "Evangelio", "texto": "" }
        },
        "liturgia_eucaristica": {
            "oracion_ofrendas": "",
            "oracion_despues_comunion": ""
        }
    }

    # Regex heuristic blocks
    title_match = re.search(r'(MISA DE LA CENA DEL SEÑOR|CELEBRACIÓN DE LA PASIÓN|VIGILIA PASCUAL|DOMINGO DE RAMOS)', text_content, re.IGNORECASE)
    if title_match:
        data["tiempo_liturgico"] = title_match.group(1).upper()
        if "CENA" in data["tiempo_liturgico"]: data["color"] = "Blanco"
        if "PASIÓN" in data["tiempo_liturgico"]: data["color"] = "Rojo"

    colecta_match = re.search(r'ORACIÓN COLECTA\s*([\s\S]*?)(?:LITURGIA DE LA PALABRA|PRIMERA LECTURA)', text_content, re.IGNORECASE)
    if colecta_match: data["oracion_colecta"] = colecta_match.group(1).strip()

    r1_match = re.search(r'PRIMERA LECTURA\s*([\s\S]*?)(?:SALMO RESPONSORIAL|SEGUNDA LECTURA)', text_content, re.IGNORECASE)
    if r1_match: data["liturgia_palabra"]["primera_lectura"]["texto"] = r1_match.group(1).strip()

    salmo_match = re.search(r'SALMO RESPONSORIAL\s*([\s\S]*?)(?:SEGUNDA LECTURA|EVANGELIO|ACLAMACIÓN)', text_content, re.IGNORECASE)
    if salmo_match: data["liturgia_palabra"]["salmo_responsorial"]["respuesta"] = salmo_match.group(1).strip()

    evangelio_match = re.search(r'EVANGELIO\s*([\s\S]*?)(?:HOMILÍA|LAVATORIO|LITURGIA EUCARÍSTICA|CREDO)', text_content, re.IGNORECASE)
    if evangelio_match: data["liturgia_palabra"]["evangelio"]["texto"] = evangelio_match.group(1).strip()
    
    return data

def main():
    base_dir = "Semana Santa 2026 (ciclo A)/Celebraciones (subsidios con moniciones)"
    
    mapping = {
        "2026-03-29": "Domingo de Ramos de la Pasión del Señor 2026 (con moniciones).docx",
        "2026-04-02": "Misa de la Cena del Señor 2026 (con moniciones).docx",
        "2026-04-03": "Celebración de la Pasión del Señor 2026 (con moniciones).docx",
        "2026-04-04": "Vigilia Pascual en la noche santa 2026 (con moniciones).docx"
    }
    
    # Load existing liturgia.json to append
    liturgia_file = 'data/liturgia.json'
    if os.path.exists(liturgia_file):
        with open(liturgia_file, 'r', encoding='utf-8') as f:
            db = json.load(f)
    else:
        db = {}

    for date_key, filename in mapping.items():
        filepath = os.path.join(base_dir, filename)
        parsed = parse_docx_to_dict(filepath)
        if parsed:
            # Merge with existing schema or create new
            if date_key in db:
                db[date_key].update(parsed)
            else:
                db[date_key] = parsed
            print(f"[{date_key}] -> Ingestado con éxito!")

    # Guardar nueva DB
    with open(liturgia_file, 'w', encoding='utf-8') as f:
        json.dump(db, f, ensure_ascii=False, indent=4)
        
    print("Compilación del Cerebro Offline completada: data/liturgia.json actualizado.")

if __name__ == '__main__':
    main()
