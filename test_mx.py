import requests
import json
url = "https://api.allorigins.win/get?url=https%3A%2F%2Farquidiocesisgdl.org%2Flectura_dia9.php"
j = requests.get(url).json()
from bs4 import BeautifulSoup
soup = BeautifulSoup(j['contents'], 'html.parser')
text = soup.get_text('\n')
import re
print("R1:", re.search(r'PRIMERA LECTURA\s*([\s\S]*?)(?:SALMO RESPONSORIAL|SEGUNDA LECTURA)', text, re.I))
print("SALMO:", re.search(r'SALMO RESPONSORIAL\s*([\s\S]*?)(?:EVANGELIO|SEGUNDA LECTURA)', text, re.I))
print("GOSPEL:", re.search(r'EVANGELIO\s*([\s\S]*?)(?:Credo|Oración de los fieles|LITURGIA EUCARÍSTICA|$)', text, re.I))
