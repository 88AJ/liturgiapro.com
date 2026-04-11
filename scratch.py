import requests
from bs4 import BeautifulSoup
import re

r = requests.get('https://bible.usccb.org/bible/readings/040926.cfm')
soup = BeautifulSoup(r.text, 'html.parser')

sections = []
for block in soup.find_all('div', class_='b-verse'):
    header_el = block.find('h3') 
    if not header_el:
        header_el = block.find('h2')
    header = header_el.get_text(strip=True) if header_el else "Unknown"
    
    text_content = ""
    content_div = block.find('div', class_='content-body')
    if content_div:
        for p in content_div.find_all('p'):
            text_content += p.get_text(strip=True) + "\n"
    sections.append({ 'h': header, 't': text_content[:150] })

for s in sections:
    print(f"[{s['h']}] -> {s['t']}")
