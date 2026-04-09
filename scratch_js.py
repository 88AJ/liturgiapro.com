import re
import sys

with open("saas.js", "r") as f:
    js = f.read()

# 1. Update formatLectura to use Drop Cap and Paragraphs
new_format_lectura = """    function formatLectura(texto) {
        if (!texto || texto.length < 50) return texto;
        
        let pText = texto;
        if (!texto.includes('\\n\\n')) {
            let sentences = texto.replace(/([.?!])\\s*(?=[A-Z])/g, "$1|").split("|");
            let result = "";
            for(let i = 0; i < sentences.length; i++) {
                result += sentences[i] + " ";
                if (i > 0 && i % 2 === 0) result += "\\n\\n";
            }
            pText = result.trim();
        }
        
        let parrafos = pText.split(/\\n\\n+/);
        let blocks = [];
        
        parrafos.forEach((p, idx) => {
             let cleanP = p.trim().replace(/\\n/g, ' ');
             if(cleanP === "") return;
             if (idx === 0) {
                 let firstChar = cleanP.charAt(0);
                 let desc = cleanP.slice(1);
                 blocks.push(`<p class="missal-paragraph first-par"><span class="drop-cap">${firstChar}</span>${desc}</p>`);
             } else {
                 blocks.push(`<p class="missal-paragraph">${cleanP}</p>`);
             }
        });
        
        return blocks.join("");
    }"""

js = re.sub(r'    function formatLectura\(texto\).*?return result\.trim\(\);\n    }', new_format_lectura, js, flags=re.DOTALL)

# 2. Re-write the generate steps to drop sNum++ and use Missal classes
# It's a huge block. Let's substitute piece by piece using string replacement for safety, since we know exact strings from `saas.js`

# Primera Lectura
r_primera = r"""            let r1 = lp\.primera_lectura \|\| \{ cita: "Primera Lectura", texto: "\[Lectura no disponible\]" \};
            out \+= `\*\*\$\{sNum\+\+\}\. Primera Lectura\*\* \(\$\{r1\.cita\}\)\\n\*\*Lector:\*\* Lectura\.\\n\\n\$\{formatLectura\(r1\.texto\)\}\\n\\n\*\*Lector:\*\* Palabra de Dios\.\\n\*\*Asamblea:\*\* Te alabamos, Señor\.\\n\\n`;"""
n_primera = """            let r1 = lp.primera_lectura || { cita: "Primera Lectura", texto: "[Lectura no disponible]" };
            out += `<div class="missal-block">`;
            out += `<p class="missal-heading">Primera Lectura</p>\n`;
            out += `<p class="missal-citation">De: ${r1.cita}</p>\n`;
            out += `${formatLectura(r1.texto)}\n`;
            out += `<p class="missal-rubric">Palabra de Dios.</p>\n<p class="missal-rubric">R. Te alabamos, Señor.</p>\n</div>\n\n`;"""
js = re.sub(r_primera, n_primera, js)

# Salmo Responsorial
r_salmo = r"""            let sr = lp\.salmo_responsorial \|\| \{ cita: "Salmo", respuesta: "El Señor es mi pastor\.", texto: "El Señor es mi pastor, nada me falta\." \};
            out \+= `\*\*\$\{sNum\+\+\}\. Salmo Responsorial\*\* \(\$\{sr\.cita\}\)\\n\*\*Asamblea:\*\* \$\{sr\.respuesta\}\\n\\n`;
            let txtSalmo = formatLectura\(sr\.texto\);
            txtSalmo\.split\("\\n\\n"\)\.forEach\(estrofa => \{
                if\(estrofa\.trim\(\)\.length > 0\) out \+= `\*\*Lector:\*\*\\n\$\{estrofa\}\\n\\n\*\*Asamblea:\*\* \$\{sr\.respuesta\}\\n\\n`;
            \}\);"""
n_salmo = """            let sr = lp.salmo_responsorial || { cita: "Salmo", respuesta: "El Señor es mi pastor.", texto: "El Señor es mi pastor, nada me falta." };
            out += `<div class="missal-block">`;
            out += `<p class="missal-heading" style="float:left; margin-right:20px;">Salmo Responsorial</p>\n`;
            out += `<p class="missal-citation" style="text-align:right;">${sr.cita}</p>\n<div style="clear:both;"></div>`;
            out += `<p class="missal-paragraph" style="font-weight:bold;">R. ${sr.respuesta}</p>\n`;
            let sText = sr.texto;
            let sp = sText.split(/\\n\\n+/);
            sp.forEach(estrofa => {
                 if(estrofa.trim().length > 0) out += `<p class="missal-paragraph" style="margin-top:10px;">${estrofa.trim().replace(/\\n/g, '<br>')}</p><p class="missal-rubric">R. ${sr.respuesta}</p>\n`;
            });
            out += `</div>\n\n`;"""
js = re.sub(r_salmo, n_salmo, js)

# Segunda Lectura
r_segunda = r"""            if \(lp\.segunda_lectura\) \{
                out \+= `\*\*\$\{sNum\+\+\}\. Segunda Lectura\*\* \(\$\{lp\.segunda_lectura\.cita\}\)\\n\*\*Lector:\*\* Lectura\.\\n\\n\$\{formatLectura\(lp\.segunda_lectura\.texto\)\}\\n\\n\*\*Lector:\*\* Palabra de Dios\.\\n\*\*Asamblea:\*\* Te alabamos, Señor\.\\n\\n`;
            \}"""
