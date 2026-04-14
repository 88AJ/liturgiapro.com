import json
import re

with open('data/liturgia_db.js', 'r', encoding='utf-8') as f:
    text = f.read()

json_str = re.sub(r'^window\.liturgiaData\s*=\s*', '', text.strip())
json_str = re.sub(r';$', '', json_str)

db = json.loads(json_str)

def clean_vertical_text(t):
    if not isinstance(t, str):
        return t
    
    # Detect if text is corrupted like A\n\nB\n\nC
    parts = t.split('\n\n')
    if len(parts) > 10:
        # Check if the average length of parts is roughly 1
        avg_len = sum(len(p.strip()) for p in parts) / len(parts)
        if avg_len <= 2:
            return "".join([p.strip() for p in parts])
    return t
            
count = 0
for date_key, node in db.items():
    if 'laudes' in node and 'cantico_evangelico' in node['laudes']:
        old_val = node['laudes']['cantico_evangelico'].get('texto', '')
        new_val = clean_vertical_text(old_val)
        if new_val != old_val:
            node['laudes']['cantico_evangelico']['texto'] = new_val
            count += 1
            print(f"Cleaned {date_key}: laudes cantico")

    if 'visperas' in node and 'cantico_evangelico' in node['visperas']:
        old_val = node['visperas']['cantico_evangelico'].get('texto', '')
        new_val = clean_vertical_text(old_val)
        if new_val != old_val:
            node['visperas']['cantico_evangelico']['texto'] = new_val
            count += 1
            print(f"Cleaned {date_key}: visperas cantico")

if count > 0:
    new_js = "window.liturgiaData = " + json.dumps(db, indent=2, ensure_ascii=False) + ";"
    with open('data/liturgia_db.js', 'w', encoding='utf-8') as f:
        f.write(new_js)
    print("Mapeo de base de datos reparado exitosamente.")
else:
    print("Ninguna cadena corrupta detectada.")
