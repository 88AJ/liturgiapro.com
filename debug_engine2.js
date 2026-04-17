const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require("fs");

let html = fs.readFileSync('index.html', 'utf8');

const path = require('path');
const resourceLoader = new jsdom.ResourceLoader({
  strictSSL: false,
});

const dom = new JSDOM(html, { 
    runScripts: "dangerously", 
    resources: "usable",
    url: "file://" + path.resolve('index.html')
});

dom.window.document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        try {
            console.log("DOM loaded. Simulating user action...");
            let dateSelect = dom.window.document.getElementById('date-select');
            dateSelect.value = '2026-04-13'; // Lunes Feria
            let event = new dom.window.Event('change');
            dateSelect.dispatchEvent(event);
            
            setTimeout(() => {
                let out = dom.window.document.getElementById('pdf-view').innerHTML;
                console.log("GENERATION OUTPUT LENGTH:", out.length);
                if (out.includes("RITOS INICIALES")) {
                    console.log("SUCCESS ENGINE RENDERED!");
                } else {
                    console.log("RENDER FAILED TO PRODUCE EXPECTED TEXT.");
                }
                process.exit(0);
            }, 1000);
        } catch(e) {
            console.log("ERROR:", e);
            process.exit(1);
        }
    }, 1000);
});
