import re

with open("saas.js", "r", encoding="utf-8") as f:
    code = f.read()

# 1. Monición de Entrada
code = re.sub(
    r'if\s*\(\s*data\.monicion_entrada\s*&&\s*!isEn\s*\)\s*\{',
    r'const showMoniciones = document.getElementById("toggle-moniciones") ? document.getElementById("toggle-moniciones").checked : true;\n            if (showMoniciones && data.monicion_entrada && !isEn) {',
    code
)

# 2. Rito Penitencial vs Aspersión
# Find: let ritoPen = data.rito_penitencial || ... 
# And the priest parts out += ... "Penitential Act"
penitential_block = r'''let ritoPen = data.rito_penitencial \|\| \(isEn \? "I confess to almighty God..." : "Yo confieso ante Dios todopoderoso .*?;"\);\n\s*out \+= `\*\*\$\{sNum\+\+\}\. \$\{isEn \? "Penitential Act" : "Rito Penitencial"\}\*\*\\n\*\*\$\{isEn \? "Priest" : "Sacerdote"\}\:\*\* \$\{isEn \? "Brethren \(brothers and sisters\), let us acknowledge our sins\.\.\." : "Hermanos: reconozcamos nuestros pecados\."\}\\n\*\*\$\{isEn \? "People" : "Asamblea"\}\:\*\* \$\{ritoPen\}\\n.*?`'''

replacement_penitential = r'''
            let esPascuaDominical = (data.tiempo_liturgico && data.tiempo_liturgico.toLowerCase().includes("pascua")) && (data.dia_semana && data.dia_semana.toLowerCase().includes("domingo"));
            if (esPascuaDominical && !isEn) {
                out += `**${sNum++}. Rito de Aspersión del Agua Bendita**\n*El sacerdote rocía con el agua bendita a la asamblea en memoria del Bautismo, mientras se entona el canto correspondiente.*\n**Antífona sugerida:** Vi salir agua del lado derecho del templo. Aleluya.\n\n`;
            } else {
                let ritoPen = data.rito_penitencial || (isEn ? "I confess to almighty God..." : "Yo confieso ante Dios todopoderoso y ante ustedes, hermanos, que he pecado mucho de pensamiento, palabra, obra y omisión. Por mi culpa, por mi culpa, por mi gran culpa. Por eso ruego a santa María, siempre Virgen, a los ángeles, a los santos y a ustedes, hermanos, que intercedan por mí ante Dios, nuestro Señor.");
                out += `**${sNum++}. ${isEn ? "Penitential Act" : "Rito Penitencial"}**\n**${isEn ? "Priest" : "Sacerdote"}:** ${isEn ? "Brethren (brothers and sisters), let us acknowledge our sins..." : "Hermanos: reconozcamos nuestros pecados."}\n**${isEn ? "People" : "Asamblea"}:** ${ritoPen}\n**${isEn ? "Priest" : "Sacerdote"}:** ${isEn ? "May almighty God have mercy on us..." : "Dios todopoderoso tenga misericordia de nosotros..."}\n**${isEn ? "People" : "Asamblea"}:** ${isEn ? "Amen." : "Amén."}\n**${isEn ? "Priest" : "Sacerdote"}:** ${isEn ? "Lord, have mercy." : "Señor, ten piedad."}\n**${isEn ? "People" : "Asamblea"}:** ${isEn ? "Lord, have mercy." : "Señor, ten piedad."}\n**${isEn ? "Priest" : "Sacerdote"}:** ${isEn ? "Christ, have mercy." : "Cristo, ten piedad."}\n**${isEn ? "People" : "Asamblea"}:** ${isEn ? "Christ, have mercy." : "Cristo, ten piedad."}\n**${isEn ? "Priest" : "Sacerdote"}:** ${isEn ? "Lord, have mercy." : "Señor, ten piedad."}\n**${isEn ? "People" : "Asamblea"}:** ${isEn ? "Lord, have mercy." : "Señor, ten piedad."}\n\n`;
            }
'''

