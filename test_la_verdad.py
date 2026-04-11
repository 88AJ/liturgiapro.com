import cloudscraper
from bs4 import BeautifulSoup
import re
url = "https://laverdadcatolica.org/misal-jueves-9-de-abril-del-2026/"
res = cloudscraper.create_scraper().get(url)
soup = BeautifulSoup(res.text, 'html.parser')
text_dump = ""
for p in soup.find_all('p'):
    text_dump += p.get_text(strip=True) + "\n"

print("--- TEXT DUMP FIRST 1000 CHARS ---")
print(text_dump[:1000])

r1 = re.search(r'PRIMERA LECTURA\s*(.*?)(?:SALMO RESPONSORIAL|SEGUNDA LECTURA)', text_dump, re.I | re.S)
if r1: print("\n[R1]:", r1.group(1)[:100])

salmo = re.search(r'SALMO RESPONSORIAL\s*(.*?)(?:EVANGELIO|SEGUNDA LECTURA)', text_dump, re.I | re.S)
if salmo: print("\n[SALMO]:", salmo.group(1)[:100])

evangelio = re.search(r'EVANGELIO\s*(.*?)(?:REFLEXI|ORACIÓN DE LOS FIELES|LITURGIA EUCARÍSTICA|$)', text_dump, re.I | re.S)
if evangelio: print("\n[EVANGELIO]:", evangelio.group(1)[:100])
