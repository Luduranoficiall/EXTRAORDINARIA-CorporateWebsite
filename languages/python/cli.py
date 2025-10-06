"""
Simple CLI for Python data collector (pure Python)
Usage:
  python languages/python/cli.py init
  python languages/python/cli.py collect <value>
  python languages/python/cli.py analyze
"""
import sys
import requests
import sqlite3
from pathlib import Path

DB = Path('languages/python/data.db')
API = 'http://localhost:5001'


def init_db():
    import sqlite3
    conn = sqlite3.connect(DB)
    cur = conn.cursor()
    cur.execute('CREATE TABLE IF NOT EXISTS samples (id INTEGER PRIMARY KEY AUTOINCREMENT, ts TEXT, value REAL)')
    conn.commit()
    conn.close()
    print('DB initialized:', DB)


def collect_local(value):
    conn = sqlite3.connect(DB)
    cur = conn.cursor()
    from datetime import datetime
    cur.execute('INSERT INTO samples (ts, value) VALUES (?,?)', (datetime.utcnow().isoformat(), float(value)))
    conn.commit()
    conn.close()
    print('Inserted', value)


def collect_remote(value):
    r = requests.post(API + '/collect', json={'value': value})
    print('remote status', r.status_code, r.text)


def analyze_local():
    import pandas as pd
    conn = sqlite3.connect(DB)
    df = pd.read_sql_query('SELECT value FROM samples', conn)
    conn.close()
    if df.empty:
        print('No data')
        return
    print(df.describe().to_dict())


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    cmd = sys.argv[1]
    if cmd == 'init':
        init_db()
    elif cmd == 'collect':
        if len(sys.argv) < 3: print('missing value'); sys.exit(1)
        collect_local(sys.argv[2])
    elif cmd == 'collect-remote':
        collect_remote(sys.argv[2])
    elif cmd == 'analyze':
        analyze_local()
    else:
        print('unknown command')
