import json, re

with open("data/liturgia_db.js", "r") as f:
    text = f.read()

json_str = text.replace("window.liturgiaData =", "").strip()
if json_str.endswith(";"):
    json_str = json_str[:-1]

db = json.loads(json_str)
if "2026-04-15" in db:
    data = db["2026-04-15"]
    print("KEYS FOR 2026-04-15:", list(data.keys()))
else:
    print("Not found")
