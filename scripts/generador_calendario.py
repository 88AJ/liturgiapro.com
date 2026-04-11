import os
import json
import time
import typing
import google.generativeai as genai
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv(dotenv_path='.env')

genai.configure(api_key=os.environ["GEMINI_API_KEY"])

class LiturgicalDay(BaseModel):
    fecha: str
    titulo: str
    color: str
    grado: str
    citaciones_lecturas: str

class LiturgicalMonth(BaseModel):
    dias: typing.List[LiturgicalDay]

def generate():
    pdf_usccb_path = 'liturgyofthetime/Liturgical Calendar USCCB 2026.pdf'
    
    print("Uploading file to Gemini...")
    uploaded_file = genai.upload_file(path=pdf_usccb_path, display_name="USCCB Calendar 2026")
    
    while uploaded_file.state.name == 'PROCESSING':
        print('.', end='', flush=True)
        time.sleep(2)
        uploaded_file = genai.get_file(uploaded_file.name)
    print("\nFile ready.")
    
    model = genai.GenerativeModel('gemini-2.5-pro')
    
    full_calendar = {}
    
    months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    
    try:
        for m_idx, month in enumerate(months):
            print(f"Requesting data for Month: {month}...")
            
            prompt = f"""
            You are an expert Liturgist. I have uploaded the official USCCB Liturgical Calendar for 2026.
            
            Please extract the data for EVERY SINGLE DAY of the month of {month} 2026.
            Do NOT miss a single day of {month}.
            For each day, extract:
            - fecha: YYYY-MM-DD
            - titulo: English title of the day
            - color: the liturgical color (e.g. "white", "green", "violet", "red", "rose")
            - grado: "Solemnity", "Feast", "Memorial", "Optional Memorial", "Sunday", or "Weekday"
            - citaciones_lecturas: The exact string of the biblical reading citation given.
            
            Return the output matching the schema.
            """
            
            response = model.generate_content(
                [uploaded_file, prompt],
                generation_config=genai.GenerationConfig(
                    response_mime_type="application/json",
                    response_schema=LiturgicalMonth,
                    temperature=0.0
                )
            )
            
            data = json.loads(response.text)
            for d in data.get('dias', []):
                full_calendar[d['fecha']] = d
                
            print(f"Extracted {len(data.get('dias', []))} days for {month}.")
            time.sleep(2) # Delay to avoid quota limits
            
        # Asignar Reglas CEM
        print("Asignando reglas CEM...")
        for fecha, d in full_calendar.items():
            g = d['grado'].lower()
            if "sunday" in g and ("advent" in d['titulo'].lower() or "lent" in d['titulo'].lower() or "easter" in d['titulo'].lower()):
                d['regla_cem'] = "I.2" # Domingos privilegiados
            elif "solemnity" in g:
                d['regla_cem'] = "I.3"
            elif "sunday" in g:
                d['regla_cem'] = "II.6"
            elif "feast" in g:
                d['regla_cem'] = "II.5"
            elif "memorial" in g and "optional" not in g:
                d['regla_cem'] = "III.10"
            elif "optional memorial" in g:
                d['regla_cem'] = "III.12"
            else:
                d['regla_cem'] = "III.13" # Ferial
            
        with open("data/calendario_2026_db.js", "w", encoding="utf-8") as f:
            f.write("window.calendarioDB = ")
            json.dump(full_calendar, f, indent=4, ensure_ascii=False)
            f.write(";")
            
        print(f"Success! Generated data for {len(full_calendar)} days.")
        
    finally:
        print("Cleaning up file...")
        genai.delete_file(uploaded_file.name)

if __name__ == "__main__":
    generate()
