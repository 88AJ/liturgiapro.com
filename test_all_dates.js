var fs = require('fs');

var window = { cantosDB: {}, calendarioDB: {} };
var document = {
    getElementById: function() { return { value: '', checked: false, innerHTML: '' }; }
};
var liturgiaData = {};

let saas = fs.readFileSync('saas.js', 'utf8');
let motor = fs.readFileSync('motor_nodos.js', 'utf8');
let rawData = fs.readFileSync('data/liturgia.json', 'utf8');

liturgiaData = JSON.parse(rawData);
eval(saas + "\n" + motor);

let success = 0;
let errors = 0;
for (let fecha in liturgiaData) {
    try {
        let doc = generarDocumentoNodos(liturgiaData[fecha], '');
        success++;
    } catch(e) {
        console.error("CRASH ON: " + fecha + " -> " + e.message);
        errors++;
    }
}
console.log("SUCCESS:", success, "ERRORS:", errors);
