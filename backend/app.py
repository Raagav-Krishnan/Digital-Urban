from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/health')
def health():
    return jsonify({
        "status": "running",
        "project": "Urban Sentinel"
    })

@app.route('/api/dashboard')
def dashboard():
    return jsonify({
        "active_emergencies": 3,
        "flood_alerts": 2,
        "road_issues": 14,
        "sewage_alerts": 1
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)