n_segunda = """            if (lp.segunda_lectura) {
                out += `<div class="missal-block">`;
                out += `<p class="missal-heading">Segunda Lectura</p>\n`;
                out += `<p class="missal-citation">De: ${lp.segunda_lectura.cita}</p>\n`;
                out += `${formatLectura(lp.segunda_lectura.texto)}\n`;
                out += `<p class="missal-rubric">Palabra de Dios.</p>\n<p class="missal-rubric">R. Te alabamos, Señor.</p>\n</div>\n\n`;
            }"""
js = re.sub(r_segunda, n_segunda, js)

# Secuencia
r_secuencia = r"""            if \(lp\.secuencia\) \{
                out \+= `\*\*\$\{sNum\+\+\}\. Secuencia\*\*\\n\*\*Lector / Cantor:\*\*\\n\\n\$\{formatLectura\(lp\.secuencia\)\}\\n\\n`;
            \}"""
n_secuencia = """            if (lp.secuencia) {
                out += `<div class="missal-block">`;
                out += `<p class="missal-heading">Secuencia</p>\n`;
                out += `<p class="missal-citation">Opcional</p>\n`;
                out += `<p class="missal-paragraph">${lp.secuencia.replace(/\\n/g, '<br>')}</p>\n`;
                out += `</div>\n\n`;
            }"""
js = re.sub(r_secuencia, n_secuencia, js)

# Aleluya
r_aclamacion = r"""            let aclv = lp\.aclamacion_evangelio \|\| "Aleluya, aleluya\.";
            if \(isCuaresma\) \{
                if \(\!lp\.aclamacion_evangelio \|\| aclv\.toUpperCase\(\)\.includes\("ALELUYA"\)\) \{
                    aclv = aclv\.replace\(/Aleluya/ig, "Honor y gloria a ti, Señor Jesús"\);
                \}
            \}
            out \+= `\*\*\$\{sNum\+\+\}\. Aclamación antes del Evangelio\*\*\\n\*\*Asamblea:\*\* \$\{aclv\}\\n\\n`;"""
n_aclamacion = """            let aclv = lp.aclamacion_evangelio || "Aleluya, aleluya.";
            if (isCuaresma) {
                if (!lp.aclamacion_evangelio || aclv.toUpperCase().includes("ALELUYA")) {
                    aclv = aclv.replace(/Aleluya/ig, "Honor y gloria a ti, Señor Jesús");
                }
            }
            out += `<div class="missal-block">`;
            out += `<p class="missal-heading">Aclamación antes del Evangelio</p>\n`;
            out += `<p class="missal-paragraph" style="font-weight:bold;">${aclv.replace(/\\n/g, '<br>')}</p>\n`;
            out += `</div>\n\n`;"""
js = re.sub(r_aclamacion, n_aclamacion, js)

# Evangelio (With the cross char: ☩)
r_evangelio = r"""            let ev = lp\.evangelio \|\| \{ cita: "Evangelio", texto: "\[Evangelio no disponible\]" \};
            out \+= `\*\*\$\{sNum\+\+\}\. Evangelio\*\* \(\$\{ev\.cita\}\)\\n\*\*Sacerdote:\*\* El Señor esté con ustedes\.\\n\*\*Asamblea:\*\* Y con tu espíritu\.\\n\*\*Sacerdote:\*\* Lectura del santo Evangelio\.\\n\*\*Asamblea:\*\* Gloria a ti, Señor\.\\n\\n\$\{formatLectura\(ev\.texto\)\}\\n\\n\*\*Sacerdote:\*\* Palabra del Señor\.\\n\*\*Asamblea:\*\* Gloria a ti, Señor Jesús\.\\n\\n`;"""
n_evangelio = """            let ev = lp.evangelio || { cita: "Evangelio", texto: "[Evangelio no disponible]" };
            out += `<div class="missal-block">`;
            out += `<p class="missal-heading">Evangelio</p>\n`;
            out += `<p class="missal-paragraph" style="font-weight:bold;"><span class="cross-mark">☩</span> Del santo Evangelio según: ${ev.cita.replace(/Evangelio /i, '')}</p>\n`;
            out += `${formatLectura(ev.texto)}\n`;
            out += `<p class="missal-rubric">Palabra del Señor.</p>\n<p class="missal-rubric">R. Gloria a ti, Señor Jesús.</p>\n</div>\n\n`;"""
js = re.sub(r_evangelio, n_evangelio, js)

# Homilia y Credo
r_homi = r"""            out \+= `\*\*\$\{sNum\+\+\}\. Homilía\*\*\\n\*\(\Pausa de silencio y reflexión\)\*\\n\\n`;
            
            if \(lp\.segunda_lectura \|\| aplicaGloria\) \{
                out \+= `\*\*\$\{sNum\+\+\}\. Profesión de Fe \(Credo\)\*\*\\n\*\*Asamblea:\*\* Creo en Dios.*?;"""
# Let's do it safely
n_homi = """            out += `<div class="missal-block"><p class="missal-heading">Homilía</p><p class="missal-rubric">El sacerdote pronuncia la homilía.</p></div>\n\n`;\n\n            if (lp.segunda_lectura || aplicaGloria) {\n                out += `<div class="missal-block"><p class="missal-heading">Profesión de Fe</p><p class="missal-rubric">Se dice el Credo.</p></div>\n\n`;\n            }"""
# Use re to replace homilia / credo with simplified rubrics matching a missal
js = re.sub(r'            out \+= `\*\*.*sNum\+\+.*\. Homilía\*\*.*?Amén\.\\n\\n`;', n_homi, js, flags=re.DOTALL)

with open("saas.js", "w") as f:
    f.write(js)

print("JS Update Script generated successfully")
