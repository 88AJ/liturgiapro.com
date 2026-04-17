const fs = require('fs');
let code = fs.readFileSync('motor_nodos.js', 'utf8');

const headerCode = `
    // ==========================================
    // BLOQUE HEADER (FECHA Y TITULO)
    // ==========================================
    const fechaElegida = document.getElementById('date-select') ? document.getElementById('date-select').value : null;
    let bHeader = new BloqueLiturgico('header');
    let diaLabel = document.getElementById('date-select') ? document.getElementById('date-select').options[document.getElementById('date-select').selectedIndex].text : data.tiempo_liturgico;
    bHeader.addSuperTitulo(diaLabel || "Liturgia del Día");
    
    if (data.titulo_celebracion) {
        bHeader.addTitulo(data.titulo_celebracion);
    }
    SECUENCIA_LITURGICA.push(bHeader);
`;

// Insert after let SECUENCIA_LITURGICA = [];
code = code.replace(/let SECUENCIA_LITURGICA = \[\];\n/, 'let SECUENCIA_LITURGICA = [];\n' + headerCode + '\n');
fs.writeFileSync('motor_nodos.js', code);
console.log('Header block fixed in motor_nodos.js');
