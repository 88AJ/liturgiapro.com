import cloudscraper
from bs4 import BeautifulSoup
import re
url = "https://laverdadcatolica.org/misales/"
res = cloudscraper.create_scraper().get(url)
soup = BeautifulSoup(res.text, 'html.parser')
links = soup.find_all('a', href=re.compile(r'misal/.+'))
for l in links[:5]:
    print(l.get('href'))
