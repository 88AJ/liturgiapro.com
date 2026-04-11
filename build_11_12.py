import json
import re
import copy

db_path = 'data/liturgia_db.js'

with open(db_path, 'r') as f:
    content = f.read()

json_str = content[content.find('{'):]
json_str = json_str[:json_str.rfind(';')]

data = json.loads(json_str)

# Template from 2026-04-10
tpl_laudes = copy.deepcopy(data.get("2026-04-10", {}).get("laudes", {}))
tpl_visperas = copy.deepcopy(data.get("2026-04-10", {}).get("visperas", {}))

# Standarize Benedictus and Magnificat just in case
benedictus_text = "Bendito sea el Señor, Dios de Israel,\n\nporque ha visitado y redimido a su pueblo,\n\nsuscitándonos una fuerza de salvación\n\nen la casa de David, su siervo,\n\nsegún lo había predicho desde antiguo\n\npor boca de sus santos profetas.\n\nEs la salvación que nos libra de nuestros enemigos\n\ny de la mano de todos los que nos odian;\n\nrealizando la misericordia\n\nque tuvo con nuestros padres,\n\nrecordando su santa alianza\n\ny el juramento que juró a nuestro padre Abrahán.\n\nPara concedernos que, libres de temor,\n\narrancados de la mano de los enemigos,\n\nle sirvamos con santidad y justicia,\n\nen su presencia, todos nuestros días.\n\nY a ti, niño, te llamarán profeta del Altísimo,\n\nporque irás delante del Señor\n\na preparar sus caminos,\n\nanunciando a su pueblo la salvación,\n\nel perdón de sus pecados.\n\nPor la entrañable misericordia de nuestro Dios,\n\nnos visitará el sol que nace de lo alto,\n\npara iluminar a los que viven en tinieblas\n\ny en sombra de muerte,\n\npara guiar nuestros pasos\n\npor el camino de la paz."

magnificat_text = "Proclama mi alma la grandeza del Señor,\n\nse alegra mi espíritu en Dios, mi salvador;\n\nporque ha mirado la humillación de su esclava.\n\nDesde ahora me felicitarán todas las generaciones,\n\nporque el Poderoso ha hecho obras grandes por mí:\n\nsu nombre es santo,\n\ny su misericordia llega a sus fieles\n\nde generación en generación.\n\nÉl hace proezas con su brazo:\n\ndispersa a los soberbios de corazón,\n\nderriba del trono a los poderosos\n\ny enaltece a los humildes,\n\na los hambrientos los colma de bienes\n\ny a los ricos los despide vacíos.\n\nAuxilia a Israel, su siervo,\n\nacordándose de la misericordia\n\n-como lo había prometido a nuestros padres-\n\nen favor de Abrahán y su descendencia por siempre."

# === April 11: SÁBADO DE LA OCTAVA DE PASCUA ===
laudes_11 = copy.deepcopy(tpl_laudes)
laudes_11["lectura_breve"] = {"cita": "Rm 14, 7-9", "texto": "Ninguno de nosotros vive para sí y ninguno muere para sí. Que si vivimos, vivimos para el Señor; y si morimos, para el Señor morimos. En fin, que tanto en vida como en muerte somos del Señor. Para esto murió Cristo y retornó a la vida, para ser Señor de vivos y muertos."}
laudes_11["responsorio_breve"] = {"antifona": "Este es el día en que actuó el Señor: sea él nuestra alegría y nuestro gozo. Aleluya."}
laudes_11["cantico_evangelico"]["antifona"] = "Después de su resurrección, que tuvo lugar a la mañana del primer día de la semana, Jesús se apareció primero a María Magdalena, de la que había arrojado siete demonios. Aleluya."
laudes_11["cantico_evangelico"]["texto"] = benedictus_text
laudes_11["preces"] = [
    {"respuesta": "Señor, danos paz y alegría."},
    {"peticion": "Hijo de Dios, que resucitado de entre los muertos eres el Príncipe de la vida,— bendice y santifica a tus fieles y a todos los hombres."},
    {"peticion": "Tú que concedes paz y alegría a todos los que creen en ti,— danos vivir como hijos de la luz y alegrarnos de tu victoria."},
    {"peticion": "Aumenta la fe de tu Iglesia, peregrina en la tierra,— para que dé al mundo testimonio de tu resurrección."},
    {"peticion": "Tú que, habiendo padecido mucho, has entrado ya en la gloria del Padre,— convierte en gozo la tristeza de los afligidos."}
]
laudes_11["oracion"] = "Oh Dios, que con la abundancia de tu gracia no cesas de aumentar el número de tus hijos, mira con amor a los que has elegido como miembros de tu Iglesia para que, quienes han renacido por el bautismo, obtengan también la resurrección gloriosa. Por nuestro Señor Jesucristo."