code = re.sub(penitential_block, replacement_penitential.strip("\n"), code, flags=re.DOTALL)

# 3. Credo Toggle
code = re.sub(
    r'if\s*\(\s*lp\.segunda_lectura\s*\|\|\s*aplicaGloria\s*\)\s*\{',
    r'const showCredo = document.getElementById("toggle-credo") ? document.getElementById("toggle-credo").checked : false;\n            if (showCredo || lp.segunda_lectura) {',
    code
)

# 4. Homilia / Subsidio Toggle
code = re.sub(
    r'if\s*\(\s*data\.reflexion_homiletica\s*&&\s*!isEn\s*\)\s*\{',
    r'const showHomilia = document.getElementById("toggle-homilia") ? document.getElementById("toggle-homilia").checked : true;\n            if (showHomilia && data.reflexion_homiletica && !isEn) {',
    code
)

# 5. Agregar Oración de los Fieles después del Credo
fieles_injection = r'''
            const showFieles = document.getElementById("toggle-fieles") ? document.getElementById("toggle-fieles").checked : true;
            if (showFieles && data.oracion_fieles && !isEn) {
                out += `<div class="missal-block">\n`;
                out += `<p class="missal-heading" style="padding-top:10px;">Oración Universal (Peticiones)</p>\n`;
                out += `**Sacerdote:** Oremos, hermanos, a Dios nuestro Padre, pidiendo por nuestras necesidades y las del mundo entero. Respondemos: **Te rogamos, óyenos.**\n\n`;
                let peticiones = Array.isArray(data.oracion_fieles) ? data.oracion_fieles : data.oracion_fieles.split("\n");
                peticiones.forEach(p => {
                    let text = p.replace(/^-/g, '').trim();
                    if(text.length > 5) out += `**Lector:** ${text}\n\n`;
                });
                out += `**Sacerdote:** Escucha, Padre bondadoso, las súplicas que tu pueblo creyente te presenta con fe. Por Jesucristo, nuestro Señor. Amén.\n`;
                out += `</div>\n\n`;
            }
'''
code = re.sub(
    r'(let\s+precesOficio\s*=\s*"";)',
    fieles_injection.strip('\n') + r'\n            \1',
    code
)

# 6. Postures depending on MX
# Replace `(${isEn ? "Stand" : "De pie"})` anywhere inside LITURGIA EUCARISTICA 
# wait, actually let's just make it generic or dependent on region.
# Let's create a posture helper at the top of generarDocumento:
# `const standTxt = region === 'mx' ? "" : (isEn ? "(Stand)" : "(De pie)");`
# `const kneelTxt = region === 'mx' ? "(De rodillas durante la Consagración)" : (isEn ? "(Kneel)" : "(De rodillas)");`
# We'll just replace the specific text blocks.
code = code.replace(
    '(${isEn ? "Sit" : "Sentados"})', 
    '${region==="mx" ? "" : (isEn ? "(Sit)" : "(Sentados)")}'
)
code = code.replace(
    '(${isEn ? "Stand" : "De pie"})', 
    '${region==="mx" ? "" : (isEn ? "(Stand)" : "(De pie)")}'
)
code = code.replace(
    '(${isEn ? "Kneel" : "De rodillas"})', 
    '${region==="mx" ? "" : (isEn ? "(Kneel)" : "(De rodillas)")}'
)

# 7. Moniciones de Primera, Segunda y Evangelio respecting `showMoniciones`
code = re.sub(
    r'(if\s*\(\s*lp\.([^.]+)\s*&&\s*lp\.\2\.monicion\s*&&\s*!isEn\s*\)\s*out\s*\+=.*?</div>\\n";)',
    r'if (showMoniciones) { \1 }',
    code
)

with open("saas.js", "w", encoding="utf-8") as f:
    f.write(code)
print("SaaS Updated!")
