import json
import re
import os

def parse_domingo(text, header_regex):
    # Encontrar la posición donde empieza el Domingo X
    match = re.search(header_regex, text)
    if not match:
        return None
    
    start_pos = match.start()
    
    # Encontrar el SIGUIENTE título principal (e.g. III DOMINGO o PENTECOSTES)
    next_match = re.search(r'\n(III|IV|V|VI|VII|DOMINGO) DE PASCU[A]?', text[start_pos + 50:])
    
    end_pos = start_pos + 50 + next_match.start() if next_match else len(text)
    
    chunk = text[start_pos:end_pos]

    data = {
        "color": "Blanco",
        "tiempo_liturgico": match.group(1).strip() + " (CICLO A)",
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

    # Extract r1
    r1_match = re.search(r'PRIMERA LECTURA\s*([\s\S]*?)(?:SALMO RESPONSORIAL|SEGUNDA LECTURA)', chunk)
    if r1_match: data["liturgia_palabra"]["primera_lectura"]["texto"] = r1_match.group(1).strip()

    # Extract salmo
    salmo_match = re.search(r'SALMO RESPONSORIAL\s*([\s\S]*?)(?:SEGUNDA LECTURA|ACLAMACIÓN|EVANGELIO)', chunk)
    if salmo_match: data["liturgia_palabra"]["salmo_responsorial"]["respuesta"] = salmo_match.group(1).strip()

    # Extract gospel
    gospel_match = re.search(r'EVANGELIO\s*([\s\S]*?)(?=$|\n[A-Z]{3,}\s)', chunk)
    if gospel_match: 
        # Clean up any trailing stuff
        gospel = gospel_match.group(1).strip()
        data["liturgia_palabra"]["evangelio"]["texto"] = gospel
        
    return data

def main():
    with open('[2012] [Matrimonio] LeccMasterI.txt', 'r', encoding='mac_roman', errors='replace') as f:
        # textutil on MacOS usually generates mac_roman or utf-8, python can struggle. Let's force replace
        content = f.read()
        
    db_file = 'data/liturgia.json'
    with open(db_file, 'r', encoding='utf-8') as f:
        db = json.load(f)

    # Date mapping 2026
    mapping = {
        "2026-04-12": r'(II DOMINGO DE PASCUA)',
        "2026-04-19": r'(III DOMINGO DE PASCUA)',
        "2026-04-26": r'(IV DOMINGO DE PASCUA)',
        "2026-05-03": r'(V DOMINGO DE PASCUA)',
        "2026-05-10": r'(VI DOMINGO DE PASCUA)',
        "2026-05-17": r'(VII DOMINGO DE PASCUA)'
    }

    # Use the portion after TOC
    parts = content.split('PASCUA\t PAGEREF')
    body = parts[-1] if len(parts) > 1 else content
    
    for date_key, header in mapping.items():
        parsed = parse_domingo(body, header)
        if parsed:
            if date_key in db:
                db[date_key].update(parsed)
            else:
                db[date_key] = parsed
            print(f"[{date_key}] {parsed['tiempo_liturgico']} -> Ingestado!")
        else:
            print(f"FAILED: {header}")

    with open(db_file, 'w', encoding='utf-8') as f:
        json.dump(db, f, ensure_ascii=False, indent=4)

if __name__ == '__main__':
    main()
