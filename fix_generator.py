
with open("saas.js", "r", encoding="utf-8") as f:
    code = f.read()

import re

# We want to replace the part inside generarDocumento that handles the "Misa modular"
# We will locate `// Flujo Misa modular` and replace until `return out;`

new_generator = """            // Flujo Misa modular
            const cantos = obtenerCantosPorTiempo(data.tiempo_liturgico, isEn);
            
            // I. RITOS INICIALES
            out += `### I. RITOS INICIALES\\n\\n`;
            out += `**1. Canto de Entrada:** *${cantos.entrada}*\\n\\n`;
            
            let antEnt = data.antifona_entrada || "Vengan, benditos de mi Padre...";
            out += `**2. Antífona de Entrada**\\n**Sacerdote:** ${antEnt}\\n\\n`;
            
            let ritoPen = data.rito_penitencial || "Yo confieso ante Dios todopoderoso...";
            out += `**3. Rito Penitencial**\\n**Sacerdote:** Hermanos: para celebrar dignamente estos sagrados misterios, reconozcamos nuestros pecados.\\n**Asamblea:** ${ritoPen}\\n**Sacerdote:** Dios todopoderoso tenga misericordia de nosotros, perdone nuestros pecados y nos lleve a la vida eterna.\\n**Asamblea:** Amén.\\n**Sacerdote:** Señor, ten piedad.\\n**Asamblea:** Señor, ten piedad.\\n**Sacerdote:** Cristo, ten piedad.\\n**Asamblea:** Cristo, ten piedad.\\n**Sacerdote:** Señor, ten piedad.\\n**Asamblea:** Señor, ten piedad.\\n\\n`;
            
            // II. SALMODIA INTEGRADA
            if (hora === "laudes" || hora === "visperas") {
                out += `-----\\n\\n### II. SALMODIA INTEGRADA (${hora.toUpperCase()})\\n\\n`;
                const salmodia = data[hora];
                if (salmodia) {
                    if (salmodia.salmo1) {
                         out += `**4. Primer Salmo:**\\n**Asamblea:** ${salmodia.salmo1.antifona}\\n\\n`;
                         let salmoP = salmodia.salmo1.texto.split("\\n\\n");
                         salmoP.forEach((estrofa, index) => {
                             let l = index % 2 === 0 ? "Lector 1" : "Lector 2";
                             out += `**${l}:**\\n${estrofa}\\n\\n`;
                         });
                         out += `**Asamblea:** Gloria al Padre, y al Hijo, y al Espíritu Santo. Como era en el principio, ahora y siempre, por los siglos de los siglos. Amén.\\n${salmodia.salmo1.antifona}\\n\\n`;
                    }
                    if (salmodia.cantico_at || salmodia.salmo2) {
                         let s2 = salmodia.cantico_at || salmodia.salmo2;
                         let nt = salmodia.cantico_at ? "Cántico AT" : "Segundo Salmo";
                         out += `**5. ${nt}:**\\n**Asamblea:** ${s2.antifona}\\n\\n`;
                         let salmoP = s2.texto.split("\\n\\n");
                         salmoP.forEach((estrofa, index) => {
                             let l = index % 2 === 0 ? "Lector 1" : "Lector 2";
                             out += `**${l}:**\\n${estrofa}\\n\\n`;
                         });
                         if(!salmodia.cantico_at) out += `**Asamblea:** Gloria al Padre...\\n`;
                         out += `${s2.antifona}\\n\\n`;
                    }
                    if (salmodia.salmo2 && salmodia.cantico_nt) { # Visperas
                         let s3 = salmodia.cantico_nt;
                         out += `**6. Cántico NT:**\\n**Asamblea:** ${s3.antifona}\\n\\n`;
                         s3.texto.split("\\n\\n").forEach((estrofa, index) => {
                             let l = index % 2 === 0 ? "Lector 1" : "Lector 2";
                             out += `**${l}:**\\n${estrofa}\\n\\n`;
                         });
                         out += `**Asamblea:** Gloria al Padre...\\n${s3.antifona}\\n\\n`;
                    }
                }
            }
            
            // III. CONCLUSION DE RITOS INICIALES
            out += `-----\\n\\n### III. CONCLUSIÓN DE RITOS INICIALES\\n\\n`;
            if (data.gloria) {
                out += `**7. Gloria**\\n**Asamblea:** Gloria a Dios en el cielo, y en la tierra paz a los hombres que ama el Señor...\\n\\n`;
            }
            
            let colecta = data.oracion_colecta || "Dios nuestro, que nos has reunido...";
            out += `**8. Oración Colecta**\\n**Sacerdote:** Oremos. ${colecta}\\n**Asamblea:** Amén.\\n\\n`;
            
            // IV. LITURGIA DE LA PALABRA
            out += `-----\\n\\n### IV. LITURGIA DE LA PALABRA\\n\\n`;
            let lp = data.liturgia_palabra || {};
            let r1 = lp.primera_lectura || { cita: "Primera Lectura", texto: "[Lectura no disponible]" };
            out += `**9. Primera Lectura** (${r1.cita})\\n**Lector:** Lectura.\\n\\n${r1.texto}\\n\\n**Lector:** Palabra de Dios.\\n**Asamblea:** Te alabamos, Señor.\\n\\n`;
            
            let sr = lp.salmo_responsorial || { cita: "Salmo", respuesta: "El Señor es mi pastor.", texto: "El Señor es mi pastor, nada me falta." };
            out += `**10. Salmo Responsorial** (${sr.cita})\\n**Asamblea:** ${sr.respuesta}\\n\\n`;
            sr.texto.split("\\n\\n").forEach(estrofa => {
                out += `**Lector:**\\n${estrofa}\\n\\n**Asamblea:** ${sr.respuesta}\\n\\n`;
            });
            
            if (lp.segunda_lectura) {
                out += `**11. Segunda Lectura** (${lp.segunda_lectura.cita})\\n**Lector:** Lectura.\\n\\n${lp.segunda_lectura.texto}\\n\\n**Lector:** Palabra de Dios.\\n**Asamblea:** Te alabamos, Señor.\\n\\n`;
            }
            
            let aclv = lp.aclamacion_evangelio || "Aleluya, aleluya.";
            out += `**12. Aclamación antes del Evangelio**\\n**Asamblea:** ${aclv}\\n\\n`;
            
            let ev = lp.evangelio || { cita: "Evangelio", texto: "[Evangelio no disponible]" };
            out += `**13. Evangelio** (${ev.cita})\\n**Sacerdote:** El Señor esté con ustedes.\\n**Asamblea:** Y con tu espíritu.\\n**Sacerdote:** Lectura del santo Evangelio.\\n**Asamblea:** Gloria a ti, Señor.\\n\\n${ev.texto}\\n\\n**Sacerdote:** Palabra del Señor.\\n**Asamblea:** Gloria a ti, Señor Jesús.\\n\\n`;
            
            let preces = lp.preces || (data.laudes ? data.laudes.preces : "Te pedimos, Señor, escucha nuestra oración.");
            out += `**14. Oración de los Fieles**\\n**Sacerdote:** A Dios Padre, dirijamos nuestra súplica:\\n**Asamblea:** Te rogamos, óyenos.\\n\\n${preces}\\n\\n**Sacerdote:** Escucha Padre nuestras oraciones.\\n**Asamblea:** Padre nuestro, que estás en el cielo... Amén.\\n\\n`;
            
            // V. LITURGIA EUCARISTICA
            out += `-----\\n\\n### V. LITURGIA EUCARÍSTICA\\n\\n`;
            out += `**15. Canto de Ofertorio:** *${cantos.ofertorio}*\\n\\n`;
            let le = data.liturgia_eucaristica || {};
            let ofrendas = le.oracion_ofrendas || "Recibe, Señor, las ofrendas de tu pueblo...";
            out += `**16. Oración sobre las Ofrendas**\\n**Sacerdote:** ${ofrendas}\\n**Asamblea:** Amén.\\n\\n`;
            
            let antc = le.antifona_comunion || "Acerca tu mano...";
            out += `**17. Antífona de la Comunión**\\n**Sacerdote:** ${antc}\\n\\n`;
            
            out += `**18. Canto de Comunión:** *${cantos.comunion}*\\n\\n`;
            
            let despues = le.oracion_despues_comunion || "Concédenos, Dios todopoderoso...";
            out += `**19. Oración después de la Comunión**\\n**Sacerdote:** Oremos. ${despues}\\n**Asamblea:** Amén.\\n\\n`;
            
            // VI. RITO DE CONCLUSION
            out += `-----\\n\\n### VI. RITO DE CONCLUSIÓN\\n\\n`;
            out += `**20. Canto de Salida:** *${cantos.salida}*\\n\\n`;
"""

start_str = "// Flujo Misa modular"
end_str = "return out;"
start_idx = code.find(start_str)
end_idx = code.find(end_str, start_idx)

if start_idx != -1 and end_idx != -1:
    new_code = code[:start_idx] + new_generator + "        }\n        " + code[end_idx:]
    with open("saas.js", "w", encoding="utf-8") as f:
        f.write(new_code)
    print("Replaced generarDocumento successfully.")
else:
    print("Could not find boundaries.")
