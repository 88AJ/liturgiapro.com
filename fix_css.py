import re

with open('saas.css', 'r') as f:
    css = f.read()

# Make links black and remove underline inside pdf-container
print_styles = """
/* PDF Print Styles / Formal Missal Styles */
.pdf-container a {
    color: inherit;
    text-decoration: none;
    pointer-events: none;
}

@media print {
    .pdf-container a {
        color: black !important;
        text-decoration: none !important;
    }
}
"""

if '.pdf-container a' not in css:
    css += print_styles

# Update fonts and margins to make it look like a Missal
css = re.sub(r'\.pdf-container \{.*?\n\}', 
""".pdf-container {
    font-family: 'EB Garamond', serif;
    font-size: 15px;
    line-height: 1.4;
    color: #111;
    background: #fff;
    padding: 30px;
    max-width: 800px;
    margin: 0 auto;
    text-align: justify;
}""", css, flags=re.DOTALL)

css = re.sub(r'\.pdf-container h2, \.pdf-container h3, \.pdf-container hr \{.*?margin-top: 15px;\n\}',
""".pdf-container h2, .pdf-container h3 {
    font-family: 'Cinzel', serif;
    text-align: center;
    color: #b91c1c; /* Crimson Red */
}
.super-titulo {
    font-size: 1.4rem;
    font-weight: 700;
    margin-top: 2rem;
    margin-bottom: 0.5rem;
    letter-spacing: 2px;
}
.titulo-rojo {
    font-size: 1.2rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
}
.rubrica, .rubrica-texto {
    font-family: 'EB Garamond', serif;
    color: #b91c1c;
    font-style: italic;
    font-size: 0.95rem;
    margin-bottom: 0.5rem;
}
.actor-rojo {
    color: #b91c1c;
    font-weight: bold;
}
.sacerdote, .diacono, .asamblea {
    margin-bottom: 0.6rem;
}
.guia-homilia {
    background: #fdf8f5;
    border-left: 3px solid #b91c1c;
    padding: 10px 15px;
    margin: 15px 0;
    font-size: 0.95rem;
    font-style: italic;
    color: #444;
}
.monicion {
    font-weight: normal;
    margin-bottom: 1rem;
}
""", css, flags=re.DOTALL)

with open('saas.css', 'w') as f:
    f.write(css)

