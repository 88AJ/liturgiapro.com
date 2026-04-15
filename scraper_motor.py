import json
import os
import re
import argparse
import os
from google import genai
from google.genai import types
from dotenv import load_dotenv
load_dotenv()
import cloudscraper
from bs4 import BeautifulSoup
from datetime import datetime, timedelta
def sanitizar_texto(texto_crudo):
    if not texto_crudo:
        return ""
    import re
    patron_basura = r"(?i)(hoy el acceso completo|activando tu membresía|prueba gratis|laverdadcatolica\.org|www\.|suscríbete|clic aquí|anuncio|contribuyes a sostener|\¿Ya eres miembro\?|Inicia sesión aquí)"
    lineas = texto_crudo.split('\n')
    lineas_limpias = [linea for linea in lineas if not re.search(patron_basura, linea)]
    texto_limpio = '\n'.join(lineas_limpias)
    texto_limpio = re.sub(r'\n{3,}', '\n\n', texto_limpio)
    return texto_limpio.strip()
def get_usccb_url(target_date):
    # USCCB URL format: MMDDYY.cfm
    date_str = target_date.strftime('%m%d%y')
    return f"https://bible.usccb.org/bible/readings/{date_str}.cfm"

def get_cem_url(target_date):
    meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
    dias_semana = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo']
    weekday_idx = target_date.weekday()
    weekday_str = dias_semana[weekday_idx]
    day = target_date.day
    month_str = meses[target_date.month - 1]
    year_str = target_date.year
    return f"https://laverdadcatolica.org/misal-{weekday_str}-{day}-de-{month_str}-del-{year_str}/"


def sanitizar_texto(texto):
    if not texto: return ""
    import re
    # Remove ads and specific URLs
    t = re.sub(r'(?i)visita\s+laverdadcatolica\.org', '', texto)
    t = re.sub(r'(?i)derechos reservados.*', '', t)
    t = re.sub(r'(?i)suscríbete.*', '', t)
    t = re.sub(r'https?://[\w\.-]+', '', t)
    return t.strip()

def map_book_to_formula(versiculos, tipo="primera"):
    v_lower = versiculos.lower() if versiculos else ""
    if tipo == "evangelio":
        if "juan" in v_lower: return "Del santo Evangelio según San Juan"
        if "mateo" in v_lower: return "Del santo Evangelio según San Mateo"
        if "lucas" in v_lower: return "Del santo Evangelio según San Lucas"
        if "marcos" in v_lower: return "Del santo Evangelio según San Marcos"
        return "Del santo Evangelio"
    
    if "hechos" in v_lower: return "Del libro de los Hechos de los apóstoles"
    if "apocalipsis" in v_lower: return "Del libro del Apocalipsis del apóstol san Juan"
    if "romanos" in v_lower: return "De la carta del apóstol san Pablo a los Romanos"
    if "corintios" in v_lower: 
        return "De la primera carta del apóstol san Pablo a los Corintios" if "1 " in v_lower or "1a" in v_lower else "De la segunda carta del apóstol san Pablo a los Corintios"
    if "pedro" in v_lower:
        return "De la primera carta del apóstol san Pedro" if "1 " in v_lower or "1a" in v_lower else "De la segunda carta del apóstol san Pedro"
    if "juan" in v_lower:
        if "1 " in v_lower or "1a" in v_lower: return "De la primera carta del apóstol san Juan"
        if "2 " in v_lower or "2a" in v_lower: return "De la segunda carta del apóstol san Juan"
        if "3 " in v_lower: return "De la tercera carta del apóstol san Juan"
    
    # Fallback to general lookup or pure string manipulation
    book_name = versiculos.split()[0] if versiculos else ""
    return f"Lectura del libro de {book_name.capitalize()}" if book_name else "Lectura"

