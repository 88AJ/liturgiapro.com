import json

def fix_text(text):
    if not isinstance(text, str):
        return text
    # The text has Mac Roman bytes re-encoded as UTF-8.
    # To reverse it: encode string to Mac Roman, then decode from UTF-8
    try:
        raw_bytes = text.encode("mac_roman")
        return raw_bytes.decode("utf-8")
    except (UnicodeEncodeError, UnicodeDecodeError):
        # Some characters might not fit cleanly if they were replaced with ?,
        # but this simple strategy works for perfectly preserved mojibake.
        pass
        
    return text

def fix_dict(d):
    if isinstance(d, dict):
        return {k: fix_dict(v) for k, v in d.items()}
    elif isinstance(d, list):
        return [fix_dict(i) for i in d]
    elif isinstance(d, str):
        return fix_text(d)
    return d

with open("data/liturgia_db.js", "r", encoding="utf-8") as f:
    content = f.read()

# Extract JSON
import re
match = re.search(r"window\.liturgiaData\s*=\s*(\{.*\});", content, re.DOTALL)
if match:
    data_str = match.group(1)
    data = json.loads(data_str)
    fixed_data = fix_dict(data)
    
    with open("data/liturgia_db.js", "w", encoding="utf-8") as f:
        f.write("window.liturgiaData = ")
        json.dump(fixed_data, f, ensure_ascii=False, indent=2)
        f.write(";")
    print("Fixed liturgia_db.js encoding")
else:
    print("Could not find JSON in liturgia_db.js")
