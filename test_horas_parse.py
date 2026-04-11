import requests
from bs4 import BeautifulSoup
import json

r = requests.get('https://www.evangelizacion.org.mx/lecturas/laudes/10-04-2026')
soup = BeautifulSoup(r.text, 'html.parser')

oficio = {}

# We'll just grab all text and use regex or simple state machine
lines = soup.get_text('\n').split('\n')
lines = [l.strip() for l in lines if l.strip()]

state = None
current_text = []

for line in lines:
    if line == "Salmodia" or line in ["Lectura Breve", "Responsorio Breve", "Cántico Evangélico", "Oración", "Preces", "Conclusión"]:
        if state:
            oficio[state] = "\n".join(current_text)
        state = line
        current_text = []
    elif state:
        current_text.append(line)

if state:
    oficio[state] = "\n".join(current_text)

print(list(oficio.keys()))
print(oficio.get("Lectura Breve", "")[:100])
