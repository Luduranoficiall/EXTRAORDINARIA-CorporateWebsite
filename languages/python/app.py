from flask import Flask, request, jsonify
import sqlite3
import pandas as pd
from datetime import datetime

DB = 'languages/python/data.db'

def init_db():
    conn = sqlite3.connect(DB)
    cur = conn.cursor()
    cur.execute('''CREATE TABLE IF NOT EXISTS samples (id INTEGER PRIMARY KEY AUTOINCREMENT, ts TEXT, value REAL)''')
    conn.commit()
    conn.close()

app = Flask(__name__)
init_db()

@app.route('/collect', methods=['POST'])
def collect():
    payload = request.get_json(force=True)
    value = payload.get('value')
    if value is None:
        return jsonify({'error':'missing value'}), 400
    ts = datetime.utcnow().isoformat()
    conn = sqlite3.connect(DB)
    cur = conn.cursor()
    cur.execute('INSERT INTO samples (ts, value) VALUES (?,?)', (ts, float(value)))
    conn.commit()
    conn.close()
    return jsonify({'status':'ok'}), 201

@app.route('/analyze', methods=['GET'])
def analyze():
    conn = sqlite3.connect(DB)
    df = pd.read_sql_query('SELECT ts, value FROM samples', conn, parse_dates=['ts'])
    conn.close()
    if df.empty:
        return jsonify({'count':0})
    res = {
        'count': int(df.shape[0]),
        'mean': float(df['value'].mean()),
        'std': float(df['value'].std(ddof=0)),
        'min': float(df['value'].min()),
        'max': float(df['value'].max())
    }
    return jsonify(res)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
