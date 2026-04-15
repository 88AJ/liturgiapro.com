with open("scraper_motor.py", "r", encoding="utf-8") as f:
    code = f.read()

old_try_block = """    try:
        css_content = open("saas.css", "r", encoding="utf-8").read()
        motor_content = open("motor_nodos.js", "r", encoding="utf-8").read()
        cantos_content = open("data/cantos_db.js", "r", encoding="utf-8").read()
        saas_content = open("saas.js", "r", encoding="utf-8").read()
        ordinario_content = open("data/db_ordinario.js", "r", encoding="utf-8").read() if __import__('os').path.exists("data/db_ordinario.js") else ""
        bautismo_content = open("data/ritual_bautismo.js", "r", encoding="utf-8").read() if __import__('os').path.exists("data/ritual_bautismo.js") else ""
        matrimonio_content = open("data/ritual_matrimonio.js", "r", encoding="utf-8").read() if __import__('os').path.exists("data/ritual_matrimonio.js") else ""
        exequias_content = open("data/ritual_exequias.js", "r", encoding="utf-8").read() if __import__('os').path.exists("data/ritual_exequias.js") else ""
"""

new_try_block = """    try:
        def safe_read(path):
            if not __import__('os').path.exists(path): return ""
            return open(path, "r", encoding="utf-8").read().replace("</script>", "<\\/script>")
            
        css_content = open("saas.css", "r", encoding="utf-8").read()
        motor_content = safe_read("motor_nodos.js")
        cantos_content = safe_read("data/cantos_db.js")
        saas_content = safe_read("saas.js")
        ordinario_content = safe_read("data/db_ordinario.js")
        bautismo_content = safe_read("data/ritual_bautismo.js")
        matrimonio_content = safe_read("data/ritual_matrimonio.js")
        exequias_content = safe_read("data/ritual_exequias.js")
"""

code = code.replace(old_try_block, new_try_block)
with open("scraper_motor.py", "w", encoding="utf-8") as f:
    f.write(code)

print("HTML script tag breaking fix applied to scraper_motor.py")
