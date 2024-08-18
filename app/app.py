# app.py
from flask import Flask, request, jsonify
import openai
import duckdb
import json
import re
from datetime import datetime

app = Flask(__name__)

# Define filepaths
db_filepath = 'data/ballsage.duckdb'
schema_filepath = 'data/ballsage_schema.json'

# Maximum number of attempts to generate a valid SQL query
max_queries = 3

def generate_timestamp():
    return datetime.now().strftime('%Y%m%d%H%M%S')

def load_schema(filepath=schema_filepath):
    """
    Load the database schema from a JSON file and format it as a string.
    """
    with open(filepath, 'r') as f:
        schema = json.load(f)
    
    return json.dumps(schema)

# Load the schema from the JSON file

schema = load_schema(schema_filepath)
print("Loaded database schema.")

def extract_sql(query_str):
    return query_str.replace('```sql', '').replace('```', '').strip()

def validate_sql_query(sql_query):
    """
    Basic SQL validation to check for potentially harmful keywords.
    """
    forbidden_patterns = [
        r"DROP\s+TABLE",  # Prevent dropping tables
        r"DELETE\s+FROM",  # Prevent deleting records
        r"UPDATE\s+",      # Prevent updating records
        r"INSERT\s+INTO",  # Prevent inserting records
        r"ALTER\s+TABLE",  # Prevent altering tables
        r"GRANT\s+",       # Prevent granting permissions
        r"REVOKE\s+",      # Prevent revoking permissions
        r"CREATE\s+",      # Prevent creating new structures
    ]
    
    for pattern in forbidden_patterns:
        if re.search(pattern, sql_query, re.IGNORECASE):
            return False, f"Forbidden SQL operation detected: {pattern}"
    
    return True, "SQL query is safe to execute."

def generate_sql_query(user_query, error_feedback, attempts=1):
    """
    Generate a SQL query from the user's natural language input using OpenAI API.
    Attempts to correct the SQL if validation fails, up to max_queries times.
    """
    for attempt in range(attempts, max_queries + 1):
        prompt = f"""
        You are an SQL expert. Given the database schema below, write a correct 
        SQL query based on the user's request. Be sure to only return the SQL query 
        because any extra text will cause this application to crash. 
        If the query has errors, refine it using the validation feedback.

        Schema: {schema}
        User request: {user_query}
        
        SQL query:
        """

        # Create OpenAI client. By default fetches $OPENAI_API_KEY.
        client = openai.OpenAI()

        # Assign completion parameters.
        role = "user"
        model = "gpt-4o"

        # Get completion from API.
        completion = client.chat.completions.create(
            messages=[
                {
                    "role": role,
                    "content": f'{prompt}\n\n{error_feedback}',
                }
            ],
            model=model,
        )

        # Extract SQL from response.
        sql_query = extract_sql(completion.choices[0].message.content)

        timestamp = generate_timestamp()
        with open(f'data/generated-sql-query_{timestamp}.txt', 'w') as f:
            f.write(sql_query)
            print(f"SQL query saved.")

        # Validate the SQL query.
        is_valid, validation_message = validate_sql_query(sql_query)
        if is_valid:
            return sql_query, None
        else:
            user_query = f"{user_query}\nValidation Feedback: {validation_message}"
    
    return None, "Max retries exceeded. Unable to generate a valid SQL query."

@app.route('/query', methods=['POST'])
def query():
    attempt = 1
    error_feedback = ""
    while attempt < max_queries:
    
        user_query = request.json.get('query')
        
        if not user_query or not isinstance(user_query, str):
            return jsonify({"error": "Invalid input. Please provide a valid text query."}), 400

        try:
            sql_query, error = generate_sql_query(user_query, error_feedback)

            if error:
                return jsonify({"error": error}), 400

            # Connect to DuckDB and execute the query.
            with duckdb.connect(database=db_filepath) as conn:
                result = conn.execute(sql_query).fetchall()
                return jsonify({"result": result, "num_tries": attempt})

        except openai.OpenAIError as e:
            error_feedback = f"""
            Error: Error communicating with OpenAI API
            Details: {str(e)}
            """
        except duckdb.Error as e:
            error_feedback = f"""
            Error: Database error
            Details: {str(e)}
            """
            #return jsonify({"error": "Database error", "details": str(e), "sql_query": sql_query}), 500
        except Exception as e:
            error_feedback = f"""
            Error: An unexpected error occurred
            Details: {str(e)}
            """
            #return jsonify({"error": "An unexpected error occurred", "details": str(e)}), 500

        attempt += 1
    
    # Max attempts reached.
    return f"Max attempts {attempt} reached"
if __name__ == '__main__':
    app.run(debug=True)
