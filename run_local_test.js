const fs = require('fs');
const jsdom = require('jsdom');

let html = `<!DOCTYPE html><html><body>
  <select id="date-select"><option value="2026-04-13">13 de Abril, 2026</option></select>
  <select id="office-select"><option value="misa">Misa</option></select>
  <select id="grado-liturgico"><option value="Feria">Feria</option></select>
  <div id="pdf-view"></div><div id="dynamic-sections"></div>
</body></html>`;

const dom = new jsdom.JSDOM(html, { runScripts: "dangerously" });
const window = dom.window;
const document = window.document;

function safeEval(filename) {
    try {
        let code = fs.readFileSync(filename, 'utf8');
        if (filename.includes('liturgia_db') || filename.includes('db_ordinario') || filename.includes('cantos_db')) {
           code = code.replace(/window\.([a-zA-Z0-9_]+)\s*=\s*/g, 'window.$1 = ');
        }
        window.eval(code);
    } catch(e) {
        console.error("Error loading " + filename, e);
    }
}

safeEval('data/db_ordinario.js');
safeEval('data/cantos_db.js');
safeEval('data/liturgia_db.js');
window.eval(`
window.obtenerCantosPorTiempo = function() { return {entrada: "E", ofertorio: "O", comunion: "C", salida: "S"}; };
`);
safeEval('motor_nodos.js');

try {
    let data = window.liturgiaData['2026-04-13']; // A feria we just processed
    let doc = window.generarDocumentoNodos(data, 'misa', {isEn: false, showMoniciones: true, showHomilia: true});
    console.log("SUCCESS. Output length:", doc.length);
    console.log(doc.substring(0, 500));
} catch(e) {
    console.error("RENDER ERROR:", e);
}
