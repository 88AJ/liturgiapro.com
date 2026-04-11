import cloudscraper
from bs4 import BeautifulSoup
import re
from datetime import datetime

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
    
    book_name = versiculos.split()[0] if versiculos else ""
    return f"Lectura del libro de {book_name.capitalize()}" if book_name else "Lectura"

target_date = datetime.strptime("2026-04-10", "%Y-%m-%d")
date_str = target_date.strftime('%d-%m-%Y')
scraper = cloudscraper.create_scraper()

endpoints = {
    'primera_lectura': f'https://www.evangelizacion.org.mx/lecturas/primera-lectura/{date_str}',
    'salmo_responsorial': f'https://www.evangelizacion.org.mx/lecturas/salmo/{date_str}',
    'segunda_lectura': f'https://www.evangelizacion.org.mx/lecturas/segunda-lectura/{date_str}',
    'evangelio': f'https://www.evangelizacion.org.mx/lecturas/evangelio/{date_str}'
}

data_es = {}
for key, url in endpoints.items():
    response = scraper.get(url)
    if response.status_code != 200: continue
    soup = BeautifulSoup(response.text, 'html.parser')
    
    if key == 'salmo_responsorial':
        subtitle = soup.find('div', class_='subtitle-card-custom')
        cita = subtitle.text.strip() if subtitle else "Salmo"
        blocks = soup.find_all('p', class_='lecturas-body-card')
        texto = '\n'.join([b.text.strip() for b in blocks])
        lines = texto.split('\n')
        respuesta = lines[0].strip() if lines else "R."
        txt = '\n'.join(lines[1:]) if len(lines) > 1 else texto
        data_es[key] = {'cita': cita, 'respuesta': respuesta, 'texto': txt}
        continue

    subtitle = soup.find('div', class_='subtitle-card-custom')
    versiculos = subtitle.text.strip() if subtitle else ""
    formula = map_book_to_formula(versiculos, tipo="evangelio" if key == "evangelio" else "primera")
    blocks = soup.find_all('p', class_='lecturas-body-card')
    texto_limpio = [b.text.strip() for b in blocks if b.text.strip() and not b.text.strip().startswith('¿Tocas tu instrumento')]
    if not texto_limpio: continue
    data_es[key] = {
        'cita': formula + " " + versiculos,
        'cita_formula': formula,
        'cita_versiculos': versiculos,
        'texto': '\n'.join(texto_limpio).strip()
    }

print(data_es)
