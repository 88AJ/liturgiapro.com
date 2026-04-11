import PyPDF2

pdf_path = './ritualesespa/Liturgia de las Horas/Tomo II.pdf'
with open(pdf_path, 'rb') as f:
    reader = PyPDF2.PdfReader(f)
    print("Searching for Easter Sunday...")
    for i in range(350, 420):
        text = reader.pages[i].extract_text()
        if text and "DOMINGO DE PASCUA DE LA RESURRECCIÓN" in text.upper():
            print(f"Found on page {i+1}")
