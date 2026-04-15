import json

def patch_file():
    with open("scraper_motor.py", "r", encoding="utf-8") as f:
        content = f.read()

    old_html = """<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Liturgia PRO Standalone - {d}</title>
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
            position: sticky;
            top: 0;
            z-index: 100;
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
    window.liturgiaDB = {day_json};
    </script>
    <script>
{motor_content}
    </script>
</head>
<body>
    <div class="toolbar">
        <h1>Liturgia PRO - {d}</h1>
        <button onclick="window.print()" style="background: #e63946; color: white; border: none; padding: 8px 16px; cursor: pointer;">🖨 Imprimir PDF</button>
    </div>
    <div id="pdf-view" class="pdf-container"></div>
    <script>
        window.addEventListener('DOMContentLoaded', () => {{
            const data = window.liturgiaDB["{d}"];
            if(data) {{
                const htmlOut = generarDocumentoNodos(data, 'laudes', {{ isEn: false }});
                document.getElementById('pdf-view').innerHTML = htmlOut;
            }} else {{
                document.getElementById('pdf-view').innerText = "Data for {d} not found!";
            }}
        }});
    </script>
</body>
</html>"""

    new_html = """<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Liturgia PRO Standalone - {d}</title>
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
            position: sticky;
            top: 0;
            z-index: 100;
        }}
        .toolbar button {{
            background: #2a2a4e; color: white; border: 1px solid #4a4a6a; padding: 8px 16px; cursor: pointer; border-radius: 4px; font-family: 'Outfit';
        }}
        .toolbar button:hover {{ background: #3a3a6e; }}
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
    window.liturgiaDB = {day_json};
    </script>
    <script>
{motor_content}
    </script>
</head>
<body>
    <div class="toolbar">
        <h1 style="margin:0; font-size:1.1rem; font-family:'Cinzel';">Liturgia PRO - {d}</h1>
        <button onclick="renderizar('laudes')" id="btn-laudes">🌅 Laudes</button>
        <button onclick="renderizar('misa')" id="btn-misa">✝️ Misa</button>
        <button onclick="renderizar('visperas')" id="btn-visperas">🌆 Vísperas</button>
        <div style="flex-grow:1;"></div>
        <button onclick="window.print()" style="background: #8b0000; border: none; font-weight: bold;">🖨 Imprimir PDF</button>
    </div>
    <div id="pdf-view" class="pdf-container"></div>
    <script>
        function renderizar(hora) {{
            const data = window.liturgiaDB["{d}"];
            if(data) {{
                const htmlOut = generarDocumentoNodos(data, hora, {{ isEn: false }});
                document.getElementById('pdf-view').innerHTML = htmlOut;
            }} else {{
                document.getElementById('pdf-view').innerText = "Data for {d} not found!";
            }}
        }}
        window.addEventListener('DOMContentLoaded', () => {{
            renderizar('misa');
        }});
    </script>
</body>
</html>"""

    # Replace old string with new string in code
    import re
    content = content.replace(old_html, new_html)

    # ADD generating of index.html 
    index_html_generator = """
        # Generar index.html para Github Pages
        index_html = f\"\"\"<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Liturgia PRO - Biblioteca</title>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Outfit:wght@300;400;600&display=swap" rel="stylesheet">
    <style>
        body {{ background: #fdfdfd; margin: 0; font-family: 'Outfit', sans-serif; text-align: center; color: #1a1a2e; }}
        h1 {{ font-family: 'Cinzel', serif; font-size: 2.5rem; color: #8b0000; margin-top: 60px; }}
        p.subtitle {{ color: #555; font-size: 1.1rem; margin-bottom: 40px; }}
        .directory {{ max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }}
        .day-link {{ display: block; padding: 18px; margin-bottom: 16px; background: #f4f4f9; border-radius: 8px; text-decoration: none; color: #333; font-weight: 600; font-size: 1.1rem; transition: transform 0.2s, background 0.2s; border: 1px solid #eee; }}
        .day-link:hover {{ background: #8b0000; color: white; transform: translateY(-3px); box-shadow: 0 4px 10px rgba(139,0,0,0.2); }}
    </style>
</head>
<body>
    <h1>L I T U R G I A &nbsp; P R O</h1>
    <p class="subtitle">Documentos Litúrgicos Oficiales (Auto-Generados)</p>
    <div class="directory">
        <h2 style="margin-top:0; font-family:'Cinzel';">Jornadas Disponibles</h2>
\"\"\"
        for d in sorted(db.keys()):
            index_html += f'        <a href="liturgia_{d}.html" class="day-link">Jornada del {d}</a>\\n'
            
        index_html += \"\"\"    </div>
</body>
</html>\"\"\"
        with open("index.html", "w", encoding="utf-8") as f:
            f.write(index_html)
        print("✅ index.html de directorio generado con éxito.")
"""
    if "✅ index.html" not in content:
        content = content.replace('print("✅ HTML Standalone generados con éxito.")', 'print("✅ HTML Standalone generados con éxito.")' + index_html_generator)

    with open("scraper_motor.py", "w", encoding="utf-8") as f:
        f.write(content)

patch_file()
