import os
import sys
from google import genai
from dotenv import load_dotenv

load_dotenv(override=True)

def init_gemini():
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("❌ Error: GEMINI_API_KEY no encontrada.")
        sys.exit(1)
    
    return genai.Client(api_key=api_key)

MODEL = "gemini-2.5-flash"

def upload_tomes():
    client = init_gemini()
    tomes = {
        "Tomo I": "ritualesespa/Liturgia de las Horas/Tomo I.txt",
        "Tomo II": "ritualesespa/Liturgia de las Horas/Tomo II.txt",
        "Tomo III": "ritualesespa/Liturgia de las Horas/Tomo III.txt",
        "Tomo IV": "ritualesespa/Liturgia de las Horas/Tomo IV.txt",
        "OGLH": "ritualesespa/Liturgia de las Horas/OGLH.txt"
    }

    print("Obteniendo archivos existentes en Gemini...")
    existing_files = {f.display_name: f for f in client.files.list()}
    
    uploaded_refs = {}

    for base_name, path in tomes.items():
        if not os.path.exists(path):
            print(f"⚠️  Advertencia: No se encontró el archivo local para {base_name} en {path}")
            continue
            
        uploaded_refs[base_name] = []
        name = f"{base_name} TXT"
        
        if name in existing_files:
            file_obj = existing_files[name]
            print(f"✅ {name} ya existe en Gemini (URI: {file_obj.uri}). Reutilizando...")
            uploaded_refs[base_name].append(file_obj.uri)
        else:
            print(f"⬆️  Subiendo {name}... Esto tomará un tiempo.")
            try:
                uploaded_file = client.files.upload(file=path, config={'display_name': name})
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
