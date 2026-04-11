import json

def convert():
    with open('data/liturgia.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    with open('data/liturgia_db.js', 'w', encoding='utf-8') as f:
        f.write("window.liturgiaData = " + json.dumps(data, ensure_ascii=False, indent=2) + ";\n")

    with open('data/cantos.json', 'r', encoding='utf-8') as f:
        cantos_data = json.load(f)
        
    with open('data/cantos_db.js', 'w', encoding='utf-8') as f:
        f.write("window.cantosDB = " + json.dumps(cantos_data, ensure_ascii=False, indent=2) + ";\n")

convert()
