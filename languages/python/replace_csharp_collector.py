"""
Replacement for languages/csharp Program.cs implemented in pure Python.
Usage:
  python replace_csharp_collector.py <value>
Appends value to languages/csharp/data.db (SQLite) and prints confirmation.
"""
import sys
import os
import sqlite3
from datetime import datetime

DB = os.path.join('languages','csharp','data.db')

def main():
    if len(sys.argv) < 2:
        print('Usage: python replace_csharp_collector.py <value>')
        return 1
    try:
        value = float(sys.argv[1])
    except ValueError:
        print('Value must be numeric')
        return 1
    os.makedirs('languages/csharp', exist_ok=True)
    conn = sqlite3.connect(DB)
    cur = conn.cursor()
    cur.execute('CREATE TABLE IF NOT EXISTS samples (id INTEGER PRIMARY KEY AUTOINCREMENT, ts TEXT, value REAL)')
    cur.execute('INSERT INTO samples (ts, value) VALUES (?,?)', (datetime.utcnow().isoformat(), value))
    conn.commit()
    conn.close()
    print(f'Inserted {value} into {DB}')
    return 0

if __name__ == '__main__':
    sys.exit(main())