def extract_cem_data(target_date):
    date_str = target_date.strftime('%d-%m-%Y')
    print(f"[CEM-Evangelizacion] Extrayendo {date_str}...")
    scraper = cloudscraper.create_scraper()
    
    data_es = {}
    endpoints = {
        'primera_lectura': f'https://www.evangelizacion.org.mx/lecturas/primera-lectura/{date_str}',
        'salmo_responsorial': f'https://www.evangelizacion.org.mx/lecturas/salmo/{date_str}',
        'segunda_lectura': f'https://www.evangelizacion.org.mx/lecturas/segunda-lectura/{date_str}',
        'evangelio': f'https://www.evangelizacion.org.mx/lecturas/evangelio/{date_str}'
    }
    
    for key, url in endpoints.items():
        response = scraper.get(url)
        if response.status_code != 200:
            continue
            
        soup = BeautifulSoup(response.text, 'html.parser')
        
        if key == 'salmo_responsorial':
            subtitle = soup.find('h5')
            cita = subtitle.text.strip() if subtitle else "Salmo"
            
            content_div = soup.select_one('.contenido.text-container')
            if not content_div: continue
            
            texto = content_div.get_text(separator='\n').strip()
            
            lines = [l.strip() for l in texto.split('\n') if l.strip()]
            respuesta = "R. " + (lines[0].replace('R.', '').strip() if lines else "")
            txt = '\n'.join(lines[1:]) if len(lines) > 1 else texto
            
            data_es[key] = {'cita': sanitizar_texto(cita), 'respuesta': sanitizar_texto(respuesta), 'texto': sanitizar_texto(txt)}
            continue
            
        subtitle = soup.find('h5')
        versiculos = subtitle.text.strip() if subtitle else ""
        
        formula = map_book_to_formula(versiculos, tipo="evangelio" if key == "evangelio" else "primera")
        
        content_div = soup.select_one('.contenido.text-container')
        if not content_div: continue
            
        texto_crudo = content_div.get_text(separator='\n').strip()
        texto = sanitizar_texto(texto_crudo)
        
        if not texto:
            continue
            
        data_es[key] = {
            'cita': formula + " " + versiculos,
            'cita_formula': formula,
            'cita_versiculos': versiculos,
            'texto': sanitizar_texto(texto)
        }
    
    return data_es
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
    
    # Mapeo simple de la nueva estructura HTML de la USCCB
    blocks = soup.find_all('div', class_='b-verse')
    
    for block in blocks:
        title_el = block.find('h3', class_='name')
        if not title_el:
            title_el = block.find('h2', class_='name')
            
        if not title_el: continue
        title = title_el.get_text(strip=True).upper()
        
        cita_el = block.find('div', class_='address')
        cita = cita_el.get_text(strip=True) if cita_el else ""
        
        content_el = block.find('div', class_='content-body')
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

