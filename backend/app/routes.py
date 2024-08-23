from flask import Flask, request, jsonify
from flask_cors import CORS  # Add this import

app = Flask(__name__)
CORS(app)  # Add this line to enable CORS for all routes

@app.route('/api/search', methods=['GET'])
def get_data():
    query = request.args.get('query')
    return jsonify({
        "search-results": [
            {
                "query": query,
                "response": "Hello from Flask!"
            },
        ]
    })

if __name__ == '__main__':
    app.run(debug=True)