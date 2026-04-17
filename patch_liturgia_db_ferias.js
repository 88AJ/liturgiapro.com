const fs = require('fs');

let dbCode = fs.readFileSync('data/liturgia_db.js', 'utf8');

// Mock window to capture liturgiaData
const sandbox = { window: {} };
const fn = new Function('window', dbCode);
fn(sandbox.window);

let liturgiaData = sandbox.window.liturgiaData;
let feriasData = JSON.parse(fs.readFileSync('parsed_ferias.json', 'utf8'));

for (let date in feriasData) {
    if (!liturgiaData[date]) {
        liturgiaData[date] = {};
    }
    let fData = feriasData[date];
    Object.keys(fData).forEach(k => {
        if (k === 'liturgia_palabra' && liturgiaData[date][k]) {
            liturgiaData[date][k] = { ...liturgiaData[date][k], ...fData[k] };
        } else {
            liturgiaData[date][k] = fData[k];
        }
    });

    if (fData['guia_reflexion']) {
        liturgiaData[date]['reflexion_homiletica'] = fData['guia_reflexion'];
    }
}

let updatedCode = "window.liturgiaData = " + JSON.stringify(liturgiaData, null, 2) + ";";
fs.writeFileSync('data/liturgia_db.js', updatedCode);
console.log('Successfully patched liturgia_db.js with Ferias data!');
