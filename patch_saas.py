import re
import os

with open('/Users/fr.alansanchez/Antigravity/Misa con Liturgia de las Horas/saas.js', 'r', encoding='utf-8') as f:
    code = f.read()

# Replace the Array
code = code.replace("const horasDelDia = ['oficio', 'laudes', 'misa_laudes', 'intermedia', 'visperas', 'completas'];",
                    "const horasDelDia = ['oficio', 'laudes', 'misa_laudes', 'intermedia', 'visperas', 'completas', 'lectio'];")

# We also need to fix the semaforo checking
old_semaforo = """if (hora === 'misa_laudes' && (!localData || !localData.laudes)) {
                    semaforoError = "Bloque de Laudes Mínimo requerido no encontrado. El Sacramentario no puede ser generado incompleto.";
                }"""

new_semaforo = """if ((hora === 'misa_laudes' || hora === 'diario') && (!localData || !localData.laudes)) {
                    semaforoError = "Bloque de Laudes Mínimo requerido no encontrado. El Sacramentario no puede ser generado incompleto.";
                }"""
if old_semaforo in code:
    code = code.replace(old_semaforo, new_semaforo)

with open('/Users/fr.alansanchez/Antigravity/Misa con Liturgia de las Horas/saas.js', 'w', encoding='utf-8') as f:
    f.write(code)

print("Patch applied to saas.js")
