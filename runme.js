
var window = {cantosDB: {}};
var document = {};
// Setup liturgiaData
/* ==========================================
   ANTIGRAVITY - CEREBRO LITÚRGICO UNIFICADO
   ========================================== */

class NodoLiturgico {
    constructor(id, texto, tipo_texto = 'Pronunciado', actor = 'Sacerdote', estado_voz = 'Fuerte', estado_aparicion = 'Obligatorio') {
        this.id = id;
        this.texto = texto;
        this.tipo_texto = tipo_texto; // 'Pronunciado', 'Instruccion', 'Simbolo', 'Titulo'
        this.actor = actor; // 'Sacerdote', 'Asamblea', 'Diacono_Lector', 'Ninguno'
        this.estado_voz = estado_voz; // 'Fuerte', 'Secreta', 'Canto'
        this.estado_aparicion = estado_aparicion;
    }
}

class BloqueLiturgico {
    constructor(id) {
        this.id = id;
        this.nodos = [];
    }
    
    add(nodo) {
        this.nodos.push(nodo);
        return this;
    }
    
    addSuperTitulo(texto) {
        this.nodos.push(new NodoLiturgico(this.id + '_suptit', texto, 'SuperTitulo', 'Ninguno', 'Fuerte'));
        return this;
    }
    
    addTitulo(texto) {
        this.nodos.push(new NodoLiturgico(this.id + '_titulo', texto, 'Titulo', 'Ninguno', 'Fuerte'));
        return this;
    }
    
    addRubrica(texto) {
        this.nodos.push(new NodoLiturgico(this.id + '_rubrica', texto, 'Instruccion', 'Ninguno', 'Fuerte'));
        return this;
    }
    
    addSacerdote(texto, voz = 'Fuerte') {
        this.nodos.push(new NodoLiturgico(this.id + '_sac', texto, 'Pronunciado', 'Sacerdote', voz));
        return this;
    }
    
    addAsamblea(texto) {
        this.nodos.push(new NodoLiturgico(this.id + '_asam', texto, 'Pronunciado', 'Asamblea', 'Fuerte'));
        return this;
    }
    
    addDialogo(sac, asam) {
        this.addSacerdote(sac);
        this.addAsamblea(asam);
        return this;
    }
}

function SANITIZAR_TEXTO(texto_crudo) {
    if (!texto_crudo) return '';
    let texto_limpio = String(texto_crudo).replace(/\[.*?\]/g, ""); // Elimina metadatos
    texto_limpio = texto_limpio.replace(/ {2,}/g, " "); // espacios multiples
    texto_limpio = texto_limpio.replace(/\n{2,}/g, "\n"); // saltos de linea dobles
    return texto_limpio.trim();
}

function RENDERIZAR_NODO(nodo) {
    if (nodo.estado_aparicion === 'Omitido') return '';
    
    nodo.texto = SANITIZAR_TEXTO(nodo.texto);
    
    let color = 'inherit';
    let peso = '400';
    let estilo = 'normal';
    
    // Regla de Color
    if (nodo.tipo_texto === 'Instruccion' || nodo.tipo_texto === 'Simbolo' || nodo.tipo_texto === 'Titulo') {
        color = 'var(--brand-color)';
    }
    
    // Regla de Peso (Negrita para asamblea)
    if (nodo.tipo_texto === 'Pronunciado' && nodo.actor === 'Asamblea') {
        peso = '700';
    }
    
    // Regla de Estilo (Voz Secreta)
    if (nodo.estado_voz === 'Secreta') {
        estilo = 'italic';
    }
    
    if (nodo.tipo_texto === 'SuperTitulo') {
        return `<p class="missal-super-heading" style="color:${color};">${nodo.texto}</p>\n`;
    } else if (nodo.tipo_texto === 'Titulo') {
        return `<p class="missal-heading" style="color:${color};">${nodo.texto}</p>\n`;
    } else if (nodo.tipo_texto === 'Instruccion' || nodo.tipo_texto === 'Simbolo') {
        return `<p class="missal-rubric" style="color:${color}; font-weight:${peso}; font-style:${estilo}; margin-bottom:4px;">${nodo.texto}</p>\n`;
    } else {
        return `<p class="missal-paragraph" style="color:${color}; font-weight:${peso}; font-style:${estilo}; margin-bottom:8px; text-align:justify;">${nodo.texto.replace(/\n/g, '<br>')}</p>\n`;
    }
}

function RENDERIZAR_BLOQUE(bloque) {
    if (bloque.nodos.length === 0) return '';
    let html = `<div class="missal-block" id="${bloque.id}">\n`;
    
    // REGLAS DE PAGINACIÓN LÓGICA (Blueprint)
    let n = bloque.nodos;
    for(let i=0; i<n.length; i++) {
        // Regla: Mantener dialogos juntos
        if (n[i].actor === 'Sacerdote' && (i+1) < n.length && n[i+1].actor === 'Asamblea') {
             html += `<div style="page-break-inside: avoid;">\n`;
             html += RENDERIZAR_NODO(n[i]);
             html += RENDERIZAR_NODO(n[i+1]);
             html += `</div>\n`;
             i++;
        // Regla: Mantener Titulo y su primer parrafo juntos
        } else if (n[i].tipo_texto === 'Titulo' && (i+1) < n.length) {
             html += `<div style="page-break-inside: avoid;">\n`;
             html += RENDERIZAR_NODO(n[i]);
             html += RENDERIZAR_NODO(n[i+1]);
             html += `</div>\n`;
             i++;
        } else {
             // Por defecto proteger el nodo interno si es largo (estrofas de cantos/salmos)
             html += `<div style="page-break-inside: avoid;">\n` + RENDERIZAR_NODO(n[i]) + `</div>\n`;
        }
    }
    
    html += `</div>\n\n`;
    return html;
}

function linkCanto(nombre) {
    if(nombre.includes('Silencio') || nombre.includes('Salida sin canto')) return nombre;
    const query = encodeURIComponent(nombre + ' canto catolico');
    let html = `<a href="https://www.youtube.com/results?search_query=${query}" target="_blank" style="color:#c90000; text-decoration:underline; font-weight:bold;">${nombre}</a>`;
    
    if (window.cantosDB && window.cantosDB[nombre]) {
        const letraFormat = window.cantosDB[nombre].letra.replace(/\n/g, '<br/>');
        html += `<div style="margin-top: 10px; margin-bottom: 5px; line-height: 1.4; font-size: 0.95em; font-style: italic; color: #444; border-left: 3px solid #ddd; padding-left: 12px;">${letraFormat}</div>`;
    }
    
    return html;
}

function obtenerCantosPorTiempo(tiempoStr, isEn) {
    if (isEn) {
        return {
            entrada: linkCanto('Here I Am Lord'),
            ofertorio: linkCanto('Saber que vendrás'),
            comunion: linkCanto('On Eagles Wings'),
            salida: linkCanto('Demos Gracias al Señor') 
        };
    }
    const t = tiempoStr ? tiempoStr.toLowerCase() : "";
    if (t.includes('cuaresma')) {
        return {
            entrada: linkCanto('Hacia ti morada santa'),
            ofertorio: linkCanto('Te ofrecemos Señor nuestra juventud'),
            comunion: linkCanto('Pequeñas aclaraciones'),
            salida: linkCanto('Silencio')
        };
    } else if (t.includes('pascua')) {
        return {
            entrada: linkCanto('El Señor Resucitó Aleluya'),
            ofertorio: linkCanto('Te ofrecemos Señor nuestra juventud'),
            comunion: linkCanto('Pescador de Hombres'),
            salida: linkCanto('Reina del Cielo Aleluya')
        };
    }
    return {
        entrada: linkCanto('Juntos como hermanos'),
        ofertorio: linkCanto('Saber que vendrás'),
        comunion: linkCanto('Pescador de Hombres'),
        salida: linkCanto('Demos Gracias al Señor')
    };
}

