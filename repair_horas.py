import json
from datetime import datetime, timedelta
import scraper_motor

db_path = 'data/liturgia_db.js'
with open(db_path, 'r', encoding='utf-8') as f:
    text = f.read()

import re
json_str = re.sub(r'^window\.liturgiaData\s*=\s*', '', text.strip())
json_str = re.sub(r';$', '', json_str)
db = json.loads(json_str)

dates_to_repair = ["2026-04-10", "2026-04-11", "2026-04-12"]

for date_str in dates_to_repair:
    dt = datetime.strptime(date_str, "%Y-%m-%d")
    
    if date_str in db:
        print(f"Reparando Oficio para {date_str}...")
        laudes = scraper_motor.extract_horas_data(dt, "laudes")
        if laudes:
            db[date_str]['laudes'] = laudes
            print(f"  ✅ Laudes reparadas")
            
        visperas = scraper_motor.extract_horas_data(dt, "visperas")
        if visperas:
            db[date_str]['visperas'] = visperas
            print(f"  ✅ Visperas reparadas")

new_js = "window.liturgiaData = " + json.dumps(db, indent=2, ensure_ascii=False) + ";"
with open(db_path, 'w', encoding='utf-8') as f:
    f.write(new_js)
print("Base de datos sobrescrita con el mapeo reparado desde CEM.")

