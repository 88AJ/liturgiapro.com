import re
import json

with open('data/liturgia_db.js', 'r') as f:
    content = f.read()

# Extract json
json_str = content[content.find('{'):]
try:
    data = json.loads(json_str)
    print("Parsed JSON successfully.")
except Exception as e:
    print("Error parsing JSON:", e)
    # Let's clean the end
    json_str = json_str[:json_str.rfind(';')]
    print("Trying again...")
    try:
        data = json.loads(json_str)
        print("Parsed JSON successfully.")
    except Exception as e2:
        print("Still error:", e2)
        exit(1)

for date, day_data in data.items():
    if "laudes" in day_data:
        laudes = day_data["laudes"]
        for key in ["salmo1", "salmo2", "cantico_at", "cantico_evangelico"]:
            if key in laudes:
                if "texto" not in laudes[key] or laudes[key]["texto"] is None:
                    print(f"[{date}] Laudes {key} missing 'texto'")
    if "visperas" in day_data:
        visperas = day_data["visperas"]
        for key in ["salmo1", "salmo2", "cantico_nt", "cantico_evangelico"]:
            if key in visperas:
                if "texto" not in visperas[key] or visperas[key]["texto"] is None:
                    print(f"[{date}] Visperas {key} missing 'texto'")
print("Done checking.")
