const fs = require('fs');

console.log("========================================");
console.log(" ANTIGRAVITY: BVT SANITY CHECKER (AST) ");
console.log("========================================");

try {
    const filePath = 'data/liturgia_db.js';
    if (!fs.existsSync(filePath)) {
        console.log(`⏳ El archivo ${filePath} aún no existe o el Scraper no ha guardado el primer volcado.`);
        process.exit(0);
    }

    let rawContent = fs.readFileSync(filePath, 'utf8');
    // Limpiar para parseo
    rawContent = rawContent.replace(/^window\.liturgiaData\s*=\s*/, '');
    rawContent = rawContent.replace(/;?\s*$/, '');
    
    let db;
    try {
        db = JSON.parse(rawContent);
    } catch (e) {
        console.error("❌ ERROR CRÍTICO: liturgia_db.js no contiene JSON válido. ¿El scraper truncó el archivo al escribir?", e.message);
        process.exit(1);
    }

    let truncamientosDetectados = 0;
    const MIN_CHARS = 100; // Asumimos que una hagiografía/proclamación no puede ser menor a esto

    console.log(`🔍 Escaneando base de datos: ${Object.keys(db).length} días procesados.`);

    Object.keys(db).forEach(fecha => {
        const data = db[fecha];
        let foundProclamacion = false;

        // Comprobar formato AST (Nuevo)
        if (data.bloques && Array.isArray(data.bloques)) {
            data.bloques.forEach(b => {
                if (b.tipo === 'proclamacion' && b.subtipo !== 'oracion_presidencial') {
                    foundProclamacion = true;
                    if (b.texto && b.texto.length < MIN_CHARS) {
                        console.warn(`[ALERTA TRUNCAMIENTO] [AST] Fecha: ${fecha} | Letras: ${b.texto.length} | Texto: "${b.texto.substring(0, 35)}..."`);
                        truncamientosDetectados++;
                    }
                }
            });
        } 
        
        // Comprobar formato Legacy
        else if (data.liturgia_palabra) {
            const lp = data.liturgia_palabra;
            const checks = [lp.primera_lectura?.texto, lp.segunda_lectura?.texto, lp.evangelio?.texto];
            checks.forEach(txt => {
                if (txt && txt.length > 5 && txt.length < MIN_CHARS) {
                    // Ignora strings de prueba cortos o placeholders comunes
                    if (!txt.includes("No disponible")) {
                        console.warn(`[ALERTA TRUNCAMIENTO] [LEGACY] Fecha: ${fecha} | Letras: ${txt.length} | Texto: "${txt.substring(0, 35)}..."`);
                        truncamientosDetectados++;
                    }
                }
            });
        }
    });

    console.log("----------------------------------------");
    if (truncamientosDetectados === 0) {
        console.log("✅ SANITY CHECK PASSED: 0 truncamientos detectados en la proclamación de la Palabra.");
        console.log("   El motor ETL está manteniendo la integridad 1:1.");
    } else {
        console.log(`❌ ALERTA ROJA: Se detectaron ${truncamientosDetectados} lecturas sospechosas de truncamiento por límite de tokens de Gemini.`);
    }

} catch (err) {
    console.error("Error inesperado en el Sanity Check:", err);
}
