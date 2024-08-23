from app.config import Config
import os

print(Config.DB_FILEPATH)

db_path = os.path.join(os.path.dirname(__file__), '..', '..', Config.DB_FILEPATH)
print(db_path)
db_path = os.path.abspath(Config.DB_FILEPATH)
print(db_path)