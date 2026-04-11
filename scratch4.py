import requests
from bs4 import BeautifulSoup

headers = {'User-Agent': 'Mozilla/5.0'}

def check_wp():
    print("=== WP ===")
    url = 'https://palabradediosdiaria.wordpress.com/2026/04/09/'
    r = requests.get(url, headers=headers)
    print("Status:", r.status_code)
    if r.status_code == 200:
        soup = BeautifulSoup(r.text, 'html.parser')
        article = soup.find('article')
        if article:
            print("Found article:", article.get_text(strip=True)[:200])
        else:
            print("No article block.")

def check_es():
    print("=== SANGINES ===")
    url = 'https://www.parroquiasangines.es/lecturas_de_la_santa_misa'
    r = requests.get(url, headers=headers)
    print("Status:", r.status_code)
    if r.status_code == 200:
        soup = BeautifulSoup(r.text, 'html.parser')
        # check if it uses iframes
        frames = soup.find_all('iframe')
        for f in frames:
            print("Iframe:", f.get('src'))
        print("Page text snippet:", soup.get_text(strip=True)[:100])

check_wp()
check_es()
