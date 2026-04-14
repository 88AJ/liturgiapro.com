import json
import sys
import os

print("========================================")
print(" ANTIGRAVITY: BVT SANITY CHECKER (AST) ")
print("========================================")

file_path = 'data/liturgia_db.js'
if not os.path.exists(file_path):
    print(f"⏳ El archivo {file_path} aún no existe o el Scraper no ha guardado el primer volcado.")
    sys.exit(0)

try:
    with open(file_path, 'r', encoding='utf-8') as f:
        raw_content = f.read()
    
    # Limpiar para parseo
    import re
    raw_content = re.sub(r'^window\.liturgiaData\s*=\s*', '', raw_content)
    raw_content = re.sub(r';?\s*$', '', raw_content)
    
    db = json.loads(raw_content)
except Exception as e:
    print("❌ ERROR CRÍTICO: liturgia_db.js no contiene JSON válido. ¿El scraper truncó el archivo al escribir?", e)
    sys.exit(1)

truncamientos_detectados = 0
MIN_CHARS = 100

print(f"🔍 Escaneando base de datos: {len(db)} días procesados.")

for fecha, data in db.items():
    if "bloques" in data and isinstance(data["bloques"], list):
        for b in data["bloques"]:
            if b.get("tipo") == "proclamacion" and b.get("subtipo") != "oracion_presidencial":
                texto = b.get("texto", "")
                if len(texto) < MIN_CHARS:
                    print(f"[ALERTA TRUNCAMIENTO] [AST] Fecha: {fecha} | Letras: {len(texto)} | Texto: \"{texto[:35]}...\"")
                    truncamientos_detectados += 1
    
    elif "liturgia_palabra" in data:
        lp = data["liturgia_palabra"]
        checks = []
        if lp.get("primera_lectura") and isinstance(lp["primera_lectura"], dict):
            checks.append(lp["primera_lectura"].get("texto", ""))
        if lp.get("segunda_lectura") and isinstance(lp["segunda_lectura"], dict):
            checks.append(lp["segunda_lectura"].get("texto", ""))
        if lp.get("evangelio") and isinstance(lp["evangelio"], dict):
            checks.append(lp["evangelio"].get("texto", ""))

        for txt in checks:
            if txt and 5 < len(txt) < MIN_CHARS:
                if "No disponible" not in txt:
                    print(f"[ALERTA TRUNCAMIENTO] [LEGACY] Fecha: {fecha} | Letras: {len(txt)} | Texto: \"{txt[:35]}...\"")
                    truncamientos_detectados += 1

print("----------------------------------------")
if truncamientos_detectados == 0:
    print("✅ SANITY CHECK PASSED: 0 truncamientos detectados en la proclamación de la Palabra.")
    print("   El motor ETL está manteniendo la integridad 1:1.")
else:
    print(f"❌ ALERTA ROJA: Se detectaron {truncamientos_detectados} lecturas sospechosas de truncamiento por límite de tokens de Gemini.")
