import re

with open('motor_nodos.js', 'r', encoding='utf-8') as f:
    code = f.read()

replacement = """
    // Reemplazo limpio y jerárquico

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

    if (OFICIO === "Oficio") {
        let bOficio = new BloqueLiturgico("oficio");
        bOficio.addSuperTitulo(isEn ? "OFFICE OF READINGS" : "OFICIO DE LECTURAS");
        bOficio.addTitulo(isEn ? "Versicle" : "Invocación Inicial");
        bOficio.addDialogo(isEn ? "Lord, open my lips." : "Señor, ábreme los labios.", isEn ? "And my mouth will proclaim your praise." : "Y mi boca proclamará tu alabanza.");
        
        bOficio.addTitulo(isEn ? "Hymn" : "Himno");
        if (data.oficio && data.oficio.himno) {
            bOficio.addLectura(data.oficio.himno);
        } else {
            bOficio.addRubrica(isEn ? "[Hymn from the Commons]" : "[Himno correspondiente al tiempo]");
        }

        bOficio.addTitulo(isEn ? "Psalmody" : "Salmodia");
        if (data.oficio && data.oficio.salmo1) {
            bOficio.addRubrica("Salmo 1");
        } else {
            bOficio.addRubrica(isEn ? "[Psalms from the Psalter]" : "[Tres Salmos o fragmentos del salterio]");
        }
        
        bOficio.addTitulo(isEn ? "First Reading" : "Primera Lectura");
        if (data.oficio && data.oficio.primera_lectura) {
             bOficio.addLectura(data.oficio.primera_lectura);
        } else {
             bOficio.addRubrica(isEn ? "[Biblical Reading]" : "[Lectura Bíblica de la Liturgia de las Horas]");
        }

        bOficio.addTitulo(isEn ? "Second Reading" : "Segunda Lectura");
        if (data.oficio && data.oficio.segunda_lectura) {
             bOficio.addLectura(data.oficio.segunda_lectura);
        } else {
             bOficio.addRubrica(isEn ? "[Patristic Reading]" : "[Lectura Patrística]");
        }
        
        if (Flag_Gloria && data.oficio) {
            bOficio.addTitulo("Te Deum");
            bOficio.addRubrica("A ti, oh Dios, te alabamos...");
        }

        bOficio.addTitulo(isEn ? "Concluding Prayer" : "Oración Final");
        bOficio.addCapitular((isEn ? "Let us pray. " : "Oremos. ") + (data.oracion_colecta || ""));
        SECUENCIA_LITURGICA.push(bOficio);
    } 
    else if (OFICIO === "Intermedia") {
        let bInt = new BloqueLiturgico("intermedia");
        bInt.addSuperTitulo(isEn ? "DAYTIME PRAYER" : "HORA INTERMEDIA");
        bInt.addTitulo("Invocación Inicial");
        bInt.addDialogo("Dios mío, ven en mi auxilio.", "Señor, date prisa en socorrerme.");
        bInt.addTitulo(isEn ? "Hymn" : "Himno");
        bInt.addRubrica(isEn ? "[Daytime Hymn]" : "[Himno de Tercia, Sexta o Nona]");
        bInt.addTitulo(isEn ? "Psalmody" : "Salmodia");
        bInt.addRubrica(isEn ? "[Psalms]" : "[Salmodia Complementaria o del Día]");
        bInt.addTitulo(isEn ? "Short Reading" : "Lectura Breve");
        bInt.addRubrica(isEn ? "[Reading]" : "[Lectura Breve]");
        bInt.addTitulo(isEn ? "Concluding Prayer" : "Oración Final");
        bInt.addCapitular((isEn ? "Let us pray. " : "Oremos. ") + (data.oracion_colecta || ""));
        SECUENCIA_LITURGICA.push(bInt);
    }
    else if (OFICIO === "Completas") {
        let bComp = new BloqueLiturgico("completas");
        bComp.addSuperTitulo(isEn ? "COMPLINE" : "COMPLETAS");
        let cd = data.completas || {};
        bComp.addTitulo("Invocación Inicial");
        let introLine = cd.introduccion || "Dios mío, ven en mi auxilio.\\nSeñor, date prisa en socorrerme.\\nGloria al Padre...";
        bComp.addSacerdote(introLine.replace(/\\\\n/g, '<br>'), 'Normal');

        bComp.addTitulo(isEn ? "Examination of Conscience" : "Examen de Conciencia");
        bComp.addSacerdote(cd.examen_conciencia || "Hermanos, habiendo llegado al final de esta jornada...");
        bComp.addRubrica(isEn ? "[Moment of silence]" : "[Momento de silencio seguido de la fórmula general de confesión]");

        bComp.addTitulo(isEn ? "Hymn" : "Himno");
        bComp.addLectura(cd.himno || "[Himno antes del descanso]");

        bComp.addTitulo(isEn ? "Psalmody" : "Salmodia");
        if (cd.salmo1) {
             bComp.addRubrica("Antífona: " + (cd.salmo1.antifona || ""));
             bComp.addLectura(cd.salmo1.texto || "");
        } else {
             bComp.addRubrica("[Salmo(s) correspondiente(s)]");
        }

        bComp.addTitulo(isEn ? "Short Reading" : "Lectura Breve");
        if (cd.lectura_breve) {
             bComp.addRubrica(cd.lectura_breve.cita || "");
             bComp.addLectura(cd.lectura_breve.texto || "");
        }

        bComp.addTitulo(isEn ? "Responsory" : "Responsorio Breve");
        bComp.addSacerdote(cd.responsorio_breve || "A tus manos, Señor, encomiendo mi espíritu...");

        bComp.addTitulo(isEn ? "Gospel Canticle" : "Cántico Evangélico (Nunc Dimittis)");
        if (cd.cantico_evangelico) {
             bComp.addRubrica("Antífona: " + (cd.cantico_evangelico.antifona || ""));
             bComp.addLectura(cd.cantico_evangelico.texto || "");
             bComp.addRubrica("Antífona: " + (cd.cantico_evangelico.antifona || ""));
        }

        bComp.addTitulo(isEn ? "Concluding Prayer" : "Oración Final");
        bComp.addCapitular("Oremos. " + (cd.oracion || "Señor Dios, concédenos un descanso tranquilo..."));
        
        bComp.addTitulo(isEn ? "Marian Antiphon" : "Antífona Mariana Final");
        bComp.addSacerdote(cd.antifona_final || "Salve Regina...");
        SECUENCIA_LITURGICA.push(bComp);
    }
    // BLOQUES ORIGINALES (MISA Y LAUDES)
    else {
    // BANDERAS LOGICAS
"""

code = code.replace("    // COMPUERTA DE ABORTO\\n    if (DIA_TRIDUO) {", replacement)
code = code.replace("    // COMPUERTA DE ABORTO\\n\\n    if (DIA_TRIDUO) {", replacement)

close_block = """    SECUENCIA_LITURGICA.push(bConclusion);

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

    // EJECUCION MOTOR DE RENDERING"""

code = code.replace("""    SECUENCIA_LITURGICA.push(bConclusion);

    // EJECUCION MOTOR DE RENDERING""", close_block)

with open('motor_nodos.js', 'w', encoding='utf-8') as f:
    f.write(code)

print("Patch applied to motor_nodos.js")
