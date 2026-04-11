import os
from google import genai
from dotenv import load_dotenv

load_dotenv()
client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))

for model in ['gemini-2.5-flash-lite', 'gemini-flash-latest', 'gemini-2.5-pro']:
    print(f"Testing {model}...")
    try:
        response = client.models.generate_content(model=model, contents="Hello")
        print(f"✅ Success with {model}: {response.text}")
        break # stop if we find one that works
    except Exception as e:
        print(f"❌ Failed: {e}")
