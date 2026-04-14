import os
import json
from google import genai
from scraper_motor import gemini_etl_node

secuencia = """Ofrezcan los cristianos ofrendas de alabanza a gloria de la Víctima propicia de la Pascua.
Cordero sin pecado que a las ovejas salva, a Dios y a los culpables unió con nueva alianza.
Lucharon vida y muerte en singular batalla, y, muerto el que es la Vida, triunfante se levanta.
«¿Qué has visto de camino, María, en la mañana?»
«A mi Señor glorioso, la tumba abandonada, los ángeles testigos, sudarios y mortaja.
¡Resucitó de veras mi amor y mi esperanza!
Venid a Galilea, allí el Señor aguarda; allí veréis los suyos la gloria de la Pascua.»
Primicia de los muertos, sabemos por tu gracia que estás resucitado; la muerte en ti no manda.
Rey vencedor, apiádate de la miseria humana y da a tus fieles parte en tu victoria santa."""

raw_text = f"Fecha: 2026-04-13\n\n[SEGUNDA_LECTURA]\nSecuencia Pascual\n\n{secuencia}\n\n"

client = genai.Client()
print(f"Total palabras texto original: {len(secuencia.split())}")

try:
    res = gemini_etl_node(client, [raw_text])
    
    lp = res.get("liturgia_palabra_estructurada", {})
    segunda = lp.get("segunda_lectura", [])
    
    proclamacion = ""
    for nodo in segunda:
        if nodo.get("tipo") == "proclamacion":
            proclamacion += nodo.get("texto", "") + " "
            
    print("\n--- RESULTADO PROCLAMACION ---")
    print(proclamacion.strip())
    print(f"Total palabras extraídas: {len(proclamacion.split())}")
    
except Exception as e:
    print("Error:", e)
