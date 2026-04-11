import cloudscraper
from bs4 import BeautifulSoup
url = "https://bible.usccb.org/bible/readings/040926.cfm"
res = cloudscraper.create_scraper().get(url)
soup = BeautifulSoup(res.text, 'html.parser')
blocks = soup.find_all('div', class_='b-verse')
for block in blocks:
    title_el = block.find(['h3', 'h2'], class_='name')
    if not title_el: continue
    title = title_el.get_text(strip=True).upper()
    cita_el = block.find('div', class_='address')
    cita = cita_el.get_text(strip=True) if cita_el else ""
    content_el = block.find('div', class_='content-body')
    texto = content_el.get_text(separator="\n").strip() if content_el else ""
    print(f"[{title}] Cita: {cita}\n{texto[:30]}...\n")
