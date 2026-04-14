import datetime
from scraper_motor import extract_horas_data

date = datetime.datetime(2026, 4, 25)
laudes = extract_horas_data(date, "laudes")
print(laudes)
