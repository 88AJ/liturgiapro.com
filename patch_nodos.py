import re

# 1. PATCH MOTOR_NODOS.JS
with open('motor_nodos.js', 'r', encoding='utf-8') as f:
    code = f.read()

# Reemplazo 1: Determinar OFICIO correctamente
# Buscar: const OFICIO = hora ? (hora === "laudes" ? "Laudes" : (hora === "visperas" ? "Visperas" : "Completas")) : null;
new_oficio_logic = """
    let OFICIO = null;
    if (hora) {
        if (hora.includes("laudes")) OFICIO = "Laudes";
        else if (hora.includes("visperas")) OFICIO = "Visperas";
        else if (hora.includes("oficio")) OFICIO = "Oficio";
        else if (hora.includes("intermedia")) OFICIO = "Intermedia";
        else if (hora.includes("completas")) OFICIO = "Completas";
    }
    const IS_MISA = (hora === "misa" || hora === "misa_laudes" || !hora);
"""
code = re.sub(r'const OFICIO = hora \? \(hora === "laudes"[^\n]+: null;', new_oficio_logic.strip(), code)

# 2. PATCH SAAS.JS
with open('saas.js', 'r', encoding='utf-8') as f:
    saas_code = f.read()

# Reemplazo en semáforo
old_semaforo = """if (hora === 'misa_laudes' && (!localData || !localData.laudes)) {
                    semaforoError = "Bloque de Laudes Mínimo requerido no encontrado. El Sacramentario no puede ser generado incompleto.";
                } else if (readingEvangelioLength > 0 && readingEvangelioLength < 100 && !isPlaceholder) {
                    semaforoError = "Fragmento de Evangelio demasiado corto (Detección < 100 caracteres). Lectura Corrupta.";
                }"""

new_semaforo = """if ((hora === 'misa_laudes' || hora === 'diario') && (!localData || !localData.laudes)) {
                    semaforoError = "Bloque de Laudes Mínimo requerido no encontrado. El Sacramentario no puede ser generado incompleto.";
                } else if (readingEvangelioLength > 0 && readingEvangelioLength < 100 && !isPlaceholder) {
                    semaforoError = "Fragmento de Evangelio demasiado corto (Detección < 100 caracteres). Lectura Corrupta.";
                }"""

saas_code = saas_code.replace(old_semaforo, new_semaforo)

with open('motor_nodos.js', 'w', encoding='utf-8') as f:
    f.write(code)

with open('saas.js', 'w', encoding='utf-8') as f:
    f.write(saas_code)

print("Patch applied")
