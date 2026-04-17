const fs = require('fs');

let dbOrdRaw = fs.readFileSync('data/db_ordinario.js', 'utf8').replace(/window\.DbOrdinario\s*=\s*/, 'global.DbOrdinario = ');
let cantosRaw = fs.readFileSync('data/cantos_db.js', 'utf8').replace(/window\.cantosDB\s*=\s*/, 'global.cantosDB = ');
let liturgiaRaw = fs.readFileSync('data/liturgia_db.js', 'utf8').replace(/window\.liturgiaData\s*=\s*/, 'global.liturgiaData = ');
let motorRaw = fs.readFileSync('motor_nodos.js', 'utf8') + "\n\nglobal.generarDocumentoNodos = generarDocumentoNodos;";

// Mock out the browser environment
global.document = {
    getElementById: function(id) {
        if (id === 'date-select') {
            return {
                value: '2026-04-13',
                options: { 0: { text: '13 de Abril, 2026'} },
                selectedIndex: 0
            };
        }
        if (id === 'grado-liturgico') {
            return { value: 'Feria' };
        }
        return null;
    }
};
global.window = global;

eval(dbOrdRaw);
eval(cantosRaw);
eval(liturgiaRaw);
global.obtenerCantosPorTiempo = function() { return {entrada: "E", ofertorio: "O", comunion: "C", salida: "S"}; };

eval(motorRaw);

let data = global.liturgiaData['2026-04-13'];

try {
    let doc = global.generarDocumentoNodos(data, 'misa', {isEn: false, showMoniciones: true, showHomilia: true});
    console.log("SUCCESS length:", doc.length);
} catch(e) {
    console.log("ERROR RUNNING GENERATION:");
    console.log(e);
}
