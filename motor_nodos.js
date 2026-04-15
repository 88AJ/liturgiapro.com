// ANTIGRAVITY - CEREBRO LITÚRGICO UNIFICADO (NODOS)

function generarDocumentoNodosLegacy(data, hora, options = {}) {
    if (!data) return '';
    let isEn = options.isEn === true;
    let showMoniciones = options.showMoniciones !== false;
    let showHomilia = options.showHomilia !== false;

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
    let OFICIO = null;
    if (hora) {
        if (hora.includes("laudes")) OFICIO = "Laudes";
        else if (hora.includes("visperas")) OFICIO = "Visperas";
        else if (hora.includes("oficio")) OFICIO = "Oficio";
        else if (hora.includes("intermedia")) OFICIO = "Intermedia";
        else if (hora.includes("completas")) OFICIO = "Completas";
    }
    const IS_MISA = (hora === "misa" || hora === "misa_laudes" || !hora);

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

    const cantos = window.obtenerCantosPorTiempo ? window.obtenerCantosPorTiempo(TIEMPO_LIT, isEn) : { entrada: "", ofertorio: "", comunion: "", salida: "" };

    // BLOQUE A: RITOS INICIALES
    let bInicial = new BloqueLiturgico("ritos_iniciales");

    if (showMoniciones) {
        bInicial.addTitulo(isEn ? "Entrance Monition" : "Monición de Entrada");
        if (data.monicion_entrada) {
            bInicial.addMonicion(data.monicion_entrada);
        } else {
            bInicial.addMonicion(isEn ? "A brief introduction to the day's liturgy." : "Breve introducción a la liturgia del día.");
        }
    }

    bInicial.addSuperTitulo(isEn ? "INTRODUCTORY RITES" : "RITOS INICIALES");
    
    bInicial.addTitulo(isEn ? "Entrance Chant" : "Canto de Entrada");
    bInicial.addRubrica(cantos.entrada);

    let antEnt = data.antifona_entrada || (isEn ? "Entrance Antiphon details..." : "Antífona según calendario...");
    bInicial.addTitulo(isEn ? "Entrance Antiphon" : "Antífona de Entrada");
    bInicial.addSacerdote(antEnt);

    bInicial.addTitulo(isEn ? "Greeting" : "Saludo Inicial");
    bInicial.addDialogo(isEn ? "In the name of the Father, and of the Son, and of the Holy Spirit." : "En el nombre del Padre, y del Hijo, y del Espíritu Santo.", isEn ? "Amen." : "Amén.");
    bInicial.addDialogo(isEn ? "The grace of our Lord Jesus Christ, and the communion of the Holy Spirit be with you all." : "La gracia de nuestro Señor Jesucristo, el amor del Padre, y la comunión del Espíritu Santo estén con todos ustedes.", isEn ? "And with your spirit." : "Y con tu espíritu.");

    
    if (OFICIO === "Laudes" || OFICIO === "Visperas") {
        let officeData = data[hora];
        // OGLH 94: La salmodia incluye salmos y el cantico del testamento respectivo
        let salmosNombres = OFICIO === "Laudes" ? ["salmo1", "cantico_at", "salmo2"] : ["salmo1", "salmo2", "cantico_nt"];
        let titulosArray = OFICIO === "Laudes" ? ["Salmo 1", "Cántico del Antiguo Testamento", "Salmo 2"] : ["Salmo 1", "Salmo 2", "Cántico del Nuevo Testamento"];

        if (officeData && officeData[salmosNombres[0]]) {
            bInicial.addSuperTitulo(isEn ? ("INTEGRATED PSALMODY (" + OFICIO + ")") : ("SALMODIA INTEGRADA (" + OFICIO.toUpperCase() + ")"));
            
            salmosNombres.forEach((nombre, index) => {
                let s = officeData[nombre];
                if (s) {
                    bInicial.addTitulo(isEn ? ("Psalmody: " + nombre) : titulosArray[index]);
                    bInicial.addRubrica((isEn ? "Antiphon: " : "Antífona: ") + s.antifona);
                    
                    let lines = s.texto.split("\n\n");
                    lines.forEach((line, idx) => {
                        if (idx % 2 === 0) bInicial.addSacerdote(line, 'Normal');
                        else bInicial.addAsamblea(line);
                    });
                    
                    bInicial.addSacerdote(isEn ? "Glory to the Father, and to the Son, and to the Holy Spirit." : "Gloria al Padre, y al Hijo, y al Espíritu Santo.", 'Normal');
                    bInicial.addAsamblea(isEn ? "As it was in the beginning, is now, and will be forever. Amen." : "Como era en el principio, ahora y siempre, por los siglos de los siglos. Amén.");
                    bInicial.addRubrica((isEn ? "Antiphon: " : "Antífona: ") + s.antifona);
                }
            });
        } else {
            bInicial.addRubrica("[Error: No se encontró la salmodia del Oficio para " + OFICIO + "]");
        }
    } else {
        if (ES_PASCUA_PENTECOSTES && (GRADO.toLowerCase().includes("domingo") || ES_OCTAVA_PASCUA)) {
            bInicial.addTitulo(isEn ? "Rite of Blessing and Sprinkling Holy Water" : "Rito de Aspersión (Agua Bendita)");
            bInicial.addMonicion(isEn ? "The penitential act is omitted. The priest blesses the water and sprinkles the faithful." : "Se omite el Acto Penitencial rutinario. El Sacerdote bendice el agua y la rocía sobre el pueblo como memorial del bautismo.");
            bInicial.addSacerdote(isEn ? "Dear brethren (brothers and sisters), let us humbly beseech the Lord our God to bless this water he has created..." : "Hermanos: invoquemos a Dios, nuestro Señor, para que se digne bendecir este agua creada por Él, que va a ser rociada sobre nosotros como recuerdo de nuestro bautismo...");
            bInicial.addAsamblea("Amén.");
            bInicial.addRubrica(isEn ? "The priest sprinkles the congregation while an appropriate chant is sung." : "El sacerdote recorre la nave aspergando a la asamblea mientras se canta un canto bautismal (Ej. 'Vi el agua salir').");
            bInicial.addSacerdote(isEn ? "May almighty God cleanse us of our sins, and through the celebration of this Eucharist make us worthy to share at the table of his Kingdom." : "Que Dios todopoderoso nos purifique de nuestros pecados y, por la celebración de esta Eucaristía, nos haga dignos de participar de la mesa de su reino.");
            bInicial.addAsamblea("Amén.");
        } else {
            bInicial.addTitulo(isEn ? "Penitential Act" : "Rito Penitencial");
            bInicial.addSacerdote(isEn ? "Brethren (brothers and sisters), let us acknowledge our sins..." : "Hermanos: reconozcamos nuestros pecados para celebrar dignamente estos sagrados misterios.");
            bInicial.addAsamblea(data.rito_penitencial || "Yo confieso ante Dios todopoderoso...");
            bInicial.addSacerdote(isEn ? "May almighty God have mercy on us..." : "Dios todopoderoso tenga misericordia de nosotros, perdone nuestros pecados y nos lleve a la vida eterna.");
            bInicial.addAsamblea("Amén.");
            bInicial.addDialogo(isEn ? "Lord, have mercy." : "Señor, ten piedad.", isEn ? "Lord, have mercy." : "Señor, ten piedad.");
            bInicial.addDialogo(isEn ? "Christ, have mercy." : "Cristo, ten piedad.", isEn ? "Christ, have mercy." : "Cristo, ten piedad.");
            bInicial.addDialogo(isEn ? "Lord, have mercy." : "Señor, ten piedad.", isEn ? "Lord, have mercy." : "Señor, ten piedad.");
        }
    }

    SECUENCIA_LITURGICA.push(bInicial);

    let bGloriaColecta = new BloqueLiturgico("gloria");
    bGloriaColecta.addTitulo("Gloria");
    if (Flag_Gloria) {
        bGloriaColecta.addAsamblea(isEn ? "Glory to God in the highest..." : "Gloria a Dios en el cielo, y en la tierra paz a los hombres que ama el Señor. Por tu inmensa gloria te alabamos, te bendecimos, te adoramos, te glorificamos, te damos gracias, Señor Dios, Rey celestial, Dios Padre todopoderoso. Señor, Hijo único, Jesucristo. Señor Dios, Cordero de Dios, Hijo del Padre; tú que quitas el pecado del mundo, ten piedad de nosotros; tú que quitas el pecado del mundo, atiende nuestra súplica; tú que estás sentado a la derecha del Padre, ten piedad de nosotros; porque sólo tú eres Santo, sólo tú Señor, sólo tú Altísimo, Jesucristo, con el Espíritu Santo en la gloria de Dios Padre. Amén.");
    } else {
        bGloriaColecta.addRubrica(isEn ? "[The Gloria is omitted today]" : "[Hoy se omite el Gloria]");
    }
    
    bGloriaColecta.addTitulo(isEn ? "Collect" : "Oración Colecta");
    bGloriaColecta.addCapitular((isEn ? "Let us pray. " : "Oremos. ") + (data.oracion_colecta || "Dios todopoderoso y eterno..."));
    bGloriaColecta.addAsamblea("Amén.");
    SECUENCIA_LITURGICA.push(bGloriaColecta);

    // BLOQUE B: LITURGIA DE LA PALABRA
    let bPalabra = new BloqueLiturgico("liturgia_palabra");
    bPalabra.addSuperTitulo(isEn ? "LITURGY OF THE WORD" : "LITURGIA DE LA PALABRA");
    
    if (showMoniciones) {
        bPalabra.addTitulo(isEn ? "Monition" : "Monición a las Lecturas");
        if (data.monicion_lecturas) {
            bPalabra.addMonicion(data.monicion_lecturas);
        } else {
            bPalabra.addMonicion(isEn ? "Introduction to the Liturgy of the Word." : "Introducción a la Liturgia de la Palabra.");
        }
    }

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
    if (showHomilia) {
        bPalabra.addGuia(data.guia_reflexion || (isEn ? "[Homily Reflection Guide]" : "[Guía de Reflexión Sacerdotal]"));
    } else {
        bPalabra.addRubrica(isEn ? "The priest or deacon delivers the homily." : "El sacerdote o diácono pronuncia la homilía.");
    }
    SECUENCIA_LITURGICA.push(bPalabra);

    if (Flag_Credo) {
        let bCredo = new BloqueLiturgico("credo");
        bCredo.addTitulo(isEn ? "Profession of Faith" : "Profesión de Fe");
        bCredo.addAsamblea(isEn ? "I believe in God, the Father almighty..." : "Creo en Dios, Padre todopoderoso, Creador del cielo y de la tierra. Creo en Jesucristo, su único Hijo, nuestro Señor, que fue concebido por obra y gracia del Espíritu Santo, nació de santa María Virgen, padeció bajo el poder de Poncio Pilato, fue crucificado, muerto y sepultado, descendió a los infiernos, al tercer día resucitó de entre los muertos, subió a los cielos y está sentado a la derecha de Dios, Padre todopoderoso. Desde allí ha de venir a juzgar a vivos y muertos. Creo en el Espíritu Santo, la santa Iglesia católica, la comunión de los santos, el perdón de los pecados, la resurrección de la carne y la vida eterna. Amén.");
        SECUENCIA_LITURGICA.push(bCredo);
    }

    
    let bPreces = new BloqueLiturgico("preces");
    
    if (OFICIO === "Laudes" || OFICIO === "Visperas") {
        let title = (OFICIO === "Laudes") ? "CÁNTICO EVANGÉLICO (Benedictus)" : "CÁNTICO EVANGÉLICO (Magnificat)";
        let officeData = data[hora];
        if (officeData && officeData.cantico_evangelico) {
            let ce = officeData.cantico_evangelico;
            bPreces.addTitulo(title);
            bPreces.addRubrica("Antífona: " + ce.antifona);
            
            if (ce.texto) {
                let lines = [];
                if (Array.isArray(ce.texto)) {
                    lines = ce.texto;
                } else if (typeof ce.texto === 'string') {
                    lines = ce.texto.split(/\n+/).filter(l => l.trim().length > 1);
                }
                
                lines.forEach((line, idx) => {
                    if (idx % 2 === 0) bPreces.addSacerdote(line, 'Normal');
                    else bPreces.addAsamblea(line);
                });
            }
            
            bPreces.addSacerdote(isEn ? "Glory to the Father, and to the Son, and to the Holy Spirit." : "Gloria al Padre, y al Hijo, y al Espíritu Santo.", 'Normal');
            bPreces.addAsamblea(isEn ? "As it was in the beginning, is now, and will be forever. Amen." : "Como era en el principio, ahora y siempre, por los siglos de los siglos. Amén.");
            bPreces.addRubrica("Antífona: " + ce.antifona);
        }
    }

    bPreces.addTitulo(isEn ? "Universal Prayer" : "Oración de los Fieles");
    
    let precesText = "[Oración de los Fieles Omitida / No Definida]";
    if ((OFICIO === "Laudes" || OFICIO === "Visperas") && data[hora] && data[hora].preces) {
        precesText = data[hora].preces;
        bPreces.addRubrica(isEn ? "Intercessions from the Divine Office." : "Preces propias del Oficio Divino.");
    } else if (Flag_Oracion_Pueblo) {
        precesText = data.liturgia_palabra ? data.liturgia_palabra.preces : "P. Fieles extraídas del tiempo...";
    } else {
        precesText = isEn ? "Hear us, O Lord, and grant your Church peace and unity." : "Te pedimos, Señor, escucha nuestra oración, y concede a tu Iglesia la paz y la unidad que te suplica.";
    }
    
    let precesLines = precesText.split('\n');
    precesLines.forEach(line => {
        if(line.trim()) bPreces.addMonicion(line.replace(/•/g, '').trim());
    });
    
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
    bComunion.addCapitular((isEn ? "Let us pray. " : "Oremos. ") + despues);
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

    } // END ELSE FOR MISA/LAUDES
    
    // Lectio Divina (Auto-generador si estamos en jornada diaria y es la ultima llamada)
    if (hora === "lectio") {
        let bLectio = new BloqueLiturgico("lectio");
        bLectio.addSuperTitulo("LECTIO DIVINA");
        bLectio.addTitulo("I. LECTIO");
        bLectio.addRubrica("Lectura pausada del Evangelio dominical o del día.");
        bLectio.addSacerdote((data.liturgia_palabra && data.liturgia_palabra.evangelio) ? data.liturgia_palabra.evangelio.texto : "[Texto del Evangelio]");
        bLectio.addTitulo("II. MEDITATIO");
        bLectio.addRubrica("¿Qué me dice a mí el texto?");
        bLectio.addTitulo("III. ORATIO");
        bLectio.addRubrica("¿Qué le digo yo al Señor que me acaba de hablar?");
        bLectio.addTitulo("IV. CONTEMPLATIO");
        bLectio.addRubrica("¿A qué me invita en mi vida concreta como resolución?");
        SECUENCIA_LITURGICA.push(bLectio);
    }

    // EJECUCION MOTOR DE RENDERING
    let htmlOut = '';
    SECUENCIA_LITURGICA.forEach(bloque => htmlOut += RENDERIZAR_BLOQUE(bloque));
    return htmlOut;
}

