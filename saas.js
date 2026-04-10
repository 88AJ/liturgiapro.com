document.addEventListener('DOMContentLoaded', () => {
    // Precargar letras de cantos (Offline bypass activo)
    window.cantosDB = window.cantosDB || {};

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
            navItems.forEach(n => n.classList.remove('active'));
            item.classList.add('active');
            
            if (item.id === 'nav-bulletin') {
                liturgiaForm.style.display = 'none';
                boletinForm.style.display = 'block';
                currentMode = 'boletin';
            } else {
                liturgiaForm.style.display = 'block';
                boletinForm.style.display = 'none';
                currentMode = 'liturgia';
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

    generateBtn.addEventListener('click', () => {
        pdfView.innerHTML = '<div class="empty-state">Generando con IA...</div>';
        
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
                        let doc = generarDocumento(localData, hora);
                        pdfView.innerHTML = markdownToHTML(doc);
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

                        let doc = generarDocumento(data, hora);
                        pdfView.innerHTML = markdownToHTML(doc);
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
                        let doc = generarDocumento(data, hora);
                        pdfView.innerHTML = markdownToHTML(doc);
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
        
        const upperTiempo = (data.tiempo_liturgico || "").toUpperCase();
        const isCuaresma = upperTiempo.includes("CUARESMA");
        const isAdviento = upperTiempo.includes("ADVIENTO");
        
        let aplicaGloria = data.gloria;
        if ((isCuaresma || isAdviento) && (data.color !== "Blanco" && data.color !== "Rojo")) {
            aplicaGloria = false;
        }

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
        out += `<div style="text-align:center; border-bottom: 2px solid var(--brand-color); padding-bottom: 20px; margin-bottom: 20px;">\n`;
        if (isStandaloneOffice) {
            out += `<h2>${isEn ? 'Liturgy of the Hours' : 'Liturgia de las Horas'}: ${hora.charAt(0).toUpperCase() + hora.slice(1)}</h2>\n`;
        } else {
            let tiempoTexto = data.tiempo_liturgico ? data.tiempo_liturgico.toUpperCase() : (data.titulo ? data.titulo.toUpperCase() : "MISA DEL DÍA");
            out += `<h2>${tiempoTexto}</h2>\n`;
        }
        if (data.dia_semana) {
            out += `<h3 style="color: #666;">${data.dia_semana} (${data.color})</h3>\n`;
        } else {
            out += `<h3 style="color: #666;">Color Litúrgico: ${data.color}</h3>\n`;
        }
        out += `</div>\n\n`;

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
            out += `### ${isEn ? "INTRODUCTORY RITES" : "RITOS INICIALES"}\n<p class="missal-rubric" style="text-align:center; font-weight:bold; margin-bottom:12px;">(${isEn ? "Stand" : "De pie"})</p>\n\n`;
            
            if (data.monicion_entrada && !isEn) {
                out += `<div class="missal-block"><p class="missal-monicion" style="font-style:italic; color:#555; margin-bottom:10px;">${data.monicion_entrada}</p></div>\n`;
            }
            
            out += `**${sNum++}. ${isEn ? "Entrance Chant:" : "Canto de Entrada:"}** *${cantos.entrada}*\n\n`;
            
            let antEnt = data.antifona_entrada || (isEn ? "Come, you whom my Father has blessed, receive the kingdom prepared for you." : "Vengan, benditos de mi Padre, reciban en herencia el reino preparado para ustedes desde la creación del mundo.");
            out += `**${sNum++}. ${isEn ? "Entrance Antiphon" : "Antífona de Entrada"}**\n**${isEn ? "Priest" : "Sacerdote"}:** ${antEnt}\n\n`;
            
            let ritoPen = data.rito_penitencial || (isEn ? "I confess to almighty God..." : "Yo confieso ante Dios todopoderoso y ante ustedes, hermanos, que he pecado mucho de pensamiento, palabra, obra y omisión. Por mi culpa, por mi culpa, por mi gran culpa. Por eso ruego a santa María, siempre Virgen, a los ángeles, a los santos y a ustedes, hermanos, que intercedan por mí ante Dios, nuestro Señor.");
            out += `**${sNum++}. ${isEn ? "Penitential Act" : "Rito Penitencial"}**\n**${isEn ? "Priest" : "Sacerdote"}:** ${isEn ? "Brethren (brothers and sisters), let us acknowledge our sins..." : "Hermanos: reconozcamos nuestros pecados."}\n**${isEn ? "People" : "Asamblea"}:** ${ritoPen}\n**${isEn ? "Priest" : "Sacerdote"}:** ${isEn ? "May almighty God have mercy on us..." : "Dios todopoderoso tenga misericordia de nosotros..."}\n**${isEn ? "People" : "Asamblea"}:** ${isEn ? "Amen." : "Amén."}\n**${isEn ? "Priest" : "Sacerdote"}:** ${isEn ? "Lord, have mercy." : "Señor, ten piedad."}\n**${isEn ? "People" : "Asamblea"}:** ${isEn ? "Lord, have mercy." : "Señor, ten piedad."}\n**${isEn ? "Priest" : "Sacerdote"}:** ${isEn ? "Christ, have mercy." : "Cristo, ten piedad."}\n**${isEn ? "People" : "Asamblea"}:** ${isEn ? "Christ, have mercy." : "Cristo, ten piedad."}\n**${isEn ? "Priest" : "Sacerdote"}:** ${isEn ? "Lord, have mercy." : "Señor, ten piedad."}\n**${isEn ? "People" : "Asamblea"}:** ${isEn ? "Lord, have mercy." : "Señor, ten piedad."}\n\n`;
            
            // SALMODIA INTEGRADA
            if (hora === "laudes" || hora === "visperas") {
                out += `-----\n\n### ${isEn ? "INTEGRATED PSALMODY" : "SALMODIA INTEGRADA"} (${hora.toUpperCase()})\n\n`;
                const salmodia = data[hora];
                if (salmodia) {
                    if (salmodia.salmo1) {
                         out += `**${sNum++}. ${isEn ? "First Psalm:" : "Primer Salmo:"}**\n**${isEn ? "People" : "Asamblea"}:** ${salmodia.salmo1.antifona}\n\n`;
                         let salmoP = salmodia.salmo1.texto.split("\n\n");
                         salmoP.forEach((estrofa, index) => {
                             let l = index % 2 === 0 ? "Lector 1" : "Lector 2";
                             out += `**${l}:**\n${estrofa}\n\n`;
                         });
                         out += `**${isEn ? "People" : "Asamblea"}:** ${isEn ? "Glory to the Father, and to the Son..." : "Gloria al Padre, y al Hijo, y al Espíritu Santo..."}\n${salmodia.salmo1.antifona}\n\n`;
                    }
                    if (salmodia.cantico_at || salmodia.salmo2) {
                         let s2 = salmodia.cantico_at || salmodia.salmo2;
                         let nt = salmodia.cantico_at ? (isEn ? "OT Canticle" : "Cántico AT") : (isEn ? "Second Psalm" : "Segundo Salmo");
                         out += `**${sNum++}. ${nt}:**\n**${isEn ? "People" : "Asamblea"}:** ${s2.antifona}\n\n`;
                         let salmoP = s2.texto.split("\n\n");
                         salmoP.forEach((estrofa, index) => {
                             let l = index % 2 === 0 ? "Lector 1" : "Lector 2";
                             out += `**${l}:**\n${estrofa}\n\n`;
                         });
                         if(!salmodia.cantico_at) out += `**${isEn ? "People" : "Asamblea"}:** ${isEn ? "Glory to the Father..." : "Gloria al Padre..."}\n`;
                         out += `${s2.antifona}\n\n`;
                    }
                    if (salmodia.salmo2 && salmodia.cantico_nt) { // Visperas
                         let s3 = salmodia.cantico_nt;
                         out += `**${sNum++}. ${isEn ? "NT Canticle:" : "Cántico NT:"}**\n**${isEn ? "People" : "Asamblea"}:** ${s3.antifona}\n\n`;
                         s3.texto.split("\n\n").forEach((estrofa, index) => {
                             let l = index % 2 === 0 ? "Lector 1" : "Lector 2";
                             out += `**${l}:**\n${estrofa}\n\n`;
                         });
                         out += `**${isEn ? "People" : "Asamblea"}:** ${isEn ? "Glory to the Father..." : "Gloria al Padre..."}\n${s3.antifona}\n\n`;
                    }
                }
            }
            
            // CONCLUSION DE RITOS INICIALES
            out += `-----\n\n### ${isEn ? "CONCLUSION OF INTRODUCTORY RITES" : "CONCLUSIÓN DE RITOS INICIALES"}\n\n`;
            if (aplicaGloria) {
            let gloriaEs = "Gloria a Dios en el cielo,<br>y en la tierra paz a los hombres que ama el Señor.<br>Por tu inmensa gloria te alabamos,<br>te bendecimos, te adoramos,<br>te glorificamos, te damos gracias,<br>Señor Dios, Rey celestial,<br>Dios Padre todopoderoso.<br><br>Señor, Hijo único, Jesucristo.<br>Señor Dios, Cordero de Dios, Hijo del Padre;<br>tú que quitas el pecado del mundo,<br>ten piedad de nosotros;<br>tú que quitas el pecado del mundo,<br>atiende nuestra súplica;<br>tú que estás sentado a la derecha del Padre,<br>ten piedad de nosotros;<br><br>porque sólo tú eres Santo, sólo tú Señor,<br>sólo tú Altísimo, Jesucristo,<br>con el Espíritu Santo en la gloria de Dios Padre.<br>Amén.";
            let gloriaEn = "Glory to God in the highest,<br>and on earth peace to people of good will.<br>We praise you,<br>we bless you,<br>we adore you,<br>we glorify you,<br>we give you thanks for your great glory,<br>Lord God, heavenly King,<br>O God, almighty Father.<br><br>Lord Jesus Christ, Only Begotten Son,<br>Lord God, Lamb of God, Son of the Father,<br>you take away the sins of the world,<br>have mercy on us;<br>you take away the sins of the world,<br>receive our prayer;<br>you are seated at the right hand of the Father,<br>have mercy on us.<br><br>For you alone are the Holy One,<br>you alone are the Lord,<br>you alone are the Most High,<br>Jesus Christ,<br>with the Holy Spirit,<br>in the glory of God the Father.<br>Amen.";
            out += `<div class="missal-block"><p class="missal-heading">Gloria</p><p class="missal-paragraph" style="text-align:center;">${isEn ? gloriaEn : gloriaEs}</p></div>\n\n`;
            }
            
            let colecta = data.oracion_colecta || (isEn ? "Almighty ever-living God..." : "Dios todopoderoso y eterno, aumenta en nosotros la fe, la esperanza y la caridad...");
            out += `<div class="missal-block"><p class="missal-heading">${isEn ? "Collect" : "Oración Colecta"}</p><p class="missal-paragraph">${isEn ? "Let us pray." : "Oremos."} ${colecta}</p><p class="missal-rubric">R. ${isEn ? "Amen." : "Amén."}</p></div>\n\n`;
            
            // LITURGIA DE LA PALABRA
            out += `-----\n\n### ${isEn ? "LITURGY OF THE WORD" : "LITURGIA DE LA PALABRA"}\n<p class="missal-rubric" style="text-align:center; font-weight:bold; margin-bottom:12px;">(${isEn ? "Sit" : "Sentados"})</p>\n\n`;
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
            if (isCuaresma) {
                if (!lp.aclamacion_evangelio || aclv.toUpperCase().includes("ALELUYA") || aclv.toUpperCase().includes("ALLELUIA")) {
                    aclv = aclv.replace(/Aleluya/ig, "Honor y gloria a ti, Señor Jesús").replace(/Alleluia/ig, "Praise to you, Lord Jesus Christ");
                }
            }
            out += `<div class="missal-block">`;
            out += `<p class="missal-rubric" style="font-weight:bold; margin-bottom:4px;">(${isEn ? "Stand" : "De pie"})</p>\n`;
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
            
            out += `<div class="missal-block"><p class="missal-rubric" style="font-weight:bold; margin-bottom:4px;">(${isEn ? "Sit" : "Sentados"})</p><p class="missal-heading">${isEn ? "Homily" : "Homilía"}</p><p class="missal-rubric">${isEn ? "The priest gives the homily." : "El sacerdote pronuncia la homilía."}</p></div>\n\n`;
            
            if (data.reflexion_homiletica && !isEn) {
                out += `<div class="missal-block">\n`;
                out += `<p class="missal-heading" style="font-size: 11pt; color:#444;">Ideas Homiléticas (Gemini AI)</p>\n`;
                out += `<div class="missal-paragraph" style="font-style:italic; font-size:10pt;">${data.reflexion_homiletica.replace(/\n\n/g, '<br><br>')}</div>\n`;
                out += `</div>\n\n`;
            }
            
            if (lp.segunda_lectura || aplicaGloria) {
                let credoEs = "Creo en Dios, Padre todopoderoso,<br>Creador del cielo y de la tierra.<br>Creo en Jesucristo, su único Hijo, nuestro Señor,<br>que fue concebido por obra y gracia del Espíritu Santo,<br>nació de santa María Virgen,<br>padeció bajo el poder de Poncio Pilato,<br>fue crucificado, muerto y sepultado,<br>descendió a los infiernos,<br>al tercer día resucitó de entre los muertos,<br>subió a los cielos<br>y está sentado a la derecha de Dios, Padre todopoderoso.<br>Desde allí ha de venir a juzgar a vivos y muertos.<br><br>Creo en el Espíritu Santo,<br>la santa Iglesia católica,<br>la comunión de los santos,<br>el perdón de los pecados,<br>la resurrección de la carne<br>y la vida eterna. Amén.";
                let credoEn = "I believe in God, the Father almighty,<br>Creator of heaven and earth,<br>and in Jesus Christ, his only Son, our Lord,<br>who was conceived by the Holy Spirit,<br>born of the Virgin Mary,<br>suffered under Pontius Pilate,<br>was crucified, died and was buried;<br>he descended into hell;<br>on the third day he rose again from the dead;<br>he ascended into heaven,<br>and is seated at the right hand of God the Father almighty;<br>from there he will come to judge the living and the dead.<br><br>I believe in the Holy Spirit,<br>the holy catholic Church,<br>the communion of saints,<br>the forgiveness of sins,<br>the resurrection of the body,<br>and life everlasting. Amen.";
                
                out += `<div class="missal-block"><p class="missal-rubric" style="font-weight:bold; margin-bottom:4px;">(${isEn ? "Stand" : "De pie"})</p><p class="missal-heading">${isEn ? "Profession of Faith" : "Profesión de Fe"}</p><p class="missal-paragraph" style="text-align:center;">${isEn ? credoEn : credoEs}</p></div>\n\n`;
            }
            
            let precesOficio = "";
            if (hora === "laudes" && data.laudes) precesOficio = data.laudes.preces;
            if (hora === "visperas" && data.visperas) precesOficio = data.visperas.preces;
            let preces = lp.preces || precesOficio || (isEn ? "Hear us, O Lord, and grant your Church peace and unity." : "Te pedimos, Señor, escucha nuestra oración, y concede a tu Iglesia la paz y la unidad que te suplica.");
            
            // Format Preces intelligently into bullets if multiple paragraphs
            let precesFormatted = preces.split(/\n+/).filter(p => p.trim() !== '').map(p => `• ${p.trim()}`).join('<br><br>');
            if(precesFormatted.length < 5) precesFormatted = preces.replace(/\n/g, '<br>');
            
            out += `<div class="missal-block"><p class="missal-rubric" style="font-weight:bold; margin-bottom:4px;">(${isEn ? "Stand" : "De pie"})</p><p class="missal-heading">${isEn ? "Universal Prayer" : "Oración de los Fieles"}</p><p class="missal-rubric">${isEn ? "Let us pray to God the Father:" : "A Dios Padre, dirijamos nuestra súplica:"}</p><p class="missal-rubric">R. ${isEn ? "We pray you, hear us." : "Te rogamos, óyenos."}</p><div class="missal-paragraph" style="margin-top:10px; margin-bottom:15px; margin-left:15px; text-align:justify;">${precesFormatted}</div><p class="missal-rubric">${isEn ? "Hear our prayers, O Father." : "Escucha Padre nuestras oraciones."}</p><p class="missal-rubric">R. ${isEn ? "Our Father, who art in heaven..." : "Padre nuestro, que estás en el cielo..."}</p></div>\n\n`;
            
            // LITURGIA EUCARISTICA
            out += `-----\n\n### ${isEn ? "LITURGY OF THE EUCHARIST" : "LITURGIA EUCARÍSTICA"}\n<p class="missal-rubric" style="text-align:center; font-weight:bold; margin-bottom:12px;">(${isEn ? "Sit" : "Sentados"})</p>\n\n`;
            out += `<div class="missal-block"><p class="missal-heading">${isEn ? "Offertory Chant" : "Canto de Ofertorio"}</p><p class="missal-citation">${cantos.ofertorio}</p></div>\n\n`;
            
            let le = data.liturgia_eucaristica || {};
            let ofrendas = le.oracion_ofrendas || (isEn ? "Receive, O Lord, the offerings of your people..." : "Recibe, Señor, las ofrendas de tu pueblo, y concédenos que este sacrificio nos alcance la gracia que te pedimos. Por Jesucristo nuestro Señor.");
            out += `<div class="missal-block"><p class="missal-rubric" style="font-weight:bold; margin-bottom:4px;">(${isEn ? "Stand" : "De pie"})</p><p class="missal-heading">${isEn ? "Prayer over the Offerings" : "Oración sobre las Ofrendas"}</p><p class="missal-paragraph">${ofrendas}</p><p class="missal-rubric">R. ${isEn ? "Amen." : "Amén."}</p></div>\n\n`;
            
            // ORDINARY OF THE MASS (EUCHARISTIC PRAYER)
            out += `<div class="missal-block"><p class="missal-heading">${isEn ? "Preface Dialogue" : "Diálogo del Prefacio"}</p>`;
            out += `<p class="missal-rubric">V. ${isEn ? "The Lord be with you." : "El Señor esté con ustedes."}<br>R. ${isEn ? "And with your spirit." : "Y con tu espíritu."}<br>V. ${isEn ? "Lift up your hearts." : "Levantemos el corazón."}<br>R. ${isEn ? "We lift them up to the Lord." : "Lo tenemos levantado hacia el Señor."}<br>V. ${isEn ? "Let us give thanks to the Lord our God." : "Demos gracias al Señor, nuestro Dios."}<br>R. ${isEn ? "It is right and just." : "Es justo y necesario."}</p></div>\n\n`;
            
            out += `<div class="missal-block"><p class="missal-heading">${isEn ? "Sanctus" : "Santo"}</p><p class="missal-paragraph" style="text-align:center;">${isEn ? "Holy, Holy, Holy Lord God of hosts.<br>Heaven and earth are full of your glory.<br>Hosanna in the highest.<br>Blessed is he who comes in the name of the Lord.<br>Hosanna in the highest." : "Santo, Santo, Santo es el Señor,<br>Dios del Universo.<br>Llenos están el cielo y la tierra de tu gloria.<br>Hosanna en el cielo.<br>Bendito el que viene en nombre del Señor.<br>Hosanna en el cielo."}</p></div>\n\n`;
            
            out += `<div class="missal-block"><p class="missal-rubric" style="font-weight:bold; margin-bottom:4px;">(${isEn ? "Kneel" : "De rodillas"})</p><p class="missal-heading">${isEn ? "Eucharistic Prayer" : "Plegaria Eucarística"}</p><p class="missal-rubric">${isEn ? "The priest prays the Eucharistic Prayer. After the consecration:" : "El sacerdote pronuncia la Plegaria Eucarística. Tras la consagración:"}</p><p class="missal-rubric">V. ${isEn ? "The mystery of faith." : "Éste es el Sacramento de nuestra fe."}</p><p class="missal-rubric">R. ${isEn ? "We proclaim your Death, O Lord, and profess your Resurrection until you come again." : "Anunciamos tu muerte, proclamamos tu resurrección. ¡Ven, Señor Jesús!"}</p></div>\n\n`;
            
            out += `<div class="missal-block"><p class="missal-rubric" style="font-weight:bold; margin-bottom:4px;">(${isEn ? "Stand" : "De pie"})</p><p class="missal-heading">${isEn ? "Communion Rite" : "Rito de la Comunión"}</p><p class="missal-paragraph" style="text-align:justify;">${isEn ? "Our Father, who art in heaven, hallowed be thy name; thy kingdom come, thy will be done on earth as it is in heaven. Give us this day our daily bread, and forgive us our trespasses, as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil." : "Padre nuestro, que estás en el cielo, santificado sea tu Nombre; venga a nosotros tu reino; hágase tu voluntad en la tierra como en el cielo. Danos hoy nuestro pan de cada día; perdona nuestras ofensas, como también nosotros perdonamos a los que nos ofenden; no nos dejes caer en la tentación, y líbranos del mal."}</p></div>\n\n`;
            
            out += `<div class="missal-block"><p class="missal-heading">${isEn ? "Agnus Dei" : "Cordero de Dios"}</p><p class="missal-paragraph" style="text-align:center;">${isEn ? "Lamb of God, you take away the sins of the world, have mercy on us.<br>Lamb of God, you take away the sins of the world, have mercy on us.<br>Lamb of God, you take away the sins of the world, grant us peace." : "Cordero de Dios, que quitas el pecado del mundo, ten piedad de nosotros.<br>Cordero de Dios, que quitas el pecado del mundo, ten piedad de nosotros.<br>Cordero de Dios, que quitas el pecado del mundo, danos la paz."}</p></div>\n\n`;
            
            out += `<div class="missal-block"><p class="missal-rubric" style="font-weight:bold; margin-bottom:4px;">(${isEn ? "Kneel" : "De rodillas"})</p><p class="missal-heading">${isEn ? "Invitation to Communion" : "Invitación a la Comunión"}</p><p class="missal-rubric">V. ${isEn ? "Behold the Lamb of God, behold him who takes away the sins of the world. Blessed are those called to the supper of the Lamb." : "Este es el Cordero de Dios, que quita el pecado del mundo. Dichosos los invitados a la cena del Señor."}</p><p class="missal-rubric">R. ${isEn ? "Lord, I am not worthy that you should enter under my roof, but only say the word and my soul shall be healed." : "Señor, no soy digno de que entres en mi casa, pero una palabra tuya bastará para sanarme."}</p></div>\n\n`;
            
            let antc = le.antifona_comunion || (isEn ? "Bring your hand and feel the place of the nails, and do not be unbelieving but believe." : "Acerca tu mano, trae tu dedo y explora mis llagas; y no seas incrédulo, sino creyente.");
            out += `<div class="missal-block"><p class="missal-heading">${isEn ? "Communion Antiphon" : "Antífona de la Comunión"}</p><p class="missal-paragraph">${antc}</p></div>\n\n`;
            
            out += `<div class="missal-block"><p class="missal-heading">${isEn ? "Communion Chant" : "Canto de Comunión"}</p><p class="missal-citation">${cantos.comunion}</p></div>\n\n`;
            
            let despues = le.oracion_despues_comunion || (isEn ? "Grant, we pray, almighty God, that our reception of this paschal Sacrament may have a continuing effect in our minds and hearts. Through Christ our Lord." : "Concédenos, Dios todopoderoso, que la eficacia de este sacramento limpie nuestras culpas y nos conduzca por el camino recto. Por Jesucristo nuestro Señor.");
            out += `<div class="missal-block"><p class="missal-rubric" style="font-weight:bold; margin-bottom:4px;">(${isEn ? "Stand" : "De pie"})</p><p class="missal-heading">${isEn ? "Prayer after Communion" : "Oración después de la Comunión"}</p><p class="missal-paragraph">${isEn ? "Let us pray." : "Oremos."} ${despues}</p><p class="missal-rubric">R. ${isEn ? "Amen." : "Amén."}</p></div>\n\n`;
            
            // BLOQUES DINAMICOS PARROQUIALES (Avisos, Intenciones, Cantos, etc)
            const dTitles = document.querySelectorAll('.sec-title');
            const dContents = document.querySelectorAll('.sec-content');
            let hasValidBlocks = false;
            let dynamicOut = `-----\n\n### ${isEn ? "PARISH ANNOUNCEMENTS" : "AVISOS PARROQUIALES"}\n\n`;
            
            for (let i = 0; i < dTitles.length; i++) {
                 if (dTitles[i].value.trim() !== "") {
                     hasValidBlocks = true;
                     dynamicOut += `<div class="missal-block" style="margin-bottom: 24px;">
                                        <p class="missal-heading" style="color: #444; border-bottom: 1px solid #ccc; padding-bottom: 4px;">${dTitles[i].value}</p>
                                        <p class="missal-paragraph">${dContents[i].value.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>
                                    </div>\n\n`;
                 }
            }
            if (hasValidBlocks) {
                 out += dynamicOut;
            }
            
            // RITO DE CONCLUSION
            out += `-----\n\n### ${isEn ? "CONCLUDING RITES" : "RITO DE CONCLUSIÓN"}\n<p class="missal-rubric" style="text-align:center; font-weight:bold; margin-bottom:12px;">(${isEn ? "Stand" : "De pie"})</p>\n\n`;
            out += `<div class="missal-block"><p class="missal-heading">${isEn ? "Recessional Chant" : "Canto de Salida"}</p><p class="missal-citation">${cantos.salida}</p></div>\n\n`;
        }
        return out;
    }

    function markdownToHTML(md) {
        let text = md
            .replace(/-----\n\n/g, '<hr style="border: 0; border-top: 2px solid #ddd; margin: 2em 0;">\n\n')
            .replace(/### (.*?)\n/g, '<h3 style="margin-top: 1.5em; margin-bottom: 0.5em; color: #B20000; font-family: \'EB Garamond\', serif; font-size: 1.25em;">$1</h3>\n')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/^>[ \t]*(.*$)/gim, '<blockquote>$1</blockquote>')
            .replace(/<\/blockquote>\n<blockquote>/g, '<br>')
            .replace(/<\/blockquote><br><blockquote>/g, '<br>')
            .replace(/\n\n/g, '<br><br>')
            .replace(/\n/g, '<br>');
            
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
        if (element.innerText.includes('El documento generado aparecerá aquí') || element.innerText.includes('Generando con IA...')) {
            alert("Primero genera un documento usando el Asistente.");
            return;
        }

        html2pdf().set(opt).from(element).save();
    });
});