document.addEventListener('DOMContentLoaded', () => {
    // Precargar letras de cantos (Offline bypass activo)
    window.cantosDB = window.cantosDB || {};

    window.loadCancionero = function(filename) {
        const frame = document.getElementById("cancionero-frame");
        const empty = document.getElementById("cancionero-empty");
        const navs = document.querySelectorAll("#cancionero-workspace .nav-links li");
        
        // Visual indicator
        navs.forEach(n => n.style.color = "var(--text-primary)");
        // Removed global event reference to prevent ReferenceError
        
        empty.style.display = "none";
        frame.style.display = "block";
        frame.src = "Cancionero/" + filename;
    };

    // Navigation Logic
    const loginBtn = document.getElementById('login-btn');
    const landingScreen = document.getElementById('landing-screen');
    const dashboardScreen = document.getElementById('dashboard-screen');

    loginBtn.addEventListener('click', () => {
        landingScreen.classList.remove('active');
        dashboardScreen.classList.add('active');
    });

    // DOM and Modals obsolete premium components removed

    // Sidebar Navigation Logic
    const liturgiaForm = document.getElementById('liturgia-form');
    const boletinForm = document.getElementById('boletin-form');
    const navItems = document.querySelectorAll('.nav-links li');
    let currentMode = 'liturgia';

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            let view = item.getAttribute('data-view') || 'misa';
            
            // Allow cancionero links inside the Cancionero workspace to ignore this global logic 
            // if they are not in the main sidebar
            if(!item.closest('.saas-sidebar')) return;
            
            navItems.forEach(n => { if(n.closest('.saas-sidebar')) n.classList.remove('active') });
            item.classList.add('active');
            
            let builderWorkspace = document.getElementById("builder-workspace");
            let cancioneroWorkspace = document.getElementById("cancionero-workspace");
            
            let ritualSelect = document.getElementById("ritual-select");
            let bautismoFields = document.getElementById("bautismo-fields");
            let matrimonioFields = document.getElementById("matrimonio-fields");
            let exequiasFields = document.getElementById("exequias-fields");
            let ritualGroup = document.getElementById("ritual-group");
            
            if (view === 'cancionero') {
                if(builderWorkspace) builderWorkspace.style.display = 'none';
                if(cancioneroWorkspace) cancioneroWorkspace.style.display = 'flex';
                currentMode = 'cancionero';
                return; // Stop here for cancionero
            } else {
                if(builderWorkspace) builderWorkspace.style.display = 'flex';
                if(cancioneroWorkspace) cancioneroWorkspace.style.display = 'none';
            }
            
            if (view === 'boletin') {
                liturgiaForm.style.display = 'none';
                boletinForm.style.display = 'block';
                currentMode = 'boletin';
            } else {
                liturgiaForm.style.display = 'block';
                boletinForm.style.display = 'none';
                currentMode = 'liturgia';
                
                if (view === 'bautismo') {
                    if(ritualSelect) ritualSelect.value = "bautismo";
                    if(bautismoFields) bautismoFields.style.display = 'block';
                    if(matrimonioFields) matrimonioFields.style.display = 'none';
                    if(exequiasFields) exequiasFields.style.display = 'none';
                    if(ritualGroup) ritualGroup.style.display = 'block';
                } else if (view === 'matrimonio') {
                    if(ritualSelect) ritualSelect.value = "matrimonio";
                    if(bautismoFields) bautismoFields.style.display = 'none';
                    if(matrimonioFields) matrimonioFields.style.display = 'block';
                    if(exequiasFields) exequiasFields.style.display = 'none';
                    if(ritualGroup) ritualGroup.style.display = 'block';
                } else if (view === 'exequias') {
                    if(ritualSelect) ritualSelect.value = "exequias";
                    if(bautismoFields) bautismoFields.style.display = 'none';
                    if(matrimonioFields) matrimonioFields.style.display = 'none';
                    if(exequiasFields) exequiasFields.style.display = 'block';
                    if(ritualGroup) ritualGroup.style.display = 'block';
                } else if (view === 'misa') {
                    if(ritualSelect) ritualSelect.value = "ninguno";
                    if(bautismoFields) bautismoFields.style.display = 'none';
                    if(matrimonioFields) matrimonioFields.style.display = 'none';
                    if(exequiasFields) exequiasFields.style.display = 'none';
                    if(ritualGroup) ritualGroup.style.display = 'none';
                } else {
                    // For unimplemented rituals, reset to ordinary mass for now
                    if(ritualSelect) ritualSelect.value = "ninguno";
                    if(bautismoFields) bautismoFields.style.display = 'none';
                    if(matrimonioFields) matrimonioFields.style.display = 'none';
                    if(exequiasFields) exequiasFields.style.display = 'none';
                    if(ritualGroup) ritualGroup.style.display = 'none';
                }
            }
        });
    });

    // Dynamic section builder 
    const btnAddSection = document.getElementById('btn-add-section');
    const dynamicSections = document.getElementById('dynamic-sections');
    if (btnAddSection) {
        btnAddSection.addEventListener('click', () => {
            const item = document.createElement('div');
            item.className = 'canto-item';
            item.style = 'flex-direction: column; align-items: stretch; background: var(--bg-dark); padding: 10px; border-radius: 6px; margin-top: 10px;';
            item.innerHTML = `
                <input type="text" placeholder="Título del Bloque" value="Nueva Sección" class="sec-title" style="margin-bottom: 8px;">
                <textarea rows="3" class="sec-content" style="width: 100%; background: transparent; border: 1px solid var(--border-color); color: white; border-radius: 4px; padding: 8px;">Contenido del bloque...</textarea>
            `;
            dynamicSections.appendChild(item);
        });
    }

    // PDF Generation Logic (Keeping core markdown generator)
    let liturgiaData = window.liturgiaData || {};

    const generateBtn = document.getElementById('generate-doc-btn');
    const pdfView = document.getElementById('pdf-view');

    // Liturgical Calendar UI Linker
    const dateSelect = document.getElementById('date-select');
    const liturgicalInfo = document.getElementById('liturgical-info');
    if (dateSelect && liturgicalInfo) {
        dateSelect.addEventListener('change', () => {
             if (window.calendarioDB) {
                 const calDay = window.calendarioDB[dateSelect.value];
                 if (calDay) {
                     liturgicalInfo.style.display = 'block';
                     liturgicalInfo.innerHTML = `<strong>Día Litúrgico:</strong> ${calDay.titulo}<br><strong>Grado:</strong> ${calDay.grado} | <strong>Color:</strong> <span style="text-transform:capitalize;">${calDay.color}</span><br><em style="color:#aaa; font-size:0.8rem;">(Regla Canónica: ${calDay.regla_cem})</em>`;
                 } else {
                     liturgicalInfo.style.display = 'block';
                     liturgicalInfo.innerHTML = `<em style="color:#d86060;">Fecha sin datos en Cerebro Offline. Funciones limitadas.</em>`;
                 }
             }
        });
        // trigger on init
        setTimeout(() => { dateSelect.dispatchEvent(new Event('change')); }, 500);
    }

    generateBtn.addEventListener('click', () => {
        // QUICK DIAGNOSTIC ALERT
        console.log("Generar Documento pulsado. Fecha activa:", document.getElementById('date-select').value);
        if (currentMode === 'cancionero') return; // Do nothing if on Cancionero

        pdfView.innerHTML = '<div class="empty-state">Compilando Rúbricas...</div>';
        
        setTimeout(() => {
            if (currentMode === 'boletin') {
                const date = document.getElementById('bulletin-date').value;
                const clergy = document.getElementById('bulletin-clergy').value;
                const motto = document.getElementById('bulletin-motto').value;
                // Add Logo support
                const logoInput = document.getElementById('bulletin-logo');
                let logoUrl = '';
                if (logoInput && logoInput.files && logoInput.files[0]) {
                     logoUrl = URL.createObjectURL(logoInput.files[0]);
                }
                let data = liturgiaData[date];
                if (!data) {
                    // Fallback to IA generated mock 
                    const d = new Date(date + "T00:00:00");
                    data = {
                        "tiempo_liturgico": "Tiempo Ordinario (Modo API)",
                        "liturgia_palabra": { "evangelio": { "cita": "Evangelio del Día", "texto": "Servicio de API Premium requerido para extracción de lectura futura válida. [Simulación de Llenado]" } }
                    };
                }
                pdfView.className = 'bulletin-wrapper';
                pdfView.innerHTML = generarBoletin(data, date, clergy, motto, logoUrl);
            } else {
                const fecha = document.getElementById('date-select').value;
                const hora = document.getElementById('office-select').value;
                const region = document.getElementById('region-select') ? document.getElementById('region-select').value : 'mx';
                
                pdfView.className = 'pdf-container';
                generateBtn.innerHTML = "Descargando Eucaristía...";

                // CEREBRO OFFLINE: Si ya procesamos el documento localmente, ejecutamos instantáneamente
                let localData = liturgiaData[fecha];
                let hasLocalReadings = localData?.liturgia_palabra?.evangelio?.texto?.length > 50 || localData?.liturgia_palabra?.evangelio?.texto_en?.length > 50;
                let isPlaceholder = localData?.liturgia_palabra?.evangelio?.texto?.includes("Placeholder Dinámico");
                
                if (localData && hasLocalReadings && !isPlaceholder) {
                    try {
                        console.log("Cerebro Offline Activo. Rendereando Data Pura.");
                        let doc = generarDocumentoNodos(localData, hora);
                        pdfView.innerHTML = doc;
                        generateBtn.innerHTML = "Generar Documento";
                    } catch (e) {
                        console.error("ERROR DE RENDER", e);
                        pdfView.innerHTML = `<div style="color:red; padding:20px;"><h3>Error Crítico de Renderizado</h3><pre>${e.message}\n${e.stack}</pre></div>`;
                        generateBtn.innerHTML = "Error";
                    }
                    return;
                }

                // SI NO ESTA OFFLINE, USAMOS PROXY SECUNDARIO (allorigins.win)
                const parts = fecha.split('-');
                let evDateDay = parts ? parseInt(parts[2], 10) : 9;
                let targetUrl = encodeURIComponent(`https://arquidiocesisgdl.org/lectura_dia${evDateDay}.php`);
                let proxyUrl = `https://api.allorigins.win/get?url=${targetUrl}`;

                fetch(proxyUrl)
                    .then(r => r.json())
                    .then(proxyData => {
                        generateBtn.innerHTML = "Generar Documento";
                        const parser = new DOMParser();
                        const htmlDoc = parser.parseFromString(proxyData.contents, 'text/html');
                        
                        let tituloFiesta = "FERIA / MEMORIA LIBRE";
                        let usccbReadings = null;
                        
                        // EXTRACTOR PROFUNDO (EL JEFE FINAL)
                        // Mex extractor Arquidiocesis GDL (Regex Block)
                        let textDump = "";
                        htmlDoc.body.childNodes.forEach(n => {
                            if(n.nodeType === 3) textDump += n.textContent.trim() + "\n";
                            else if(n.tagName === 'P') textDump += n.innerText.trim() + "\n";
                            else if(n.tagName === 'BR') textDump += "\n";
                        });
                        
                        // Cleanup space
                        textDump = textDump.replace(/\n{3,}/g, '\n\n');
                        
                        // Extract title
                        let mTitle = textDump.match(/([a-zA-Záéíóú]+\s+[a-zA-Záéíóú]+\s+Blanco|Verde|Morado|Rojo|OCTAVA.*?)(?:\n|MR p\.)/i);
                        if (mTitle) tituloFiesta = mTitle[1].replace(/Blanco|Verde|Morado|Rojo/gi, '').trim().toUpperCase();
                        else tituloFiesta = "FERIA / TIEMPO ORDINARIO";

                        usccbReadings = { r1: "", r1_c: "Primera Lectura", salmo: "", salmo_c: "Salmo Responsorial", gospel: "", gospel_c: "Evangelio" };
                        
                        let lect1Match = textDump.match(/PRIMERA LECTURA\s*([\s\S]*?)(?:SALMO RESPONSORIAL|SEGUNDA LECTURA)/i);
                        if(lect1Match) usccbReadings.r1 = lect1Match[1].trim();

                        let psalmMatch = textDump.match(/SALMO RESPONSORIAL\s*([\s\S]*?)(?:EVANGELIO|SEGUNDA LECTURA)/i);
                        if(psalmMatch) usccbReadings.salmo = psalmMatch[1].trim();

                        let gospelMatch = textDump.match(/EVANGELIO\s*([\s\S]*?)(?:Credo|Oración de los fieles|LITURGIA EUCARÍSTICA|$)/i);
                        if(gospelMatch) usccbReadings.gospel = gospelMatch[1].trim();

                        let data = liturgiaData[fecha];
                        if (!data) {
                            const d = new Date(fecha + "T00:00:00");
                            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
                            const langDate = region.includes('en') ? 'en-US' : 'es-ES';
                            data = {
                                "dia_semana": d.toLocaleDateString(langDate, options).toUpperCase(),
                                "color": "Verde / Green",
                                "tiempo_liturgico": tituloFiesta,
                                "antifona_entrada": "Dios es mi auxilio, el Señor es mi verdadero sostén.",
                                "rito_penitencial": "Yo confieso ante Dios todopoderoso...",
                                "gloria": true,
                                "oracion_colecta": "Señor Dios, concédenos la gracia de estar siempre entregados a ti...",
                                "liturgia_palabra": {
                                    "primera_lectura": { "cita": "1 Reading", "texto": "Espere..." },
                                    "salmo_responsorial": { "cita": "Psalm", "respuesta": "..." },
                                    "evangelio": { "cita": "Gospel", "texto": "..." }
                                },
                                "liturgia_eucaristica": { "oracion_ofrendas": "Acepta ofrendas...", "oracion_despues_comunion": "Habiendo recibido..." },
                                "laudes": { "salmo1": { "antifona": "Señor...", "texto": "Generado dinámicamente" } }
                            };
                        } else {
                            data.tiempo_liturgico = tituloFiesta; // Override JSON if exists
                        }
                        
                        // OVERRIDE PROFUNDO LECTURAS SI HAY EXTRACCIÓN
                        if (usccbReadings) {
                             data.liturgia_palabra.primera_lectura.cita = usccbReadings.r1_c || "Reading 1";
                             data.liturgia_palabra.primera_lectura.texto = usccbReadings.r1 || "[No Localizado]";
                             data.liturgia_palabra.salmo_responsorial.cita = usccbReadings.salmo_c || "Responsorial Psalm";
                             data.liturgia_palabra.salmo_responsorial.respuesta = usccbReadings.salmo || "[No Localizado]";
                             data.liturgia_palabra.evangelio.cita = usccbReadings.gospel_c || "Gospel";
                             data.liturgia_palabra.evangelio.texto = usccbReadings.gospel || "[No Localizado]";
                        }

                        let doc = generarDocumentoNodos(data, hora);
                        pdfView.innerHTML = doc;
                    })
                    .catch(err => {
                        console.error('Error fetching Title API', err);
                        generateBtn.innerHTML = "Generar Documento";
                        let data = liturgiaData[fecha] || liturgiaData["2026-04-08"];
                        if (!data) {
                            const d = new Date(fecha + "T00:00:00");
                            data = {
                                "dia_semana": d.toLocaleDateString('es-ES', {weekday:'long', year:'numeric', month:'long', day:'numeric'}).toUpperCase(),
                                "color": "Verde", "tiempo_liturgico": "FERIA (MODO OFFLINE)",
                                "antifona_entrada": "Dios es mi auxilio...", "rito_penitencial": "Yo confieso...", "gloria": false,
                                "oracion_colecta": "Señor Dios...",
                                "liturgia_palabra": {
                                    "primera_lectura": { "cita": "Lectura Ferial", "texto": "[Sin conexión al API - Extrae de Misal]" },
                                    "salmo_responsorial": { "cita": "Salmo", "respuesta": "El Señor es mi pastor." },
                                    "evangelio": { "cita": "Evangelio", "texto": "[Sin conexión al API]" }
                                },
                                "liturgia_eucaristica": { "oracion_ofrendas": "Acepta...", "oracion_despues_comunion": "Habiendo..." }
                            };
                        }
                        let doc = generarDocumentoNodos(data, hora);
                        pdfView.innerHTML = doc;
                    });
            }
        }); // Simulate network load ended, we use real network!
    }); // CLOSE generateBtn.addEventListener

    function formatLectura(texto) {
        if (!texto || texto.length < 50) return texto;
        
        let pText = texto;
        if (!texto.includes('\n\n')) {
            let sentences = texto.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
            let result = "";
            for(let i = 0; i < sentences.length; i++) {
                result += sentences[i] + " ";
                if (i > 0 && i % 2 === 0) result += "\n\n";
            }
            pText = result.trim();
        }
        
        let parrafos = pText.split(/\n\n+/);
        let blocks = [];
        
        parrafos.forEach((p, idx) => {
             let cleanP = p.trim().replace(/\n/g, ' ');
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
    }

    function linkCanto(nombre) {
        if(nombre.includes('Silencio') || nombre.includes('Salida sin canto')) return nombre;
        const query = encodeURIComponent(nombre + ' canto catolico');
        let html = `<a href="https://www.youtube.com/results?search_query=${query}" target="_blank" style="color:#c90000; text-decoration:underline; font-weight:bold;">${nombre}</a>`;
        
        if (window.cantosDB && window.cantosDB[nombre]) {
            const letraFormat = window.cantosDB[nombre].letra.replace(/\n/g, '<br/>');
            html += `<div style="margin-top: 10px; margin-bottom: 5px; line-height: 1.4; font-size: 0.95em; font-style: italic; color: #444; border-left: 3px solid #ddd; padding-left: 12px;">${letraFormat}</div>`;
        }
        
        return html;
    }

    function obtenerCantosPorTiempo(tiempoStr, isEn) {
        if (isEn) {
            return {
                entrada: linkCanto('Here I Am Lord'),
                ofertorio: linkCanto('Saber que vendrás'),
                comunion: linkCanto('On Eagles Wings'),
                salida: linkCanto('Demos Gracias al Señor') 
            };
        }
        const t = tiempoStr ? tiempoStr.toLowerCase() : "";
        if (t.includes('cuaresma')) {
             return {
                entrada: linkCanto('Perdona a tu pueblo Señor'),
                ofertorio: linkCanto('Te Ofrecemos Padre Nuestro'),
                comunion: linkCanto('Honor y Gloria a Ti (o Prepara tu Camino)'),
                salida: linkCanto('Silencio')
            };
        } else if (t.includes('pascua')) {
             return {
                entrada: linkCanto('El Señor Resucitó, Aleluya'),
                ofertorio: linkCanto('Te Presentamos el Vino y el Pan'),
                comunion: linkCanto('Yo soy el Pan de Vida'),
                salida: linkCanto('Reina del Cielo Alégrate')
            };
        } else if (t.includes('adviento')) {
             return {
                entrada: linkCanto('Ven, Ven, Señor no tardes'),
                ofertorio: linkCanto('Saber que vendrás'),
                comunion: linkCanto('Un pueblo que camina'),
                salida: linkCanto('Santa María de la Esperanza')
            };
        } else {
             return {
                entrada: linkCanto('Vienen con alegría Señor'),
                ofertorio: linkCanto('Te Ofrecemos Padre Nuestro'),
                comunion: linkCanto('Pescador de Hombres'),
                salida: linkCanto('Demos Gracias al Señor')
            };
        }
    }

    function generarDocumento(data, hora) {
        let out = "";
        const sacramento = 'Misa Diaria / Dominical';
        const isStandaloneOffice = sacramento === "Solo Liturgia de las Horas";
        const region = document.getElementById('region-select') ? document.getElementById('region-select').value : 'mx';
        const isEn = region === 'us_en';
        
        const lang = isEn ? {
            lecturas: "READINGS OF", primera_lectura: "FIRST READING", salmo: "RESPONSORIAL PSALM",
            evangelio: "GOSPEL", rito_inicial: "INTRODUCTORY RITES", entrada: "Entrance Hymn",
            ant_entrada: "Entrance Antiphon", rito_pen: "Penitential Act", gloria: "Gloria",
            colecta: "Collect", sacerdote: "Priest", asamblea: "Assembly", lit_palabra: "LITURGY OF THE WORD",
            lit_euca: "LITURGY OF THE EUCHARIST", ofertorio: "Offertory Hymn", sobre_ofrendas: "Prayer over the Offerings",
            comunion: "Communion Hymn", despues_comunion: "Prayer after Communion", salida: "Recessional Hymn"
        } : {
            lecturas: "LECTURAS DE", primera_lectura: "Primera Lectura", salmo: "Salmo Responsorial",
            evangelio: "Evangelio", rito_inicial: "RITOS INICIALES", entrada: "Canto de Entrada",
            ant_entrada: "Antífona de Entrada", rito_pen: "Rito Penitencial", gloria: "Gloria",
            colecta: "Oración Colecta", sacerdote: "Sacerdote", asamblea: "Asamblea", lit_palabra: "LITURGIA DE LA PALABRA",
            lit_euca: "LITURGIA EUCARÍSTICA", ofertorio: "Canto de Ofertorio", sobre_ofrendas: "Oración sobre las Ofrendas",
            comunion: "Canto de Comunión", despues_comunion: "Oración después de la Comunión", salida: "Canto de Salida"
        };
        
        // 1. VARIABLES DE ENTRADA Y ESTADO LITÚRGICO (Motor de Decisión)
        const fechaElegida = document.getElementById('date-select') ? document.getElementById('date-select').value : null;
        const calDay = (fechaElegida && window.calendarioDB) ? window.calendarioDB[fechaElegida] : null;

        const DIA_TRIDUO = calDay ? (calDay.dia_triduo || null) : null;
        const TIEMPO_LIT = data.tiempo_liturgico || "Ordinario";
        const GRADO = document.getElementById('grado-liturgico') ? document.getElementById('grado-liturgico').value : (data.grado || (data.dia_semana && data.dia_semana.toLowerCase().includes("domingo") ? "Domingo" : "Feria"));
        const OFICIO = hora ? (hora === "laudes" ? "Laudes" : (hora === "visperas" ? "Visperas" : "Completas")) : null;

        const upperTiempo = TIEMPO_LIT.toUpperCase();
        const isCuaresma = upperTiempo.includes("CUARESMA");
        const isAdviento = upperTiempo.includes("ADVIENTO");
        const ES_PASCUA_PENTECOSTES = upperTiempo.includes("PASCUA") || upperTiempo.includes("PENTECOSTÉS");
        const ES_OCTAVA_PASCUA = upperTiempo.includes("PASCUA") && calDay && calDay.titulo && calDay.titulo.toLowerCase().includes("octava");

        // COMPUERTA DE ABORTO (EXCEPCIONES ABSOLUTAS)
        if (DIA_TRIDUO) {
            if (DIA_TRIDUO === "Jueves_Santo" && OFICIO === "Visperas") {
                return `<div class="missal-block"><p class="missal-heading">Misa de la Cena del Señor.</p><p class="missal-rubric">Unión con Vísperas = Bloqueado.</p></div>`;
            }
            if (DIA_TRIDUO === "Viernes_Santo") {
                return `<div class="missal-block"><p class="missal-heading">Viernes Santo.</p><p class="missal-rubric">Prohibido celebrar Misa. Solo liturgia de la Pasión.</p></div>`;
            }
            if (DIA_TRIDUO === "Sabado_Santo") {
                return `<div class="missal-block"><p class="missal-heading">Sábado Santo.</p><p class="missal-rubric">Prohibido celebrar Misa diurna. Esperar a Vigilia Pascual.</p></div>`;
            }
        }

        // CÁLCULO DE ESTADOS (BANDERAS)
        let aplicaGloria = (GRADO.includes("Solemnidad") || GRADO.includes("Fiesta") || (GRADO.includes("Domingo") && !isAdviento && !isCuaresma));
        if (data.gloria !== undefined) aplicaGloria = data.gloria; // DB Override si es explicitamente fijado (ej. Jueves Santo)

        let Flag_Credo = (GRADO.includes("Domingo") || GRADO.includes("Solemnidad"));
        let Flag_Aleluya = !isCuaresma;
        let Flag_DobleAleluya_Despedida = (ES_PASCUA_PENTECOSTES || ES_OCTAVA_PASCUA);
        let Flag_Oracion_Pueblo = isCuaresma;

        // Options checkboxes
        const chkIntro = true;
        const chkLecto = false;
        const chkEuca = true;

        if (chkLecto) {
            // RENDER LECTURAS GIGANTES
            out += `<div style="font-size: 1.5rem; line-height: 1.8;">`;
            out += `<h2>${lang.lecturas} ${data.tiempo_liturgico.toUpperCase()}</h2>\n`;
            out += `<h3 style="color: #666; font-size:1.1rem; margin-bottom: 30px;">${data.dia_semana} (${data.color})</h3>\n\n`;
            out += `**${lang.primera_lectura} (${data.liturgia_palabra.primera_lectura.cita}):**\n${formatLectura(data.liturgia_palabra.primera_lectura.texto)}\n\n`;
            out += `**${lang.salmo}:**\n> **R.** ${data.liturgia_palabra.salmo_responsorial.respuesta}\n\n`;
            out += `**${lang.evangelio} (${data.liturgia_palabra.evangelio.cita}):**\n${formatLectura(data.liturgia_palabra.evangelio.texto)}\n\n`;
            out += `</div>`;
            return out; // Exit directly, this is a distinct mode
        }

        // Cabecera común regular
        let colorStr = data.color || "Blanco";
        let tiempoStr = data.tiempo_liturgico || (isEn ? "Easter Season" : "Octava de Pascua");
        let dObj = new Date((document.getElementById('date-select')?.value || '2026-04-10') + "T00:00:00");
        let dateStr = dObj.toLocaleDateString(isEn ? 'en-US' : 'es-ES', {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'}).toUpperCase();

        if (isStandaloneOffice) {
            out += `<div style="margin-bottom: 20px; text-align: center; border-bottom: 2px solid #B20000; padding-bottom: 10px;">\n`;
            out += `    <p style="font-family: 'Cinzel', serif; font-size: 1.2rem; margin: 0; color: #B20000;"><strong>${isEn ? 'Liturgy of the Hours' : 'LITURGIA DE LAS HORAS'}: ${hora.toUpperCase()}</strong></p>\n`;
            out += `    <p style="margin: 0; font-weight: bold;">${dateStr}</p>\n`;
            out += `</div>\n\n`;
        } else {
            out += `<div style="margin-bottom: 20px; text-align: center; border-bottom: 2px solid #B20000; padding-bottom: 10px;">\n`;
            out += `    <p style="font-family: 'Cinzel', serif; font-size: 1.2rem; margin: 0; color: #B20000;"><strong>${isEn ? "DAILY MISSAL" : "MISAL DIARIO"}</strong></p>\n`;
            out += `    <p style="margin: 0; font-weight: bold;">${dateStr}</p>\n`;
            out += `    <p style="margin: 0; font-style: italic;">${tiempoStr}</p>\n`;
            out += `    <p style="margin: 0;">Color: ${colorStr}</p>\n`;
            out += `</div>\n\n`;
        }

        const dTitles = document.querySelectorAll('.sec-title');
        const dContents = document.querySelectorAll('.sec-content');
        let hasValidBlocksTop = false;
        let dynamicOutTop = ``;
        let remainingTitles = [];
        let remainingContents = [];

        if (!isStandaloneOffice) {
            for (let i = 0; i < dTitles.length; i++) {
                 if (dTitles[i].value.trim() !== "") {
                     if (dTitles[i].value.toLowerCase().includes("intencion") || dTitles[i].value.toLowerCase().includes("intention")) {
                         hasValidBlocksTop = true;
                         dynamicOutTop += `<div class="missal-block" style="margin-bottom: 24px;">
                                            <p class="missal-heading" style="color: #444; border-bottom: 1px solid #ccc; padding-bottom: 4px;">${dTitles[i].value}</p>
                                            <p class="missal-paragraph" style="text-align:center;">${dContents[i].value.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>
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
        }

        if (isStandaloneOffice) {
            // Render standalone office
            const oficio = data[hora];
            if (!oficio) return `<strong style="color:red">Oficio no disponible.</strong>`;
            if (hora === "completas") {
                out += `**Introducción:**\n**Sacerdote:** ${oficio.introduccion}\n\n`;
                out += `**Examen de Conciencia:**\n**Sacerdote:** ${oficio.examen_conciencia}\n\n`;
                out += `**Himno:**\n> ${oficio.himno.replace(/\n/g, '\n> ')}\n\n`;
                out += `**Salmodia:**\n**Antífona 1:** ${oficio.salmo1.antifona}\n\n> ${oficio.salmo1.texto.replace(/\n/g, '\n> ')}\n\n`;
                out += `**Lectura Breve (${oficio.lectura_breve.cita}):**\n${oficio.lectura_breve.texto}\n\n`;
                out += `**Responsorio Breve:**\n> ${oficio.responsorio_breve.replace(/\n/g, '\n> ')}\n\n`;
                out += `**Cántico Evangélico:**\n**Antífona:** ${oficio.cantico_evangelico.antifona}\n\n> ${oficio.cantico_evangelico.texto.replace(/\n/g, '\n> ')}\n\n`;
                out += `**Oración Final:**\n**Sacerdote:** ${oficio.oracion_final}\n\n`;
                out += `**Antífona Mariana:**\n> ${oficio.antifona_mariana.replace(/\n/g, '\n> ')}\n\n`;
            } else {
                 out += `**Oficio de ${hora} en construcción para uso MVP.**`;
            }
        } else {
                        // Flujo Misa modular
            const cantos = obtenerCantosPorTiempo(data.tiempo_liturgico, isEn);
            let sNum = 1;
            // RITOS INICIALES
            // Variables Sacramentales
            let ritualSelect = document.getElementById("ritual-select") ? document.getElementById("ritual-select").value : "ninguno";
            let nombreBebe = document.getElementById("bautismo-bebe") ? document.getElementById("bautismo-bebe").value : "Juan Pablo";
            let nombrePadrinos = document.getElementById("bautismo-padrinos") ? document.getElementById("bautismo-padrinos").value : "Carlos y Ana";
            let nombreEsposo = document.getElementById("matrimonio-esposo") ? document.getElementById("matrimonio-esposo").value : "Alejandro";
            let nombreEsposa = document.getElementById("matrimonio-esposa") ? document.getElementById("matrimonio-esposa").value : "María";
            let nombreDifunto = document.getElementById("exequias-difunto") ? document.getElementById("exequias-difunto").value : "N.";
            let generoDifunto = document.getElementById("exequias-genero") ? document.getElementById("exequias-genero").value : "m";
            let exequiasTipo = document.getElementById("exequias-tipo") ? document.getElementById("exequias-tipo").value : "adulto";

            // EVALUACIÓN CANÓNICA (Cerebro Magisterial)
            const fechaElegida = document.getElementById('date-select') ? document.getElementById('date-select').value : null;
            if (fechaElegida && window.calendarioDB && window.calendarioDB[fechaElegida]) {
                const diaLogica = window.calendarioDB[fechaElegida];
                if (ritualSelect !== "ninguno") {
                    const prohibicionesEctrictas = ["I.1", "I.2", "I.3", "I.4"]; // Triduo, Solemnidades precepto, Domingos Ad/Cu/Pa
                    if (prohibicionesEctrictas.includes(diaLogica.regla_cem)) {
                        out += `<div style="background-color: #ffcccc; color: #cc0000; padding: 15px; border-left: 5px solid #cc0000; margin-bottom: 20px;">
                                  <strong>⚠️ RESTRICCIÓN CANÓNICA (Regla CEM ${diaLogica.regla_cem})</strong><br>
                                  Las rúbricas de la Iglesia prohíben celebrar Misas Rituales (Bautismo, Matrimonio, Exequias) en Solemnidades y Domingos Privilegiados. Se imprimirá la Misa Ordinaria del día. Las rúbricas del Sacramento deben omitirse o realizarse fuera de Misa.
                                </div>\n\n`;
                        ritualSelect = "ninguno"; // Reversión de seguridad
                    } else if (diaLogica.regla_cem === "II.6" || diaLogica.regla_cem === "II.5") {
                         out += `<div style="background-color: #fff3cd; color: #856404; padding: 15px; border-left: 5px solid #856404; margin-bottom: 20px;">
                                  <strong>⚠️ PRECAUCIÓN CANÓNICA (Regla CEM ${diaLogica.regla_cem})</strong><br>
                                  Aunque se permite el Sacramento hoy, la Misa debe utilizar los textos y color litúrgico propios del Domingo/Fiesta en lugar de los textos Rituales.
                                </div>\n\n`;
                    }
                }
            }
            out += `<div class="missal-block" style="text-align: center; margin: 30px 0;">\n<p class="missal-heading" style="font-size: 1.1em;">${isEn ? "INTRODUCTORY RITES" : "RITOS INICIALES"}</p>\n<p class="missal-rubric" style="font-weight:bold;">${region==="mx" ? "" : (isEn ? "(Stand)" : "(De pie)")}</p>\n</div>\n\n`;
            
            const showMoniciones = document.getElementById("toggle-moniciones") ? document.getElementById("toggle-moniciones").checked : true;
            if (showMoniciones && data.monicion_entrada && !isEn) {
                out += `<div class="missal-block"><p class="missal-monicion" style="font-style:italic; color:#555; margin-bottom:10px;">${data.monicion_entrada}</p></div>\n`;
            }
            
            out += `<div class="missal-block">\n<p class="missal-heading">${isEn ? "Entrance Chant" : "Canto de Entrada"}</p>\n<p class="missal-citation">${cantos.entrada}</p>\n</div>\n\n`;
            
            let antEnt = data.antifona_entrada || (isEn ? "Come, you whom my Father has blessed, receive the kingdom prepared for you." : "Vengan, benditos de mi Padre, reciban en herencia el reino preparado para ustedes desde la creación del mundo.");
            out += `<div class="missal-block">\n<p class="missal-heading">${isEn ? "Entrance Antiphon" : "Antífona de Entrada"}</p>\n<p class="missal-paragraph" style="text-align:justify;">${antEnt}</p>\n</div>\n\n`;
            
            out += `<div class="missal-block">\n<p class="missal-heading">${isEn ? "Greeting" : "Saludo Inicial"}</p>\n<p class="missal-rubric"><strong class="rubric">Sacerdote:</strong> ${isEn ? "In the name of the Father, and of the Son, and of the Holy Spirit." : "En el nombre del Padre, y del Hijo, y del Espíritu Santo."}<br><strong class="rubric">Asamblea:</strong> ${isEn ? "Amen." : "Amén."}<br><br><strong class="rubric">Sacerdote:</strong> ${isEn ? "The grace of our Lord Jesus Christ, and the love of God, and the communion of the Holy Spirit be with you all." : "La gracia de nuestro Señor Jesucristo, el amor del Padre, y la comunión del Espíritu Santo estén con todos ustedes."}<br><strong class="rubric">Asamblea:</strong> ${isEn ? "And with your spirit." : "Y con tu espíritu."}</p>\n</div>\n\n`;
            
            if (ritualSelect === "bautismo" && window.ritualBautismoData && !isEn) {
                let rb = window.ritualBautismoData.acogida;
                let acogidaText = `<p class="missal-heading">RITO DE ACOGIDA SACRAMENTAL</p><p class="missal-rubric">(Sustituye al Rito Penitencial)</p><br>` +
                                  `${rb.dialogo_inicial.replace(/{bebe}/g, nombreBebe).replace(/\n/g, '<br>')}<br><br>` +
                                  `${rb.exhortacion_padres.replace(/\n/g, '<br>')}<br><br>` +
                                  `${rb.exhortacion_padrinos.replace(/{padrinos}/g, nombrePadrinos).replace(/\n/g, '<br>')}<br><br>` +
                                  `${rb.signacion.replace(/{bebe}/g, nombreBebe).replace(/\n/g, '<br>')}`;
                out += `<div class="missal-block">\n<div class="missal-paragraph" style="text-align:justify;">\n${acogidaText}\n</div>\n</div>\n\n`;
            } else if (ritualSelect === "matrimonio" && window.ritualMatrimonioData && !isEn) {
                let rm = window.ritualMatrimonioData.acogida;
                let acogidaText = `<p class="missal-heading">RITO DE ACOGIDA DE LOS NOVIOS</p><p class="missal-rubric">(Sustituye al Rito Penitencial)</p><br>` +
                                  `${rm.dialogo.replace(/{esposo}/g, nombreEsposo).replace(/{esposa}/g, nombreEsposa).replace(/\n/g, '<br>')}`;
                out += `<div class="missal-block">\n<div class="missal-paragraph" style="text-align:justify;">\n${acogidaText}\n</div>\n</div>\n\n`;
            } else if (ritualSelect === "exequias" && window.ritualExequiasData && !isEn) {
                let re = window.ritualExequiasData[exequiasTipo].recepcion;
                let acogidaText = `<p class="missal-heading">RITO DE RECEPCIÓN DEL CUERPO</p><p class="missal-rubric">(Sustituye al Rito Penitencial y Canto de Entrada si aplica)</p><br>` +
                                  `${re.saludo.replace(/\n/g, '<br>')}<br><br>` +
                                  `${re.aspersion.replace(/{difunto}/g, nombreDifunto).replace(/\n/g, '<br>')}<br><br>` +
                                  `${re.cubrir_pano.replace(/{difunto}/g, nombreDifunto).replace(/\n/g, '<br>')}`;
                out += `<div class="missal-block">\n<div class="missal-paragraph" style="text-align:justify;">\n${acogidaText}\n</div>\n</div>\n\n`;
            } else if (data.tiempo_liturgico && data.tiempo_liturgico.toLowerCase().includes("pascua") && data.dia_semana && data.dia_semana.toLowerCase().includes("domingo")) {
                let pt = isEn ? "Priest:" : "Sacerdote:";
                let aspText = isEn 
                    ? "Dear brethren (brothers and sisters), let us humbly beseech the Lord our God to bless this water he has created, which will be sprinkled on us as a memorial of our Baptism. May he help us by his grace to remain faithful to the Spirit we have received."
                    : "Queridos hermanos, invoquemos a Dios nuestro Señor para que se digne bendecir esta agua, criatura suya, con la cual vamos a ser rociados en memoria de nuestro bautismo. Que él mismo nos ayude para que permanezcamos fieles al Espíritu que hemos recibido.";
                let orText = isEn
                    ? "Almighty ever-living God, who willed that through water, the fountain of life and the source of purification, even souls should be cleansed and receive the gift of eternal life; be pleased, we pray, to bless this water..."
                    : "Señor, Dios todopoderoso, escucha las oraciones de tu pueblo, ahora que recordamos la obra maravillosa de nuestra creación y la maravilla, aún más grande, de nuestra redención; dígnate bendecir esta agua...";
                out += `<div class="missal-block">\n<p class="missal-heading">${isEn ? "Rite of Blessing and Sprinkling of Water" : "Rito para la Bendición y Aspersión del Agua"}</p>\n<p class="missal-rubric">${isEn ? "(Replaces the Penitential Act)" : "(Sustituye al acto penitencial)"}</p>\n<p class="missal-paragraph" style="text-align:justify;"><strong class="rubric">${pt}</strong> ${aspText}</p><br>\n<p class="missal-paragraph" style="text-align:justify;">${orText}</p>\n<p class="missal-rubric">R. ${isEn ? "Amen" : "Amén"}.</p>\n</div>\n\n`;
            } else if (!hora) {
                let pt = isEn ? "Priest:" : "Sacerdote:";
                let asN = isEn ? "People:" : "Asamblea:";
                let diag1 = isEn ? "Brethren (brothers and sisters), let us acknowledge our sins..." : "Hermanos: reconozcamos nuestros pecados para celebrar dignamente estos sagrados misterios.";
                let rpe = data.rito_penitencial || (isEn ? "I confess to almighty God..." : "Yo confieso ante Dios todopoderoso y ante ustedes, hermanos, que he pecado mucho de pensamiento, palabra, obra y omisión. Por mi culpa, por mi culpa, por mi gran culpa. Por eso ruego a santa María, siempre Virgen, a los ángeles, a los santos y a ustedes, hermanos, que intercedan por mí ante Dios, nuestro Señor.");
                let diag2 = isEn ? "May almighty God have mercy on us..." : "Dios todopoderoso tenga misericordia de nosotros, perdone nuestros pecados y nos lleve a la vida eterna.";
                let respAmen = isEn ? "Amen." : "Amén.";
                let textBlock = `<strong class="rubric">${pt}</strong> ${diag1}<br><br><strong class="rubric">${asN}</strong> ${rpe}<br><br><strong class="rubric">${pt}</strong> ${diag2}<br><strong class="rubric">${asN}</strong> ${respAmen}<br><br><strong class="rubric">${pt}</strong> ${isEn ? "Lord, have mercy." : "Señor, ten piedad."}<br><strong class="rubric">${asN}</strong> ${isEn ? "Lord, have mercy." : "Señor, ten piedad."}<br><strong class="rubric">${pt}</strong> ${isEn ? "Christ, have mercy." : "Cristo, ten piedad."}<br><strong class="rubric">${asN}</strong> ${isEn ? "Christ, have mercy." : "Cristo, ten piedad."}<br><strong class="rubric">${pt}</strong> ${isEn ? "Lord, have mercy." : "Señor, ten piedad."}<br><strong class="rubric">${asN}</strong> ${isEn ? "Lord, have mercy." : "Señor, ten piedad."}`;
                out += `<div class="missal-block">\n<p class="missal-heading">${isEn ? "Penitential Act" : "Rito Penitencial"}</p>\n<p class="missal-paragraph" style="text-align:justify;">${textBlock}</p>\n</div>\n\n`;
            }
            
            // SALMODIA INTEGRADA
            if (hora === "laudes" || hora === "visperas") {
                out += `-----\n\n<div class="missal-block" style="text-align: center; margin: 30px 0;">\n<p class="missal-heading" style="font-size: 1.1em;">${isEn ? "INTEGRATED PSALMODY" : "SALMODIA INTEGRADA"} (${hora.toUpperCase()})</p>\n</div>\n\n`;
                const salmodia = data[hora];
                if (salmodia) {
                    if (salmodia.salmo1) {
                         out += `<div class="missal-block">\n<p class="missal-heading">${isEn ? "First Psalm" : "Primer Salmo"}</p>\n<p class="missal-rubric">Antífona: ${salmodia.salmo1.antifona}</p>\n`;
                         let salmoP = salmodia.salmo1.texto.split("\n\n");
                         let textP = "";
                         salmoP.forEach((estrofa, index) => {
                             let l = index % 2 === 0 ? "Lector 1" : "Lector 2";
                             textP += `<strong class="rubric">${l}:</strong><br>${estrofa}<br><br>`;
                         });
                         out += `<p class="missal-paragraph" style="margin-left: 20px;">${textP}</p>\n`;
                         out += `<p class="missal-paragraph" style="margin-left: 20px;"><strong class="rubric">${isEn ? "People:" : "Asamblea:"}</strong><br>${isEn ? "Glory to the Father, and to the Son, and to the Holy Spirit..." : "Gloria al Padre, y al Hijo, y al Espíritu Santo..."}</p>\n`;
                         out += `<p class="missal-rubric" style="margin-top: 10px;">Antífona: ${salmodia.salmo1.antifona}</p>\n</div>\n\n`;
                    }
                    if (salmodia.cantico_at || salmodia.salmo2) {
                         let s2 = salmodia.cantico_at || salmodia.salmo2;
                         let nt = salmodia.cantico_at ? (isEn ? "OT Canticle" : "Cántico AT") : (isEn ? "Second Psalm" : "Segundo Salmo");
                         out += `<div class="missal-block">\n<p class="missal-heading">${nt}</p>\n<p class="missal-rubric">Antífona: ${s2.antifona}</p>\n`;
                         let salmoP = s2.texto.split("\n\n");
                         let textP = "";
                         salmoP.forEach((estrofa, index) => {
                             let l = index % 2 === 0 ? "Lector 1" : "Lector 2";
                             textP += `<strong class="rubric">${l}:</strong><br>${estrofa}<br><br>`;
                         });
                         out += `<p class="missal-paragraph" style="margin-left: 20px;">${textP}</p>\n`;
                         if(!salmodia.cantico_at) {
                             out += `<p class="missal-paragraph" style="margin-left: 20px;"><strong class="rubric">${isEn ? "People:" : "Asamblea:"}</strong><br>${isEn ? "Glory to the Father..." : "Gloria al Padre..."}</p>\n`;
                         }
                         out += `<p class="missal-rubric" style="margin-top: 10px;">Antífona: ${s2.antifona}</p>\n</div>\n\n`;
                    }
                    if (salmodia.salmo2 && salmodia.cantico_nt) { // Visperas
                         let s3 = salmodia.cantico_nt;
                         out += `<div class="missal-block">\n<p class="missal-heading">${isEn ? "NT Canticle" : "Cántico NT"}</p>\n<p class="missal-rubric">Antífona: ${s3.antifona}</p>\n`;
                         if (s3.texto && s3.texto.trim() !== "") {
                             let textP = "";
                             s3.texto.split("\n\n").forEach((estrofa, index) => {
                                 let l = index % 2 === 0 ? "Lector 1" : "Lector 2";
                                 textP += `<strong class="rubric">${l}:</strong><br>${estrofa}<br><br>`;
                             });
                             out += `<p class="missal-paragraph" style="margin-left: 20px;">${textP}</p>\n`;
                         } else {
                             out += `<p class="missal-rubric" style="margin-top:10px;">>[!WARNING]<br>${isEn ? "Canticle text missing in database." : "Texto del cántico no ingresado en la base de datos."}</p>\n`;
                         }
                         out += `<p class="missal-paragraph" style="margin-left: 20px;"><strong class="rubric">${isEn ? "People:" : "Asamblea:"}</strong><br>${isEn ? "Glory to the Father..." : "Gloria al Padre..."}</p>\n`;
                         out += `<p class="missal-rubric" style="margin-top: 10px;">Antífona: ${s3.antifona}</p>\n</div>\n\n`;
                    }
                } else {
                    out += `<div class="missal-block"><p class="missal-rubric">>[!WARNING]<br>${isEn ? "The Liturgy of the Hours texts for this date have not been entered into the database (liturgia_db.js)." : "Los textos de la Liturgia de las Horas para esta fecha aún no han sido ingresados en la base de datos (liturgia_db.js)."}</p></div>\n\n`;
                }
            }
            
            // CONCLUSION DE RITOS INICIALES
            out += `<div class="missal-block" style="text-align: center; margin: 30px 0;">\n<p class="missal-heading" style="font-size: 1.1em;">${isEn ? "CONCLUSION OF INTRODUCTORY RITES" : "CONCLUSIÓN DE RITOS INICIALES"}</p>\n</div>\n\n`;
            if (aplicaGloria) {
                let gloriaEs = "Gloria a Dios en el cielo,<br>y en la tierra paz a los hombres que ama el Señor.<br>Por tu inmensa gloria te alabamos,<br>te bendecimos, te adoramos,<br>te glorificamos, te damos gracias,<br>Señor Dios, Rey celestial,<br>Dios Padre todopoderoso.<br><br>Señor, Hijo único, Jesucristo.<br>Señor Dios, Cordero de Dios, Hijo del Padre;<br>tú que quitas el pecado del mundo,<br>ten piedad de nosotros;<br>tú que quitas el pecado del mundo,<br>atiende nuestra súplica;<br>tú que estás sentado a la derecha del Padre,<br>ten piedad de nosotros;<br><br>porque sólo tú eres Santo, sólo tú Señor,<br>sólo tú Altísimo, Jesucristo,<br>con el Espíritu Santo en la gloria de Dios Padre.<br>Amén.";
                let gloriaEn = "Glory to God in the highest,<br>and on earth peace to people of good will.<br>We praise you,<br>we bless you,<br>we adore you,<br>we glorify you,<br>we give you thanks for your great glory,<br>Lord God, heavenly King,<br>O God, almighty Father.<br><br>Lord Jesus Christ, Only Begotten Son,<br>Lord God, Lamb of God, Son of the Father,<br>you take away the sins of the world,<br>have mercy on us;<br>you take away the sins of the world,<br>receive our prayer;<br>you are seated at the right hand of the Father,<br>have mercy on us.<br><br>For you alone are the Holy One,<br>you alone are the Lord,<br>you alone are the Most High,<br>Jesus Christ,<br>with the Holy Spirit,<br>in the glory of God the Father.<br>Amen.";
                out += `<div class="missal-block"><p class="missal-heading">Gloria</p><p class="missal-paragraph" style="text-align:center;">${isEn ? gloriaEn : gloriaEs}</p></div>\n\n`;
            } else {
                out += `<div class="missal-block"><p class="missal-heading">Gloria</p><p class="missal-rubric">${isEn ? "[The Gloria is omitted today]" : "[Hoy se omite el Gloria]"}</p></div>\n\n`;
            }
            
            let colecta = data.oracion_colecta || (isEn ? "Almighty ever-living God..." : "Dios todopoderoso y eterno, aumenta en nosotros la fe, la esperanza y la caridad...");
            out += `<div class="missal-block"><p class="missal-heading">${isEn ? "Collect" : "Oración Colecta"}</p><p class="missal-paragraph"><strong class="rubric">${isEn ? "Priest:" : "Sacerdote:"}</strong> ${isEn ? "Let us pray." : "Oremos."} ${colecta}</p><p class="missal-rubric">R. ${isEn ? "Amen." : "Amén."}</p></div>\n\n`;
            
            // LITURGIA DE LA PALABRA
            out += `<div class="missal-block" style="text-align: center; margin: 30px 0;">\n<p class="missal-heading" style="font-size: 1.1em;">${isEn ? "LITURGY OF THE WORD" : "LITURGIA DE LA PALABRA"}</p>\n<p class="missal-rubric" style="text-align:center; font-weight:bold; margin-top:12px;">${region==="mx" ? "" : (isEn ? "(Sit)" : "(Sentados)")}</p>\n</div>\n\n`;
            let lp = data.liturgia_palabra || {};
            let r1 = lp.primera_lectura || { cita: isEn ? "First Reading" : "Primera Lectura", texto: isEn ? "[Reading not available]" : "[Lectura no disponible]" };
            out += `<div class="missal-block">`;
            if (r1.monicion && !isEn) {
                out += `<p class="missal-monicion" style="font-style:italic; color:#555; margin-bottom:10px;">${r1.monicion}</p>\n`;
            }
            out += `<div style="display: flex; justify-content: space-between; align-items: baseline;">\n`;
            
            let versiculos_r1 = isEn ? r1.cita_en : (r1.cita_versiculos || r1.cita);
            let formula_r1 = isEn ? r1.cita_en : (r1.cita_formula || r1.cita);
            
            if(r1.cita_versiculos && r1.cita_formula) {
                out += `<p class="missal-heading" style="margin:0;">${isEn ? "First Reading" : "Primera Lectura"}</p>\n`;
                out += `<p class="missal-rubric" style="margin:0; font-weight:bold;">${versiculos_r1}</p>\n</div>\n`;
                out += `<p class="missal-citation" style="font-weight:bold; margin-top:4px;">${formula_r1}</p>\n`;
            } else {
                out += `<p class="missal-heading" style="margin:0;">${isEn ? "First Reading" : "Primera Lectura"}</p>\n`;
                out += `</div>\n<p class="missal-citation" style="font-weight:bold; margin-top:4px;">${isEn ? "From:" : ""} ${formula_r1}</p>\n`;
            }
            let r1Texto = isEn ? (r1.texto_en || "[English translation pending ingestion]") : r1.texto;
            out += `${formatLectura(r1Texto)}\n`;
            out += `<p class="missal-rubric" style="margin-top:10px;">${isEn ? "The word of the Lord." : "Palabra de Dios."}</p>\n<p class="missal-rubric">R. ${isEn ? "Thanks be to God." : "Te alabamos, Señor."}</p>\n</div>\n\n`;
            
            let sr = lp.salmo_responsorial || { cita: isEn ? "Psalm" : "Salmo", respuesta: isEn ? "The Lord is my shepherd." : "El Señor es mi pastor.", texto: isEn ? "The Lord is my shepherd, there is nothing I shall want." : "El Señor es mi pastor, nada me falta." };
            out += `<div class="missal-block">`;
            out += `<div style="display: flex; justify-content: space-between; align-items: baseline;">\n`;
            out += `<p class="missal-heading" style="margin:0;">${isEn ? "Responsorial Psalm" : "Salmo Responsorial"}</p>\n`;
            out += `<p class="missal-rubric" style="margin:0; font-weight:bold;">${isEn ? (sr.cita_en || sr.cita) : sr.cita}</p>\n</div>\n`;
            let srResp = isEn ? (sr.respuesta_en || "[Pending]") : sr.respuesta;
            out += `<p class="missal-paragraph" style="font-weight:bold; margin-bottom:8px;">R. ${srResp}</p>\n`;
            let srTxt = isEn ? (sr.texto_en || "[English translation pending ingestion]") : sr.texto;
            srTxt.split("\n\n").forEach(estrofa => {
                let cl = estrofa.trim().replace(/\n/g, '<br>');
                if(cl.length > 0) out += `<p class="missal-paragraph" style="margin-bottom:8px;">${cl}</p><p class="missal-rubric" style="margin-bottom:12px;">R. ${srResp}</p>\n`;
            });
            out += `</div>\n\n`;
            
            if (lp.segunda_lectura) {
                let r2 = lp.segunda_lectura;
                out += `<div class="missal-block">`;
                if (r2.monicion) {
                    out += `<p class="missal-monicion" style="font-style:italic; color:#555; margin-bottom:10px;">${r2.monicion}</p>\n`;
                }
                out += `<div style="display: flex; justify-content: space-between; align-items: baseline;">\n`;
                
                let versiculos_r2 = isEn ? r2.cita_en : (r2.cita_versiculos || r2.cita);
                let formula_r2 = isEn ? r2.cita_en : (r2.cita_formula || r2.cita);
                
                if(r2.cita_versiculos && r2.cita_formula) {
                    out += `<p class="missal-heading" style="margin:0;">${isEn ? "Second Reading" : "Segunda Lectura"}</p>\n`;
                    out += `<p class="missal-rubric" style="margin:0; font-weight:bold;">${versiculos_r2}</p>\n</div>\n`;
                    out += `<p class="missal-citation" style="font-weight:bold; margin-top:4px;">${formula_r2}</p>\n`;
                } else {
                    out += `<p class="missal-heading" style="margin:0;">${isEn ? "Second Reading" : "Segunda Lectura"}</p>\n`;
                    out += `</div>\n<p class="missal-citation" style="font-weight:bold; margin-top:4px;">${formula_r2}</p>\n`;
                }
                let r2Texto = isEn ? (lp.segunda_lectura.texto_en || "[English translation pending ingestion]") : lp.segunda_lectura.texto;
                out += `${formatLectura(r2Texto)}\n`;
                out += `<p class="missal-rubric" style="margin-top:10px;">${isEn ? "The word of the Lord." : "Palabra de Dios."}</p>\n<p class="missal-rubric">R. ${isEn ? "Thanks be to God." : "Te alabamos, Señor."}</p>\n</div>\n\n`;
            }
            
            if (lp.secuencia) {
                out += `<div class="missal-block">`;
                out += `<p class="missal-heading">${isEn ? "Sequence" : "Secuencia"}</p>\n`;
                out += `<p class="missal-citation">${isEn ? "Optional" : "Opcional"}</p>\n`;
                let secTexto = isEn ? (lp.secuencia_en || "[English translation pending ingestion]") : lp.secuencia;
                out += `${formatLectura(secTexto)}\n`;
                out += `</div>\n\n`;
            }
            
            let aclv = lp.aclamacion_evangelio || (isEn ? "Alleluia, alleluia." : "Aleluya, aleluya.");
            if (!Flag_Aleluya) {
                if (!lp.aclamacion_evangelio || aclv.toUpperCase().includes("ALELUYA") || aclv.toUpperCase().includes("ALLELUIA")) {
                    aclv = aclv.replace(/Aleluya/ig, "Honor y gloria a ti, Señor Jesús").replace(/Alleluia/ig, "Praise to you, Lord Jesus Christ");
                }
            }
            out += `<div class="missal-block">`;
            out += `<p class="missal-rubric" style="font-weight:bold; margin-bottom:4px;">${region==="mx" ? "" : (isEn ? "(Stand)" : "(De pie)")}</p>\n`;
            out += `<p class="missal-heading">${isEn ? "Gospel Acclamation" : "Aclamación antes del Evangelio"}</p>\n`;
            out += `<p class="missal-paragraph" style="font-weight:bold;">${aclv.replace(/\n/g, '<br>')}</p>\n`;
            out += `</div>\n\n`;
            
            let ev = lp.evangelio || { cita: isEn ? "Gospel" : "Evangelio", texto: isEn ? "[Gospel not available]" : "[Evangelio no disponible]" };
            out += `<div class="missal-block">`;
            if (ev.monicion && !isEn) {
                out += `<p class="missal-monicion" style="font-style:italic; color:#555; margin-bottom:10px;">${ev.monicion}</p>\n`;
            }
            out += `<div style="display: flex; justify-content: space-between; align-items: baseline;">\n`;
            
            let versiculos_ev = isEn ? ev.cita_en : (ev.cita_versiculos || ev.cita);
            let formula_ev = isEn ? ev.cita_en : (ev.cita_formula || ev.cita);
            
            if(ev.cita_versiculos && ev.cita_formula) {
                out += `<p class="missal-heading" style="margin:0;">${isEn ? "Gospel" : "Evangelio"}</p>\n`;
                out += `<p class="missal-rubric" style="margin:0; font-weight:bold;">${versiculos_ev}</p>\n</div>\n`;
                out += `<p class="missal-citation" style="font-weight:bold; margin-top:4px;"><span class="cross-mark">☩</span> ${formula_ev}</p>\n`;
            } else {
                out += `<p class="missal-heading" style="margin:0;">${isEn ? "Gospel" : "Evangelio"}</p>\n`;
                out += `</div>\n<p class="missal-citation" style="font-weight:bold; margin-top:4px;"><span class="cross-mark">☩</span> ${formula_ev}</p>\n`;
            }
            let evTexto = isEn ? (ev.texto_en || "[English translation pending ingestion]") : ev.texto;
            out += `${formatLectura(evTexto)}\n`;
            out += `<p class="missal-rubric" style="margin-top:10px;">${isEn ? "The Gospel of the Lord." : "Palabra del Señor."}</p>\n<p class="missal-rubric">R. ${isEn ? "Praise to you, Lord Jesus Christ." : "Gloria a ti, Señor Jesús."}</p>\n</div>\n\n`;
            
            out += `<div class="missal-block"><p class="missal-rubric" style="font-weight:bold; margin-bottom:4px;">${region==="mx" ? "" : (isEn ? "(Sit)" : "(Sentados)")}</p><p class="missal-heading">${isEn ? "Homily" : "Homilía"}</p><p class="missal-rubric">${isEn ? "The priest gives the homily." : "El sacerdote pronuncia la homilía."}</p></div>\n\n`;
            
            const showHomilia = document.getElementById("toggle-homilia") ? document.getElementById("toggle-homilia").checked : true;
            if (showHomilia && data.reflexion_homiletica && !isEn) {
                let refText = Array.isArray(data.reflexion_homiletica) ? data.reflexion_homiletica.join("<br><br>") : data.reflexion_homiletica.replace(/\n\n/g, '<br><br>');
                out += `<div class="missal-block">\n`;
                out += `<p class="missal-heading" style="font-size: 11pt; color:#444;">Subsidio Homilético</p>\n`;
                out += `<div class="missal-paragraph" style="font-style:italic; font-size:10pt;">${refText}</div>\n`;
                out += `</div>\n\n`;
            }
            
            if (ritualSelect === "bautismo" && window.ritualBautismoData && !isEn) {
                let rb = window.ritualBautismoData;
                let ls = rb.liturgia_sacramento;
                let re = rb.ritos_explicativos;
                
                out += `<div class="missal-block">\n`;
                out += `<p class="missal-heading" style="text-align:center; font-size: 14pt; color:#B20000; font-family:'EB Garamond', serif;">LITURGIA DEL SACRAMENTO BAUTISMAL</p>\n`;
                out += `<div class="missal-paragraph">\n`;
                out += `**I. Letanías**\n${ls.letanias}\n\n`;
                out += `**II. Oración de Exorcismo y Unción**\n${ls.exorcismo_y_uncion.replace(/{bebe}/g, nombreBebe)}\n\n`;
                out += `**III. Bendición del Agua**\n${ls.bendicion_agua}\n\n`;
                out += `**IV. Renuncias**\n${ls.renuncias}\n\n`;
                out += `**V. Profesión de Fe**\n${ls.profesion_fe}\n\n`;
                out += `**VI. Bautismo**\n${ls.bautismo.replace(/{bebe}/g, nombreBebe)}\n\n`;
                out += `</div></div>\n\n`;
                
                out += `<div class="missal-block">\n`;
                out += `<p class="missal-heading">Ritos Explicativos</p>\n`;
                out += `<div class="missal-paragraph">\n`;
                out += `**Unción con el Santo Crisma:**\n${re.uncion_crisma}\n\n`;
                out += `**Vestidura Blanca:**\n${re.vestidura_blanca.replace(/{bebe}/g, nombreBebe)}\n\n`;
                out += `**Entrega del Cirio:**\n${re.cirio.replace(/{bebe}/g, nombreBebe)}\n\n`;
                out += `</div></div>\n\n`;
            } else if (ritualSelect === "matrimonio" && window.ritualMatrimonioData && !isEn) {
                let rm = window.ritualMatrimonioData.liturgia_sacramento;
                out += `<div class="missal-block">\n`;
                out += `<p class="missal-heading" style="text-align:center; font-size: 14pt; color:#B20000; font-family:'EB Garamond', serif;">LITURGIA DEL SACRAMENTO MATRIMONIAL</p>\n`;
                out += `<div class="missal-paragraph">\n`;
                out += `**Monición:**\n${rm.monicion.replace(/{esposo}/g, nombreEsposo).replace(/{esposa}/g, nombreEsposa)}\n\n`;
                out += `**Escrutinio:**\n${rm.escrutinio.replace(/{esposo}/g, nombreEsposo).replace(/{esposa}/g, nombreEsposa)}\n\n`;
                out += `**Consentimiento / Votos:**\n${rm.consentimiento.replace(/{esposo}/g, nombreEsposo).replace(/{esposa}/g, nombreEsposa)}\n\n`;
                out += `**Confirmación del Consentimiento:**\n${rm.confirmacion_consentimiento}\n\n`;
                out += `**Bendición y Entrega de Anillos:**\n${rm.bendicion_anillos.replace(/{esposo}/g, nombreEsposo).replace(/{esposa}/g, nombreEsposa)}\n\n`;
                out += `**Entrega de Arras:**\n${rm.entrega_arras.replace(/{esposo}/g, nombreEsposo).replace(/{esposa}/g, nombreEsposa)}\n\n`;
                if (rm.velacion) {
                    out += `**Rito de Velación (y Lazo):**\n${rm.velacion}\n\n`;
                }
                out += `</div></div>\n\n`;
            } else if (ritualSelect === "exequias" && window.ritualExequiasData && !isEn) {
                // Credo omitido
            } else {
                const showCredo = document.getElementById("toggle-credo") ? document.getElementById("toggle-credo").checked : false;
                if (showCredo || Flag_Credo) {
                    let credoEs = "Creo en Dios, Padre todopoderoso,<br>Creador del cielo y de la tierra.<br>Creo en Jesucristo, su único Hijo, nuestro Señor,<br>que fue concebido por obra y gracia del Espíritu Santo,<br>nació de santa María Virgen,<br>padeció bajo el poder de Poncio Pilato,<br>fue crucificado, muerto y sepultado,<br>descendió a los infiernos,<br>al tercer día resucitó de entre los muertos,<br>subió a los cielos<br>y está sentado a la derecha de Dios, Padre todopoderoso.<br>Desde allí ha de venir a juzgar a vivos y muertos.<br><br>Creo en el Espíritu Santo,<br>la santa Iglesia católica,<br>la comunión de los santos,<br>el perdón de los pecados,<br>la resurrección de la carne<br>y la vida eterna. Amén.";
                    let credoEn = "I believe in God, the Father almighty,<br>Creator of heaven and earth,<br>and in Jesus Christ, his only Son, our Lord,<br>who was conceived by the Holy Spirit,<br>born of the Virgin Mary,<br>suffered under Pontius Pilate,<br>was crucified, died and was buried;<br>he descended into hell;<br>on the third day he rose again from the dead;<br>he ascended into heaven,<br>and is seated at the right hand of God the Father almighty;<br>from there he will come to judge the living and the dead.<br><br>I believe in the Holy Spirit,<br>the holy catholic Church,<br>the communion of saints,<br>the forgiveness of sins,<br>the resurrection of the body,<br>and life everlasting. Amen.";
                    
                    out += `<div class="missal-block"><p class="missal-rubric" style="font-weight:bold; margin-bottom:4px;">${region==="mx" ? "" : (isEn ? "(Stand)" : "(De pie)")}</p><p class="missal-heading">${isEn ? "Profession of Faith" : "Profesión de Fe"}</p><p class="missal-paragraph" style="text-align:center;">${isEn ? credoEn : credoEs}</p></div>\n\n`;
                }
            }
            
                        const showFieles = document.getElementById("toggle-fieles") ? document.getElementById("toggle-fieles").checked : true;
            if (showFieles && data.oracion_fieles && !isEn) {
                out += `<div class="missal-block">
`;
                out += `<p class="missal-heading" style="padding-top:10px;">Oración Universal (Peticiones)</p>
`;
                out += `**Sacerdote:** Oremos, hermanos, a Dios nuestro Padre, pidiendo por nuestras necesidades y las del mundo entero. Respondemos: **Te rogamos, óyenos.**

`;
                let peticiones = Array.isArray(data.oracion_fieles) ? data.oracion_fieles : data.oracion_fieles.split("\\n");
                peticiones.forEach(p => {
                    let text = p.replace(/^-/g, '').trim();
                    if(text.length > 5) out += `**Lector:** ${text}

`;
                });
                out += `**Sacerdote:** Escucha, Padre bondadoso, las súplicas que tu pueblo creyente te presenta con fe. Por Jesucristo, nuestro Señor. Amén.
`;
                out += `</div>

`;
            }
            let precesOficio = "";
            if (hora === "laudes" && data.laudes) precesOficio = data.laudes.preces;
            if (hora === "visperas" && data.visperas) precesOficio = data.visperas.preces;
            let preces = lp.preces || precesOficio || (isEn ? "Hear us, O Lord, and grant your Church peace and unity." : "Te pedimos, Señor, escucha nuestra oración, y concede a tu Iglesia la paz y la unidad que te suplica.");
            
            // Format Preces intelligently into bullets if multiple paragraphs
            let precesFormatted = preces.split(/\n+/).filter(p => p.trim() !== '').map(p => `• ${p.trim()}`).join('<br><br>');
            if(precesFormatted.length < 5) precesFormatted = preces.replace(/\n/g, '<br>');
            
            out += `<div class="missal-block"><p class="missal-rubric" style="font-weight:bold; margin-bottom:4px;">${region==="mx" ? "" : (isEn ? "(Stand)" : "(De pie)")}</p><p class="missal-heading">${isEn ? "Universal Prayer" : "Oración de los Fieles"}</p><p class="missal-rubric">${isEn ? "Let us pray to God the Father:" : "A Dios Padre, dirijamos nuestra súplica:"}</p><p class="missal-rubric">R. ${isEn ? "We pray you, hear us." : "Te rogamos, óyenos."}</p><div class="missal-paragraph" style="margin-top:10px; margin-bottom:15px; margin-left:15px; text-align:justify;">${precesFormatted}</div><p class="missal-rubric"><strong class="rubric">${isEn ? "Priest:" : "Sacerdote:"}</strong> ${isEn ? "Hear our prayers, O Father, through Christ our Lord. Amen" : "Escucha, Padre bondadoso, las súplicas que tu pueblo creyente te presenta con fe. Por Jesucristo, nuestro Señor. Amén"}.</p></div>\n\n`;
            
            // LITURGIA EUCARISTICA
            out += `<div class="missal-block" style="text-align: center; margin: 30px 0;">\n<p class="missal-heading" style="font-size: 1.1em;">${isEn ? "LITURGY OF THE EUCHARIST" : "LITURGIA EUCARÍSTICA"}</p>\n<p class="missal-rubric" style="text-align:center; font-weight:bold; margin-top:12px;">${region==="mx" ? "" : (isEn ? "(Sit)" : "(Sentados)")}</p>\n</div>\n\n`;
            out += `<div class="missal-block"><p class="missal-heading">${isEn ? "Offertory Chant" : "Canto de Ofertorio"}</p><p class="missal-citation">${cantos.ofertorio}</p></div>\n\n`;
            
            let le = data.liturgia_eucaristica || {};
            let ofrendas = le.oracion_ofrendas || (isEn ? "Receive, O Lord, the offerings of your people..." : "Recibe, Señor, las ofrendas de tu pueblo, y concédenos que este sacrificio nos alcance la gracia que te pedimos. Por Jesucristo nuestro Señor.");
            out += `<div class="missal-block"><p class="missal-rubric" style="font-weight:bold; margin-bottom:4px;">${region==="mx" ? "" : (isEn ? "(Stand)" : "(De pie)")}</p><p class="missal-heading">${isEn ? "Prayer over the Offerings" : "Oración sobre las Ofrendas"}</p><p class="missal-paragraph"><strong class="rubric">${isEn ? "Priest:" : "Sacerdote:"}</strong> ${ofrendas}</p><p class="missal-rubric">R. ${isEn ? "Amen." : "Amén."}</p></div>\n\n`;
            
            // ORDINARY OF THE MASS (EUCHARISTIC PRAYER)
            out += `<div class="missal-block"><p class="missal-heading">${isEn ? "Preface Dialogue" : "Diálogo del Prefacio"}</p>`;
            out += `<p class="missal-rubric">V. ${isEn ? "The Lord be with you." : "El Señor esté con ustedes."}<br>R. ${isEn ? "And with your spirit." : "Y con tu espíritu."}<br>V. ${isEn ? "Lift up your hearts." : "Levantemos el corazón."}<br>R. ${isEn ? "We lift them up to the Lord." : "Lo tenemos levantado hacia el Señor."}<br>V. ${isEn ? "Let us give thanks to the Lord our God." : "Demos gracias al Señor, nuestro Dios."}<br>R. ${isEn ? "It is right and just." : "Es justo y necesario."}</p></div>\n\n`;
            
            out += `<div class="missal-block"><p class="missal-heading">${isEn ? "Sanctus" : "Santo"}</p><p class="missal-paragraph" style="text-align:center;">${isEn ? "Holy, Holy, Holy Lord God of hosts.<br>Heaven and earth are full of your glory.<br>Hosanna in the highest.<br>Blessed is he who comes in the name of the Lord.<br>Hosanna in the highest." : "Santo, Santo, Santo es el Señor,<br>Dios del Universo.<br>Llenos están el cielo y la tierra de tu gloria.<br>Hosanna en el cielo.<br>Bendito el que viene en nombre del Señor.<br>Hosanna en el cielo."}</p></div>\n\n`;
            
            out += `<div class="missal-block"><p class="missal-rubric" style="font-weight:bold; margin-bottom:4px;">${region==="mx" ? "" : (isEn ? "(Kneel)" : "(De rodillas)")}</p><p class="missal-heading">${isEn ? "Eucharistic Prayer" : "Plegaria Eucarística"}</p><p class="missal-rubric">${isEn ? "The priest prays the Eucharistic Prayer. After the consecration:" : "El sacerdote pronuncia la Plegaria Eucarística. Tras la consagración:"}</p><p class="missal-rubric">V. ${isEn ? "The mystery of faith." : "Éste es el Sacramento de nuestra fe."}</p><p class="missal-rubric">R. ${isEn ? "We proclaim your Death, O Lord, and profess your Resurrection until you come again." : "Anunciamos tu muerte, proclamamos tu resurrección. ¡Ven, Señor Jesús!"}</p></div>\n\n`;
            
            out += `<div class="missal-block"><p class="missal-rubric" style="font-weight:bold; margin-bottom:4px;">${region==="mx" ? "" : (isEn ? "(Stand)" : "(De pie)")}</p><p class="missal-heading">${isEn ? "Communion Rite" : "Rito de la Comunión"}</p><p class="missal-paragraph" style="text-align:justify;">${isEn ? "Our Father, who art in heaven, hallowed be thy name; thy kingdom come, thy will be done on earth as it is in heaven. Give us this day our daily bread, and forgive us our trespasses, as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil." : "Padre nuestro, que estás en el cielo, santificado sea tu Nombre; venga a nosotros tu reino; hágase tu voluntad en la tierra como en el cielo. Danos hoy nuestro pan de cada día; perdona nuestras ofensas, como también nosotros perdonamos a los que nos ofenden; no nos dejes caer en la tentación, y líbranos del mal."}</p></div>\n\n`;
            
            if (ritualSelect === "matrimonio" && window.ritualMatrimonioData && !isEn) {
                let bn = window.ritualMatrimonioData.liturgia_eucaristica.bendicion_nupcial;
                out += `<div class="missal-block">\n<p class="missal-heading">BENDICIÓN NUPCIAL</p>\n<div class="missal-paragraph">\n${bn.replace(/{esposo}/g, nombreEsposo).replace(/{esposa}/g, nombreEsposa).replace(/\n/g, '<br>')}\n</div>\n</div>\n\n`;
            }
            
            out += `<div class="missal-block"><p class="missal-heading">${isEn ? "Agnus Dei" : "Cordero de Dios"}</p><p class="missal-paragraph" style="text-align:center;">${isEn ? "Lamb of God, you take away the sins of the world, have mercy on us.<br>Lamb of God, you take away the sins of the world, have mercy on us.<br>Lamb of God, you take away the sins of the world, grant us peace." : "Cordero de Dios, que quitas el pecado del mundo, ten piedad de nosotros.<br>Cordero de Dios, que quitas el pecado del mundo, ten piedad de nosotros.<br>Cordero de Dios, que quitas el pecado del mundo, danos la paz."}</p></div>\n\n`;
            
            out += `<div class="missal-block"><p class="missal-rubric" style="font-weight:bold; margin-bottom:4px;">${region==="mx" ? "" : (isEn ? "(Kneel)" : "(De rodillas)")}</p><p class="missal-heading">${isEn ? "Invitation to Communion" : "Invitación a la Comunión"}</p><p class="missal-rubric">V. ${isEn ? "Behold the Lamb of God, behold him who takes away the sins of the world. Blessed are those called to the supper of the Lamb." : "Este es el Cordero de Dios, que quita el pecado del mundo. Dichosos los invitados a la cena del Señor."}</p><p class="missal-rubric">R. ${isEn ? "Lord, I am not worthy that you should enter under my roof, but only say the word and my soul shall be healed." : "Señor, no soy digno de que entres en mi casa, pero una palabra tuya bastará para sanarme."}</p></div>\n\n`;
            
            let antc = le.antifona_comunion || (isEn ? "Bring your hand and feel the place of the nails, and do not be unbelieving but believe." : "Acerca tu mano, trae tu dedo y explora mis llagas; y no seas incrédulo, sino creyente.");
            out += `<div class="missal-block"><p class="missal-heading">${isEn ? "Communion Antiphon" : "Antífona de la Comunión"}</p><p class="missal-paragraph">${antc}</p></div>\n\n`;
            
            out += `<div class="missal-block"><p class="missal-heading">${isEn ? "Communion Chant" : "Canto de Comunión"}</p><p class="missal-citation">${cantos.comunion}</p></div>\n\n`;
            
            let despues = le.oracion_despues_comunion || (isEn ? "Grant, we pray, almighty God, that our reception of this paschal Sacrament may have a continuing effect in our minds and hearts. Through Christ our Lord." : "Concédenos, Dios todopoderoso, que la eficacia de este sacramento limpie nuestras culpas y nos conduzca por el camino recto. Por Jesucristo nuestro Señor.");
            out += `<div class="missal-block"><p class="missal-rubric" style="font-weight:bold; margin-bottom:4px;">${region==="mx" ? "" : (isEn ? "(Stand)" : "(De pie)")}</p><p class="missal-heading">${isEn ? "Prayer after Communion" : "Oración después de la Comunión"}</p><p class="missal-paragraph"><strong class="rubric">${isEn ? "Priest:" : "Sacerdote:"}</strong> ${isEn ? "Let us pray." : "Oremos."} ${despues}</p><p class="missal-rubric">R. ${isEn ? "Amen." : "Amén."}</p></div>\n\n`;
            
            if (hora === "laudes" && data.laudes && data.laudes.cantico_evangelico) {
                let ce = data.laudes.cantico_evangelico;
                out += `<div class="missal-block"><p class="missal-heading">CÁNTICO EVANGÉLICO (Benedictus)</p><p class="missal-rubric">Antífona: ${ce.antifona}</p><div class="missal-paragraph" style="text-align:justify;">`;
                if (ce.texto && ce.texto.trim() !== "") {
                    ce.texto.split("\n\n").forEach((estrofa, index) => {
                        let l = index % 2 === 0 ? "Lector 1" : "Lector 2";
                        out += `<strong class="rubric">${l}:</strong><br>${estrofa}<br><br>`;
                    });
                } else {
                    out += `>[!WARNING]<br>Texto del cántico no ingresado en la base de datos.<br><br>`;
                }
                out += `<strong class="rubric">Asamblea:</strong><br>Gloria al Padre, y al Hijo, y al Espíritu Santo...<br><br></div><p class="missal-rubric">Antífona: ${ce.antifona}</p></div>\n\n`;
            } else if (hora === "visperas" && data.visperas && data.visperas.cantico_evangelico) {
                let ce = data.visperas.cantico_evangelico;
                out += `<div class="missal-block"><p class="missal-heading">CÁNTICO EVANGÉLICO (Magnificat)</p><p class="missal-rubric">Antífona: ${ce.antifona}</p><div class="missal-paragraph" style="text-align:justify;">`;
                if (ce.texto && ce.texto.trim() !== "") {
                    ce.texto.split("\n\n").forEach((estrofa, index) => {
                        let l = index % 2 === 0 ? "Lector 1" : "Lector 2";
                        out += `<strong class="rubric">${l}:</strong><br>${estrofa}<br><br>`;
                    });
                } else {
                    out += `>[!WARNING]<br>Texto del cántico no ingresado en la base de datos.<br><br>`;
                }
                out += `<strong class="rubric">Asamblea:</strong><br>Gloria al Padre...<br><br></div><p class="missal-rubric">Antífona: ${ce.antifona}</p></div>\n\n`;
            }
            
            // BLOQUES DINAMICOS PARROQUIALES (Avisos, Intenciones, Cantos, etc)
            let hasValidBlocksBottom = false;
            let dynamicOutBottom = `<div class="missal-block" style="text-align: center; margin: 30px 0;">\n<p class="missal-heading" style="font-size: 1.1em;">${isEn ? "PARISH ANNOUNCEMENTS" : "AVISOS PARROQUIALES"}</p>\n</div>\n\n`;
            for (let i = 0; i < remainingTitles.length; i++) {
                 hasValidBlocksBottom = true;
                 dynamicOutBottom += `<div class="missal-block" style="margin-bottom: 24px;">
                                        <p class="missal-heading" style="color: #444; border-bottom: 1px solid #ccc; padding-bottom: 4px;">${remainingTitles[i]}</p>
                                        <p class="missal-paragraph">${remainingContents[i].replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>
                                    </div>

`;
            }
            if (hasValidBlocksBottom) {
                 out += dynamicOutBottom;
            }
            
            // RITO DE CONCLUSION
            if (ritualSelect === "exequias" && window.ritualExequiasData && !isEn) {
                let rx = window.ritualExequiasData[exequiasTipo].ultimo_adios;
                let difName = nombreDifunto + (generoDifunto === 'f' ? ' (Tu sierva)' : ' (Tu siervo)');
                out += `<div class="missal-block" style="text-align: center; margin: 30px 0;">\n<p class="missal-heading" style="font-size: 1.1em;">RITO DE ÚLTIMO ADIÓS</p>\n<p class="missal-rubric">(Sustituye Rito de Conclusión)</p>\n</div>\n\n`;
                out += `<div class="missal-block">\n<p class="missal-heading">Monición y Aspersión</p>\n<div class="missal-paragraph">\n${rx.monicion.replace(/{difunto}/g, nombreDifunto)}\n<br><br><em>${rx.aspersion_e_incienso}</em>\n</div>\n</div>\n\n`;
                out += `<div class="missal-block">\n<p class="missal-heading">Oración de Despedida</p>\n<div class="missal-paragraph">\n${rx.oracion_despedida.replace(/{difunto}/g, difName)}\n</div>\n</div>\n\n`;
                out += `<div class="missal-block">\n<p class="missal-heading">Procesión al Cementerio</p>\n<div class="missal-paragraph" style="font-weight:bold;">\n${rx.concesion_paz.replace(/\n/g, '<br>')}\n</div>\n</div>\n\n`;
            } else {
                out += `<div class="missal-block" style="text-align: center; margin: 30px 0;">\n<p class="missal-heading" style="font-size: 1.1em;">${isEn ? "CONCLUDING RITES" : "RITO DE CONCLUSIÓN"}</p>\n<p class="missal-rubric" style="text-align:center; font-weight:bold; margin-top:12px;">${region==="mx" ? "" : (isEn ? "(Stand)" : "(De pie)")}</p>\n</div>\n\n`;

                if (ritualSelect === "bautismo" && window.ritualBautismoData && !isEn) {
                    out += `<div class="missal-block"><p class="missal-heading">Bendición Especial y Despedida (Bautismo)</p><div class="missal-paragraph">\n${window.ritualBautismoData.conclusion.bendicion_especial}\n</div><p class="missal-rubric">V. Pueden ir en paz.<br>R. Demos gracias a Dios.</p></div>\n\n`;
                } else if (ritualSelect === "matrimonio" && window.ritualMatrimonioData && !isEn) {
                    out += `<div class="missal-block"><p class="missal-heading">Bendición Final de los Esposos</p><div class="missal-paragraph">\n${window.ritualMatrimonioData.conclusion.bendicion_final}\n</div><p class="missal-rubric">V. Pueden ir en paz.<br>R. Demos gracias a Dios.</p></div>\n\n`;
                } else {
                    if (Flag_Oracion_Pueblo && data.oracion_sobre_el_pueblo) {
                        out += `<div class="missal-block"><p class="missal-heading">Oración sobre el Pueblo</p><p class="missal-rubric">Sacerdote: Iniclinen la cabeza para recibir la bendición.</p><p class="missal-paragraph">${data.oracion_sobre_el_pueblo}</p><p class="missal-rubric">R. Amén.</p></div>\n\n`;
                    }
                    
                    let a_despedida = isEn ? "Alleluia, alleluia" : "Aleluya, aleluya";
                    let d_final = Flag_DobleAleluya_Despedida ? `<br>V. ${isEn ? "Go in peace, " + a_despedida : "Pueden ir en paz, " + a_despedida}.<br>R. ${isEn ? "Thanks be to God, " + a_despedida : "Demos gracias a Dios, " + a_despedida}.` : `<br>V. ${isEn ? "Go in peace." : "Pueden ir en paz."}<br>R. ${isEn ? "Thanks be to God." : "Demos gracias a Dios."}`;
                    
                    out += `<div class="missal-block"><p class="missal-heading">${isEn ? "Final Blessing" : "Bendición Final"}</p><p class="missal-rubric">V. ${isEn ? "The Lord be with you." : "El Señor esté con ustedes."}<br>R. ${isEn ? "And with your spirit." : "Y con tu espíritu."}<br>V. ${isEn ? "May almighty God bless you, the Father, and the Son, and the Holy Spirit." : "La bendición de Dios todopoderoso, Padre, Hijo y Espíritu Santo, descienda sobre ustedes."}<br>R. ${isEn ? "Amen." : "Amén."}${d_final}</p></div>\n\n`;
                }

                out += `<div class="missal-block"><p class="missal-heading">${isEn ? "Recessional Chant" : "Canto de Salida"}</p><p class="missal-citation">${cantos.salida}</p></div>\n\n`;
            }
        }
        return out;
    }

    function markdownToHTML(md) {
        let text = md
            .replace(/-----\n\n/g, '')
            .replace(/### (.*?)\n/g, '<p class="missal-heading">$1</p>\n')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/^>[ \t]*(.*$)/gim, '<blockquote>$1</blockquote>')
            .replace(/<\/blockquote>\n<blockquote>/g, '<br>')
            .replace(/<\/blockquote><br><blockquote>/g, '<br>')
            .replace(/>\n+</g, '><') // Removes newlines strictly between HTML tags
            .replace(/\n\n/g, '<br><br>')
            .replace(/\n(?!<)/g, '<br>')
            .replace(/<br><\/div>/g, '</div>')
            .replace(/<br><div/g, '<div');
            
        // Apply rubric class to exact actors
        text = text.replace(/<strong>(Sacerdote:|Priest:|Sacerdote y Asamblea:|Asamblea:|People:|Lector:|Lector 1:|Lector 2:|Antífona:|Antífona 1:|Responsorio Breve:|Oración Final:|Himno:|Lectura Breve|Salmodia:|Examen de Conciencia:|Introducción:|Antífona Mariana:)<\/strong>/g, '<strong class="rubric">$1</strong>');
        return text;
    }

    function generarBoletin(data, dateStr, clergy, motto, logoUrl) {
        let out = ``;
        
        // Header
        out += `<p class="bul-top-motto">${motto.toUpperCase()}</p>`;
        out += `<div class="bul-info-grid">
                    <div class="bul-info-col">
                        618 N. BURTON AVE,<br>P.O. BOX 436, LA PRYOR, TX. 78872
                    </div>
                    <div class="bul-info-col bul-date">
                        <h4>${data.tiempo_liturgico}</h4>
                        <p>${dateStr}</p>
                    </div>
                    <div class="bul-info-col" style="display:flex; align-items:center; justify-content:center; gap: 10px;">
                        ${logoUrl ? `<img src="${logoUrl}" style="height: 40px;">` : `<img src="https://ui-avatars.com/api/?name=St+J&background=c90000&color=fff" style="height: 40px; border-radius: 50%;">`}
                        <div style="text-align:left;">
                            <strong style="color: #c90000; font-size: 1.1rem;">ST. JOSEPH & ST. PATRICK</strong><br>
                            <span style="font-size: 0.6rem;">CATHOLIC CHURCH</span>
                        </div>
                    </div>
                </div>`;
                
        // Title
        out += `<h1 class="bul-title-main">The Guardian</h1>`;
        out += `<div class="bul-subtitle">CATHOLIC CHURCH WEEKLY BULLETIN</div>`;
        
        // Dynamic Grid
        out += `<div class="bul-grid" style="height: auto; min-height: 250px;">`;
        
        const titles = document.querySelectorAll('.sec-title');
        const contents = document.querySelectorAll('.sec-content');
        
        for (let i = 0; i < titles.length; i++) {
             out += `<div class="bul-grid-box purple" style="flex-direction: column;">
                        <div style="font-size:0.75rem; color:#facc15; text-transform:uppercase; margin-bottom:10px;">${titles[i].value}</div>
                        <div style="font-size:0.95rem;">${contents[i].value.replace(/\n/g, '<br>')}</div>
                    </div>`;
             // For visual mockup flow, auto inject one image for every block made
             out += `<div class="bul-grid-box"><img src="https://images.unsplash.com/photo-1548625361-ec84920b77a7?auto=format&fit=crop&w=300&q=80" class="bul-bg-img"></div>`;
        }
        
        out += `</div>`;
                
        // Footer Clergy
        out += `<div class="bul-footer">
                    <div class="bul-clergy">
                        <h3>Clergy</h3>
                        <p>${clergy}</p>
                        <p>REV. MR. GENE CORRIGAN -- DEACON</p>
                    </div>
                    <div class="bul-qr">
                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://liturgiapro.com" alt="QR CODE A WEB">
                    </div>
                </div>`;
                
        // Page 2 (Gospel)
        out += `<div class="bul-page-2">
                    <h2>Gospel of the Day: ${data.liturgia_palabra.evangelio.cita}</h2>
                    <p style="font-size: 0.85rem; column-count: 2; column-gap: 30px; text-align: justify;">${formatLectura(data.liturgia_palabra.evangelio.texto).replace(/\\n/g, '<br><br>')}</p>
                </div>`;
                
        return out;
    }

    // PDF Export function
    const btnPdf = document.getElementById('generar-pdf');
    btnPdf.addEventListener('click', () => {
        const element = document.getElementById('pdf-view');
        
        const dateStr = currentMode === 'boletin' ? (document.getElementById('bulletin-date') ? document.getElementById('bulletin-date').value : "Desconocida") : (document.getElementById('date-select') ? document.getElementById('date-select').value : "Desconocida");
        const formatStr = currentMode.toUpperCase();
        
        // Configuration for html2pdf
        const opt = {
            margin:       0, // Zero margin; we rely on the internal padding of .pdf-container (1in)
            filename:     `Liturgia_PRO_${formatStr}_${dateStr}.pdf`,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2 },
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' },
            pagebreak:    { mode: ['css', 'legacy'] }
        };

    // If it's an empty state, don't print
        if (element.innerText.includes('El documento generado aparecerá aquí') || element.innerText.includes('Compilando Rúbricas...')) {
            alert("Primero genera un documento usando el Asistente.");
            return;
        }

        html2pdf().set(opt).from(element).save();
    });

    // -----------------------------------------------------
    // PROMPTER CINEMÁTICO LOGIC (SCROLL CONTINUO)
    // -----------------------------------------------------
    const btnPrompter = document.getElementById('open-prompter-btn');
    const prompterScreen = document.getElementById('prompter-screen');
    const closePrompter = document.getElementById('close-prompter-btn');
    const prompterContainer = document.getElementById('prompter-slide-container');
    const btnAutoScroll = document.getElementById('prompter-auto-scroll');
    const btnStopScroll = document.getElementById('prompter-stop-scroll');
    const spanScrollSpeed = document.getElementById('scroll-speed');
    
    let prompterSlides = [];
    let autoScrollInterval = null;
    let autoScrollSpeed = 1; // 1x, 2x, 3x

    function renderAllPrompterSlides() {
        prompterContainer.innerHTML = '';
        if (prompterSlides.length === 0) return;
        
        prompterSlides.forEach((slide, idx) => {
            const slideDiv = document.createElement('div');
            slideDiv.className = 'prompter-slide active';
            
            if (slide.rubric) {
                const slideRubric = document.createElement('p');
                slideRubric.className = 'prompter-slide-rubric';
                slideRubric.innerHTML = slide.rubric;
                slideDiv.appendChild(slideRubric);
            }

            const slideTitle = document.createElement('h1');
            slideTitle.className = 'prompter-slide-title';
            slideTitle.innerHTML = slide.title;
            slideDiv.appendChild(slideTitle);
            
            const slideContent = document.createElement('div');
            slideContent.className = 'prompter-slide-content';
            slideContent.innerHTML = slide.content.replace(/\n\n/g, '<br><br>').replace(/\n/g, '<br>');
            slideDiv.appendChild(slideContent);
            
            prompterContainer.appendChild(slideDiv);
        });
    }

    function buildPrompterSlides() {
        prompterSlides = [];
        const dateStr = document.getElementById('date-select') ? document.getElementById('date-select').value : null;
        if (!dateStr || !window.calendarioDB || !window.liturgiaDB) return;
        
        let cDay = window.calendarioDB[dateStr];
        let data = window.liturgiaDB[dateStr];
        
        if (!cDay || !data || !data.liturgia_palabra) return;
        
        let lp = data.liturgia_palabra;
        
        // 1. Bienvenida
        prompterSlides.push({ title: "<span style='font-size:1.5em'>☩</span><br>Liturgia PRO", content: `Bienvenidos a la Celebración Eucarística<br><br><span style="color:var(--gold-accent); font-size:0.6em">${cDay.festividad || cDay.tiempo}</span>` });
        
        // 2. Primera Lectura
        if (lp.primera_lectura) {
            prompterSlides.push({ title: "Primera Lectura", rubric: lp.primera_lectura.cita, content: lp.primera_lectura.texto });
        }
        
        // 3. Salmo Responsorial
        if (lp.salmo_responsorial) {
            prompterSlides.push({ title: "Salmo Responsorial", rubric: lp.salmo_responsorial.antifona, content: lp.salmo_responsorial.texto });
        }
        
        // 4. Segunda Lectura
        if (lp.segunda_lectura) {
            prompterSlides.push({ title: "Segunda Lectura", rubric: lp.segunda_lectura.cita, content: lp.segunda_lectura.texto });
        }
        
        // 5. Aleluya
        if (lp.aleluya) {
            let aleluyaText = lp.aleluya.texto || "";
            if (!aleluyaText.toUpperCase().includes('ALELUYA')) {
                prompterSlides.push({ title: "Aclamación antes del Evangelio", content: `R. Aleluya, aleluya.<br><br>${aleluyaText}<br><br>R. Aleluya, aleluya.` });
            } else {
                prompterSlides.push({ title: "Aclamación antes del Evangelio", content: aleluyaText });
            }
        }
        
        // 6. Evangelio
        if (lp.evangelio) {
            prompterSlides.push({ title: "Santo Evangelio", rubric: lp.evangelio.cita, content: lp.evangelio.texto });
        }
        
        // 7. Ofertorio / Comunión
        prompterSlides.push({ title: "Liturgia Eucarística", content: "Nos preparamos para el Banquete del Señor."});
        
        const cantos = window.cantosDB && window.cantosDB[dateStr] ? window.cantosDB[dateStr] : null;
        if (cantos && cantos.comunion) {
            prompterSlides.push({ title: "Comunión", rubric: "Canto Sugerido", content: cantos.comunion });
        }
    }

    function toggleAutoScroll() {
        if (autoScrollInterval) {
            // Speed up
            autoScrollSpeed++;
            if (autoScrollSpeed > 3) {
                stopAutoScroll();
            } else {
                spanScrollSpeed.textContent = autoScrollSpeed;
                clearInterval(autoScrollInterval);
                startAutoScroll();
            }
        } else {
            // Start
            autoScrollSpeed = 1;
            spanScrollSpeed.textContent = autoScrollSpeed;
            startAutoScroll();
        }
    }
    
    function startAutoScroll() {
        if(autoScrollInterval) clearInterval(autoScrollInterval);
        btnStopScroll.style.display = 'block';
        autoScrollInterval = setInterval(() => {
            prompterScreen.scrollBy(0, autoScrollSpeed);
        }, 30);
    }
    
    function stopAutoScroll() {
        if(autoScrollInterval) {
            clearInterval(autoScrollInterval);
            autoScrollInterval = null;
        }
        autoScrollSpeed = 1;
        spanScrollSpeed.textContent = autoScrollSpeed;
        btnStopScroll.style.display = 'none';
    }

    if (btnPrompter) {
        btnPrompter.addEventListener('click', () => {
            buildPrompterSlides();
            if (prompterSlides.length === 0) {
                alert("No hay lecturas cargadas para esta fecha. Usa el Asistente Diaria primero.");
                return;
            }
            renderAllPrompterSlides();
            prompterScreen.style.display = 'flex';
            prompterScreen.scrollTop = 0;
            stopAutoScroll();
        });
    }

    if (closePrompter) {
        closePrompter.addEventListener('click', () => {
            prompterScreen.style.display = 'none';
            stopAutoScroll();
        });
    }

    if (btnAutoScroll) {
        btnAutoScroll.addEventListener('click', toggleAutoScroll);
    }
    if (btnStopScroll) {
        btnStopScroll.addEventListener('click', stopAutoScroll);
    }

    // Keyboard support - Esc to close
    document.addEventListener('keydown', (e) => {
        if (prompterScreen.style.display === 'flex') {
            if (e.key === 'Escape') {
                prompterScreen.style.display = 'none';
                stopAutoScroll();
            }
        }
    });

});

// ANTIGRAVITY - CEREBRO LITÚRGICO UNIFICADO (NODOS)

function generarDocumentoNodos(data, hora, isEn) {
    let SECUENCIA_LITURGICA = [];
    
    // VARIABLES
    const fechaElegida = document.getElementById('date-select') ? document.getElementById('date-select').value : null;
    const calDay = (fechaElegida && window.calendarioDB) ? window.calendarioDB[fechaElegida] : null;

    const DIA_TRIDUO = calDay ? (calDay.dia_triduo || null) : null;
    const TIEMPO_LIT = data.tiempo_liturgico || "Ordinario";
    let rawGrado = "";
    if (document.getElementById('grado-liturgico')) {
        rawGrado = document.getElementById('grado-liturgico').value;
    }
    if (!rawGrado) rawGrado = data.grado || data.dia_semana || "Feria";
    
    const GRADO = String(rawGrado).toLowerCase();
    const OFICIO = hora ? (hora === "laudes" ? "Laudes" : (hora === "visperas" ? "Visperas" : "Completas")) : null;

    const upperTiempo = TIEMPO_LIT.toUpperCase();
    const isCuaresma = upperTiempo.includes("CUARESMA");
    const isAdviento = upperTiempo.includes("ADVIENTO");
    const ES_PASCUA_PENTECOSTES = upperTiempo.includes("PASCUA") || upperTiempo.includes("PENTECOSTÉS");
    const ES_OCTAVA_PASCUA = upperTiempo.includes("PASCUA") && calDay && calDay.titulo && calDay.titulo.toLowerCase().includes("octava");

    // COMPUERTA DE ABORTO
    if (DIA_TRIDUO) {
        if (DIA_TRIDUO === "Jueves_Santo" && OFICIO === "Visperas") {
            return RENDERIZAR_BLOQUE(new BloqueLiturgico('abort').addSuperTitulo("Misa de la Cena del Señor.").addRubrica("Unión con Vísperas = Bloqueado."));
        }
        if (DIA_TRIDUO === "Viernes_Santo") {
            return RENDERIZAR_BLOQUE(new BloqueLiturgico('abort').addSuperTitulo("Viernes Santo.").addRubrica("Prohibido celebrar Misa. Solo liturgia de la Pasión."));
        }
        if (DIA_TRIDUO === "Sabado_Santo") {
            return RENDERIZAR_BLOQUE(new BloqueLiturgico('abort').addSuperTitulo("Sábado Santo.").addRubrica("Prohibido celebrar Misa diurna. Esperar a Vigilia Pascual."));
        }
    }

    // BANDERAS LOGICAS
    let Flag_Gloria = (GRADO.includes("solemnidad") || GRADO.includes("fiesta") || (GRADO.includes("domingo") && !isAdviento && !isCuaresma));
    if (data.gloria !== undefined) Flag_Gloria = data.gloria; 
    let Flag_Credo = (GRADO.includes("domingo") || GRADO.includes("solemnidad"));
    let Flag_Aleluya = !isCuaresma;
    let Flag_DobleAleluya_Despedida = (ES_PASCUA_PENTECOSTES || ES_OCTAVA_PASCUA);
    let Flag_Oracion_Pueblo = isCuaresma;

    const cantos = obtenerCantosPorTiempo(TIEMPO_LIT, isEn);

    // BLOQUE A: RITOS INICIALES
    let bInicial = new BloqueLiturgico("ritos_iniciales");
    bInicial.addSuperTitulo(isEn ? "INTRODUCTORY RITES" : "RITOS INICIALES");
    
    bInicial.addTitulo(isEn ? "Entrance Chant" : "Canto de Entrada");
    bInicial.addRubrica(cantos.entrada);

    let antEnt = data.antifona_entrada || (isEn ? "Entrance Antiphon details..." : "Antífona según calendario...");
    bInicial.addTitulo(isEn ? "Entrance Antiphon" : "Antífona de Entrada");
    bInicial.addSacerdote(antEnt);

    bInicial.addTitulo(isEn ? "Greeting" : "Saludo Inicial");
    bInicial.addDialogo(isEn ? "In the name of the Father, and of the Son, and of the Holy Spirit." : "En el nombre del Padre, y del Hijo, y del Espíritu Santo.", isEn ? "Amen." : "Amén.");
    bInicial.addDialogo(isEn ? "The grace of our Lord Jesus Christ, and the communion of the Holy Spirit be with you all." : "La gracia de nuestro Señor Jesucristo, el amor del Padre, y la comunión del Espíritu Santo estén con todos ustedes.", isEn ? "And with your spirit." : "Y con tu espíritu.");

    bInicial.addTitulo(isEn ? "Penitential Act" : "Rito Penitencial");
    bInicial.addSacerdote(isEn ? "Brethren (brothers and sisters), let us acknowledge our sins..." : "Hermanos: reconozcamos nuestros pecados para celebrar dignamente estos sagrados misterios.");
    bInicial.addAsamblea(data.rito_penitencial || "Yo confieso ante Dios todopoderoso...");
    bInicial.addSacerdote(isEn ? "May almighty God have mercy on us..." : "Dios todopoderoso tenga misericordia de nosotros, perdone nuestros pecados y nos lleve a la vida eterna.");
    bInicial.addAsamblea("Amén.");
    bInicial.addDialogo(isEn ? "Lord, have mercy." : "Señor, ten piedad.", isEn ? "Lord, have mercy." : "Señor, ten piedad.");
    bInicial.addDialogo(isEn ? "Christ, have mercy." : "Cristo, ten piedad.", isEn ? "Christ, have mercy." : "Cristo, ten piedad.");
    bInicial.addDialogo(isEn ? "Lord, have mercy." : "Señor, ten piedad.", isEn ? "Lord, have mercy." : "Señor, ten piedad.");
    SECUENCIA_LITURGICA.push(bInicial);

    let bGloriaColecta = new BloqueLiturgico("gloria");
    bGloriaColecta.addTitulo("Gloria");
    if (Flag_Gloria) {
        bGloriaColecta.addAsamblea(isEn ? "Glory to God in the highest..." : "Gloria a Dios en el cielo, y en la tierra paz a los hombres que ama el Señor. Por tu inmensa gloria te alabamos, te bendecimos, te adoramos, te glorificamos, te damos gracias, Señor Dios, Rey celestial, Dios Padre todopoderoso. Señor, Hijo único, Jesucristo. Señor Dios, Cordero de Dios, Hijo del Padre; tú que quitas el pecado del mundo, ten piedad de nosotros; tú que quitas el pecado del mundo, atiende nuestra súplica; tú que estás sentado a la derecha del Padre, ten piedad de nosotros; porque sólo tú eres Santo, sólo tú Señor, sólo tú Altísimo, Jesucristo, con el Espíritu Santo en la gloria de Dios Padre. Amén.");
    } else {
        bGloriaColecta.addRubrica(isEn ? "[The Gloria is omitted today]" : "[Hoy se omite el Gloria]");
    }
    
    bGloriaColecta.addTitulo(isEn ? "Collect" : "Oración Colecta");
    bGloriaColecta.addSacerdote((isEn ? "Let us pray. " : "Oremos. ") + (data.oracion_colecta || "Dios todopoderoso y eterno..."));
    bGloriaColecta.addAsamblea("Amén.");
    SECUENCIA_LITURGICA.push(bGloriaColecta);

    // BLOQUE B: LITURGIA DE LA PALABRA
    let bPalabra = new BloqueLiturgico("liturgia_palabra");
    bPalabra.addSuperTitulo(isEn ? "LITURGY OF THE WORD" : "LITURGIA DE LA PALABRA");
    
    let lp = data.liturgia_palabra || {};
    let r1 = lp.primera_lectura || { cita: "Primera Lectura", texto: "[No disponible]" };
    bPalabra.addTitulo(isEn ? "First Reading" : "Primera Lectura");
    bPalabra.addRubrica(r1.cita);
    bPalabra.addSacerdote(r1.texto);
    bPalabra.addDialogo(isEn ? "The word of the Lord." : "Palabra de Dios.", isEn ? "Thanks be to God." : "Te alabamos, Señor.");

    let sr = lp.salmo_responsorial || { cita: "Salmo", respuesta: "R.", texto: "..." };
    bPalabra.addTitulo(isEn ? "Responsorial Psalm" : "Salmo Responsorial");
    bPalabra.addRubrica(sr.cita);
    bPalabra.addAsamblea("R. " + sr.respuesta);
    bPalabra.addSacerdote(sr.texto);

    if (lp.segunda_lectura) {
        let r2 = lp.segunda_lectura;
        bPalabra.addTitulo(isEn ? "Second Reading" : "Segunda Lectura");
        bPalabra.addRubrica(r2.cita);
        bPalabra.addSacerdote(r2.texto);
        bPalabra.addDialogo(isEn ? "The word of the Lord." : "Palabra de Dios.", isEn ? "Thanks be to God." : "Te alabamos, Señor.");
    }

    if (lp.secuencia) {
        bPalabra.addTitulo("Secuencia");
        bPalabra.addSacerdote(lp.secuencia);
    }

    bPalabra.addTitulo(isEn ? "Gospel Acclamation" : "Aclamación antes del Evangelio");
    if (Flag_Aleluya) {
        bPalabra.addAsamblea(lp.aclamacion_evangelio || "Aleluya, aleluya.");
    } else {
        let aclv = lp.aclamacion_evangelio || "Honor y gloria a ti, Señor Jesús.";
        bPalabra.addAsamblea(aclv.replace(/Aleluya/ig, "Honor y gloria a ti, Señor Jesús"));
    }

    let ev = lp.evangelio || { cita: "Evangelio", texto: "[Evangelio no disponible]" };
    bPalabra.addTitulo(isEn ? "Gospel" : "Evangelio");
    bPalabra.addRubrica("<span class=\"cross-mark\">☩</span> " + ev.cita);
    bPalabra.addSacerdote(ev.texto);
    bPalabra.addDialogo(isEn ? "The Gospel of the Lord." : "Palabra del Señor.", isEn ? "Praise to you, Lord Jesus Christ." : "Gloria a ti, Señor Jesús.");
    
    bPalabra.addTitulo(isEn ? "Homily" : "Homilía");
    bPalabra.addRubrica(isEn ? "The priest gives the homily." : "El sacerdote pronuncia la homilía.");
    SECUENCIA_LITURGICA.push(bPalabra);

    if (Flag_Credo) {
        let bCredo = new BloqueLiturgico("credo");
        bCredo.addTitulo(isEn ? "Profession of Faith" : "Profesión de Fe");
        bCredo.addAsamblea(isEn ? "I believe in God, the Father almighty..." : "Creo en Dios, Padre todopoderoso, Creador del cielo y de la tierra. Creo en Jesucristo, su único Hijo, nuestro Señor, que fue concebido por obra y gracia del Espíritu Santo, nació de santa María Virgen, padeció bajo el poder de Poncio Pilato, fue crucificado, muerto y sepultado, descendió a los infiernos, al tercer día resucitó de entre los muertos, subió a los cielos y está sentado a la derecha de Dios, Padre todopoderoso. Desde allí ha de venir a juzgar a vivos y muertos. Creo en el Espíritu Santo, la santa Iglesia católica, la comunión de los santos, el perdón de los pecados, la resurrección de la carne y la vida eterna. Amén.");
        SECUENCIA_LITURGICA.push(bCredo);
    }

    let bPreces = new BloqueLiturgico("preces");
    bPreces.addTitulo(isEn ? "Universal Prayer" : "Oración de los Fieles");
    bPreces.addDialogo(isEn ? "Let us pray to God the Father:" : "A Dios Padre, dirijamos nuestra súplica:", isEn ? "We pray you, hear us." : "Te rogamos, óyenos.");
    let preces = lp.preces || (isEn ? "Hear us, O Lord, and grant your Church peace and unity." : "Te pedimos, Señor, escucha nuestra oración...");
    bPreces.addSacerdote(preces);
    bPreces.addSacerdote(isEn ? "Hear our prayers, O Father, through Christ our Lord. Amen." : "Escucha, Padre bondadoso, las súplicas que tu pueblo creyente te presenta con fe. Por Jesucristo, nuestro Señor. Amén.");
    SECUENCIA_LITURGICA.push(bPreces);

    // BLOQUE C Y D
    let bEuca = new BloqueLiturgico("liturgia_eucaristica");
    bEuca.addSuperTitulo(isEn ? "LITURGY OF THE Eucharist" : "LITURGIA EUCARÍSTICA");
    bEuca.addTitulo(isEn ? "Offertory Chant" : "Canto de Ofertorio");
    bEuca.addRubrica(cantos.ofertorio);

    let ofrendas = data.liturgia_eucaristica ? data.liturgia_eucaristica.oracion_ofrendas : (isEn ? "Receive, O Lord, the offerings..." : "Recibe, Señor, las ofrendas de tu pueblo...");
    bEuca.addTitulo(isEn ? "Prayer over the Offerings" : "Oración sobre las Ofrendas");
    bEuca.addSacerdote(ofrendas);
    bEuca.addAsamblea("Amén.");
    
    bEuca.addTitulo(isEn ? "Preface Dialogue" : "Diálogo del Prefacio");
    bEuca.addDialogo(isEn ? "The Lord be with you." : "El Señor esté con ustedes.", isEn ? "And with your spirit." : "Y con tu espíritu.");
    bEuca.addDialogo(isEn ? "Lift up your hearts." : "Levantemos el corazón.", isEn ? "We lift them up to the Lord." : "Lo tenemos levantado hacia el Señor.");
    bEuca.addDialogo(isEn ? "Let us give thanks to the Lord our God." : "Demos gracias al Señor, nuestro Dios.", isEn ? "It is right and just." : "Es justo y necesario.");

    bEuca.addTitulo(isEn ? "Sanctus" : "Santo");
    bEuca.addAsamblea(isEn ? "Holy, Holy, Holy Lord God of hosts..." : "Santo, Santo, Santo es el Señor, Dios del Universo. Llenos están el cielo y la tierra de tu gloria. Hosanna en el cielo. Bendito el que viene en nombre del Señor. Hosanna en el cielo.");

    bEuca.addTitulo(isEn ? "Eucharistic Prayer" : "Plegaria Eucarística");
    bEuca.addRubrica(isEn ? "The priest prays the Eucharistic Prayer. After the consecration:" : "El sacerdote pronuncia la Plegaria Eucarística. Tras la consagración:");
    bEuca.addDialogo(isEn ? "The mystery of faith." : "Éste es el Sacramento de nuestra fe.", isEn ? "We proclaim your Death, O Lord, and profess your Resurrection until you come again." : "Anunciamos tu muerte, proclamamos tu resurrección. ¡Ven, Señor Jesús!");
    SECUENCIA_LITURGICA.push(bEuca);

    // COMUNION
    let bComunion = new BloqueLiturgico("rito_comunion");
    bComunion.addSuperTitulo(isEn ? "Communion Rite" : "RITO DE LA COMUNIÓN");
    bComunion.addAsamblea(isEn ? "Our Father, who art in heaven..." : "Padre nuestro, que estás en el cielo, santificado sea tu Nombre; venga a nosotros tu reino; hágase tu voluntad en la tierra como en el cielo. Danos hoy nuestro pan de cada día; perdona nuestras ofensas, como también nosotros perdonamos a los que nos ofenden; no nos dejes caer en la tentación, y líbranos del mal.");
    
    bComunion.addTitulo(isEn ? "Agnus Dei" : "Cordero de Dios");
    bComunion.addAsamblea(isEn ? "Lamb of God, you take away the sins of the world..." : "Cordero de Dios, que quitas el pecado del mundo, ten piedad de nosotros. Cordero de Dios, que quitas el pecado del mundo, ten piedad de nosotros. Cordero de Dios, que quitas el pecado del mundo, danos la paz.");

    bComunion.addTitulo(isEn ? "Invitation to Communion" : "Invitación a la Comunión");
    bComunion.addDialogo(isEn ? "Behold the Lamb of God..." : "Este es el Cordero de Dios, que quita el pecado del mundo. Dichosos los invitados a la cena del Señor.", isEn ? "Lord, I am not worthy..." : "Señor, no soy digno de que entres en mi casa, pero una palabra tuya bastará para sanarme.");

    let antc = (data.liturgia_eucaristica && data.liturgia_eucaristica.antifona_comunion) ? data.liturgia_eucaristica.antifona_comunion : "Acerca tu mano, trae tu dedo y explora mis llagas...";
    bComunion.addTitulo(isEn ? "Communion Antiphon" : "Antífona de la Comunión");
    bComunion.addSacerdote(antc);
    
    bComunion.addTitulo(isEn ? "Communion Chant" : "Canto de Comunión");
    bComunion.addRubrica(cantos.comunion);

    let despues = (data.liturgia_eucaristica && data.liturgia_eucaristica.oracion_despues_comunion) ? data.liturgia_eucaristica.oracion_despues_comunion : (isEn ? "Grant, we pray, almighty God..." : "Concédenos, Dios todopoderoso, que la eficacia de este sacramento...");
    bComunion.addTitulo(isEn ? "Prayer after Communion" : "Oración después de la Comunión");
    bComunion.addSacerdote((isEn ? "Let us pray. " : "Oremos. ") + despues);
    bComunion.addAsamblea("Amén.");
    SECUENCIA_LITURGICA.push(bComunion);

    // BLOQUE E: CONCLUSIÓN
    let bConclusion = new BloqueLiturgico("conclusion");
    bConclusion.addSuperTitulo(isEn ? "CONCLUDING RITES" : "RITO DE CONCLUSIÓN");

    if (Flag_Oracion_Pueblo && data.oracion_sobre_el_pueblo) {
        bConclusion.addTitulo("Oración sobre el Pueblo");
        bConclusion.addRubrica("Sacerdote: Iniclinen la cabeza para recibir la bendición.");
        bConclusion.addSacerdote(data.oracion_sobre_el_pueblo);
        bConclusion.addAsamblea("Amén.");
    }

    bConclusion.addTitulo(isEn ? "Final Blessing" : "Bendición Final");
    bConclusion.addDialogo(isEn ? "The Lord be with you." : "El Señor esté con ustedes.", isEn ? "And with your spirit." : "Y con tu espíritu.");
    bConclusion.addDialogo(isEn ? "May almighty God bless you, the Father, and the Son, and the Holy Spirit." : "La bendición de Dios todopoderoso, Padre, Hijo y Espíritu Santo, descienda sobre ustedes.", "Amén.");

    if (Flag_DobleAleluya_Despedida) {
        bConclusion.addDialogo(isEn ? "Go in peace, Alleluia, alleluia." : "Pueden ir en paz, Aleluya, aleluya.", isEn ? "Thanks be to God, Alleluia, alleluia." : "Demos gracias a Dios, Aleluya, aleluya.");
    } else {
        bConclusion.addDialogo(isEn ? "Go in peace." : "Pueden ir en paz.", isEn ? "Thanks be to God." : "Demos gracias a Dios.");
    }

    bConclusion.addTitulo(isEn ? "Recessional Chant" : "Canto de Salida");
    bConclusion.addRubrica(cantos.salida);
    SECUENCIA_LITURGICA.push(bConclusion);

    // EJECUCION MOTOR DE RENDERING
    let htmlOut = '';
    SECUENCIA_LITURGICA.forEach(bloque => htmlOut += RENDERIZAR_BLOQUE(bloque));
    return htmlOut;
}

var myData = {
    gloria: true, dia_semana: 'Lunes', tiempo_liturgico: 'Pascua', antifona_entrada: 'Ant', rito_penitencial: 'Rito',
    oracion_colecta: 'Col', liturgia_palabra: {primera_lectura: {cita:'a', texto: 'b'}, evangelio: {cita:'c', texto:'d'}},
    liturgia_eucaristica: {oracion_ofrendas: 'e', oracion_despues_comunion: 'f'}
};
var hora = 'laudes';
var html = generarDocumentoNodos(myData, hora);
print(html.substring(0, 500));