def extract_horas_data(target_date, tipo="laudes"):
    date_str = target_date.strftime('%d-%m-%Y')
    url = f"https://www.evangelizacion.org.mx/lecturas/{tipo}/{date_str}"
    
    scraper = cloudscraper.create_scraper()
    print(f"Scraping CEM {tipo.capitalize()} para {date_str}...")
    try:
        response = scraper.get(url, timeout=15)
        if response.status_code != 200:
            return None
    except Exception as e:
        return None
        
    soup = BeautifulSoup(response.text, 'html.parser')
    lines = [l.strip() for l in soup.get_text('\n').split('\n') if l.strip()]
    
    state = None
    current_text = []
    oficio = {}
    
    for line in lines:
        if line in ["Salmodia", "Lectura Breve", "Responsorio Breve", "Cántico Evangélico", "Oración", "Preces", "Conclusión"]:
            if state:
                oficio[state] = "\n".join(current_text)
            state = line
            current_text = []
        elif state:
            current_text.append(line)
            
    if state:
        oficio[state] = "\n".join(current_text)
        
    if not oficio:
        return None
        
    # Construir objeto estructurado
    data = {}
    
    # 1. Salmodia
    salmodia_text = oficio.get("Salmodia", "")
    salmos = re.split(r'Antífona \d+:', salmodia_text)
    if len(salmos) == 4:
        for idx in range(1, 4):
            partes = [p.strip() for p in salmos[idx].split('\n') if p.strip()]
            antifona = partes[0] if len(partes) > 0 else ""
            texto = "\n\n".join(partes[1:])
            
            node_name = f"salmo{idx}"
            if tipo == "laudes":
                if idx == 2: node_name = "cantico_at"
                if idx == 3: node_name = "salmo2" # Misa con Laudes only uses salmo1, cantico_at, salmo2
            elif tipo == "visperas":
                if idx == 3: node_name = "cantico_nt"

            data[node_name] = {
                "antifona": antifona,
                "texto": texto
            }
            
    # 2. Lectura Breve
    lb_text = oficio.get("Lectura Breve", "")
    lb_parts = [p.strip() for p in lb_text.split('\n') if p.strip()]
    if lb_parts:
        data["lectura_breve"] = {
            "cita": lb_parts[0],
            "texto": "\n\n".join(lb_parts[1:])
        }
        
    # 3. Responsorio Breve
    data["responsorio_breve"] = oficio.get("Responsorio Breve", "").strip()
    
    # 4. Cántico Evangélico
    ce_text = oficio.get("Cántico Evangélico", "")
    ce_parts = ce_text.split('Antífona\n')
    if len(ce_parts) > 1:
        ce_sub = ce_parts[1].split('Cántico de')
        antifona = ce_sub[0].strip()
        texto = ""
        if len(ce_sub) > 1:
            # Drop the subtitle itself
            texto_lines = ("Cántico de" + ce_sub[1]).split('\n')
            texto = "\n\n".join([l for l in texto_lines[1:] if l.strip()])
        data["cantico_evangelico"] = {
            "antifona": antifona,
            "texto": texto
        }
    
    # 5. Preces
    if "Preces" in oficio:
        data["preces"] = oficio["Preces"]

    return data


