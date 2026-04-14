import json, re

with open('data/liturgia_db.js', 'r') as f:
    content = f.read()
    
json_str = re.sub(r'^window\.liturgiaData\s*=\s*', '', content.strip()).rstrip(';')
db = json.loads(json_str)

if "2026-04-13" in db:
    db["2026-04-13"]["tiempo_liturgico"] = "Pascua"
    db["2026-04-13"]["color"] = "blanco"
    db["2026-04-13"]["grado"] = "Lunes II de Pascua"
    db["2026-04-13"]["gloria"] = False # Es feria
    db["2026-04-13"]["antifona_entrada"] = "Cristo, habiendo resucitado de entre los muertos, ya no muere. La muerte no tiene ya dominio sobre él. Aleluya." # Standard Monday week 2
    db["2026-04-13"]["oracion_colecta"] = "Dios nuestro, que has prometido permanecer fiel a los que han renacido por el bautismo, escucha nuestras oraciones, para que, justificados por la fe, merezcamos llegar a la vida eterna. Por nuestro Señor Jesucristo..."
    db["2026-04-13"]["monicion_entrada"] = "Hermanos, en este segundo lunes de la cincuentena pascual, la Iglesia nos sigue invitando a vivir la alegría del resucitado."
    
    if "liturgia_eucaristica" not in db["2026-04-13"]:
        db["2026-04-13"]["liturgia_eucaristica"] = {}
    
    db["2026-04-13"]["liturgia_eucaristica"]["oracion_ofrendas"] = "Recibe, Señor, las ofrendas sagradas que te presentamos, para que, purificados de nuestra antigua condición pecadora, seamos renovados al participar en los sacramentos de salvación. Por Jesucristo, nuestro Señor."
    db["2026-04-13"]["liturgia_eucaristica"]["antifona_comunion"] = "Jesús se acercó, tomó el pan y se lo dio a sus discípulos... Aleluya."
    db["2026-04-13"]["liturgia_eucaristica"]["oracion_despues_comunion"] = "Te rogamos, Padre misericordioso, que por la fuerza salvadora de este sacramento aumentes nuestra fe y nos fortalezcas en la caridad. Por Jesucristo, nuestro Señor."

with open('data/liturgia_db.js', 'w') as f:
    f.write("window.liturgiaData = ")
    json.dump(db, f, indent=2, ensure_ascii=False)
    f.write(";\n")
print("✅ Base de datos parcheada para el 13 de abril de 2026!")
