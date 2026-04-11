import json
import re

with open("data/liturgia_db.js", "r", encoding="utf-8") as f:
    content = f.read()

match = re.search(r"window\.liturgiaData\s*=\s*(\{.*\});", content, re.DOTALL)
if match:
    data_str = match.group(1)
    data = json.loads(data_str)
    
    # Update April 12th
    d12 = data.get("2026-04-12", {})
    d12["color"] = "Blanco"
    d12["tiempo_liturgico"] = "II DOMINGO DE PASCUA (CICLO A)"
    d12["antifona_entrada"] = "Como niños recién nacidos, deseen la leche pura del espíritu, para que crezcan y se salven. Aleluya."
    d12["rito_penitencial"] = "Yo confieso ante Dios todopoderoso y ante ustedes, hermanos, que he pecado mucho de pensamiento, palabra, obra y omisión. Por mi culpa, por mi culpa, por mi gran culpa. Por eso ruego a Santa María, siempre Virgen, a los ángeles, a los santos y a ustedes, hermanos, que intercedan por mí ante Dios, nuestro Señor."
    d12["gloria"] = True
    d12["oracion_colecta"] = "Dios de eterna misericordia, que en la celebración de las fiestas pascuales reavivas la fe del pueblo a ti consagrado, aumenta en nosotros los dones de tu gracia, para que todos comprendamos mejor qué inestimable es el bautismo que nos ha purificado, el Espíritu que nos ha regenerado y la sangre que nos ha redimido. Por nuestro Señor Jesucristo, tu Hijo, que vive y reina contigo en la unidad del Espíritu Santo y es Dios por los siglos de los siglos."
    
    d12["liturgia_palabra"]["primera_lectura"] = {
        "cita": "Hechos 2, 42-47",
        "texto": "En los primeros días de la Iglesia, todos los que habían sido bautizados eran perseverantes en escuchar la enseñanza de los apóstoles, en la comunión fraterna, en la fracción del pan y en las oraciones.\n\nMuchos milagros y prodigios se realizaban por medio de los apóstoles, y todos se sentían invadidos por un santo temor.\n\nLos creyentes vivían todos unidos y lo tenían todo en común; vendían sus posesiones y bienes, y lo repartían entre todos, según la necesidad de cada uno.\n\nA diario acudían al templo con fervor y perseverancia; partían el pan en las casas y compartían los alimentos con alegría y sencillez de corazón; alababan a Dios y se ganaban el aprecio de todo el pueblo. Por su parte, el Señor agregaba cada día a la comunidad a los que se iban salvando."
    }
    
    d12["liturgia_palabra"]["salmo_responsorial"] = {
        "cita": "Salmo 117",
        "respuesta": "Den gracias al Señor porque es bueno, porque es eterna su misericordia. Aleluya.",
        "texto": "Diga la casa de Israel:\nsu misericordia es eterna.\nDiga la casa de Aarón:\nsu misericordia es eterna.\nDigan los fieles del Señor:\nsu misericordia es eterna.\n\nLa diestra del Señor es poderosa,\nla diestra del Señor es excelsa.\nNo he de morir, viviré\npara contar las hazañas del Señor.\nMe castigó, me castigó el Señor,\npero no me entregó a la muerte.\n\nLa piedra que desecharon los arquitectos\nes ahora la piedra angular.\nEs el Señor quien lo ha hecho,\nha sido un milagro patente.\nEste es el día en que actuó el Señor:\nsea nuestra alegría y nuestro gozo."
    }
    
    d12["liturgia_palabra"]["segunda_lectura"] = {
        "cita": "1 Pedro 1, 3-9",
        "texto": "Bendito sea Dios, Padre de nuestro Señor Jesucristo, por su gran misericordia. Por la resurrección de Jesucristo de entre los muertos, nos ha hecho nacer de nuevo para una esperanza viva, para una herencia incorruptible, intachable e inmarcesible, reservada en el cielo para ustedes.\n\nPor la fe, el poder de Dios los protege para que alcancen la salvación que está dispuesta a revelarse en el momento final. Esto los llena de alegría, aunque ahora tengan que sufrir un poco de tiempo diversas pruebas; así, la autenticidad de su fe, más preciosa que el oro (que, aunque es perecedero, se prueba al fuego), será motivo de alabanza, gloria y honor cuando se manifieste Jesucristo.\n\nUstedes lo aman sin haberlo visto, y creen en él sin verlo todavía. Por eso se llenan de una alegría inefable y gloriosa, ya que están alcanzando la meta de su fe, que es la salvación de sus almas."
    }
    
    d12["liturgia_palabra"]["aclamacion_evangelio"] = "Aleluya, aleluya. Porque me has visto, Tomás, has creído, dice el Señor. Dichosos los que creen sin haber visto. Aleluya."
    
    d12["liturgia_palabra"]["evangelio"] = {
        "cita": "Juan 20, 19-31",
        "texto": "Al anochecer de aquel día, el primero de la semana, estaban los discípulos en una casa, con las puertas cerradas por miedo a los judíos. En esto entró Jesús, se puso en medio y les dijo: \"Paz a ustedes\". Y, diciendo esto, les enseñó las manos y el costado. Y los discípulos se llenaron de alegría al ver al Señor.\n\nJesús repitió: \"Paz a ustedes. Como el Padre me ha enviado, así también los envío yo\". Y, dicho esto, sopló sobre ellos y les dijo: \"Reciban el Espíritu Santo; a quienes les perdonen los pecados, les quedan perdonados; a quienes se los retengan, les quedan retenidos\".\n\nTomás, uno de los Doce, llamado el Mellizo, no estaba con ellos cuando vino Jesús. Y los otros discípulos le decían: \"Hemos visto al Señor\". Pero él les contestó: \"Si no veo en sus manos la señal de los clavos, si no meto el dedo en el agujero de los clavos y no meto la mano en su costado, no lo creo\".\n\nA los ocho días, estaban otra vez dentro los discípulos y Tomás con ellos. Llegó Jesús, estando cerradas las puertas, se puso en medio y dijo: \"Paz a ustedes\". Luego dijo a Tomás: \"Trae tu dedo, aquí tienes mis manos; trae tu mano y métela en mi costado; y no seas incrédulo, sino creyente\".\n\nContestó Tomás: \"¡Señor mío y Dios mío!\". Jesús le dijo: \"¿Porque me has visto has creído? Dichosos los que crean sin haber visto\".\n\nMuchos otros signos, que no están escritos en este libro, hizo Jesús a la vista de los discípulos. Estos han sido escritos para que crean que Jesús es el Mesías, el Hijo de Dios, y para que, creyendo, tengan vida en su nombre."
    }
    
    d12["liturgia_palabra"]["preces"] = "Te pedimos, Señor, por tu santa Iglesia; para que, purificada en las fuentes bautismales, anuncie la grandeza de tu amor a todas las gentes. Oremos.\n\nTú que has vencido a la muerte, concede a nuestro Obispo y a todos los pastores ser fieles testigos de la resurrección de tu Hijo. Oremos.\n\nPor los bautizados en esta Pascua; para que, renacidos del agua y del Espíritu Santo, vivan siempre como hijos de la luz y herederos del cielo. Oremos.\n\nPor los pueblos que sufren la guerra, el hambre o la opresión; para que la paz de Cristo resucitado traiga consuelo, justicia y reconciliación a sus vidas. Oremos.\n\nPor nuestra comunidad, para que fortalecidos por la Eucaristía, seamos dóciles a tu voluntad y manifestemos en nuestras obras la misericordia que hoy celebramos. Oremos."
    
    d12["liturgia_eucaristica"] = {
        "oracion_ofrendas": "Recibe, Señor, las ofrendas de tu pueblo, para que, renovados por la confesión de tu nombre y por el bautismo, consigamos la eterna bienaventuranza. Por Jesucristo, nuestro Señor.",
        "antifona_comunion": "Acerca tu mano, palpa el lugar de los clavos, y no seas incrédulo, sino creyente. Aleluya.",
        "oracion_despues_comunion": "Concédenos, Dios todopoderoso, que el sacramento pascual que hemos recibido permanezca en nuestras almas y se manifieste en nuestra vida. Por Jesucristo, nuestro Señor."
    }
    
    data["2026-04-12"] = d12
    
    with open("data/liturgia_db.js", "w", encoding="utf-8") as f:
        f.write("window.liturgiaData = ")
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write(";\n")
    print("Database updated!")
else:
    print("Could not find JSON in liturgia_db.js")
