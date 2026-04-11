import re

with open("saas.js", "r", encoding="utf-8") as f:
    code = f.read()

# 1. Separar bloques parroquiales al inicio y al final
# Buscar:
#             const dTitles = document.querySelectorAll('.sec-title');
#             const dContents = document.querySelectorAll('.sec-content');
#             let hasValidBlocks = false;
#             let dynamicOut = `-----\\n\\n### ${isEn ? "PARISH ANNOUNCEMENTS" : "AVISOS PARROQUIALES"}\\n\\n`;
# Mover la extracción de los nodos dTitles dContents ARRIBA al inicio del flujo modular (despues de Color: Verde y fecha)

# We find where it outputs the daily missal header in saas.js line ~369:
#             out += `    <p style="margin: 0; font-style: italic;">${tiempoStr}</p>\n`;
#             out += `    <p style="margin: 0;">Color: ${colorStr}</p>\n`;
#             out += `</div>\n\n`;
# We inject here:
injection_top = r'''

            const dTitles = document.querySelectorAll('.sec-title');
            const dContents = document.querySelectorAll('.sec-content');
            let hasValidBlocksTop = false;
            let dynamicOutTop = ``;
            let remainingTitles = [];
            let remainingContents = [];

            for (let i = 0; i < dTitles.length; i++) {
                 if (dTitles[i].value.trim() !== "") {
                     if (dTitles[i].value.toLowerCase().includes("intencion") || dTitles[i].value.toLowerCase().includes("intention")) {
                         hasValidBlocksTop = true;
                         dynamicOutTop += `<div class="missal-block" style="margin-bottom: 24px;">
                                            <p class="missal-heading" style="color: #444; border-bottom: 1px solid #ccc; padding-bottom: 4px;">${dTitles[i].value}</p>
                                            <p class="missal-paragraph" style="text-align:center;">${dContents[i].value.replace(/\\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>
                                        </div>\n\n`;
                     } else {
                         remainingTitles.push(dTitles[i].value);
                         remainingContents.push(dContents[i].value);
                     }
                 }
            }
            if (hasValidBlocksTop) {
                 out += dynamicOutTop;
            }
'''

code = re.sub(
    r'(<p style="margin: 0;">Color: \$\{colorStr\}</p>\\n\s*</div>\\n\\n)',
    r'\1' + injection_top.strip("\n"),
    code
)

# 2. Reemplazar la iteración antigua al fondo
# We find:
#             const dTitles = document.querySelectorAll('.sec-title');
#             const dContents = document.querySelectorAll('.sec-content');
#             let hasValidBlocks = false;
#             let dynamicOut = `-----\\n\\n### ${isEn ? "PARISH ANNOUNCEMENTS" : "AVISOS PARROQUIALES"}\\n\\n`;
old_loop = r'''const dTitles = document\.querySelectorAll\('\.sec-title'\);\n\s*const dContents = document\.querySelectorAll\('\.sec-content'\);\n\s*let hasValidBlocks = false;\n\s*let dynamicOut = `-----\\n\\n### \$\{isEn \? "PARISH ANNOUNCEMENTS" : "AVISOS PARROQUIALES"\}\\n\\n`;\n\s*for \(let i = 0; i < dTitles\.length; i\+\+\) \{\n\s*if \(dTitles\[i\]\.value\.trim\(\) !== ""\) \{\n\s*hasValidBlocks = true;\n\s*dynamicOut \+= `<div class="missal-block" style="margin-bottom: 24px;">\n\s*<p class="missal-heading" style="color: #444; border-bottom: 1px solid #ccc; padding-bottom: 4px;">\$\{dTitles\[i\]\.value\}</p>\n\s*<p class="missal-paragraph">\$\{dContents\[i\]\.value.replace\(/\\n/g, '<br>'\)\.replace\(/\\\*\\\*\(.*?\)\\\*\\\*/g, '<strong>\$1</strong>'\)\}</p>\n\s*</div>\\n\\n`;\n\s*\}\n\s*\}\n\s*if \(hasValidBlocks\) \{\n\s*out \+= dynamicOut;\n\s*\}'''

new_loop = r'''let hasValidBlocksBottom = false;
            let dynamicOutBottom = `-----\n\n### ${isEn ? "PARISH ANNOUNCEMENTS" : "AVISOS PARROQUIALES"}\n\n`;
            for (let i = 0; i < remainingTitles.length; i++) {
                 hasValidBlocksBottom = true;
                 dynamicOutBottom += `<div class="missal-block" style="margin-bottom: 24px;">
                                        <p class="missal-heading" style="color: #444; border-bottom: 1px solid #ccc; padding-bottom: 4px;">${remainingTitles[i]}</p>
                                        <p class="missal-paragraph">${remainingContents[i].replace(/\\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>
                                    </div>\n\n`;
            }
            if (hasValidBlocksBottom) {
                 out += dynamicOutBottom;
            }'''

code = re.sub(old_loop, new_loop, code)

with open("saas.js", "w", encoding="utf-8") as f:
    f.write(code)
print("SaaS Intenciones Updated!")