// -----------------------------------------------------
// NUEVO MOTOR AST (FASE 5)
// -----------------------------------------------------
function generarDocumentoNodos(data, hora, options = {}) {
    if (!data) return '';
    // Híbrido: Si no hay esqueleto canónico del nuevo motor, usamos el sistema viejo procedural 
    if (!data.esqueleto_ordinario || !window.DbOrdinario) {
        return generarDocumentoNodosLegacy(data, hora, options);
    }
    
    let isEn = options.isEn === true;
    let showMoniciones = options.showMoniciones !== false;
    let showHomilia = options.showHomilia !== false;
    let OFICIO = null;
    if (hora) {
        if (hora.includes("laudes")) OFICIO = "Laudes";
        else if (hora.includes("visperas")) OFICIO = "Visperas";
        else if (hora.includes("oficio")) OFICIO = "Oficio";
        else if (hora.includes("intermedia")) OFICIO = "Intermedia";
        else if (hora.includes("completas")) OFICIO = "Completas";
    }
    const IS_MISA = (hora === "misa" || hora === "misa_laudes" || !hora);
    
    let SECUENCIA_LITURGICA = [];
    const cantos = window.obtenerCantosPorTiempo ? window.obtenerCantosPorTiempo(data.tiempo_liturgico || "Ordinario", isEn) : { entrada: "", ofertorio: "", comunion: "", salida: "" };
    const ord = window.DbOrdinario.ordinario;

    const checkAccion = (bloque_id) => {
        let f = data.esqueleto_ordinario.find(x => x.id_bloque === bloque_id);
        return f && f.accion === "incluir";
    };

    // ==========================================
    // BLOQUE A: RITOS INICIALES
    // ==========================================
    let bInicial = new BloqueLiturgico("ritos_iniciales");
    bInicial.addSuperTitulo(isEn ? "INTRODUCTORY RITES" : "RITOS INICIALES");

    if (showMoniciones) {
        bInicial.addTitulo(isEn ? "Entrance Monition" : "Monición de Entrada");
        bInicial.addMonicion(data.monicion_entrada || "Breve introducción a la liturgia del día.");
    }
    
    bInicial.addTitulo(isEn ? "Entrance Chant" : "Canto de Entrada");
    bInicial.addRubrica(cantos.entrada);

    bInicial.addTitulo(isEn ? "Entrance Antiphon" : "Antífona de Entrada");
    bInicial.addSacerdote(data.antifona_entrada || "Antífona según calendario...");

    if (checkAccion("saludo_inicial")) {
        bInicial.addTitulo(isEn ? "Greeting" : "Saludo Inicial");
        let nd = ord.ritos_iniciales.saludo;
        bInicial.addRubrica(nd.rubrica_previa);
        bInicial.addDialogo(nd.formula_principal.celebrante, nd.formula_principal.asamblea);
        bInicial.addDialogo(nd.opciones_saludo[2].celebrante, nd.opciones_saludo[2].asamblea); // Opción C
    }

    if (OFICIO === "Laudes" || OFICIO === "Visperas") {
        let officeData = data[hora];
        let salmosNombres = OFICIO === "Laudes" ? ["salmo1", "cantico_at", "salmo2"] : ["salmo1", "salmo2", "cantico_nt"];
        let titulosArray = OFICIO === "Laudes" ? ["Salmo 1", "Cántico del Antiguo Testamento", "Salmo 2"] : ["Salmo 1", "Salmo 2", "Cántico del Nuevo Testamento"];

        if (officeData && officeData[salmosNombres[0]]) {
            bInicial.addSuperTitulo(isEn ? ("INTEGRATED PSALMODY (" + OFICIO + ")") : ("SALMODIA INTEGRADA (" + OFICIO.toUpperCase() + ")"));
            
            salmosNombres.forEach((nombre, index) => {
                let s = officeData[nombre];
                if (s) {
                    bInicial.addTitulo(isEn ? ("Psalmody: " + nombre) : titulosArray[index]);
                    bInicial.addRubrica((isEn ? "Antiphon: " : "Antífona: ") + s.antifona);
                    let lines = s.texto.split("\n\n");
                    lines.forEach((line, idx) => {
                        if (idx % 2 === 0) bInicial.addSacerdote(line, 'Normal');
                        else bInicial.addAsamblea(line);
                    });
                    bInicial.addSacerdote(isEn ? "Glory to the Father, and to the Son, and to the Holy Spirit." : "Gloria al Padre, y al Hijo, y al Espíritu Santo.", 'Normal');
                    bInicial.addAsamblea(isEn ? "As it was in the beginning, is now, and will be forever. Amen." : "Como era en el principio, ahora y siempre, por los siglos de los siglos. Amén.");
                    bInicial.addRubrica((isEn ? "Antiphon: " : "Antífona: ") + s.antifona);
                }
            });
        }
    } else {
        if (checkAccion("acto_penitencial")) {
            bInicial.addTitulo(isEn ? "Penitential Act" : "Acto Penitencial");
            let nd = ord.ritos_iniciales.acto_penitencial;
            bInicial.addRubrica(nd.rubrica_previa);
            bInicial.addMonicion(nd.monicion_invitatoria);
            bInicial.addRubrica(nd.rubrica_silencio);
            
            let opt = nd.opciones_formula.find(x => x.id === "confiteor");
            if(opt) {
                bInicial.addAsamblea(opt.texto_conjunto);
                bInicial.addSacerdote(opt.absolucion_celebrante);
                bInicial.addAsamblea(opt.respuesta_absolucion);
            }
        }

        if (checkAccion("kyrie")) {
            let nd = ord.ritos_iniciales.kyrie;
            bInicial.addRubrica(nd.rubrica_previa);
            nd.invocaciones.forEach(i => bInicial.addDialogo(i.invocacion, i.respuesta));
        }
    }

    if (checkAccion("gloria")) {
        let nd = ord.ritos_iniciales.gloria;
        bInicial.addTitulo("Gloria");
        bInicial.addRubrica(nd.rubrica_previa);
        bInicial.addAsamblea(nd.texto);
    }

    bInicial.addTitulo(isEn ? "Collect" : "Oración Colecta");
    bInicial.addCapitular((isEn ? "Let us pray. " : "Oremos. ") + (data.oracion_colecta || ""));
    bInicial.addAsamblea("Amén.");
    SECUENCIA_LITURGICA.push(bInicial);


    // ==========================================
    // BLOQUE B: LITURGIA DE LA PALABRA
    // ==========================================
    let bPalabra = new BloqueLiturgico("liturgia_palabra");
    bPalabra.addSuperTitulo(isEn ? "LITURGY OF THE WORD" : "LITURGIA DE LA PALABRA");
    
    let lp = data.liturgia_palabra || {};

    if (lp.primera_lectura) {
        bPalabra.addTitulo(isEn ? "First Reading" : "Primera Lectura");
        bPalabra.addRubrica(lp.primera_lectura.cita || "");
        bPalabra.addLectura(lp.primera_lectura.texto || "");
        bPalabra.addDialogo(isEn ? "The word of the Lord." : "Palabra de Dios.", isEn ? "Thanks be to God." : "Te alabamos, Señor.");
    }

    if (lp.salmo_responsorial) {
        bPalabra.addTitulo(isEn ? "Responsorial Psalm" : "Salmo Responsorial");
        bPalabra.addRubrica(lp.salmo_responsorial.cita || "");
        bPalabra.addAsamblea("R. " + (lp.salmo_responsorial.respuesta || ""));
        bPalabra.addSacerdote(lp.salmo_responsorial.texto || "");
    }

    if (lp.segunda_lectura) {
        bPalabra.addTitulo(isEn ? "Second Reading" : "Segunda Lectura");
        bPalabra.addRubrica(lp.segunda_lectura.cita || "");
        bPalabra.addLectura(lp.segunda_lectura.texto || "");
        bPalabra.addDialogo(isEn ? "The word of the Lord." : "Palabra de Dios.", isEn ? "Thanks be to God." : "Te alabamos, Señor.");
    }

    if (lp.secuencia) {
        bPalabra.addTitulo(isEn ? "Sequence" : "Secuencia");
        if (lp.secuencia.nodos) {
            // Placeholder for native AST appending
        } else if (lp.secuencia.texto) {
            bPalabra.addLectura(lp.secuencia.texto);
        }
    }

    bPalabra.addTitulo(isEn ? "Gospel Acclamation" : "Aclamación antes del Evangelio");
    bPalabra.addAsamblea(lp.aclamacion_evangelio || "Aleluya, aleluya.");

    if (lp.evangelio) {
        bPalabra.addTitulo(isEn ? "Gospel" : "Evangelio");
        bPalabra.addRubrica("<span class='cross-mark'>✠</span> " + (lp.evangelio.cita || ""));
        bPalabra.addLectura(lp.evangelio.texto || "");
        bPalabra.addDialogo(isEn ? "The Gospel of the Lord." : "Palabra del Señor.", isEn ? "Praise to you, Lord Jesus Christ." : "Gloria a ti, Señor Jesús.");
    }

    bPalabra.addTitulo(isEn ? "Homily" : "Homilía");
    if (showHomilia && data.guia_reflexion) bPalabra.addGuia(data.guia_reflexion);
    else bPalabra.addRubrica(isEn ? "The priest or deacon delivers the homily." : "El sacerdote o diácono pronuncia la homilía.");
    SECUENCIA_LITURGICA.push(bPalabra);

    if (checkAccion("credo")) {
        let bCredo = new BloqueLiturgico("credo");
        bCredo.addTitulo(isEn ? "Profession of Faith" : "Profesión de Fe");
        bCredo.addAsamblea("Creo en un solo Dios, Padre todopoderoso, Creador del cielo y de la tierra, de todo lo visible y lo invisible...\n\nCreo en un solo Señor, Jesucristo, Hijo único de Dios, nacido del Padre antes de todos los siglos...\n\nCreo en el Espíritu Santo, Señor y dador de vida..."); 
        SECUENCIA_LITURGICA.push(bCredo);
    }
    
    let bPreces = new BloqueLiturgico("preces");
    
    if (OFICIO === "Laudes" || OFICIO === "Visperas") {
        let officeData = data[hora];
        if (officeData && officeData.cantico_evangelico) {
            let canticoName = OFICIO === "Laudes" ? "Cántico de Zacarías (Benedictus)" : "Cántico de María (Magnificat)";
            bPreces.addSuperTitulo(isEn ? "GOSPEL CANTICLE" : "CÁNTICO EVANGÉLICO (" + OFICIO.toUpperCase() + ")");
            bPreces.addTitulo(isEn ? "Gospel Canticle" : canticoName);
            bPreces.addRubrica((isEn ? "Antiphon: " : "Antífona: ") + officeData.cantico_evangelico.antifona);
            
            let lines = [];
            if (Array.isArray(officeData.cantico_evangelico.texto)) {
                lines = officeData.cantico_evangelico.texto;
            } else if (typeof officeData.cantico_evangelico.texto === 'string') {
                lines = officeData.cantico_evangelico.texto.split(/\n+/).filter(l => l.trim().length > 1);
            }
            
            lines.forEach((line, idx) => {
                if (idx % 2 === 0) bPreces.addSacerdote(line, 'Normal');
                else bPreces.addAsamblea(line);
            });
            
            bPreces.addSacerdote(isEn ? "Glory to the Father, and to the Son, and to the Holy Spirit." : "Gloria al Padre, y al Hijo, y al Espíritu Santo.", 'Normal');
            bPreces.addAsamblea(isEn ? "As it was in the beginning, is now, and will be forever. Amen." : "Como era en el principio, ahora y siempre, por los siglos de los siglos. Amén.");
            bPreces.addRubrica((isEn ? "Antiphon: " : "Antífona: ") + officeData.cantico_evangelico.antifona);
        }
    }
    if ((OFICIO === "Laudes" || OFICIO === "Visperas") && data[hora] && data[hora].preces) {
        bPreces.addTitulo(isEn ? "Prayers / Intercessions (" + OFICIO + ")" : "Preces (" + OFICIO + ")");
        bPreces.addRubrica(isEn ? "The Universal Prayer is substituted by the Intercessions of the Liturgy of the Hours." : "Se sustituye la Oración de los Fieles por las preces del Oficio divino.");
        let ptxt = data[hora].preces;
        ptxt.split('\n').filter(x=>x.trim()).forEach(l => {
            if(l.startsWith("-") || l.startsWith("—")) bPreces.addMonicion(l);
            else if(l.includes("Te rogamos") || l.includes("Escúchanos")) bPreces.addAsamblea("R. " + l);
            else bPreces.addSacerdote(l, 'Normal');
        });
    } else {
        bPreces.addTitulo(isEn ? "Universal Prayer" : "Oración de los Fieles");
        let ptxt = lp.preces || "Lector: Te rogamos, óyenos.";
        ptxt.split('\n').filter(x=>x.trim()).forEach(l => bPreces.addMonicion(l.replace(/•/g, '').trim()));
    }
    SECUENCIA_LITURGICA.push(bPreces);

    // ==========================================
    // BLOQUE C: LITURGIA EUCARÍSTICA
    // ==========================================
    let bEuca = new BloqueLiturgico("liturgia_eucaristica");
    bEuca.addSuperTitulo(isEn ? "LITURGY OF THE EUCHARIST" : "LITURGIA EUCARÍSTICA");
    bEuca.addTitulo(isEn ? "Offertory Chant" : "Canto de Ofertorio");
    bEuca.addRubrica(cantos.ofertorio);

    if (checkAccion("preparacion_dones")) {
        let nd = ord.liturgia_eucaristica.preparacion_dones;
        bEuca.addTitulo(isEn ? "Preparation of the Gifts" : "Preparación de los Dones");
        bEuca.addRubrica(nd.rubrica_previa);
        bEuca.addDialogo(nd.bendicion_pan.celebrante, nd.bendicion_pan.asamblea);
        bEuca.addRubrica(nd.bendicion_vino.rubrica_previa);
        bEuca.addDialogo(nd.bendicion_vino.celebrante, nd.bendicion_vino.asamblea);
        bEuca.addRubrica(nd.orate_fratres.rubrica_previa);
        bEuca.addDialogo(nd.orate_fratres.celebrante, nd.orate_fratres.asamblea);
    }

    bEuca.addTitulo(isEn ? "Prayer over the Offerings" : "Oración sobre las Ofrendas");
    bEuca.addCapitular(data.liturgia_eucaristica ? data.liturgia_eucaristica.oracion_ofrendas : "");
    bEuca.addAsamblea("Amén.");
    
    if (checkAccion("plegaria_eucaristica_II")) {
        let nd = ord.liturgia_eucaristica.plegaria_eucaristica_II;
        bEuca.addTitulo(isEn ? "Preface Dialogue" : "Diálogo del Prefacio");
        bEuca.addDialogo(nd.dialogo_prefacio.v1, nd.dialogo_prefacio.r1);
        bEuca.addDialogo(nd.dialogo_prefacio.v2, nd.dialogo_prefacio.r2);
        bEuca.addDialogo(nd.dialogo_prefacio.v3, nd.dialogo_prefacio.r3);
        
        bEuca.addTitulo(isEn ? "Sanctus" : "Santo");
        bEuca.addAsamblea(nd.santo.texto);

        bEuca.addTitulo(isEn ? "Eucharistic Prayer" : "Plegaria Eucarística");
        bEuca.addRubrica("El sacerdote pronuncia la Plegaria Eucarística elegida.");
        bEuca.addSacerdote(nd.consagracion.pan);
        bEuca.addSacerdote(nd.consagracion.vino);
        bEuca.addDialogo(nd.aclamacion_misterio.celebrante, nd.aclamacion_misterio.asamblea);
        bEuca.addDialogo(nd.doxologia.celebrante, nd.doxologia.asamblea);
    }
    SECUENCIA_LITURGICA.push(bEuca);

    // ==========================================
    // BLOQUE D: COMUNIÓN
    // ==========================================
    let bComunion = new BloqueLiturgico("rito_comunion");
    bComunion.addSuperTitulo(isEn ? "COMMUNION RITE" : "RITO DE LA COMUNIÓN");

    if (checkAccion("padre_nuestro")) {
        let nd = ord.rito_comunion.padre_nuestro;
        bComunion.addTitulo("Padre Nuestro");
        bComunion.addMonicion(nd.monicion);
        bComunion.addAsamblea(nd.oracion);
        bComunion.addDialogo(nd.embolismo_y_doxologia.celebrante, nd.embolismo_y_doxologia.asamblea);
    }

    if (checkAccion("rito_paz")) {
        let nd = ord.rito_comunion.rito_paz;
        bComunion.addTitulo("Rito de la Paz");
        bComunion.addDialogo(nd.oracion_paz.celebrante, nd.oracion_paz.asamblea);
        bComunion.addDialogo(nd.dialogo_paz.celebrante, nd.dialogo_paz.asamblea);
    }

    if (checkAccion("fraccion_pan_y_comunion")) {
        let nd = ord.rito_comunion.fraccion_pan_y_comunion;
        bComunion.addTitulo("Fracción del Pan");
        bComunion.addAsamblea(nd.cordero_dios);
        bComunion.addTitulo("Invitación a la Comunión");
        bComunion.addDialogo(nd.invitacion.celebrante, nd.invitacion.asamblea);
    }

    bComunion.addTitulo(isEn ? "Communion Antiphon" : "Antífona de Comunión");
    bComunion.addSacerdote(data.liturgia_eucaristica ? data.liturgia_eucaristica.antifona_comunion : "");
    bComunion.addTitulo(isEn ? "Communion Chant" : "Canto de Comunión");
    bComunion.addRubrica(cantos.comunion);



    bComunion.addTitulo(isEn ? "Prayer after Communion" : "Oración después de la Comunión");
    bComunion.addCapitular((isEn ? "Let us pray. " : "Oremos. ") + (data.liturgia_eucaristica ? data.liturgia_eucaristica.oracion_despues_comunion : ""));
    bComunion.addAsamblea("Amén.");
    SECUENCIA_LITURGICA.push(bComunion);

    // ==========================================
    // BLOQUE E: CONCLUSIÓN
    // ==========================================
    let bConclusion = new BloqueLiturgico("conclusion");
    bConclusion.addSuperTitulo(isEn ? "CONCLUDING RITES" : "RITOS DE CONCLUSIÓN");

    if (checkAccion("bendicion_despedida")) {
        let nd = ord.ritos_conclusion.bendicion_despedida;
        bConclusion.addTitulo(isEn ? "Final Blessing" : "Bendición Final");
        bConclusion.addDialogo(nd.dialogo_bendicion.celebrante_v, nd.dialogo_bendicion.asamblea_r);
        bConclusion.addDialogo(nd.dialogo_bendicion.celebrante_b, nd.dialogo_bendicion.asamblea_b);
        bConclusion.addDialogo(nd.despedida.diacono, nd.despedida.asamblea);
    } else {
        // Fallback for testing
        bConclusion.addDialogo("El Señor esté con ustedes", "Y con tu espíritu");
        bConclusion.addDialogo("Pueden ir en paz.", "Demos gracias a Dios.");
    }

    bConclusion.addTitulo(isEn ? "Recessional Chant" : "Canto de Salida");
    bConclusion.addRubrica(cantos.salida);
    SECUENCIA_LITURGICA.push(bConclusion);

    // ==========================================
    // EJECUCIÓN DEL RENDERIZADO AST
    // ==========================================
    let htmlOut = '';
    SECUENCIA_LITURGICA.forEach(bloque => htmlOut += RENDERIZAR_BLOQUE(bloque));
    return htmlOut;
}

