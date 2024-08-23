import openai
import json
import re
from datetime import datetime
from .config import Config

def generate_timestamp():
    return datetime.now().strftime('%Y%m%d%H%M%S')

def load_schema(filepath=Config.SCHEMA_FILEPATH):
    with open(filepath, 'r') as f:
        schema = json.load(f)
    return json.dumps(schema)

def extract_sql(query_str):
    return query_str.replace('```sql', '').replace('```', '').strip()

def validate_sql_query(sql_query):
    forbidden_patterns = [
        r"DROP\s+TABLE",
        r"DELETE\s+FROM",
        r"UPDATE\s+",
        r"INSERT\s+INTO",
        r"ALTER\s+TABLE",
        r"GRANT\s+",
        r"REVOKE\s+",
        r"CREATE\s+",
    ]
    
    for pattern in forbidden_patterns:
        if re.search(pattern, sql_query, re.IGNORECASE):
            return False, f"Forbidden SQL operation detected: {pattern}"
    
    return True, "SQL query is safe to execute."

def generate_sql_query(user_query, error_feedback, attempts=1):
    db_schema = load_schema()
    
    prompt = f"""
    You are an SQL expert. Given the database schema below, write a correct 
    SQL query based on the user's request. Be sure to only return the SQL query 
    because any extra text will cause this application to crash. 
    If the query has errors, refine it using the validation feedback.

    A user may request data on a team using the team's full name (e.g. Houston Texans)
    rather than the team's abbreviation (e.g. HOU). Do not be thrown off by this. Most
    of the time when you are filtering results in a WHERE or HAVING clause the query should
    return some data; it should not be empty.

    The same goes for player names. If a user queries a name that is similar but not equal to 
    a player name in the database, you should assume they are trying to refer to the player who
    is present in the data.

    Schema: {db_schema}
    User request: {user_query}
    
    SQL query:
    """

    client = openai.OpenAI()
    role = "user"
    model = "gpt-4o"

    completion = client.chat.completions.create(
        messages=[
            {
                "role": role,
                "content": f'{prompt}\n\n{error_feedback}',
            }
        ],
        model=model,
    )

    sql_query = extract_sql(completion.choices[0].message.content)

    timestamp = generate_timestamp()
    with open(f'data/generated-sql-query_{timestamp}.txt', 'w') as f:
        f.write(sql_query)
        print(f"SQL query saved.")

    is_valid, validation_message = validate_sql_query(sql_query)
    
    if is_valid:
        return sql_query, None
    else:
        return sql_query, validation_message
        