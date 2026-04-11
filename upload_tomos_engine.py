import os
import sys
import pypdf
from google import genai
from dotenv import load_dotenv

load_dotenv()

def init_gemini():
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("❌ Error: GEMINI_API_KEY no encontrada.")
        sys.exit(1)
    
    return genai.Client(api_key=api_key)

def split_pdf(file_path, base_name):
    print(f"Dividiendo {file_path} en bloques de 900 páginas...")
    reader = pypdf.PdfReader(file_path)
    total_pages = len(reader.pages)
    
    parts = []
    chunk_size = 900
    for i in range(0, total_pages, chunk_size):
        part_num = (i // chunk_size) + 1
        name = f"{base_name} Part {part_num}"
        out_path = f"/tmp/{name.replace(' ', '_')}.pdf"
        
        if not os.path.exists(out_path):
            writer = pypdf.PdfWriter()
            for j in range(i, min(i + chunk_size, total_pages)):
                writer.add_page(reader.pages[j])
            
            with open(out_path, 'wb') as f:
                writer.write(f)
            print(f"Creado sub-PDF {out_path} con {len(writer.pages)} páginas")
        else:
             print(f"Saltando escritura sub-PDF (ya existe) {out_path}")
             
        parts.append((name, out_path))
    
    return parts

def upload_tomes():
    client = init_gemini()
    tomes = {
        "Tomo I": "ritualesespa/Liturgia de las Horas/Tomo I.pdf",
        "Tomo II": "ritualesespa/Liturgia de las Horas/Tomo II.pdf",
        "Tomo III": "ritualesespa/Liturgia de las Horas/Tomo III.pdf",
        "Tomo IV": "ritualesespa/Liturgia de las Horas/Tomo IV.pdf"
    }

    print("Obteniendo archivos existentes en Gemini...")
    existing_files = {f.display_name: f for f in client.files.list()}
    
    uploaded_refs = {}

    for base_name, path in tomes.items():
        if not os.path.exists(path):
            print(f"⚠️  Advertencia: No se encontró el archivo local para {base_name} en {path}")
            continue
            
        parts = split_pdf(path, base_name)
        uploaded_refs[base_name] = []
        
        for name, sub_path in parts:
            if name in existing_files:
                file_obj = existing_files[name]
                print(f"✅ {name} ya existe en Gemini (URI: {file_obj.uri}). Reutilizando...")
                uploaded_refs[base_name].append(file_obj.uri)
            else:
                print(f"⬆️  Subiendo {name}... Esto tomará un tiempo.")
                try:
                    uploaded_file = client.files.upload(file=sub_path, config={'display_name': name})
                    print(f"✅ {name} subido exitosamente (URI: {uploaded_file.uri})")
                    uploaded_refs[base_name].append(uploaded_file.uri)
                except Exception as e:
                    print(f"❌ Error subiendo {name}: {e}")

    with open("data/tomos_uris.json", "w") as f:
        import json
        json.dump(uploaded_refs, f, indent=2)
    print("✅ URIs de los Tomos guardadas en data/tomos_uris.json")

if __name__ == "__main__":
    upload_tomes()
