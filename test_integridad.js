const fs = require('fs');

// Mock DOM
global.window = {};

// Load JSON safely
let dbText = fs.readFileSync('data/liturgia_db.js', 'utf8');
dbText = dbText.replace('window.liturgiaData = ', '').replace(/;$/, '');
const db = JSON.parse(dbText);

const dia = db["2026-04-25"];

function verificarIntegridad(dia) {
    if (!dia || !dia.liturgia_palabra) return 'red';
    
    let lp = dia.liturgia_palabra;
    let truncamientos = 0;
    
    if (lp.primera_lectura && lp.primera_lectura.texto && lp.primera_lectura.texto.length < 100) truncamientos++;
    if (lp.evangelio && lp.evangelio.texto && lp.evangelio.texto.length < 100) truncamientos++;
    if (lp.segunda_lectura && lp.segunda_lectura.texto && lp.segunda_lectura.texto.length < 100) truncamientos++;
    
    const diaStr = JSON.stringify(dia).toLowerCase();
    const badStrings = ["orem oncedusunciar", "(texto completo", "(aquí el sistema"];
    const hasImpurities = badStrings.some(bad => diaStr.includes(bad));
    
    // Check if what passed as Laudes is basically empty
    let isLaudesEmpty = false;
    if (dia.laudes && dia.laudes.salmo1) {
        if (dia.laudes.salmo1.texto && dia.laudes.salmo1.texto.length < 100) isLaudesEmpty = true;
    }
    
    if (hasImpurities || !dia.laudes) {
        return 'red (1)';
    }
    
    if (truncamientos > 0) return 'yellow (trunc ' + truncamientos + ')';
    return isLaudesEmpty ? 'yellow (empty laudes)' : 'green';
}

console.log("Fecha: 2026-04-25");
console.log("Título:", dia.titulo_celebracion || "Feria");
console.log("Integridad Status:", verificarIntegridad(dia));

// check the "laudes" directly
console.log("Salmo 1 texto:", dia.laudes.salmo1.texto.substring(0, 80));