def gemini_etl_node(client, raw_inputs):
    """
    Actúa como Extractor ETL Estricto. Recibe una lista de raw_inputs (texto crudo, URLs pre-procesadas, o Archivos subidos a la API) 
    y devuelve el JSON estructurado de la Liturgia y Cantos.
    """
    nodo_schema = {
        "type": "object",
        "properties": {
            "tipo": {
                "type": "string",
                "enum": ["rubrica", "monicion", "dialogo", "proclamacion"],
                "description": "Clasificador ontológico del bloque. 'rubrica' para instrucciones procesales. 'monicion' para textos introductorios. 'dialogo' para V/R. 'proclamacion' para el texto principal."
            },
            "texto": { "type": "string" }
        },
        "required": ["tipo", "texto"]
    }

    etl_schema = {
      "type": "object",
      "properties": {
        "metadatos": {
          "type": "object",
          "properties": {
            "titulo_celebracion": { "type": "string", "description": "Ej. Segundo Domingo de Pascua" },
            "color_liturgico": { "type": "string", "description": "Blanco, Morado, Verde, Rojo" },
            "grado": { "type": "string", "description": "Domingo, Solemnidad, Fiesta, Feria" }
          },
          "required": ["titulo_celebracion", "color_liturgico", "grado"]
        },
        "oraciones_presidenciales": {
          "type": "object",
          "properties": {
            "colecta": { "type": "array", "items": nodo_schema },
            "sobre_ofrendas": { "type": "array", "items": nodo_schema },
            "postcomunion": { "type": "array", "items": nodo_schema }
          },
          "required": ["colecta", "sobre_ofrendas", "postcomunion"]
        },
        "liturgia_palabra_estructurada": {
          "type": "object",
          "properties": {
            "primera_lectura": { "type": "array", "items": nodo_schema },
            "salmo_responsorial": { "type": "array", "items": nodo_schema },
            "segunda_lectura": { "type": "array", "items": nodo_schema },
            "secuencia": { "type": "array", "items": nodo_schema },
            "evangelio": { "type": "array", "items": nodo_schema }
          },
          "description": "Extrae y estructura las lecturas, separando las rúbricas iniciales y aclamaciones finales ('Palabra de Dios', 'Te alabamos Señor') usando el array de nodos."
        },
        "repertorio_sugerido": {
          "type": "object",
          "properties": {
            "canto_entrada": {
              "type": "object",
              "properties": {
                "titulo": { "type": "string" },
                "estrofas": {
                  "type": "array",
                  "items": { "type": "string" },
                  "description": "Cada elemento del array es una estrofa completa."
                }
              },
              "required": ["titulo", "estrofas"]
            }
          }
        }
      },
      "required": ["metadatos", "oraciones_presidenciales", "repertorio_sugerido"]
    }

    print("🧠 Disparando ETL Estricto en Gemini (Application/JSON) con Modelo Ontológico...")
    
    config = types.GenerateContentConfig(
        response_mime_type="application/json",
        response_schema=etl_schema,
        max_output_tokens=8192,
        temperature=0.0,
        system_instruction="Eres un procesador ETL implacablemente estricto para un Missal Operativo. Tu único propósito es ingerir los textos litúrgicos crudos y reestructurarlos en árboles sintácticos (AST). PROHIBICIONES Y MANDATOS ABSOLUTOS: 1. JAMÁS generes texto fuera del JSON. 2. DEBES segmentar ontológicamente los textos en bloques ordenados. Separa 'rubricas', 'dialogos' y 'proclamacion'. 3. APLICA LA ORDENACIÓN DE LAS LECTURAS (OLM): - El título o cita de la lectura ('rubrica') DEBE usar el formato 'Lectura del libro de...', 'Lectura de la carta...', o 'Lectura del santo Evangelio...'. Prohibido usar 'Comienzo de...' o 'Continuación de...'. - Si el corpus incluye una 'Secuencia' (como en Pentecostés), extráela bajo la llave 'secuencia', mapeando sus estrofas como proclamación lírica. - ELIMINA las aclamaciones finales ('Palabra de Dios', 'Gloria a ti...') del texto procesado, ya que el motor base las renderizará automáticamente. 4. MANDATO DE INTEGRIDAD ABSOLUTA: ESTÁ ESTRICTAMENTE PROHIBIDO RESUMIR O ACORTAR LA 'PROCLAMACION'. DEBES DEVOLVER EL TEXTO HAGIOGRÁFICO/BÍBLICO E HÍMNICO ÍNTEGRO. OMITIR ORACIONES ES UNA FALLA CRÍTICA."
    )
    
    try:
        response = client.models.generate_content(
            model='gemini-flash-latest',
            contents=raw_inputs,
            config=config
        )
        resp_text = response.text.strip()
        import re
        match = re.search(r'\{.*\}', resp_text, re.DOTALL)
        if match:
            resp_text = match.group(0)
        try:
            return json.loads(resp_text)
        except Exception as loads_e:
            with open("crash_etl.txt", "w") as f:
                f.write(resp_text)
            raise loads_e
    except Exception as e:
        print(f"❌ Error en Gemini ETL: {e}")
        print(f"--- CONTENIDO CRUDO ---")
        try:
            print(resp_text)
        except:
            print(response.text)
        print(f"-----------------------")
        return None

