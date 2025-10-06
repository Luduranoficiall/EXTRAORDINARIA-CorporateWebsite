"""Servidor Flask simples que substitui o exemplo Node.js data collector.
Rota POST /collect aceita JSON { value: number } e armazena em SQLite.
Rota GET /analyze retorna estatísticas básicas.
"""
from flask import Flask, request, jsonify
import sqlite3
from pathlib import Path
import statistics

DB = Path(__file__).parent / 'data.db'

def get_db():
    conn = sqlite3.connect(DB)
    conn.row_factory = sqlite3.Row
    return conn

def ensure_db():
    conn = get_db()
    conn.execute('CREATE TABLE IF NOT EXISTS samples (id INTEGER PRIMARY KEY AUTOINCREMENT, ts TEXT, value REAL)')
    conn.commit()
    conn.close()

app = Flask(__name__)

@app.route('/collect', methods=['POST'])
def collect():
    data = request.get_json() or {}
    if 'value' not in data:
        return jsonify(error='missing value'), 400
    ts = request.environ.get('REQUEST_TIME', None) or ''
    conn = get_db()
    conn.execute('INSERT INTO samples (ts, value) VALUES (?,?)', (ts, float(data['value'])))
    conn.commit()
    conn.close()
    return jsonify(status='ok'), 201

@app.route('/analyze', methods=['GET'])
def analyze():
    conn = get_db()
    cur = conn.execute('SELECT value FROM samples')
    rows = [r['value'] for r in cur.fetchall()]
    conn.close()
    if not rows:
        return jsonify(count=0)
    mean = statistics.mean(rows)
    stdev = statistics.pstdev(rows)
    return jsonify(count=len(rows), mean=mean, std=stdev, min=min(rows), max=max(rows))

if __name__ == '__main__':
    ensure_db()
    port = int(__import__('os').environ.get('PORT', 5002))
    app.run(host='0.0.0.0', port=port)
