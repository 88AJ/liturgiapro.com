import re

def add_mock_laudes_to_db():
    filepath = 'data/liturgia_db.js'
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the object for 2026-04-12
    # It looks like: "2026-04-12": { ...
    
    match = re.search(r'"2026-04-12":\s*\{', content)
    if not match:
        print("Could not find 2026-04-12 in liturgia_db.js")
        return

    insert_pos = match.end()
    
    mock_liturgia = """
    "oficio": {
        "himno": "Rey vencedor, apiádate\\nde la miseria humana\\ny da a tus fieles parte\\nen tu victoria santa.\\n\\nAmén.",
        "salmo1": { "antifona": "Aleluya, aleluya, aleluya.", "texto": "Salmo 1\\nDichoso el hombre..." },
        "primera_lectura": "Lectura de la primera carta del apóstol San Pedro (1, 1-21)\\nPedro, apóstol de Jesucristo...",
        "segunda_lectura": "De los sermones de San Agustín, obispo\\nLa resurrección de Cristo es nuestra esperanza..."
    },
    "laudes": {
        "salmo1": {"antifona": "Aleluya, aleluya, aleluya.", "texto": "Oh Dios, tú eres mi Dios, por ti madrugo..."},
        "cantico_at": {"antifona": "Aleluya, aleluya, aleluya.", "texto": "Cántico de los tres jóvenes..."},
        "salmo2": {"antifona": "Aleluya, aleluya, aleluya.", "texto": "Cantad al Señor un cántico nuevo..."},
        "lectura_breve": {"cita": "Hch 10, 40-43", "texto": "Dios lo resucitó al tercer día y le concedió la gracia de manifestarse..."},
        "responsorio_breve": {"antifona": "Éste es el día en que actuó el Señor: sea nuestra alegría y nuestro gozo. Aleluya."},
        "cantico_evangelico": {"antifona": "Tomás, porque me has visto has creído -dice el Señor-. Dichosos los que creen sin haber visto. Aleluya.", "texto": "Bendito sea el Señor, Dios de Israel..."},
        "preces": "A Cristo, el Señor...\\n- Rey victorioso, escúchanos.",
        "oracion_colecta": "Dios de eterna misericordia, que reanimas la fe..."
    },
    "intermedia": {
        "himno": "Padre, a ti la gloria... Aleluya.",
        "salmo1": {"antifona": "Aleluya.", "texto": "Salmo 118..."},
        "lectura_breve": {"cita": "Lectura Breve", "texto": "Si han resucitado con Cristo..."},
        "oracion_colecta": "Dios todopoderoso y eterno..."
    },
    "completas": {
        "himno": "Cristo, luz de luz... Aleluya.",
        "salmo1": {"antifona": "Aleluya.", "texto": "Salmo 90..."},
        "lectura_breve": {"cita": "Ap 22, 4-5", "texto": "Verán el rostro del Señor..."},
        "responsorio_breve": "En tus manos, Señor, encomiendo mi espíritu. Aleluya.",
        "cantico_evangelico": {"antifona": "Sálvanos, Señor, despiertos... Aleluya.", "texto": "Ahora, Señor, según tu promesa..."},
        "oracion": "Te rogamos, Señor, que nos concedas..."
    },
"""

    new_content = content[:insert_pos] + mock_liturgia + content[insert_pos:]

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print("Mock Liturgia de las Horas inserted successfully for 2026-04-12.")

add_mock_laudes_to_db()