def gemini_orquestador_node(client, metadatos, fecha, modificadores_activos=[]):
    """
    Cruza el contexto del día con las Reglas Canónicas para determinar la estructura final.
    """
    ruta_reglas = "liturgyofthetime/reglas_ordinario.json"
    try:
        with open(ruta_reglas, 'r', encoding='utf-8') as f:
            reglas_liturgicas = json.load(f)
    except FileNotFoundError:
        print(f"❌ Error: No se encontró el archivo {ruta_reglas}")
        return None

    contexto_celebracion = {
        "fecha": fecha,
        "dia_liturgico": metadatos.get('titulo_celebracion', ''),
        "tipo_misa": metadatos.get('grado', 'Feria'),
        "modificadores_activos": modificadores_activos
    }

    prompt_orquestador = f"""
Eres el 'Orquestador Litúrgico' de Liturgia Pro.
Tu único objetivo es leer el CONTEXTO DE LA CELEBRACIÓN y cruzarlo con las REGLAS LITÚRGICAS (Ley Canónica) para determinar qué bloques del Ordinario de la Misa deben imprimirse y cuáles deben omitirse.

CONTEXTO DE LA CELEBRACIÓN:
{json.dumps(contexto_celebracion, indent=2)}

REGLAS LITÚRGICAS (Lógica de supresión/activación):
{json.dumps(reglas_liturgicas, indent=2)}

INSTRUCCIONES:
1. Evalúa CADA bloque estructural de las reglas (ritos_iniciales, liturgia_palabra, liturgia_eucaristica, rito_comunion, ritos_conclusion).
2. Si el contexto cumple una 'condicion_supresion' dentro de un bloque, ese bloque DEBE indicar accion "omitir". 
3. Si el contexto cumple una 'condicion_activacion' o si el bloque es 'obligatorio' ('estado': 'obligatorio'), DEBE indicar accion "incluir".
4. Si un bloque es condicional pero no cumple ninguna condición explícita ni de supresión ni de activación, omítelo.
5. Devuelve ESTRICTAMENTE un objeto JSON con un array llamado 'esqueleto_ensamblaje'. Cada elemento del array debe contener el 'id_bloque' (ej. saludo_inicial, gloria, etc), la 'accion' ("incluir" o "omitir"), y el 'motivo' lógico explícito.

Estructura esperada:
{{
  "esqueleto_ensamblaje": [
    {{ "id_bloque": "saludo_inicial", "accion": "incluir", "motivo": "Bloque obligatorio" }},
    ...
  ]
}}
"""
    config = types.GenerateContentConfig(
        response_mime_type="application/json",
        temperature=0.0
    )
    
    print("🧠 Consultando al Orquestador Lógico para definir estructura del Ordinario...")
    try:
        response = client.models.generate_content(
            model='gemini-flash-latest',
            contents=prompt_orquestador,
            config=config
        )
        resp_text = response.text.strip()
        import re
        match = re.search(r'\{.*\}', resp_text, re.DOTALL)
        if match:
            resp_text = match.group(0)
        return json.loads(resp_text)
    except Exception as e:
        print(f"❌ Error en Gemini Orquestador: {e}")
        return None

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

        # ETL Integration
        raw_text_for_etl = f"Fecha: {date_key}\n\n"
        for k, v in data_es.items():
            if isinstance(v, dict):
                raw_text_for_etl += f"[{k.upper()}]\n{v.get('texto', '')}\n\n"
            else:
                raw_text_for_etl += f"[{k.upper()}]\n{v}\n\n"
                
        # Send to Gemini ETL (if client is available)
        try:
            import os
            from google import genai
            if os.environ.get("GEMINI_API_KEY"):
                client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))
                etl_data = gemini_etl_node(client, [raw_text_for_etl])
                if etl_data:
                    print("✅ ETL Extractor procesó la fecha satisfactoriamente.")
                    
                    if 'metadatos' in etl_data:
                        db[date_key]['titulo_celebracion'] = etl_data['metadatos'].get('titulo_celebracion', '')
                        db[date_key]['color'] = etl_data['metadatos'].get('color_liturgico', 'Blanco')
                        db[date_key]['grado'] = etl_data['metadatos'].get('grado', db[date_key].get('grado', 'Feria'))
                        
                        # INYECCIÓN DEL ORQUESTADOR (FASE 4)
                        esqueleto_ordinario = gemini_orquestador_node(client, etl_data['metadatos'], date_key, [])
                        if esqueleto_ordinario and "esqueleto_ensamblaje" in esqueleto_ordinario:
                            db[date_key]['esqueleto_ordinario'] = esqueleto_ordinario['esqueleto_ensamblaje']
                            print("✅ Orquestador devolvió esqueleto canónico exitosamente.")
                        
                    if 'oraciones_presidenciales' in etl_data:
                        op = etl_data['oraciones_presidenciales']
                        db[date_key]['oracion_colecta'] = op.get('colecta', [])
                        if 'liturgia_eucaristica' not in db[date_key]: db[date_key]['liturgia_eucaristica'] = {}
                        db[date_key]['liturgia_eucaristica']['oracion_ofrendas'] = op.get('sobre_ofrendas', [])
                        db[date_key]['liturgia_eucaristica']['oracion_despues_comunion'] = op.get('postcomunion', [])
                        
                    if 'liturgia_palabra_estructurada' in etl_data:
                        lp = etl_data['liturgia_palabra_estructurada']
                        # Si existe, reemplazamos el texto crudo con los bloques AST
                        for key in ['primera_lectura', 'salmo_responsorial', 'segunda_lectura', 'secuencia', 'evangelio']:
                            if lp.get(key) is not None:
                                if key not in data_es:
                                    data_es[key] = {}
                                data_es[key]['nodos'] = lp[key]
                        
                    if 'repertorio_sugerido' in etl_data:
                        db[date_key]['repertorio_sugerido'] = etl_data['repertorio_sugerido']
        except Exception as e:
            print("⚠️ No se pudo ejecutar el nodo ETL:", e)


        
        # FUSION
        if 'oracion_colecta' in data_es: 
            # Preferir la version AST devuelta por gemini
            if 'oracion_colecta' not in db[date_key]:
                db[date_key]['oracion_colecta'] = data_es['oracion_colecta']
        if 'oracion_ofrendas' in data_es: 
            if 'liturgia_eucaristica' not in db[date_key]: db[date_key]['liturgia_eucaristica'] = {}
            if 'oracion_ofrendas' not in db[date_key]['liturgia_eucaristica']:
                db[date_key]['liturgia_eucaristica']['oracion_ofrendas'] = data_es['oracion_ofrendas']
            
        if 'liturgia_palabra' not in db[date_key]:
            db[date_key]['liturgia_palabra'] = {}
            
        for key in ['primera_lectura', 'salmo_responsorial', 'segunda_lectura', 'secuencia', 'evangelio']:
            if key not in db[date_key]['liturgia_palabra']:
                db[date_key]['liturgia_palabra'][key] = {}
            if key in data_es:
                db[date_key]['liturgia_palabra'][key].update(data_es[key])
            if key in data_en:
                db[date_key]['liturgia_palabra'][key].update(data_en[key])
                
        # Liturgia de las Horas
        laudes_data = extract_horas_data(current, "laudes")
        if laudes_data:
            db[date_key]['laudes'] = laudes_data
            print("✅ Laudes extraídas y acopladas.")
        
        visperas_data = extract_horas_data(current, "visperas")
        if visperas_data:
            db[date_key]['visperas'] = visperas_data
            print("✅ Vísperas extraídas y acopladas.")
                
        current += timedelta(days=1)
        
    print(f"\n>> Escribiendo cambios en {db_path}...")
    new_js = "window.liturgiaData = " + json.dumps(db, indent=2, ensure_ascii=False) + ";"
    with open(db_path, 'w', encoding='utf-8') as f:
        f.write(new_js)
    print(">> ¡ÉXITO! Base de Datos Actualizada.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Motor Liturgia PRO - Scraper masivo bilingüe (CEM/USCCB)')
    parser.add_argument('--start', type=str, help='Fecha de inicio YYYY-MM-DD', required=False)
    parser.add_argument('--end', type=str, help='Fecha de fin YYYY-MM-DD', required=False)
    parser.add_argument('--auto', type=int, help='Modo autómata: Calcular desde HOY hasta N días en el futuro', required=False)
    
    args = parser.parse_args()
    
    if args.auto is not None:
        hoy = datetime.now()
        horizonte = hoy + timedelta(days=args.auto)
        start_str = hoy.strftime("%Y-%m-%d")
        end_str = horizonte.strftime("%Y-%m-%d")
        print(f">> MODO AUTO: Extrayendo desde {start_str} hasta {end_str}")
        execute_scraper(start_str, end_str)
    elif args.start and args.end:
        execute_scraper(args.start, args.end)
    else:
        print("Error: Debes proveer --start y --end, o usar la bandera --auto <dias>.")

