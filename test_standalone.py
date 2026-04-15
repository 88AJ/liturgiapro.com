import json, codecs

css_content = open("saas.css", "r", encoding="utf-8").read()
motor_content = open("motor_nodos.js", "r", encoding="utf-8").read()
cantos_content = open("data/cantos_db.js", "r", encoding="utf-8").read()

with open('data/liturgia_db.js', 'r', encoding="utf-8") as f:
    raw = f.read()
    json_start = raw.find('{')
    json_db = raw[json_start:]

html = f"""<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Liturgia PRO Standalone</title>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=EB+Garamond:ital,wght@0,400;0,700;1,400&family=Outfit:wght@300;400;600&display=swap" rel="stylesheet">
    <style>
{css_content}
        body {{ background: #eee; margin: 0; }}
        .toolbar {{
            background: #1a1a2e;
            color: white;
            padding: 16px 32px;
            display: flex;
            align-items: center;
            gap: 16px;
            font-family: 'Outfit', sans-serif;
        }}
        .pdf-container {{
            background: white;
            max-width: 800px;
            margin: 20px auto;
            padding: 40px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }}
        @media print {{
            body {{ background: white; }}
            .toolbar {{ display: none !important; }}
            .pdf-container {{ box-shadow: none; margin: 0; padding: 0; max-width: none; }}
        }}
    </style>
    <script>
{cantos_content}
    </script>
    <script>
    window.liturgiaDB = {json_db};
    </script>
    <script>
{motor_content}
    </script>
</head>
<body>
    <div class="toolbar">
        <h1>Liturgia PRO (Standalone Preview)</h1>
        <button onclick="window.print()" style="background: #e63946; color: white; border: none; padding: 8px 16px; cursor: pointer;">🖨 Imprimir PDF</button>
    </div>
    <div id="pdf-view" class="pdf-container"></div>
    <script>
        window.addEventListener('DOMContentLoaded', () => {{
            const data = window.liturgiaDB["2026-04-15"];
            if(data) {{
                // Use the AST generator inside motor_nodos.js to get raw HTML, then inject.
                const htmlOut = generarDocumentoNodos(data, 'laudes', {{ isEn: false }});
                document.getElementById('pdf-view').innerHTML = htmlOut;
            }} else {{
                document.getElementById('pdf-view').innerText = "Data for 2026-04-15 not found!";
            }}
        }});
    </script>
</body>
</html>
"""

with open("liturgia_15abril2026.html", "w", encoding="utf-8") as f:
    f.write(html)
print("Standalone HTML created!")