// ==========================================
// MÓDULO DE PRUEBA AST (ANTIGRAVITY PURO)
// ==========================================
function procesarProclamacion(block) {
  const { texto, subtipo } = block;
  if (!texto) return '';

  // REGLA ANTIGRAVITY: Si es oración presidencial, omitir capitular.
  if (subtipo === "oracion_presidencial") {
    return `<div class="proclamacion presidencial">${texto}</div>`;
  }

  // Regex para detectar signos iniciales opcionales y la primera letra
  const regex = /^([«¿¡"“]*)([a-zA-ZÁÉÍÓÚÑ])/;
  const match = texto.match(regex);

  if (match) {
    const signos = match[1];
    const letra = match[2];
    const resto = texto.replace(regex, '');
    
    return `
      <div class="proclamacion">
        <span class="punctuation-hang">${signos}</span>
        <span class="drop-cap">${letra}</span>
        <span class="cuerpo-texto">${resto}</span>
      </div>`;
  }

  return `<div class="proclamacion">${texto}</div>`;
}

function RENDERIZAR_NODO_AST(block) {
  if (block.tipo === "titulo_dia") return `<h2 class="missal-super-heading">${block.contenido}</h2>`;
  if (block.tipo === "titulo_misa") return `<p class="missal-heading">${block.contenido}</p>`;
  if (block.tipo === "seccion") return `<h3 class="titulo-rito">${block.contenido}</h3>`;
  if (block.tipo === "rubrica") return `<p class="missal-rubric">${block.contenido}</p>`;
  if (block.tipo === "monicion") return `<div class="monicion"><strong>MONICIÓN: </strong>${block.contenido}</div>`;
  if (block.tipo === "canto") return `<div class="rubrica-sacerdote" style="margin-bottom: 10px;">${block.titulo}: ${block.letra}</div>`;
  
  if (block.tipo === "dialogo") {
    const hasBoth = block.v && block.r;
    const layoutClass = hasBoth ? "dialogo-grid" : "dialogo-lineal";
    return `
      <div class="bloque-dialogo ${layoutClass}">
        <div class="v-part"><span class="sigla-roja">V/.</span> ${block.v}</div>
        ${hasBoth ? `<div class="r-part"><span class="sigla-roja">R/.</span> ${block.r}</div>` : ''}
      </div>`;
  }

  if (block.tipo === "proclamacion") return procesarProclamacion(block);

  return `<div>${block.contenido}</div>`;
}

// Simulador de entrada y volcado de resultados
window.RenderizarTestAST = function(astJsonArray) {
    let htmlOut = '';
    astJsonArray.forEach(bloque => {
        htmlOut += RENDERIZAR_NODO_AST(bloque) + '\\n';
    });
    return htmlOut;
};

/**
 * MOTOR DE RENDERIZADO ANTIGRAVITY v2.0
 * Sustituye el antiguo bucle procedimental por un intérprete de AST determinista.
 */
window.RenderizarSaaS = function(jsonAST) {
    const contenedor = document.getElementById('pdf-view') || document.querySelector('.pdf-container');
    if (!contenedor || !Array.isArray(jsonAST)) return;

    contenedor.innerHTML = ''; // Limpieza de nodos legacy
    const fragmento = document.createDocumentFragment();

    jsonAST.forEach((bloque) => {
        const div = document.createElement('div');
        div.className = `missal-block`; // Clase de contención básica NLM
        div.innerHTML = RENDERIZAR_NODO_AST(bloque);
        fragmento.appendChild(div);
    });

    contenedor.appendChild(fragmento);
    console.log("SaaS Refactorizado: Misal renderizado bajo estándar NLM y Motor AST.");
};
