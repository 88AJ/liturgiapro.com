import json

# Read db
with open('data/liturgia_db.js', 'r', encoding='utf-8') as f:
    content = f.read()
    # Strip 'const liturgiaData = '
    json_str = content[content.find('{'):]
    if json_str.endswith(';'): json_str = json_str[:-1]
    db = json.loads(json_str)

data = db.get("2026-04-12")
if not data:
    print("Data not found for April 12")
    exit(1)

html_content = f"""
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Ejemplo Perfecto - 12 de Abril 2026</title>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=EB+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="saas.css">
    <style>
        body {{ background: #f1f5f9; padding: 2rem; }}
        .pdf-container {{ box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); }}
    </style>
</head>
<body>
    <div style="text-align: center; margin-bottom: 2rem;">
        <button onclick="window.print()" style="padding: 10px 20px; background: #c5a059; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 1.1rem;">🖨️ Presiona aquí para previsualizar el PDF (Verás las letras en rojo y formato perfecto)</button>
    </div>
    <div id="pdf-view" class="pdf-container">
        <!-- Rendered Misal Data -->
        <div class="missal-header">
            <p><strong>MISAL DIARIO</strong></p>
            <p>DOMINGO 12 DE ABRIL DE 2026</p>
            <p>{data['tiempo_liturgico']}</p>
            <p>Color: {data['color']}</p>
        </div>

        <div class="missal-block">
            <p class="missal-heading">Rito de Entrada</p>
            <p class="missal-rubric">Antífona de Entrada:</p>
            <p class="missal-paragraph">{data['antifona_entrada']}</p>
        </div>

        <div class="missal-block">
            <p class="missal-rubric">Sacerdote:</p>
            <p class="missal-paragraph">En el nombre del Padre, y del Hijo, y del Espíritu Santo.</p>
            <p class="missal-rubric">Asamblea:</p>
            <p class="missal-paragraph">Amén.</p>
        </div>

        <div class="missal-block">
            <p class="missal-heading">Rito Penitencial</p>
            <p class="missal-paragraph">{data['rito_penitencial']}</p>
        </div>

        <div class="missal-block">
            <p class="missal-heading">Gloria</p>
            <p class="missal-paragraph" style="text-align:center;">
                Gloria a Dios en el cielo,<br>
                y en la tierra paz a los hombres que ama el Señor.
            </p>
        </div>

        <div class="missal-block">
            <p class="missal-heading">Oración Colecta</p>
            <p class="missal-rubric">Sacerdote:</p>
            <p class="missal-paragraph">{data['oracion_colecta']}</p>
            <p class="missal-rubric">Asamblea:</p>
            <p class="missal-paragraph">Amén.</p>
        </div>

        <div class="missal-block" style="text-align: center; margin: 30px 0;">
            <p class="missal-heading" style="font-size: 1.1em;">LITURGIA DE LA PALABRA</p>
        </div>

        <div class="missal-block">
            <p class="missal-heading">Primera Lectura</p>
            <p class="missal-citation">De: {data['liturgia_palabra']['primera_lectura']['cita']}</p>
            <p class="missal-paragraph">{data['liturgia_palabra']['primera_lectura']['texto'].replace("\n\n", "</p><p class='missal-paragraph'>")}</p>
            <p class="missal-rubric" style="margin-top:10px;">Palabra de Dios.</p>
            <p class="missal-rubric">R. Te alabamos Señor.</p>
        </div>

        <div class="missal-block">
            <p class="missal-heading">Salmo Responsorial</p>
            <p class="missal-citation">De: {data['liturgia_palabra']['salmo_responsorial']['cita']}</p>
            <p class="missal-rubric">R. {data['liturgia_palabra']['salmo_responsorial']['respuesta']}</p>
            <p class="missal-paragraph" style="margin: 10px 0 10px 20px;">{data['liturgia_palabra']['salmo_responsorial']['texto'].replace("\n\n", "<br><span class='rubric'>R. </span>").replace("\n", "<br>")}</p>
        </div>

        <div class="missal-block">
            <p class="missal-heading">Segunda Lectura</p>
            <p class="missal-citation">De: {data['liturgia_palabra']['segunda_lectura']['cita']}</p>
            <p class="missal-paragraph">{data['liturgia_palabra']['segunda_lectura']['texto'].replace("\n\n", "</p><p class='missal-paragraph'>")}</p>
            <p class="missal-rubric" style="margin-top:10px;">Palabra de Dios.</p>
            <p class="missal-rubric">R. Te alabamos Señor.</p>
        </div>

        <div class="missal-block">
            <p class="missal-heading">Aclamación Antes del Evangelio</p>
            <p class="missal-paragraph" style="text-align:center;">{data['liturgia_palabra']['aclamacion_evangelio']}</p>
        </div>

        <div class="missal-block">
            <p class="missal-heading">Evangelio</p>
            <p class="missal-paragraph" style="font-weight:bold; margin-bottom:8px;"><span class="cross-mark">☩</span> Del santo Evangelio según: {data['liturgia_palabra']['evangelio']['cita']}</p>
            <p class="missal-rubric">R. Gloria a ti, Señor.</p>
            <p class="missal-paragraph" style="margin-top:10px;">{data['liturgia_palabra']['evangelio']['texto'].replace("\n\n", "</p><p class='missal-paragraph'>")}</p>
            <p class="missal-rubric" style="margin-top:10px;">Palabra del Señor.</p>
            <p class="missal-rubric">R. Gloria a ti, Señor Jesús.</p>
        </div>
        
    </div>
</body>
</html>
"""

with open('Ejemplo_Perfecto.html', 'w', encoding='utf-8') as f:
    f.write(html_content)
print("Ejemplo generado extitosamente!")
