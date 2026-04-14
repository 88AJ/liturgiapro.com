import os
import glob
import fitz # PyMuPDF

def convert_pdfs_to_txt():
    # Find all PDFs in the Liturgia de las Horas directory
    target_dir = os.path.join("ritualesespa", "Liturgia de las Horas")
    pdf_files = glob.glob(os.path.join(target_dir, "*.pdf"))
    
    if not pdf_files:
        print(f"No PDFs found in {target_dir}")
        return
        
    for pdf_path in pdf_files:
        txt_path = pdf_path.replace('.pdf', '.txt')
        
        # Skip if txt already exists
        if os.path.exists(txt_path):
            print(f"Skipping {os.path.basename(pdf_path)}, {os.path.basename(txt_path)} already exists.")
            continue
            
        print(f"Converting {os.path.basename(pdf_path)} ({os.path.getsize(pdf_path)/1024/1024:.2f} MB)... ", end="", flush=True)
        
        try:
            doc = fitz.open(pdf_path)
            text_content = []
            
            for page in doc:
                text_content.append(page.get_text())
                
            doc.close()
            
            with open(txt_path, 'w', encoding='utf-8') as f:
                f.write("\\n".join(text_content))
                
            print(f"Done! TXT size: {os.path.getsize(txt_path)/1024/1024:.2f} MB")
            
        except Exception as e:
            print(f"Error: {e}")

if __name__ == "__main__":
    print("Starting fast PDF-to-TXT extraction using PyMuPDF...")
    convert_pdfs_to_txt()
    print("Extraction complete.")
