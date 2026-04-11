import re

with open('motor_nodos.js', 'r') as f:
    content = f.read()

# Make sure BloqueLiturgico has addMonicion and addGuia
if 'addMonicion(texto)' not in content:
    content = content.replace(
        "addRubrica(texto) { this.nodos.push({ tipo: 'rubrica', texto }); }",
        "addRubrica(texto) { this.nodos.push({ tipo: 'rubrica', texto }); }\n    addMonicion(texto) { this.nodos.push({ tipo: 'monicion', texto }); }\n    addGuia(texto) { this.nodos.push({ tipo: 'guia', texto }); }"
    )

# Update HTML Renderer to support monicion and guia
if 'nodo.tipo === \'monicion\'' not in content:
    render_logic = """            } else if (nodo.tipo === 'rubrica') {
                htmlOutput += `<p class="rubrica"><span class="rubrica-texto">${nodo.texto}</span></p>`;
            } else if (nodo.tipo === 'monicion') {
                htmlOutput += `<p class="monicion"><strong>S./o M./ </strong> <em>${nodo.texto}</em></p>`;
            } else if (nodo.tipo === 'guia') {
                htmlOutput += `<div class="guia-homilia"><strong>Punto de Reflexión:</strong> ${nodo.texto}</div>`;"""
    content = content.replace("""            } else if (nodo.tipo === 'rubrica') {
                htmlOutput += `<p class="rubrica"><span class="rubrica-texto">${nodo.texto}</span></p>`;""", render_logic)

with open('motor_nodos.js', 'w') as f:
    f.write(content)
