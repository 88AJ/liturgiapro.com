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
                if (localData && localData.liturgia_palabra && localData.liturgia_palabra.evangelio.texto.length > 50 && !localData.liturgia_palabra.evangelio.texto.includes("Placeholder Dinámico")) {
                    console.log("Cerebro Offline Activo. Rendereando Data Pura.");
                    let doc = generarDocumento(localData, hora);
                    pdfView.innerHTML = markdownToHTML(doc);
                    generateBtn.innerHTML = "Generar Documento";
                    return;
                }

                // SI NO ESTA OFFLINE, USAMOS PROXY SECUNDARIO (corsproxy.io es mas confiable)
                const parts = fecha.split('-');
                let evDateDay = parts ? parseInt(parts[2], 10) : 9;
                let targetUrl = encodeURIComponent(`https://arquidiocesisgdl.org/lectura_dia${evDateDay}.php`);
                let proxyUrl = `https://corsproxy.io/?${targetUrl}`;

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
                        let tituloFiesta = "FERIA / MISA DIARIA";
                        let usccbReadings = null;
                        
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
    }); // CLOSE generateBtn.addEventListener

    function formatLectura(texto) {
        if (!texto || texto.length < 50) return texto;
        // Si ya viene separado por párrafos (Offline db), lo respetamos
        if (texto.includes('\n\n')) return texto;
        
        // Si no trae saltos (scraped), cortamos usando expresiones regulares para oraciones.
        // Hacemos párrafos cada ~2 oraciones para facilitar proclamación
        let sentences = texto.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
        let result = "";
        for(let i = 0; i < sentences.length; i++) {
            result += sentences[i] + " ";
            if (i > 0 && i % 2 === 0) result += "\n\n";
        }
        return result.trim();
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
            
            // I. RITOS INICIALES
            out += `### I. RITOS INICIALES\n\n`;
            out += `**1. Canto de Entrada:** *${cantos.entrada}*\n\n`;
            
            let antEnt = data.antifona_entrada || "Vengan, benditos de mi Padre, reciban en herencia el reino preparado para ustedes desde la creación del mundo.";
            out += `**2. Antífona de Entrada**\n**Sacerdote:** ${antEnt}\n\n`;
            
            let ritoPen = data.rito_penitencial || "Yo confieso ante Dios todopoderoso y ante ustedes, hermanos, que he pecado mucho de pensamiento, palabra, obra y omisión. Por mi culpa, por mi culpa, por mi gran culpa. Por eso ruego a santa María, siempre Virgen, a los ángeles, a los santos y a ustedes, hermanos, que intercedan por mí ante Dios, nuestro Señor.";
            out += `**3. Rito Penitencial**\n**Sacerdote:** Hermanos: para celebrar dignamente estos sagrados misterios, reconozcamos nuestros pecados.\n**Asamblea:** ${ritoPen}\n**Sacerdote:** Dios todopoderoso tenga misericordia de nosotros, perdone nuestros pecados y nos lleve a la vida eterna.\n**Asamblea:** Amén.\n**Sacerdote:** Señor, ten piedad.\n**Asamblea:** Señor, ten piedad.\n**Sacerdote:** Cristo, ten piedad.\n**Asamblea:** Cristo, ten piedad.\n**Sacerdote:** Señor, ten piedad.\n**Asamblea:** Señor, ten piedad.\n\n`;
            
            // II. SALMODIA INTEGRADA
            if (hora === "laudes" || hora === "visperas") {
                out += `-----\n\n### II. SALMODIA INTEGRADA (${hora.toUpperCase()})\n\n`;
                const salmodia = data[hora];
                if (salmodia) {
                    if (salmodia.salmo1) {
                         out += `**4. Primer Salmo:**\n**Asamblea:** ${salmodia.salmo1.antifona}\n\n`;
                         let salmoP = salmodia.salmo1.texto.split("\n\n");
                         salmoP.forEach((estrofa, index) => {
                             let l = index % 2 === 0 ? "Lector 1" : "Lector 2";
                             out += `**${l}:**\n${estrofa}\n\n`;
                         });
                         out += `**Asamblea:** Gloria al Padre, y al Hijo, y al Espíritu Santo. Como era en el principio, ahora y siempre, por los siglos de los siglos. Amén.\n${salmodia.salmo1.antifona}\n\n`;
                    }
                    if (salmodia.cantico_at || salmodia.salmo2) {
                         let s2 = salmodia.cantico_at || salmodia.salmo2;
                         let nt = salmodia.cantico_at ? "Cántico AT" : "Segundo Salmo";
                         out += `**5. ${nt}:**\n**Asamblea:** ${s2.antifona}\n\n`;
                         let salmoP = s2.texto.split("\n\n");
                         salmoP.forEach((estrofa, index) => {
                             let l = index % 2 === 0 ? "Lector 1" : "Lector 2";
                             out += `**${l}:**\n${estrofa}\n\n`;
                         });
                         if(!salmodia.cantico_at) out += `**Asamblea:** Gloria al Padre...\n`;
                         out += `${s2.antifona}\n\n`;
                    }
                    if (salmodia.salmo2 && salmodia.cantico_nt) { // Visperas
                         let s3 = salmodia.cantico_nt;
                         out += `**6. Cántico NT:**\n**Asamblea:** ${s3.antifona}\n\n`;
                         s3.texto.split("\n\n").forEach((estrofa, index) => {
                             let l = index % 2 === 0 ? "Lector 1" : "Lector 2";
                             out += `**${l}:**\n${estrofa}\n\n`;
                         });
                         out += `**Asamblea:** Gloria al Padre...\n${s3.antifona}\n\n`;
                    }
                }
            }
            
            // III. CONCLUSION DE RITOS INICIALES
            out += `-----\n\n### III. CONCLUSIÓN DE RITOS INICIALES\n\n`;
            if (data.gloria) {
                out += `**7. Gloria**\n**Asamblea:** Gloria a Dios en el cielo, y en la tierra paz a los hombres que ama el Señor. Por tu inmensa gloria te alabamos, te bendecimos, te adoramos, te glorificamos, te damos gracias, Señor Dios, Rey celestial, Dios Padre todopoderoso. Señor, Hijo único, Jesucristo. Señor Dios, Cordero de Dios, Hijo del Padre; tú que quitas el pecado del mundo, ten piedad de nosotros; tú que quitas el pecado del mundo, atiende nuestra súplica; tú que estás sentado a la derecha del Padre, ten piedad de nosotros; porque sólo tú eres Santo, sólo tú Señor, sólo tú Altísimo, Jesucristo, con el Espíritu Santo en la gloria de Dios Padre. Amén.\n\n`;
            }
            
            let colecta = data.oracion_colecta || "Dios todopoderoso y eterno, aumenta en nosotros la fe, la esperanza y la caridad, y para que consigamos lo que nos prometes, ayúdanos a amar lo que nos mandas. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos.";
            out += `**8. Oración Colecta**\n**Sacerdote:** Oremos. ${colecta}\n**Asamblea:** Amén.\n\n`;
            
            // IV. LITURGIA DE LA PALABRA
            out += `-----\n\n### IV. LITURGIA DE LA PALABRA\n\n`;
            let lp = data.liturgia_palabra || {};
            let r1 = lp.primera_lectura || { cita: "Primera Lectura", texto: "[Lectura no disponible]" };
            out += `**9. Primera Lectura** (${r1.cita})\n**Lector:** Lectura.\n\n${formatLectura(r1.texto)}\n\n**Lector:** Palabra de Dios.\n**Asamblea:** Te alabamos, Señor.\n\n`;
            
            let sr = lp.salmo_responsorial || { cita: "Salmo", respuesta: "El Señor es mi pastor.", texto: "El Señor es mi pastor, nada me falta." };
            out += `**10. Salmo Responsorial** (${sr.cita})\n**Asamblea:** ${sr.respuesta}\n\n`;
            let txtSalmo = formatLectura(sr.texto);
            txtSalmo.split("\n\n").forEach(estrofa => {
                if(estrofa.trim().length > 0) out += `**Lector:**\n${estrofa}\n\n**Asamblea:** ${sr.respuesta}\n\n`;
            });
            
            if (lp.segunda_lectura) {
                out += `**11. Segunda Lectura** (${lp.segunda_lectura.cita})\n**Lector:** Lectura.\n\n${formatLectura(lp.segunda_lectura.texto)}\n\n**Lector:** Palabra de Dios.\n**Asamblea:** Te alabamos, Señor.\n\n`;
            }
            
            let aclv = lp.aclamacion_evangelio || "Aleluya, aleluya.";
            out += `**12. Aclamación antes del Evangelio**\n**Asamblea:** ${aclv}\n\n`;
            
            let ev = lp.evangelio || { cita: "Evangelio", texto: "[Evangelio no disponible]" };
            out += `**13. Evangelio** (${ev.cita})\n**Sacerdote:** El Señor esté con ustedes.\n**Asamblea:** Y con tu espíritu.\n**Sacerdote:** Lectura del santo Evangelio.\n**Asamblea:** Gloria a ti, Señor.\n\n${formatLectura(ev.texto)}\n\n**Sacerdote:** Palabra del Señor.\n**Asamblea:** Gloria a ti, Señor Jesús.\n\n`;
            
            let preces = lp.preces || (data.laudes ? data.laudes.preces : "Te pedimos, Señor, escucha nuestra oración, y concede a tu Iglesia la paz y la unidad que te suplica.");
            out += `**14. Oración de los Fieles**\n**Sacerdote:** A Dios Padre, dirijamos nuestra súplica:\n**Asamblea:** Te rogamos, óyenos.\n\n${preces}\n\n**Sacerdote:** Escucha Padre nuestras oraciones.\n**Asamblea:** Padre nuestro, que estás en el cielo, santificado sea tu Nombre; venga a nosotros tu reino; hágase tu voluntad en la tierra como en el cielo. Danos hoy nuestro pan de cada día; perdona nuestras ofensas, como también nosotros perdonamos a los que nos ofenden; no nos dejes caer en la tentación, y líbranos del mal. Amén.\n\n`;
            
            // V. LITURGIA EUCARISTICA
            out += `-----\n\n### V. LITURGIA EUCARÍSTICA\n\n`;
            out += `**15. Canto de Ofertorio:** *${cantos.ofertorio}*\n\n`;
            let le = data.liturgia_eucaristica || {};
            let ofrendas = le.oracion_ofrendas || "Recibe, Señor, las ofrendas de tu pueblo, y concédenos que este sacrificio nos alcance la gracia que te pedimos. Por Jesucristo nuestro Señor.";
            out += `**16. Oración sobre las Ofrendas**\n**Sacerdote:** ${ofrendas}\n**Asamblea:** Amén.\n\n`;
            
            let antc = le.antifona_comunion || "Acerca tu mano, trae tu dedo y explora mis llagas; y no seas incrédulo, sino creyente.";
            out += `**17. Antífona de la Comunión**\n**Sacerdote:** ${antc}\n\n`;
            
            out += `**18. Canto de Comunión:** *${cantos.comunion}*\n\n`;
            
            let despues = le.oracion_despues_comunion || "Concédenos, Dios todopoderoso, que la eficacia de este sacramento limpie nuestras culpas y nos conduzca por el camino recto. Por Jesucristo nuestro Señor.";
            out += `**19. Oración después de la Comunión**\n**Sacerdote:** Oremos. ${despues}\n**Asamblea:** Amén.\n\n`;
            
            // VI. RITO DE CONCLUSION
            out += `-----\n\n### VI. RITO DE CONCLUSIÓN\n\n`;
            out += `**20. Canto de Salida:** *${cantos.salida}*\n\n`;
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
