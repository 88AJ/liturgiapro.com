import re

with open('saas.js', 'r') as f:
    content = f.read()

# 1. Remove Prompter Logic
content = re.sub(r"const btnPrompter.*\n\}\);\n", "});\n", content, flags=re.DOTALL)

# 2. Remove Dynamic section builder
content = re.sub(r"// Dynamic section builder.*?\n        \}\);\n    \}\n", "", content, flags=re.DOTALL)

# 3. Handle options passing
options_decl = """
                        let options = {
                            isEn: regionSelect.value.startsWith('us_en'),
                            showMoniciones: document.getElementById('toggle-moniciones') ? document.getElementById('toggle-moniciones').checked : true,
                            showHomilia: document.getElementById('toggle-homilia') ? document.getElementById('toggle-homilia').checked : true
                        };
"""
content = content.replace("let doc = generarDocumentoNodos(localData, hora);", options_decl + "                        let doc = generarDocumentoNodos(localData, hora, options);")
content = content.replace("let doc = generarDocumentoNodos(data, hora);", options_decl + "                        let doc = generarDocumentoNodos(data, hora, options);")

# 4. Remove duplicate declarations of markdown dead code if we safely can, but better leave it for now.
with open('saas.js', 'w') as f:
    f.write(content)

