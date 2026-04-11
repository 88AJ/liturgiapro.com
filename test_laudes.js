const fs = require('fs');

// Mock HTML env
global.document = {
    getElementById: (id) => {
        if (id === 'region-select') return { value: 'mx' };
        if (id === 'date-select') return { value: '2026-04-10' };
        if (id === 'office-select') return { value: 'laudes' };
        return null;
    },
    querySelectorAll: () => []
};

// Start mocking
let fileContentDB = fs.readFileSync('./data/liturgia_db.js', 'utf8');
eval(fileContentDB.replace('window.liturgiaData', 'global.liturgiaData'));

let fileContentSaas = fs.readFileSync('./saas.js', 'utf8');
// Extract the generarDocumento function out of the DOMContentLoaded block
let functionBody = fileContentSaas.match(/function generarDocumento\(data, hora\) \{[\s\S]*?\n    \}(?=\n\n    function)/)[0];

eval(functionBody);

let data = global.liturgiaData["2026-04-10"];
try {
    let out = generarDocumento(data, "laudes");
    console.log("Success! Output snippet:");
    console.log(out.substring(0, 100));
    let hasLaudes = out.includes("SALMODIA INTEGRADA");
    console.log("Has Laudes block?", hasLaudes);
} catch (e) {
    console.error("RUNTIME ERROR:", e);
}
