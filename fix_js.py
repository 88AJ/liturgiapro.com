with open('saas.js', 'r') as f:
    content = f.read()

content = content.replace("regionSelect.value.startsWith('us_en')", "(document.getElementById('region-select') ? document.getElementById('region-select').value.startsWith('us_en') : false)")

with open('saas.js', 'w') as f:
    f.write(content)


with open('motor_nodos.js', 'r') as f:
    motor = f.read()

# Make sure BloqueLiturgico has addMonicion and addGuia
if 'addMonicion(texto)' not in motor:
    motor = motor.replace(
        "addRubrica(texto) { this.nodos.push({ tipo: 'rubrica', texto }); }",
        "addRubrica(texto) { this.nodos.push({ tipo: 'rubrica', texto }); }\n    addMonicion(texto) { this.nodos.push({ tipo: 'monicion', texto }); }\n    addGuia(texto) { this.nodos.push({ tipo: 'guia', texto }); }"
    )

with open('motor_nodos.js', 'w') as f:
    f.write(motor)
