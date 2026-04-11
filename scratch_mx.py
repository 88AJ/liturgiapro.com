import requests
from bs4 import BeautifulSoup

def fetch_gdl(url):
    print("Fetching:", url)
    r = requests.get(url)
    if r.status_code == 200:
        soup = BeautifulSoup(r.text, 'html.parser')
        # Print the title to see what date it represents
        title = soup.find('title')
        print("Title:", title.get_text() if title else "No Title")
        # Try to print some text
        for p in soup.find_all('p', limit=3):
            print("P:", p.get_text(strip=True)[:100])
    else:
        print("Status Code:", r.status_code)

fetch_gdl('https://arquidiocesisgdl.org/lectura_dia9.php')
fetch_gdl('https://arquidiocesisgdl.org/lectura_dia8.php')
fetch_gdl('https://arquidiocesisgdl.org/lectura_dia10.php')

