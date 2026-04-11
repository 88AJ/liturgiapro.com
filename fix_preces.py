import json
import re

db_path = 'data/liturgia_db.js'

with open(db_path, 'r') as f:
    content = f.read()

json_str = content[content.find('{'):]
json_str = json_str[:json_str.rfind(';')]

data = json.loads(json_str)

for day in ["2026-04-11", "2026-04-12"]:
    for hora in ["laudes", "visperas"]:
        preces = data.get(day, {}).get(hora, {}).get("preces", None)
        if isinstance(preces, list):
            # Convert list of dicts to string
            out_str = ""
            for item in preces:
                if "respuesta" in item:
                    out_str += f"**{item['respuesta']}**\n\n"
                elif "peticion" in item:
                    out_str += f"- {item['peticion']}\n\n"
            
            data[day][hora]["preces"] = out_str.strip()

out_str = "window.liturgiaData = " + json.dumps(data, indent=2, ensure_ascii=False) + ";"

with open(db_path, 'w') as f:
    f.write(out_str)
print("Fixed preces format")

