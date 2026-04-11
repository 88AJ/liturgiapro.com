import requests
import re
from bs4 import BeautifulSoup

r = requests.get('https://www.evangelizacion.org.mx/lecturas/laudes/10-04-2026')
soup = BeautifulSoup(r.text, 'html.parser')

lines = soup.get_text('\n').split('\n')
lines = [l.strip() for l in lines if l.strip()]

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

# Parse Salmodia
salmodia_text = oficio.get("Salmodia", "")
salmos = re.split(r'Antífona \d+:', salmodia_text)
print("Found Salmos parts:", len(salmos))

if len(salmos) == 4:
    # salmos[0] is empty or just "Salmodia"
    print("Salmo 1:", salmos[1][:100])
    print("Salmo 2:", salmos[2][:100])
    print("Salmo 3:", salmos[3][:100])

