import sys

try:
    import pypdf
except ImportError:
    try:
        import PyPDF2 as pypdf
    except ImportError:
        print("No pypdf or PyPDF2 installed.")
        sys.exit(1)

def extract(pdf_path):
    print(f"Extracting {pdf_path}:")
    with open(pdf_path, 'rb') as f:
        reader = pypdf.PdfReader(f)
        for i in range(5, min(50, len(reader.pages))): # Paginas 5 a 50
            page = reader.pages[i]
            print(f"--- PAGE {i+1} ---")
            print(page.extract_text())

extract('./liturgyofthetime/ORIENTACIONES LITÚRGICO-PASTORALES - Google Docs.pdf')
extract('./liturgyofthetime/Liturgical Calendar USCCB 2026.pdf')
