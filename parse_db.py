import json, re

with open("data/liturgia_db.js", "r") as f:
    text = f.read()

# get the JSON part
json_str = text.replace("window.liturgiaDB = ", "")
if json_str.endswith(";"):
    json_str = json_str[:-1]

try:
    db = json.loads(json_str)
    if "2026-04-15" in db:
        data = db["2026-04-15"]
        print("Data for 2026-04-15 keys:", list(data.keys()))
        if "liturgia_palabra" in data:
            print("liturgia_palabra keys:", list(data["liturgia_palabra"].keys()))
        else:
            print("NO liturgia_palabra!")
    else:
        print("No entry for 2026-04-15")
except Exception as e:
    print("Error parsing:", e)
