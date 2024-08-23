import os

class Config:
    SECRET_KEY = os.environ.get('OPENAI_API_KEY')
    DB_FILEPATH = '../data/ballsage.duckdb'
    SCHEMA_FILEPATH = '../data/ballsage-schema_20240818163342.json'
    MAX_RETRIES = 3
    DEBUG = True