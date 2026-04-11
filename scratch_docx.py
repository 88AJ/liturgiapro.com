from docx import Document

doc = Document("Semana Santa 2026 (ciclo A)/Celebraciones (subsidios con moniciones)/Misa de la Cena del Señor 2026 (con moniciones).docx")
print("Paragraphs in Misa Cena del Señor:")
for p in doc.paragraphs[:15]:
    if p.text.strip():
        print(p.text.strip())
