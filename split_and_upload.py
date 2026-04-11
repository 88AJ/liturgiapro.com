import os
import PyPDF2
from google import genai
from dotenv import load_dotenv

load_dotenv()

def split_pdf(file_path, base_name):
    print(f"Splitting {file_path}...")
    reader = PyPDF2.PdfReader(file_path)
    total_pages = len(reader.pages)
    
    parts = []
    chunk_size = 900
    for i in range(0, total_pages, chunk_size):
        part_num = (i // chunk_size) + 1
        writer = PyPDF2.PdfWriter()
        for j in range(i, min(i + chunk_size, total_pages)):
            writer.add_page(reader.pages[j])
        
        out_path = f"/tmp/{base_name}_Part_{part_num}.pdf"
        with open(out_path, 'wb') as f:
            writer.write(f)
        parts.append((f"{base_name} Part {part_num}", out_path))
        print(f"Created {out_path} with {len(writer.pages)} pages")
    
    return parts

# Test splitting Tomo II
parts = split_pdf("ritualesespa/Liturgia de las Horas/Tomo II.pdf", "Tomo_II")

client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))

for name, path in parts:
    print(f"Uploading {name}...")
    try:
        f = client.files.upload(file=path, config={'display_name': name})
        print(f"Uploaded! URI: {f.uri}")
    except Exception as e:
        print(f"Error: {e}")
        
