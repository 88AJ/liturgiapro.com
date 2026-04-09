window.cantosDB = {};

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

    // Premium Logic Fake
    const upgradeBtn = document.getElementById('upgrade-btn');
    const premiumModal = document.getElementById('premium-modal');
    const closeModal = document.getElementById('close-modal');
    const sacramentSelect = document.getElementById('sacrament-select');

    upgradeBtn.addEventListener('click', () => premiumModal.classList.add('visible'));
    closeModal.addEventListener('click', () => premiumModal.classList.remove('visible'));

    sacramentSelect.addEventListener('change', (e) => {
        if (e.target.value.includes('Premium')) {
            premiumModal.classList.add('visible');
            e.target.value = 'Misa Diaria / Dominical'; // Reset
        }
    });

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

                // Formateamos para evangelizacion o USCCB
                const parts = fecha.split('-');
                let proxyUrl = "";
                if (region === 'us_en') {
                    // MMDDYY format
                    const usDate = `${parts[1]}${parts[2]}${parts[0].slice(-2)}`;
                    proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(`https://bible.usccb.org/bible/readings/${usDate}.cfm`)}`;
                } else if (region === 'us_es') {
                     // The spanish usccb url format changes, using generic home bypass for now
                    proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(`https://bible.usccb.org/es/lectura-diaria-biblia`)}`;
                } else {
                let evDateDay = parts ? parseInt(parts[2], 10) : 9; // Extract Day number
                    proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(`https://arquidiocesisgdl.org/lectura_dia${evDateDay}.php`)}`;
                }

                // CEREBRO OFFLINE: Si ya procesamos el documento localmente (Ej. Triduo Pascual), lo ejecutamos al instante sin internet.
                let localData = liturgiaData[fecha];
                if (localData && localData.liturgia_palabra && localData.liturgia_palabra.evangelio.texto.length > 50 && !localData.liturgia_palabra.evangelio.texto.includes("Placeholder Dinámico")) {
                    console.log("Cerebro Offline Activo. Saltando proxy...");
                    let doc = generarDocumento(localData, hora);
                    pdfView.innerHTML = markdownToHTML(doc);
                    generateBtn.innerHTML = "Generar Documento";
                    return;
                }

                fetch(proxyUrl)
                    .then(r => r.json())
                    .then(proxyData => {
                        generateBtn.innerHTML = "Generar Documento";
                        const parser = new DOMParser();
                        const htmlDoc = parser.parseFromString(proxyData.contents, 'text/html');
                        
                        let tituloFiesta = "FERIA / MEMORIA LIBRE";
                        let usccbReadings = null;
                        
                        // EXTRACTOR PROFUNDO (EL JEFE FINAL)
                        if (region.includes('us_')) {
                            // 1. Título
                            let metaTitle = htmlDoc.querySelector('meta[property="og:title"]');
                            if (metaTitle) tituloFiesta = metaTitle.content.split('|')[0].trim().toUpperCase();
                            
                            // 2. Lecturas Completas
                            let verses = htmlDoc.querySelectorAll('.b-verse');
                            if (verses && verses.length > 0) {
                                usccbReadings = { r1: "", r1_c: "", salmo: "", salmo_c: "", gospel: "", gospel_c: "" };
                                verses.forEach((v, index) => {
                                    let hEl = v.querySelector('h3') || v.querySelector('h2') || v.querySelector('h4');
                                    let hText = hEl ? hEl.innerText.trim() : `Part ${index}`;
                                    
                                    let textC = "";
                                    let contentB = v.querySelector('.content-body');
                                    if(contentB) {
                                        contentB.querySelectorAll('p').forEach(p => textC += p.innerText.trim() + "\n\n");
                                    }
                                    
                                    let lowerH = hText.toLowerCase();
                                    if((lowerH.includes('reading') || lowerH.includes('lectura')) && !usccbReadings.r1) { 
                                        usccbReadings.r1 = textC; usccbReadings.r1_c = hText; 
                                    } else if (lowerH.includes('psalm') || lowerH.includes('salmo')) { 
                                        usccbReadings.salmo = textC; usccbReadings.salmo_c = hText; 
                                    } else if (lowerH.includes('gospel') || lowerH.includes('evangelio')) { 
                                        usccbReadings.gospel = textC; usccbReadings.gospel_c = hText; 
                                    }
                                });
                            }
                        } else {
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
                            
                            let lect1Match = textDump.match(/PRIMERA LECTURA\s*([\s\S]*?)(?:SALMO RESPONSORIAL)/);
                            if(lect1Match) usccbReadings.r1 = lect1Match[1].trim();

                            let psalmMatch = textDump.match(/SALMO RESPONSORIAL\s*([\s\S]*?)(?:EVANGELIO|SEGUNDA LECTURA)/);
                            if(psalmMatch) usccbReadings.salmo = psalmMatch[1].trim();

                            let gospelMatch = textDump.match(/EVANGELIO\s*([\s\S]*?)(?:Credo|Oración de los fieles|LITURGIA EUCARÍSTICA|$)/i);
                            if(gospelMatch) usccbReadings.gospel = gospelMatch[1].trim();
                        }

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

    function formatLectura(texto) { return texto; }

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
        const sacramento = document.getElementById('sacrament-select').value;
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
        
        // Options checkboxes
        const chkIntro = document.getElementById('chk-intro').checked;
        const chkLecto = document.getElementById('chk-lecturas-solo').checked;
        const chkEuca = document.getElementById('chk-eucaristia').checked;

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
            out += `<h2>${isEn ? 'Rite of the' : 'Rito de la'} ${data.tiempo_liturgico}</h2>\n`;
        }
        out += `<h3 style="color: #666;">${data.dia_semana} (${data.color})</h3>\n`;
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
            
            if (chkIntro) {
                out += `**${lang.rito_inicial}**\n\n`;
                out += `🎵 **${lang.entrada}:** *${cantos.entrada}*\n\n`;
                out += `**${lang.ant_entrada}:**\n**${lang.sacerdote}:** ${data.antifona_entrada}\n\n`;
                out += `**${lang.rito_pen}:**\n**${lang.sacerdote}:** ${isEn ? 'Brethren, let us acknowledge...' : 'Hermanos: Para celebrar...'}\n**${lang.asamblea}:** ${data.rito_penitencial}\n`;
                if (data.gloria) out += `\n**${lang.gloria}:**\n${isEn ? 'Glory to God in the highest...' : 'Gloria a Dios en el cielo...'}\n\n`;
                out += `\n**${lang.colecta}:**\n**${lang.sacerdote}:** ${isEn ? 'Let us pray.' : 'Oremos.'} ${data.oracion_colecta}\n**${lang.asamblea}:** Amen.\n\n`;
            }

            // Integración de Oficio en Misa si se requiere
            if(hora === "laudes" || hora === "visperas") {
                 const salmodia = data[hora];
                 if(salmodia) {
                     out += `\n**SALMODIA DE ${hora.toUpperCase()}**\n\n`;
                     out += `> ${salmodia.salmo1.antifona}\n> \n> ${salmodia.salmo1.texto.replace(/\n/g, '\n> ')}\n\n`;
                 }
            }

            out += `\n**${lang.lit_palabra}**\n\n`;
            let r1Cita = data.liturgia_palabra?.primera_lectura?.cita || "Primera Lectura";
            let r1Texto = data.liturgia_palabra?.primera_lectura?.texto || "[No hay lecturas cargadas para este día en la Bóveda]";
            let salmoResp = data.liturgia_palabra?.salmo_responsorial?.respuesta || "[... Salmo ...]";
            let evCita = data.liturgia_palabra?.evangelio?.cita || "Evangelio";
            let evTexto = data.liturgia_palabra?.evangelio?.texto || "[No hay evangelio cargado para este día en la Bóveda]";
            
            out += `**${lang.primera_lectura} (${r1Cita}):**\n${formatLectura(r1Texto)}\n\n`;
            out += `**${lang.salmo}:**\n**${lang.asamblea}:** ${salmoResp}\n\n`;
            out += `**${lang.evangelio} (${evCita}):**\n${formatLectura(evTexto)}\n\n`;

            
            if (chkEuca) {
                out += `\n**${lang.lit_euca}**\n\n`;
                out += `🎵 **${lang.ofertorio}:** *${cantos.ofertorio}*\n\n`;
                let oracionOfrendas = data.liturgia_eucaristica?.oracion_ofrendas || "[Oración sobre las ofrendas del día]";
                out += `**${lang.sobre_ofrendas}:**\n**${lang.sacerdote}:** ${oracionOfrendas}\n\n`;
                out += `🎵 **${lang.comunion}:** *${cantos.comunion}*\n\n`;
                let oracionDespues = data.liturgia_eucaristica?.oracion_despues_comunion || "[Oración después de la comunión]";
                out += `**${lang.despues_comunion}:**\n**${lang.sacerdote}:** ${isEn ? 'Let us pray.' : 'Oremos.'} ${oracionDespues}\n\n`;
                out += `🎵 **${lang.salida}:** *${cantos.salida}*\n\n`;
            }
        }
        return out;
    }

    function markdownToHTML(md) {
        let text = md
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/^>[ \t]*(.*$)/gim, '<blockquote>$1</blockquote>')
            .replace(/<\/blockquote>\n<blockquote>/g, '<br>')
            .replace(/<\/blockquote><br><blockquote>/g, '<br>')
            .replace(/\n\n/g, '<br><br>')
            .replace(/\n/g, '<br>');
            
        // Apply rubric class to exact actors
        text = text.replace(/<strong>(Sacerdote:|Priest:|Sacerdote y Asamblea:|Asamblea:|People:|Lector:|Antífona:|Antífona 1:|Responsorio Breve:|Oración Final:|Himno:|Lectura Breve|Salmodia:|Examen de Conciencia:|Introducción:|Antífona Mariana:)<\/strong>/g, '<strong class="rubric">$1</strong>');
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
        
        // Configuration for html2pdf
        const opt = {
            margin:       10, // Add explicit margin just in case padding collapses
            filename:     'Ritual_Liturgia_PRO.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2 },
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        // If it's an empty state, don't print
        if (element.innerText.includes('El documento generado aparecerá aquí') || element.innerText.includes('Generando con IA...')) {
            alert("Primero genera un documento usando el Asistente.");
            return;
        }

        html2pdf().set(opt).from(element).save();
    });
});
