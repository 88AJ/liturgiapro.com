import re

with open("saas.js", "r", encoding="utf-8") as f:
    text = f.read()

# 1. Remove references to `const sacramentSelect ...` outside functions
text = re.sub(r"const sacramentSelect = document\.getElementById\('sacrament-select'\);\s*", "", text)

# 2. Remove listeners for `sacramentSelect`
text = re.sub(r"sacramentSelect\?\.addEventListener[^;]+;\s*", "", text)

# 3. Inside functions where sacramento was fetched, just default it to "Misa Diaria"
text = re.sub(r"const sacramento = document\.getElementById\('sacrament-select'\)\.value;", "const sacramento = 'Misa Diaria / Dominical';", text)

# 4. Remove chk-intro checks inside `generarDocumento`
text = re.sub(r"const chkIntro = document\.getElementById\('chk-intro'\)\.checked;", "const chkIntro = true;", text)
text = re.sub(r"const chkEuca = document\.getElementById\('chk-eucaristia'\)\.checked;", "const chkEuca = true;", text)
text = re.sub(r"const formatSoloLec = document\.getElementById\('chk-lecturas-solo'\)\.checked;", "const formatSoloLec = false;", text)


with open("saas.js", "w", encoding="utf-8") as f:
    f.write(text)

print("saas.js cleaned up!")
