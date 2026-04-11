import requests

def test_url(url):
    r = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
    print(url, "-> len:", len(r.text))
    # search date in text
    import re
    m = re.search(r'Jueves.*?2026|Mayo.*?2026', r.text, re.IGNORECASE)
    if m: print("Found date:", m.group(0))

test_url('https://www.parroquiasangines.es/lecturas_de_la_santa_misa?fecha=2026-05-14')
test_url('https://www.parroquiasangines.es/lecturas_de_la_santa_misa?date=2026-05-14')
test_url('https://www.parroquiasangines.es/lecturas_de_la_santa_misa?d=2026-05-14')
