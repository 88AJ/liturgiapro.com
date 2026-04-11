import requests
from bs4 import BeautifulSoup

r = requests.get('https://www.evangelizacion.org.mx/lecturas/laudes/10-04-2026')
soup = BeautifulSoup(r.text, 'html.parser')
for h in soup.find_all(['h3', 'h4', 'h5']):
    print(f"<{h.name}> {h.get_text().strip()}")
