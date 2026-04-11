const fs = require('fs');

// Mock DOM
let window = {};
let document = {
    getElementById: function(id) {
        if (id === 'office-select') return { value: 'laudes' };
        if (id === 'date-select') return { value: '2026-04-10' };
        if (id === 'region-select') return { value: 'mx' };
        if (id === 'pdf-view') return { innerHTML: '', style: {} };
        if (id === 'liturgia-form') return { style: {} };
        if (id === 'btn-generar') return {
            addEventListener: function(evt, cb) {}
        };
        // Mocking canvas for html2pdf if needed
        let el = {
            addEventListener: function() {},
            style: {},
            classList: { add: function(){}, remove: function(){} },
            querySelector: function() { return el; },
            querySelectorAll: function() { return []; },
            innerHTML: ''
        };
        return el;
    },
    createElement: function() { return {}; },
    querySelector: function() { return null; }
};

const liturgiaContent = fs.readFileSync('data/liturgia_db.js', 'utf8');
eval(liturgiaContent.replace('window.liturgiaData', 'window.liturgiaData'));

const saasContent = fs.readFileSync('saas.js', 'utf8');
// Extract just the rendering function
let renderFunc = saasContent.match(/function generateLiturgia\(([\s\S]*?)\nfunction/);
if (renderFunc) {
    eval("window.generateLiturgia = function(" + renderFunc[1]);
    
    // We also need some helper functions from saas.js
    let reqs = ["linkCanto", "obtenerCantosPorTiempo", "formatLectura", "formatBlocks"];
    for (let req of reqs) {
        let regex = new RegExp(`function ${req}\\([\\s\\S]*?\\n}`);
        let match = saasContent.match(regex);
        if (match) eval(match[0]);
    }
    
    // Try to execute
    let date = '2026-04-10';
    let data = window.liturgiaData[date];
    let isEn = false;
    let hora = 'laudes';
    
    // Simulating lines 310-730 roughly
    
} else {
    // Manually test if Laudes exists in the DB for 04-10
    console.log("Laudes salmo1:", window.liturgiaData['2026-04-10'].laudes.salmo1.antifona);
}

