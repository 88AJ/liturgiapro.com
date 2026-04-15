with open("scraper_motor.py", "r", encoding="utf-8") as f:
    code = f.read()

import re

# Read files to embed securely
old_try_block = """    try:
        css_content = open("saas.css", "r", encoding="utf-8").read()
        motor_content = open("motor_nodos.js", "r", encoding="utf-8").read()
        cantos_content = open("data/cantos_db.js", "r", encoding="utf-8").read()"""

new_try_block = """    try:
        css_content = open("saas.css", "r", encoding="utf-8").read()
        motor_content = open("motor_nodos.js", "r", encoding="utf-8").read()
        cantos_content = open("data/cantos_db.js", "r", encoding="utf-8").read()
        saas_content = open("saas.js", "r", encoding="utf-8").read()
        ordinario_content = open("data/db_ordinario.js", "r", encoding="utf-8").read() if __import__('os').path.exists("data/db_ordinario.js") else ""
        bautismo_content = open("data/ritual_bautismo.js", "r", encoding="utf-8").read() if __import__('os').path.exists("data/ritual_bautismo.js") else ""
        matrimonio_content = open("data/ritual_matrimonio.js", "r", encoding="utf-8").read() if __import__('os').path.exists("data/ritual_matrimonio.js") else ""
        exequias_content = open("data/ritual_exequias.js", "r", encoding="utf-8").read() if __import__('os').path.exists("data/ritual_exequias.js") else ""
"""

code = code.replace(old_try_block, new_try_block)

old_scripts_block = """    <script>
{cantos_content}
    </script>
    <script>
    window.liturgiaDB = {day_json};
    </script>
    <script>
{motor_content}
    </script>"""

new_scripts_block = """    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <script>
{cantos_content}
{ordinario_content}
{bautismo_content}
{matrimonio_content}
{exequias_content}
    </script>
    <script>
    window.liturgiaDB = {day_json};
    </script>
    <script>
{saas_content}
    </script>
    <script>
{motor_content}
    </script>"""

code = code.replace(old_scripts_block, new_scripts_block)

with open("scraper_motor.py", "w", encoding="utf-8") as f:
    f.write(code)

print("Scraper patched with full standalone script dependencies.")
