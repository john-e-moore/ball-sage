import duckdb
import openai
import os
from flask import Blueprint, request, jsonify
from .utils import generate_sql_query
from .config import Config

main = Blueprint('main', __name__)

@main.route('/api/query', methods=['POST'])
def query():
    attempt = 0
    error_feedback = "Placeholder for error feedback."

    try:
        while attempt < Config.MAX_RETRIES:

            attempt += 1
        
            user_query = request.json.get('query')
            
            if not user_query or not isinstance(user_query, str):
                return jsonify({"error": "Invalid input. Please provide a valid text query."}), 400

            sql_query, error = generate_sql_query(user_query, error_feedback)

            if error: # Try again if max retries not exceeded
                continue 
            else: # Execute query
                with duckdb.connect(database=Config.DB_FILEPATH) as conn:
                    cursor = conn.execute(sql_query)
                    columns = [desc[0] for desc in cursor.description]
                    rows = [dict(zip(columns, row)) for row in cursor.fetchall()]

                    #result = conn.execute(sql_query).fetchall()

                return jsonify({
                    "search-results": [
                        {
                            "result": rows, 
                            "sql": sql_query,
                            "attempts": attempt
                        }
                    ]
                })
    except openai.OpenAIError as e:
        return jsonify({
                    "attempts": attempt,
                    "query": user_query,
                    "error": "Error communicating with OpenAI API",
                    "details": str(e)
                }), 500
    except duckdb.Error as e:
        return jsonify({
                    "attempts": attempt,
                    "query": user_query,
                    "error": "Database error",
                    "details": str(e)
                }), 500
    except Exception as e:
        return jsonify({
                    "attempts": attempt,
                    "query": user_query,
                    "sql": sql_query,
                    "error": "An unexpected error occurred",
                    "details": str(e)
                }), 500
    
    return jsonify({
                "search-results": [
                    {
                        "attempts": attempt,
                        "query": user_query,
                        "sql": sql_query,
                        "error": f"Max attempts of {Config.MAX_RETRIES} reached",
                        "details": str(e)
                    }
                ]
            }), 500