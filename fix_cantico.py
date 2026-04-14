import re
import json

# 1. FIX SCRAPER MOTOR BUG
with open('scraper_motor.py', 'r') as f:
    sc = f.read()

sc = sc.replace('texto_lines = "\\n".join("Cántico de" + ce_sub[1]).split(\'\\n\')', 
                'texto_lines = ("Cántico de" + ce_sub[1]).split(\'\\n\')')

with open('scraper_motor.py', 'w') as f:
    f.write(sc)


# 2. FIX MOTOR NODOS JS PARSING
with open('motor_nodos.js', 'r') as f:
    js = f.read()

old_logic = """            if (ce.texto) {
                let lines = ce.texto.split("\\n\\n");
                lines.forEach((line, idx) => {
                    if (idx % 2 === 0) bComunion.addSacerdote(line, 'Normal');
                    else bComunion.addAsamblea(line);
                });
            }"""

new_logic = """            if (ce.texto) {
                let lines = [];
                if (Array.isArray(ce.texto)) {
                    lines = ce.texto;
                } else if (typeof ce.texto === 'string') {
                    // Split strictly by paragraphs (empty lines) or single lines, removing empty ones
                    lines = ce.texto.split(/\\n+/).filter(l => l.trim().length > 1);
                }
                
                lines.forEach((line, idx) => {
                    if (idx % 2 === 0) bComunion.addSacerdote(line, 'Normal');
                    else bComunion.addAsamblea(line);
                });
            }"""

js = js.replace(old_logic, new_logic)

with open('motor_nodos.js', 'w') as f:
    f.write(js)

