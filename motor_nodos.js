// ANTIGRAVITY - CEREBRO LITÚRGICO UNIFICADO (NODOS)

function generarDocumentoNodos(data, hora, isEn) {
    let SECUENCIA_LITURGICA = [];
    
    // VARIABLES
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

    // COMPUERTA DE ABORTO
    if (DIA_TRIDUO) {
        if (DIA_TRIDUO === "Jueves_Santo" && OFICIO === "Visperas") {
            return RENDERIZAR_BLOQUE(new BloqueLiturgico('abort').addTitulo("Misa de la Cena del Señor.").addRubrica("Unión con Vísperas = Bloqueado."));
        }
        if (DIA_TRIDUO === "Viernes_Santo") {
            return RENDERIZAR_BLOQUE(new BloqueLiturgico('abort').addTitulo("Viernes Santo.").addRubrica("Prohibido celebrar Misa. Solo liturgia de la Pasión."));
        }
        if (DIA_TRIDUO === "Sabado_Santo") {
            return RENDERIZAR_BLOQUE(new BloqueLiturgico('abort').addTitulo("Sábado Santo.").addRubrica("Prohibido celebrar Misa diurna. Esperar a Vigilia Pascual."));
        }
    }

    // BANDERAS LOGICAS
    let Flag_Gloria = (GRADO.includes("Solemnidad") || GRADO.includes("Fiesta") || (GRADO.includes("Domingo") && !isAdviento && !isCuaresma));
    if (data.gloria !== undefined) Flag_Gloria = data.gloria; 
    let Flag_Credo = (GRADO.includes("Domingo") || GRADO.includes("Solemnidad"));
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
