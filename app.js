document.addEventListener('DOMContentLoaded', () => {
    const generarBtn = document.getElementById('generar_btn');
    const copiarBtn = document.getElementById('copiar_btn');
    const outputDiv = document.getElementById('output');

    let liturgiaData = null;

    // Load DB
    fetch('data/liturgia.json')
        .then(response => response.json())
        .then(data => {
            liturgiaData = data;
        })
        .catch(err => console.error("Error cargando base de datos litúrgica:", err));

    generarBtn.addEventListener('click', () => {
        const fecha = document.getElementById('fecha').value;
        const hora = document.getElementById('hora_liturgica').value;
        
        if (!liturgiaData || !liturgiaData[fecha]) {
            outputDiv.innerHTML = `<p style="color: red;"><strong>Error:</strong> No se encontraron textos litúrgicos para la fecha ${fecha}.</p>`;
            return;
        }

        const data = liturgiaData[fecha];
        let doc = generarDocumento(data, hora);
        
        outputDiv.innerHTML = doc; // We'll render it as HTML so it looks good, but also clean enough to copy to processor
        copiarBtn.style.display = 'block';
    });

    copiarBtn.addEventListener('click', () => {
        // Create an invisible textarea to copy clean text (or just copy from outputDiv's innerText to preserve line breaks)
        navigator.clipboard.writeText(outputDiv.innerText).then(() => {
            alert('¡Documento copiado al portapapeles!');
        });
    });

    function formatCanto(label, idText, idLink) {
        let text = document.getElementById(idText).value.trim();
        let link = document.getElementById(idLink).value.trim();
        
        if (!text) return "";
        let lineas = text.split('\n');
        let titulo = lineas.shift(); // asume que la primera línea es el título
        
        let out = `> *${titulo}*\n>\n> ` + lineas.join('\n> ') + `\n> \n`;
        if (link) {
            out += `> [Ver Canto en YouTube](${link})\n`;
        }
        return out;
    }

    function formatLectura(texto) {
        // Divide textos largos (aquellos con más de 250 caracteres aprox sin saltos) en párrafos
        return texto; // Si ya viene formateado con \n del JSON, lo respetamos.
    }

    function generarDocumento(data, hora) {
        let out = "";
        
        // Cabecera
        out += `**${data.dia_semana}** | **${data.tiempo_liturgico}** | Color: **${data.color}**\n\n`;
        
        // I. Ritos Iniciales
        out += `**I. RITOS INICIALES**\n\n`;
        
        out += `**1. Canto de Entrada:**\n`;
        out += formatCanto('Entrada', 'canto_entrada', 'link_entrada') + "\n";
        
        out += `**2. Antífona de Entrada:**\n`;
        out += `**Sacerdote:** ${data.antifona_entrada}\n\n`;
        
        out += `**3. Rito Penitencial:**\n`;
        out += `**Sacerdote:** Hermanos: Para celebrar dignamente estos sagrados misterios, reconozcamos nuestros pecados.\n`;
        out += `**Asamblea:** ${data.rito_penitencial}\n`;
        out += `**Sacerdote:** Dios todopoderoso tenga misericordia de nosotros...\n`;
        out += `**Asamblea:** Amén.\n\n`;

        // II. Salmodia
        out += `**II. SALMODIA INTEGRADA (${hora.toUpperCase()})**\n\n`;
        
        const salmodia = data[hora];
        if (salmodia) {
            out += `**4. Primer Salmo (${salmodia.salmo1.cita})**\n`;
            out += `**Sacerdote:** ${salmodia.salmo1.antifona}\n\n`;
            out += `**Asamblea:**\n${salmodia.salmo1.texto}\n\n`;
            out += `Gloria al Padre, y al Hijo, y al Espíritu Santo.\nComo era en el principio, ahora y siempre,\npor los siglos de los siglos. Amén.\n\n`;
            out += `**Sacerdote:** ${salmodia.salmo1.antifona}\n\n`;

            if (salmodia.cantico_at) {
                out += `**5. Segundo Cántico del Antiguo Testamento (${salmodia.cantico_at.cita})**\n`;
                out += `**Sacerdote:** ${salmodia.cantico_at.antifona}\n\n`;
                out += `**Asamblea:**\n${salmodia.cantico_at.texto}\n\n`;
                out += `**(No se dice Gloria al Padre en el cántico de Daniel en Laudes)**\n\n`;
                out += `**Sacerdote:** ${salmodia.cantico_at.antifona}\n\n`;

            } else if (salmodia.salmo2) {
                out += `**5. Segundo Salmo (${salmodia.salmo2.cita})**\n`;
                out += `**Sacerdote:** ${salmodia.salmo2.antifona}\n\n`;
                out += `**Asamblea:**\n${salmodia.salmo2.texto}\n\n`;
                out += `Gloria al Padre, y al Hijo...\n\n`;
                out += `**Sacerdote:** ${salmodia.salmo2.antifona}\n\n`;
            }

            if (salmodia.cantico_nt) {
                 // Vísperas cantico
                 out += `**6. Tercer Cántico del Nuevo Testamento (${salmodia.cantico_nt.cita})**\n`;
                 // ... omitted for brevity in mock, similar structure
            } else if (salmodia.salmo3 || salmodia.salmo2) {
                 out += `**6. Tercer Salmo (${salmodia.salmo2.cita})**\n`; // Mock using salmo2
                 out += `**Sacerdote:** ${salmodia.salmo2.antifona}\n\n`;
                 out += `**Asamblea:**\n${salmodia.salmo2.texto}\n\n`;
                 out += `Gloria al Padre...\n\n`;
                 out += `**Sacerdote:** ${salmodia.salmo2.antifona}\n\n`;
            }
        }

        // III. Conclusión Ritos Inciales
        out += `**III. CONCLUSIÓN DE RITOS INICIALES**\n\n`;
        if (data.gloria) {
            out += `**7. Gloria:**\nGloria a Dios en el cielo, y en la tierra paz a los hombres que ama el Señor...\n\n`;
        }
        out += `**8. Oración Colecta:**\n**Sacerdote:** Oremos. ${data.oracion_colecta}\n**Asamblea:** Amén.\n\n`;

        // IV. Palabra
        out += `**IV. LITURGIA DE LA PALABRA**\n\n`;
        let pal = data.liturgia_palabra;
        
        out += `**9. Primera Lectura:**\nLectura del libro de los ${pal.primera_lectura.cita}.\n\n`;
        out += `${formatLectura(pal.primera_lectura.texto)}\n\n`;
        out += `**Lector:** Palabra de Dios.\n**Asamblea:** Te alabamos, Señor.\n\n`;

        out += `**10. Salmo Responsorial:**\n${pal.salmo_responsorial.cita}\n\n`;
        out += `**Asamblea:** ${pal.salmo_responsorial.respuesta}\n\n`;
        out += `**Lector:**\n${pal.salmo_responsorial.texto}\n\n`;

        if (pal.segunda_lectura) {
             out += `**11. Segunda Lectura:**\nLectura de la carta de los ${pal.segunda_lectura.cita}.\n\n`;
             out += `${formatLectura(pal.segunda_lectura.texto)}\n\n`;
             out += `**Lector:** Palabra de Dios.\n**Asamblea:** Te alabamos, Señor.\n\n`;
        }

        out += `**12. Aclamación antes del Evangelio:**\n**Asamblea:** ${pal.aclamacion_evangelio}\n\n`;

        out += `**13. Evangelio:**\n**Sacerdote:** El Señor esté con ustedes.\n**Asamblea:** Y con tu espíritu.\n**Sacerdote:** Proclamación del Santo Evangelio según ${pal.evangelio.cita}.\n**Asamblea:** Gloria a ti, Señor.\n\n`;
        out += `${formatLectura(pal.evangelio.texto)}\n\n`;
        out += `**Sacerdote:** Palabra del Señor.\n**Asamblea:** Gloria a ti, Señor Jesús.\n\n`;

        out += `**14. Oración de los Fieles (Preces):**\n**Sacerdote y Asamblea:**\n${salmodia ? salmodia.preces : ""}\n\n`;

        // V. Eucaristica
        out += `**V. LITURGIA EUCARÍSTICA**\n\n`;
        
        out += `**15. Canto de Ofertorio:**\n`;
        out += formatCanto('Ofertorio', 'canto_ofertorio', 'link_ofertorio') + "\n";
        
        out += `**16. Oración sobre las Ofrendas:**\n**Sacerdote:** ${data.liturgia_eucaristica.oracion_ofrendas}\n**Asamblea:** Amén.\n\n`;
        out += `**17. Antífona de la Comunión:**\n**Asamblea:** ${data.liturgia_eucaristica.antifona_comunion}\n\n`;
        
        out += `**18. Canto de Comunión:**\n`;
        out += formatCanto('Comunión', 'canto_comunion', 'link_comunion') + "\n";
        
        out += `**19. Oración después de la Comunión:**\n**Sacerdote:** Oremos. ${data.liturgia_eucaristica.oracion_despues_comunion}\n**Asamblea:** Amén.\n\n`;

        // VI. Conclusion
        out += `**VI. RITO DE CONCLUSIÓN**\n\n`;
        out += `**20. Canto de Salida:**\n`;
        out += formatCanto('Salida', 'canto_salida', 'link_salida') + "\n";

        return markdownToHTML(out);
    }

    function markdownToHTML(md) {
        return md
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
            // Fix double quoting blocks rendering
            .replace(/<\/blockquote>\n<blockquote>/g, '<br>')
            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>');
    }
});
