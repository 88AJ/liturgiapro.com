window.monicionesDB = {
    "ordinario": {
        "entrada": "Hermanos, nos reunimos en el Día del Señor para celebrar el misterio de nuestra fe. El Tiempo Ordinario nos invita a caminar con Jesús en nuestra vida cotidiana, escuchando su Palabra y alimentándonos de su Cuerpo para ser sus testigos en el mundo. Participemos con alegría en esta Eucaristía.",
        "primera_lectura": "La primera lectura nos recuerda las promesas de salvación que Dios hizo a su pueblo. Escuchemos con atención.",
        "segunda_lectura": "En la segunda lectura, el apóstol nos exhorta a vivir coherentemente nuestra fe en medio de las realidades del mundo. Escuchemos.",
        "evangelio": "El Evangelio nos presenta hoy a Jesús, nuestro Maestro. Aclamémosle y dispongamos el corazón para acoger su mensaje."
    },
    "cuaresma": {
        "entrada": "Iniciamos esta celebración en este tiempo de Cuaresma, tiempo de conversión y de preparación para la Pascua. Que la gracia de Dios purifique nuestros corazones y nos renueve interiormente. Comencemos reconociendo humildemente nuestros pecados.",
        "primera_lectura": "La historia de la salvación nos muestra la misericordia de Dios que llama constantemente a la conversión. Escuchemos.",
        "segunda_lectura": "El apóstol nos invita a dejarnos reconciliar con Dios y a renovar nuestra vida cristiana. Escuchemos con atención.",
        "evangelio": "El Señor Jesús nos llama hoy a un cambio de corazón. Aclamemos, no con el Aleluya, sino con espíritu de penitencia a Cristo, Palabra eterna del Padre."
    },
    "pascua": {
        "entrada": "¡Cristo ha resucitado, aleluya! En este tiempo de Pascua, la Iglesia se llena de júbilo por la victoria del Señor sobre el pecado y la muerte. Que esta Eucaristía fortalezca nuestra fe en el Resucitado. Participemos llenos de gozo.",
        "primera_lectura": "Los Hechos de los Apóstoles nos relatan la vida de la primera comunidad cristiana, fortalecida por el Espíritu del Resucitado. Escuchemos.",
        "segunda_lectura": "Como testigos de la Resurrección, somos llamados a vivir una vida nueva en Cristo. Escuchemos la instrucción del apóstol.",
        "evangelio": "Cristo vivo se hace presente en medio de nosotros a través de su Palabra. Aclamemos llenos de alegría."
    },
    "adviento": {
        "entrada": "Hermanos, en este tiempo de Adviento nos preparamos con alegre esperanza para celebrar la venida del Señor. Que esta Eucaristía nos ayude a estar vigilantes y a preparar el camino del Señor en nuestros corazones.",
        "primera_lectura": "El profeta anuncia la llegada de los tiempos mesiánicos y nos llena de esperanza. Escuchemos con atención.",
        "segunda_lectura": "El apóstol nos invita a estar preparados, viviendo en la paciencia y en la caridad mientras esperamos al Señor. Escuchemos.",
        "evangelio": "La voz del precursor y de la Virgen María nos enseñan a acoger a Cristo. Aclamemos al Señor que viene a salvarnos."
    }
};

window.obtenerMonicionesPorTiempo = function(tiempoStr) {
    const t = tiempoStr ? tiempoStr.toLowerCase() : "";
    if (t.includes('cuaresma')) return window.monicionesDB["cuaresma"];
    if (t.includes('pascua')) return window.monicionesDB["pascua"];
    if (t.includes('adviento')) return window.monicionesDB["adviento"];
    return window.monicionesDB["ordinario"];
};
