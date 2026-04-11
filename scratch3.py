import requests
from bs4 import BeautifulSoup

r = requests.get('https://api.allorigins.win/get?url=https://misal.mx/')
html = r.json()['contents']
soup = BeautifulSoup(html, 'html.parser')

links = []
for a in soup.find_all('a'):
    href = a.get('href')
    text = a.get_text(strip=True)
    if href and ('/' in href or '202' in href):
        links.append((href, text))

print("Links:")
for l in links[:20]:
    print(l)
    
text_nodes = soup.find_all('h2')
for h2 in text_nodes:
    print(h2.get_text())
