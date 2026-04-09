import re
import sys

with open("saas.css", "r") as f:
    css = f.read()

# Add Missal Styles
missal_styles = """
/* --- EDITORIAL MISSAL STYLES --- */
.pdf-container {
    background: #FAF7F2; /* Parchment */
    color: #1a1a1a;
    width: 100%;
    max-width: 210mm;
    min-height: 297mm;
    height: max-content;
    padding: 20mm !important; 
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    font-family: 'EB Garamond', serif;
    margin: 0 auto;
    font-size: 1.05rem;
    
    /* Missal Two-Column Layout */
    column-count: 2;
    column-gap: 30px;
    column-rule: 1px solid rgba(0,0,0,0.1);
    text-align: justify;
}

.pdf-container h2, .pdf-container h3, .pdf-container hr {
    column-span: all;
    text-align: center;
}

/* Evitar que se partan los bloques feo */
.missal-block {
    break-inside: avoid;
    margin-bottom: 1.5rem;
}

.missal-heading {
    text-transform: uppercase;
    color: #555;
    font-size: 0.9em;
    font-weight: 600;
    margin: 0 0 4px 0;
    letter-spacing: 1px;
}

.missal-citation {
    font-style: italic;
    color: #666;
    margin: 0 0 12px 0;
    font-size: 0.9em;
}

.missal-paragraph {
    margin: 0;
    text-align: justify;
    line-height: 1.35;
}

.missal-paragraph:not(.first-par) {
    text-indent: 1.2em;
}

.drop-cap {
    float: left;
    font-size: 3.8em;
    line-height: 0.8;
    padding-top: 4px;
    padding-right: 6px;
    padding-left: 2px;
    font-family: 'EB Garamond', serif;
    color: #333;
}

.missal-rubric {
    color: #B20000;
    font-style: italic;
    font-size: 0.9em;
    margin: 4px 0;
}

.cross-mark {
    color: #B20000;
    font-weight: normal;
    margin-right: 4px;
}

.rubric {
    color: #B20000;
    font-style: italic;
    font-weight: normal !important;
}
"""

if "EDITORIAL MISSAL STYLES" not in css:
    # Append at the end
    css += missal_styles
    
    # We also need to strip out the old pdf-container styles
    css = re.sub(r'\.pdf-container\s*\{[^}]*\}', '', css)

with open("saas.css", "w") as f:
    f.write(css)

print("CSS updated successfully")
