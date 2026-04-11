import requests
from bs4 import BeautifulSoup

headers = {'User-Agent': 'Mozilla/5.0'}
r = requests.get('https://www.evangelizacion.org.mx/liturgia/', headers=headers)
soup = BeautifulSoup(r.text, 'html.parser')
for b in soup.find_all('div', class_='text-justify'):
    print(b.get_text(strip=True)[:100])