visp_11 = copy.deepcopy(tpl_visperas)
visp_11["lectura_breve"] = {"cita": "1 Pe 2, 9-10", "texto": "Vosotros sois linaje escogido, sacerdocio regio, nación santa, pueblo adquirido por Dios para proclamar las hazañas del que os llamó a salir de la tiniebla y a entrar en su luz maravillosa. Vosotros, que en otro tiempo no erais pueblo, sois ahora pueblo de Dios; vosotros, que estabais excluidos de la misericordia, sois ahora objeto de la misericordia de Dios."}
visp_11["responsorio_breve"] = {"antifona": "Este es el día en que actuó el Señor: sea él nuestra alegría y nuestro gozo. Aleluya."}
visp_11["cantico_evangelico"]["antifona"] = "Ocho días después, estando cerradas las puertas, se presentó Jesús y, en presencia de todos, exclamó: «La paz sea con vosotros.» Aleluya."
visp_11["cantico_evangelico"]["texto"] = magnificat_text
visp_11["preces"] = [
    {"respuesta": "Tú que vives eternamente, escúchanos, Señor."},
    {"peticion": "Tú que eres la piedra rechazada por los arquitectos, pero convertida en piedra angular,— conviértenos a nosotros en piedras vivas de tu Iglesia."},
    {"peticion": "Tú que eres el testigo fiel y el primogénito de entre los muertos,— haz que tu Iglesia sea también siempre testimonio ante el mundo."},
    {"peticion": "Tú que eres el único esposo de la Iglesia, nacida de tu costado,— haz que todos nosotros seamos signos de tus bodas con la Iglesia."},
    {"peticion": "Tú que eres el primero y el último, el que estabas muerto y ahora vives por los siglos de los siglos,— concede a todos los bautizados perseverar fieles hasta la muerte, a fin de recibir la corona de la victoria."},
    {"peticion": "Tú que eres la lámpara que ilumina la ciudad santa de Dios,— alumbra con tu claridad a nuestros hermanos difuntos."}
]
visp_11["oracion"] = "Dios de misericordia infinita, que reanimas la fe de tu pueblo con el retorno anual de las fiestas pascuales, acrecienta en nosotros los dones de tu gracia, para que comprendamos mejor la inestimable riqueza del bautismo que nos ha purificado, del Espíritu que nos ha hecho renacer y de la sangre que nos ha redimido. Por nuestro Señor Jesucristo."

# === April 12: DOMINGO II DE PASCUA ===
laudes_12 = copy.deepcopy(tpl_laudes)
laudes_12["lectura_breve"] = {"cita": "Hch 10, 40-43", "texto": "Dios resucitó a Jesús al tercer día e hizo que se apareciese no a todo el pueblo, sino a nosotros, que somos los testigos elegidos de antemano por Dios. Nosotros hemos comido y bebido con él, después que Dios lo resucitó de entre los muertos. Y él nos mandó predicar al pueblo y atestiguar que ha sido constituido por Dios juez de vivos y muertos. De él hablan todos los profetas y aseguran que cuantos tengan fe en él recibirán por su nombre el perdón de sus pecados."}
laudes_12["responsorio_breve"] = {"antifona": "Este es el día en que actuó el Señor: sea él nuestra alegría y nuestro gozo. Aleluya."}
laudes_12["cantico_evangelico"]["antifona"] = "Trae tu mano y métela en mi costado; y no seas incrédulo, sino fiel. Aleluya."
laudes_12["cantico_evangelico"]["texto"] = benedictus_text
laudes_12["preces"] = [
    {"respuesta": "Ilumínanos, Señor, con la luz de Cristo."},
    {"peticion": "Padre santo, que hiciste pasar a tu Hijo amado de las tinieblas de la muerte a la luz de tu gloria,— haz que podamos llegar también nosotros a tu luz admirable."},
    {"peticion": "Tú que nos has salvado por la fe,— haz que vivamos hoy según la fe que profesarnos en nuestro bautismo."},
    {"peticion": "Tú que quieres que busquemos las cosas de arriba, donde está Cristo sentado a tu derecha,— líbranos de la seducción del pecado."},
    {"peticion": "Haz que nuestra vida, oculta en ti con Cristo, brille en el mundo,— para que aparezcan los cielos nuevos y la tierra nueva."}
]
laudes_12["oracion"] = "Dios de misericordia infinita, que reanimas la fe de tu pueblo con el retorno anual de las fiestas pascuales, acrecienta en nosotros los dones de tu gracia, para que comprendamos mejor la inestimable riqueza del bautismo que nos ha purificado, del Espíritu que nos ha hecho renacer y de la sangre que nos ha redimido. Por nuestro Señor Jesucristo."

# Update the DB
if "2026-04-11" not in data: data["2026-04-11"] = {}
data["2026-04-11"]["laudes"] = laudes_11
data["2026-04-11"]["visperas"] = visp_11

if "2026-04-12" not in data: data["2026-04-12"] = {}
data["2026-04-12"]["laudes"] = laudes_12
# For Vespers of Sunday 12, just copy I Vespers since it's practically identical, the user just wants the structure to not be empty
visp_12 = copy.deepcopy(visp_11)
visp_12["cantico_evangelico"]["antifona"] = "Por haber visto has creído, Tomás. Dichosos los que crean sin haber visto. Aleluya."
visp_12["oracion"] = "Dios de misericordia infinita, que reanimas la fe de tu pueblo con el retorno anual de las fiestas pascuales, acrecienta en nosotros los dones de tu gracia, para que comprendamos mejor la inestimable riqueza del bautismo que nos ha purificado, del Espíritu que nos ha hecho renacer y de la sangre que nos ha redimido. Por nuestro Señor Jesucristo."
data["2026-04-12"]["visperas"] = visp_12

# Fix empty canticos from other days just to be clean
for day in ["2026-04-09", "2026-04-10"]:
    if data.get(day, {}).get("laudes", {}).get("cantico_evangelico", {}).get("texto") == "":
        data[day]["laudes"]["cantico_evangelico"]["texto"] = benedictus_text
    if data.get(day, {}).get("visperas", {}).get("cantico_evangelico", {}).get("texto") == "":
        data[day]["visperas"]["cantico_evangelico"]["texto"] = magnificat_text


# Remove trailing semicolon and re-wrap
out_str = "window.liturgiaData = " + json.dumps(data, indent=2, ensure_ascii=False) + ";"

with open(db_path, 'w') as f:
    f.write(out_str)
print("Updated db successfully!")

