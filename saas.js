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
    
    addCapitular(texto) {
        this.nodos.push(new NodoLiturgico(this.id + '_capitular', texto, 'Capitular', 'Sacerdote', 'Fuerte'));
        return this;
    }
    
    addLectura(texto) {
        this.nodos.push(new NodoLiturgico(this.id + '_lect', texto, 'Proclamacion', 'Lector', 'Fuerte'));
        return this;
    }
    
    addMonicion(texto) {
        this.nodos.push(new NodoLiturgico(this.id + '_monicion', texto, 'Monicion', 'Monicion', 'Fuerte'));
        return this;
    }
    
    addCanto(texto) {
        this.nodos.push(new NodoLiturgico(this.id + '_canto', texto, 'Canto', 'Asamblea', 'Canto'));
        return this;
    }
    
    addGuia(texto) {
        this.nodos.push(new NodoLiturgico(this.id + '_guia', texto, 'Guia', 'Ninguno', 'Fuerte'));
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

function applyLiturgicalColor(colorText) {
    const root = document.documentElement;
    if (!colorText) {
        root.style.setProperty('--brand-color', '#166534'); // Verde Ordinario por defecto
        return;
    }
    const txt = colorText.toLowerCase();
    if (txt.includes('morad') || txt.includes('púrpura') || txt.includes('purple')) {
        root.style.setProperty('--brand-color', '#6B21A8');
    } else if (txt.includes('rojo') || txt.includes('red')) {
        root.style.setProperty('--brand-color', '#B91C1C');
    } else if (txt.includes('blanc') || txt.includes('white') || txt.includes('dorad')) {
        root.style.setProperty('--brand-color', '#B45309'); // Dorado cálido para el impreso sobre fondo blanco
    } else if (txt.includes('rosa')) {
        root.style.setProperty('--brand-color', '#BE185D');
    } else {
        root.style.setProperty('--brand-color', '#166534'); // Verde
    }
}

function RENDERIZAR_NODO(nodo) {
    if (nodo.estado_aparicion === 'Omitido') return '';
    
    nodo.texto = SANITIZAR_TEXTO(nodo.texto);
    
    if (nodo.tipo_texto === 'SuperTitulo') {
        return `<h2 class="titulo-rito">${nodo.texto}</h2>\n`;
    } else if (nodo.tipo_texto === 'Titulo') {
        return `<h3 class="titulo-rito" style="font-size:1.2rem; margin-top:20px;">${nodo.texto}</h3>\n`;
    } else if (nodo.tipo_texto === 'Instruccion' || nodo.tipo_texto === 'Simbolo') {
        return `<strong class="rubrica-sacerdote">${nodo.texto}</strong>\n`;
    } else if (nodo.tipo_texto === 'Monicion') {
        return `<div class="monicion"><strong>MONICIÓN: </strong>${nodo.texto}</div>\n`;
    } else if (nodo.tipo_texto === 'Capitular') {
        // Para la oración Colecta y similares
        return `<div class="oracion-presidencial" style="text-align:justify; margin-bottom: 15px; margin-top: 10px; line-height: 1.8;">${nodo.texto}</div>\n`;
    } else if (nodo.tipo_texto === 'Proclamacion') {
        return window.formatLectura ? window.formatLectura(nodo.texto) : `<div class="oracion-capitular" style="text-align:justify; line-height: 1.5; margin-bottom: 20px;">${nodo.texto}</div>\n`;
    } else if (nodo.tipo_texto === 'Canto') {
        let lineas = nodo.texto.split('\n').map(l => {
            if (l.trim().startsWith('*')) return `<strong>${l.replace(/\*/g, '')}</strong><br>`;
            return `${l}<br>`;
        }).join('');
        return `<div class="canto-hymn" style="font-family: Georgia, serif; font-style: italic; color: #444; margin: 15px 0; padding-left: 20px; border-left: 2px solid var(--brand-color);">${lineas}</div>\n`;
    } else {
        let t = nodo.texto.trim();
        let prefix = "";
        
        if (nodo.tipo_texto === 'Pronunciado') {
            if (nodo.actor === 'Sacerdote') {
                if (nodo.estado_voz === 'Secreta') {
                    return `<div style="font-style: italic; color: #444; margin-bottom: 10px; margin-top: 5px;">${t}</div>\n`;
                }
                // Si la oración no tiene prefijo, no lo forzamos. Se asume que el Sacerdote lo lee con voz normal.
                return `<div style="margin-bottom: 15px; text-align: justify; line-height: 1.4;">${t}</div>\n`;
            } else if (nodo.actor === 'Asamblea') {
                if (!t.startsWith("R.") && !t.startsWith("R/") && !t.startsWith("T.") && !t.startsWith("R ")) {
                    prefix = `<span class="asamblea-rojo">R. </span>`;
                } else {
                    // Extraer la R. inicial y colorearla roja
                    t = t.replace(/^(R\.|R\/|T\.|R )\s*/i, "");
                    prefix = `<span class="asamblea-rojo">R. </span>`;
                }
                return `<div class="asamblea">${prefix}<span style="color: black; font-weight: bold;">${t}</span></div>\n`;
            }
        }
        
        return `<div style="margin-bottom: 10px;">${t}</div>\n`;
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
             // Por defecto permitimos flujo natural para que bloques largos (ej. cantos con muchas estrofas, lecturas) no dejen gaps inmensos
             html += RENDERIZAR_NODO(n[i]) + `\n`;
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
    const loginForm = document.getElementById('login-form');
    const landingScreen = document.getElementById('landing-screen');
    const dashboardScreen = document.getElementById('dashboard-screen');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            landingScreen.classList.remove('active');
            dashboardScreen.classList.add('active');
        });
    }

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
            let youtubeWorkspace = document.getElementById("youtube-workspace");
            let ordoWorkspace = document.getElementById("ordo-workspace");
            
            let ritualSelect = document.getElementById("ritual-select");
            let bautismoFields = document.getElementById("bautismo-fields");
            let matrimonioFields = document.getElementById("matrimonio-fields");
            let exequiasFields = document.getElementById("exequias-fields");
            let ritualGroup = document.getElementById("ritual-group");
            
            // Ocultar todos los workspaces básicos
            if(builderWorkspace) builderWorkspace.style.display = 'none';
            if(cancioneroWorkspace) cancioneroWorkspace.style.display = 'none';
            if(youtubeWorkspace) youtubeWorkspace.style.display = 'none';

            if (view === 'cancionero') {
                if(cancioneroWorkspace) cancioneroWorkspace.style.display = 'flex';
                currentMode = 'cancionero';
                return; // Stop here for cancionero
            } else if (view === 'youtube') {
                if(youtubeWorkspace) youtubeWorkspace.style.display = 'flex';
                currentMode = 'youtube';
                return;
            } else {
                if(builderWorkspace) builderWorkspace.style.display = 'flex';
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

    const globalRitualSelect = document.getElementById("ritual-select");
    if (globalRitualSelect) {
        globalRitualSelect.addEventListener('change', (e) => {
            const bautismoFields = document.getElementById("bautismo-fields");
            if (bautismoFields) bautismoFields.style.display = e.target.value === 'bautismo' ? 'block' : 'none';
        });
    }


    // Dynamic section builder
    const btnAddSection = document.getElementById('btn-add-section');
    const dynamicSections = document.getElementById('dynamic-sections');
    if (btnAddSection) {
        btnAddSection.addEventListener('click', () => {
            const item = document.createElement('div');
            item.className = 'canto-item';
            item.style = 'position: relative; flex-direction: column; align-items: stretch; background: var(--bg-dark); padding: 10px; border-radius: 6px; margin-top: 10px; border: 1px solid var(--border-color);';
            item.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                    <input type="text" placeholder="Ej: Intenciones de la Misa" value="Intenciones de la Misa" class="sec-title" style="flex:1; margin-right: 10px; font-weight: bold; background: transparent; border: none; border-bottom: 1px solid var(--gold-accent); color: white; padding: 4px;">
                    <button class="btn-delete-section" style="background: transparent; color: #ef4444; border: none; cursor: pointer; font-size: 1.2rem; display: flex; align-items: center; justify-content: center;" title="Eliminar este bloque">🗑️</button>
                </div>
                <textarea rows="3" class="sec-content" placeholder="1. Por nuestro Papa Francisco...\n2. Por nuestra comunidad..." style="width: 100%; background: rgba(0,0,0,0.2); border: 1px solid var(--border-color); color: #ccc; border-radius: 4px; padding: 8px; font-family: sans-serif; resize: vertical;"></textarea>
            `;
            item.querySelector('.btn-delete-section').addEventListener('click', () => {
                item.remove();
            });
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
                
                // --- Semáforo de Integridad (Candado Técnico) ---
                let semaforoError = null;
                const readingEvangelioLength = localData?.liturgia_palabra?.evangelio?.texto?.length || 0;
                
                if (hora === 'misa_laudes' && (!localData || !localData.laudes)) {
                    semaforoError = "Bloque de Laudes Mínimo requerido no encontrado. El Sacramentario no puede ser generado incompleto.";
                } else if (readingEvangelioLength > 0 && readingEvangelioLength < 100 && !isPlaceholder) {
                    semaforoError = "Fragmento de Evangelio demasiado corto (Detección < 100 caracteres). Lectura Corrupta.";
                }

                if (semaforoError) {
                    pdfView.innerHTML = `<div style="color:#B20000; padding:40px; text-align:center; border:2px solid #B20000; margin: 40px auto; max-width: 600px; background: #fffcfc;">
                        <h2 style="font-family:'Cinzel', serif;">FALLO DE INTEGRIDAD ESTRUCTURAL</h2>
                        <p style="font-size:16px;"><b>SEMÁFORO DE OFICIO: BLOQUEADO</b></p>
                        <p>${semaforoError}</p>
                        <p><i style="color:#666;">Generación abortada para prevenir desperdicio de material (Arquitectura Litúrgica). Revise la fuente de datos.</i></p>
                    </div>`;
                    generateBtn.innerHTML = "Error de Integridad";
                    return;
                }
                // --- Fin Semáforo ---

                if (localData && hasLocalReadings && !isPlaceholder) {
                    try {
                        console.log("Cerebro Offline Activo. Rendereando Data Pura.");
                        
                        let customBlocks = [];
                        document.querySelectorAll('#dynamic-sections .canto-item').forEach(el => {
                            const t = el.querySelector('.sec-title').value.trim();
                            const c = el.querySelector('.sec-content').value.trim();
                            if (t || c) {
                                customBlocks.push({title: t, content: c});
                            }
                        });
                        
                        applyLiturgicalColor(localData.color);
                        
                        let options = {
                            isEn: (document.getElementById('region-select') ? document.getElementById('region-select').value.startsWith('us_en') : false),
                            showMoniciones: document.getElementById('toggle-moniciones') ? document.getElementById('toggle-moniciones').checked : true,
                            showHomilia: document.getElementById('toggle-homilia') ? document.getElementById('toggle-homilia').checked : true,
                            customBlocks: customBlocks
                        };
                        if (hora === 'diario') {
                            const horasDelDia = ['oficio', 'laudes', 'misa_laudes', 'intermedia', 'visperas', 'completas', 'lectio'];
                            let isFirst = true;
                            let fragment = document.createDocumentFragment();
                            horasDelDia.forEach(h => {
                                try {
                                    options.hideHeader = !isFirst;
                                    let subsetHtml = generarDocumentoNodos(localData, h, options);
                                    if (subsetHtml && subsetHtml.trim() !== '') {
                                        let pageDiv = document.createElement('div');
                                        if (!isFirst) {
                                            pageDiv.style.pageBreakBefore = 'always';
                                        }
                                        pageDiv.innerHTML = subsetHtml;
                                        fragment.appendChild(pageDiv);
                                        isFirst = false;
                                    }
                                } catch(e) { console.warn("Error generando " + h, e); }
                            });
                            pdfView.innerHTML = '';
                            pdfView.appendChild(fragment);
                        } else {
                            options.hideHeader = false;
                            let subsetHtml = generarDocumentoNodos(localData, hora, options);
                            pdfView.innerHTML = subsetHtml;
                        }
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

                        
                        let customBlocks = [];
                        document.querySelectorAll('#dynamic-sections .canto-item').forEach(el => {
                            const t = el.querySelector('.sec-title').value.trim();
                            const c = el.querySelector('.sec-content').value.trim();
                            if (t || c) {
                                customBlocks.push({title: t, content: c});
                            }
                        });
                        
                        applyLiturgicalColor(data.color);
                        
                        let options = {
                            isEn: (document.getElementById('region-select') ? document.getElementById('region-select').value.startsWith('us_en') : false),
                            showMoniciones: document.getElementById('toggle-moniciones') ? document.getElementById('toggle-moniciones').checked : true,
                            showHomilia: document.getElementById('toggle-homilia') ? document.getElementById('toggle-homilia').checked : true,
                            customBlocks: customBlocks
                        };
                        if (hora === 'diario') {
                            const horasDelDia = ['oficio', 'laudes', 'misa_laudes', 'intermedia', 'visperas', 'completas', 'lectio'];
                            let isFirst = true;
                            let fragment = document.createDocumentFragment();
                            horasDelDia.forEach(h => {
                                try {
                                    options.hideHeader = !isFirst;
                                    let subsetHtml = generarDocumentoNodos(data, h, options);
                                    if (subsetHtml && subsetHtml.trim() !== '') {
                                        let pageDiv = document.createElement('div');
                                        if (!isFirst) {
                                            pageDiv.style.pageBreakBefore = 'always';
                                        }
                                        pageDiv.innerHTML = subsetHtml;
                                        fragment.appendChild(pageDiv);
                                        isFirst = false;
                                    }
                                } catch(e) { console.warn("Error generando " + h, e); }
                            });
                            pdfView.innerHTML = '';
                            pdfView.appendChild(fragment);
                        } else {
                            options.hideHeader = false;
                            let subsetHtml = generarDocumentoNodos(data, hora, options);
                            pdfView.innerHTML = subsetHtml;
                        }
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
                        
                        let customBlocks = [];
                        document.querySelectorAll('#dynamic-sections .canto-item').forEach(el => {
                            const t = el.querySelector('.sec-title').value.trim();
                            const c = el.querySelector('.sec-content').value.trim();
                            if (t || c) {
                                customBlocks.push({title: t, content: c});
                            }
                        });
                        
                        applyLiturgicalColor(data.color);
                        
                        let options = {
                            isEn: (document.getElementById('region-select') ? document.getElementById('region-select').value.startsWith('us_en') : false),
                            showMoniciones: document.getElementById('toggle-moniciones') ? document.getElementById('toggle-moniciones').checked : true,
                            showHomilia: document.getElementById('toggle-homilia') ? document.getElementById('toggle-homilia').checked : true,
                            customBlocks: customBlocks
                        };
                        if (hora === 'diario') {
                            const horasDelDia = ['oficio', 'laudes', 'misa_laudes', 'intermedia', 'visperas', 'completas', 'lectio'];
                            let isFirst = true;
                            let fragment = document.createDocumentFragment();
                            horasDelDia.forEach(h => {
                                try {
                                    options.hideHeader = !isFirst;
                                    let subsetHtml = generarDocumentoNodos(data, h, options);
                                    if (subsetHtml && subsetHtml.trim() !== '') {
                                        let pageDiv = document.createElement('div');
                                        if (!isFirst) {
                                            pageDiv.style.pageBreakBefore = 'always';
                                        }
                                        pageDiv.innerHTML = subsetHtml;
                                        fragment.appendChild(pageDiv);
                                        isFirst = false;
                                    }
                                } catch(e) { console.warn("Error generando " + h, e); }
                            });
                            pdfView.innerHTML = '';
                            pdfView.appendChild(fragment);
                        } else {
                            options.hideHeader = false;
                            let subsetHtml = generarDocumentoNodos(data, hora, options);
                            pdfView.innerHTML = subsetHtml;
                        }
                    });
            }
        }); // Simulate network load ended, we use real network!
    }); // CLOSE generateBtn.addEventListener

    window.formatLectura = function(texto) {
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
                 // NLM Drop Caps Regex
                 let punctuation = "";
                 let firstChar = "";
                 let desc = cleanP;
                 const match = cleanP.match(/^([«"¡¿\-_]*)([A-ZÁÉÍÓÚÑa-záéíóúñ])/);
                 if (match) {
                     punctuation = match[1];
                     firstChar = match[2].toUpperCase(); // Enforce uppercase drop cap
                     desc = cleanP.slice(match[0].length);
                 } else {
                     firstChar = cleanP.charAt(0);
                     desc = cleanP.slice(1);
                 }
                 blocks.push(`<p class="missal-paragraph first-par"><span class="smart-punctuation">${punctuation}</span><span class="drop-cap">${firstChar}</span>${desc}</p>`);
             } else {
                 blocks.push(`<p class="missal-paragraph">${cleanP}</p>`);
             }
        });
        
        return blocks.join("");
    };

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
    if (btnPdf) {
        btnPdf.addEventListener('click', async () => {
            const element = document.getElementById('pdf-view');
            
            if (element.innerText.includes('El documento generado aparecerá aquí') || element.innerText.includes('Compilando Rúbricas...')) {
                alert("Primero genera un documento usando el Asistente.");
                return;
            }

            const dateSelect = document.getElementById('date-select');
            const fecha = dateSelect ? dateSelect.value : null;
            if (!fecha || !window.liturgiaData || !window.liturgiaData[fecha]) {
                alert("No hay datos cargados para la fecha seleccionada.");
                return;
            }

            const dataDia = window.liturgiaData[fecha];
    window.generarPayloadLaTeX = function(dataDia) {
        let lp = dataDia.liturgia_palabra || {};
        
        let t_liturgico = (dataDia.tiempo_liturgico || "").toLowerCase();
        let c_entrada = "Vienen con alegría Señor";
        let c_ofertorio = "Te Ofrecemos Padre Nuestro";
        let c_comunion = "Pescador de Hombres";
        let c_salida = "Demos Gracias al Señor";

        if (t_liturgico.includes('cuaresma')) {
            c_entrada = "Perdona a tu pueblo Señor";
            c_ofertorio = "Te Presentamos el Vino y el Pan";
            c_comunion = "Saber que vendrás";
            c_salida = "Honor y Gloria a Ti (o Prepara tu Camino)";
        } else if (t_liturgico.includes('pascua')) {
            c_entrada = "El Señor Resucitó, Aleluya";
            c_ofertorio = "Saber que vendrás";
            c_comunion = "Yo soy el Pan de Vida";
            c_salida = "Reina del Cielo Alégrate";
        } else if (t_liturgico.includes('adviento')) {
            c_entrada = "Ven, Ven, Señor no tardes";
            c_ofertorio = "Saber que vendrás";
            c_comunion = "Un pueblo que camina";
            c_salida = "Santa María de la Esperanza";
        }

        function getRawCanto(titulo) {
            if (window.cantosDB && window.cantosDB[titulo]) {
                return { titulo: titulo, letra: window.cantosDB[titulo].letra };
            }
            return null;
        }

        let cantoEntrada = getRawCanto(c_entrada);
        let cantoOfertorio = getRawCanto(c_ofertorio);
        let cantoComunion = getRawCanto(c_comunion);
        let cantoSalida = getRawCanto(c_salida);

        // -- LIMPIADORES DE DATOS PARA LATEX --
        function limpiarRito(texto) {
            if (!texto) return "";
            return texto.replace(/Se dice el Credo\.?/gi, "")
                        .replace(/Se dice Credo\.?/gi, "")
                        .trim();
        }

        function limpiarLectura(lectura) {
            if (!lectura) return null;
            let cita = (lectura.cita || "").trim();
            let texto = limpiarRito(lectura.texto || "");
            
            // Si el texto empieza con corchetes, los removemos completamente (suele ser el tema)
            texto = texto.replace(/^\[.*?\]\n*/g, '').trim();

            if (!cita && texto) {
                // La cita suele estar en la primera línea del texto cuando viene incrustada
                let lines = texto.split('\n');
                cita = lines[0].trim();
                texto = lines.slice(1).join('\n').trim();
            }
            
            // Limpiar corchetes residuales si los hay
            texto = texto.replace(/\[/g, "").replace(/\]/g, "");
            
            return { cita, texto };
        }

        function limpiarSalmo(salmoObj) {
            if (!salmoObj) return null;
            let cita = (salmoObj.cita || "").trim();
            let respuesta = (salmoObj.respuesta || "").trim();
            let texto = limpiarRito(salmoObj.texto || "");
            
            texto = texto.replace(/RI\s*([A-Z])/g, "R. $1").replace(/R\|\s*([A-Z])/g, "R. $1");
            respuesta = respuesta.replace(/RI\s*([A-Z])/g, "R. $1").replace(/R\|\s*([A-Z])/g, "R. $1");
            
            return { cita, respuesta, texto };
        }

        function limpiarOficio(oficioObj) {
            if (!oficioObj) return null;
            const nuevoOficio = JSON.parse(JSON.stringify(oficioObj));
            for (let key in nuevoOficio) {
                if (nuevoOficio[key] && typeof nuevoOficio[key].texto === 'string') {
                    // Limpiar doxología de salmos y cánticos
                    nuevoOficio[key].texto = nuevoOficio[key].texto
                        .replace(/(\n*\s*Se dice:\n*Gloria al Padre[\s\S]*)/i, '')
                        .replace(/(\n*\s*No se dice\n*Gloria al Padre[\s\S]*)/i, '')
                        .trim();
                }
            }
            return nuevoOficio;
        }

        let primera = limpiarLectura(lp.primera_lectura);
        let salmoResp = limpiarSalmo(lp.salmo_responsorial || lp.salmo);
        let segunda = limpiarLectura(lp.segunda_lectura);
        let evang = limpiarLectura(lp.evangelio);

        const checkMoni = document.getElementById('check-moniciones');
        const includeMoniciones = checkMoni ? checkMoni.checked : true;
        let monicionesMisa = {
            entrada: dataDia.monicion_entrada || "",
            primera_lectura: "",
            segunda_lectura: "",
            evangelio: ""
        };
        if (includeMoniciones && window.obtenerMonicionesPorTiempo) {
            const monis = window.obtenerMonicionesPorTiempo(t_liturgico);
            if (!monicionesMisa.entrada) monicionesMisa.entrada = monis.entrada;
            monicionesMisa.primera_lectura = monis.primera_lectura;
            monicionesMisa.segunda_lectura = monis.segunda_lectura;
            monicionesMisa.evangelio = monis.evangelio;
        }
        if (!includeMoniciones) {
            monicionesMisa = { entrada: "", primera_lectura: "", segunda_lectura: "", evangelio: "" };
        }

        const payload = {
            dia_liturgico: dataDia.titulo_celebracion || (dataDia.metadatos && dataDia.metadatos.titulo_primario) || "Feria",
            fecha_texto: dataDia.fecha,
            misa: {
                canto_entrada: cantoEntrada,
                canto_ofertorio: cantoOfertorio,
                canto_comunion: cantoComunion,
                canto_salida: cantoSalida,
                monicion_entrada: monicionesMisa.entrada,
                monicion_primera_lectura: monicionesMisa.primera_lectura,
                monicion_segunda_lectura: monicionesMisa.segunda_lectura,
                monicion_evangelio: monicionesMisa.evangelio,
                antifona_entrada: lp.antifona_entrada || "",
                oracion_colecta: lp.oracion_colecta || "",
                primera_lectura: primera,
                salmo: salmoResp,
                segunda_lectura: segunda,
                evangelio: evang,
                aclamacion_evangelio: lp.aclamacion_evangelio || "",
                secuencia: lp.secuencia || "",
                gloria: !!lp.gloria,
                credo: !!lp.credo,
                oracion_fieles: lp.oracion_fieles || ""
            }
        };

        const officeSelect = document.getElementById('office-select');
        const integrarOficio = officeSelect ? officeSelect.value : 'ninguno';
        
        if (integrarOficio === 'laudes' || integrarOficio === 'diario' || integrarOficio === 'misa_laudes') {
            if (dataDia.laudes) payload.laudes = limpiarOficio(dataDia.laudes);
        }
        if (integrarOficio === 'visperas' || integrarOficio === 'diario') {
            if (dataDia.visperas) payload.visperas = limpiarOficio(dataDia.visperas);
        }

        return payload;
    };

    // PDF Export function
    const btnPdf = document.getElementById('generar-pdf');
    if (btnPdf) {
        btnPdf.addEventListener('click', async () => {
            const element = document.getElementById('pdf-view');
            
            if (element && (element.innerText.includes('El documento generado aparecerá aquí') || element.innerText.includes('Compilando Rúbricas...'))) {
                alert("Primero genera un documento usando el Asistente.");
                return;
            }

            const dateSelect = document.getElementById('date-select');
            const fecha = dateSelect ? dateSelect.value : null;
            if (!fecha || !window.liturgiaData || !window.liturgiaData[fecha]) {
                alert("No hay datos cargados para la fecha seleccionada.");
                return;
            }

            const dataDia = window.liturgiaData[fecha];
            const payload = window.generarPayloadLaTeX(dataDia);

            const originalHtml = btnPdf.innerHTML;
            try {
                btnPdf.innerHTML = "Generando PDF...";
                btnPdf.disabled = true;

                const response = await fetch('http://localhost:8086/generate-pdf', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                
                if (!response.ok) {
                    let errorMessage = `HTTP ${response.status} - ${response.statusText}`;
                    try {
                        const errorData = await response.json();
                        errorMessage = errorData.error || errorMessage;
                    } catch (err) {
                        const errorText = await response.text();
                        console.error("Respuesta del servidor no es JSON:", errorText);
                        errorMessage = "Error interno del servidor (Revisar logs en la terminal de Python).";
                    }
                    alert("Error generando PDF: " + errorMessage);
                    return;
                }
                
                const blob = await response.blob();
                const blobUrl = URL.createObjectURL(blob);
                
                const a = document.createElement('a');
                a.href = blobUrl;
                a.download = "Subsidio_" + fecha + ".pdf";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(blobUrl);
                
            } catch (e) {
                alert("Error de conexión al servidor Padre PRO: " + e);
            } finally {
                btnPdf.innerHTML = originalHtml;
                btnPdf.disabled = false;
            }
        });
    }

    // YouTube Controller
    window.loadYoutubePath = function(query) {
        let safeQuery = encodeURIComponent(query + " católico parroquia");
        window.open(`https://www.youtube.com/results?search_query=${safeQuery}`, '_blank');
    };

    const ytSearchBtn = document.getElementById('youtube-search-btn');
    if(ytSearchBtn) {
        ytSearchBtn.addEventListener('click', () => {
            let val = document.getElementById('youtube-search-input').value;
            if(val) window.loadYoutubePath(val);
        });
    }

    // -----------------------------------------------------
    // PADRE PRO CONTROLLER (Fase 9)
    // -----------------------------------------------------
    const btnPadreProToggle = document.getElementById("padre-pro-toggle");
    const padreProWindow = document.getElementById("padre-pro-window");
    const btnPadreProClose = document.getElementById("padre-pro-close");
    const btnPadreProSend = document.getElementById("padre-pro-send");
    const inpPadreProText = document.getElementById("padre-pro-text");
    const chatPadrePro = document.getElementById("padre-pro-chat");

    if (btnPadreProToggle && padreProWindow) {
        btnPadreProToggle.addEventListener("click", () => {
            padreProWindow.style.display = padreProWindow.style.display === "none" ? "flex" : "none";
        });
        btnPadreProClose.addEventListener("click", () => {
            padreProWindow.style.display = "none";
        });

        const enviarMensajePadre = async () => {
            const texto = inpPadreProText.value.trim();
            if (!texto) return;

            // Burbuja Usuario
            const userMsg = document.createElement("div");
            userMsg.className = "chat-message user";
            userMsg.innerHTML = `<p>${texto}</p>`;
            chatPadrePro.appendChild(userMsg);
            
            inpPadreProText.value = "";
            chatPadrePro.scrollTop = chatPadrePro.scrollHeight;

            // Burbuja Loading
            const botMsg = document.createElement("div");
            botMsg.className = "chat-message bot";
            botMsg.innerHTML = `<p><span class="status-indicator">Consultando el Magisterio...</span></p>`;
            chatPadrePro.appendChild(botMsg);
            chatPadrePro.scrollTop = chatPadrePro.scrollHeight;

            try {
                const response = await fetch("http://localhost:8085/chat", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ message: texto, session_id: "liturgiapro_user" })
                });

                if (response.ok) {
                    const data = await response.json();
                    if(window.marked) {
                        botMsg.innerHTML = window.marked.parse(data.response);
                    } else {
                        botMsg.innerHTML = `<p>${data.response}</p>`;
                    }
                } else {
                    botMsg.innerHTML = `<p style="color:red">Error: El servidor del Padre PRO no está respondiendo (Asegúrate de tener python3 padre_pro_server.py corriendo).</p>`;
                }
            } catch (err) {
                botMsg.innerHTML = `<p style="color:red">Error de conexión: Verifica que tu servidor local Padre PRO esté vivo en el puerto 8085.</p>`;
            }
            chatPadrePro.scrollTop = chatPadrePro.scrollHeight;
        };

        btnPadreProSend.addEventListener("click", enviarMensajePadre);
        inpPadreProText.addEventListener("keypress", (e) => {
            if (e.key === "Enter") enviarMensajePadre();
        });
    }
});
