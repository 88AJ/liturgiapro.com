import PyPDF2

pdf_path = './ritualesespa/Liturgia de las Horas/Tomo II.pdf'
with open(pdf_path, 'rb') as f:
    reader = PyPDF2.PdfReader(f)
    print(f"Total pages: {len(reader.pages)}")
    found = False
    for i in range(len(reader.pages)):
        text = reader.pages[i].extract_text()
        if text and "SÁBADO DE LA OCTAVA DE PASCUA" in text.upper():
            print(f"Found Sábado de la Octava on page {i+1}")
            found = True
        elif text and "OCTAVA DE PASCUA" in text.upper() and "SÁBADO" in text.upper():
            print(f"Found Sábado y Octava on page {i+1}")
        if text and "II DOMINGO DE PASCUA" in text.upper():
            print(f"Found II Domingo de Pascua on page {i+1}")
